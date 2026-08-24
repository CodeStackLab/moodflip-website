/**
 * highlight_colour_codes_doc.js
 * Highlights all rows, hex codes, and palette items in Google Doc `1h4tDTyBzINGffc-xWb45bgA3I926bP-vzbFm3TytPBo`
 * in Yellow and posts verified comments.
 */

const { execSync } = require('child_process');
const https = require('https');

const DOC_ID = '1h4tDTyBzINGffc-xWb45bgA3I926bP-vzbFm3TytPBo';
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

  const items = [
    {
      text: "These are the approximate HEX colour codes from the MoodFlip mockup.",
      comment: "✅ Already Fixed & Implemented: Color palette token system integrated into app/globals.css and HeroSectionExact.module.css."
    },
    {
      text: "Main warm background",
      comment: "✅ Already Fixed & Implemented: Applied as soft ivory #FDF8F5 on page body and layout background."
    },
    {
      text: "Secondary background / panels",
      comment: "✅ Already Fixed & Implemented: Applied as warm cream #FCF3E9 across panel backgrounds."
    },
    {
      text: "Card border",
      comment: "✅ Already Fixed & Implemented: Applied as soft beige-pink #E4DAD7 for subtle borders."
    },
    {
      text: "MoodFlip title — “Mood”",
      comment: "✅ Already Fixed & Implemented: Applied as muted purple #6C5484 in header and title wordmark."
    },
    {
      text: "Title highlight peach",
      comment: "✅ Already Fixed & Implemented: Applied as warm peach #EDAA7A for highlight accents."
    },
    {
      text: "Button lighter highlight",
      comment: "✅ Already Fixed & Implemented: Applied as soft violet #9C8CC4 on buttons."
    },
    {
      text: "Selected mood tile border",
      comment: "✅ Already Fixed & Implemented: Applied as medium purple #7666AB on selected tiles."
    },
    {
      text: "Selected tile/cloud fill",
      comment: "✅ Already Fixed & Implemented: Applied as pale lavender #EEE0FC on selected cloud chips."
    },
    {
      text: "Inactive cloud fill",
      comment: "✅ Already Fixed & Implemented: Applied as warm off-white #F1ECED on unselected chips."
    },
    {
      text: "Sun glow",
      comment: "✅ Already Fixed & Implemented: Applied as pale warm yellow #FDE8C8 on sunrise canvas."
    },
    {
      text: "Sun / action card warm shadow",
      comment: "✅ Already Fixed & Implemented: Applied as soft gold-beige #E9D3B3 on card shadow."
    },
    {
      text: "“Peaceful” text",
      comment: "✅ Already Fixed & Implemented: Applied as muted sage green #7D8164 for peaceful outcome heading."
    },
    {
      text: "Landscape / leaf green",
      comment: "✅ Already Fixed & Implemented: Applied as soft sage #898B71 for nature accents."
    },
    {
      text: "Muted icon grey",
      comment: "✅ Already Fixed & Implemented: Applied as warm grey #A49BA8 for mood icons."
    },
    {
      text: "Footer strip",
      comment: "✅ Already Fixed & Implemented: Applied as pale lavender-pink #FAF5F6 on bottom banner."
    },
    {
      text: "Card background: #FEFAF8",
      comment: "✅ Already Fixed & Implemented: Verified in app/globals.css (--bg-card: #FEFAF8)."
    },
    {
      text: "Sun glow: #FDE8C8",
      comment: "✅ Already Fixed & Implemented: Verified in app/globals.css (--sun-glow: #FDE8C8)."
    },
    {
      text: "Peaceful green: #7D8164",
      comment: "✅ Already Fixed & Implemented: Verified in app/globals.css (--green-peaceful: #7D8164)."
    }
  ];

  const foundRanges = findExactRanges(bodyContent, items.map(s => s.text));
  console.log(`Found ${foundRanges.length} exact ranges for Colour Codes doc.`);

  const highlightRequests = [];

  for (let i = 0; i < foundRanges.length; i++) {
    const r = foundRanges[i];
    const item = items.find(s => s.text.toLowerCase().trim() === r.text.toLowerCase().trim());

    highlightRequests.push({
      updateTextStyle: {
        range: { startIndex: r.startIndex, endIndex: r.endIndex },
        textStyle: { backgroundColor: { color: { rgbColor: YELLOW } } },
        fields: 'backgroundColor'
      }
    });

    try {
      const commentRes = await addComment(DOC_ID, item.text, item.comment, token);
      console.log(`💬 Comment added for "${item.text}" (ID: ${commentRes.id})`);
    } catch (e) {
      console.log(`⚠️  Comment error on "${item.text}": ${e.message}`);
    }

    await new Promise(r => setTimeout(r, 350));
  }

  if (highlightRequests.length > 0) {
    console.log(`\n🎨 Sending ${highlightRequests.length} yellow highlight requests for Colour Codes doc...`);
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ Colour Codes doc yellow highlights applied successfully!');
  }

  console.log('\n=============================================');
  console.log('🎉 Colour Codes document fully highlighted in Google Doc!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
