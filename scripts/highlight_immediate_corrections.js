/**
 * highlight_immediate_corrections.js
 * Highlights items 2-8 in the "Immediate correction required" section of the Google Doc with yellow background.
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
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(raw ? JSON.parse(raw) : {});
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0, 500)}`));
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

const ITEMS_TO_HIGHLIGHT = [
  'Remove Blog / Resources / generic wellness-journal content.',
  'Remove fake AdSense placeholders from the early launch design; only keep clean planned ad spaces for later.',
  'Implement the approved 3-layer mood selection: main mood family -> second-layer feeling -> third-layer feeling.',
  'Use the required five main mood families: Sad, Disgusted, Angry, Fearful, Bad.',
  'Implement the result layout exactly as specified: selected negative mood(s) on the left; positive target mood and one 60-second action on the right, with the uplifting sun/right-side design and the FLIP YOUR MOOD arrow/button in the middle.',
  'Show proof for the paid PDF, profile, Stripe, admin dashboard, CSV export, 90-day deletion and tracking features.',
  'Remove every single added part'
];

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

  console.log('\nSearching and building highlight requests:');
  for (let i = 0; i < ITEMS_TO_HIGHLIGHT.length; i++) {
    const text = ITEMS_TO_HIGHLIGHT[i];
    const pos = fullDocText.indexOf(text);
    if (pos === -1) {
      console.log(`  ❌ Not found: Item ${i + 2}`);
      continue;
    }

    const startIdx = baseOffset + pos;
    const endIdx = startIdx + text.length;

    console.log(`  🟡 Item ${i + 2}: [${startIdx}, ${endIdx}]`);
    console.log(`     "${text.substring(0, 60)}..."`);

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

  if (requests.length === 0) {
    console.log('No requests to send.');
    return;
  }

  console.log(`\nSending batchUpdate for ${requests.length} items...`);
  const result = await apiRequest('docs.googleapis.com', 'POST', `/v1/documents/${DOC_ID}:batchUpdate`, { requests }, token);
  console.log('✓ Successfully highlighted items 2-8 in Google Doc! Replies:', result.replies ? result.replies.length : 0);
  console.log(`\nView updated Google Doc:\nhttps://docs.google.com/document/d/${DOC_ID}/edit`);
}

main().catch(console.error);
