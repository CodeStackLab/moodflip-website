/**
 * post_resolution_comments.js
 * Posts resolution/status comments to the Google Doc for issues we've fixed.
 */
const { execSync } = require('child_process');
const https = require('https');

const DOC_ID = '1G01r_TJjjtPNvClHsBH4tMAXJJWou16r1X6WPgtTtik';

function getToken() {
  return execSync(
    'powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"'
  ).toString().trim();
}

function postComment(fileId, content, token) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ content });
    const options = {
      hostname: 'www.googleapis.com',
      path: `/drive/v3/files/${fileId}/comments?fields=*`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(options, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(JSON.parse(raw));
        else reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0, 300)}`));
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const resolutions = [
  {
    issue: '#4 / #35',
    comment: `✅ FIXED — Issue #4 & #35: Fake/messy AdSense placeholder banners removed from website. Ad display is now admin-controlled (off by default). No ad banners are visible to users unless activated by Joy via the admin panel after AdSense approval. Clean spacing preserved for future ads only.`
  },
  {
    issue: '#29',
    comment: `✅ CONFIRMED — Issue #29: Privacy consent wording is fully implemented on the Register page with the exact required checkbox: "I consent to MoodFlip storing my email and saved mood check-ins. I understand that inactive profiles and saved mood history are automatically deleted after 90 days of inactivity." — with a link to the Privacy Policy. Required checkbox before account creation.`
  },
  {
    issue: '#30',
    comment: `✅ CONFIRMED — Issue #30: 90-day deletion notice is displayed in two places: (1) Register page consent checkbox wording, and (2) Privacy Policy page — dedicated "Automatic 90-Day Inactive Data Deletion Policy" section with a full explanation of the deletion process and user rights.`
  },
  {
    issue: '#33',
    comment: `✅ FIXED — Issue #33: Generic wellness blog posts replaced with mood-specific, legally safe content. All blog categories updated: "Self-Reflection Tips", "Calm & Grounding", "How MoodFlip Helps", etc. Generic filler posts removed and rewritten to be mood-specific.`
  },
  {
    issue: '#37',
    comment: `✅ FIXED — Issue #37: All medical/scientific overclaiming removed from the website. Specifically removed: "science-backed", "rewire neural pathways", "Anxiety Relief Techniques That Actually Work", "Mastering Anxiety with Science", "neuroscientists at Stanford", "reduces cortisol by up to 25%", fake Dr. Sarah Jenkins attribution. The AI assistant system prompt updated from "science-backed emotional wellness coach" to "emotional wellbeing guide — not a medical service". All content now uses safe, supportive self-reflection language.`
  },
  {
    issue: '#39',
    comment: `✅ CONFIRMED — Issue #39: No affiliate links anywhere on the live website. Confirmed by full codebase search — zero affiliate links, affiliate blocks, or third-party product recommendations present in the website code.`
  }
];

async function main() {
  const token = getToken();
  console.log('Posting resolution comments to Google Doc...\n');

  for (const { issue, comment } of resolutions) {
    try {
      await postComment(DOC_ID, comment, token);
      console.log(`✅ Posted: Issue ${issue}`);
      // Small delay between requests
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error(`❌ Failed for ${issue}:`, e.message);
    }
  }

  console.log('\n✅ All resolution comments posted to Google Doc.');
  console.log('View: https://docs.google.com/document/d/' + DOC_ID);
}

main().catch(e => console.error('Error:', e.message));
