'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAccessToken, supabaseBrowser } from '@/lib/supabaseBrowser';
import { trackEvent } from '@/lib/analytics';

interface SavedCheckin {
  primaryMood: string;
  subFeeling: string;
  specificFeeling: string;
  targetMood: string;
  actionShown: string;
  date: string;
}

interface Purchase {
  id: string;
  productType: '7_DAY_PDF' | '30_DAY_PDF';
  pdfUrl: string | null;
  status: string;
}

export default function UserProfilePage() {
  const [profile, setProfile] = useState<{ email: string; name?: string } | null>(null);
  const [history, setHistory] = useState<SavedCheckin[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'plans'>('overview');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    let active = true;
    const loadProfile = async () => {
      const token = await getAccessToken();
      if (!token && active) {
        localStorage.removeItem('moodflip_profile');
        setProfile(null);
        return;
      }
      if (token) {
        const response = await fetch('/api/purchases', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok && active) {
          const data = await response.json();
          setPurchases(data.purchases || []);
        }
      }
    };
    const saved = localStorage.getItem('moodflip_profile');
    if (saved) {
      try { setProfile(JSON.parse(saved)); } catch (e) {}
    }
    const checkins = JSON.parse(localStorage.getItem('moodflip_checkins') || '[]');
    setHistory(checkins);
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setPaymentSuccess(true);
      trackEvent('paid_pdf_purchase_completed');
    }
    loadProfile();
    return () => { active = false; };
  }, []);

  const handleSignOut = async () => {
    await supabaseBrowser?.auth.signOut();
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
              Go to Login Page 🔑
            </a>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const initial = (profile.name || profile.email)[0].toUpperCase();
  const isAdmin = profile.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const sevenDayPurchase = purchases.find((purchase) => purchase.productType === '7_DAY_PDF' && purchase.pdfUrl);
  const thirtyDayPurchase = purchases.find((purchase) => purchase.productType === '30_DAY_PDF' && purchase.pdfUrl);

  return (
    <div className="site-shell">
      <Header />

      {paymentSuccess && <div role="status" style={{ maxWidth: '900px', margin: '1rem auto', padding: '1rem 1.25rem', border: '1px solid #86efac', borderRadius: '16px', color: '#065f46', background: '#ecfdf5', fontWeight: 700 }}>Payment successful. Your MoodFlip Report is ready to download. A copy has also been emailed to you.</div>}

      <main style={{ maxWidth: '1240px', margin: '1.5rem auto', padding: '0 0.5rem' }}>
        {/* EXECUTIVE 2-COLUMN SAAS SIDEBAR CONTAINER */}
        <div style={{
          background: 'var(--card-bg)',
          border: '1.5px solid var(--card-border)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
          display: 'flex',
          flexWrap: 'wrap',
          minHeight: '680px',
          overflow: 'hidden',
          color: 'var(--text-main)'
        }}>

          {/* ━━━━━ LEFT SIDEBAR ━━━━━ */}
          <div style={{
            flex: '0 0 270px',
            background: 'var(--banner-bg)',
            borderRight: '1.5px solid var(--card-border)',
            padding: '1.75rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}>
            <div>
              {/* Header Title */}
              <div style={{
                fontSize: '0.74rem',
                fontWeight: 900,
                color: '#7c54d1',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <span>✨ USER DASHBOARD</span>
              </div>

              {/* Navigation Options List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <button
                  onClick={() => setActiveTab('overview')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: activeTab === 'overview' ? '1.5px solid #7c54d1' : '1px solid transparent',
                    background: activeTab === 'overview' ? 'linear-gradient(135deg, #7c54d1 0%, #ec4899 100%)' : 'transparent',
                    color: activeTab === 'overview' ? '#ffffff' : 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>👤</span> My Overview
                </button>

                <button
                  onClick={() => setActiveTab('history')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: activeTab === 'history' ? '1.5px solid #7c54d1' : '1px solid transparent',
                    background: activeTab === 'history' ? 'linear-gradient(135deg, #7c54d1 0%, #ec4899 100%)' : 'transparent',
                    color: activeTab === 'history' ? '#ffffff' : 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>📋</span> Check-in History ({history.length})
                </button>

                <button
                  onClick={() => setActiveTab('plans')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: activeTab === 'plans' ? '1.5px solid #7c54d1' : '1px solid transparent',
                    background: activeTab === 'plans' ? 'linear-gradient(135deg, #7c54d1 0%, #ec4899 100%)' : 'transparent',
                    color: activeTab === 'plans' ? '#ffffff' : 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>📘</span> PDF Mindset Plans
                </button>

                {isAdmin && (
                  <a
                    href="/admin"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid #4c1d95',
                      background: '#1e1b4b',
                      color: '#c084fc',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                      marginTop: '0.5rem'
                    }}
                  >
                    <span>🛡️</span> Admin Panel →
                  </a>
                )}
              </div>
            </div>

            {/* BOTTOM SIDEBAR FOOTER: USER PROFILE CARD & LOGOUT BUTTON */}
            <div style={{
              borderTop: '1px solid var(--card-border)',
              paddingTop: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {initial}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {profile.name || profile.email.split('@')[0]}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>{profile.email}</div>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#dc2626',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>🚪</span> Sign Out / Logout
              </button>
            </div>
          </div>

          {/* ━━━━━ RIGHT MAIN WORKSPACE ━━━━━ */}
          <div style={{ flex: 1, padding: '2rem 2.2rem', overflowY: 'auto' }}>

            {/* Top Workspace Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.75rem',
              borderBottom: '1px solid var(--card-border)',
              paddingBottom: '1.25rem'
            }}>
              <div>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-subtle)' }}>
                  User Account Console • Account Overview
                </div>
                <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0 0 0' }}>
                  Welcome back, {profile.name || profile.email.split('@')[0]}!
                </h1>
              </div>

              <a
                href="/"
                style={{
                  padding: '0.65rem 1.25rem',
                  background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.86rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(124, 84, 209, 0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                ✨ New Check-In
              </a>
            </div>

            {/* METRICS ROW */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: 'var(--banner-bg)',
                border: '1.5px solid var(--card-border)',
                borderRadius: '20px',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>Total Saved Check-ins</div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#7c54d1', fontFamily: "'Fraunces', serif" }}>{history.length}</div>
                </div>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ede5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                  📊
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(5, 150, 105, 0.05))',
                border: '1.5px solid #a7f3d0',
                borderRadius: '20px',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase' }}>7-Day Emotional Plan ($7)</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#059669', marginTop: '0.3rem' }}>Custom PDF Guide</div>
                </div>
                <a
                  href={sevenDayPurchase?.pdfUrl || '/pricing'}
                  target="_blank"
                  onClick={() => sevenDayPurchase && trackEvent('pdf_delivery_download', { product: '7_DAY_PDF' })}
                  style={{
                    padding: '0.45rem 0.85rem',
                    background: '#059669',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.76rem',
                    textDecoration: 'none'
                  }}
                >
                  {sevenDayPurchase ? 'Download →' : 'View plan →'}
                </a>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(249, 115, 22, 0.05))',
                border: '1.5px solid var(--card-border)',
                borderRadius: '20px',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>30-Day Master Plan ($19)</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ec4899', marginTop: '0.3rem' }}>Full Roadmap PDF</div>
                </div>
                <a
                  href={thirtyDayPurchase?.pdfUrl || '/pricing'}
                  target="_blank"
                  onClick={() => thirtyDayPurchase && trackEvent('pdf_delivery_download', { product: '30_DAY_PDF' })}
                  style={{
                    padding: '0.45rem 0.85rem',
                    background: '#ec4899',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.76rem',
                    textDecoration: 'none'
                  }}
                >
                  {thirtyDayPurchase ? 'Download →' : 'View plan →'}
                </a>
              </div>
            </div>

            {/* CHECK-IN HISTORY TIMELINE SECTION */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem'
            }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Your Saved Mood Check-in History ({history.length})
              </h2>

              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-subtle)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Clear History
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div style={{
                background: 'var(--tile-bg)',
                border: '1.5px solid var(--card-border)',
                borderRadius: '20px',
                padding: '3.5rem 2rem',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>🌱</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>No Check-ins Logged Yet</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-subtle)', marginTop: '0.35rem', marginBottom: '1.25rem' }}>
                  Select your mood on the home page to start building your 7-day emotional clarity roadmap.
                </p>
                <a
                  href="/"
                  style={{
                    display: 'inline-block',
                    padding: '0.7rem 1.4rem',
                    background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                    color: 'white',
                    borderRadius: '12px',
                    fontWeight: 800,
                    fontSize: '0.86rem',
                    textDecoration: 'none'
                  }}
                >
                  Log First Check-In ✨
                </a>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {history.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--tile-bg)',
                      border: '1.5px solid var(--card-border)',
                      borderRadius: '18px',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        <span style={{ color: '#ef4444', textTransform: 'uppercase' }}>{item.primaryMood} • {item.specificFeeling}</span>
                        <span>→</span>
                        <span style={{ color: '#059669', background: '#dcfce7', padding: '0.15rem 0.55rem', borderRadius: '9999px', fontSize: '0.78rem' }}>
                          {item.targetMood} ✨
                        </span>
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-subtle)' }}>
                        {item.date ? new Date(item.date).toLocaleDateString() : 'Recent'}
                      </div>
                    </div>

                    <div style={{
                      background: 'var(--banner-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '12px',
                      padding: '0.85rem 1rem',
                      fontSize: '0.85rem',
                      color: 'var(--text-main)',
                      lineHeight: 1.5
                    }}>
                      💡 <strong>60-Sec Action:</strong> {item.actionShown}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
