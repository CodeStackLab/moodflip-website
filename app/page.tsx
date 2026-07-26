import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MoodTool from '@/components/MoodTool';

export default function HomePage() {
  return (
    <div className="site-shell">
      <Header />

      {/* TOP ADSENSE AD SPACE PLACEHOLDER (PHASE 2 READY) */}
      <div className="adsense-top-container" style={{
        maxWidth: '1280px',
        margin: '0.75rem auto 0 auto',
        padding: '0 0.5rem',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '728px',
          height: '90px',
          background: 'var(--tile-bg)',
          border: '1px dashed var(--card-border)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-subtle)',
          fontWeight: 600,
          letterSpacing: '0.04em'
        }}>
          ✨ AdSense Space Placeholder (Top Banner)
        </div>
      </div>

      <main style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        <MoodTool />
      </main>

      {/* BOTTOM ADSENSE AD SPACE PLACEHOLDER (PHASE 2 READY) */}
      <div className="adsense-bottom-container" style={{
        maxWidth: '1280px',
        margin: '0 auto 1.5rem auto',
        padding: '0 0.5rem',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '728px',
          height: '90px',
          background: 'var(--tile-bg)',
          border: '1px dashed var(--card-border)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-subtle)',
          fontWeight: 600,
          letterSpacing: '0.04em'
        }}>
          ✨ AdSense Space Placeholder (Bottom Banner)
        </div>
      </div>

      <Footer />
    </div>
  );
}
