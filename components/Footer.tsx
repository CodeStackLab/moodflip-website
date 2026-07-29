import React from 'react';

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-root {
          border-top: 1px solid var(--card-border);
          margin-top: 4rem;
          padding: 3.5rem 1.5rem 2rem 1.5rem;
          background: var(--card-bg);
          color: var(--text-subtle);
          border-radius: 28px 28px 0 0;
          box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.04);
          transition: background 0.3s ease, color 0.3s ease;
        }
        .footer-grid {
          max-width: 1200px;
          margin: 0 auto 2.5rem auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2.5rem;
        }
        .footer-brand-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-main);
          font-family: 'Fraunces', Georgia, serif;
        }
        .footer-brand-desc {
          font-size: 0.87rem;
          color: var(--text-subtle);
          line-height: 1.65;
          margin: 0;
        }
        .footer-col-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 1rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 0.86rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer-link {
          color: var(--text-subtle);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: #a855f7;
        }
        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 1.5rem;
          border-top: 1px solid var(--card-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          font-size: 0.8rem;
          color: var(--text-subtle);
        }
        .footer-disclaimer-link {
          color: var(--text-subtle);
          text-decoration: underline;
          transition: color 0.2s ease;
        }
        .footer-disclaimer-link:hover {
          color: #a855f7;
        }

        /* ===== MOBILE RESPONSIVE ===== */
        @media (max-width: 640px) {
          .footer-root {
            padding: 2.5rem 1.25rem 1.5rem 1.25rem;
            border-radius: 20px 20px 0 0;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .footer-brand-col {
            grid-column: 1 / -1;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            font-size: 0.78rem;
          }
        }

        @media (max-width: 400px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-grid">

          {/* Column 1: Brand Info */}
          <div className="footer-brand-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #7c54d1 0%, #e77c74 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.05rem',
                color: 'white',
                boxShadow: '0 4px 12px rgba(124, 84, 209, 0.3)',
                flexShrink: 0
              }}>
                💫
              </div>
              <span className="footer-brand-name">MoodFlip</span>
            </div>
            <p className="footer-brand-desc">
              A fast, tap-only self-reflection utility designed to gently flip negative moods into positive target states with practical 60-second actions.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-link-list">
              <li><a href="/" className="footer-link">Home / Tool</a></li>
              <li><a href="/about" className="footer-link">About MoodFlip</a></li>
              <li><a href="/contact" className="footer-link">Contact &amp; Support</a></li>
              <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
              <li><a href="/disclaimer" className="footer-link">Disclaimer</a></li>
            </ul>
          </div>

          {/* Column 3: Popular Guides */}
          <div>
            <h4 className="footer-col-title">Mood Guides</h4>
            <ul className="footer-link-list">
              <li><a href="/mood/anxious-at-night" className="footer-link">Anxious at Night</a></li>
              <li><a href="/mood/overwhelmed-work" className="footer-link">Overwhelmed by Work</a></li>
              <li><a href="/mood/feeling-lonely" className="footer-link">Feeling Lonely</a></li>
              <li><a href="/mood/frustrated-angry" className="footer-link">Frustrated &amp; Angry</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="footer-bottom">
          <div>
            &copy; 2026 MoodFlip. All rights reserved.
          </div>
          <div>
            Self-help utility &bull; <a href="/disclaimer" className="footer-disclaimer-link">Not therapy or medical advice</a>
          </div>
        </div>
      </footer>
    </>
  );
}
