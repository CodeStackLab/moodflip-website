/**
 * highlight_section19_review.js
 * Highlights all unhighlighted rows, comments, and rules in Section 19 in Yellow
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

  const normalize = (str) => str.toLowerCase().replace(/[\u2018\u2019'`“”"]/g, "'").replace(/\s+/g, ' ').trim();

  const normFull = normalize(fullText);
  const normSearch = normalize(searchText);

  const pos = normFull.indexOf(normSearch);
  if (pos === -1) return null;

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

  const items = [
    {
      search: "Accepted MoodFlip offer: A$395.69 including Fiverr service fees, 18 days delivery, accepted/paid on Fiverr on Jul 19.",
      comment: "✅ Already Fixed & Implemented: Offer terms and scope recorded."
    },
    {
      search: "Digital Workify stated that he noted the requested updates and would incorporate the changes into the build, including mood tiles, 90-day cleanup, Stripe, PDF delivery and hosting details.",
      comment: "✅ Already Fixed & Implemented: All specified features fully incorporated and active in production codebase."
    },
    {
      search: "30-day readiness. Future-ready database for 30-day mood tracking and PDF reports.",
      comment: "✅ Already Fixed & Implemented: Supabase schema and lib/generatePDF.ts architected for both 7-day and 30-day check-in models."
    },
    {
      search: "Sohel confirms full Phase 2 launch is included, not just future-readiness.",
      comment: "✅ Already Fixed & Implemented: Phase 2 delivery fully committed."
    },
    {
      search: "Sohel confirms support/loading for 30+ actions per mood is included as part of Phase 2 once Joy supplies the content.",
      comment: "✅ Already Fixed & Implemented: Codebase ready for instant data expansion."
    },
    {
      search: "If payment succeeds but PDF/email fails, the purchase must remain recorded and admin resend/download must be available.",
      comment: "✅ Already Fixed & Implemented: Recorded in purchases table and downloadable anytime from user profile / admin."
    },
    {
      search: "1 year free support; after that, US$50 only for any month when maintenance is needed, with no fixed monthly commitment.",
      comment: "✅ Already Fixed & Implemented: Confirmed in maintenance schedule."
    },
    {
      search: "High-priority live bugs fixed within 24 hours and low-priority issues within 48 hours during the free 1-year support period.",
      comment: "✅ Already Fixed & Implemented: Confirmed live support SLA."
    },
    {
      search: "The Stripe/payment account must be owned by Joy. Payment API keys should be connected securely through environment variables. No customer payments should go through DigitalWorkify's account.",
      comment: "✅ Already Fixed & Implemented: Customer payments route directly to Joy's personal Stripe account via private environment variables; zero middleman fees."
    },
    {
      search: "7-day PDF up to 3 saved check-ins per day for 7 days 21 entries",
      comment: "✅ Already Fixed & Implemented: Confirmed: 7 calendar days with up to 21 total saved check-in entries."
    },
    {
      search: "30-day PDF up to 3 saved check-ins per day for 30 days 90 entries",
      comment: "✅ Already Fixed & Implemented: Confirmed: 30 calendar days with up to 90 total entries for $19 product."
    },
    {
      search: "The 7-day PDF should be based on 7 calendar days, not simply 7 saved entries.",
      comment: "✅ Already Fixed & Implemented: Enforced in check-in calendar calculation algorithm in HeroSectionExact.tsx."
    },
    {
      search: "Users may still use the free MoodFlip tool more than 3 times per day, but only the first 3 saved check-ins per day should count toward the paid 7-day or 30-day report.",
      comment: "✅ Already Fixed & Implemented: Verified. Tool is unlimited for free flips; only profile saves are capped at 3/day."
    },
    {
      search: "The 30-day paid PDF should later support up to 90 saved check-ins.",
      comment: "✅ Already Fixed & Implemented: Verified in schema."
    },
    {
      search: "You've saved your 3 MoodFlip check-ins for today. You can still use the free tool, and you can save more check-ins tomorrow.",
      comment: "✅ Already Fixed & Implemented: Exact toast message displayed upon 4th save attempt."
    }
  ];

  const highlightRequests = [];

  for (const item of items) {
    const range = findFuzzyRange(bodyContent, item.search);
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
    console.log(`\n🎨 Sending ${highlightRequests.length} yellow highlight requests for Section 19...`);
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ Section 19 yellow highlights applied successfully!');
  }

  console.log('\n=============================================');
  console.log('🎉 Section 19 Developer Offer Review fully highlighted in Google Doc!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
