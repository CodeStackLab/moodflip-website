const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');

const DOC_ID = '1V3_F4pDUAS6H4RF-oRaguwq0qjJWmE3OrMggVVHK9tU';

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
        if (res.statusCode >= 200 && res.statusCode < 300) return resolve(raw ? JSON.parse(raw) : {});
        reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0, 400)}`));
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
    console.log(`Fetching Google Doc: ${DOC_ID}...`);
    const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID}`, null, token);
    
    fs.writeFileSync('scripts/target_doc_raw.json', JSON.stringify(doc, null, 2));
    console.log(`Title: ${doc.title}`);

    let fullText = '';
    function extractRuns(content) {
      for (const el of content || []) {
        if (el.paragraph) {
          for (const pe of el.paragraph.elements || []) {
            if (pe.textRun && pe.textRun.content) {
              fullText += pe.textRun.content;
            }
          }
        } else if (el.table) {
          for (const row of el.table.tableRows || []) {
            for (const cell of row.tableCells || []) {
              extractRuns(cell.content);
            }
          }
        }
      }
    }

    extractRuns(doc.body.content);
    fs.writeFileSync('scripts/target_doc_text.txt', fullText, 'utf8');
    console.log(`Successfully extracted ${fullText.length} characters of text to scripts/target_doc_text.txt`);

    // Also fetch comments
    console.log('Fetching comments via Drive API...');
    const comments = await apiRequest('www.googleapis.com', 'GET', `/drive/v3/files/${DOC_ID}/comments?fields=*`, null, token);
    fs.writeFileSync('scripts/target_doc_comments.json', JSON.stringify(comments, null, 2));
    console.log(`Found ${comments.comments ? comments.comments.length : 0} comments.`);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
