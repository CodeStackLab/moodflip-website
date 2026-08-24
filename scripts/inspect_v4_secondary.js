const { execSync } = require('child_process');
const https = require('https');

const token = execSync('powershell -Command "gcloud auth application-default print-access-token"').toString().trim();
const DOC_ID = '1w6Dntstes03JQAlLR7C8r7q7zCBH-SEyOUhVZgo-VzY';

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
    const text = extractText(doc.body.content);
    console.log('Doc title:', doc.title);
    console.log('Text length:', text.length);
    console.log('First 500 chars:', text.substring(0, 500));
  });
});
req.end();
