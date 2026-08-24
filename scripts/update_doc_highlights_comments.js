/**
 * update_doc_highlights_comments.js
 * Reads user_doc_raw.json, highlights key sections and adds developer comments
 * tracking which items from Business Spec v4 have been fixed.
 * 
 * Fixed items: Highlighted in GREEN (#00FF00 text background)
 * Partially done: Highlighted in YELLOW (#FFFF00)
 * Not applicable: No highlight
 */
const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');

const DOC_ID = '1qD1U9bpd96dQRjRHYCLgowBTLGFa_JY-UCQ9zEckC3w';

function getToken() {
  return execSync(
    'powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"'
  ).toString().trim();
}

function apiRequest(hostname, method, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname, path, method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    };
    const req = https.request(options, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        if (res.statusCode === 204) return resolve({});
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { return resolve(raw ? JSON.parse(raw) : {}); } catch (e) { return resolve(raw); }
        }
        reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0, 500)}`));
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function findTextRange(docBody, searchText) {
  const results = [];
  function scanContent(content) {
    for (const el of content || []) {
      if (el.paragraph) {
        let offset = el.startIndex;
        for (const pe of el.paragraph.elements || []) {
          if (pe.textRun && pe.textRun.content) {
            const txt = pe.textRun.content;
            const idx = txt.indexOf(searchText);
            if (idx !== -1) {
              results.push({
                startIndex: offset + idx,
                endIndex: offset + idx + searchText.length,
                paragraphStart: el.startIndex,
                paragraphEnd: el.endIndex,
              });
            }
            offset += txt.length;
          } else {
            offset += (pe.endIndex - pe.startIndex) || 0;
          }
        }
      } else if (el.table) {
        for (const row of el.table.tableRows || []) {
          for (const cell of row.tableCells || []) {
            scanContent(cell.content);
          }
        }
      }
    }
  }
  scanContent(docBody.content);
  return results;
}

async function main() {
  try {
    const token = getToken();
    console.log('Fetching current doc for index positions...');
    const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID}`, null, token);

    // Items to highlight in the doc with their fix status
    const highlights = [
      {
        searchText: 'The 5 main bad feelings are; Sad / Disgusted / Angry / Fearful / Bad.',
        color: { red: 0.71, green: 0.96, blue: 0.71 }, // Light green
        label: 'FIXED: Cloud labels now show correct names per spec (Bad label fixed)',
      },
      {
        searchText: 'Sohel\'s comment: Business Specification v3 is confirmed as the single master reference document',
        color: { red: 0.71, green: 0.96, blue: 0.71 },
        label: 'NOTED: v4 (this doc) is the master reference',
      },
      {
        searchText: 'Your first MoodFlip check-in is saved.',
        color: { red: 0.71, green: 0.96, blue: 0.71 },
        label: 'FIXED: Popup message 1 implemented with exact wording',
      },
      {
        searchText: 'You\'re building your 7-Day MoodFlip Report.',
        color: { red: 0.71, green: 0.96, blue: 0.71 },
        label: 'FIXED: Popup message 2 now implemented — shows once per day from Day 2 onward',
      },
      {
        searchText: 'Closest match: Cormorant Garamond or DM Serif Display',
        color: { red: 0.71, green: 0.96, blue: 0.71 },
        label: 'FIXED: Cormorant Garamond now applied to mood result heading',
      },
      {
        searchText: 'Closest match: Nunito Sans or Avenir Next Rounded',
        color: { red: 0.71, green: 0.96, blue: 0.71 },
        label: 'FIXED: Nunito Sans now loaded and applied as primary sans-serif font',
      },
      {
        searchText: '20-30 SEO mood pages',
        color: { red: 0.71, green: 0.96, blue: 0.71 },
        label: 'IMPLEMENTED: 25 SEO mood pages exist at /moods/[slug]',
      },
      {
        searchText: 'Payment successful.',
        color: { red: 1, green: 0.98, blue: 0.7 }, // Light yellow
        label: 'PARTIAL: Payment success UI message defined. Stripe integration pending live API keys.',
      },
      {
        searchText: 'By creating a profile, you agree that MoodFlip may store your email address',
        color: { red: 0.71, green: 0.96, blue: 0.71 },
        label: 'FIXED: Exact consent wording implemented on /register page',
      },
      {
        searchText: 'Inactive profiles and saved mood history should be deleted after 90 days',
        color: { red: 0.71, green: 0.96, blue: 0.71 },
        label: 'FIXED: 90-day deletion notice in register consent + privacy page. last_active_at tracking via localStorage.',
      },
      {
        searchText: 'SAVE MY PROFILE',
        color: { red: 0.71, green: 0.96, blue: 0.71 },
        label: 'FIXED: "💾 Save My Profile" button present directly under the 60-second action card',
      },
      {
        searchText: 'maximum of 3 check-ins per calendar day',
        color: { red: 0.71, green: 0.96, blue: 0.71 },
        label: 'FIXED: Max 3 check-ins per day enforced in handleSaveToProfile()',
      },
      {
        searchText: 'Remove bin/clear-selection feature from the main design.',
        color: { red: 1, green: 0.78, blue: 0.78 }, // Light red — pending
        label: 'PENDING: Clear selection button still present in current design. To be reviewed with Joy.',
      },
    ];

    const requests = [];
    let successCount = 0;

    for (const item of highlights) {
      const ranges = findTextRange(doc.body, item.searchText);
      if (ranges.length === 0) {
        console.log(`⚠ Not found in doc: "${item.searchText.substring(0, 60)}..."`);
        continue;
      }
      const range = ranges[0];
      console.log(`✓ Found "${item.searchText.substring(0, 40)}..." at index ${range.startIndex}-${range.endIndex}`);
      requests.push({
        updateTextStyle: {
          range: { startIndex: range.startIndex, endIndex: range.endIndex },
          textStyle: {
            backgroundColor: { color: { rgbColor: item.color } }
          },
          fields: 'backgroundColor',
        }
      });
      successCount++;
    }

    if (requests.length > 0) {
      console.log(`\nApplying ${requests.length} highlights to Google Doc...`);
      const result = await apiRequest('docs.googleapis.com', 'POST', `/v1/documents/${DOC_ID}:batchUpdate`, { requests }, token);
      console.log(`✅ Applied ${requests.length} highlights successfully!`);
    }

    // Now add Drive API comments
    console.log('\nAdding developer comments to the doc...');
    const driveComments = [
      {
        content: '✅ FIXED (24 Aug 2026): "Bad" cloud label corrected. The 5th mood family now correctly displays "Bad" as per this specification. Previously showed "Stressed" which was incorrect.',
        anchor: 'The 5 main bad feelings are; Sad / Disgusted / Angry / Fearful / Bad.'
      },
      {
        content: '✅ FIXED (24 Aug 2026): Popup message #2 implemented with exact wording from this spec. Shows once per day from the 2nd saved calendar day onward using localStorage key to prevent repeat within same day.',
        anchor: "You're building your 7-Day MoodFlip Report."
      },
      {
        content: '✅ FIXED (24 Aug 2026): Cormorant Garamond loaded from Google Fonts and applied to the positive mood result heading (the large word e.g. "Peaceful" on the right side). Nunito Sans also now loaded and applied as primary body/nav font.',
        anchor: 'Closest match: Cormorant Garamond or DM Serif Display'
      },
      {
        content: '✅ IMPLEMENTED (24 Aug 2026): 25 SEO mood pages exist at /moods/[slug] covering: sad, anxious, angry, overwhelmed, stressed, lonely, frustrated, hopeless, guilty, lost, unmotivated, nervous, insecure, disappointed, empty, tired, jealous, ashamed, bored, numb, irritated, rejected, confused, restless, fearful. Spec requires 20-30 — fully compliant.',
        anchor: '20-30 SEO mood pages'
      },
      {
        content: '⚠️ PENDING REVIEW (24 Aug 2026): "Remove bin/clear-selection feature" — the Clear Selection button is still present in the current design. Joy to confirm if this should be hidden or if it serves a navigation purpose for users. Will remove on Joy\'s instruction.',
        anchor: 'Remove bin/clear-selection feature from the main design.'
      },
      {
        content: '✅ FIXED (24 Aug 2026): "💾 Save My Profile" button is present directly below the 60-second action card. Max 3 check-ins per calendar day is enforced. Day-2+ reminder popup (once per day) is now active.',
        anchor: 'SAVE MY PROFILE'
      },
    ];

    for (const comment of driveComments) {
      try {
        const commentBody = {
          content: comment.content,
          quotedFileContent: { value: comment.anchor, mimeType: 'text/plain' }
        };
        await apiRequest(
          'www.googleapis.com',
          'POST',
          `/drive/v3/files/${DOC_ID}/comments`,
          commentBody,
          token
        );
        console.log(`✅ Comment added for: "${comment.anchor.substring(0, 40)}..."`);
      } catch (e) {
        console.log(`⚠ Comment failed for "${comment.anchor.substring(0, 40)}...": ${e.message}`);
      }
    }

    console.log('\n🎉 All highlights and comments applied to Google Doc!');
    console.log(`Doc URL: https://docs.google.com/document/d/${DOC_ID}/edit`);

  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
