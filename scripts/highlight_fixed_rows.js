/**
 * highlight_fixed_rows.js
 * Highlights fixed/resolved cells in the MoodFlip Google Sheet:
 *  - Column D (Action) of fixed rows → Light GREEN background (issue resolved)
 *  - Column E (Reviewer notes) of fixed rows → Light YELLOW background (note acknowledged)
 * Then verifies by re-reading the sheet and printing the current values.
 */

const { execSync } = require('child_process');
const https = require('https');

const SPREADSHEET_ID = '1BKkG6VF8VbhOe7P1aR75yBCm_iTaZDEXpn7JvMRdTeM';
const PAIRINGS_SHEET_GID = 59679314; // gid for "Pairings" sheet tab

function getToken() {
  return execSync(
    'powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"'
  ).toString().trim();
}

function apiRequest(hostname, method, path, body, token) {
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

// FIXED rows (1-indexed in sheet). These had reviewer issues that are now resolved.
// Row 1 = header row, so data rows start from 2
const FIXED_ROWS = [
  { row: 2,  serial: 1,  mood: 'Scared',     fix: 'Removed "enough" → "Right now, I am safe."' },
  { row: 5,  serial: 4,  mood: 'Weak',        fix: 'Updated to "Place your feet firmly into the ground"' },
  { row: 7,  serial: 6,  mood: 'Threatened',  fix: 'Removed triggering "danger" word → gentle affirmation' },
  { row: 9,  serial: 8,  mood: 'Humiliated',  fix: 'Stronger affirmation "I completely love and accept myself"' },
  { row: 11, serial: 10, mood: 'Mad→Angry',   fix: 'Label changed to "Angry" + action updated' },
  { row: 12, serial: 11, mood: 'Aggressive',  fix: 'Deep breath cue added + new affirmation' },
  { row: 15, serial: 14, mood: 'Critical',    fix: 'Updated action language' },
  { row: 18, serial: 17, mood: 'Awful',       fix: 'Updated action language' },
  { row: 21, serial: 20, mood: 'Depressed',   fix: 'Music + micro-movement actions validated' },
  { row: 27, serial: 26, mood: 'Stressed',    fix: '3-stressors offloading exercise streamlined' },
];

// Color helpers
const GREEN_LIGHT = { red: 0.714, green: 0.843, blue: 0.659 };   // #B7D7A8 – soft sage green = "Fixed/Done"
const YELLOW_LIGHT = { red: 1.0,   green: 0.949, blue: 0.8 };    // #FFF2CC – reviewer note yellow

function cellColorRequest(sheetId, rowIndex, colIndex, color) {
  // rowIndex & colIndex are 0-based
  return {
    repeatCell: {
      range: {
        sheetId,
        startRowIndex: rowIndex,
        endRowIndex: rowIndex + 1,
        startColumnIndex: colIndex,
        endColumnIndex: colIndex + 1
      },
      cell: {
        userEnteredFormat: {
          backgroundColor: color
        }
      },
      fields: 'userEnteredFormat.backgroundColor'
    }
  };
}

async function main() {
  console.log('Obtaining auth token...');
  const token = getToken();
  console.log('Token OK\n');

  // Build batchUpdate requests
  const requests = [];

  for (const { row } of FIXED_ROWS) {
    const rowIndex = row - 1; // 0-based
    // Column D = index 3 → GREEN (action text cell, the one we fixed)
    requests.push(cellColorRequest(PAIRINGS_SHEET_GID, rowIndex, 3, GREEN_LIGHT));
    // Column E = index 4 → YELLOW (reviewer note column, acknowledged)
    requests.push(cellColorRequest(PAIRINGS_SHEET_GID, rowIndex, 4, YELLOW_LIGHT));
  }

  console.log(`Applying highlights to ${FIXED_ROWS.length} fixed rows (${requests.length} cell color updates)...`);

  const result = await apiRequest(
    'sheets.googleapis.com',
    'POST',
    `/v4/spreadsheets/${SPREADSHEET_ID}:batchUpdate`,
    { requests },
    token
  );

  console.log('✓ Highlights applied! Replies count:', result.replies ? result.replies.length : 0);
  console.log('\nFixed rows highlighted:');
  FIXED_ROWS.forEach(({ row, serial, mood, fix }) => {
    console.log(`  Row ${row} (Serial ${serial} - ${mood}): 🟢 Column D Green + 🟡 Column E Yellow`);
    console.log(`    Fix: ${fix}`);
  });

  // ── VERIFICATION: Re-read sheet and confirm values ──
  console.log('\n\n=== VERIFICATION: Re-reading sheet to confirm fixes ===');
  const sheetData = await apiRequest(
    'sheets.googleapis.com',
    'GET',
    `/v4/spreadsheets/${SPREADSHEET_ID}/values/Pairings!A1:E30`,
    null,
    token
  );

  const rows = sheetData.values || [];
  const header = rows[0];
  console.log('Header:', header.join(' | '));
  console.log('---');

  let allVerified = true;
  for (const { row, serial, mood } of FIXED_ROWS) {
    const dataRow = rows[row - 1]; // 0-based
    if (!dataRow) {
      console.log(`  ❌ Row ${row} (${mood}): NOT FOUND`);
      allVerified = false;
      continue;
    }
    const [serial_val, badMood, goodMood, action, reviewerNote] = dataRow;
    const isApplied = reviewerNote && reviewerNote.toUpperCase().startsWith('APPLIED');
    const status = isApplied ? '✅ VERIFIED' : '⚠️  CHECK';
    if (!isApplied) allVerified = false;
    console.log(`  ${status} | Row ${row} Serial ${serial_val || serial} - ${badMood || mood}`);
    console.log(`    Target: ${goodMood}`);
    console.log(`    Action: ${(action || '').substring(0, 80)}...`);
    console.log(`    Column E: ${(reviewerNote || '').substring(0, 60)}`);
    console.log('');
  }

  console.log('=== RESULT ===');
  console.log(allVerified
    ? '✅ ALL 10 FIXES VERIFIED — Sheet is fully updated and highlighted!'
    : '⚠️  Some rows may need manual review.'
  );
  console.log('\nView live sheet:');
  console.log('https://docs.google.com/spreadsheets/d/1BKkG6VF8VbhOe7P1aR75yBCm_iTaZDEXpn7JvMRdTeM/edit?gid=59679314');
}

main().catch(e => console.error('Error:', e.message));
