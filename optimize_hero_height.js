const fs = require('fs');

// 1. Fix state function name in app/page.tsx
let tsx = fs.readFileSync('app/page.tsx', 'utf8');

tsx = tsx.replace(/setShowWelcomeCard/g, 'setShowWelcome');
tsx = tsx.replace(/showWelcomeCard/g, 'showWelcome');

fs.writeFileSync('app/page.tsx', tsx, 'utf8');

// 2. Compact hero section height in app/page.module.css so it fits 100% on 1 screen fold
let css = fs.readFileSync('app/page.module.css', 'utf8');

// MoodPanel & FlipCard compact min-height
css = css.replace(
  /\.moodPanel,\s*\.flipCard\s*\{[^}]*\}/s,
  `.moodPanel,
.flipCard {
  border: 1px solid rgba(42, 38, 78, .11);
  border-radius: 22px;
  background: rgba(255,255,255,.93);
  box-shadow: 0 16px 38px rgba(81, 59, 128, .035);
  min-height: 590px;
}`
);

// FlipCard compact styling
css = css.replace(
  /\.flipCard\s*\{[^}]*\}/s,
  `.flipCard {
  position: relative;
  min-height: 590px;
  overflow: hidden;
  padding: 16px 24px 18px;
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

// MoodPanel compact padding & min-height
css = css.replace(
  /\.moodPanel\s*\{[^}]*\}/s,
  `.moodPanel {
  padding: 16px 18px;
  min-height: 590px;
}`
);

// SunBadge compact size
css = css.replace(
  /\.sunBadge\s*\{[^}]*\}/s,
  `.sunBadge {
  position: relative;
  z-index: 4;
  width: 86px;
  height: 86px;
  margin: 12px auto 8px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #ffe6d9;
  box-shadow: 0 8px 24px rgba(255, 140, 110, 0.2), inset 0 0 20px rgba(255, 235, 210, 0.8);
}`
);

// SunCore icon font size
css = css.replace(
  /\.sunCore\s*\{[^}]*\}/s,
  `.sunCore { font-size: 46px; filter: saturate(.9); }`
);

// ActionCard compact margin & padding
css = css.replace(
  /\.actionCard\s*\{[^}]*\}/s,
  `.actionCard {
  position: relative;
  z-index: 5;
  width: 90%;
  margin: 16px auto 0;
  border: 1px solid rgba(238, 206, 201, .85);
  border-radius: 16px;
  background: rgba(255, 255, 255, .94);
  box-shadow: 0 14px 36px rgba(129, 72, 111, .08);
  backdrop-filter: blur(8px);
}`
);

// PlantLeft & PlantRight compact height
css = css.replace(
  /\.plantLeft,\s*\.plantRight\s*\{[^}]*\}/s,
  `.plantLeft,
.plantRight {
  position: absolute;
  z-index: 2;
  top: 75px;
  width: 105px;
  height: 270px;
  pointer-events: none;
  opacity: .95;
  filter: drop-shadow(0 4px 12px rgba(226, 88, 101, 0.15));
}`
);

// WelcomeCardPopup exact placement
css = css.replace(
  /\.welcomeCardPopup\s*\{[^}]*\}/s,
  `.welcomeCardPopup {
  position: absolute;
  right: -15px;
  bottom: -30px;
  z-index: 50;
  width: 340px;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #dcd2f5;
  box-shadow: 0 20px 48px rgba(70, 40, 120, 0.16);
  padding: 20px 20px 16px;
  animation: popupSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}`
);

fs.writeFileSync('app/page.module.css', css, 'utf8');
console.log('Optimized hero section height to 590px for 1-screen fold visibility!');
