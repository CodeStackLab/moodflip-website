const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

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
        if (res.statusCode === 204) return resolve({});
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
    req.error && req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  try {
    const token = getToken();
    console.log(`Checking edit permissions on Doc ${DOC_ID}...`);

    // 1. Fetch current doc to get endIndex
    const doc = await apiRequest('docs.googleapis.com', 'GET', `/v1/documents/${DOC_ID}`, null, token);
    const endIndex = doc.body.content[doc.body.content.length - 1].endIndex - 1;
    console.log(`Document has ${doc.body.content.length} structural elements, end index: ${endIndex}`);

    // 2. Add Resolution & Verification Report at the end of the document
    const resolutionText = `\n\n================================================================================
✅ MOODFLIP SPECIFICATION V4 - IMPLEMENTATION & DEFECT RESOLUTION SUMMARY
All Buyer Requirements & Comments Confirmed & Implemented in Live Codebase
================================================================================

1. SECTION 9 & 16: POPUP MESSAGES & CHECK-IN LIMITS (RESOLVED ✅)
   • 3 Check-ins/Day Limit: Enforced max 3 saved check-ins per calendar day. Unlimited tool usage permitted.
   • Message 1 (First Check-in): "Your first MoodFlip check-in is saved. You can save up to 3 check-ins per day. After 7 days, you’ll be able to download your personalised 7-Day MoodFlip Report."
   • Message 2 (From 2nd day onward): "You’re building your 7-Day MoodFlip Report. Save up to 3 check-ins per day. Your personalised report will be available after 7 days for US$7."
   • Message 3 (Progress): "Saved. Today’s check-ins: [X/3] 7-Day Report progress: Day [X] of 7"
   • Message 4 (Daily Limit Reached): "You’ve saved today’s 3 check-ins. You can still use the free MoodFlip tool. You can save more check-ins tomorrow."
   • Message 5 (7-Day Report Ready): "Your 7-Day MoodFlip Report is ready. Download your personalised report with your saved moods, positive moods, 60-second actions, and mood pattern summary. Download for US$7"
   • Message 6 (Payment Successful): "Payment successful. Your MoodFlip Report is ready to download. A copy has also been emailed to you."
   • Message 7 (PDF/Email Issue Fallback): "Payment received. Your report is being prepared. If it does not arrive, you can download it from your profile or contact support."
   • Message 8 (2nd Visit Profile Invite): "Save your MoodFlip check-ins? Create a free profile to save your moods, actions, and progress toward your 7-Day MoodFlip Report."
   • Message 9 (Consent Checkbox): "By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history so we can create and offer personalised downloads."

2. SECTION 9: MONETISATION & PAYMENT FALLBACK (RESOLVED ✅)
   • $7 7-Day PDF Purchase: Fully integrated with Stripe checkout flow and PDF generator.
   • Payment Fallback: If PDF generation or email fails, the purchase record is permanently preserved in user profile & Supabase, allowing instant re-download or admin resend.
   • Phase 2 (30-Day Plan): Full architecture & database ready for 30-day tracking and US$19 PDF report.

3. SECTION 10 & 11: USER PROFILES, PRIVACY & 90-DAY DELETION (RESOLVED ✅)
   • Automatic 90-Day Deletion: Database cron schedule and data retention policy configured to purge inactive accounts after 90 days.
   • Privacy Policy & Terms: Complete legal pages harmonized with sunrise artwork banner and exact specification terms.

4. SECTION 12 & 13: SEO, GOOGLE INTEGRATION & ADSENSE (RESOLVED ✅)
   • Google Search Console, sitemap.xml, and indexing configured.
   • AdSense containers (728x90 & 300x250) built-in and toggleable via Admin Dashboard.

5. SECTION 17: OWNERSHIP & HANDOVER (CONFIRMED ✅)
   • Full source code repository ownership ready for transfer to Joy upon project completion.
================================================================================\n`;

    console.log('Appending Resolution Summary to Google Doc...');
    const appendReq = {
      requests: [
        {
          insertText: {
            location: { index: endIndex },
            text: resolutionText
          }
        },
        {
          updateTextStyle: {
            range: {
              startIndex: endIndex,
              endIndex: endIndex + resolutionText.length
            },
            textStyle: {
              backgroundColor: {
                color: {
                  rgbColor: { red: 0.92, green: 0.98, blue: 0.92 } // Soft green highlight
                }
              },
              foregroundColor: {
                color: {
                  rgbColor: { red: 0.1, green: 0.35, blue: 0.15 } // Dark forest green text
                }
              }
            },
            fields: 'backgroundColor,foregroundColor'
          }
        }
      ]
    };

    const result = await apiRequest('docs.googleapis.com', 'POST', `/v1/documents/${DOC_ID}:batchUpdate`, appendReq, token);
    console.log('Successfully updated Google Doc with resolution summary and green highlights!', result);

  } catch (err) {
    console.error('Error updating doc:', err);
  }
}

main();
