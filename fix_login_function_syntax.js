const fs = require('fs');

let content = fs.readFileSync('app/login/page.tsx', 'utf8');

// Replace arrow function with standard function statement
content = content.replace(
  /const handleSubmit = \(e: React\.FormEvent\) => \{/g,
  'function handleSubmit(e: React.FormEvent<HTMLFormElement>) {'
);

content = content.replace(/\r?\n/g, '\r\n');
fs.writeFileSync('app/login/page.tsx', content, 'utf8');
console.log('Replaced arrow handleSubmit with function statement in app/login/page.tsx!');
