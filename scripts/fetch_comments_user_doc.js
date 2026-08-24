const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');

const DOC_ID = '1qD1U9bpd96dQRjRHYCLgowBTLGFa_JY-UCQ9zEckC3w';

function getToken() {
  return execSync(
    'powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"'
  ).toString().trim();
}

function apiRequest(hostname, method, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname, path, method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    };
    const req = https.request(options, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        if (res.statusCode === 204) return resolve({});
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            return resolve(raw ? JSON.parse(raw) : {});
          } catch (e) {
            return resolve(raw);
          }
        }
        reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0, 500)}`));
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  try {
    const token = getToken();
    console.log(`Checking comments for ${DOC_ID}...`);
    const comments = await apiRequest(
      'www.googleapis.com',
      'GET',
      `/drive/v3/files/${DOC_ID}/comments?fields=*`,
      null,
      token
    );
    console.log(`Comments count: ${(comments.comments || []).length}`);
    fs.writeFileSync('scripts/user_doc_comments.json', JSON.stringify(comments, null, 2));
    
    for (const c of comments.comments || []) {
      console.log(`\nComment by ${c.author?.displayName}: "${c.content}"`);
      console.log(`Quoted text: "${c.quotedFileContent?.value || 'N/A'}"`);
      console.log(`Resolved: ${c.resolved}`);
      for (const r of c.replies || []) {
        console.log(`  -> Reply by ${r.author?.displayName}: "${r.content}"`);
      }
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
