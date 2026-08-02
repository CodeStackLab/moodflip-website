const fs = require('fs');

let css = fs.readFileSync('app/page.module.css', 'utf8');

// 1. Set .morePanel to align-self: flex-start so it doesn't artificially stretch card gaps
css = css.replace(
  /\.morePanel\s*\{[^}]*\}/g,
  `.morePanel {
  display: flex;
  flex-direction: column;
  height: auto;
  align-self: flex-start;
  min-height: 431px;
  padding: 16px 12px;
  margin-top: 0px;
  border-radius: 21px;
  border: 1px solid rgba(42, 38, 78, .11);
  background: rgba(255,255,255,.93);
  box-shadow: 0 16px 38px rgba(81, 59, 128, .035);
}`
);

// 2. Set .planList to gap: 11px without justify-content: space-between
css = css.replace(
  /\.planList\s*\{[^}]*\}/g,
  `.planList {
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin-top: 10px;
}`
);

fs.writeFileSync('app/page.module.css', css, 'utf8');
console.log('Fixed morePanel card spacing to compact gap: 11px without huge empty spaces!');
