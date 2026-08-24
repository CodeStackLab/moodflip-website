/**
 * highlight_section10_full.js
 * Highlights all remaining text, bullet points, and paragraphs in Section 10 in Yellow
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
      search: "Creating a profile is optional. The free basic tool must work without a profile. A profile is used for saving check-ins, creating personalized downloads and making future offers.",
      comment: "✅ Already Fixed & Implemented: Optional user profile architecture active. Free tool operates client-side with zero account requirement, and profiles store check-in history for $7 report."
    },
    {
      search: "When a visitor returns for the second time, show a pop-up inviting them to create a profile.",
      comment: "✅ Already Fixed & Implemented: 2nd visit detection active via localStorage visit counter in HeroSectionExact.tsx."
    },
    {
      search: "By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history so we can create and offer personalized downloads.",
      comment: "✅ Already Fixed & Implemented: Full exact consent text embedded on registration and profile creation forms."
    },
    {
      search: "The system should use the saved check-in count to trigger the 7-day paid PDF offer and should be ready to trigger a 30-day offer later when the 30-day product is added.",
      comment: "✅ Already Fixed & Implemented: Milestone calculation triggers $7 offer after 7 calendar days, with database ready for 30-day tracking."
    },
    {
      search: "email,",
      comment: "✅ Already Fixed & Implemented: Stored in Supabase 'profiles' table."
    },
    {
      search: "selected moods and dates,",
      comment: "✅ Already Fixed & Implemented: Stored in Supabase 'checkins' table."
    },
    {
      search: "actions shown,",
      comment: "✅ Already Fixed & Implemented: Action title and description logged for every saved entry."
    },
    {
      search: "purchase status,",
      comment: "✅ Already Fixed & Implemented: Stored in 'purchases' and 'profiles' table."
    },
    {
      search: "last activity date,",
      comment: "✅ Already Fixed & Implemented: Updated automatically on check-in via /api/user/activity."
    },
    {
      search: "and check-in count.",
      comment: "✅ Already Fixed & Implemented: Incremented in database on every saved check-in."
    },
    {
      search: "Enable automatic 90-day deletion of inactive profiles. Every profile which has been inactive for at least 90 days will be automatically deleted.",
      comment: "✅ Already Fixed & Implemented: API cron route /api/cron/cleanup and Vercel Cron schedule (daily 2am UTC) delete profiles with last_active_at > 90 days in Supabase."
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
    console.log(`\n🎨 Sending ${highlightRequests.length} yellow highlight requests for Section 10...`);
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ Section 10 yellow highlights applied successfully!');
  }

  console.log('\n=============================================');
  console.log('🎉 Section 10 fully highlighted in Google Doc!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
