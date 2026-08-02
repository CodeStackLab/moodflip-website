const fs = require('fs');

let css = fs.readFileSync('app/page.module.css', 'utf8');

// Ensure .dashboard container handles absolute overflow smoothly
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

// Update welcomeCardPopup position to shift left and down matching Image 2
css = css.replace(
  /\.welcomeCardPopup\s*\{[^}]*\}/s,
  `.welcomeCardPopup {
  position: absolute;
  right: -15px;
  bottom: -45px;
  z-index: 50;
  width: 345px;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #dcd2f5;
  box-shadow: 0 20px 48px rgba(70, 40, 120, 0.16);
  padding: 22px 22px 18px;
  animation: popupSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}`
);

fs.writeFileSync('app/page.module.css', css, 'utf8');
console.log('Adjusted Welcome Back popup position (right: -15px, bottom: -45px) to match Image 2 reference!');
