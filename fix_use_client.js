const fs = require('fs');

let tsx = fs.readFileSync('app/page.tsx', 'utf8');

// Ensure 'use client'; is the very first line
tsx = tsx.replace(/^import Link from ["']next\/link["'];?\s*/, '');
if (!tsx.startsWith("'use client';") && !tsx.startsWith('"use client";')) {
  tsx = "'use client';\n" + tsx;
}
if (!tsx.includes("import Link from 'next/link';")) {
  tsx = tsx.replace("'use client';", "'use client';\nimport Link from 'next/link';");
}

fs.writeFileSync('app/page.tsx', tsx, 'utf8');
console.log('Fixed "use client" placement on line 1 of app/page.tsx!');
