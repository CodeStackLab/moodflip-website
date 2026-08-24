const { execSync } = require('child_process');
const https = require('https');

const token = execSync('powershell -Command "gcloud auth application-default print-access-token"').toString().trim();

function searchDrive() {
  const q = encodeURIComponent("name contains 'MoodFlip' or name contains 'Specification' or fullText contains 'HEX colour codes'");
  const req = https.request({
    hostname: 'www.googleapis.com',
    path: `/drive/v3/files?q=${q}&fields=files(id,name,mimeType,modifiedTime)`,
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token }
  }, res => {
    let raw = '';
    res.on('data', c => raw += c);
    res.on('end', () => {
      console.log('Files found:', JSON.parse(raw));
    });
  });
  req.end();
}

searchDrive();
