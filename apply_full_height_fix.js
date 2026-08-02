const fs = require('fs');

let css = fs.readFileSync('app/page.module.css', 'utf8');

// Ensure .dashboard is align-items: stretch
css = css.replace(
  /\.dashboard\s*\{[^}]*\}/s,
  `.dashboard {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1.02fr) 230px;
  gap: 18px;
  padding: 0 28px;
  align-items: stretch;
}`
);

// Ensure .moodPanel, .flipCard, .morePanel all stretch to full height
css = css.replace(
  /\.moodPanel,\s*\.flipCard,\s*\.morePanel\s*\{[^}]*\}/s,
  `.moodPanel,
.flipCard,
.morePanel {
  border: 1px solid rgba(42, 38, 78, .11);
  border-radius: 22px;
  background: rgba(255,255,255,.93);
  box-shadow: 0 16px 38px rgba(81, 59, 128, .035);
  height: 100%;
  min-height: 686px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}`
);

// Remove min-height: 431px override on .morePanel at line 697
css = css.replace(
  /\.morePanel\s*\{\s*min-height:\s*431px;[^\}]*\}/s,
  `.morePanel {
  height: 100%;
  min-height: 686px;
  padding: 20px 16px;
  margin-top: 0px;
  border-radius: 21px;
}`
);

// Ensure .planList fills space evenly
css = css.replace(
  /\.planList\s*\{[^}]*\}/s,
  `.planList {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  gap: 12px;
  margin-top: 10px;
}`
);

fs.writeFileSync('app/page.module.css', css, 'utf8');
console.log('Successfully updated app/page.module.css for full height dashboard panels!');
