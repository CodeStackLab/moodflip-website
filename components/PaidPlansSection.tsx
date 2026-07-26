'use client';

import React, { useState } from 'react';

export default function PaidPlansSection() {
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
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, planType })
      });

      const data = await res.json();
      if (data.url) {
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
    <section id="paid-pdf-section" className="paid-pdf-section" style={{ marginTop: '1.5rem' }}>
      <div className="paid-section-header" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <span className="paid-header-icon" style={{ fontSize: '2rem' }}>📘</span>
        <h2 className="paid-section-title" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e1b4b', margin: '0.3rem 0' }}>
          Personalized MoodFlip Downloads
        </h2>
        <p className="paid-section-subtitle" style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
          Purchase a tailored PDF plan based on your saved mood check-ins with automatic email delivery.
        </p>
      </div>

      {showEmailPrompt && (
        <div style={{ background: '#f5f3ff', border: '1.5px solid #c084fc', padding: '1rem', borderRadius: '16px', marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#5b21b6', marginBottom: '0.35rem' }}>
            Enter your email address to receive your PDF download:
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="you@example.com"
              style={{
                flex: 1,
                padding: '0.65rem 0.85rem',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
            <button
              onClick={() => handleBuyPlan('7_DAY_PDF')}
              disabled={loading || !emailInput}
              style={{
                padding: '0.65rem 1.25rem',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <div className="paid-plans-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {/* 7-Day Plan */}
        <div className="paid-plan-card day-7-card" style={{ background: '#ffffff', border: '2px solid #ddd6fe', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 8px 25px rgba(139, 92, 246, 0.08)', position: 'relative' }}>
          <span className="phase-badge phase-1" style={{ fontSize: '0.68rem', fontWeight: 800, color: '#6d28d9', background: '#f5f3ff', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
            PHASE 1 (LAUNCH)
          </span>
          <h3 className="plan-card-title" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', margin: '0.6rem 0 0.2rem 0' }}>7-Day Personalized Mood Plan</h3>
          <div className="plan-card-price purple-price" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#7c3aed', marginBottom: '0.85rem' }}>$7.00</div>
          <ul className="plan-card-features" style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <li>✓ Custom 7-day emotional shift roadmap</li>
            <li>✓ No repeated actions within your plan</li>
            <li>✓ Automatic PDF email delivery</li>
            <li>✓ Instant high-resolution PDF download</li>
          </ul>
          <button
            type="button"
            onClick={() => handleBuyPlan('7_DAY_PDF')}
            disabled={loading}
            className="plan-card-btn purple-btn"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              color: 'white',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)'
            }}
          >
            {loading ? 'Processing...' : 'Get 7-Day PDF Plan ($7)'}
          </button>
        </div>

        {/* 30-Day Plan (Phase 2) */}
        <div className="paid-plan-card day-30-card" style={{ background: '#fafafa', border: '1.5px solid #e2e8f0', borderRadius: '20px', padding: '1.5rem', opacity: 0.85 }}>
          <span className="phase-badge phase-2" style={{ fontSize: '0.68rem', fontWeight: 800, color: '#047857', background: '#ecfdf5', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
            PHASE 2 (LAUNCHING SOON)
          </span>
          <h3 className="plan-card-title" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#334155', margin: '0.6rem 0 0.2rem 0' }}>30-Day Mood Master Plan</h3>
          <div className="plan-card-price green-price" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669', marginBottom: '0.85rem' }}>$19.00</div>
          <ul className="plan-card-features" style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', fontSize: '0.82rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <li>✓ Full 30-day structured habit tracker</li>
            <li>✓ 30+ actions per mood support</li>
            <li>✓ Advanced emotional progress insights</li>
            <li>✓ Instant email PDF delivery</li>
          </ul>
          <button
            type="button"
            onClick={() => handleBuyPlan('30_DAY_PDF')}
            disabled={loading}
            className="plan-card-btn green-btn"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '12px',
              border: 'none',
              background: '#059669',
              color: 'white',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Processing...' : 'Get 30-Day Master PDF ($19)'}
          </button>
        </div>
      </div>
    </section>
  );
}
