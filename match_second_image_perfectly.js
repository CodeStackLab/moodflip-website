const fs = require('fs');

// 1. Update app/page.module.css for exact compact heights and floating Welcome Back popup
let css = fs.readFileSync('app/page.module.css', 'utf8');

// Dashboard container position relative so popup can float relative to it
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

// MoodPanel & FlipCard heights
css = css.replace(
  /\.moodPanel,\s*\.flipCard,\s*\.morePanel\s*\{[^}]*\}/s,
  `.moodPanel,
.flipCard {
  border: 1px solid rgba(42, 38, 78, .11);
  border-radius: 22px;
  background: rgba(255,255,255,.93);
  box-shadow: 0 16px 38px rgba(81, 59, 128, .035);
  min-height: 660px;
}`
);

// FlipCard compact layout with no extra bottom space
css = css.replace(
  /\.flipCard\s*\{[^}]*\}/s,
  `.flipCard {
  position: relative;
  min-height: 660px;
  overflow: hidden;
  padding: 22px 28px 24px;
  background:
    radial-gradient(circle at 52% 34%, rgba(255, 251, 215, .96), transparent 24%),
    radial-gradient(circle at 9% 5%, rgba(251, 216, 244, .78), transparent 30%),
    radial-gradient(circle at 95% 12%, rgba(255, 221, 231, .78), transparent 28%),
    linear-gradient(180deg, #fff1f7 0%, #fff9ea 57%, #fff5ec 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}`
);

// MorePanel compact height with gap: 11px matching Image 2
css = css.replace(
  /\.morePanel\s*\{[^}]*\}/s,
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

// PlanList compact spacing
css = css.replace(
  /\.planList\s*\{[^}]*\}/s,
  `.planList {
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin-top: 10px;
}`
);

// Floating Welcome Back popup position (relative to dashboard grid matching Image 2)
css = css.replace(
  /\.welcomeCardPopup\s*\{[^}]*\}/s,
  `.welcomeCardPopup {
  position: absolute;
  right: 10px;
  bottom: -35px;
  z-index: 100;
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

// 2. Ensure Welcome Back popup is inside .dashboard in app/page.tsx
let tsx = fs.readFileSync('app/page.tsx', 'utf8');

// Move popup inside .dashboard if currently outside
if (tsx.includes('welcomeCardPopup') && !tsx.includes('</aside>\n        </section>')) {
  // Find popup JSX
  const popupMatch = tsx.match(/\{\/\* Welcome Back Floating Card Popup \*\/\}[\s\S]*?<\/aside>\s*\}/);
  if (popupMatch) {
    const popupStr = popupMatch[0];
    // Remove from current position
    tsx = tsx.replace(popupStr, '');
    // Place inside dashboard section right before </section> of dashboard
    tsx = tsx.replace('</aside>\n        </section>', '</aside>\n' + popupStr + '\n        </section>');
  }
}

fs.writeFileSync('app/page.tsx', tsx, 'utf8');
console.log('Successfully updated layout to match Image 2 reference mockup!');
