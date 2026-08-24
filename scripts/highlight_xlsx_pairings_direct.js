/**
 * highlight_xlsx_pairings_direct.js
 * Downloads the .xlsx file `1va8TOaTU_eVkERBloJ3lGzliUPIZVusQ`, styles all 28 pairings
 * in the Pairings worksheet with pure Yellow fill, and updates it on Google Drive.
 */

const { execSync } = require('child_process');
const https = require('https');
const ExcelJS = require('exceljs');

const FILE_ID = '1va8TOaTU_eVkERBloJ3lGzliUPIZVusQ';

function getToken() {
  return execSync('powershell -Command "gcloud auth application-default print-access-token"').toString().trim();
}

function downloadFile(fileId, token) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'www.googleapis.com',
      path: `/drive/v3/files/${fileId}?alt=media`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(Buffer.concat(chunks));
        } else {
          reject(new Error(`Download failed with HTTP ${res.statusCode}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function uploadFile(fileId, buffer, token) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'www.googleapis.com',
      path: `/upload/drive/v3/files/${fileId}?uploadType=media`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Length': buffer.length
      }
    }, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(raw));
        } else {
          reject(new Error(`Upload failed with HTTP ${res.statusCode}: ${raw}`));
        }
      });
    });
    req.on('error', reject);
    req.write(buffer);
    req.end();
  });
}

async function main() {
  const token = getToken();
  console.log('✅ Token obtained');

  console.log(`📥 Downloading ${FILE_ID} from Google Drive...`);
  const fileBuffer = await downloadFile(FILE_ID, token);
  console.log(`✅ Downloaded (${fileBuffer.length} bytes)`);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(fileBuffer);
  console.log('✅ Workbook loaded. Worksheets:', workbook.worksheets.map(w => w.name));

  const worksheet = workbook.getWorksheet('Pairings') || workbook.worksheets[0];
  console.log(`📍 Processing worksheet "${worksheet.name}"...`);

  const yellowFill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFFF00' } // Pure bright yellow
  };

  // Highlight all rows 2 to 29, cols 1 to 5 (Serial, Bad Mood, Good Mood Target, Default 60-Second Action, Column1)
  for (let r = 2; r <= 29; r++) {
    const row = worksheet.getRow(r);
    for (let c = 1; c <= 5; c++) {
      const cell = row.getCell(c);
      cell.fill = yellowFill;
    }
    row.commit();
  }

  console.log('🎨 Applied yellow highlight to rows 2 to 29.');

  const updatedBuffer = await workbook.xlsx.writeBuffer();
  console.log(`📤 Uploading updated .xlsx back to Google Drive (${updatedBuffer.length} bytes)...`);

  const uploadRes = await uploadFile(FILE_ID, updatedBuffer, token);
  console.log('✅ Google Drive file updated successfully! File ID:', uploadRes.id);

  console.log('\n=============================================');
  console.log('🎉 Target .XLSX Spreadsheet fully highlighted in Yellow on Google Drive!');
  console.log('=============================================\n');
}

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
