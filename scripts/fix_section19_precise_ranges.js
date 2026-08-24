/**
 * fix_section19_precise_ranges.js
 * Ensures precise text bounds for all items in Section 19.
 */

const { execSync } = require('child_process');
const https = require('https');

const DOC_ID = '1qD1U9bpd96dQRjRHYCLgowBTLGFa_JY-UCQ9zEckC3w';
const YELLOW = { red: 1, green: 1, blue: 0 };

function getToken() {
  return execSync('powershell -Command "gcloud auth application-default print-access-token"').toString().trim();
}

function apiRequest(hostname, method, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname, path, method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    }, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        if (res.statusCode === 204) return resolve({});
        try {
          const parsed = JSON.parse(raw);
          if (res.statusCode >= 200 && res.statusCode < 300) return resolve(parsed);
          reject(new Error(`HTTP ${res.statusCode}: ${JSON.stringify(parsed).substring(0, 300)}`));
        } catch (e) {
          reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0, 300)}`));
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function findExactRanges(docContent, searchStrings) {
  let fullText = '';
  const charMap = [];

  function traverse(content) {
    for (const el of content || []) {
      if (el.paragraph) {
        for (const pe of el.paragraph.elements || []) {
          if (pe.textRun && pe.textRun.content) {
            for (let i = 0; i < pe.textRun.content.length; i++) {
              charMap.push(pe.startIndex + i);
            }
            fullText += pe.textRun.content;
          }
        }
      } else if (el.table) {
        for (const row of el.table.tableRows || []) {
          for (const cell of row.tableCells || []) {
            traverse(cell.content);
          }
        }
      }
    }
  }

  traverse(docContent);

  const results = [];
  const textLower = fullText.toLowerCase();

  for (const str of searchStrings) {
    const sLower = str.toLowerCase().trim();
    let idx = textLower.indexOf(sLower);
    if (idx !== -1) {
      const start = charMap[idx];
      const end = charMap[idx + str.trim().length - 1] + 1;
      results.push({ text: str, startIndex: start, endIndex: end });
    }
  }

  return results;
}

async function main() {
  const token = getToken();
  const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID}`, null, token);
  const bodyContent = doc.body.content;

  const searchItems = [
    "Accepted MoodFlip offer: A$395.69",
    "Digital Workify stated that he noted the requested updates",
    "30-day readiness. Future-ready database for 30-day mood tracking and PDF reports.",
    "Sohel confirms full Phase 2 launch is included, not just future-readiness.",
    "Sohel confirms support/loading for 30+ actions per mood is included",
    "If payment succeeds but PDF/email fails, the purchase must remain recorded",
    "1 year free support; after that, US$50 only for any month",
    "High-priority live bugs fixed within 24 hours and low-priority issues within 48 hours",
    "The Stripe/payment account must be owned by Joy.",
    "Users can use the free MoodFlip tool as often as they like",
    "7-day PDF up to 3 saved check-ins per day for 7 days 21 entries",
    "30-day PDF up to 3 saved check-ins per day for 30 days 90 entries",
    "The 7-day PDF should be based on 7 calendar days, not simply 7 saved entries.",
    "The 7-day paid PDF should include up to 21 saved check-ins:",
    "If a user tries to save more than 3 check-ins in one day, show a friendly message:"
  ];

  const foundRanges = findExactRanges(bodyContent, searchItems);
  console.log(`Found ${foundRanges.length} exact ranges for Section 19.`);

  const highlightRequests = foundRanges.map(r => ({
    updateTextStyle: {
      range: { startIndex: r.startIndex, endIndex: r.endIndex },
      textStyle: { backgroundColor: { color: { rgbColor: YELLOW } } },
      fields: 'backgroundColor'
    }
  }));

  if (highlightRequests.length > 0) {
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ Section 19 exact ranges highlighted in yellow!');
  }
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
