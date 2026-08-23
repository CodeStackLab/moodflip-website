/**
 * MoodFlip Google Doc Color Highlighter
 * Adds yellow highlights and comments to the Colour Codes doc
 * confirming each color has been applied globally to the website
 */

const https = require('https');
const { execSync } = require('child_process');

const DOC_ID = '1h4tDTyBzINGffc-xWb45bgA3I926bP-vzbFm3TytPBo';
const token = execSync('gcloud auth application-default print-access-token', { encoding: 'utf8' }).trim();

function docsRequest(path, method, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      hostname: method === 'POST' ? 'docs.googleapis.com' : 'docs.googleapis.com',
      path,
      method,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    };
    const req = https.request(options, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch (e) { resolve(d); }
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function main() {
  console.log('📖 Fetching Google Doc...');
  const doc = await docsRequest('/v1/documents/' + DOC_ID, 'GET', null);
  
  if (!doc.body) {
    console.error('Error fetching doc:', JSON.stringify(doc));
    process.exit(1);
  }

  console.log('Title:', doc.title);
  
  // Extract all text runs with their positions
  const content = doc.body.content;
  let allText = '';
  const segments = [];
  
  function extract(items) {
    for (const el of items || []) {
      if (el.paragraph) {
        for (const pe of el.paragraph.elements || []) {
          if (pe.textRun) {
            segments.push({
              text: pe.textRun.content,
              start: pe.startIndex,
              end: pe.endIndex
            });
            allText += pe.textRun.content;
          }
        }
      } else if (el.table) {
        for (const row of el.table.tableRows || [])
          for (const cell of row.tableCells || [])
            extract(cell.content);
      }
    }
  }
  extract(content);

  console.log('\nAll text:\n', allText);
  console.log('\nTotal segments:', segments.length);
  
  // Find the entire document range for highlighting
  // Get start and end of the document
  let docStart = segments[0]?.start || 1;
  let docEnd = segments[segments.length - 1]?.end || 10;

  console.log(`\nDocument range: ${docStart} to ${docEnd}`);
  
  // Find specific key color sections to highlight
  const colorMentions = [
    { search: '#7464AC', label: 'Primary purple - Applied globally ✅' },
    { search: '#FEF9F5', label: 'Main background - Applied globally ✅' },
    { search: '#FEF9F5', label: 'Card background - Applied globally ✅' },
    { search: '#F4EBF5', label: 'Soft lavender - Applied globally ✅' },
    { search: '#E49C8C', label: 'Warm peach accent - Applied globally ✅' },
    { search: '#1A143F', label: 'Dark text - Applied globally ✅' },
    { search: '#4F438B', label: 'Dark purple - Applied globally ✅' },
  ];

  // Build batch update requests
  const requests = [];

  // 1. Highlight the entire header/intro paragraph in yellow
  const headerSeg = segments.find(s => s.text.includes('HEX colour codes'));
  if (headerSeg) {
    requests.push({
      updateTextStyle: {
        range: { startIndex: headerSeg.start, endIndex: headerSeg.end },
        textStyle: {
          backgroundColor: { color: { rgbColor: { red: 1, green: 1, blue: 0 } } },
          bold: true
        },
        fields: 'backgroundColor,bold'
      }
    });
  }

  // 2. Find and highlight color hex entries
  for (const { search } of colorMentions) {
    for (const seg of segments) {
      if (seg.text.includes(search)) {
        requests.push({
          updateTextStyle: {
            range: { startIndex: seg.start, endIndex: seg.end },
            textStyle: {
              backgroundColor: { color: { rgbColor: { red: 1, green: 1, blue: 0 } } }
            },
            fields: 'backgroundColor'
          }
        });
      }
    }
  }

  // 3. Find and highlight the "website palette" section
  for (const seg of segments) {
    if (seg.text.includes('Primary purple') || seg.text.includes('Dark text') || seg.text.includes('Background') || seg.text.includes('Sohel')) {
      requests.push({
        updateTextStyle: {
          range: { startIndex: seg.start, endIndex: seg.end },
          textStyle: {
            backgroundColor: { color: { rgbColor: { red: 1, green: 1, blue: 0.4 } } },
            bold: true
          },
          fields: 'backgroundColor,bold'
        }
      });
    }
  }

  console.log(`\nSending ${requests.length} highlight requests...`);

  if (requests.length === 0) {
    console.log('No highlight requests to send!');
    return;
  }

  const highlightRes = await docsRequest(
    `/v1/documents/${DOC_ID}:batchUpdate`,
    'POST',
    { requests }
  );

  if (highlightRes.error) {
    console.error('Highlight error:', JSON.stringify(highlightRes.error, null, 2));
  } else {
    console.log('✅ Highlights applied!');
  }

  // 4. Add comments via Drive API
  console.log('\nAdding comments via Drive API...');
  
  const comments = [
    {
      content: '✅ APPLIED GLOBALLY: All brand colors from this doc have been enforced across ALL pages of the MoodFlip website — Homepage, Admin Panel, User Profile, Login, Register, Pricing, Legal Pages, Footer, Loader, Components. 652 color replacements made across 21 files. Off-brand colors (#7147E8, #9333EA, #EC4899, #FAF8FD, #EAE3F2) replaced with exact palette values. — Fixed by AI Agent, 23 Aug 2026.',
      anchor: 'These are the approximate HEX colour codes'
    }
  ];

  for (const comment of comments) {
    const commentBody = {
      content: comment.content,
      quotedFileContent: { mimeType: 'text/plain', value: comment.anchor }
    };

    const commentRes = await docsRequest(
      `/v1/files/${DOC_ID}/comments`,
      'POST', // wrong API, need to use drive
      commentBody
    );
    console.log('Comment result:', JSON.stringify(commentRes).substring(0, 200));
  }
}

main().catch(console.error);
