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
  const res = await apiRequest('www.googleapis.com', 'GET', `/drive/v3/files?q=mimeType='application/vnd.google-apps.document'&fields=files(id,name)`);
  console.log('All Google Docs on Drive:');
  for (const f of res.files || []) {
    console.log(`- ${f.name} (ID: ${f.id})`);
  }
}

main().catch(console.error);
