const fs = require('fs');

let content = fs.readFileSync('app/login/page.tsx', 'utf8');

// Replace <div style={{ minHeight: '100vh', backgroundColor: '#FDFBF7', color: '#2D264B' }}>
// with <div className="min-h-screen bg-[#FDFBF7] text-[#2D264B]">
content = content.replace(
  /<div style=\{\{ minHeight: ['"]100vh['"], backgroundColor: ['"]#FDFBF7['"], color: ['"]#2D264B['"] \}\}>/g,
  '<div className="min-h-screen bg-[#FDFBF7] text-[#2D264B]">'
);

content = content.replace(/\r?\n/g, '\r\n');

fs.writeFileSync('app/login/page.tsx', content, 'utf8');
console.log('Replaced top div style with className in app/login/page.tsx!');
