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

async function main() {
  const token = getToken();
  const doc = await apiGet('docs.googleapis.com', `/v1/documents/${DOC_ID}`, token);
  console.log('Doc Title:', doc.title);
  
  // Extract all structural elements with start/end indices
  const elements = [];
  function processElements(content) {
    for (const el of content || []) {
      if (el.paragraph) {
        for (const pe of el.paragraph.elements || []) {
          if (pe.textRun) {
            elements.push({
              startIndex: pe.startIndex,
              endIndex: pe.endIndex,
              content: pe.textRun.content
            });
          }
        }
      } else if (el.table) {
        for (const row of el.table.tableRows || []) {
          for (const cell of row.tableCells || []) {
            processElements(cell.content);
          }
        }
      }
    }
  }

  processElements(doc.body.content);

  console.log(`Total text elements: ${elements.length}`);
  
  // Combine all text to search substrings
  let fullText = '';
  for (const el of elements) {
    fullText += el.content;
  }

  // Print numbered sections to find them
  const regex = /(\b(?:[0-9]{1,2})\b\s*\n+.*?(?=\n\s*\b[0-9]{1,2}\b|\n*$))/gs;
  let match;
  while ((match = regex.exec(fullText)) !== null) {
    if (match[0].length < 300) {
      console.log(`\n--- Match at index ${match.index} ---:\n${match[0].trim()}`);
    }
  }
}

main().catch(console.error);
