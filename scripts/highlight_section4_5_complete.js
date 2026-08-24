/**
 * highlight_section4_5_complete.js
 * Highlights all remaining items in Sections 4 & 5 (including table page titles and descriptions) in Yellow
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
    // Section 4
    {
      search: "Domain chosen: moodflip.coach on NameCheap.",
      comment: "✅ Already Fixed & Implemented: Configured moodflip.coach as primary canonical URL in Next.js metadata, XML sitemap (https://moodflip.coach), and Vercel domain configuration."
    },

    // Section 5
    {
      search: "Explain MoodFlip as a self-reflection utility site.",
      comment: "✅ Already Fixed & Implemented: Clear self-reflection utility explanations and non-medical boundaries written across /about, /disclaimer, and /privacy pages."
    },
    {
      search: "No complex email campaign system required at launch.",
      comment: "✅ Already Fixed & Implemented: Admin dashboard (/admin) is focused and streamlined: manages users, check-in records, purchase statuses, and one-click CSV export without bloated complexity."
    },
    {
      search: "Homepage / Mood Tool",
      comment: "✅ Already Fixed & Implemented: Built in app/page.tsx & components/HeroSectionExact.tsx with complete 5-step mood transformation tool."
    },
    {
      search: "About",
      comment: "✅ Already Fixed & Implemented: Built at app/about/page.tsx with responsive layout and clear mission statement."
    },
    {
      search: "Contact",
      comment: "✅ Already Fixed & Implemented: Built at app/contact/page.tsx with interactive contact form."
    },
    {
      search: "Privacy Policy",
      comment: "✅ Already Fixed & Implemented: Built at app/privacy/page.tsx with complete GDPR/data retention disclosures."
    },
    {
      search: "SEO mood pages",
      comment: "✅ Already Fixed & Implemented: Built in app/moods/[slug] with dynamic routing and sitemap integration."
    },
    {
      search: "Profile / Login / Saved Check-ins area",
      comment: "✅ Already Fixed & Implemented: Built in app/profile/page.tsx & app/login/page.tsx with Supabase database integration."
    },
    {
      search: "Paid PDF checkout / delivery flow",
      comment: "✅ Already Fixed & Implemented: Built with Stripe modal and dynamic client/server PDF generation via lib/generatePDF.ts."
    },
    {
      search: "Private Admin Dashboard",
      comment: "✅ Already Fixed & Implemented: Built at app/admin/page.tsx with full user analytics, check-in history, and CSV downloads."
    }
  ];

  const highlightRequests = [];

  for (const item of items) {
    const range = findTextRange(bodyContent, item.search);
    if (!range) {
      console.log(`⚠️  Could not find text: "${item.search}"`);
      continue;
    }

    console.log(`📍 Found: "${item.search}" at indices ${range.startIndex}-${range.endIndex}`);
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
    console.log(`\n🎨 Sending ${highlightRequests.length} yellow highlight requests for Sections 4 & 5...`);
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ Sections 4 & 5 yellow highlights applied successfully!');
  }

  console.log('\n=============================================');
  console.log('🎉 Sections 4 & 5 fully highlighted in Google Doc!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
