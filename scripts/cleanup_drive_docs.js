const https = require('https');
const { execSync } = require('child_process');

// Keep list
const KEEP_IDS = [
  '1BHU_upu1sMrHS0X06Hd_vNG1-giAtY8OUAA46M-5uYU', // MoodFlip_Defect_List_vs_Business_Spec_14AUG26 (1)
  '1r1rUCnaYjxmiXAD0I2G9Yl468yLsPtFuUuOPhHY14dc'  // Colour_Codes_ChatGPT (1)
];

// Get access token via gcloud
const token = execSync('powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"')
  .toString()
  .trim();

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body ? JSON.parse(body) : {});
        } else {
          reject(new Error(`Status ${res.statusCode}: ${body}`));
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function getDocs() {
  const options = {
    hostname: 'www.googleapis.com',
    port: 443,
    path: `/drive/v3/files?pageSize=50&q=mimeType='application/vnd.google-apps.document'&fields=files(id,name)`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  const res = await request(options);
  return res.files || [];
}

async function trashFile(fileId, fileName) {
  // Move to trash (safest option) or delete
  const options = {
    hostname: 'www.googleapis.com',
    port: 443,
    path: `/drive/v3/files/${fileId}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  return request(options, JSON.stringify({ trashed: true }));
}

async function main() {
  console.log('Fetching Google Docs from Drive...');
  const files = await getDocs();
  console.log(`Found ${files.length} Google Docs in Drive.`);

  for (const file of files) {
    if (KEEP_IDS.includes(file.id)) {
      console.log(`[KEEP] ${file.name} (${file.id})`);
    } else {
      try {
        await trashFile(file.id, file.name);
        console.log(`[TRASHED] ${file.name} (${file.id})`);
      } catch (err) {
        console.error(`[ERROR] Failed to trash ${file.name}:`, err.message);
      }
    }
  }

  console.log('\nCleanup completed! Only the 2 requested documents remain in Google Drive.');
}

main();
