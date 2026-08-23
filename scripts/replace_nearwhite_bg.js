/**
 * Replace ALL near-white card/panel backgrounds with brand #FEF9F5
 * 
 * User wants ONE consistent warm ivory everywhere - no near-whites.
 * 
 * Replaces:
 *   #FEF9F5  → #FEF9F5   (card bg - was "almost white")
 *   #FEFCFA  → #FEF9F5
 *   #FEFBFA  → #FEF9F5  
 *   #F9F9F9  → #FEF9F5   (generic near-white)
 *   #F8F8F8  → #FEF9F5
 *   bg-gray-50 → bg-[#FEF9F5]
 *   bg-slate-50 → bg-[#FEF9F5]
 *   bg-zinc-50  → bg-[#FEF9F5]
 *   bg-neutral-50 → bg-[#FEF9F5]
 *   bg-stone-50   → bg-[#FEF9F5]
 *   bg-gray-100 → bg-[#FEF9F5]  (light grey bg that looks white)
 *   background: #f9f9f9 → background: #FEF9F5
 *   background: #f8f8f8 → background: #FEF9F5
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKIP = ['node_modules', '.next', '.git', 'scripts', 'Work Guide Skill', 'public'];
const EXTS = ['.tsx', '.ts', '.css', '.module.css'];

const REPLACEMENTS = [
  // Near-white card/panel backgrounds → unified brand bg
  { from: /#FEF9F5/g, to: '#FEF9F5', note: 'card bg almost white' },
  { from: /#FEF9F5/g, to: '#FEF9F5' },
  { from: /#FEFCFA/g, to: '#FEF9F5' },
  { from: /#FEFBFA/g, to: '#FEF9F5' },
  { from: /#F9F9F9/g, to: '#FEF9F5' },
  { from: /#f9f9f9/g, to: '#FEF9F5' },
  { from: /#F8F8F8/g, to: '#FEF9F5' },
  { from: /#f8f8f8/g, to: '#FEF9F5' },
  { from: /#FAFAFA/g, to: '#FEF9F5' },
  { from: /#fafafa/g, to: '#FEF9F5' },

  // Tailwind near-white bg classes
  { from: /\bbg-gray-50\b/g,    to: 'bg-[#FEF9F5]' },
  { from: /\bbg-slate-50\b/g,   to: 'bg-[#FEF9F5]' },
  { from: /\bbg-zinc-50\b/g,    to: 'bg-[#FEF9F5]' },
  { from: /\bbg-neutral-50\b/g, to: 'bg-[#FEF9F5]' },
  { from: /\bbg-stone-50\b/g,   to: 'bg-[#FEF9F5]' },
  { from: /\bbg-gray-100\b/g,   to: 'bg-[#FEF9F5]' },
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
    if (matches) { fileChanges += matches.length; content = content.replace(from, to); }
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalChanges += fileChanges;
    const rel = path.relative(ROOT, filePath);
    changedFiles.push({ file: rel, changes: fileChanges });
    console.log(`  ✅ [${fileChanges}] ${rel}`);
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (SKIP.includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(fullPath);
    else if (EXTS.some(ext => entry.name.endsWith(ext))) { totalFiles++; processFile(fullPath); }
  }
}

console.log('🎨 Replacing all near-white backgrounds → #FEF9F5');
console.log('===================================================\n');
walkDir(ROOT);
console.log(`\n===================================================`);
console.log(`✅ Files changed: ${changedFiles.length} / ${totalFiles} scanned`);
console.log(`✅ Total fixes:   ${totalChanges}`);
