export default function Footer() {
  return (
    <footer style={{
      background: 'var(--card-bg)',
      borderTop: '1.5px solid var(--card-border)',
      padding: '4rem 1rem 2.5rem',
      marginTop: 'auto',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{
        maxWidth: '1120px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2.5rem',
        marginBottom: '3rem',
      }}>
        {/* Brand Col */}
        <div style={{ gridColumn: 'span 2' }}>
          <a href="/" style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: '1.8rem',
            fontWeight: 800,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: '2px',
            marginBottom: '0.85rem'
          }}>
            <span style={{ color: '#6c5ce7' }}>Mood</span>
            <span style={{ color: '#ec4899' }}>Flip</span>
          </a>
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--text-subtle)',
            lineHeight: 1.65,
            maxWidth: '420px',
            margin: '0 0 1.25rem'
          }}>
            A gentle, tap-only reset for difficult everyday emotions — one practical 60-second action at a time.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.74rem', fontWeight: 700,
              padding: '0.35rem 0.75rem', borderRadius: '999px',
              background: 'rgba(108,92,231,0.08)',
              border: '1px solid rgba(108,92,231,0.18)',
              color: '#6c5ce7'
            }}>
              🔒 Private by design
            </span>
            <span style={{
              fontSize: '0.74rem', fontWeight: 700,
              padding: '0.35rem 0.75rem', borderRadius: '999px',
              background: 'rgba(236,72,153,0.08)',
              border: '1px solid rgba(236,72,153,0.18)',
              color: '#ec4899'
            }}>
              ⚡ No typing needed
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{
            fontSize: '0.78rem', fontWeight: 900,
            color: 'var(--text-main)', textTransform: 'uppercase',
            letterSpacing: '0.08em', marginBottom: '1.1rem'
          }}>
            Explore
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
            <li><a href="/" style={{ color: 'var(--text-subtle)', textDecoration: 'none', transition: 'color 0.2s' }}>Flip My Mood</a></li>
            <li><a href="/about" style={{ color: 'var(--text-subtle)', textDecoration: 'none', transition: 'color 0.2s' }}>How It Works</a></li>
            <li><a href="/login" style={{ color: 'var(--text-subtle)', textDecoration: 'none', transition: 'color 0.2s' }}>Sign In / Register</a></li>
          </ul>
        </div>

        {/* Legal & Support */}
        <div>
          <h3 style={{
            fontSize: '0.78rem', fontWeight: 900,
            color: 'var(--text-main)', textTransform: 'uppercase',
            letterSpacing: '0.08em', marginBottom: '1.1rem'
          }}>
            Support &amp; Legal
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
            <li><a href="/contact" style={{ color: 'var(--text-subtle)', textDecoration: 'none', transition: 'color 0.2s' }}>Contact Us</a></li>
            <li><a href="/privacy" style={{ color: 'var(--text-subtle)', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy Policy</a></li>
            <li><a href="/disclaimer" style={{ color: 'var(--text-subtle)', textDecoration: 'none', transition: 'color 0.2s' }}>Safety Disclaimer</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1120px',
        margin: '0 auto',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--card-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.8rem',
        color: 'var(--text-subtle)'
      }}>
        <div>&copy; 2026 MoodFlip. All rights reserved.</div>
        <div>
          Self-reflection utility • <a href="/disclaimer" style={{ color: '#6c5ce7', fontWeight: 700, textDecoration: 'none' }}>Not therapy or medical advice</a>
        </div>
      </div>
    </footer>
  );
}
