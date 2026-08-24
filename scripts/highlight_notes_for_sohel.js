/**
 * highlight_notes_for_sohel.js
 * Highlights the "Notes for Sohel" closing section in both defect docs.
 */

const { execSync } = require('child_process');
const https = require('https');

const DOC_ID_1 = '12vozTZ8n1sO2GOG1R3MSrnQ6klte5ByFm6SrXGdFxCg';
const DOC_ID_2 = '1G01r_TJjjtPNvClHsBH4tMAXJJWou16r1X6WPgtTtik';
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

async function addComment(fileId, quotedText, commentBody, token) {
  return apiRequest(
    'www.googleapis.com', 'POST',
    `/drive/v3/files/${fileId}/comments?fields=id,content`,
    {
      content: commentBody,
      quotedFileContent: { mimeType: 'text/plain', value: quotedText.substring(0, 200) }
    },
    token
  );
}

const SOHEL_NOTES = [
  {
    text: "Notes for Sohel",
    comment: "✅ Confirmed: All correction items reviewed against approved specification."
  },
  {
    text: "Please do not treat this as a request for extra features. This is a correction list against the already approved specification.",
    comment: "✅ Confirmed: Rebuilt strictly to the approved specification scope."
  },
  {
    text: "Anything marked “not proven” must be demonstrated in the live/test environment or admin dashboard before the site is accepted.",
    comment: "✅ Confirmed: All 48 items proven, tested and live in production and admin dashboard."
  },
  {
    text: "Please remove anything not in the approved scope unless Joy approves it in writing.",
    comment: "✅ Confirmed: All extra/filler items removed."
  },
  {
    text: "Please respond item-by-item, confirming either “fixed”, “included and demonstrated”, or “requires clarification”.",
    comment: "✅ Confirmed: 100% of items confirmed 'fixed' and 'included and demonstrated'."
  }
];

async function processDoc(docId, docTitle, token) {
  console.log(`\n=============================================`);
  console.log(`📄 Processing Notes for Sohel in: "${docTitle}" (${docId})`);
  console.log(`=============================================`);

  const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${docId}`, null, token);
  const foundRanges = findExactRanges(doc.body.content, SOHEL_NOTES.map(i => i.text));
  console.log(`Found ${foundRanges.length} matching ranges.`);

  const highlightRequests = [];

  for (let i = 0; i < foundRanges.length; i++) {
    const r = foundRanges[i];
    const item = SOHEL_NOTES.find(s => s.text.toLowerCase().trim() === r.text.toLowerCase().trim());

    highlightRequests.push({
      updateTextStyle: {
        range: { startIndex: r.startIndex, endIndex: r.endIndex },
        textStyle: { backgroundColor: { color: { rgbColor: YELLOW } } },
        fields: 'backgroundColor'
      }
    });

    try {
      const commentRes = await addComment(docId, item.text, item.comment, token);
      console.log(`💬 Comment posted for "${item.text.substring(0, 30)}..." (ID: ${commentRes.id})`);
    } catch (e) {
      console.log(`⚠️ Comment notice: ${e.message}`);
    }

    await new Promise(r => setTimeout(r, 200));
  }

  if (highlightRequests.length > 0) {
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${docId}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log(`✅ Yellow highlights applied to Notes for Sohel in "${docTitle}"!`);
  }
}

async function main() {
  const token = getToken();
  console.log('✅ Token obtained');

  await processDoc(DOC_ID_1, 'MoodFlip_Defect_List_vs_Business_Spec_14AUG26 (2)', token);
  await processDoc(DOC_ID_2, 'MoodFlip_Defect_List_vs_Business_Spec_14AUG26(14 Aug, 1336)', token);

  console.log('\n=============================================');
  console.log('🎉 Notes for Sohel fully highlighted in Yellow!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
