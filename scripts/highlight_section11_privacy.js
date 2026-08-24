/**
 * highlight_section11_privacy.js
 * Highlights all bullet points and paragraphs in Section 11 (Privacy, Consent and Automatic Deletion) in Yellow
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
      search: "Users must be told they can use the basic MoodFlip tool without creating a profile.",
      comment: "✅ Already Fixed & Implemented: Clear user guidance embedded in the homepage tool and /about page confirming that the basic MoodFlip tool is free and accessible without any account registration."
    },
    {
      search: "Profile creation must be voluntary and connected to saving check-ins and receiving personalised downloads/offers.",
      comment: "✅ Already Fixed & Implemented: Profile creation is strictly voluntary, only requested when a visitor wants to save check-in progress for their 7-Day report."
    },
    {
      search: "Automatic deletion requirement: inactive profiles and saved mood history should be deleted after 90 days of inactivity.",
      comment: "✅ Already Fixed & Implemented: Automated background deletion active via /api/cron/cleanup route scheduled daily at 2:00 AM UTC in vercel.json, purging inactive accounts older than 90 days from Supabase."
    },
    {
      search: "No complex manual user deletion dashboard is required at launch.",
      comment: "✅ Already Fixed & Implemented: Handled automatically by the cron cleanup service; admin dashboard remains clean and focused on user listings and CSV exports."
    },
    {
      search: "The privacy policy should be written carefully because selected moods are personal and wellbeing-related. The website should avoid collecting unnecessary data beyond the fields listed above.",
      comment: "✅ Already Fixed & Implemented: Comprehensive, sensitive privacy policy live at app/privacy/page.tsx strictly limiting data collection to the approved minimum fields (email, dates, moods, actions, purchase status)."
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
    console.log(`\n🎨 Sending ${highlightRequests.length} yellow highlight requests for Section 11...`);
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ Section 11 yellow highlights applied successfully!');
  }

  console.log('\n=============================================');
  console.log('🎉 Section 11 Privacy & Consent fully highlighted in Google Doc!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
