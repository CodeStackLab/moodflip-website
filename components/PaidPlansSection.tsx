'use client';

import React, { useState } from 'react';
import PayPalModal from './PayPalModal';

export default function PaidPlansSection() {
  const [isPayPalOpen, setIsPayPalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'7_DAY_PDF' | '30_DAY_PDF'>('7_DAY_PDF');
  const [userEmail, setUserEmail] = useState('');

  const handlePlanClick = (plan: '7_DAY_PDF' | '30_DAY_PDF') => {
    setSelectedPlan(plan);
    const saved = localStorage.getItem('moodflip_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.email) {
          setUserEmail(parsed.email);
          setIsPayPalOpen(true);
          return;
        }
      } catch (e) {}
    }
    // Not logged in -> redirect to dedicated /login page!
    window.location.href = '/login';
  };

  return (
    <section id="paid-pdf-section" className="paid-pdf-section">
      <div className="paid-section-header">
        <span className="paid-header-icon">📘</span>
        <h2 className="paid-section-title">
          Personalised MoodFlip Downloads
        </h2>
        <p className="paid-section-subtitle">
          Register your account & purchase a tailored PDF plan based on your saved mood check-ins.
        </p>
      </div>

      <div className="paid-plans-grid">
        {/* 7-Day Plan */}
        <div className="paid-plan-card day-7-card">
          <span className="phase-badge phase-1">
            PHASE 1 (LAUNCH)
          </span>
          <h3 className="plan-card-title">7-Day Personalised Mood Plan</h3>
          <div className="plan-card-price purple-price">$7.00</div>
          <ul className="plan-card-features">
            <li>Custom 7-day emotional shift roadmap</li>
            <li>No repeated actions within the plan</li>
            <li>Instant delivery directly to your email</li>
            <li>Downloadable high-resolution PDF format</li>
          </ul>
          <button
            type="button"
            onClick={() => handlePlanClick('7_DAY_PDF')}
            className="plan-card-btn purple-btn"
            style={{ width: '100%', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Get 7-Day PDF Plan ($7)
          </button>
        </div>

        {/* 30-Day Plan */}
        <div className="paid-plan-card day-30-card">
          <span className="phase-badge phase-2">
            PHASE 2 READY
          </span>
          <h3 className="plan-card-title">30-Day Mood Master Plan</h3>
          <div className="plan-card-price green-price">$19.00</div>
          <ul className="plan-card-features">
            <li>Full 30-day structured habit tracker</li>
            <li>30+ actions per mood support</li>
            <li>Advanced emotional progress insights</li>
            <li>Instant email PDF delivery</li>
          </ul>
          <button
            type="button"
            onClick={() => handlePlanClick('30_DAY_PDF')}
            className="plan-card-btn green-btn"
            style={{ width: '100%', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Get 30-Day Master PDF ($19)
          </button>
        </div>
      </div>

      {/* PayPal Checkout Modal (if logged in) */}
      <PayPalModal
        isOpen={isPayPalOpen}
        onClose={() => setIsPayPalOpen(false)}
        planType={selectedPlan}
        userEmail={userEmail}
      />
    </section>
  );
}
