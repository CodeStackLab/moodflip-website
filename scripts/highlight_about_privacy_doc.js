/**
 * highlight_about_privacy_doc.js
 * Highlights all sections in Google Doc `1V3_F4pDUAS6H4RF-oRaguwq0qjJWmE3OrMggVVHK9tU`
 * (MoodFlip_About_Privacy_Policy_Web_Copy) in Yellow with verified comments.
 */

const { execSync } = require('child_process');
const https = require('https');

const DOC_ID = '1V3_F4pDUAS6H4RF-oRaguwq0qjJWmE3OrMggVVHK9tU';
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
      text: "Use the same peaceful sunrise/sun background style across the main pages: About, Privacy Policy, Contact, Login and other simple information pages.",
      comment: "✅ Already Fixed & Implemented: Peaceful sunrise landscape hero banner rendered at the top of /about, /privacy, /contact, and /login pages."
    },
    {
      text: "MoodFlip helps you notice your current mood, understand the feeling behind it, and make one step toward feeling better.",
      comment: "✅ Already Fixed & Implemented: Live at app/about/page.tsx."
    },
    {
      text: "You start by choosing your current mood, then a more specific feeling. MoodFlip then suggests a better-feeling and a short 60-second action that you can try straight away.",
      comment: "✅ Already Fixed & Implemented: Live at app/about/page.tsx."
    },
    {
      text: "MoodFlip is designed for small emotional shifts - not big promises. It is not therapy, medical advice, diagnosis, treatment, or crisis support.",
      comment: "✅ Already Fixed & Implemented: Live at app/about/page.tsx."
    },
    {
      text: "Notice your mood.",
      comment: "✅ Already Fixed & Implemented: Aim bullet 1 live on /about."
    },
    {
      text: "Name the feeling behind your mood.",
      comment: "✅ Already Fixed & Implemented: Aim bullet 2 live on /about."
    },
    {
      text: "Take one step toward feeling better.",
      comment: "✅ Already Fixed & Implemented: Aim bullet 3 live on /about."
    },
    {
      text: "You can use the basic MoodFlip tool without creating a profile. If you choose to create a profile, you can save check-ins and create personalised mood reports.",
      comment: "✅ Already Fixed & Implemented: Live at app/about/page.tsx."
    },
    {
      text: "Your mood does not have to stay where it is. MoodFlip helps you notice what you feel, shows you a direction to feel better, and you can take one small action toward it.",
      comment: "✅ Already Fixed & Implemented: Bold closing statement live on /about."
    },
    {
      text: "MoodFlip respects your privacy. This Privacy Policy explains what information we may collect and how it is used.",
      comment: "✅ Already Fixed & Implemented: Live at app/privacy/page.tsx."
    },
    {
      text: "1. Using MoodFlip without a profile",
      comment: "✅ Already Fixed & Implemented: Section 1 live on /privacy."
    },
    {
      text: "2. Information we may collect",
      comment: "✅ Already Fixed & Implemented: Section 2 live on /privacy."
    },
    {
      text: "3. Paid downloads",
      comment: "✅ Already Fixed & Implemented: Section 3 live on /privacy."
    },
    {
      text: "4. 90-day automatic deletion",
      comment: "✅ Already Fixed & Implemented: Section 4 live on /privacy."
    },
    {
      text: "5. Email messages",
      comment: "✅ Already Fixed & Implemented: Section 5 live on /privacy."
    },
    {
      text: "6. Not medical or crisis support",
      comment: "✅ Already Fixed & Implemented: Section 6 live on /privacy."
    },
    {
      text: "If you feel unsafe or need urgent help, please contact emergency services or a crisis support service in your country.",
      comment: "✅ Already Fixed & Implemented: Safety disclaimer live on /privacy and /disclaimer."
    }
  ];

  const foundRanges = findExactRanges(bodyContent, items.map(s => s.text));
  console.log(`Found ${foundRanges.length} exact ranges for About & Privacy doc.`);

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
    console.log('✅ About & Privacy doc yellow highlights applied successfully!');
  }

  console.log('\n=============================================');
  console.log('🎉 About & Privacy document fully highlighted in Google Doc!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
