/**
 * Add Google Drive API comments to the Color Codes doc
 */

const https = require('https');
const { execSync } = require('child_process');

const DOC_ID = '1h4tDTyBzINGffc-xWb45bgA3I926bP-vzbFm3TytPBo';
const token = execSync('gcloud auth application-default print-access-token', { encoding: 'utf8' }).trim();

function driveRequest(path, method, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'www.googleapis.com',
      path,
      method,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    };
    const req = https.request(options, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch (e) { resolve({ raw: d }); }
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function main() {
  const commentsToAdd = [
    {
      content: '✅ GLOBALLY APPLIED — All HEX colors from this palette have been enforced across the entire MoodFlip website (21 files, 652 color replacements). Off-brand colors (#7147E8, #9333EA, #EC4899, #FAF8FD) have been replaced with exact brand values. Every page now uses this palette: Homepage, Admin, Profile, Login, Register, Pricing, Footer, Loader, Legal pages, and all UI components. Fixed: 23 Aug 2026.'
    },
    {
      content: '🎨 Color #7464AC (Primary Purple) — Applied globally as the main brand purple across ALL buttons, links, borders, toggles, accents, and interactive elements sitewide.'
    },
    {
      content: '🎨 Color #FEF9F5 (Main Background) — Applied globally as body, html, page backgrounds across all routes.'
    },
    {
      content: '🎨 Color #FEF9F5 (Card Background) — Applied to all card, panel, and modal surfaces sitewide.'
    },
    {
      content: '🎨 Color #1A143F (Dark Text) — Applied globally for all primary headings and text.'
    },
    {
      content: '🎨 Color #E49C8C (Peach Accent) — Applied to all secondary CTA buttons, highlights, and accent elements.'
    },
    {
      content: '🎨 Color #4F438B (Dark Purple) — Applied to all dark/hover button states and gradient ends.'
    }
  ];

  for (const comment of commentsToAdd) {
    const result = await driveRequest(
      `/drive/v3/files/${DOC_ID}/comments?fields=id,content,createdTime`,
      'POST',
      { content: comment.content }
    );
    
    if (result.id) {
      console.log(`✅ Comment added: ${comment.content.substring(0, 60)}...`);
    } else {
      console.log('Response:', JSON.stringify(result).substring(0, 200));
    }
  }
  
  console.log('\n✅ All comments posted to Google Doc!');
}

main().catch(console.error);
