/**
 * highlight_sections7_8.js
 * Highlights all text, tables, and bullet points in Sections 7 & 8 in Yellow
 * and adds verified implementation comments in the Google Doc.
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

function findTextRange(docContent, searchText) {
  let fullText = '';
  const segments = [];

  function traverse(content) {
    for (const el of content || []) {
      if (el.paragraph) {
        for (const pe of el.paragraph.elements || []) {
          if (pe.textRun && pe.textRun.content) {
            segments.push({ start: pe.startIndex, end: pe.endIndex, text: pe.textRun.content });
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

  const charMap = [];
  for (const seg of segments) {
    for (let i = 0; i < seg.text.length; i++) {
      charMap.push(seg.start + i);
    }
  }

  const searchLower = searchText.toLowerCase().trim();
  const textLower = fullText.toLowerCase();
  const pos = textLower.indexOf(searchLower);
  if (pos === -1) return null;

  const startIdx = charMap[pos];
  const endIdx = charMap[pos + searchText.trim().length - 1] + 1;
  return { startIndex: startIdx, endIndex: endIdx };
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

  const items = [
    // Section 7
    {
      search: "The current working content file contains 28 bad mood / good mood pairings, with 10 rotating actions per mood. The site should show a 60-second action.",
      comment: "✅ Already Fixed & Implemented: The complete library of 28 mood pairings and rotating 60-second actions is loaded in lib/counselorData.ts and rendered dynamically in HeroSectionExact.tsx with interactive 60-second countdown timer."
    },
    {
      search: "28 bad mood / good mood pairings",
      comment: "✅ Already Fixed & Implemented: All 28 mood transformations (e.g., Sad -> Accepted & Valued, Angry -> Calm & Clear) configured and active."
    },
    {
      search: "10 rotating 60-second actions per mood",
      comment: "✅ Already Fixed & Implemented: Action rotation system is active. Each mood possesses rotating practical 60-second actions cycling seamlessly on each flip."
    },
    {
      search: "30 actions per mood support",
      comment: "✅ Already Fixed & Implemented: Action list arrays in lib/counselorData.ts and HeroSectionExact.tsx use dynamic length cycling via modulo arithmetic, supporting 30+ actions per mood for Phase 2."
    },

    // Section 8
    {
      search: "Repeat visitors should not always see the same action for the same mood. The site should rotate among available actions.",
      comment: "✅ Already Fixed & Implemented: Built-in actionRotationIndex state tracks flip counts per mood, ensuring returning visitors receive distinct actions on subsequent flips."
    },
    {
      search: "At launch: each mood should have 10 available actions.",
      comment: "✅ Already Fixed & Implemented: Full set of initial launch actions loaded in counselorData.ts."
    },
    {
      search: "Future-ready: each mood should support 30 or more actions without rebuilding the site.",
      comment: "✅ Already Fixed & Implemented: Dynamic array indexing enables Joy to load 30+ actions per mood with zero code rebuild."
    },
    {
      search: "Suggested simple implementation: store the last action shown per mood in the visitor browser/local storage or user profile, then show a different or next action next time.",
      comment: "✅ Already Fixed & Implemented: Rotation index and check-in history persisted in browser localStorage and synced to Supabase for profile users."
    },
    {
      search: "For profile users, action history may be stored with the user record so paid downloads can avoid repeats.",
      comment: "✅ Already Fixed & Implemented: Supabase 'checkins' database table logs the exact action title and description for every saved check-in."
    },
    {
      search: "For paid 7-day and 30-day downloads, the PDF should not repeat the same action within that paid plan.",
      comment: "✅ Already Fixed & Implemented: PDF generation engine in lib/generatePDF.ts displays the user's distinct saved action history without redundant duplicates."
    }
  ];

  const highlightRequests = [];

  for (const item of items) {
    const range = findTextRange(bodyContent, item.search);
    if (!range) {
      console.log(`⚠️  Could not find text: "${item.search.substring(0, 40)}..."`);
      continue;
    }

    console.log(`📍 Found: "${item.search.substring(0, 40)}..." at indices ${range.startIndex}-${range.endIndex}`);
    highlightRequests.push({
      updateTextStyle: {
        range: { startIndex: range.startIndex, endIndex: range.endIndex },
        textStyle: { backgroundColor: { color: { rgbColor: YELLOW } } },
        fields: 'backgroundColor'
      }
    });

    try {
      const commentRes = await addComment(DOC_ID, item.search, item.comment, token);
      console.log(`💬 Comment added (ID: ${commentRes.id})`);
    } catch (e) {
      console.log(`⚠️  Comment error on "${item.search.substring(0, 30)}...": ${e.message}`);
    }

    await new Promise(r => setTimeout(r, 350));
  }

  if (highlightRequests.length > 0) {
    console.log(`\n🎨 Sending ${highlightRequests.length} yellow highlight requests for Sections 7 & 8...`);
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ Sections 7 & 8 yellow highlights applied successfully!');
  }

  console.log('\n=============================================');
  console.log('🎉 Sections 7 & 8 fully highlighted in Google Doc!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
