const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.join(__dirname, 'user_doc_text.txt'), 'utf8');
const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'user_doc_raw.json'), 'utf8'));

console.log('=== USER DOCUMENT ANALYSIS ===');
console.log('Document ID:', raw.documentId);
console.log('Title:', raw.title);
console.log('Revision ID:', raw.revisionId);
console.log('Total characters:', text.length);

const lines = text.split('\n');
console.log('\n--- Key Directives & Comments in Document ---');
const matches = [];
lines.forEach((line, idx) => {
  const trimmed = line.trim();
  if (
    trimmed.includes('JK>>') ||
    trimmed.toLowerCase().includes("sohel's comment") ||
    trimmed.toLowerCase().includes('joy') ||
    trimmed.toLowerCase().includes('digitalworkify') ||
    trimmed.toLowerCase().includes('status') ||
    trimmed.toLowerCase().includes('defect') ||
    trimmed.includes('TODO') ||
    trimmed.includes('NOTE')
  ) {
    matches.push({ line: idx + 1, text: trimmed });
  }
});

console.log(`Found ${matches.length} notable items:`);
matches.forEach(m => console.log(`[L${m.line}] ${m.text}`));
