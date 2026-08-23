/**
 * read_new_doc.js
 * Reads and dumps the content of the new Google Doc:
 * 1h4tDTyBzINGffc-xWb45bgA3I926bP-vzbFm3TytPBo
 */
const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');

const DOC_ID = '1h4tDTyBzINGffc-xWb45bgA3I926bP-vzbFm3TytPBo';

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
  const token = getToken();
  console.log(`Fetching Google Doc: ${DOC_ID}...`);
  const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID}`, null, token);
  
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

  fs.writeFileSync('scripts/new_doc_content.txt', fullText);
  fs.writeFileSync('scripts/new_doc_raw.json', JSON.stringify(doc, null, 2));
  console.log(`Saved doc content (${fullText.length} chars) to scripts/new_doc_content.txt`);
  console.log('\n--- FIRST 2000 CHARS ---\n');
  console.log(fullText.substring(0, 2000));
}

main().catch(console.error);
