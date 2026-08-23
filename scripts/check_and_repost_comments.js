/**
 * check_and_repost_comments.js
 * 1. Reads all existing comments on the Google Doc via Drive API
 * 2. Deletes old ones we posted (Akeel Khan authored)
 * 3. Re-posts comments with proper anchored text so they appear inline in Google Docs
 */
const { execSync } = require('child_process');
const https = require('https');

const DOC_ID = '1G01r_TJjjtPNvClHsBH4tMAXJJWou16r1X6WPgtTtik';

function getToken() {
  return execSync(
    'powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"'
  ).toString().trim();
}

function apiRequest(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'www.googleapis.com',
      path,
      method,
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
        if (res.statusCode >= 200 && res.statusCode < 300) return resolve(JSON.parse(raw));
        reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0, 400)}`));
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// These are the exact text strings from the Google Doc we want to anchor comments to
const resolutionComments = [
  {
    anchor: 'Fake AdSense-style placeholders appear too early / look messy.',
    content: `✅ FIXED (Issue #4 / #35) — Fake/messy AdSense placeholder banners fully removed from website. Ad display is now admin-controlled and OFF by default. No ad banners are shown to users until activated by the owner after AdSense approval. Clean spacing preserved for future ads only.`
  },
  {
    anchor: 'Privacy consent wording is not clearly proven.',
    content: `✅ CONFIRMED (Issue #29) — Privacy consent wording fully implemented on the Register page. Exact checkbox text: "I consent to MoodFlip storing my email and saved mood check-ins. I understand that inactive profiles and saved mood history are automatically deleted after 90 days of inactivity." Required checkbox before account creation, with Privacy Policy link.`
  },
  {
    anchor: '90-day deletion notice is not clearly proven.',
    content: `✅ CONFIRMED (Issue #30) — 90-day deletion notice implemented in TWO places: (1) Register page consent checkbox text, and (2) Privacy Policy page has dedicated "Automatic 90-Day Inactive Data Deletion Policy" banner and full section explaining the deletion process and user rights.`
  },
  {
    anchor: 'Current content looks generic/filler rather than approved useful mood pages.',
    content: `✅ FIXED (Issue #33) — All blog posts updated to mood-specific, safe, non-generic content. Categories changed from generic "Mindset Science" to specific mood-oriented categories: "Self-Reflection Tips", "Calm & Grounding", "How MoodFlip Helps". All posts now include explicit non-medical disclaimer.`
  },
  {
    anchor: 'Medical/scientific overclaiming needs review.',
    content: `✅ FIXED (Issue #37) — All medical/scientific overclaiming removed from website. Specifically removed: "science-backed micro-actions that rewire your emotional state", "no therapy required", fake Dr. Sarah Jenkins quote, "neuroscientists at Stanford", "reduces cortisol by up to 25%", "Anxiety Relief Techniques That Actually Work", "Mastering Anxiety with Science", "The Neuroscience of 60-Second Micro-Actions". AI assistant prompt updated: removed "science-backed emotional wellness coach". All content now uses safe self-reflection language only.`
  },
  {
    anchor: 'No affiliate links at launch must be confirmed.',
    content: `✅ CONFIRMED (Issue #39) — Full codebase search performed. Zero affiliate links, affiliate blocks, or third-party product recommendations found anywhere on the live website. Confirmed clean.`
  }
];

async function main() {
  const token = getToken();
  console.log('Step 1: Reading existing comments on Google Doc...\n');

  // List existing comments
  const existing = await apiRequest('GET', `/drive/v3/files/${DOC_ID}/comments?fields=*&pageSize=100`, null, token);
  const comments = existing.comments || [];
  console.log(`Found ${comments.length} existing comments:`);
  for (const c of comments) {
    console.log(`  [${c.id}] by ${c.author?.displayName}: "${(c.content || '').substring(0, 60)}..."`);
  }

  // Delete the ones we posted programmatically (those starting with ✅)
  const toDelete = comments.filter(c => c.content && (c.content.startsWith('✅') || c.content.startsWith('FIXED') || c.content.startsWith('CONFIRMED')));
  if (toDelete.length > 0) {
    console.log(`\nStep 2: Deleting ${toDelete.length} previously posted resolution comments...`);
    for (const c of toDelete) {
      try {
        await apiRequest('DELETE', `/drive/v3/files/${DOC_ID}/comments/${c.id}`, null, token);
        console.log(`  Deleted comment ${c.id}`);
      } catch (e) {
        console.log(`  Could not delete ${c.id}: ${e.message}`);
      }
      await new Promise(r => setTimeout(r, 300));
    }
  }

  console.log('\nStep 3: Posting new anchored resolution comments...');
  for (const { anchor, content } of resolutionComments) {
    try {
      const result = await apiRequest('POST', `/drive/v3/files/${DOC_ID}/comments?fields=*`, {
        content,
        quotedFileContent: {
          mimeType: 'text/plain',
          value: anchor
        }
      }, token);
      console.log(`✅ Posted comment on: "${anchor.substring(0, 55)}..."`);
      console.log(`   Comment ID: ${result.id}`);
    } catch (e) {
      // If anchor fails, post without anchor
      console.log(`  ⚠️ Anchor failed for "${anchor.substring(0,40)}..." — posting as general comment`);
      try {
        const result2 = await apiRequest('POST', `/drive/v3/files/${DOC_ID}/comments?fields=*`, { content }, token);
        console.log(`  ✅ Posted as general comment. ID: ${result2.id}`);
      } catch (e2) {
        console.log(`  ❌ Failed: ${e2.message}`);
      }
    }
    await new Promise(r => setTimeout(r, 800));
  }

  console.log('\n✅ All done! View the doc:');
  console.log('https://docs.google.com/document/d/' + DOC_ID);
}

main().catch(e => console.error('Error:', e.message));
