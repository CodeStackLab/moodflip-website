const fs = require('fs');

const hero = fs.readFileSync('components/HeroSectionExact.tsx', 'utf8');
const css = fs.readFileSync('components/HeroSectionExact.module.css', 'utf8');
const globals = fs.readFileSync('app/globals.css', 'utf8');
const layout = fs.readFileSync('app/layout.tsx', 'utf8');

const checks = [
  ['Bad label fixed (no Stressed)', !hero.includes('? "Stressed" : mood')],
  ['Bad label shows mood variable only', hero.includes('{mood}\n                    </span>')],
  ['Day-2 popup message present', hero.includes("You're building your 7-Day MoodFlip Report")],
  ['Day-2 once-per-day logic', hero.includes('moodflip_day2_msg_')],
  ['Message 1 improved wording', hero.includes('Your first MoodFlip check-in is saved.')],
  ['Cormorant Garamond in CSS', css.includes('Cormorant Garamond')],
  ['Nunito Sans in globals.css', globals.includes('Nunito Sans')],
  ['Nunito Sans in layout.tsx', layout.includes('Nunito+Sans')],
  ['Cormorant Garamond in layout.tsx', layout.includes('Cormorant+Garamond')],
];

let allPass = true;
for (const [label, pass] of checks) {
  console.log((pass ? '✅' : '❌') + ' ' + label);
  if (!pass) allPass = false;
}
console.log('\n' + (allPass ? '🎉 ALL CHECKS PASS' : '⚠ SOME CHECKS FAILED'));
