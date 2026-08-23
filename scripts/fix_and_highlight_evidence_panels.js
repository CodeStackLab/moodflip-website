/**
 * fix_and_highlight_evidence_panels.js
 * 1. Highlights Evidence Panel A and Evidence Panel B headings in Yellow in the Google Doc
 * 2. Posts a clean "Fixed." comment anchored to Evidence Panel A
 */
const { execSync } = require('child_process');
const https = require('https');

const DOC_ID = '1G01r_TJjjtPNvClHsBH4tMAXJJWou16r1X6WPgtTtik';

function getToken() {
  return execSync(
    'powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"'
  ).toString().trim();
}

function apiRequest(hostname, method, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname,
      path,
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    };
    const req = https.request(options, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        if (res.statusCode === 204) return resolve({});
        if (res.statusCode >= 200 && res.statusCode < 300) return resolve(raw ? JSON.parse(raw) : {});
        reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0, 500)}`));
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

const YELLOW_HIGHLIGHT = {
  color: {
    rgbColor: {
      red: 1.0,
      green: 0.949,
      blue: 0.8
    }
  }
};

async function main() {
  const token = getToken();

  // ── Step 1: Fetch Doc & Extract text indices ──
  console.log('Fetching Google Doc...');
  const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID}`, null, token);

  const textRuns = [];
  function extractRuns(content) {
    for (const el of content || []) {
      if (el.paragraph) {
        for (const pe of el.paragraph.elements || []) {
          if (pe.textRun && pe.textRun.content) {
            textRuns.push({
              startIndex: pe.startIndex,
              endIndex: pe.endIndex,
              content: pe.textRun.content
            });
          }
        }
      } else if (el.table) {
        for (const row of el.table.tableRows || []) {
          for (const cell of row.tableCells || []) {
            extractRuns(cell.content);
          }
        }
      }
    }
  }
  extractRuns(doc.body.content);

  let fullDocText = '';
  for (const run of textRuns) {
    fullDocText += run.content;
  }

  const baseOffset = textRuns[0].startIndex;
  const requests = [];

  const panels = [
    'Evidence Panel A - Blog/Journal content currently visible',
    'Evidence Panel B - Broken article pages currently visible'
  ];

  for (const panelText of panels) {
    const pos = fullDocText.indexOf(panelText);
    if (pos !== -1) {
      const startIdx = baseOffset + pos;
      const endIdx = startIdx + panelText.length;
      console.log(`🟡 Highlighting "${panelText}": [${startIdx}, ${endIdx}]`);
      requests.push({
        updateTextStyle: {
          range: {
            startIndex: startIdx,
            endIndex: endIdx
          },
          textStyle: {
            backgroundColor: YELLOW_HIGHLIGHT
          },
          fields: 'backgroundColor'
        }
      });
    }
  }

  if (requests.length > 0) {
    console.log('\nApplying Yellow Highlight to Evidence Panels...');
    const highlightRes = await apiRequest('docs.googleapis.com', 'POST', `/v1/documents/${DOC_ID}:batchUpdate`, { requests }, token);
    console.log('✓ Yellow highlight applied successfully! Replies:', highlightRes.replies ? highlightRes.replies.length : 0);
  }

  // ── Step 2: Post Comment on Evidence Panel A ──
  console.log('\nPosting resolution comment to Evidence Panel A...');
  try {
    const commentRes = await apiRequest('www.googleapis.com', 'POST', `/drive/v3/files/${DOC_ID}/comments?fields=*`, {
      content: 'Fixed. Removed Blog/Resources navigation links and all medical/scientific overclaiming ("science-backed", "rewire neural pathways", etc.). Site is now a clean, simple utility.',
      quotedFileContent: {
        mimeType: 'text/plain',
        value: 'Evidence Panel A - Blog/Journal content currently visible'
      }
    }, token);
    console.log(`✅ Comment posted successfully! Comment ID: ${commentRes.id}`);
  } catch (e) {
    console.log(`⚠️ Comment posting failed: ${e.message}`);
  }

  console.log(`\nView Google Doc:\nhttps://docs.google.com/document/d/${DOC_ID}/edit`);
}

main().catch(console.error);
