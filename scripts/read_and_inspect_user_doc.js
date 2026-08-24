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
    console.log(`Getting document: ${DOC_ID}...`);
    const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID}`, null, token);
    
    fs.writeFileSync('scripts/user_doc_raw.json', JSON.stringify(doc, null, 2));
    console.log(`Document Title: "${doc.title}"`);
    console.log(`Document Revision ID: ${doc.revisionId}`);

    let fullText = '';
    let structuralElements = [];

    function extractContent(content, depth = 0) {
      for (const el of content || []) {
        if (el.paragraph) {
          let pText = '';
          for (const pe of el.paragraph.elements || []) {
            if (pe.textRun && pe.textRun.content) {
              pText += pe.textRun.content;
            }
          }
          if (pText.trim()) {
            fullText += pText;
            structuralElements.push({
              type: 'paragraph',
              startIndex: el.startIndex,
              endIndex: el.endIndex,
              style: el.paragraph.paragraphStyle?.namedStyleType,
              text: pText.trim()
            });
          }
        } else if (el.table) {
          structuralElements.push({
            type: 'table',
            startIndex: el.startIndex,
            endIndex: el.endIndex,
            rows: el.table.rows,
            columns: el.table.columns
          });
          for (const row of el.table.tableRows || []) {
            for (const cell of row.tableCells || []) {
              extractContent(cell.content, depth + 1);
            }
          }
        }
      }
    }

    extractContent(doc.body.content);
    fs.writeFileSync('scripts/user_doc_text.txt', fullText, 'utf8');
    fs.writeFileSync('scripts/user_doc_structure.json', JSON.stringify(structuralElements, null, 2), 'utf8');
    
    console.log(`Extracted ${fullText.length} characters.`);
    console.log(`--- PREVIEW OF DOC CONTENT ---`);
    console.log(fullText.substring(0, 1500));
    console.log(`-------------------------------`);
  } catch (err) {
    console.error('Error fetching doc:', err.message);
  }
}

main();
