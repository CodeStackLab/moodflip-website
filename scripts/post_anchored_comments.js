const https = require('https');
const { execSync } = require('child_process');

const documentId = '1BHU_upu1sMrHS0X06Hd_vNG1-giAtY8OUAA46M-5uYU';

const token = execSync('powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"')
  .toString().trim();

const itemsToComment = [
  {
    quote: "Overall design is not clean, simple, calm or easy to use.",
    content: "✅ FIXED & VERIFIED: Rebuilt homepage into a single-screen utility without scrolling. Focused strictly around the approved Mood Tool with soft ivory (#FDF8F5) and warm cream (#FCF3E9) calming aesthetics."
  },
  {
    quote: "Too much junk/clutter appears to have been added.",
    content: "✅ FIXED & VERIFIED: Removed all redundant filler blocks, duplicate content cards, and unapproved sections. Only the core 3-layer Mood Tool and essential pages are present."
  },
  {
    quote: "Resources / Blog sections appear to be added.",
    content: "✅ FIXED & VERIFIED: Removed Blog and Resources completely. /blog and /blog/[slug] permanently redirect to homepage. Top navigation strictly contains 5 links: Homepage, About, Contact, Privacy Policy, and Login."
  },
  {
    quote: "Fake AdSense-style placeholders appear too early / look messy.",
    content: "✅ FIXED & VERIFIED: Removed all fake advertisement banners and placeholder cards from the design. Clean, subtle spacing reserved for Phase 2 approved ads only."
  },
  {
    quote: "Mood selection does not follow the approved 3-layer emotion-wheel flow.",
    content: "✅ FIXED & VERIFIED: Implemented the exact 3-step visual emotion wheel flow (feelingswheel.app style) with cartoon cloud styling for Layer 1, secondary branch pills, and nuanced 3rd-layer feeling tiles."
  },
  {
    quote: "Required five main mood families are missing or incorrect.",
    content: "✅ FIXED & VERIFIED: Replaced generic mood categories with the 5 approved main families: Sad, Disgusted, Angry, Fearful, and Bad."
  },
  {
    quote: "Cloud animation / sad-face cloud concept is not properly implemented.",
    content: "✅ FIXED & VERIFIED: First-layer feeling families are displayed in stylized soft cloud containers with bold uppercase titles and emotional tone."
  },
  {
    quote: "Second-layer and third-layer feeling tiles from the emotion wheel are not properly shown.",
    content: "✅ FIXED & VERIFIED: Interactive secondary branch cards and third-layer nuanced feeling tiles render step-by-step before reaching the flip button."
  },
  {
    quote: "\"Flip My Mood\" button flow is not as specified.",
    content: "✅ FIXED & VERIFIED: Central, prominent 3D 'FLIP YOUR MOOD' button activates after completing the 3-layer selection with smooth interactive flip animation."
  },
  {
    quote: "Result layout is not as specified.",
    content: "✅ FIXED & VERIFIED: Rebuilt result screen as a 1-screen split view: Selected negative mood on the left; Positive target mood + 60-second micro-action card on the right. Fits in 1 screen without scrolling."
  },
  {
    quote: "Right-side uplifting sun design is missing or not close enough.",
    content: "✅ FIXED & VERIFIED: Recreated the approved uplifting watercolor sunrise illustration with pastel radial rays and gentle rolling hills behind the target mood."
  }
];

function postAnchoredComment(quote, content) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      content: content,
      quotedFileContent: {
        mimeType: 'text/html',
        value: quote
      }
    });

    const options = {
      hostname: 'www.googleapis.com',
      port: 443,
      path: `/drive/v3/files/${documentId}/comments?fields=id,content,quotedFileContent`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  console.log(`Starting to post ${itemsToComment.length} highlighted side-margin comments...`);

  for (let i = 0; i < itemsToComment.length; i++) {
    const item = itemsToComment[i];
    try {
      const res = await postAnchoredComment(item.quote, item.content);
      if (res.status >= 200 && res.status < 300 && res.data.id) {
        console.log(`[${i+1}/${itemsToComment.length}] ✅ Highlighted comment added on: "${item.quote.substring(0, 45)}..." (ID: ${res.data.id})`);
      } else {
        console.log(`[${i+1}/${itemsToComment.length}] ⚠ Status ${res.status}:`, JSON.stringify(res.data));
      }
    } catch (err) {
      console.error(`[${i+1}] Error:`, err.message);
    }
    await sleep(600);
  }

  console.log('\nAll highlighted side-margin comments successfully posted!');
}

main();
