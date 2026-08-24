const { execSync } = require('child_process');
const https = require('https');

const token = execSync('powershell -Command "gcloud auth application-default print-access-token"').toString().trim();
const SHEET_ID = '1BKkG6VF8VbhOe7P1aR75yBCm_iTaZDEXpn7JvMRdTeM';

const req = https.request({
  hostname: 'sheets.googleapis.com',
  path: `/v4/spreadsheets/${SHEET_ID}?includeGridData=false`,
  method: 'GET',
  headers: { 'Authorization': 'Bearer ' + token }
}, res => {
  let raw = '';
  res.on('data', c => raw += c);
  res.on('end', () => {
    const data = JSON.parse(raw);
    console.log('Spreadsheet Title:', data.properties && data.properties.title);
    if (data.sheets) {
      data.sheets.forEach(s => {
        console.log(`Sheet: ${s.properties.title} (ID: ${s.properties.sheetId}, Rows: ${s.properties.gridProperties.rowCount}, Cols: ${s.properties.gridProperties.columnCount})`);
      });
    }
  });
});
req.end();
