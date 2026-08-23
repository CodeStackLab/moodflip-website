const https = require('https');
const { execSync } = require('child_process');

const DOC_ID = '1h4tDTyBzINGffc-xWb45bgA3I926bP-vzbFm3TytPBo';

const token = execSync('gcloud auth application-default print-access-token', { encoding: 'utf8' }).trim();

// Read the full document with structure
const options = {
  hostname: 'docs.googleapis.com',
  path: '/v1/documents/' + DOC_ID,
  method: 'GET',
  headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' }
};

const req = https.request(options, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const doc = JSON.parse(d);
    require('fs').writeFileSync('scripts/doc_raw.json', JSON.stringify(doc, null, 2));
    console.log('Doc title:', doc.title);
    console.log('Saved to scripts/doc_raw.json');
    
    // Show structure of first few elements
    const content = doc.body.content;
    console.log('Total elements:', content.length);
    console.log('Doc revision:', doc.revisionId);
  });
});
req.on('error', e => console.error(e.message));
req.end();
