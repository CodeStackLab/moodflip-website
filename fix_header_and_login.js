const fs = require('fs');

// 1. Link top header Login button in app/page.tsx to /login
let pageTsx = fs.readFileSync('app/page.tsx', 'utf8');

pageTsx = pageTsx.replace(
  /<button className=\{styles\.loginButton\} type="button"><span>[^<]*<\/span> Login<\/button>/g,
  `<a href="/login" className={styles.loginButton}><span>👤</span> Login</a>`
);

fs.writeFileSync('app/page.tsx', pageTsx, 'utf8');

// 2. Fix unescaped single quotes and styling in app/login/page.tsx
let loginTsx = fs.readFileSync('app/login/page.tsx', 'utf8');

loginTsx = loginTsx.replace("Don't have an account?", "Don&apos;t have an account?");

fs.writeFileSync('app/login/page.tsx', loginTsx, 'utf8');

console.log('Linked top Header Login button to /login and fixed unescaped quote in login/page.tsx!');
