const { execSync } = require('child_process');
const https = require('https');

const token = execSync('powershell -Command "gcloud auth application-default print-access-token"').toString().trim();
const req = https.request({
  hostname: 'docs.googleapis.com',
  path: '/v1/documents/1qD1U9bpd96dQRjRHYCLgowBTLGFa_JY-UCQ9zEckC3w',
  method: 'GET',
  headers: { 'Authorization': 'Bearer ' + token }
}, res => {
  let raw = '';
  res.on('data', c => raw += c);
  res.on('end', () => {
    const doc = JSON.parse(raw);
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
    console.log('Doc text length:', full.length);

    const terms = ['soft ivory', 'FEFAF8', '7464AC', 'palette', 'HEX', 'ivory', 'lavender', 'cream', 'peach'];
    for (const term of terms) {
      let pos = 0;
      while ((pos = full.toLowerCase().indexOf(term.toLowerCase(), pos)) !== -1) {
        console.log(`Found "${term}" at ${pos}: ${JSON.stringify(full.substring(Math.max(0, pos - 30), pos + 70))}`);
        pos += term.length;
      }
    }
  });
});
req.end();
