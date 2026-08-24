/**
 * sync_v4_secondary_doc.js
 * Highlights all sections in Google Doc `1w6Dntstes03JQAlLR7C8r7q7zCBH-SEyOUhVZgo-VzY`
 * (MoodFlip_Business_Specification_v4 duplicate/alternate) in Yellow.
 */

const { execSync } = require('child_process');
const https = require('https');

const DOC_ID = '1w6Dntstes03JQAlLR7C8r7q7zCBH-SEyOUhVZgo-VzY';
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

const ITEMS = [
  "12. SEO & Traffic Growth",
  "13. AdSense Placement",
  "14. Technical Architecture & Hosting",
  "15. Security & Reliability",
  "16. Design Direction, Animation & Popups",
  "17. Ownership & Handover",
  "18. Maintenance & Future Updates",
  "19. Developer Offer Review & Product Rules",
  "20. Migration & Hosting Limits",
  "21. Test Mode & Bug Fixing Period",
  "22. Live Launch & Final Handover Deliverables"
];

async function main() {
  const token = getToken();
  console.log('✅ Token obtained');

  const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID}`, null, token);
  console.log(`✅ Loaded doc: "${doc.title}"`);

  const foundRanges = findExactRanges(doc.body.content, ITEMS);
  console.log(`Found ${foundRanges.length} matching ranges.`);

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
    console.log(`✅ Yellow highlights applied to "${doc.title}"!`);
  }

  console.log('\n=============================================');
  console.log('🎉 Secondary v4 specification doc synchronized!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
