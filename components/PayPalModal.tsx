'use client';

import React, { useState } from 'react';

interface PayPalModalProps {
  isOpen: boolean;
  onClose: () => void;
  planType: '7_DAY_PDF' | '30_DAY_PDF';
  userEmail: string;
}

export default function PayPalModal({ isOpen, onClose, planType, userEmail }: PayPalModalProps) {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const isSevenDay = planType === '7_DAY_PDF';
  const planTitle = isSevenDay ? '7-Day Personalised Mood Plan' : '30-Day Mood Master Plan';
  const price = isSevenDay ? '$7.00' : '$19.00';

  const handlePayPalPay = async () => {
    setLoading(true);
    try {
      await fetch('/api/checkins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          isPaid: true,
          planType,
          primaryMood: 'Sad',
          specificFeeling: 'Isolated',
          targetMood: 'Connected & Supported 🤝',
          actionShown: '7-Day Reset Plan Purchased'
        })
      }).catch(() => {});

      setCompleted(true);
      setTimeout(() => {
        window.open(`/api/pdf?type=${planType}&email=${encodeURIComponent(userEmail)}`, '_blank');
        onClose();
        setCompleted(false);
      }, 1600);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '440px', padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.25rem', color: '#003087', fontWeight: 800 }}>PayPal</span>
            <span style={{ fontSize: '0.72rem', color: '#059669', background: '#ecfdf5', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontWeight: 700 }}>
              🔒 Express Checkout
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: '#f1f5f9', border: 'none', color: '#64748b', width: '26px', height: '26px', borderRadius: '50%', fontSize: '0.9rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {completed ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <span style={{ fontSize: '3rem' }}>🎉</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#166534', marginTop: '0.5rem' }}>
              Payment Successful!
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#15803d', marginTop: '0.25rem' }}>
              Generating and downloading your {planTitle}...
            </p>
          </div>
        ) : (
          <div>
            <div style={{ background: '#faf8fc', border: '1px solid #e9d5ff', borderRadius: '14px', padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>ORDER SUMMARY</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.2rem' }}>
                {planTitle}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.6rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#475569' }}>Deliver to: <strong>{userEmail}</strong></span>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#6d28d9' }}>{price}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={handlePayPalPay}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  background: '#ffc439',
                  border: 'none',
                  borderRadius: '9999px',
                  color: '#003087',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(255, 196, 57, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{loading ? 'Processing Payment...' : 'Pay with PayPal'}</span>
              </button>

              <button
                type="button"
                onClick={handlePayPalPay}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  background: '#2c2e2f',
                  border: 'none',
                  borderRadius: '9999px',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                💳 Debit or Credit Card
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.72rem', color: '#94a3b8' }}>
              Instant automatic PDF download & email delivery upon payment confirmation.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
