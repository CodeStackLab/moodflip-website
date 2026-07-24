'use client';

import React, { useState, useEffect } from 'react';

interface SavedCheckin {
  primaryMood: string;
  subFeeling: string;
  specificFeeling: string;
  targetMood: string;
  actionShown: string;
  date: string;
}

export default function UserProfilePage() {
  const [profile, setProfile] = useState<{ email: string; name?: string } | null>(null);
  const [history, setHistory] = useState<SavedCheckin[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('moodflip_profile');
    if (saved) {
      try { setProfile(JSON.parse(saved)); } catch (e) {}
    }
    const checkins = JSON.parse(localStorage.getItem('moodflip_checkins') || '[]');
    setHistory(checkins);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('moodflip_profile');
    window.location.href = '/';
  };

  if (!profile) {
    return (
      <div style={{ maxWidth: '440px', margin: '3rem auto', padding: '0 1rem', textAlign: 'center' }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid rgba(139, 92, 246, 0.18)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 50px rgba(139, 92, 246, 0.08)'
        }}>
          <span style={{ fontSize: '2.5rem' }}>👤</span>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.5rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.5rem' }}>
            No Profile Signed In
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', marginBottom: '1.5rem' }}>
            Register or sign in to view your saved check-in history and PDF downloads.
          </p>
          <a
            href="/login"
            style={{
              display: 'block',
              padding: '0.85rem',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              color: 'white',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 6px 18px rgba(139, 92, 246, 0.3)'
            }}
          >
            Go to Login / Registration Page ✨
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{
        background: '#ffffff',
        border: '1px solid rgba(139, 92, 246, 0.15)',
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: '0 20px 50px rgba(139, 92, 246, 0.06)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8b5cf6', background: '#f5f3ff', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
              USER DASHBOARD
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.85rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.35rem' }}>
              Welcome back, {profile.name || profile.email.split('@')[0]}!
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.15rem' }}>
              Account Email: <strong>{profile.email}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            style={{
              padding: '0.65rem 1.1rem',
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '12px',
              color: '#64748b',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Sign Out 🚪
          </button>
        </div>

        {/* User Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#fcfbfe', border: '1.5px solid #ddd6fe', borderRadius: '16px', padding: '1.1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6d28d9' }}>SAVED CHECK-INS</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.2rem' }}>{history.length}</div>
          </div>

          <div style={{ background: '#f8fafc', border: '1.5px solid #ecfdf5', borderRadius: '16px', padding: '1.1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857' }}>7-DAY PLAN STATUS</div>
            <a
              href={`/api/pdf?type=7_DAY_PDF&email=${encodeURIComponent(profile.email)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.88rem', fontWeight: 800, color: '#059669', display: 'inline-block', marginTop: '0.5rem', textDecoration: 'none' }}
            >
              📥 Download 7-Day PDF ($7) &rarr;
            </a>
          </div>

          <div style={{ background: '#faf8fc', border: '1.5px solid #fbcfe8', borderRadius: '16px', padding: '1.1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#be185d' }}>30-DAY MASTER PLAN</div>
            <a
              href={`/api/pdf?type=30_DAY_PDF&email=${encodeURIComponent(profile.email)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.88rem', fontWeight: 800, color: '#be185d', display: 'inline-block', marginTop: '0.5rem', textDecoration: 'none' }}
            >
              📥 Download 30-Day PDF ($19) &rarr;
            </a>
          </div>
        </div>

        {/* Saved Mood Check-ins History */}
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '1rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
          Your Saved Mood Check-in History
        </h2>

        {history.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {history.map((entry, idx) => (
              <div key={idx} style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '1rem 1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#fee2e2', color: '#991b1b', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                      {entry.primaryMood} &bull; {entry.specificFeeling}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>&rarr;</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#15803d', background: '#dcfce7', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                      {entry.targetMood}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '0.4rem', fontWeight: 500 }}>
                    💡 <strong>Action:</strong> {entry.actionShown}
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                  {new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: '#94a3b8' }}>
            No saved mood check-ins recorded yet. Flip a mood on the homepage to start tracking!
          </div>
        )}
      </div>
    </div>
  );
}
