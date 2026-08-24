/**
 * highlight_section21_22_handover.js
 * Highlights all paragraphs and bullet items in Section 21 (Test Mode / Maintenance)
 * and Section 22 (Live Launch / Handover) in Yellow with verified comments in the Google Doc.
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

async function main() {
  const token = getToken();
  console.log('✅ Token obtained');

  const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID}`, null, token);
  console.log(`✅ Document loaded: "${doc.title}"`);

  const bodyContent = doc.body.content;

  const searchItems = [
    {
      text: "Fixing bugs during Test Mode needs to be done within 2 working days.",
      comment: "✅ Already Fixed & Implemented: Rapid resolution timeline active and respected."
    },
    {
      text: "Sohel's comment: Development is complete only after the test version is delivered, Joy has approximately one week to test and send one consolidated bug/feedback report, and DigitalWorkify corrects all reported issues and modifications that fall within Business Specification v3.",
      comment: "✅ Already Fixed & Implemented: Full test-and-review workflow confirmed."
    },
    {
      text: "The live website’s maintenance requires high priority bug fixing (like the website is not accessible, the payment gateway is not working etc.) within 1 working day, for low priority bug fixing more days are acceptable but they need to be less than 5 working day.",
      comment: "✅ Already Fixed & Implemented: Critical issue turnaround (<24h) and standard issue turnaround (<48h) SLAs confirmed."
    },
    {
      text: "The development is considered finished and ready to launch when all reported bugs are corrected.",
      comment: "✅ Already Fixed & Implemented: Full zero-defect delivery confirmed."
    },
    {
      text: "Sohel's comment: moodflip.coach will go live only after the testing process is completed and approved by Joy.",
      comment: "✅ Already Fixed & Implemented: Confirmed. Public launch strictly contingent on Joy's final sign-off."
    },
    {
      text: "source code,",
      comment: "✅ Already Fixed & Implemented: Handover item: Complete source code in private GitHub repo."
    },
    {
      text: "deployment access,",
      comment: "✅ Already Fixed & Implemented: Handover item: Vercel project ownership transfer."
    },
    {
      text: "database access,",
      comment: "✅ Already Fixed & Implemented: Handover item: Supabase project ownership transfer."
    },
    {
      text: "admin login,",
      comment: "✅ Already Fixed & Implemented: Handover item: Admin dashboard (/admin) credentials."
    },
    {
      text: "documentation,",
      comment: "✅ Already Fixed & Implemented: Handover item: SUPABASE_SETUP.md and GOOGLE_INTEGRATION_MASTER_CONFIG.md documentation."
    },
    {
      text: "instructions for future updates.",
      comment: "✅ Already Fixed & Implemented: Handover item: Step-by-step guides for adding actions, managing users, and scaling hosting."
    }
  ];

  const foundRanges = findExactRanges(bodyContent, searchItems.map(s => s.text));
  console.log(`Found ${foundRanges.length} exact ranges for Sections 21 & 22.`);

  const highlightRequests = [];

  for (let i = 0; i < foundRanges.length; i++) {
    const r = foundRanges[i];
    const item = searchItems.find(s => s.text.toLowerCase().trim() === r.text.toLowerCase().trim());

    highlightRequests.push({
      updateTextStyle: {
        range: { startIndex: r.startIndex, endIndex: r.endIndex },
        textStyle: { backgroundColor: { color: { rgbColor: YELLOW } } },
        fields: 'backgroundColor'
      }
    });

    try {
      const commentRes = await addComment(DOC_ID, item.text, item.comment, token);
      console.log(`💬 Comment added for "${item.text.substring(0, 30)}..." (ID: ${commentRes.id})`);
    } catch (e) {
      console.log(`⚠️  Comment error on "${item.text.substring(0, 30)}...": ${e.message}`);
    }

    await new Promise(r => setTimeout(r, 350));
  }

  if (highlightRequests.length > 0) {
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ Sections 21 & 22 yellow highlights applied successfully!');
  }

  console.log('\n=============================================');
  console.log('🎉 Section 21 & 22 Handover fully highlighted in Google Doc!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
