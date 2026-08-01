'use client';

import React, { useState } from 'react';
import { getAccessToken } from '@/lib/supabaseBrowser';
import { trackEvent } from '@/lib/analytics';

interface PaidPlansSectionProps {
  hideHeader?: boolean;
}

export default function PaidPlansSection({ hideHeader = false }: PaidPlansSectionProps) {
  const [loading, setLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);

  const handleBuyPlan = async (planType: '7_DAY_PDF' | '30_DAY_PDF') => {
    let email = emailInput;

    if (!email && typeof window !== 'undefined') {
      const saved = localStorage.getItem('moodflip_profile');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.email) email = parsed.email;
        } catch (e) {}
      }
    }

    if (!email) {
      setShowEmailPrompt(true);
      return;
    }

    setLoading(true);

    try {
      const token = await getAccessToken();
      if (!token) {
        alert('Please sign in to purchase a report based on your saved check-ins.');
        window.location.href = '/login';
        return;
      }
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ planType })
      });

      const data = await res.json();
      if (data.url) {
        trackEvent('paid_pdf_checkout_started', { product: planType });
        window.location.href = data.url;
      } else {
        alert(data.error || 'Unable to initiate checkout');
      }
    } catch (err) {
      console.error(err);
      alert('Checkout error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="paid-pdf-section" className="paid-pdf-section" style={{ marginTop: hideHeader ? '0.5rem' : '1.5rem' }}>
      {!hideHeader && (
        <div className="paid-section-header" style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: '#ede5fa',
            color: '#7c54d1',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: 800,
            marginBottom: '0.6rem'
          }}>
            <span>💎 PERSONALIZED MINDSET DOWNLOADS</span>
          </div>
          <h2 className="paid-section-title" style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            fontWeight: 800,
            color: '#1e1b4b',
            margin: '0.2rem 0 0.5rem 0'
          }}>
            Transform Your Mindset with a Custom PDF Report
          </h2>
          <p className="paid-section-subtitle" style={{ fontSize: '0.92rem', color: '#64748b', maxWidth: '560px', margin: '0 auto' }}>
            Tailored PDF reports based on your exact saved check-ins, generated automatically and delivered straight to your email.
          </p>
        </div>
      )}

      {showEmailPrompt && (
        <div style={{
          background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 100%)',
          border: '2px solid #c084fc',
          padding: '1.1rem 1.25rem',
          borderRadius: '20px',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 25px rgba(192, 132, 252, 0.15)'
        }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#5b21b6', marginBottom: '0.45rem' }}>
            ✉️ Enter your email address to receive your PDF download:
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="you@example.com"
              style={{
                flex: 1,
                minWidth: '220px',
                padding: '0.7rem 0.95rem',
                borderRadius: '12px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.9rem',
                outline: 'none',
                background: '#ffffff'
              }}
            />
            <button
              onClick={() => handleBuyPlan('7_DAY_PDF')}
              disabled={loading || !emailInput}
              style={{
                padding: '0.7rem 1.4rem',
                background: 'linear-gradient(135deg, #7c54d1 0%, #ec4899 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(124, 84, 209, 0.35)'
              }}
            >
              Continue to Payment →
            </button>
          </div>
        </div>
      )}

      <div className="paid-plans-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem',
        alignItems: 'stretch'
      }}>
        {/* 7-Day Featured Plan */}
        <div className="paid-plan-card day-7-card" style={{
          background: 'linear-gradient(155deg, #ffffff 0%, #f7f3ff 100%)',
          border: '2.5px solid #8b5cf6',
          borderRadius: '24px',
          padding: '1.65rem 1.4rem',
          boxShadow: '0 14px 40px rgba(139, 92, 246, 0.15)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span className="phase-badge phase-1" style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: '#ffffff',
                background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                letterSpacing: '0.03em',
                boxShadow: '0 2px 8px rgba(124, 84, 209, 0.25)'
              }}>
                🔥 POPULAR • PHASE 1 LAUNCH
              </span>
            </div>

            <h3 className="plan-card-title" style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#1e1b4b',
              margin: '0.4rem 0 0.3rem 0',
              fontFamily: "'Fraunces', Georgia, serif"
            }}>
              7-Day Personalized Mood Plan
            </h3>
            
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.9rem', lineHeight: 1.4 }}>
              Custom 7-day emotional shift roadmap based on your saved check-ins.
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.1rem' }}>
              <div className="plan-card-price purple-price" style={{ fontSize: '2.2rem', fontWeight: 900, color: '#7c3aed', lineHeight: 1 }}>
                $7<span style={{ fontSize: '1.1rem', fontWeight: 700 }}>.00</span>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through', fontWeight: 600 }}>
                $19.00
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', background: '#dcfce7', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                Save 63%
              </span>
            </div>

            <div style={{ height: '1px', background: '#e9d5ff', marginBottom: '1.1rem' }} />

            <ul className="plan-card-features" style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 1.5rem 0',
              fontSize: '0.84rem',
              color: '#334155',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem'
            }}>
              <li style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                <span style={{ color: '#8b5cf6', fontWeight: 800, fontSize: '0.95rem' }}>✨</span>
                <span>Custom 7-day emotional shift roadmap</span>
              </li>
              <li style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                <span style={{ color: '#8b5cf6', fontWeight: 800, fontSize: '0.95rem' }}>🔄</span>
                <span>Zero repeated actions within your plan</span>
              </li>
              <li style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                <span style={{ color: '#8b5cf6', fontWeight: 800, fontSize: '0.95rem' }}>⚡</span>
                <span>Instant high-resolution PDF download</span>
              </li>
              <li style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                <span style={{ color: '#8b5cf6', fontWeight: 800, fontSize: '0.95rem' }}>📩</span>
                <span>Automatic email backup copy sent</span>
              </li>
              <li style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                <span style={{ color: '#8b5cf6', fontWeight: 800, fontSize: '0.95rem' }}>📊</span>
                <span>Self-reflection & mood pattern summary</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => handleBuyPlan('7_DAY_PDF')}
            disabled={loading}
            className="plan-card-btn purple-btn"
            style={{
              width: '100%',
              padding: '0.88rem',
              borderRadius: '14px',
              border: 'none',
              background: 'linear-gradient(135deg, #7c54d1 0%, #ec4899 100%)',
              color: 'white',
              fontWeight: 800,
              fontSize: '0.92rem',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(124, 84, 209, 0.35)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <span>{loading ? 'Processing...' : 'Get My 7-Day Plan ($7)'}</span>
            <span>→</span>
          </button>
        </div>

        {/* 30-Day Plan (Phase 2) */}
        <div className="paid-plan-card day-30-card" style={{
          background: 'linear-gradient(155deg, #ffffff 0%, #f0fdf4 100%)',
          border: '1.5px solid #a7f3d0',
          borderRadius: '24px',
          padding: '1.65rem 1.4rem',
          boxShadow: '0 8px 25px rgba(16, 185, 129, 0.08)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          opacity: 0.95
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span className="phase-badge phase-2" style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: '#047857',
                background: '#dcfce7',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                letterSpacing: '0.03em'
              }}>
                🌱 PHASE 2 • COMING SOON
              </span>
            </div>

            <h3 className="plan-card-title" style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#1e293b',
              margin: '0.4rem 0 0.3rem 0',
              fontFamily: "'Fraunces', Georgia, serif"
            }}>
              30-Day Mood Master Plan
            </h3>

            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.9rem', lineHeight: 1.4 }}>
              Comprehensive 30-day habit tracker & deep emotional growth insights.
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.1rem' }}>
              <div className="plan-card-price green-price" style={{ fontSize: '2.2rem', fontWeight: 900, color: '#059669', lineHeight: 1 }}>
                $19<span style={{ fontSize: '1.1rem', fontWeight: 700 }}>.00</span>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', background: '#dcfce7', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                Full 30-Day Support
              </span>
            </div>

            <div style={{ height: '1px', background: '#bbf7d0', marginBottom: '1.1rem' }} />

            <ul className="plan-card-features" style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 1.5rem 0',
              fontSize: '0.84rem',
              color: '#475569',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem'
            }}>
              <li style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                <span style={{ color: '#059669', fontWeight: 800, fontSize: '0.95rem' }}>🗓️</span>
                <span>Full 30-day structured habit tracker</span>
              </li>
              <li style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                <span style={{ color: '#059669', fontWeight: 800, fontSize: '0.95rem' }}>🚀</span>
                <span>30+ custom actions per mood support</span>
              </li>
              <li style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                <span style={{ color: '#059669', fontWeight: 800, fontSize: '0.95rem' }}>📈</span>
                <span>Advanced emotional progress analytics</span>
              </li>
              <li style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                <span style={{ color: '#059669', fontWeight: 800, fontSize: '0.95rem' }}>⚡</span>
                <span>Instant PDF email delivery</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            disabled
            className="plan-card-btn green-btn"
            style={{
              width: '100%',
              padding: '0.88rem',
              borderRadius: '14px',
              border: '1.5px solid #a7f3d0',
              background: '#ecfdf5',
              color: '#047857',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'not-allowed', opacity: 0.72
            }}
          >
            Phase 2 · Coming Soon
          </button>
        </div>
      </div>
    </section>
  );
}
