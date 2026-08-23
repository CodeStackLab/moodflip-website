/**
 * simple_comments.js
 * Delete old long comments and post short simple comments
 * exactly like "Section removed." style shown in the doc
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

// Short, simple comments — exactly like "Section removed." style
const comments = [
  {
    anchor: 'Fake AdSense-style placeholders appear too early / look messy.',
    content: 'Fixed. Fake ad banners removed.'
  },
  {
    anchor: 'Privacy consent wording is not clearly proven.',
    content: 'Fixed. Privacy consent checkbox with 90-day notice added to Register page.'
  },
  {
    anchor: '90-day deletion notice is not clearly proven.',
    content: 'Fixed. 90-day auto-delete notice added to Register page and Privacy Policy.'
  },
  {
    anchor: 'Current content looks generic/filler rather than approved useful mood pages.',
    content: 'Fixed. Blog content updated to mood-specific pages.'
  },
  {
    anchor: 'Medical/scientific overclaiming needs review.',
    content: 'Fixed. Removed all medical claims including "science-backed", "rewire neural pathways", "Anxiety Relief Techniques That Actually Work", fake doctor quotes.'
  },
  {
    anchor: 'No affiliate links at launch must be confirmed.',
    content: 'Confirmed. Zero affiliate links on the website.'
  }
];

async function main() {
  const token = getToken();

  // Step 1: Get and delete previously posted comments (our ones only)
  console.log('Reading existing comments...');
  const existing = await apiRequest('GET', `/drive/v3/files/${DOC_ID}/comments?fields=*&pageSize=100`, null, token);
  const allComments = existing.comments || [];

  // Delete our previously posted anchored ones
  const ours = allComments.filter(c =>
    c.content && (
      c.content.startsWith('Fixed.') ||
      c.content.startsWith('Confirmed.') ||
      c.content.startsWith('✅')
    )
  );
  console.log(`Deleting ${ours.length} old comments...`);
  for (const c of ours) {
    try {
      await apiRequest('DELETE', `/drive/v3/files/${DOC_ID}/comments/${c.id}`, null, token);
      console.log(`  Deleted: ${c.id}`);
    } catch(e) { console.log(`  Skip: ${e.message.substring(0,60)}`); }
    await new Promise(r => setTimeout(r, 300));
  }

  // Step 2: Post new short comments
  console.log('\nPosting short comments...');
  for (const { anchor, content } of comments) {
    try {
      const res = await apiRequest('POST', `/drive/v3/files/${DOC_ID}/comments?fields=*`, {
        content,
        quotedFileContent: { mimeType: 'text/plain', value: anchor }
      }, token);
      console.log(`✅ "${content}"`);
      console.log(`   → anchored to: "${anchor.substring(0, 55)}"`);
    } catch(e) {
      console.log(`⚠️  Anchor failed, posting plain: ${e.message.substring(0,80)}`);
      try {
        await apiRequest('POST', `/drive/v3/files/${DOC_ID}/comments?fields=*`, { content }, token);
        console.log(`   ✅ Plain comment posted.`);
      } catch(e2) { console.log(`   ❌ ${e2.message}`); }
    }
    await new Promise(r => setTimeout(r, 700));
  }

  console.log('\nDone! Open doc:');
  console.log('https://docs.google.com/document/d/' + DOC_ID);
}

main().catch(e => console.error('Error:', e.message));
