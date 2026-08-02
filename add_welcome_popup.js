const fs = require('fs');

// 1. Update app/page.tsx to include showWelcomeCard state and Welcome Back popup
let tsx = fs.readFileSync('app/page.tsx', 'utf8');

// Add showWelcomeCard state if not present
if (!tsx.includes('showWelcomeCard')) {
  tsx = tsx.replace(
    'const [msg, setMsg] = useState("");',
    'const [msg, setMsg] = useState("");\n  const [showWelcomeCard, setShowWelcomeCard] = useState(true);'
  );
}

// Add Welcome Back popup element right before </main> or after trustStrip
const popupJSX = `
        {/* Welcome Back Floating Card Popup */}
        {showWelcomeCard && (
          <aside className={styles.welcomeCardPopup} aria-label="Welcome Back Prompt">
            <button
              type="button"
              className={styles.welcomeCloseBtn}
              onClick={() => setShowWelcomeCard(false)}
              aria-label="Close message"
            >
              ×
            </button>
            <div className={styles.welcomeCardHeader}>
              <div className={styles.welcomeAvatarCircle}>
                <span>👤</span>
              </div>
              <div>
                <h3>Welcome Back! 👋</h3>
                <p>Create a profile to save your mood check-ins and get personalized support.</p>
              </div>
            </div>
            <Link href="/register" className={styles.welcomeCreateBtn}>
              Create My Profile
            </Link>
            <button
              type="button"
              className={styles.welcomeMaybeBtn}
              onClick={() => setShowWelcomeCard(false)}
            >
              Maybe Later
            </button>
            <span className={styles.welcomeSubnote}>It only takes 30 seconds.</span>
          </aside>
        )}
`;

if (!tsx.includes('welcomeCardPopup')) {
  tsx = tsx.replace('</section>\n\n        {/* Section 1: How MoodFlip Works */}', '</section>\n' + popupJSX + '\n        {/* Section 1: How MoodFlip Works */}');
}

fs.writeFileSync('app/page.tsx', tsx, 'utf8');

// 2. Update app/page.module.css with exact popup styling
let css = fs.readFileSync('app/page.module.css', 'utf8');

const cssStyles = `
/* Welcome Back Floating Popup */
.welcomeCardPopup {
  position: fixed;
  right: 28px;
  bottom: 28px;
  z-index: 100;
  width: 350px;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #dcd2f5;
  box-shadow: 0 20px 48px rgba(70, 40, 120, 0.16);
  padding: 22px 24px 18px;
  animation: popupSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes popupSlideIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.welcomeCloseBtn {
  position: absolute;
  top: 14px;
  right: 16px;
  border: none;
  background: transparent;
  color: #a097b5;
  font-size: 20px;
  cursor: pointer;
  line-height: 1;
  padding: 4px;
}
.welcomeCloseBtn:hover { color: #50446e; }

.welcomeCardHeader {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.welcomeAvatarCircle {
  width: 56px;
  height: 56px;
  min-width: 56px;
  border-radius: 50%;
  background: radial-gradient(circle, #ece0ff 0%, #d5c0ff 100%);
  display: grid;
  place-items: center;
  font-size: 28px;
  color: #683cd7;
  box-shadow: 0 4px 14px rgba(104, 60, 215, 0.15);
}

.welcomeCardHeader h3 {
  margin: 2px 0 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 19px;
  font-weight: 700;
  color: #181236;
}

.welcomeCardHeader p {
  margin: 6px 0 0;
  font-size: 12px;
  line-height: 1.45;
  color: #62597d;
}

.welcomeCreateBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 44px;
  margin-top: 18px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #7c44e2, #6032cc);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(96, 50, 204, 0.25);
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
}
.welcomeCreateBtn:hover { opacity: 0.95; transform: translateY(-1px); }

.welcomeMaybeBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 42px;
  margin-top: 10px;
  border-radius: 12px;
  border: 1.5px solid #e2d7f7;
  background: #ffffff;
  color: #683cd7;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;
}
.welcomeMaybeBtn:hover { background: #f8f4ff; }

.welcomeSubnote {
  display: block;
  text-align: center;
  font-size: 11px;
  color: #8e85a3;
  margin-top: 12px;
}
`;

if (!css.includes('welcomeCardPopup')) {
  css += '\n' + cssStyles;
}

fs.writeFileSync('app/page.module.css', css, 'utf8');
console.log('Added Welcome Back popup to page.tsx and page.module.css!');
