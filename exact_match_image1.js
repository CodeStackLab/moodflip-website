const fs = require('fs');

// 1. Update app/page.tsx plant leaves SVG gradients to warm coral pink/peach matching Image 1
let pageTsx = fs.readFileSync('app/page.tsx', 'utf8');

// Replace left leaf gradient
pageTsx = pageTsx.replace(
  /<linearGradient id="leafGradLeft"[^>]*>[\s\S]*?<\/linearGradient>/,
  `<linearGradient id="leafGradLeft" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffb0a0" stopOpacity="0.95" />
                      <stop offset="40%" stopColor="#f38181" stopOpacity="0.9" />
                      <stop offset="80%" stopColor="#e25865" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#d13f50" stopOpacity="0.8" />
                    </linearGradient>`
);

// Replace right leaf gradient
pageTsx = pageTsx.replace(
  /<linearGradient id="leafGradRight"[^>]*>[\s\S]*?<\/linearGradient>/,
  `<linearGradient id="leafGradRight" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffb0a0" stopOpacity="0.95" />
                      <stop offset="40%" stopColor="#f38181" stopOpacity="0.9" />
                      <stop offset="80%" stopColor="#e25865" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#d13f50" stopOpacity="0.8" />
                    </linearGradient>`
);

// Top Save button ribbon tag icon
pageTsx = pageTsx.replace(
  /<button type="button" className=\{styles\.topIconBtn\}><span>🔖<\/span> Save<\/button>/,
  `<button type="button" className={styles.topIconBtn}><span style={{color: '#ff4d6d'}}>🔖</span> Save</button>`
);

fs.writeFileSync('app/page.tsx', pageTsx, 'utf8');

// 2. Update app/page.module.css for exact sun badge glow & plant positioning
let css = fs.readFileSync('app/page.module.css', 'utf8');

// Update sunBadge to match Image 1 warm coral halo
css = css.replace(
  /\.sunBadge\s*\{[^}]*\}/s,
  `.sunBadge {
  position: relative;
  z-index: 4;
  width: 104px;
  height: 104px;
  margin: 20px auto 14px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #ffe6d9;
  box-shadow: 0 10px 30px rgba(255, 140, 110, 0.22), inset 0 0 25px rgba(255, 235, 210, 0.8);
}`
);

// Update plantLeft and plantRight opacity and warmth
css = css.replace(
  /\.plantLeft,\s*\.plantRight\s*\{[^}]*\}/s,
  `.plantLeft,
.plantRight {
  position: absolute;
  z-index: 2;
  top: 95px;
  width: 115px;
  height: 310px;
  pointer-events: none;
  opacity: .95;
  filter: drop-shadow(0 4px 12px rgba(226, 88, 101, 0.15));
}`
);

fs.writeFileSync('app/page.module.css', css, 'utf8');
console.log('Applied exact plant coral leaf colors and sun badge styling matching Image 1!');
