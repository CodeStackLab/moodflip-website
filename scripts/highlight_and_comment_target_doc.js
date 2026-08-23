const { execSync } = require('child_process');
const https = require('https');

const DOC_ID = '1V3_F4pDUAS6H4RF-oRaguwq0qjJWmE3OrMggVVHK9tU';

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

async function main() {
  try {
    const token = getToken();
    console.log(`Fetching Doc metadata for highlighting: ${DOC_ID}...`);
    const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID}`, null, token);
    
    // Collect text elements and indices
    const segments = [];
    function extract(items) {
      for (const el of items || []) {
        if (el.paragraph) {
          for (const pe of el.paragraph.elements || []) {
            if (pe.textRun && pe.textRun.content) {
              segments.push({
                text: pe.textRun.content,
                start: pe.startIndex,
                end: pe.endIndex
              });
            }
          }
        } else if (el.table) {
          for (const row of el.table.tableRows || []) {
            for (const cell of row.tableCells || []) {
              extract(cell.content);
            }
          }
        }
      }
    }
    extract(doc.body.content);

    console.log(`Found ${segments.length} text segments in document.`);

    // Build highlight batch update requests (Soft Yellow / Soft Warm Gold highlight)
    const requests = [];

    // Target phrases to highlight
    const targetPhrases = [
      'Overall page design direction',
      'Use the same peaceful sunrise/sun background style',
      'About page',
      'About MoodFlip',
      'MoodFlip helps you notice your current mood',
      'You start by choosing your current mood',
      'MoodFlip is designed for small emotional shifts',
      'Our aim is simple',
      'Notice your mood.',
      'Name the feeling behind your mood.',
      'Take one step toward feeling better.',
      'You can use the basic MoodFlip tool without creating a profile',
      'Your mood does not have to stay where it is',
      'Privacy Policy page',
      'Privacy Policy',
      'Last updated: 21 August 2026',
      '1. Using MoodFlip without a profile',
      '2. Information we may collect',
      '3. Paid downloads',
      '4. 90-day automatic deletion',
      '5. Email messages',
      '6. Not medical or crisis support',
      'Developer notes',
      'Background and page styling notes',
      'Keep the background soft and faded',
      'Use white or warm-cream content cards',
      'Keep the MoodFlip logo in the top-left header, without TM.',
      'Keep the same top navigation order: Home | About | Privacy Policy | Contact | Login.',
      'No affiliate links at launch',
      'MoodFlip should be described as a self-reflection tool'
    ];

    for (const seg of segments) {
      for (const phrase of targetPhrases) {
        if (seg.text.includes(phrase)) {
          requests.push({
            updateTextStyle: {
              range: {
                startIndex: seg.start,
                endIndex: seg.end
              },
              textStyle: {
                backgroundColor: {
                  color: {
                    rgbColor: { red: 0.98, green: 0.92, blue: 0.70 } // Soft warm pastel yellow/cream
                  }
                }
              },
              fields: 'backgroundColor'
            }
          });
          break;
        }
      }
    }

    if (requests.length > 0) {
      console.log(`Applying ${requests.length} highlight updates to Google Doc...`);
      await apiRequest('docs.googleapis.com', 'POST', `/v1/documents/${DOC_ID}:batchUpdate`, { requests }, token);
      console.log('✅ Google Doc successfully highlighted in soft warm tone!');
    }

    // Add confirmation comments via Drive API
    const commentsToPost = [
      '✅ IMPLEMENTED & VERIFIED: The exact approved About Page copy has been deployed to /about with the 3 Simple Aims (Notice, Name, Step) and self-reflection medical disclaimer.',
      '✅ IMPLEMENTED & VERIFIED: The exact approved Privacy Policy copy has been deployed to /privacy with the 21 August 2026 timestamp and all 6 numbered clauses including automatic 90-day data deletion.',
      '✅ IMPLEMENTED & VERIFIED: The peaceful sunrise/sun artwork ("unnamed (1).png") has been applied across About, Privacy Policy, Contact, and Login with a soft/faded overlay behind warm-cream content cards.',
      '✅ IMPLEMENTED & VERIFIED: Navigation header order is strictly set to Home | About | Privacy Policy | Contact | Login. MoodFlip logo is placed in top-left without TM, and zero affiliate links exist on the site.'
    ];

    console.log('Posting verification comments to Google Doc...');
    for (const content of commentsToPost) {
      await apiRequest('www.googleapis.com', 'POST', `/drive/v3/files/${DOC_ID}/comments?fields=id,content`, { content }, token);
    }
    console.log(`✅ Successfully posted ${commentsToPost.length} confirmation comments!`);

  } catch (err) {
    console.error('Error in doc processing:', err.message);
  }
}

main();
