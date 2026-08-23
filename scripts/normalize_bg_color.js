/**
 * Normalize ALL background color variants to single canonical hex #FEF9F5
 * 
 * User confirmed these are the SAME color in 3 formats:
 *   #FEF9F5         ← canonical hex (use this everywhere)
 *   rgba(254, 249, 245)
 *   hsl(27, 82%, 98%)
 * 
 * Also replaces the previous slightly-different brand bg #FEF9F5 → #FEF9F5
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKIP = ['node_modules', '.next', '.git', 'scripts', 'Work Guide Skill'];
const EXTS = ['.tsx', '.ts', '.css', '.module.css'];

const REPLACEMENTS = [
  // Previous brand bg (1 shade off) → canonical
  { from: /#FEF9F5/gi,  to: '#FEF9F5',  note: 'old brand bg → canonical' },
  { from: /#FEF9F5/gi,  to: '#FEF9F5',  note: 'old brand bg lowercase → canonical' },
  
  // rgba variant → canonical hex
  { from: /rgba\(254,\s*249,\s*245(?:,\s*1(?:\.0)?)?\)/gi, to: '#FEF9F5', note: 'rgba(254,249,245) → canonical' },
  { from: /rgba\(253,\s*248,\s*245(?:,\s*1(?:\.0)?)?\)/gi, to: '#FEF9F5', note: 'rgba(253,248,245) → canonical' },
  
  // hsl variant → canonical hex
  { from: /hsl\(27,\s*82%,\s*98%\)/gi, to: '#FEF9F5', note: 'hsl(27,82%,98%) → canonical' },
  { from: /hsl\(30,\s*100%,\s*98%\)/gi, to: '#FEF9F5', note: 'hsl(30,100%,98%) → canonical' },
];

let totalFiles = 0;
let totalChanges = 0;
const changedFiles = [];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let fileChanges = 0;

  for (const { from, to } of REPLACEMENTS) {
    const matches = content.match(from);
    if (matches) {
      fileChanges += matches.length;
      content = content.replace(from, to);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalChanges += fileChanges;
    const rel = path.relative(ROOT, filePath);
    changedFiles.push({ file: rel, changes: fileChanges });
    console.log(`  ✅ [${fileChanges} fixes] ${rel}`);
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (SKIP.includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (EXTS.some(ext => entry.name.endsWith(ext))) {
      totalFiles++;
      processFile(fullPath);
    }
  }
}

console.log('🎨 MoodFlip Background Color Normalizer');
console.log('========================================');
console.log('Replacing ALL variants with canonical #FEF9F5');
console.log('  #FEF9F5         → #FEF9F5');
console.log('  rgba(254,249,245) → #FEF9F5');
console.log('  rgba(253,248,245) → #FEF9F5');
console.log('  hsl(27,82%,98%)   → #FEF9F5');
console.log('');

walkDir(ROOT);

console.log('\n========================================');
console.log(`📊 Summary:`);
console.log(`   Files scanned: ${totalFiles}`);
console.log(`   Files changed: ${changedFiles.length}`);
console.log(`   Total replacements: ${totalChanges}`);
if (changedFiles.length) {
  console.log('\n📁 Changed files:');
  changedFiles.forEach(f => console.log(`   - ${f.file} (${f.changes})`));
}
console.log('\n✅ All background color variants unified to #FEF9F5');
