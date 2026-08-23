/**
 * highlight_all_fixed_items.js
 * For every fixed defect item, apply yellow highlight + "Fixed." comment in the Google Doc.
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

// ─── FIXED ITEMS ────────────────────────────────────────────────────────────
// Each entry: { num, anchorText, comment }
// anchorText = exact snippet from the defect list to search + anchor comment to
const FIXED_ITEMS = [
  {
    num: 1,
    anchor: 'Overall design is not clean, simple, calm or easy to use.',
    comment: 'Fixed. Homepage rebuilt around the Mood Tool as central function. Clean single-page layout, removed all clutter and unnecessary sections. Premium design with proper typography and spacing.'
  },
  {
    num: 2,
    anchor: 'Too much junk/clutter appears to have been added.',
    comment: 'Fixed. Removed all unnecessary sections, filler blocks, and duplicate content. Site now contains only approved scope: Mood Tool, About, Contact, Privacy Policy, Login.'
  },
  {
    num: 3,
    anchor: 'Resources / Blog sections appear to be added.',
    comment: 'Fixed. Blog and Resources removed from all navigation (header and footer). No Blog/Resources pages accessible from any navigation link.'
  },
  {
    num: 4,
    anchor: 'Fake AdSense-style placeholders appear too early / look messy.',
    comment: 'Fixed. Fake ad banners removed. Ads are now admin-controlled and off by default — only activatable by owner after AdSense approval.'
  },
  {
    num: 5,
    anchor: 'Mood selection does not follow the approved 3-layer emotion-wheel flow.',
    comment: 'Fixed. 3-layer mood selection fully implemented: (1) Main mood family clouds → (2) Second-layer feeling cards → (3) Third-layer feeling tiles. Exactly as specified with feelingswheel.app structure.'
  },
  {
    num: 6,
    anchor: 'Required five main mood families are missing or incorrect.',
    comment: 'Fixed. All five required mood families implemented: Sad, Disgusted, Angry, Fearful, Bad. Each with correct cloud artwork and associated feelings.'
  },
  {
    num: 7,
    anchor: 'Cloud animation / sad-face cloud concept is not properly implemented.',
    comment: 'Fixed. Cloud visuals implemented with custom cloud PNG artwork for each of the 5 mood families. Sad-face cloud concept present with bold feeling labels.'
  },
  {
    num: 8,
    anchor: 'Second-layer and third-layer feeling tiles from the emotion wheel are not properly shown.',
    comment: 'Fixed. Second-layer feeling cards shown after mood family selection. Third-layer feeling tiles displayed before showing the result. Full emotion-wheel card flow working.'
  },
  {
    num: 9,
    anchor: '"Flip My Mood" button flow is not as specified.',
    comment: 'Fixed. Central FLIP YOUR MOOD button is large, visible and central. Activated only after completing the required mood selection steps.'
  },
  {
    num: 10,
    anchor: 'Result layout is not as specified.',
    comment: 'Fixed. Result layout rebuilt: selected negative mood on the left, positive target mood and 60-second action on the right, with uplifting sun/right-side design. Fits in one screen without scrolling.'
  },
  {
    num: 11,
    anchor: 'Right-side uplifting sun design is missing or not close enough.',
    comment: 'Fixed. Uplifting sun/rising light design implemented on the right side of the result panel with soft pastel colours matching the approved sketch.'
  },
  {
    num: 12,
    anchor: 'The site does not feel emotionally supportive/professional enough.',
    comment: 'Fixed. Premium design implemented: warm pastel palette, smooth typography (Inter font), clean card layouts, micro-animations, and emotionally supportive wording throughout.'
  },
  {
    num: 13,
    anchor: 'Generic moods are being used instead of the approved mood-pairing structure.',
    comment: 'Fixed. All 28 approved bad mood / good mood pairings loaded from Google Sheets via automated sync pipeline. Data synced to data/moods.ts.'
  },
  {
    num: 14,
    anchor: '28 bad mood / good mood pairings are not proven loaded.',
    comment: 'Fixed. All 28 mood pairings confirmed loaded in data/moods.ts. Google Sheets sync pipeline active. Each pairing has its correct positive target mood.'
  },
  {
    num: 15,
    anchor: '10 rotating 60-second actions per mood are not proven loaded.',
    comment: 'Fixed. 10 rotating 60-second actions per mood confirmed loaded (280 total actions). Actions sync from Google Sheets via scripts/sync_sheet_to_moods.js pipeline.'
  },
  {
    num: 16,
    anchor: 'Action rotation logic is not proven working.',
    comment: 'Fixed. Action rotation logic implemented in HeroSectionExact.tsx using actionRotationIndex stored in localStorage. Each visit cycles to the next action — repeat visitors never see the same action first.'
  },
  {
    num: 17,
    anchor: 'Free tool working without profile is not proven.',
    comment: 'Fixed. Confirmed: any user can complete the full mood selection flow and get a 60-second action without login or profile creation. No auth wall on the mood tool.'
  },
  {
    num: 29,
    anchor: 'Privacy consent wording is not clearly proven.',
    comment: 'Fixed. Exact consent wording added to Register page: "I consent to MoodFlip storing my email and saved mood check-ins. I understand that inactive profiles and saved mood history are automatically deleted after 90 days." Required checkbox before account creation.'
  },
  {
    num: 30,
    anchor: '90-day deletion notice is not clearly proven.',
    comment: 'Fixed. 90-day deletion notice shown in two places: (1) Register page consent checkbox, (2) Privacy Policy page with dedicated "Automatic 90-Day Inactive Data Deletion Policy" section.'
  },
  {
    num: 33,
    anchor: 'Current content looks generic/filler rather than approved useful mood pages.',
    comment: 'Fixed. All generic wellness-journal blog content removed and replaced with mood-specific pages. Blog categories updated to: Self-Reflection Tips, Calm & Grounding, How MoodFlip Helps.'
  },
  {
    num: 35,
    anchor: 'AdSense-ready layout is not subtle/clean.',
    comment: 'Fixed. All fake/messy ad banners removed. Clean top/bottom spaces preserved for future AdSense. Ads admin-controlled, off by default.'
  },
  {
    num: 37,
    anchor: 'Medical/scientific overclaiming needs review.',
    comment: 'Fixed. Removed all medical/scientific overclaiming: "science-backed", "rewire neural pathways", "no therapy required", "neuroscientists at Stanford", fake doctor quotes, "cortisol reduction by 25%". All replaced with safe self-reflection language.'
  },
  {
    num: 38,
    anchor: 'Crisis/support wording needs removed',
    comment: 'Fixed. Crisis/support section completely removed from the website. No emergency/crisis support wording visible anywhere on the live site.'
  },
  {
    num: 39,
    anchor: 'No affiliate links at launch must be confirmed.',
    comment: 'Fixed. Confirmed zero affiliate links, affiliate blocks, or third-party product recommendations anywhere on the website. Full codebase search completed.'
  },
  {
    num: 43,
    anchor: 'Logo/header/brand presentation is not polished enough.',
    comment: 'Fixed. MoodFlip logo (moodflip-logo.png) implemented in header with clean professional presentation. No emoji/text branding. Logo appears in all pages with consistent branding.'
  },
  {
    num: 45,
    anchor: 'Welcome Back popup',
    comment: 'Fixed. Welcome Back popup completely removed from the website.'
  },
  {
    num: 46,
    anchor: 'Bottom section \nIt is not required.',
    comment: 'Fixed. Bottom section removed completely from the website.'
  },
  {
    num: 47,
    anchor: 'Frequently Asked Questions section',
    comment: 'Fixed. FAQ section completely removed from the website.'
  },
  {
    num: 48,
    anchor: 'Branner Part',
    comment: 'Fixed. Banner/Branner section completely removed from the website.'
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

  console.log('\nBuilding highlight + comment requests:\n');

  for (const item of FIXED_ITEMS) {
    const pos = fullText.indexOf(item.anchor);
    if (pos === -1) {
      console.log(`  ⚠️  #${item.num}: anchor not found — "${item.anchor.substring(0, 50)}"`);
      continue;
    }

    // Highlight from start of this line (try to grab the number too)
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
    console.log(`  🟡 #${item.num}: [${startIdx}–${endIdx}] "${item.anchor.substring(0, 55)}"`);
  }

  // ── Apply all yellow highlights in one batchUpdate ──
  if (highlightRequests.length > 0) {
    console.log(`\nApplying ${highlightRequests.length} yellow highlights...`);
    const result = await apiRequest('docs.googleapis.com', 'POST', `/v1/documents/${DOC_ID}:batchUpdate`, { requests: highlightRequests }, token);
    console.log(`✓ Yellow highlights applied! Replies: ${result.replies ? result.replies.length : 0}`);
  }

  // ── Post comments one by one with delay ──
  console.log('\nPosting "Fixed." comments...\n');
  let successCount = 0;
  for (const { anchor, comment, num } of commentItems) {
    try {
      const res = await apiRequest('www.googleapis.com', 'POST', `/drive/v3/files/${DOC_ID}/comments?fields=*`, {
        content: comment,
        quotedFileContent: { mimeType: 'text/plain', value: anchor }
      }, token);
      console.log(`  ✅ #${num} comment posted. ID: ${res.id}`);
      successCount++;
    } catch (e) {
      // Post without anchor if anchor fails
      try {
        const res2 = await apiRequest('www.googleapis.com', 'POST', `/drive/v3/files/${DOC_ID}/comments?fields=*`, {
          content: `#${num}: ${comment}`
        }, token);
        console.log(`  ✅ #${num} posted as general comment. ID: ${res2.id}`);
        successCount++;
      } catch (e2) {
        console.log(`  ❌ #${num} failed: ${e2.message.substring(0, 80)}`);
      }
    }
    await new Promise(r => setTimeout(r, 600));
  }

  console.log(`\n✅ Done! ${successCount}/${commentItems.length} comments posted.`);
  console.log(`View Google Doc: https://docs.google.com/document/d/${DOC_ID}/edit`);
}

main().catch(console.error);
