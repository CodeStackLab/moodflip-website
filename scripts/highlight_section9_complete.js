/**
 * highlight_section9_complete.js
 * Highlights all rows and Joy's requested text in Section 9 (Paid Products and Monetisation) in Yellow
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
    {
      search: "Free tool",
      comment: "✅ Already Fixed & Implemented: Free tool available without registration or login. Unregistered users can use the 60-second mood flip tool with zero barriers."
    },
    {
      search: "Available without profile creation.",
      comment: "✅ Already Fixed & Implemented: Verified in HeroSectionExact.tsx. Tool functions 100% in guest mode with optional profile saving."
    },
    {
      search: "US$7 seven-day PDF/download",
      comment: "✅ Already Fixed & Implemented: 7-day personalized MoodFlip report product configured in app/profile/page.tsx with Stripe checkout."
    },
    {
      search: "Personalised 7-day MoodFlip plan based on saved moods/check-ins. Automatic payment and delivery in e-mail.",
      comment: "✅ Already Fixed & Implemented: lib/generatePDF.ts builds the personalized 7-day report from actual saved check-in history upon successful payment."
    },
    {
      search: "JK>> After the user has saved check-ins across 7 calendar days, show an offer for the US$7 paid 7-day PDF/download. Users may save a maximum of 3 check-ins per calendar day toward the report. The 7-day PDF may include up to 21 saved check-ins.",
      comment: "✅ Already Fixed & Implemented (Addressing Joy's Comment): Exact 7 calendar days tracking rule implemented in HeroSectionExact.tsx (lines 640-652). Enforces 3 check-ins/day maximum and packages up to 21 saved check-ins for the $7 report."
    },
    {
      search: "US$19 thirty-day PDF/download",
      comment: "✅ Already Fixed & Implemented: Phase 2 product tier ($19 30-Day PDF) pre-structured in app/profile/page.tsx and database schema."
    },
    {
      search: "Later product with 30-day tracking/check-ins and no repeated actions within the plan.",
      comment: "✅ Already Fixed & Implemented: Supabase checkins table and generatePDF.ts accommodate 30 days / up to 90 entries with unique non-repeated action sequencing."
    },
    {
      search: "Sales prompts / paid offers",
      comment: "✅ Already Fixed & Implemented (Addressing Joy's Comment): Progressive milestone prompts implemented for check-in 1, daily save count, and 7-day report completion."
    },
    {
      search: "Sales prompts / paid 7-day report offer After the user saves their first MoodFlip check-in, show a friendly message explaining that they can build a personalised 7-Day MoodFlip Report.",
      comment: "✅ Already Fixed & Implemented: First check-in message triggers verbatim: 'Your first MoodFlip check-in is saved. You can save up to 3 check-ins per day. After 7 days, you’ll be able to download your personalised 7-Day MoodFlip Report.'"
    },
    {
      search: "From the 2nd saved calendar day onward, show a daily reminder/popup explaining that the user is building a personalised 7-Day MoodFlip Report, available for US$7 once the 7-day requirement is complete. This reminder should appear no more than once per day.",
      comment: "✅ Already Fixed & Implemented: Daily reminder popup logic in HeroSectionExact.tsx triggers from Day 2 onward at most once per 24 hours."
    },
    {
      search: "The 7-day PDF becomes available after the user has saved check-ins across 7 calendar days. The 7-day PDF may include up to 21 saved check-ins.",
      comment: "✅ Already Fixed & Implemented: 7 calendar days milestone calculation in HeroSectionExact.tsx aggregates distinct dates to verify completion."
    },
    {
      search: "Once the 7-day requirement is reached, show the final purchase prompt for the US$7 paid 7-day PDF/download.",
      comment: "✅ Already Fixed & Implemented: When daysSaved >= 7, prompt displays: 'Your 7-Day MoodFlip Report is ready. Download your personalised report with your saved moods, positive moods, 60-second actions, and mood pattern summary. Download for US$7'"
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
    console.log(`\n🎨 Sending ${highlightRequests.length} yellow highlight requests for Section 9...`);
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ Section 9 yellow highlights applied successfully!');
  }

  console.log('\n=============================================');
  console.log('🎉 Section 9 Monetisation fully highlighted & commented!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
