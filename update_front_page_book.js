const fs = require('fs');

let pageTsx = fs.readFileSync('app/page.tsx', 'utf8');

// Replace CSS book container with 3D book cover image /7-day-plan-book.jpg
const oldBookMarkup = `<div className={styles.bookCompact}>
            <div className={styles.bookCover}>
              <div className={styles.bookLogo}>mood<span>flip</span></div>
              <strong>7-DAY PLAN</strong>
              <div className={styles.bookSun}></div>
              <div className={styles.bookHillOne}></div>
              <div className={styles.bookHillTwo}></div>
              <div className={styles.bookBadge}>BEST FOR<br/><b>BEGINNERS</b></div>
              <div className={\`\${styles.bookLeaf} \${styles.bookLeafLeft}\`}>❧</div>
              <div className={\`\${styles.bookLeaf} \${styles.bookLeafRight}\`}>❧</div>
            </div>
          </div>`;

const newBookMarkup = `<div className={styles.bookCompact} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="/7-day-plan-book.jpg"
              alt="MoodFlip 7-Day Plan Book Cover"
              style={{
                width: '100%',
                maxWidth: '250px',
                height: 'auto',
                borderRadius: '18px',
                boxShadow: '0 20px 44px rgba(100, 50, 200, 0.3)',
                filter: 'drop-shadow(0 12px 28px rgba(113, 71, 232, 0.25))',
                transition: 'transform 0.3s ease'
              }}
            />
          </div>`;

if (pageTsx.includes('className={styles.bookCover}')) {
  pageTsx = pageTsx.replace(/<div className=\{styles\.bookCompact\}>[\s\S]*?<\/div>\s*<\/div>/, newBookMarkup);
  fs.writeFileSync('app/page.tsx', pageTsx, 'utf8');
  console.log('Successfully updated 7-Day Plan book cover to use /7-day-plan-book.jpg!');
} else {
  console.log('Could not match bookCover markup directly, checking regexp replace...');
}
