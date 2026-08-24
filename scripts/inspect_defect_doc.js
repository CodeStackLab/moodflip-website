const { execSync } = require('child_process');
const https = require('https');

const token = execSync('powershell -Command "gcloud auth application-default print-access-token"').toString().trim();
const DOC_ID = '12vozTZ8n1sO2GOG1R3MSrnQ6klte5ByFm6SrXGdFxCg';

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

function extractText(content) {
  let text = '';
  for (const el of content || []) {
    if (el.paragraph) {
      for (const pe of el.paragraph.elements || []) {
        if (pe.textRun && pe.textRun.content) text += pe.textRun.content;
      }
    } else if (el.table) {
      for (const row of el.table.tableRows || []) {
        for (const cell of row.tableCells || []) {
          text += extractText(cell.content);
        }
      }
    }
  }
  return text;
}

async function main() {
  const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID}`);
  console.log('Title:', doc.title);
  const fullText = extractText(doc.body.content);
  console.log('Total Length:', fullText.length);
  require('fs').writeFileSync('scripts/defect_list_doc_text.txt', fullText);
  console.log('First 2000 chars:\n', fullText.substring(0, 2000));
}

main().catch(console.error);
