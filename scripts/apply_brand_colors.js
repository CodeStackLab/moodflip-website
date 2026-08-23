/**
 * MoodFlip Global Brand Color Enforcer
 * Replaces all off-brand colors with correct MoodFlip brand palette
 * from Google Doc: Colour_Codes_ChatGPT (17 Aug, 13:41)
 * 
 * BRAND PALETTE:
 * Primary purple: #7464AC (replaces #7147E8, #6D28D9, #7C3AED, #8B5CF6)
 * Dark purple:    #4F438B (replaces #5b21b6, #4C1D95)
 * Light purple:   #9C8CC4 (replaces #9333EA, #A78BFA, #7C3AED/50)
 * Peach/coral:    #E49C8C (replaces #EC4899, #DB2777)
 * Background:     #FEF9F5 (replaces #F9F5FF, #FAF5FF)
 * Card bg:        #FEF9F5 (replaces #FAF8FD)
 * Card tint:      #F4EBF5 (replaces #F5F3FF, #EDE9FE, #F0EBFA, #EAE3F2, #EEE9FA)
 * Text:           #1A143F (replaces #170E3B)
 * Footer:         #FAF5F6
 * Loader anim:    use brand colors
 */

const fs = require('fs');
const path = require('path');

// ── COLOR REPLACEMENTS MAP ──
// Key: regex pattern | Value: brand color replacement
const COLOR_MAP = [
  // Off-brand purples → brand primary purple
  { from: /#7147E8/gi,  to: '#7464AC' },
  { from: /#7C3AED/gi,  to: '#7464AC' },
  { from: /#6D28D9/gi,  to: '#7464AC' },
  { from: /#5f38d4/gi,  to: '#7464AC' },
  
  // Off-brand dark purples → brand dark purple  
  { from: /#5b21b6/gi,  to: '#4F438B' },
  { from: /#4C1D95/gi,  to: '#4F438B' },

  // Off-brand light purples / gradients → brand light purple
  { from: /#9333EA/gi,  to: '#9C8CC4' },
  { from: /#8B5CF6/gi,  to: '#9C8CC4' },
  { from: /#A78BFA/gi,  to: '#9C8CC4' },
  { from: /#8356F8/gi,  to: '#9C6FBF' },

  // Off-brand pinks → brand peach/coral
  { from: /#EC4899/gi,  to: '#E49C8C' },
  { from: /#DB2777/gi,  to: '#E49C8C' },
  { from: /#F43F5E/gi,  to: '#E49C8C' },

  // Off-brand backgrounds → brand backgrounds
  { from: /#F9F5FF/gi,  to: '#FEF9F5' },
  { from: /#FAF5FF/gi,  to: '#FEF9F5' },
  { from: /#FAF8FD/gi,  to: '#FEF9F5' },
  { from: /#F5F3FF/gi,  to: '#F4EBF5' },
  { from: /#EDE9FE/gi,  to: '#F4EBF5' },
  { from: /#F0EBFA/gi,  to: '#F4EBF5' },
  { from: /#EAE3F2/gi,  to: '#E4DAD7' },
  { from: /#EEE9FA/gi,  to: '#EEE0FC' },

  // Off-brand dark text
  { from: /#170E3B/gi,  to: '#1A143F' },

  // Off-brand secondary text
  { from: /#68607F/gi,  to: '#5C527A' },
];

// ── FILES TO PROCESS ──
const ROOT = path.join(__dirname, '..');
const SKIP_DIRS = ['node_modules', '.next', '.git', 'scripts', 'public'];
const INCLUDE_EXT = ['.tsx', '.ts', '.css', '.module.css'];

let totalFiles = 0;
let totalChanges = 0;
const changedFiles = [];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  let fileChanges = 0;

  for (const { from, to } of COLOR_MAP) {
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
    if (SKIP_DIRS.includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (INCLUDE_EXT.some(ext => entry.name.endsWith(ext))) {
      totalFiles++;
      processFile(fullPath);
    }
  }
}

console.log('🎨 MoodFlip Global Brand Color Enforcer');
console.log('========================================');
console.log('Scanning all .tsx, .ts, .css files...\n');

walkDir(ROOT);

console.log('\n========================================');
console.log(`📊 Summary:`);
console.log(`   Files scanned: ${totalFiles}`);
console.log(`   Files changed: ${changedFiles.length}`);
console.log(`   Total color fixes: ${totalChanges}`);
console.log('\n📁 Changed files:');
changedFiles.forEach(f => console.log(`   - ${f.file} (${f.changes} changes)`));

// Save report
const report = {
  timestamp: new Date().toISOString(),
  totalFiles,
  changedFiles: changedFiles.length,
  totalChanges,
  files: changedFiles,
  colorMap: COLOR_MAP.map(c => ({ from: c.from.toString(), to: c.to }))
};
fs.writeFileSync(path.join(__dirname, 'color_fix_report.json'), JSON.stringify(report, null, 2));
console.log('\n✅ Report saved to scripts/color_fix_report.json');
