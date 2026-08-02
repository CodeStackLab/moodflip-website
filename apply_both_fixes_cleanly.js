const fs = require('fs');

let pageTsx = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Remove duplicate welcomeCard at the bottom of app/page.tsx (lines 531-546)
pageTsx = pageTsx.replace(
  /\s*\{showWelcome && \(\s*<aside className=\{styles\.welcomeCard\}[\s\S]*?<\/aside>\s*\)\}/g,
  ''
);

// 2. Replace 7-Day Plan CSS book box with high-res 3D book image /7-day-plan-book.jpg
const newBookMarkup = `<div className={styles.bookCompact} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="/7-day-plan-book.jpg"
              alt="MoodFlip 7-Day Plan Book Cover"
              style={{
                width: '100%',
                maxWidth: '240px',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 20px 44px rgba(100, 50, 200, 0.28)',
                filter: 'drop-shadow(0 10px 24px rgba(113, 71, 232, 0.22))'
              }}
            />
          </div>`;

pageTsx = pageTsx.replace(
  /<div className=\{styles\.bookCompact\}>[\s\S]*?<\/div>\s*<\/div>/,
  newBookMarkup
);

// Preserve CRLF line endings
pageTsx = pageTsx.replace(/\r?\n/g, '\r\n');

fs.writeFileSync('app/page.tsx', pageTsx, 'utf8');
console.log('Successfully applied 3D book image and removed duplicate Welcome Back card!');
