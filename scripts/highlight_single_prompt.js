const { execSync } = require('child_process');
const https = require('https');

const DOC_ID = '1qD1U9bpd96dQRjRHYCLgowBTLGFa_JY-UCQ9zEckC3w';
const token = execSync('powershell -Command "gcloud auth application-default print-access-token"').toString().trim();

function apiRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'docs.googleapis.com', path, method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    }, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => resolve(JSON.parse(raw)));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function findText(content, text) {
  let full = '';
  const segs = [];
  function trav(c) {
    for (const el of c || []) {
      if (el.paragraph) {
        for (const pe of el.paragraph.elements || []) {
          if (pe.textRun && pe.textRun.content) {
            segs.push({ start: pe.startIndex, end: pe.endIndex, text: pe.textRun.content });
            full += pe.textRun.content;
          }
        }
      } else if (el.table) {
        for (const row of el.table.tableRows || []) {
          for (const cell of row.tableCells || []) {
            trav(cell.content);
          }
        }
      }
    }
  }
  trav(content);
  const map = [];
  for (const s of segs) {
    for (let i = 0; i < s.text.length; i++) map.push(s.start + i);
  }
  const pos = full.toLowerCase().indexOf(text.toLowerCase());
  if (pos === -1) return null;
  return { start: map[pos], end: map[pos + text.length - 1] + 1 };
}

async function main() {
  const doc = await apiRequest('GET', `/v1/documents/${DOC_ID}`);
  const range = findText(doc.body.content, 'After the user saves their first MoodFlip check-in');
  if (range) {
    console.log('Found range:', range);
    await apiRequest('POST', `/v1/documents/${DOC_ID}:batchUpdate`, {
      requests: [{
        updateTextStyle: {
          range: { startIndex: range.start, endIndex: range.end },
          textStyle: { backgroundColor: { color: { rgbColor: { red: 1, green: 1, blue: 0 } } } },
          fields: 'backgroundColor'
        }
      }]
    });
    console.log('✅ Line highlighted in Yellow successfully!');
  }
}
main().catch(console.error);
