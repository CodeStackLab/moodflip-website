const { execSync } = require('child_process');
const https = require('https');

const DOC_ID = '1G01r_TJjjtPNvClHsBH4tMAXJJWou16r1X6WPgtTtik';

function getToken() {
  return execSync(
    'powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"'
  ).toString().trim();
}

function apiGet(hostname, path, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname, path, method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    };
    const req = https.request(options, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(JSON.parse(raw));
        else reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0, 500)}`));
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const token = getToken();
  const doc = await apiGet('docs.googleapis.com', `/v1/documents/${DOC_ID}`, token);
  
  // Find paragraphs with background color to see exact rgbColor
  for (const el of doc.body.content || []) {
    if (el.paragraph) {
      for (const pe of el.paragraph.elements || []) {
        if (pe.textRun && pe.textRun.textStyle && pe.textRun.textStyle.backgroundColor) {
          console.log('Existing background color found:');
          console.log('Text:', pe.textRun.content.substring(0, 60));
          console.log('Color:', JSON.stringify(pe.textRun.textStyle.backgroundColor));
        }
      }
    }
  }
}

main().catch(console.error);
