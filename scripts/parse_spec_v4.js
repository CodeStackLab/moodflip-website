const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.join(__dirname, 'new_defect_doc_text.txt'), 'utf8');
const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'new_defect_doc_raw.json'), 'utf8'));

console.log('=== DOCUMENT STRUCTURE ANALYSIS ===');
console.log('Total characters:', text.length);

// 1. Find all sections / headers
const lines = text.split('\n');
console.log('\n--- Section Headings Found ---');
lines.forEach((line, idx) => {
  const trimmed = line.trim();
  if (/^(\d+\.|\bSection\b|[A-Z][A-Za-z\s]{3,30}:)/.test(trimmed) && trimmed.length < 80) {
    console.log(`[Line ${idx + 1}] ${trimmed}`);
  }
});

// 2. Search for JK>> and Joy's comments and Sohel's comments
console.log('\n--- JK>> and Comments in text ---');
const jkMatches = [];
lines.forEach((line, idx) => {
  if (line.includes('JK>>') || line.toLowerCase().includes('joykonta') || line.toLowerCase().includes("sohel's comment") || line.includes('Comment:') || line.toLowerCase().includes('defect') || line.includes('Add row:')) {
    jkMatches.push({ line: idx + 1, content: line.trim() });
  }
});

console.log(`Found ${jkMatches.length} comment/directive lines:`);
jkMatches.forEach(m => console.log(`[L${m.line}] ${m.content}`));

// 3. Inspect raw elements for footnotes, suggested changes, or extra properties
console.log('\n--- Document Metadata ---');
console.log('Document ID:', raw.documentId);
console.log('Title:', raw.title);
console.log('Footnotes count:', Object.keys(raw.footnotes || {}).length);
console.log('Suggested changes count:', Object.keys(raw.suggestedChanges || {}).length);
console.log('Named ranges count:', Object.keys(raw.namedRanges || {}).length);

