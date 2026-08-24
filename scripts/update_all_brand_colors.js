/**
 * update_all_brand_colors.js
 * Updates all instances of #FCF5EE to #FDF8F5 across components and app pages.
 */

const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const targetDirs = [
  path.join(__dirname, '..', 'components'),
  path.join(__dirname, '..', 'app'),
  path.join(__dirname, '..', 'lib')
];

let replacedCount = 0;

targetDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    walkDir(dir, (filePath) => {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('#FCF5EE') || content.includes('#fcf5ee')) {
          content = content.replace(/#FCF5EE/gi, '#FDF8F5');
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`Updated: ${path.relative(path.join(__dirname, '..'), filePath)}`);
          replacedCount++;
        }
      }
    });
  }
});

console.log(`\n🎉 Replaced brand colors in ${replacedCount} files.`);
