const { execSync } = require('child_process');
const https = require('https');

const token = execSync('powershell -Command "gcloud auth application-default print-access-token"').toString().trim();
const DOC_ID_1 = '12vozTZ8n1sO2GOG1R3MSrnQ6klte5ByFm6SrXGdFxCg';

function apiRequest(hostname, method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname, path, method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    }, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID_1}`);
  console.log('Doc title:', doc.title);

  // Find all tables in doc
  let tableIndex = 0;
  for (const el of doc.body.content || []) {
    if (el.table) {
      tableIndex++;
      console.log(`Table ${tableIndex}: ${el.table.rows} rows, start: ${el.startIndex}, end: ${el.endIndex}`);
      // inspect first 5 rows
      for (let r = 0; r < Math.min(el.table.tableRows.length, 12); r++) {
        const row = el.table.tableRows[r];
        let rowText = `Row ${r}: `;
        for (const cell of row.tableCells) {
          let cellText = '';
          for (const cEl of cell.content || []) {
            if (cEl.paragraph) {
              for (const pe of cEl.paragraph.elements || []) {
                if (pe.textRun && pe.textRun.content) cellText += pe.textRun.content.trim() + ' ';
              }
            }
          }
          rowText += `[${cellText.trim().substring(0, 30)}] `;
        }
        console.log(rowText);
      }
    }
  }
}

main().catch(console.error);
