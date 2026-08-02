'use client';

import React, { useState } from 'react';
import { getAccessToken } from '@/lib/supabaseBrowser';
import { trackEvent } from '@/lib/analytics';

interface PaidPlansSectionProps {
  hideHeader?: boolean;
}

const featureIconStyle = {
  fontWeight: 900,
  fontSize: '0.72rem',
  width: '1.45rem',
  height: '1.45rem',
  borderRadius: '999px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
} as const;

export default function PaidPlansSection({ hideHeader = false }: PaidPlansSectionProps) {
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');

  const handleBuyPlan = async (planType: '7_DAY_PDF' | '30_DAY_PDF') => {
    setLoading(true);
    setNotice('');

    try {
      const token = await getAccessToken();
      if (!token) {
        setNotice('Plans are visible with no popup. Checkout needs an optional profile so the PDF can be generated and delivered.');
        return;
      }

      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ planType }),
      });

      const data = await res.json();
      if (data.url) {
        trackEvent('paid_pdf_checkout_started', { product: planType });
        window.location.href = data.url;
      } else {
        setNotice(data.error || 'Unable to initiate checkout right now. Please try again shortly.');
      }
    } catch (err) {
      console.error(err);
      setNotice('Checkout could not start right now. Please try again shortly.');
    } finally {
      setLoading(false);
    }
  };

  const sevenDayFeatures = [
    'Custom 7-day emotional shift roadmap',
    'Zero repeated actions within your plan',
    'Instant high-resolution PDF download',
    'Automatic email backup copy sent',
    'Self-reflection and mood pattern summary',
  ];

  const thirtyDayFeatures = [
    'Full 30-day structured habit tracker',
    '30+ custom actions per mood support',
    'Advanced emotional progress analytics',
    'Instant PDF email delivery',
  ];

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
            marginBottom: '0.6rem',
          }}>
            <span>PERSONALIZED MINDSET DOWNLOADS</span>
          </div>
          <h2 className="paid-section-title" style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            fontWeight: 800,
            color: '#1e1b4b',
            margin: '0.2rem 0 0.5rem 0',
          }}>
            Transform Your Mindset with a Custom PDF Report
          </h2>
          <p className="paid-section-subtitle" style={{ fontSize: '0.92rem', color: '#64748b', maxWidth: '560px', margin: '0 auto' }}>
            Tailored PDF reports based on your exact saved check-ins, generated automatically and delivered straight to your email.
          </p>
        </div>
      )}

      {notice && (
        <div style={{
          background: '#f8fafc',
          border: '1px solid #cbd5e1',
          padding: '0.9rem 1rem',
          borderRadius: '14px',
          marginBottom: '1.5rem',
          color: '#334155',
          fontSize: '0.88rem',
          fontWeight: 700,
        }}>
          {notice}
        </div>
      )}

      <div className="paid-plans-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem',
        alignItems: 'stretch',
      }}>
        <div className="paid-plan-card day-7-card" style={{
          background: 'linear-gradient(155deg, #ffffff 0%, #f7f3ff 100%)',
          border: '2.5px solid #8b5cf6',
          borderRadius: '24px',
          padding: '1.65rem 1.4rem',
          boxShadow: '0 14px 40px rgba(139, 92, 246, 0.15)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span className="plan-badge plan-7" style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: '#ffffff',
                background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                letterSpacing: '0.03em',
                boxShadow: '0 2px 8px rgba(124, 84, 209, 0.25)',
              }}>
                POPULAR
              </span>
            </div>

            <h3 className="plan-card-title" style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#1e1b4b',
              margin: '0.4rem 0 0.3rem 0',
              fontFamily: "'Fraunces', Georgia, serif",
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
              gap: '0.65rem',
            }}>
              {sevenDayFeatures.map((feature) => (
                <li key={feature} style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                  <span style={{ ...featureIconStyle, color: '#7c3aed', background: '#ede9fe' }}>OK</span>
                  <span>{feature}</span>
                </li>
              ))}
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
              gap: '0.4rem',
            }}
          >
            <span>{loading ? 'Processing...' : 'Get My 7-Day Plan ($7)'}</span>
            <span>-&gt;</span>
          </button>
        </div>

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
          opacity: 0.95,
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span className="plan-badge plan-30" style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: '#047857',
                background: '#dcfce7',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                letterSpacing: '0.03em',
              }}>
                30-DAY PLAN
              </span>
            </div>

            <h3 className="plan-card-title" style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#1e293b',
              margin: '0.4rem 0 0.3rem 0',
              fontFamily: "'Fraunces', Georgia, serif",
            }}>
              30-Day Mood Master Plan
            </h3>

            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.9rem', lineHeight: 1.4 }}>
              Comprehensive 30-day habit tracker and emotional growth insights.
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
              gap: '0.65rem',
            }}>
              {thirtyDayFeatures.map((feature) => (
                <li key={feature} style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                  <span style={{ ...featureIconStyle, color: '#047857', background: '#dcfce7' }}>OK</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => handleBuyPlan('30_DAY_PDF')}
            disabled={loading}
            className="plan-card-btn green-btn"
            style={{
              width: '100%',
              padding: '0.88rem',
              borderRadius: '14px',
              border: 'none',
              background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(5, 150, 105, 0.28)',
            }}
          >
            {loading ? 'Processing...' : 'Get My 30-Day Plan ($19)'}
          </button>
        </div>
      </div>
    </section>
  );
}
