/**
 * highlight_section16_messages_exact.js
 * Highlights all 9 popup message text paragraphs in Section 16 in Yellow with comments.
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

function findFuzzyRange(docContent, searchText) {
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

  // Normalize quotes and spaces
  const normalize = (str) => str.toLowerCase().replace(/[\u2018\u2019'`]/g, "'").replace(/\s+/g, ' ').trim();

  const normFull = normalize(fullText);
  const normSearch = normalize(searchText);

  const pos = normFull.indexOf(normSearch);
  if (pos === -1) return null;

  // Find approximate start and end in original fullText
  // Scan original characters matching normalized index
  let normIdx = 0;
  let origStart = 0;
  let origEnd = fullText.length;

  for (let i = 0; i < fullText.length; i++) {
    const ch = normalize(fullText[i]);
    if (normIdx === pos && origStart === 0) {
      origStart = i;
    }
    if (ch) normIdx += ch.length;
    if (normIdx >= pos + normSearch.length) {
      origEnd = i + 1;
      break;
    }
  }

  return { startIndex: charMap[origStart], endIndex: charMap[origEnd - 1] + 1 };
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

  const messages = [
    {
      search: "You're building your 7-Day MoodFlip Report. Save up to 3 check-ins per day. Your personalised report will be available after 7 days for US$7.",
      comment: "✅ Already Fixed & Implemented: Message 2 daily milestone reminder active in HeroSectionExact.tsx."
    },
    {
      search: "Saved. Today's check-ins: [1/3] 7-Day Report progress: Day [X] of 7",
      comment: "✅ Already Fixed & Implemented: Message 3 rendered dynamically upon check-in save."
    },
    {
      search: "You've saved today's 3 check-ins. You can still use the free MoodFlip tool. You can save more check-ins tomorrow.",
      comment: "✅ Already Fixed & Implemented: Message 4 daily 3-check-in limit notification active."
    },
    {
      search: "Your 7-Day MoodFlip Report is ready. Download your personalised report with your saved moods, positive moods, 60-second actions, and mood pattern summary. Download for US$7",
      comment: "✅ Already Fixed & Implemented: Message 5 purchase readiness prompt active upon 7 calendar days."
    },
    {
      search: "Payment successful. Your MoodFlip Report is ready to download. A copy has also been emailed to you.",
      comment: "✅ Already Fixed & Implemented: Message 6 confirmation note on /profile checkout completion."
    },
    {
      search: "Payment received. Your report is being prepared. If it does not arrive, you can download it from your profile or contact support.",
      comment: "✅ Already Fixed & Implemented: Message 7 fallback message active."
    },
    {
      search: "Save your MoodFlip check-ins? Create a free profile to save your moods, actions, and progress toward your 7-Day MoodFlip Report.",
      comment: "✅ Already Fixed & Implemented: Message 8 profile invitation popup rendered on 2nd visit."
    },
    {
      search: "By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history so we can create and offer personalised downloads.",
      comment: "✅ Already Fixed & Implemented: Message 9 exact legal consent text embedded on registration form."
    }
  ];

  const highlightRequests = [];

  for (const item of messages) {
    const range = findFuzzyRange(bodyContent, item.search);
    if (!range) {
      console.log(`⚠️  Could not find message text: "${item.search.substring(0, 40)}..."`);
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
    console.log(`\n🎨 Sending ${highlightRequests.length} yellow highlight requests for Section 16 messages...`);
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ Section 16 messages yellow highlights applied successfully!');
  }

  console.log('\n=============================================');
  console.log('🎉 Section 16 all messages highlighted in Google Doc!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
