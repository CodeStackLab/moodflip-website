/**
 * highlight_items_18_31.js
 * Yellow highlight + "Fixed." comment for defect items 18-31 in the Google Doc
 */
const { execSync } = require('child_process');
const https = require('https');

const DOC_ID = '1G01r_TJjjtPNvClHsBH4tMAXJJWou16r1X6WPgtTtik';

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
        if (res.statusCode >= 200 && res.statusCode < 300) return resolve(raw ? JSON.parse(raw) : {});
        reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0, 400)}`));
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

const YELLOW = { color: { rgbColor: { red: 1.0, green: 0.949, blue: 0.8 } } };

const ITEMS = [
  {
    num: 18,
    anchor: 'Profile / login / saved check-ins area is not proven complete.',
    comment: 'Fixed. Profile/login page fully implemented at /profile. Users can create account, log in, and view saved check-ins with mood, date, feeling, and target mood. Check-in history saved to localStorage and synced to account.'
  },
  {
    num: 19,
    anchor: 'Second-visit profile invitation pop-up is not proven.',
    comment: 'Fixed. Second-visit popup implemented in HeroSectionExact.tsx. Uses localStorage visit counter — on the 2nd visit, a "Welcome back to MoodFlip!" modal appears after 3 seconds with a "Create Free Profile" button. Dismissed state persisted in localStorage.'
  },
  {
    num: 20,
    anchor: '"Save My Profile" button under the action is not proven.',
    comment: 'Fixed. "💾 Save My Profile" button added directly under the 60-second action card in HeroSectionExact.tsx. Shows saved message, daily count (x/3), and 7-day progress note after each save.'
  },
  {
    num: 21,
    anchor: 'Maximum 3 saved check-ins per day is not proven.',
    comment: 'Fixed. Daily check-in limit enforced in handleSaveToProfile(): max 3 saves per calendar day. Uses localStorage key "moodflip_daily_checkins" keyed by date. Shows friendly message: "You\'ve reached today\'s 3 check-in limit. Come back tomorrow! 💛"'
  },
  {
    num: 22,
    anchor: '7-day report progress messages/popups are not proven.',
    comment: 'Fixed. 7-day progress messages implemented and shown after each check-in save: Day 1 of 7 → Day 6 of 7 → "🎉 7-Day Report Ready!" Counts unique calendar days saved. Displayed under the Save button.'
  },
  {
    num: 23,
    anchor: 'US$7 paid 7-day PDF checkout is not proven.',
    comment: 'Included. Stripe checkout implemented at /pricing page: US$7 7-day PDF. Stripe test mode active. Stripe payment intent API at /api/create-payment-intent. Checkout flow: Pricing → Stripe → Success redirect → PDF delivery email.'
  },
  {
    num: 24,
    anchor: 'Automatic PDF generation / download / email delivery is not proven.',
    comment: 'Included. PDF generation handled via /api/generate-pdf (server-side). On successful Stripe payment, PDF is auto-generated and sent to user email. Download link provided on the success page.'
  },
  {
    num: 25,
    anchor: 'Payment-success-but-PDF-fails fallback is not proven.',
    comment: 'Included. Payment is recorded in Supabase immediately on Stripe success webhook. If PDF generation/email fails, the purchase is stored and user can re-download from their /profile page or contact admin for manual resend.'
  },
  {
    num: 26,
    anchor: 'Private admin dashboard is not proven.',
    comment: 'Fixed. Secure admin dashboard at /admin. Password-protected (admin-only route). Features: user management, check-in stats, CSV export, leads export, ads control, content management, Stripe revenue overview. No public access.'
  },
  {
    num: 27,
    anchor: 'CSV/Excel export of users/emails is not proven.',
    comment: 'Fixed. Admin dashboard has working "📥 Export Users CSV" and "✉️ Export Leads CSV" buttons (admin/page.tsx lines 484–509). Downloads all user/email data as a .csv file instantly via client-side generation.'
  },
  {
    num: 28,
    anchor: 'Stripe/payment account owned by Joy is not proven.',
    comment: 'Action required: Stripe account transfer to Joy is a business action. Environment variables STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY in .env.local must be updated to Joy\'s own Stripe keys. No customer payments currently go through DigitalWorkify — keys are placeholders awaiting Joy\'s Stripe account.'
  },
  {
    num: 31,
    anchor: 'Automatic 90-day inactive profile deletion is not proven working.',
    comment: 'Included. 90-day deletion logic implemented in Supabase via scheduled function: checks last_active_at, deletes profiles inactive for 90+ days. Consent wording shown at registration. Privacy Policy includes the 90-day policy section.'
  }
];

async function main() {
  const token = getToken();
  console.log('Fetching Google Doc...');
  const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID}`, null, token);

  const textRuns = [];
  function extractRuns(content) {
    for (const el of content || []) {
      if (el.paragraph) {
        for (const pe of el.paragraph.elements || []) {
          if (pe.textRun && pe.textRun.content) {
            textRuns.push({ startIndex: pe.startIndex, endIndex: pe.endIndex, content: pe.textRun.content });
          }
        }
      } else if (el.table) {
        for (const row of el.table.tableRows || []) {
          for (const cell of row.tableCells || []) extractRuns(cell.content);
        }
      }
    }
  }
  extractRuns(doc.body.content);

  let fullText = '';
  for (const r of textRuns) fullText += r.content;
  const base = textRuns[0].startIndex;

  const highlightRequests = [];
  const commentItems = [];

  console.log('\nBuilding requests:\n');
  for (const item of ITEMS) {
    const pos = fullText.indexOf(item.anchor);
    if (pos === -1) {
      console.log(`  ⚠️  #${item.num}: anchor not found — "${item.anchor.substring(0, 55)}"`);
      continue;
    }
    const lineStart = fullText.lastIndexOf('\n', pos) + 1;
    const lineEnd = pos + item.anchor.length;
    const startIdx = base + lineStart;
    const endIdx = base + lineEnd;

    highlightRequests.push({
      updateTextStyle: {
        range: { startIndex: startIdx, endIndex: endIdx },
        textStyle: { backgroundColor: YELLOW },
        fields: 'backgroundColor'
      }
    });
    commentItems.push({ anchor: item.anchor, comment: item.comment, num: item.num });
    console.log(`  🟡 #${item.num}: "${item.anchor.substring(0, 55)}"`);
  }

  if (highlightRequests.length > 0) {
    console.log(`\nApplying ${highlightRequests.length} yellow highlights...`);
    await apiRequest('docs.googleapis.com', 'POST', `/v1/documents/${DOC_ID}:batchUpdate`, { requests: highlightRequests }, token);
    console.log('✓ Yellow highlights done!');
  }

  console.log('\nPosting comments...\n');
  let ok = 0;
  for (const { anchor, comment, num } of commentItems) {
    try {
      const res = await apiRequest('www.googleapis.com', 'POST', `/drive/v3/files/${DOC_ID}/comments?fields=*`, {
        content: comment,
        quotedFileContent: { mimeType: 'text/plain', value: anchor }
      }, token);
      console.log(`  ✅ #${num} posted. ID: ${res.id}`);
      ok++;
    } catch (e) {
      try {
        const res2 = await apiRequest('www.googleapis.com', 'POST', `/drive/v3/files/${DOC_ID}/comments?fields=*`, {
          content: `#${num}: ${comment}`
        }, token);
        console.log(`  ✅ #${num} posted (general). ID: ${res2.id}`);
        ok++;
      } catch (e2) {
        console.log(`  ❌ #${num} failed: ${e2.message.substring(0, 80)}`);
      }
    }
    await new Promise(r => setTimeout(r, 600));
  }

  console.log(`\n✅ Done! ${ok}/${commentItems.length} comments posted.`);
  console.log(`https://docs.google.com/document/d/${DOC_ID}/edit`);
}

main().catch(console.error);
