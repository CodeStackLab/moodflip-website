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

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your local check-in history?')) {
      localStorage.removeItem('moodflip_checkins');
      setHistory([]);
    }
  };

  if (!profile) {
    return (
      <div style={{ maxWidth: '440px', margin: '3.5rem auto', padding: '0 1rem', textAlign: 'center' }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid rgba(139, 92, 246, 0.18)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 50px rgba(139, 92, 246, 0.08)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: 'white',
            marginBottom: '1rem',
            boxShadow: '0 8px 20px rgba(139, 92, 246, 0.25)'
          }}>
            👤
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.65rem', fontWeight: 800, color: '#1e1b4b' }}>
            User Account Profile
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.35rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            Sign in or create your profile to view your saved check-in history & PDF downloads.
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

  const initial = (profile.name || profile.email)[0].toUpperCase();

  return (
    <div style={{ maxWidth: '960px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{
        background: '#ffffff',
        border: '1px solid rgba(139, 92, 246, 0.16)',
        borderRadius: '24px',
        padding: '2rem 1.75rem',
        boxShadow: '0 20px 50px rgba(139, 92, 246, 0.06)'
      }}>
        
        {/* User Header Profile */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '1.75rem',
          borderBottom: '1.5px solid #f1f5f9',
          paddingBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Avatar Circle */}
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(139, 92, 246, 0.25)',
              flexShrink: 0
            }}>
              {initial}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.15rem 0.6rem', borderRadius: '9999px' }}>
                  🟢 ACTIVE PROFILE
                </span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6d28d9', background: '#f5f3ff', padding: '0.15rem 0.6rem', borderRadius: '9999px' }}>
                  USER DASHBOARD
                </span>
              </div>

              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.75rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.25rem' }}>
                Welcome back, {profile.name || profile.email.split('@')[0]}!
              </h1>
              <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '0.1rem' }}>
                Account Email: <strong>{profile.email}</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <a
              href="/"
              style={{
                padding: '0.65rem 1rem',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                borderRadius: '12px',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.84rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <span>✨ New Check-in</span>
            </a>

            <button
              type="button"
              onClick={handleSignOut}
              style={{
                padding: '0.65rem 1rem',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '12px',
                color: '#64748b',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer'
              }}
            >
              Sign Out 🚪
            </button>
          </div>
        </div>

        {/* Dashboard Grid Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.15rem',
          marginBottom: '2.25rem'
        }}>
          {/* Card 1: Check-in Count */}
          <div style={{
            background: '#fcfbfe',
            border: '1.5px solid #ddd6fe',
            borderRadius: '18px',
            padding: '1.25rem'
          }}>
            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#6d28d9', letterSpacing: '0.04em' }}>TOTAL SAVED CHECK-INS</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.2rem' }}>{history.length}</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.25rem' }}>Emotional check-ins logged on this device</div>
          </div>

          {/* Card 2: 7-Day Plan */}
          <div style={{
            background: '#f8fafc',
            border: '1.5px solid #a7f3d0',
            borderRadius: '18px',
            padding: '1.25rem'
          }}>
            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#047857', letterSpacing: '0.04em' }}>7-DAY EMOTIONAL PLAN ($7)</div>
            <p style={{ fontSize: '0.78rem', color: '#475569', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
              Personalized PDF action guide tailored to your recent check-in.
            </p>
            <a
              href={`/api/pdf?type=7_DAY_PDF&email=${encodeURIComponent(profile.email)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.5rem 0.85rem',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.8rem',
                textDecoration: 'none',
                boxShadow: '0 4px 10px rgba(16, 185, 129, 0.25)'
              }}
            >
              📥 Download 7-Day PDF &rarr;
            </a>
          </div>

          {/* Card 3: 30-Day Master Plan */}
          <div style={{
            background: '#faf8fc',
            border: '1.5px solid #fbcfe8',
            borderRadius: '18px',
            padding: '1.25rem'
          }}>
            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#be185d', letterSpacing: '0.04em' }}>30-DAY MASTER PLAN ($19)</div>
            <p style={{ fontSize: '0.78rem', color: '#475569', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
              Comprehensive 30-day emotional regulation & mindset roadmap.
            </p>
            <a
              href={`/api/pdf?type=30_DAY_PDF&email=${encodeURIComponent(profile.email)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.5rem 0.85rem',
                background: 'linear-gradient(135deg, #ec4899, #be185d)',
                color: 'white',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.8rem',
                textDecoration: 'none',
                boxShadow: '0 4px 10px rgba(236, 72, 153, 0.25)'
              }}
            >
              📥 Download 30-Day PDF &rarr;
            </a>
          </div>
        </div>

        {/* History Header & Action bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.15rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e1b4b', fontFamily: "'Playfair Display', Georgia, serif" }}>
            Your Saved Mood Check-in History
          </h2>
          {history.length > 0 && (
            <button
              type="button"
              onClick={handleClearHistory}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Clear Local History
            </button>
          )}
        </div>

        {/* History Item Cards */}
        {history.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {history.map((entry, idx) => (
              <div key={idx} style={{
                background: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: '16px',
                padding: '1.15rem 1.35rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{
                      background: '#fee2e2',
                      color: '#b91c1c',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px',
                      textTransform: 'uppercase'
                    }}>
                      {entry.primaryMood} &bull; {entry.specificFeeling || entry.subFeeling}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>&rarr;</span>
                    <span style={{
                      background: '#dcfce7',
                      color: '#15803d',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px'
                    }}>
                      {entry.targetMood} ✨
                    </span>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                    {entry.date}
                  </span>
                </div>

                <div style={{
                  fontSize: '0.85rem',
                  color: '#334155',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  lineHeight: 1.5
                }}>
                  <strong style={{ color: '#8b5cf6' }}>💡 60-Sec Action:</strong> {entry.actionShown}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: '#f8fafc',
            border: '2px dashed #cbd5e1',
            borderRadius: '16px',
            padding: '2.5rem',
            textAlign: 'center',
            color: '#64748b'
          }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>💫</span>
            <p style={{ fontSize: '0.92rem', fontWeight: 700, color: '#334155' }}>No Check-in History Recorded Yet</p>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem', marginBottom: '1.15rem' }}>
              Select how you feel on the home page to start your first 60-second mood flip.
            </p>
            <a
              href="/"
              style={{
                display: 'inline-block',
                padding: '0.65rem 1.25rem',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                color: 'white',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(139, 92, 246, 0.25)'
              }}
            >
              Start First Check-in Now ✨
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
