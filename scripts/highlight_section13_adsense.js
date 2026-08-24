/**
 * highlight_section13_adsense.js
 * Highlights all bullet points, placement guidelines (Desktop, Tablet, Mobile) in Section 13 (AdSense) in Yellow
 * and adds verified comments in the Google Doc.
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
    {
      search: "Developer should prepare the site for a future AdSense application.",
      comment: "✅ Already Fixed & Implemented: Dedicated ad container components built into HeroSectionExact.tsx ready for seamless AdSense script integration."
    },
    {
      search: "Ads should appear in Phase 2; the primary early monetisation should be email/profile capture and paid downloads.",
      comment: "✅ Already Fixed & Implemented: Ads are toggled off by default (adsEnabled=false) in Phase 1 to prioritize $7 report sales, and can be activated with 1-click in Phase 2."
    },
    {
      search: "The site should be designed with ad spaces from the beginning, my suggestion is on the top and on the bottom. AdSense ads should only be activated after the site is approved and ready.",
      comment: "✅ Already Fixed & Implemented: Pre-formatted responsive slots created at top (728x90) and bottom (728x90 / responsive) in HeroSectionExact.tsx."
    },
    {
      search: "Right-side ad space",
      comment: "✅ Already Fixed & Implemented: Desktop layout supports 300x250 ad space beside/below the action card."
    },
    {
      search: "Place one ad on the right side, probably beside or below the Peaceful/action card, not above the whole page.",
      comment: "✅ Already Fixed & Implemented: Configured cleanly below action card in right column."
    },
    {
      search: "Bottom ad space",
      comment: "✅ Already Fixed & Implemented: Bottom ad container placed above footer message strip."
    },
    {
      search: "Place one horizontal ad below the main MoodFlip tool, before the footer/supportive message strip.",
      comment: "✅ Already Fixed & Implemented: Placed directly below the main hero grid container."
    },
    {
      search: "One ad after the main mood tool/result section",
      comment: "✅ Already Fixed & Implemented: Tablet layout stacks ad cleanly below outcome."
    },
    {
      search: "One ad near the bottom",
      comment: "✅ Already Fixed & Implemented: Positioned before footer."
    },
    {
      search: "Do not put ads between the mood selection steps and the Flip Your Mood button.",
      comment: "✅ Already Fixed & Implemented: Mood selection interactive steps and center arrow button are completely ad-free to prevent accidental clicks and preserve seamless UX."
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
      console.log(`⚠️  Comment error on "${item.search}": ${e.message}`);
    }

    await new Promise(r => setTimeout(r, 350));
  }

  if (highlightRequests.length > 0) {
    console.log(`\n🎨 Sending ${highlightRequests.length} yellow highlight requests for Section 13...`);
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ Section 13 yellow highlights applied successfully!');
  }

  console.log('\n=============================================');
  console.log('🎉 Section 13 AdSense fully highlighted in Google Doc!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
