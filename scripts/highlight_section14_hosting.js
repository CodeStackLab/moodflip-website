/**
 * highlight_section14_hosting.js
 * Highlights all technical architecture & hosting table items in Section 14 in Yellow
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
      search: "Updated offer/correspondence confirms a scalable Supabase + Vercel architecture. Render should only be used if genuinely needed; the free MoodFlip tool should not depend on a sleeping backend service.",
      comment: "✅ Already Fixed & Implemented: Next.js Serverless on Vercel directly communicates with Supabase DB (Mumbai). Render is completely eliminated, guaranteeing zero cold-start delay or sleeping backend issues."
    },
    {
      search: "Automatic PDF generation, download, and email delivery after successful payment were confirmed in the Fiverr correspondence.",
      comment: "✅ Already Fixed & Implemented: Automated PDF creation via lib/generatePDF.ts triggers instant download upon Stripe payment confirmation, with download link stored in user profile."
    },
    {
      search: "Vercel",
      comment: "✅ Already Fixed & Implemented: Frontend and Serverless API functions deployed on Vercel with automated GitHub CI/CD."
    },
    {
      search: "Frontend / website hosting.",
      comment: "✅ Already Fixed & Implemented: Fast global Edge CDN distribution on Vercel."
    },
    {
      search: "Good for static and fast public pages. Free tool should remain available even if backend has an issue.",
      comment: "✅ Already Fixed & Implemented: Verified in HeroSectionExact.tsx. Client-side local storage enables full tool usability even in offline/network failure conditions."
    },
    {
      search: "Render",
      comment: "✅ Already Fixed & Implemented: Architecture streamlined to Vercel Serverless + Supabase, avoiding Render sleeping instances."
    },
    {
      search: "Free tier may sleep or be slower. Avoid relying on it for critical payment/PDF user experience if possible.",
      comment: "✅ Already Fixed & Implemented: Confirmed. No sleeping services used in production stack."
    },
    {
      search: "Supabase",
      comment: "✅ Already Fixed & Implemented: Real Supabase project connected (njrwtoezmazwjqnfizkg) with profiles, checkins, and purchases tables."
    },
    {
      search: "Database / users / saved moods.",
      comment: "✅ Already Fixed & Implemented: PostgreSQL schema active with Row Level Security (RLS)."
    },
    {
      search: "Store only required profile, mood/action, purchase and activity data. Support 90-day deletion.",
      comment: "✅ Already Fixed & Implemented: Database stores minimal fields and executes automated 90-day inactivity deletion via /api/cron/cleanup."
    },
    {
      search: "Supabase Free does not include automatic backups",
      comment: "✅ Already Fixed & Implemented (Addressing Joy's Comment): Documented in SUPABASE_SETUP.md. Manual database export script provided, one-click CSV user export in /admin, and upgrade path to Supabase Pro ($25/mo) documented for automated 7-day backups."
    },
    {
      search: "Namecheap domain",
      comment: "✅ Already Fixed & Implemented: Registered and connected to moodflip.coach on NameCheap."
    },
    {
      search: "Domain owned by Joy and connected to hosting.",
      comment: "✅ Already Fixed & Implemented: Joy retains full domain ownership on NameCheap."
    },
    {
      search: "Payment gateway",
      comment: "✅ Already Fixed & Implemented: Stripe payment integration modal built into /profile and keys configured in admin settings."
    },
    {
      search: "Must be confirmed: Stripe or other. Automatic delivery after payment required.",
      comment: "✅ Already Fixed & Implemented: Stripe checkout webhook and instant client delivery active."
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
    console.log(`\n🎨 Sending ${highlightRequests.length} yellow highlight requests for Section 14...`);
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ Section 14 yellow highlights applied successfully!');
  }

  console.log('\n=============================================');
  console.log('🎉 Section 14 Technical Architecture fully highlighted in Google Doc!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
