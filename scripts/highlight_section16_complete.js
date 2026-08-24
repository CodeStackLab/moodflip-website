/**
 * highlight_section16_complete.js
 * Highlights all paragraphs, popup messages (1 to 9), and font table in Section 16 in Yellow
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
    // Design direction
    {
      search: "Right side: soft, uplifting sun/rising light design with calming pastel colours. This section is liked and should be preserved.",
      comment: "✅ Already Fixed & Implemented: Sunrise landscape background artwork (/sunrise-artwork.png) preserved and rendered on the right outcome panel."
    },
    {
      search: "Mood family cards and specific feeling tiles should be visual, mobile-friendly and not overwhelming.",
      comment: "✅ Already Fixed & Implemented: Responsive cards and tiles styled with clean typography and spacing in HeroSectionExact.module.css."
    },
    {
      search: "Include lightweight animation, such as result card fade/slide/flip after clicking the mood change button.",
      comment: "✅ Already Fixed & Implemented: Smooth CSS transition, flip rotation, and result card fade-in animation applied on each flip."
    },
    {
      search: "Design must be clean, modern, professional and emotionally supportive.",
      comment: "✅ Already Fixed & Implemented: Calming aesthetic with soft pastel tones, rounded cards, and heart accents."
    },

    // Popup Messages 1-9
    {
      search: "You can save up to 3 check-ins per day. After 7 days, you’ll be able to download your personalised 7-Day MoodFlip Report.",
      comment: "✅ Already Fixed & Implemented: Message 1 active upon first saved check-in in HeroSectionExact.tsx."
    },
    {
      search: "2. From the 2nd saved calendar day onward — once per day",
      comment: "✅ Already Fixed & Implemented: Message 2 daily milestone reminder active."
    },
    {
      search: "You’re building your 7-Day MoodFlip Report. Save up to 3 check-ins per day. Your personalised report will be available after 7 days for US$7.",
      comment: "✅ Already Fixed & Implemented: Message 2 reminder popup text active."
    },
    {
      search: "3. Progress message after saving a check-in",
      comment: "✅ Already Fixed & Implemented: Message 3 check-in progress note active."
    },
    {
      search: "Saved. Today’s check-ins: [1/3] 7-Day Report progress: Day [X] of 7",
      comment: "✅ Already Fixed & Implemented: Message 3 rendered dynamically with real user check-in count and calendar day count."
    },
    {
      search: "4. Daily save limit reached",
      comment: "✅ Already Fixed & Implemented: Message 4 daily limit notice active."
    },
    {
      search: "You’ve saved today’s 3 check-ins. You can still use the free MoodFlip tool. You can save more check-ins tomorrow.",
      comment: "✅ Already Fixed & Implemented: Message 4 rendered verbatim when user attempts >3 saved check-ins in one calendar day."
    },
    {
      search: "5. 7-day report ready",
      comment: "✅ Already Fixed & Implemented: Message 5 purchase readiness prompt active."
    },
    {
      search: "Your 7-Day MoodFlip Report is ready. Download your personalised report with your saved moods, positive moods, 60-second actions, and mood pattern summary. Download for US$7",
      comment: "✅ Already Fixed & Implemented: Message 5 rendered verbatim when user reaches 7 calendar days."
    },
    {
      search: "6. Payment successful",
      comment: "✅ Already Fixed & Implemented: Message 6 payment success confirmation active."
    },
    {
      search: "Payment successful. Your MoodFlip Report is ready to download. A copy has also been emailed to you.",
      comment: "✅ Already Fixed & Implemented: Message 6 rendered on /profile checkout completion."
    },
    {
      search: "7. Payment successful but PDF/email issue",
      comment: "✅ Already Fixed & Implemented: Message 7 fallback message active."
    },
    {
      search: "Payment received. Your report is being prepared. If it does not arrive, you can download it from your profile or contact support.",
      comment: "✅ Already Fixed & Implemented: Message 7 fallback rendered if network issue delays PDF build."
    },
    {
      search: "8. Profile invitation on 2nd site visit",
      comment: "✅ Already Fixed & Implemented: Message 8 2nd-visit popup active."
    },
    {
      search: "Save your MoodFlip check-ins? Create a free profile to save your moods, actions, and progress toward your 7-Day MoodFlip Report.",
      comment: "✅ Already Fixed & Implemented: Message 8 modal popup rendered on visit count >= 2."
    },
    {
      search: "9. Consent checkbox wording",
      comment: "✅ Already Fixed & Implemented: Message 9 exact legal consent text embedded on registration form."
    },

    // Fonts table
    {
      search: "Button text (“Flip Your Mood”)",
      comment: "✅ Already Fixed & Implemented: Styled with Nunito Sans Bold typography."
    },
    {
      search: "Use a clear, soft, rounded sans-serif so the button stays readable.",
      comment: "✅ Already Fixed & Implemented: Applied to center Flip button."
    },
    {
      search: "Small chips / labels",
      comment: "✅ Already Fixed & Implemented: Styled with Nunito Sans SemiBold typography."
    },
    {
      search: "Keep chips and microcopy simple and consistent with the body font.",
      comment: "✅ Already Fixed & Implemented: Consistent rounded typography applied to feeling chips and labels."
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
    console.log(`\n🎨 Sending ${highlightRequests.length} yellow highlight requests for Section 16...`);
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ Section 16 yellow highlights applied successfully!');
  }

  console.log('\n=============================================');
  console.log('🎉 Section 16 Design & Popups fully highlighted in Google Doc!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
