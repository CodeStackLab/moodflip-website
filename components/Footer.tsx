export default function Footer() {
  return (
      <footer className="footer-root">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <a className="footer-brand-name" href="/" aria-label="MoodFlip home"><span>Mood</span><span>Flip</span></a>
            <p className="footer-brand-desc">
              A gentle, tap-only reset for difficult everyday emotions—one practical 60-second action at a time.
            </p>
            <div className="footer-trust"><span>🔒 Private by design</span><span>⚡ No typing needed</span></div>
          </div>
          <div>
            <h2 className="footer-col-title">Explore</h2>
            <ul className="footer-link-list">
              <li><a href="/" className="footer-link">Flip my mood</a></li>
              <li><a href="/pricing" className="footer-link">Plans &amp; pricing</a></li>
              <li><a href="/about" className="footer-link">How it works</a></li>
              <li><a href="/profile" className="footer-link">My check-ins</a></li>
            </ul>
          </div>
          <div>
            <h2 className="footer-col-title">Support</h2>
            <ul className="footer-link-list">
              <li><a href="/contact" className="footer-link">Contact us</a></li>
              <li><a href="/privacy" className="footer-link">Privacy policy</a></li>
              <li><a href="/disclaimer" className="footer-link">Safety disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>&copy; 2026 MoodFlip. All rights reserved.</div>
          <div>Self-reflection utility · <a href="/disclaimer" className="footer-disclaimer-link">Not therapy or medical advice</a></div>
        </div>
      </footer>
  );
}
