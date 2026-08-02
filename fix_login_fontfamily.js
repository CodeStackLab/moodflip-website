const fs = require('fs');

let content = fs.readFileSync('app/login/page.tsx', 'utf8');

// Remove fontFamily property that broke SWC JSX parser
content = content.replace(/,\s*fontFamily:\s*['"][^'"]*['"]/g, '');
content = content.replace(/\r?\n/g, '\r\n');

fs.writeFileSync('app/login/page.tsx', content, 'utf8');
console.log('Removed troublesome fontFamily property from app/login/page.tsx!');
