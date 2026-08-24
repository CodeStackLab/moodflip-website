const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

const DOC_ID = '1w6Dntstes03JQAlLR7C8r7q7zCBH-SEyOUhVZgo-VzY';

function getToken() {
  const token = execSync(
    'powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"'
  ).toString().trim();
  return token;
}

function apiRequest(hostname, method, apiPath, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname,
      path: apiPath,
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    };
    const req = https.request(options, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        if (res.statusCode === 204) return resolve({});
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            return resolve(raw ? JSON.parse(raw) : {});
          } catch (e) {
            return resolve({ raw });
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
    console.log(`Fetching Doc: ${DOC_ID}...`);

    // 1. Fetch Document from Google Docs API
    const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID}`, null, token);
    fs.writeFileSync(path.join(__dirname, 'new_defect_doc_raw.json'), JSON.stringify(doc, null, 2));

    // Extract text content
    let fullText = '';
    function extractText(content) {
      for (const item of content || []) {
        if (item.paragraph) {
          for (const el of item.paragraph.elements || []) {
            if (el.textRun && el.textRun.content) {
              fullText += el.textRun.content;
            }
          }
        } else if (item.table) {
          for (const row of item.table.tableRows || []) {
            for (const cell of row.tableCells || []) {
              extractText(cell.content);
              fullText += '\t';
            }
            fullText += '\n';
          }
        }
      }
    }
    extractText(doc.body.content);
    fs.writeFileSync(path.join(__dirname, 'new_defect_doc_text.txt'), fullText, 'utf8');
    console.log(`Extracted Doc Title: "${doc.title}", length: ${fullText.length} chars.`);

    // 2. Fetch all Comments from Google Drive API
    console.log('Fetching comments from Drive API...');
    const commentsRes = await apiRequest(
      'www.googleapis.com',
      'GET',
      `/drive/v3/files/${DOC_ID}/comments?fields=comments(id,author,content,quotedFileContent,createdTime,resolved,replies)&pageSize=100`,
      null,
      token
    );
    fs.writeFileSync(path.join(__dirname, 'new_defect_doc_comments.json'), JSON.stringify(commentsRes, null, 2));
    console.log(`Found ${(commentsRes.comments || []).length} comments.`);

    // Summary output
    console.log('\n=== COMMENTS SUMMARY ===');
    (commentsRes.comments || []).forEach((c, idx) => {
      console.log(`[#${idx + 1}] ID: ${c.id} | Author: ${c.author?.displayName} (${c.author?.emailAddress || 'no-email'}) | Resolved: ${c.resolved}`);
      console.log(`   Quoted: "${c.quotedFileContent?.value || ''}"`);
      console.log(`   Content: "${c.content}"`);
      if (c.replies && c.replies.length > 0) {
        c.replies.forEach(r => console.log(`      -> Reply by ${r.author?.displayName}: "${r.content}"`));
      }
    });

  } catch (err) {
    console.error('Error fetching doc:', err);
  }
}

main();
