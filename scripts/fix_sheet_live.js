/**
 * fix_sheet_live.js
 * PURPOSE: Live Google Sheets editor for MoodFlip Pairings sheet.
 * - Reads reviewer suggestions from Column E (Column1)
 * - Applies approved fixes to Column D (Default 60-Second Action)
 * - Adds cell NOTES on each changed row (yellow triangle visible to buyer)
 * - Marks Column E reviewer comment as "APPLIED" after each fix
 * RUN: node scripts/fix_sheet_live.js
 */

const { execSync } = require('child_process');
const https = require('https');

const SPREADSHEET_ID = '1BKkG6VF8VbhOe7P1aR75yBCm_iTaZDEXpn7JvMRdTeM';
const SHEET_NAME     = 'Pairings';
const SHEET_GID      = 59679314;

// Get live ADC token from gcloud
function getToken() {
  return execSync(
    'powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"'
  ).toString().trim();
}

// Generic HTTPS request helper
function apiRequest(method, hostname, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname,
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
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(raw ? JSON.parse(raw) : {});
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${raw}`));
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// All fixes based on Annette reviewer comments in Column E
const FIXES = [
  {
    row: 2,
    fix: 'Put both feet on the floor. Look around and name 5 things you can see. Say: "Right now, I am safe."',
    fixBadMood: null,
    note: 'CHANGED: Removed word "enough" from affirmation. "Right now, I am safe." is more grounding and absolute. Reviewer: removed "enough"',
    reviewerApplied: 'APPLIED - Removed "enough" per reviewer suggestion'
  },
  {
    row: 5,
    fix: 'Place your feet firmly into the ground. Ask: "What is one tiny thing I can control in the next 10 minutes?"',
    fixBadMood: null,
    note: 'CHANGED: "Press your feet into the floor" updated to "Place your feet firmly into the ground" - more natural grounded language per reviewer.',
    reviewerApplied: 'APPLIED - Updated to "Place your feet firmly into the ground" per reviewer'
  },
  {
    row: 7,
    fix: 'Relax your jaw and shoulders. Take a slow breath. Say: "It is safe for me to be here." Notice one calm thing around you.',
    fixBadMood: null,
    note: 'CHANGED: Removed "danger" and "threatened" language which can be triggering for trauma/DV survivors. Replaced with "It is safe for me to be here" per reviewer advice.',
    reviewerApplied: 'APPLIED - Removed triggering "danger" language, replaced with "It is safe for me to be here" per reviewer'
  },
  {
    row: 9,
    fix: 'Sit upright. Say: "Right here, right now, I completely love and accept myself."',
    fixBadMood: null,
    note: 'CHANGED: Affirmation updated to "Right here, right now, I completely love and accept myself." - stronger self-compassion statement per reviewer.',
    reviewerApplied: 'APPLIED - Stronger affirmation per reviewer suggestion'
  },
  {
    row: 11,
    fix: 'Do 10 slow wall pushes. Channel the heat into strength, not explosion.',
    fixBadMood: 'Angry',
    note: 'CHANGED: Bad Mood label changed from "Mad" to "Angry" - more commonly searched and natural term per reviewer.',
    reviewerApplied: 'APPLIED - Bad Mood changed from "Mad" to "Angry" per reviewer'
  },
  {
    row: 12,
    fix: 'Step back and take a deep breath. Unclench your hands. Say: "I am strong just the way I am."',
    fixBadMood: null,
    note: 'CHANGED: Action updated to include "take a deep breath" and affirmation changed to "I am strong just the way I am" per reviewer.',
    reviewerApplied: 'APPLIED - Updated to deep breath + new affirmation per reviewer'
  },
  {
    row: 15,
    fix: 'Replace "What is wrong with this?" with "What am I not seeing right now?"',
    fixBadMood: null,
    note: 'CHANGED: Reframe question updated to "What am I not seeing right now?" - more curious and open-ended per reviewer.',
    reviewerApplied: 'APPLIED - Question updated to "What am I not seeing?" per reviewer'
  },
  {
    row: 18,
    fix: 'Say: "This is temporary. It will pass." Look for one thing still okay right now.',
    fixBadMood: null,
    note: 'CHANGED: Affirmation starts with "This is temporary. It will pass." - hopeful time-bound framing per reviewer.',
    reviewerApplied: 'APPLIED - Started with "This is temporary" per reviewer'
  },
  {
    row: 21,
    fix: 'Open curtains, drink water, or step outside for 60 seconds. Or put on a song you love. Tiny movement first.',
    fixBadMood: null,
    note: 'CHANGED: Added "put on a song you love" option - music is a proven mood lifter, adds variety per reviewer suggestion.',
    reviewerApplied: 'APPLIED - Added music suggestion per reviewer'
  },
  {
    row: 27,
    fix: 'Write 3 things that are stressful right now. Choose one thing you can actually do today. Focus only on that.',
    fixBadMood: null,
    note: 'CHANGED: Reworded for clarity - "Write 3 things that are stressful right now. Choose one thing you can actually do today." per reviewer.',
    reviewerApplied: 'APPLIED - Reworded for clarity per reviewer'
  }
];

async function main() {
  console.log('Getting auth token...');
  const token = getToken();
  console.log('Token OK');

  // Read current sheet data
  console.log('\nReading live sheet data...');
  const readResult = await apiRequest(
    'GET', 'sheets.googleapis.com',
    `/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A1:E50`,
    null, token
  );
  const rows = readResult.values || [];
  console.log(`Read ${rows.length} rows OK`);

  // Build all value updates
  const valueData = [];
  const noteRequests = [];

  for (const fix of FIXES) {
    const rowIndex = fix.row - 1;
    const dataRow  = rows[rowIndex] || [];
    console.log(`\nRow ${fix.row} | ${dataRow[1]} -> Fixing...`);

    // Update Column D (action text)
    valueData.push({ range: `${SHEET_NAME}!D${fix.row}`, values: [[fix.fix]] });

    // Update Bad Mood column B if needed
    if (fix.fixBadMood) {
      valueData.push({ range: `${SHEET_NAME}!B${fix.row}`, values: [[fix.fixBadMood]] });
      console.log(`  Also fixing Bad Mood -> ${fix.fixBadMood}`);
    }

    // Mark Column E as applied
    valueData.push({ range: `${SHEET_NAME}!E${fix.row}`, values: [[fix.reviewerApplied]] });

    // Add note to Column D cell
    noteRequests.push({
      updateCells: {
        range: {
          sheetId: SHEET_GID,
          startRowIndex:    rowIndex,
          endRowIndex:      rowIndex + 1,
          startColumnIndex: 3,
          endColumnIndex:   4
        },
        rows: [{ values: [{ note: fix.note }] }],
        fields: 'note'
      }
    });

    console.log(`  Queued: value update + note`);
  }

  // Apply all value changes
  console.log('\nApplying all cell value changes...');
  await apiRequest(
    'POST', 'sheets.googleapis.com',
    `/v4/spreadsheets/${SPREADSHEET_ID}/values:batchUpdate`,
    { valueInputOption: 'USER_ENTERED', data: valueData },
    token
  );
  console.log('Cell values updated OK');

  // Apply all notes
  console.log('\nAdding buyer-facing notes to changed cells...');
  await apiRequest(
    'POST', 'sheets.googleapis.com',
    `/v4/spreadsheets/${SPREADSHEET_ID}:batchUpdate`,
    { requests: noteRequests },
    token
  );
  console.log('Notes added OK');

  console.log('\n=== DONE ===');
  console.log(`Total fixes applied: ${FIXES.length}`);
  console.log(`View sheet: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit?gid=${SHEET_GID}`);
}

main().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
