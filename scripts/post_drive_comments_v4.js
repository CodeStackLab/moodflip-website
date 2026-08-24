const { execSync } = require('child_process');
const https = require('https');

const DOC_ID = '1w6Dntstes03JQAlLR7C8r7q7zCBH-SEyOUhVZgo-VzY';

function getToken() {
  const token = execSync(
    'powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"'
  ).toString().trim();
  return token;
}

function apiRequest(hostname, method, apiPath, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname,
      path: apiPath,
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    };
    const req = https.request(options, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            return resolve(raw ? JSON.parse(raw) : {});
          } catch (e) {
            return resolve({ raw });
          }
        }
        reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0, 500)}`));
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
    console.log(`Posting Drive comments to Doc ${DOC_ID}...`);

    const commentsToPost = [
      {
        content: `✅ [RESOLVED & IMPLEMENTED] Section 9 & 16 (Popup Messages & 3 Check-ins/Day Limit):\n• Enforced max 3 saved check-ins per calendar day with daily save limit message.\n• Message 1 after first check-in, Message 3 progress indicator [X/3] Day [X] of 7, and Message 5 for $7 7-Day report download are all implemented verbatim.\n• Profile invitation on 2nd visit and Consent Checkbox wording (Message 9) are fully in place.`
      },
      {
        content: `✅ [RESOLVED & IMPLEMENTED] Section 9 (Payment Fallback & $7 PDF):\n• Purchases are permanently recorded even if PDF generation/email delivery fails, enabling instant download from the profile dashboard and admin re-send.\n• Full 30-Day Plan database readiness (Phase 2) confirmed.`
      },
      {
        content: `✅ [RESOLVED & CONFIRMED] Section 11 & 17 (Privacy, Deletion & Code Ownership):\n• 90-day automatic deletion policy implemented.\n• Full private GitHub repository and deployment ownership transfer confirmed for handover.`
      }
    ];

    for (const c of commentsToPost) {
      try {
        const res = await apiRequest(
          'www.googleapis.com',
          'POST',
          `/drive/v3/files/${DOC_ID}/comments?fields=id,content`,
          c,
          token
        );
        console.log(`Posted comment: ID ${res.id}`);
      } catch (err) {
        console.log(`Comment post note: ${err.message}`);
      }
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

main();
