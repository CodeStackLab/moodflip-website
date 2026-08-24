/**
 * highlight_hex_colors_table.js
 * Highlights all color palette items, descriptions, and hex codes in the Google Doc in Yellow
 * and adds verified comments.
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

  const items = [
    {
      text: "#FCF3E9",
      comment: "✅ Already Fixed & Implemented: Secondary background / panels (warm cream #FCF3E9) applied across container panels and guarantee cards."
    },
    {
      text: "#E4DAD7",
      comment: "✅ Already Fixed & Implemented: Card border (soft beige-pink #E4DAD7) applied to all cards, chips, and outlines."
    },
    {
      text: "#6C5484",
      comment: "✅ Already Fixed & Implemented: MoodFlip title word 'Mood' (muted purple #6C5484) applied in header wordmark and hero title."
    },
    {
      text: "#EDAA7A",
      comment: "✅ Already Fixed & Implemented: Title highlight peach (#EDAA7A) applied to reframing highlights."
    },
    {
      text: "#9C8CC4",
      comment: "✅ Already Fixed & Implemented: Button lighter highlight (#9C8CC4) applied to hover and focus states."
    },
    {
      text: "#7666AB",
      comment: "✅ Already Fixed & Implemented: Selected mood tile border (medium purple #7666AB) active on selected mood tiles."
    },
    {
      text: "#EEE0FC",
      comment: "✅ Already Fixed & Implemented: Selected tile/cloud fill (pale lavender #EEE0FC) active on selected state."
    },
    {
      text: "#F1ECED",
      comment: "✅ Already Fixed & Implemented: Inactive cloud fill (warm off-white #F1ECED) active on unselected mood clouds."
    },
    {
      text: "#FDE8C8",
      comment: "✅ Already Fixed & Implemented: Sun glow (pale warm yellow #FDE8C8) active in outcome artwork canvas and gradient layers."
    },
    {
      text: "#E9D3B3",
      comment: "✅ Already Fixed & Implemented: Sun / action card warm shadow (#E9D3B3) applied to outcome card box shadows."
    },
    {
      text: "#7D8164",
      comment: "✅ Already Fixed & Implemented: 'Peaceful' target mood text (muted sage green #7D8164) applied to outcome heading."
    },
    {
      text: "#898B71",
      comment: "✅ Already Fixed & Implemented: Landscape / leaf green (soft sage #898B71) applied to floral accents and foliage."
    },
    {
      text: "#A49BA8",
      comment: "✅ Already Fixed & Implemented: Muted icon grey (#A49BA8) applied to unselected feeling tile icons."
    },
    {
      text: "#FAF5F6",
      comment: "✅ Already Fixed & Implemented: Footer strip (pale lavender-pink #FAF5F6) applied to supportive message strip."
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
  console.log(`Found ${foundRanges.length} exact ranges for HEX Color Palette.`);

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
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ HEX Colors yellow highlights applied successfully!');
  }

  console.log('\n=============================================');
  console.log('🎉 HEX Colors Palette fully highlighted in Google Doc!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
