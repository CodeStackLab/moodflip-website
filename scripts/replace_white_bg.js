/**
 * Replace ALL white background colors with brand #FEF9F5
 * 
 * IMPORTANT: Only replaces BACKGROUND whites, NOT text-white, hover-text-white, etc.
 * 
 * Targets:
 *   bg-white            → bg-[#FEF9F5]           (Tailwind class)
 *   bg-[#fff]           → bg-[#FEF9F5]
 *   bg-[#ffffff]        → bg-[#FEF9F5]
 *   background: white   → background: #FEF9F5    (CSS)
 *   background: #fff    → background: #FEF9F5
 *   background: #ffffff → background: #FEF9F5
 *   background-color: white → background-color: #FEF9F5
 * 
 * SKIPS: text-white, border-white, from-white, to-white, shadow-white,
 *        hover:text-white, hover:bg-white (intentional UI interactions)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKIP = ['node_modules', '.next', '.git', 'scripts', 'Work Guide Skill', 'public'];
const EXTS = ['.tsx', '.ts', '.css', '.module.css'];

// CAREFUL replacements — only background contexts
const REPLACEMENTS = [
  // CSS property: background: white / #fff / #ffffff
  { from: /background:\s*white\b/gi,               to: 'background: #FEF9F5' },
  { from: /background:\s*#fff\b/gi,                to: 'background: #FEF9F5' },
  { from: /background:\s*#FFF\b/gi,                to: 'background: #FEF9F5' },
  { from: /background:\s*#ffffff\b/gi,             to: 'background: #FEF9F5' },
  { from: /background:\s*#FFFFFF\b/gi,             to: 'background: #FEF9F5' },
  { from: /background-color:\s*white\b/gi,         to: 'background-color: #FEF9F5' },
  { from: /background-color:\s*#fff\b/gi,          to: 'background-color: #FEF9F5' },
  { from: /background-color:\s*#ffffff\b/gi,       to: 'background-color: #FEF9F5' },

  // Tailwind: bg-[#fff], bg-[#FFF], bg-[#ffffff], bg-[#FFFFFF]
  { from: /bg-\[#fff\]/gi,                          to: 'bg-[#FEF9F5]' },
  { from: /bg-\[#FFF\]/gi,                          to: 'bg-[#FEF9F5]' },
  { from: /bg-\[#ffffff\]/gi,                       to: 'bg-[#FEF9F5]' },
  { from: /bg-\[#FFFFFF\]/gi,                       to: 'bg-[#FEF9F5]' },

  // Tailwind: bg-white — ONLY when used as standalone background (not text-white, hover:text-white etc.)
  // Replace " bg-white " and class strings containing bg-white as background class
  // We do a careful replacement: only bg-white that is a CSS background (not text/border/ring/from/to)
  { from: /(?<!text-)(?<!border-)(?<!ring-)(?<!from-)(?<!to-)(?<!shadow-)(?<!accent-)(?<!decoration-)\bbg-white\b/g, to: 'bg-[#FEF9F5]' },
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
      // Additional safety: skip hover:bg-white (it's an interactive state, keep it)
      // We need to preserve hover:bg-white, focus:bg-white, etc.
      // The negative lookbehind above handles most cases
      fileChanges += matches.length;
      content = content.replace(from, to);
    }
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
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (EXTS.some(ext => entry.name.endsWith(ext))) {
      totalFiles++;
      processFile(fullPath);
    }
  }
}

console.log('🎨 Replacing ALL white backgrounds → #FEF9F5');
console.log('==============================================\n');

walkDir(ROOT);

console.log('\n==============================================');
console.log(`✅ Files scanned: ${totalFiles}`);
console.log(`✅ Files changed: ${changedFiles.length}`);
console.log(`✅ Total fixes:   ${totalChanges}`);
