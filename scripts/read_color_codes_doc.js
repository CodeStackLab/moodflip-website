const { execSync } = require('child_process');
const https = require('https');

const token = execSync('powershell -Command "gcloud auth application-default print-access-token"').toString().trim();
const DOC_ID = '1h4tDTyBzINGffc-xWb45bgA3I926bP-vzbFm3TytPBo';

const req = https.request({
  hostname: 'docs.googleapis.com',
  path: `/v1/documents/${DOC_ID}`,
  method: 'GET',
  headers: { 'Authorization': 'Bearer ' + token }
}, res => {
  let raw = '';
  res.on('data', c => raw += c);
  res.on('end', () => {
    const doc = JSON.parse(raw);
    console.log('Doc Title:', doc.title);
    let full = '';
    function traverse(content) {
      for (const el of content || []) {
        if (el.paragraph) {
          for (const pe of el.paragraph.elements || []) {
            if (pe.textRun && pe.textRun.content) full += pe.textRun.content;
          }
        } else if (el.table) {
          for (const row of el.table.tableRows || []) {
            for (const cell of row.tableCells || []) traverse(cell.content);
          }
        }
      }
    }
    traverse(doc.body.content);
    console.log('\n--- FULL TEXT ---\n', full);
  });
});
req.end();
