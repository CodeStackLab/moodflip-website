/**
 * add_remaining_issues_to_doc.js
 * Adds yellow highlight + comments for the 3 remaining issues found in code audit:
 * 1. Clear/Bin button still visible in UI (Spec §16 says remove it)
 * 2. 90-day auto deletion - API route exists but Supabase not connected
 * 3. last_active_at - API route exists but no real DB field yet
 */

const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');

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
        } catch(e) {
          reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0,300)}`));
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

  const searchLower = searchText.toLowerCase();
  const textLower = fullText.toLowerCase();
  const pos = textLower.indexOf(searchLower);
  if (pos === -1) return null;

  const startIdx = charMap[pos];
  const endIdx = charMap[pos + searchText.length - 1] + 1;
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

  // 3 remaining issues from live code audit
  const issues = [
    {
      search: "Remove bin/clear-selection feature from the main design.",
      comment: "⚠️ ACTION REQUIRED — Clear/Bin Button Still Visible in Live Code: Code audit confirmed that the 'Clear selection / Start over' button (with reset icon) is still rendered in HeroSectionExact.tsx at line 804-820. Spec §16 clearly states: 'Remove bin/clear-selection feature from the main design.' This button must be removed from the visible UI. The internal handleClearSelection() function can remain for possible future use, but the button must not appear to users. STATUS: Fix pending — Sohel to remove the button from the UI."
    },
    {
      search: "Enable automatic 90-day deletion of inactive profiles. Every profile which has been inactive for at least 90 days will be automatically deleted.",
      comment: "⚠️ PARTIALLY DONE — 90-Day Auto-Deletion Needs Supabase Connection: The API route (app/api/cron/cleanup/route.ts) has been created and the logic is written. However, the actual Supabase database DELETE query is currently commented out because Supabase is not yet connected to the live site. Once Joy provides the Supabase API keys and the database is live, the cleanup route must be: (1) uncommented to run the real DELETE query, (2) scheduled as a daily Vercel Cron job at 2am UTC via vercel.json. Full instructions are in SUPABASE_SETUP.md."
    },
    {
      search: "Developer should implement last_active_at or equivalent so inactivity can be calculated.",
      comment: "⚠️ PARTIALLY DONE — last_active_at API Ready but DB Field Not Yet Created: The API route (app/api/user/activity/route.ts) has been created to update last_active_at on every user check-in/login. However, the Supabase 'profiles' table does not yet have this column because Supabase is not connected. When Supabase is set up, the following SQL must be run in the Supabase SQL Editor: ALTER TABLE profiles ADD COLUMN last_active_at TIMESTAMPTZ DEFAULT NOW(); This field is essential for the 90-day deletion logic to work correctly."
    }
  ];

  const highlightRequests = [];

  for (const issue of issues) {
    const range = findTextRange(bodyContent, issue.search.substring(0, 70));
    if (!range) {
      console.log(`⚠️  Could not find: "${issue.search.substring(0, 50)}..."`);
      continue;
    }

    console.log(`📍 Found: "${issue.search.substring(0, 50)}..." at ${range.startIndex}-${range.endIndex}`);

    // Yellow highlight
    highlightRequests.push({
      updateTextStyle: {
        range: { startIndex: range.startIndex, endIndex: range.endIndex },
        textStyle: { backgroundColor: { color: { rgbColor: YELLOW } } },
        fields: 'backgroundColor'
      }
    });

    // Add comment
    try {
      const result = await addComment(DOC_ID, issue.search.substring(0, 100), issue.comment, token);
      console.log(`💬 Comment added (ID: ${result.id})`);
    } catch(e) {
      console.log(`⚠️  Comment failed: ${e.message}`);
    }

    await new Promise(r => setTimeout(r, 400));
  }

  if (highlightRequests.length > 0) {
    console.log(`\n🎨 Applying ${highlightRequests.length} yellow highlights...`);
    await apiRequest(
      'docs.googleapis.com', 'POST',
      `/v1/documents/${DOC_ID}:batchUpdate`,
      { requests: highlightRequests },
      token
    );
    console.log('✅ Yellow highlights applied!');
  }

  console.log('\n============================');
  console.log('✅ All 3 remaining issues added to Google Doc');
  console.log('============================');
}

main().catch(e => { console.error('❌ Error:', e.message); process.exit(1); });
