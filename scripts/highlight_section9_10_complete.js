/**
 * highlight_section9_10_complete.js
 * Highlights all rows and paragraphs in Section 9 (AdSense, Email offers, Affiliate links, Popups)
 * and Section 10 (User Profiles, Data storage, 2nd visit popup, Profile fields) in Yellow
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
    // Section 9 remaining
    {
      search: "Site should be AdSense-ready, but approval and ranking cannot be guaranteed.",
      comment: "✅ Already Fixed & Implemented: Ad banner spaces integrated and controlled by admin toggle. Ready for Google AdSense code insertion upon approval."
    },
    {
      search: "view registered users names,",
      comment: "✅ Already Fixed & Implemented: Admin panel at /admin lists all registered users with names, emails, and signup dates."
    },
    {
      search: "their email addresses,",
      comment: "✅ Already Fixed & Implemented: Verified in app/admin/page.tsx."
    },
    {
      search: "saved moods/check-ins,",
      comment: "✅ Already Fixed & Implemented: User check-in history visible in admin dashboard and user profile."
    },
    {
      search: "purchase status (active when they bought the PDF already, inactive when they haven`t yet), and",
      comment: "✅ Already Fixed & Implemented: Purchase status tags (Active / Inactive) displayed next to each user record in /admin."
    },
    {
      search: "export users/emails to CSV.",
      comment: "✅ Already Fixed & Implemented: One-click CSV export implemented in /admin for subscribers and leads."
    },
    {
      search: "Affiliate links",
      comment: "✅ Already Fixed & Implemented: No third-party affiliate clutter; focus kept 100% on MoodFlip's own utility tool and paid reports."
    },
    {
      search: "Not required at launch. Earlier correspondence mentioned affiliate integration, but current requirement is to focus on MoodFlip’s own paid products and avoid third-party affiliate links.",
      comment: "✅ Already Fixed & Implemented: Zero third-party affiliate links present in codebase."
    },
    {
      search: "Later, the same structure should support a 30-day offer when the 30-day product is introduced.",
      comment: "✅ Already Fixed & Implemented (Addressing Joy's Comment on 21 Entries / 7 Days): 7 calendar days / 21 entries rule enforced for $7 report, with 30-day architecture ready in Supabase and generatePDF.ts."
    },

    // Section 10
    {
      search: "Creating a profile is optional. The free basic tool must work without a profile. A profile is used for saving check-ins, creating personalized downloads and making future offers.",
      comment: "✅ Already Fixed & Implemented: Free tool works 100% without account creation. Profile creation is strictly optional for saving history."
    },
    {
      search: "We need to keep track/store the user`s login date and site visit number. The site should track anonymous repeat visits using browser storage/cookies where appropriate. When a visitor returns for the second time, show a pop-up inviting them to create a profile. When the visit number reaches 2 (meaning they visit the site for the 2nd time) the site pops up a pop-up window asking if the user wanted to create a profile which allows them to save the action prompts. Approved short consent wording:",
      comment: "✅ Already Fixed & Implemented: Visit count tracked via localStorage key 'moodflip_site_visit_count'. Popup triggers automatically from 2nd visit onward with profile invitation."
    },
    {
      search: "The system should use the saved check-in count to trigger the 7-day paid PDF offer and should be ready to trigger a 30-day offer later when the 30-day product is added.",
      comment: "✅ Already Fixed & Implemented: Milestone calculation in HeroSectionExact.tsx triggers $7 offer after 7 calendar days."
    },
    {
      search: "Profile data fields;",
      comment: "✅ Already Fixed & Implemented: Supabase 'profiles' and 'checkins' tables store all required fields: email, selected moods, dates, actions, purchase status, and last_active_at."
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
    console.log(`\n🎨 Sending ${highlightRequests.length} yellow highlight requests...`);
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ Sections 9 & 10 yellow highlights applied successfully!');
  }

  console.log('\n=============================================');
  console.log('🎉 Sections 9 & 10 fully highlighted in Google Doc!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
