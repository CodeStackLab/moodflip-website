const fs = require('fs');

let pageTsx = fs.readFileSync('app/page.tsx', 'utf8');

// Remove the second duplicate welcomeCard block at the bottom of page.tsx
pageTsx = pageTsx.replace(
  /\s*\{showWelcome && \(\s*<aside className=\{styles\.welcomeCard\}[\s\S]*?<\/aside>\s*\)\}/g,
  ''
);

pageTsx = pageTsx.replace(/\r?\n/g, '\r\n');

fs.writeFileSync('app/page.tsx', pageTsx, 'utf8');
console.log('Successfully removed duplicate Welcome Back card from bottom of app/page.tsx!');
