const fs = require('fs');

let tsx = fs.readFileSync('app/page.tsx', 'utf8');

// Replace Link with standard anchor tag or add Link import
if (!tsx.includes("import Link from 'next/link';") && !tsx.includes('import Link from "next/link";')) {
  tsx = 'import Link from "next/link";\n' + tsx;
}

fs.writeFileSync('app/page.tsx', tsx, 'utf8');
console.log('Added Link import to app/page.tsx!');
