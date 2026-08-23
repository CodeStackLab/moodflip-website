/**
 * highlight_doc_fixes.js
 * Highlights all resolved/fixed issues in the Google Doc in soft yellow (like in Google Sheets).
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

// List of issue snippets to find and highlight
const ISSUES_TO_HIGHLIGHT = [
  {
    num: 4,
    title: 'AdSense placeholders',
    matchText: 'Fake AdSense-style placeholders appear too early / look messy.'
  },
  {
    num: 13,
    title: '28 pairings structure',
    matchText: 'Generic moods are being used instead of the approved mood-pairing structure.'
  },
  {
    num: 14,
    title: '28 pairings loaded',
    matchText: '28 bad mood / good mood pairings are not proven loaded.'
  },
  {
    num: 15,
    title: '10 rotating actions loaded',
    matchText: '10 rotating 60-second actions per mood are not proven loaded.'
  },
  {
    num: 16,
    title: 'Action rotation logic',
    matchText: 'Action rotation logic is not proven working.'
  },
  {
    num: 17,
    title: 'Free tool without profile',
    matchText: 'Free tool working without profile is not proven.'
  },
  {
    num: 29,
    title: 'Privacy consent wording',
    matchText: 'Privacy consent wording is not clearly proven.'
  },
  {
    num: 30,
    title: '90-day deletion notice',
    matchText: '90-day deletion notice is not clearly proven.'
  },
  {
    num: 33,
    title: 'Mood-specific blog content',
    matchText: 'Current content looks generic/filler rather than approved useful mood pages.'
  },
  {
    num: 35,
    title: 'AdSense-ready layout clean',
    matchText: 'AdSense-ready layout is not subtle/clean.'
  },
  {
    num: 37,
    title: 'Medical overclaiming removed',
    matchText: 'Medical/scientific overclaiming needs review.'
  },
  {
    num: 39,
    title: 'No affiliate links confirmed',
    matchText: 'No affiliate links at launch must be confirmed.'
  }
];

// Yellow color for highlighting (#FFF2CC / soft highlight yellow)
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
  
  // Extract all text elements with their exact ranges
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

  // Build full document text
  let fullDocText = '';
  for (const run of textRuns) {
    fullDocText += run.content;
  }

  const requests = [];
  console.log('\nFinding ranges for fixed issues:');

  for (const issue of ISSUES_TO_HIGHLIGHT) {
    const pos = fullDocText.indexOf(issue.matchText);
    if (pos === -1) {
      console.log(`  ❌ Not found: Issue ${issue.num} ("${issue.matchText.substring(0, 30)}...")`);
      continue;
    }

    // Find the start of the issue number before this title (e.g. "4\n" or "29\n")
    // Look backwards up to 30 chars for the number
    let startPos = pos;
    const prefix = fullDocText.substring(Math.max(0, pos - 40), pos);
    const numMatch = prefix.match(new RegExp(`\\b${issue.num}\\b\\s*\\n*$`));
    if (numMatch) {
      startPos = pos - numMatch[0].length;
    }

    // Find the end of this issue description (next number or 3 newlines or max 400 chars)
    const following = fullDocText.substring(pos);
    const endMatch = following.match(/\n\s*\b[0-9]{1,2}\b\s*\n/);
    let endPos = pos + 250;
    if (endMatch && endMatch.index < 450) {
      endPos = pos + endMatch.index;
    } else {
      const nextDoubleNl = following.indexOf('\n\n\n');
      if (nextDoubleNl !== -1 && nextDoubleNl < 450) {
        endPos = pos + nextDoubleNl;
      }
    }

    // Match startPos and endPos with the actual character index in doc
    // Note: in Google Docs, index in fullDocText matches the character index 1:1 because doc.body starts at 1
    const actualStart = textRuns[0].startIndex + startPos;
    const actualEnd = textRuns[0].startIndex + endPos;

    console.log(`  🟡 Issue ${issue.num} (${issue.title}): range [${actualStart}, ${actualEnd}]`);
    console.log(`     Text preview: "${fullDocText.substring(startPos, Math.min(startPos + 70, endPos)).trim()}..."`);

    requests.push({
      updateTextStyle: {
        range: {
          startIndex: actualStart,
          endIndex: actualEnd
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

  console.log(`\nApplying yellow highlight to ${requests.length} fixed issues...`);
  const result = await apiRequest('docs.googleapis.com', 'POST', `/v1/documents/${DOC_ID}:batchUpdate`, { requests }, token);
  console.log('✓ Successfully highlighted in Google Doc! Replies:', result.replies ? result.replies.length : 0);
  console.log('\nOpen Google Doc to view:');
  console.log(`https://docs.google.com/document/d/${DOC_ID}/edit`);
}

main().catch(console.error);
