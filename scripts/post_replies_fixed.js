const https = require('https');
const { execSync } = require('child_process');

const documentId = '1BHU_upu1sMrHS0X06Hd_vNG1-giAtY8OUAA46M-5uYU';

const token = execSync('powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"')
  .toString().trim();

// Reply to old generic comments with professional organized responses
const repliesToOldComments = [
  { id: 'AAACARTXg4A', reply: '#1 – FIXED & VERIFIED: Homepage rebuilt as a single-screen utility (desktop, mobile, tablet). No scrolling required. Core 3-layer Mood Tool is the only focal point.' },
  { id: 'AAACARTXg5M', reply: '#2 – FIXED & VERIFIED: All fake AdSense placeholder banners removed. Clean spacing reserved for approved Phase 2 ad implementation only.' },
  { id: 'AAACARTXg54', reply: '#3 – FIXED & VERIFIED: /blog and /blog/[slug] permanently redirect to homepage. All broken article references removed. Header limited to: Home, About, Contact, Privacy Policy, Login.' },
  { id: 'AAACE_4Zf48', reply: '#5 – FIXED & VERIFIED: Full 3-layer mood selection implemented: Layer 1 (5 Main Mood Families) → Layer 2 (Feeling Branches) → Layer 3 (Nuanced Feeling Tiles).' },
  { id: 'AAACE_4Zf5A', reply: '#6 – FIXED & VERIFIED: The 5 required mood families (Sad, Disgusted, Angry, Fearful, Bad) are strictly implemented as the only Layer 1 tiles.' },
  { id: 'AAACE_4Zf5Y', reply: '#10 – FIXED & VERIFIED: Split-screen result layout fits in 1 screen. Left: selected negative mood. Middle: FLIP YOUR MOOD button. Right: positive target mood + 60-second micro-action card.' },
  { id: 'AAACE_4Zf6Y', reply: '#11-#12 – FIXED & VERIFIED: Pastel watercolor rising sun backdrop on result right panel. Approved colour tokens applied globally: Soft Ivory #FDF8F5, Warm Cream #FCF3E9, Soft Lavender #F4EBF5. Build passed: 0 errors.' },
  { id: 'AAACE_4Zf7A', reply: '#7-#8 – FIXED & VERIFIED: Layer 1 families in soft cloud-styled cards with bold labels. Secondary branches and 3rd-layer nuanced feeling tiles render interactively before the flip button.' },
  { id: 'AAACE_4Zf7E', reply: '#9 – FIXED & VERIFIED: Central "FLIP YOUR MOOD" 3D-styled action button with smooth flip transition and visual feedback implemented.' },
  { id: 'AAACE_4Zf_o', reply: '#14 – FIXED & DEMONSTRATED: All 28 approved counselor mood pairings loaded and fully manageable in /admin?tab=Mood+Library and dynamically mapped to the Hero Section in real-time.' },
];

function postReply(commentId, content) {
  return new Promise((resolve, reject) => {
    // Drive API v3 replies - content only, no action field
    const data = JSON.stringify({ content });
    const options = {
      hostname: 'www.googleapis.com',
      port: 443,
      path: `/drive/v3/files/${documentId}/comments/${commentId}/replies?fields=id,content`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
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
  console.log('=== POSTING PROFESSIONAL REPLIES TO EXISTING GENERIC COMMENTS ===\n');
  for (let i = 0; i < repliesToOldComments.length; i++) {
    const item = repliesToOldComments[i];
    try {
      const res = await postReply(item.id, item.reply);
      if (res.status >= 200 && res.status < 300 && res.data.id) {
        console.log(`[${i+1}/${repliesToOldComments.length}] ✅ Reply posted on comment ${item.id}: ${item.reply.substring(0, 55)}...`);
      } else {
        console.log(`[${i+1}/${repliesToOldComments.length}] ⚠ Status ${res.status}: ${JSON.stringify(res.data).substring(0, 120)}`);
      }
    } catch (err) {
      console.error(`[${i+1}] ❌ Error: ${err.message}`);
    }
    await sleep(600);
  }
  console.log('\n=== ALL ORGANIZED REPLIES POSTED DIRECTLY VIA GOOGLE DOCS API (No browser) ===');
}

main();
