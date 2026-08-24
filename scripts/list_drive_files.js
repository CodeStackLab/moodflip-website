const { execSync } = require('child_process');
const https = require('https');

const token = execSync('powershell -Command "gcloud auth application-default print-access-token"').toString().trim();

function apiRequest(hostname, method, path) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname, path, method,
      headers: { 'Authorization': `Bearer ${token}` }
    }, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const files = await apiRequest('www.googleapis.com', 'GET', '/drive/v3/files?pageSize=30&fields=files(id,name,mimeType)');
  console.log('Google Drive Files:');
  for (const f of files.files || []) {
    console.log(`- ${f.name} (${f.id}, ${f.mimeType})`);
  }
}

main().catch(console.error);
