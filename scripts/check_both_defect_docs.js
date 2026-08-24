const { execSync } = require('child_process');
const https = require('https');

const token = execSync('powershell -Command "gcloud auth application-default print-access-token"').toString().trim();
const DOC_ID_1 = '12vozTZ8n1sO2GOG1R3MSrnQ6klte5ByFm6SrXGdFxCg';
const DOC_ID_2 = '1G01r_TJjjtPNvClHsBH4tMAXJJWou16r1X6WPgtTtik';

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
  const doc1 = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID_1}`);
  console.log('Doc 1 Title:', doc1.title);

  const doc2 = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID_2}`);
  console.log('Doc 2 Title:', doc2.title);
}

main().catch(console.error);
