import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PaidPlansSection from '@/components/PaidPlansSection';

export const metadata = {
  title: 'Pricing & Plans | MoodFlip',
  description: 'MoodFlip is 100% free with no sign-up required. Optional personalized 7-Day PDF Mindset plans are available for $7 with instant email delivery.'
};

export default function PricingPage() {
  return (
    <div className="site-shell">
      <Header />

      <main style={{ maxWidth: '960px', margin: '2.5rem auto', padding: '0 1rem' }}>
        {/* HERO PRICING TITLE */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            color: '#7c54d1',
            background: '#f4edfa',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}>
            Transparent Pricing
          </span>
          <h1 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            fontWeight: 700,
            color: '#362854',
            margin: '0.8rem 0 0.5rem 0'
          }}>
            Use Free Forever. Upgrade When You’re Ready.
          </h1>
          <p style={{
            fontSize: '1.05rem',
            color: '#665c7d',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            The MoodFlip tool is 100% free with no typing or sign-up required. Optional $7 personalized PDF downloads help you track your progress.
          </p>
        </div>

        {/* PRICING COMPARISON GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem',
          marginBottom: '4rem'
        }}>
          {/* FREE PLAN */}
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #efe6dc',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                ALWAYS FREE
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#362854', margin: '0.75rem 0 0.25rem 0' }}>Daily MoodFlip Tool</h3>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#362854', marginBottom: '1rem' }}>$0 <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>/ forever</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', fontSize: '0.88rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li>✓ 28 Negative to Positive Mood Pairings</li>
                <li>✓ 280+ Rotating 60-Second Actions</li>
                <li>✓ Tap-only selection (No typing)</li>
                <li>✓ 100% Private (No registration required)</li>
                <li>✓ Unlimited daily mood flips</li>
              </ul>
            </div>
            <a
              href="/"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '0.85rem',
                borderRadius: '12px',
                background: '#f1f5f9',
                color: '#334155',
                fontWeight: 800,
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}
            >
              Use Free Tool Now &rarr;
            </a>
          </div>

          {/* 7-DAY PERSONALIZED PDF */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #7c54d1',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 16px 40px rgba(124, 84, 209, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: '-14px', right: '20px', background: 'linear-gradient(135deg, #7c54d1, #ec4899)', color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '0.3rem 0.85rem', borderRadius: '9999px' }}>
              MOST POPULAR
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#7c54d1', background: '#f4edfa', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                CUSTOM DOWNLOAD
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#362854', margin: '0.75rem 0 0.25rem 0' }}>7-Day Mindset PDF</h3>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#7c54d1', marginBottom: '1rem' }}>$7 <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>/ one-time</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', fontSize: '0.88rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li>✓ Tailored to your saved check-in history</li>
                <li>✓ Custom 7-day emotional shift roadmap</li>
                <li>✓ Non-repeating 60-second exercises</li>
                <li>✓ Automatic email delivery via Stripe</li>
                <li>✓ Instant high-res printable PDF</li>
              </ul>
            </div>
            <a
              href="/#paid-pdf-section"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '0.85rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(124, 84, 209, 0.3)'
              }}
            >
              Get 7-Day Plan ($7)
            </a>
          </div>
        </div>

        {/* STRIPE CHECKOUT COMPONENT */}
        <PaidPlansSection />

        {/* FREQUENTLY ASKED QUESTIONS */}
        <div style={{ marginTop: '4rem', background: '#ffffff', borderRadius: '24px', padding: '2.5rem', border: '1.5px solid #efe6dc' }}>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.8rem', fontWeight: 700, color: '#362854', textAlign: 'center', marginBottom: '2rem' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e1b4b', marginBottom: '0.4rem' }}>Do I need to pay to use MoodFlip?</h4>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                No! The MoodFlip web tool is 100% free for everyone with no sign-up or profile required.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e1b4b', marginBottom: '0.4rem' }}>How do I receive my $7 PDF?</h4>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                After completing Stripe checkout, your custom 7-Day PDF plan is instantly generated and delivered straight to your email address.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e1b4b', marginBottom: '0.4rem' }}>Is MoodFlip medical therapy?</h4>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                No. MoodFlip is a self-help reflection utility for daily mindset shifts, not medical therapy or crisis intervention.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e1b4b', marginBottom: '0.4rem' }}>Is my data private?</h4>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Yes! Profiles and check-in records are automatically purged after 90 days of inactivity according to our privacy policy.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
