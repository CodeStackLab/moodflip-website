const fs = require('fs');

let tsx = fs.readFileSync('app/page.tsx', 'utf8');

// Replace <Link href="/register" with <a href="/register" and </Link> with </a>
tsx = tsx.replace(/<Link href="\/register"/g, '<a href="/register"');
tsx = tsx.replace(/<\/Link>/g, '</a>');

fs.writeFileSync('app/page.tsx', tsx, 'utf8');
console.log('Replaced Link with standard <a> tag in app/page.tsx!');
