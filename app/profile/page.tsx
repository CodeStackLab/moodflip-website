'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      <div className="site-shell">
        <Header />

        <main style={{ maxWidth: '480px', margin: '3.5rem auto', padding: '0 1rem', textAlign: 'center' }}>
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '28px',
            padding: '2.5rem 2rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.04)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: 'white',
              marginBottom: '1rem',
              boxShadow: '0 8px 20px rgba(124, 84, 209, 0.25)'
            }}>
              👤
            </div>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.65rem', fontWeight: 700, color: 'var(--text-main)' }}>
              User Account Profile
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', marginTop: '0.35rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
              Sign in or create your profile to view your saved check-in history & PDF downloads.
            </p>
            <a
              href="/login"
              style={{
                display: 'block',
                padding: '0.85rem',
                background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                color: 'white',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 6px 18px rgba(124, 84, 209, 0.3)'
              }}
            >
              Go to Login / Registration Page ✨
            </a>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const initial = (profile.name || profile.email)[0].toUpperCase();

  return (
    <div className="site-shell">
      <Header />

      <main style={{ maxWidth: '960px', margin: '2.5rem auto', padding: '0 1rem' }}>
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '28px',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.04)'
        }}>
          
          {/* User Header Profile */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem',
            marginBottom: '2rem',
            borderBottom: '1px solid var(--card-border)',
            paddingBottom: '1.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                color: '#ffffff',
                fontSize: '1.65rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 18px rgba(124, 84, 209, 0.3)',
                flexShrink: 0
              }}>
                {initial}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
                    🟢 ACTIVE PROFILE
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6750a4', background: 'var(--tile-selected-bg)', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
                    USER DASHBOARD
                  </span>
                </div>

                <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.35rem' }}>
                  Welcome back, {profile.name || profile.email.split('@')[0]}!
                </h1>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-subtle)', marginTop: '0.1rem' }}>
                  Account Email: <strong>{profile.email}</strong>
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
              {(profile.email.includes('admin') || profile.email === 'admin@moodflip.coach' || profile.email === 'admin@demo.com') && (
                <a
                  href="/admin"
                  style={{
                    padding: '0.65rem 1.1rem',
                    background: '#1e1b4b',
                    color: '#c084fc',
                    border: '1px solid #4c1d95',
                    borderRadius: '12px',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(30, 27, 75, 0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  🛡️ Admin Panel →
                </a>
              )}

              <a
                href="/"
                style={{
                  padding: '0.65rem 1.1rem',
                  background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(124, 84, 209, 0.3)'
                }}
              >
                ✨ New Check-In
              </a>

              <button
                type="button"
                onClick={handleSignOut}
                style={{
                  padding: '0.65rem 1rem',
                  background: 'var(--tile-bg)',
                  border: '1px solid var(--card-border)',
                  color: 'var(--text-subtle)',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                Sign Out 🚪
              </button>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem'
          }}>
            <div style={{
              background: 'var(--tile-bg)',
              border: '1.5px solid var(--card-border)',
              borderRadius: '20px',
              padding: '1.5rem'
            }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#a855f7', letterSpacing: '0.04em' }}>TOTAL SAVED CHECK-INS</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>{history.length}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>Emotional check-ins logged on this device</div>
            </div>

            <div style={{
              background: 'var(--tile-bg)',
              border: '1.5px solid #a7f3d0',
              borderRadius: '20px',
              padding: '1.5rem'
            }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#047857', letterSpacing: '0.04em' }}>7-DAY EMOTIONAL PLAN ($7)</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginTop: '0.25rem', marginBottom: '1rem' }}>
                Personalized PDF action guide tailored to your recent check-ins.
              </p>
              <a
                href={`/api/pdf?type=7_DAY_PDF&email=${encodeURIComponent(profile.email)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.55rem 1rem',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 10px rgba(16, 185, 129, 0.25)'
                }}
              >
                📥 Download 7-Day PDF &rarr;
              </a>
            </div>

            <div style={{
              background: 'var(--tile-bg)',
              border: '1.5px solid #fbcfe8',
              borderRadius: '20px',
              padding: '1.5rem'
            }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#be185d', letterSpacing: '0.04em' }}>30-DAY MASTER PLAN ($19)</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginTop: '0.25rem', marginBottom: '1rem' }}>
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
                  padding: '0.55rem 1rem',
                  background: 'linear-gradient(135deg, #ec4899, #be185d)',
                  color: 'white',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 10px rgba(236, 72, 153, 0.25)'
                }}
              >
                📥 Download 30-Day PDF &rarr;
              </a>
            </div>
          </div>

          {/* History Header & Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: "'Fraunces', Georgia, serif" }}>
              Your Saved Mood Check-in History
            </h2>
            {history.length > 0 && (
              <button
                type="button"
                onClick={handleClearHistory}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-subtle)',
                  fontSize: '0.8rem',
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
              {history.map((entry, idx) => (
                <div key={idx} style={{
                  background: 'var(--tile-bg)',
                  border: '1.5px solid var(--card-border)',
                  borderRadius: '18px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{
                        background: 'rgba(239, 68, 68, 0.12)',
                        color: '#ef4444',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        textTransform: 'uppercase'
                      }}>
                        {entry.primaryMood} &bull; {entry.specificFeeling || entry.subFeeling}
                      </span>
                      <span style={{ color: 'var(--text-subtle)', fontSize: '0.85rem' }}>&rarr;</span>
                      <span style={{
                        background: 'rgba(16, 185, 129, 0.12)',
                        color: '#10b981',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px'
                      }}>
                        {entry.targetMood} ✨
                      </span>
                    </div>

                    <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
                      {entry.date}
                    </span>
                  </div>

                  <div style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-main)',
                    background: 'var(--tile-selected-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '12px',
                    padding: '0.75rem 1rem',
                    lineHeight: 1.55
                  }}>
                    <strong style={{ color: '#a855f7' }}>💡 60-Sec Action:</strong> {entry.actionShown}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: 'var(--tile-bg)',
              border: '2px dashed var(--card-border)',
              borderRadius: '20px',
              padding: '2.5rem',
              textAlign: 'center',
              color: 'var(--text-subtle)'
            }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>💫</span>
              <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>No Check-in History Recorded Yet</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', marginTop: '0.2rem', marginBottom: '1.25rem' }}>
                Select how you feel on the home page to start your first 60-second mood flip.
              </p>
              <a
                href="/"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(124, 84, 209, 0.25)'
                }}
              >
                Start First Check-in Now ✨
              </a>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
