/**
 * read_doc_issues.js
 * Reads a Google Doc and its Drive comments to identify open/unfixed issues.
 */
const { execSync } = require('child_process');
const https = require('https');

const DOC_ID = '1G01r_TJjjtPNvClHsBH4tMAXJJWou16r1X6WPgtTtik';

function getToken() {
  return execSync(
    'powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"'
  ).toString().trim();
}

function apiGet(hostname, path, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname, path, method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    };
    const req = https.request(options, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(JSON.parse(raw));
        else reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0, 500)}`));
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function extractText(doc) {
  let text = '';
  for (const el of doc.body.content || []) {
    if (el.paragraph) {
      for (const pe of el.paragraph.elements || []) {
        if (pe.textRun) text += pe.textRun.content;
      }
    } else if (el.table) {
      for (const row of el.table.tableRows || []) {
        for (const cell of row.tableCells || []) {
          for (const cel of cell.content || []) {
            if (cel.paragraph) {
              for (const pe of cel.paragraph.elements || []) {
                if (pe.textRun) text += pe.textRun.content;
              }
            }
          }
        }
      }
    }
  }
  return text;
}

async function main() {
  const token = getToken();
  console.log('Reading Google Doc...');
  const doc = await apiGet('docs.googleapis.com', `/v1/documents/${DOC_ID}`, token);
  console.log('Title:', doc.title);
  console.log('\n===== DOC CONTENT (first 10000 chars) =====');
  const text = extractText(doc);
  console.log(text.substring(0, 10000));
  console.log('\n===== DOC COMMENTS =====');
  const commentsRes = await apiGet('www.googleapis.com', `/drive/v3/files/${DOC_ID}/comments?fields=*&pageSize=100`, token);
  const comments = commentsRes.comments || [];
  console.log(`Total comments: ${comments.length}`);
  for (let i = 0; i < comments.length; i++) {
    const c = comments[i];
    console.log(`\n--- Comment ${i+1} [${c.id}] ---`);
    console.log(`Author: ${c.author?.displayName}`);
    console.log(`Resolved: ${c.resolved}`);
    console.log(`Content: ${c.content}`);
    if (c.replies && c.replies.length > 0) {
      for (const r of c.replies) {
        console.log(`  Reply (${r.author?.displayName}): ${r.content}`);
      }
    }
    if (c.quotedFileContent) {
      console.log(`Quoted: ${c.quotedFileContent.value}`);
    }
  }
}

main().catch(e => console.error('Error:', e.message));
