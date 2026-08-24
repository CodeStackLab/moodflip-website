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
    console.log(`Checking access to Google Doc ID: ${DOC_ID}...`);
    const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID}`, null, token);
    console.log(`ACCESS CONFIRMED! Title: "${doc.title}"`);
    console.log(`Document Revision ID: ${doc.revisionId}`);
    
    // Check drive comments access as well
    const comments = await apiRequest('www.googleapis.com', 'GET', `/drive/v3/files/${DOC_ID}/comments?fields=*`, null, token);
    console.log(`Drive Comments Access: OK! (${comments.comments ? comments.comments.length : 0} comments found)`);

    // Let's also check paragraph/content preview
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
    console.log(`Total Text Length: ${fullText.length} characters.`);
    console.log(`Snippet:\n---\n${fullText.slice(0, 300).trim()}\n---`);
  } catch (err) {
    console.error('FAILED TO ACCESS DOC:', err.message);
  }
}

main();
