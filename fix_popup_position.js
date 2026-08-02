const fs = require('fs');

// 1. Fix state variable name in app/page.tsx (use showWelcome & setShowWelcome)
let tsx = fs.readFileSync('app/page.tsx', 'utf8');

tsx = tsx.replace(/showWelcomeCard/g, 'showWelcome');

fs.writeFileSync('app/page.tsx', tsx, 'utf8');

// 2. Set .welcomeCardPopup to position: absolute anchored to .dashboard in app/page.module.css
let css = fs.readFileSync('app/page.module.css', 'utf8');

css = css.replace(
  /\.dashboard\s*\{[^}]*\}/s,
  `.dashboard {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1.02fr) 230px;
  gap: 18px;
  padding: 0 28px;
  align-items: flex-start;
}`
);

css = css.replace(
  /\.welcomeCardPopup\s*\{[^}]*\}/s,
  `.welcomeCardPopup {
  position: absolute;
  right: 14px;
  bottom: -30px;
  z-index: 30;
  width: 340px;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #dcd2f5;
  box-shadow: 0 20px 48px rgba(70, 40, 120, 0.16);
  padding: 22px 22px 18px;
  animation: popupSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}`
);

fs.writeFileSync('app/page.module.css', css, 'utf8');
console.log('Fixed showWelcome state name & set position: absolute anchored to first section!');
