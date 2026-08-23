const { execSync } = require('child_process');
const https = require('https');

const DOC_ID = '1h4tDTyBzINGffc-xWb45bgA3I926bP-vzbFm3TytPBo';

let token;
try {
  token = execSync('gcloud auth application-default print-access-token', { encoding: 'utf8' }).trim();
  console.log('Token obtained (first 30 chars):', token.substring(0, 30));
} catch (e) {
  console.error('Token error:', e.message);
  process.exit(1);
}

const options = {
  hostname: 'docs.googleapis.com',
  path: '/v1/documents/' + DOC_ID,
  method: 'GET',
  headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' }
};

const req = https.request(options, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const doc = JSON.parse(d);
    let text = '';
    function ex(content) {
      for (const el of content || []) {
        if (el.paragraph) {
          for (const pe of el.paragraph.elements || []) {
            if (pe.textRun) text += pe.textRun.content;
          }
          text += '\n';
        } else if (el.table) {
          for (const row of el.table.tableRows || []) {
            for (const cell of row.tableCells || []) {
              ex(cell.content);
            }
          }
        }
      }
    }
    ex(doc.body && doc.body.content);
    console.log('=== DOCUMENT TEXT (first 10000 chars) ===');
    console.log(text.substring(0, 10000));
    require('fs').writeFileSync('/tmp/doc_content.txt', text);
    console.log('\n=== TOTAL LENGTH:', text.length);
  });
});

req.on('error', e => console.error('Request error:', e.message));
req.end();
