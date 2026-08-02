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
    const checkins = JSON.parse(localStorage.getItem('moodflip_history') || localStorage.getItem('moodflip_checkins') || '[]');
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
    if (confirm('Are you sure you want to clear your saved check-in history?')) {
      localStorage.removeItem('moodflip_history');
      localStorage.removeItem('moodflip_checkins');
      setHistory([]);
    }
  };

  if (!profile) {
    return (
      <div className="site-shell">
        <Header />

        <style>{`
          .unauth-card {
            max-width: 460px; margin: 4rem auto; padding: 3rem 2rem;
            background: var(--card-bg); border: 1.5px solid var(--card-border);
            border-radius: 28px; text-align: center;
            box-shadow: 0 32px 80px rgba(74,57,102,0.12);
          }
          .unauth-icon {
            width: 64px; height: 64px; border-radius: 20px;
            background: linear-gradient(135deg, #6c5ce7, #ec4899);
            color: white; font-size: 1.8rem; display: inline-flex;
            align-items: center; justify-content: center; margin-bottom: 1.25rem;
            box-shadow: 0 8px 24px rgba(108,92,231,0.35);
          }
        `}</style>

        <main className="wrap">
          <div className="unauth-card">
            <div className="unauth-icon">👤</div>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.75rem', fontWeight: 640, color: 'var(--text-main)', margin: '0 0 0.5rem' }}>
              User Mindset Dashboard
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              Sign in or create your profile to view your saved check-in history &amp; custom PDF mindset plans.
            </p>
            <a
              href="/login"
              style={{
                display: 'block', padding: '0.88rem',
                background: 'linear-gradient(135deg, #6c5ce7 0%, #ec4899 100%)',
                color: 'white', borderRadius: '14px', fontWeight: 800,
                fontSize: '0.92rem', textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(108,92,231,0.35)'
              }}
            >
              Sign In to Your Account 🔑
            </a>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const initial = (profile.name || profile.email)[0].toUpperCase();
  const isAdmin = profile.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const sevenDayPurchase = purchases.find((p) => p.productType === '7_DAY_PDF' && p.pdfUrl);
  const thirtyDayPurchase = purchases.find((p) => p.productType === '30_DAY_PDF' && p.pdfUrl);

  return (
    <div className="site-shell">
      <Header />

      <style>{`
        @keyframes profFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .prof-shell {
          max-width: 1260px; margin: 1.5rem auto 4rem;
          padding: 0 0.75rem; animation: profFadeIn 0.4s ease both;
        }
        .prof-layout {
          background: var(--card-bg);
          border: 1.5px solid var(--card-border);
          border-radius: 28px;
          box-shadow: 0 24px 64px rgba(74,57,102,0.1);
          display: flex; min-height: 720px; overflow: hidden;
          color: var(--text-main);
        }
        .prof-sidebar {
          flex: 0 0 256px; min-width: 220px;
          background: linear-gradient(180deg, #181328 0%, #110d1e 100%);
          border-right: 1.5px solid rgba(255,255,255,0.08);
          padding: 1.75rem 1rem;
          display: flex; flex-direction: column;
          justify-content: space-between; gap: 1.25rem;
        }
        .prof-sidebar-brand {
          display: flex; align-items: center; gap: 0.65rem;
          padding: 0 0.25rem; margin-bottom: 1.25rem;
        }
        .prof-sidebar-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, #6c5ce7, #ec4899);
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 1.1rem; flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(108,92,231,0.4);
        }
        .prof-sidebar-name { font-size: 0.9rem; font-weight: 800; color: #f5f3ff; }
        .prof-sidebar-sub { font-size: 0.65rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.08em; }
        .prof-nav-btn {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.68rem 0.85rem; border-radius: 12px;
          width: 100%; border: none; font-family: inherit; font-weight: 700;
          font-size: 0.85rem; cursor: pointer; text-align: left;
          transition: all 0.18s ease;
        }
        .prof-nav-btn.active {
          background: linear-gradient(135deg, #6c5ce7, #ec4899);
          color: #ffffff; box-shadow: 0 4px 16px rgba(108,92,231,0.35);
        }
        .prof-nav-btn.inactive { background: transparent; color: rgba(255,255,255,0.6); }
        .prof-nav-btn.inactive:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.9); }
        .prof-admin-link {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.68rem 0.85rem; border-radius: 12px;
          background: linear-gradient(135deg, #1e1b4b, #4c1d95);
          color: #c084fc; font-weight: 800; text-decoration: none;
          font-size: 0.85rem; border: 1px solid rgba(168,85,247,0.4);
          margin-top: 0.5rem;
        }
        .prof-sidebar-footer { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem; }
        .prof-user-row { display: flex; align-items: center; gap: 0.65rem; padding: 0 0.25rem; margin-bottom: 0.75rem; }
        .prof-avatar {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #6c5ce7, #ec4899);
          color: white; font-weight: 900; font-size: 0.88rem;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .prof-user-email { font-size: 0.68rem; color: rgba(255,255,255,0.4); }
        .prof-signout-btn {
          width: 100%; padding: 0.6rem; font-family: inherit;
          background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.25);
          color: #f87171; border-radius: 12px; font-weight: 800;
          font-size: 0.82rem; cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 0.5rem; transition: all 0.18s ease;
        }
        .prof-signout-btn:hover { background: rgba(239,68,68,0.2); color: #fca5a5; }

        .prof-content { flex: 1; padding: 2.25rem 2.5rem; overflow-y: auto; min-width: 0; }
        .prof-header {
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;
          padding-bottom: 1.25rem; border-bottom: 1.5px solid var(--card-border);
        }
        .prof-eyebrow { font-size: 0.72rem; font-weight: 800; color: #6c5ce7; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.35rem; }
        .prof-title { font-family: 'Fraunces', Georgia, serif; font-size: 1.8rem; font-weight: 640; color: var(--text-main); margin: 0; }
        .prof-new-checkin-btn {
          padding: 0.65rem 1.25rem; border-radius: 12px;
          background: linear-gradient(135deg, #6c5ce7, #ec4899);
          color: white; font-weight: 800; font-size: 0.86rem; text-decoration: none;
          box-shadow: 0 4px 14px rgba(108,92,231,0.35); transition: transform 0.18s ease;
        }
        .prof-new-checkin-btn:hover { transform: translateY(-1px); }

        .prof-metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        .prof-metric-card {
          background: var(--cream-2); border: 1.5px solid var(--card-border);
          border-radius: 20px; padding: 1.25rem 1.35rem;
          display: flex; justify-content: space-between; align-items: center;
        }

        .prof-history-card {
          background: var(--cream-2); border: 1.5px solid var(--card-border);
          border-radius: 18px; padding: 1.25rem 1.5rem; margin-bottom: 0.85rem;
        }

        @media (max-width: 840px) {
          .prof-layout { flex-direction: column; min-height: unset; }
          .prof-sidebar { width: 100%; flex-direction: row; flex-wrap: wrap; padding: 1rem; }
          .prof-content { padding: 1.5rem 1rem; }
        }
      `}</style>

      {paymentSuccess && (
        <div style={{ maxWidth: '1260px', margin: '1rem auto', padding: '1rem 1.25rem', border: '1px solid #86efac', borderRadius: '16px', color: '#065f46', background: '#ecfdf5', fontWeight: 800 }}>
          ✅ Payment successful! Your custom MoodFlip PDF plan is ready to download.
        </div>
      )}

      <main className="prof-shell">
        <div className="prof-layout">

          {/* ━━━━━ SIDEBAR ━━━━━ */}
          <nav className="prof-sidebar">
            <div>
              <div className="prof-sidebar-brand">
                <div className="prof-sidebar-icon">✨</div>
                <div>
                  <div className="prof-sidebar-name">Mindset Dashboard</div>
                  <div className="prof-sidebar-sub">User Profile</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <button className={`prof-nav-btn ${activeTab === 'overview' ? 'active' : 'inactive'}`} onClick={() => setActiveTab('overview')}>
                  <span>👤</span> Overview
                </button>
                <button className={`prof-nav-btn ${activeTab === 'history' ? 'active' : 'inactive'}`} onClick={() => setActiveTab('history')}>
                  <span>📋</span> Check-in History ({history.length})
                </button>
                <button className={`prof-nav-btn ${activeTab === 'plans' ? 'active' : 'inactive'}`} onClick={() => setActiveTab('plans')}>
                  <span>📘</span> Mindset PDF Plans
                </button>
                {isAdmin && (
                  <a href="/admin" className="prof-admin-link">
                    <span>🛡️</span> Admin Panel →
                  </a>
                )}
              </div>
            </div>

            <div className="prof-sidebar-footer">
              <div className="prof-user-row">
                <div className="prof-avatar">{initial}</div>
                <div>
                  <div style={{ fontSize: '0.83rem', fontWeight: 800, color: '#f5f3ff' }}>{profile.name || profile.email.split('@')[0]}</div>
                  <div className="prof-user-email">{profile.email}</div>
                </div>
              </div>
              <button className="prof-signout-btn" onClick={handleSignOut}>
                <span>🚪</span> Sign Out
              </button>
            </div>
          </nav>

          {/* ━━━━━ CONTENT ━━━━━ */}
          <div className="prof-content">
            <div className="prof-header">
              <div>
                <div className="prof-eyebrow">User Dashboard • Mindset Profile</div>
                <h1 className="prof-title">Welcome back, {profile.name || profile.email.split('@')[0]}!</h1>
              </div>
              <a href="/" className="prof-new-checkin-btn">✨ New Check-In</a>
            </div>

            {/* Metrics */}
            <div className="prof-metrics-grid">
              <div className="prof-metric-card">
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>Saved Check-ins</div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', fontWeight: 800, color: '#6c5ce7' }}>{history.length}</div>
                </div>
                <div style={{ fontSize: '1.5rem' }}>📊</div>
              </div>

              <div className="prof-metric-card">
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase' }}>7-Day Plan ($7)</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#059669', marginTop: '0.2rem' }}>
                    {sevenDayPurchase ? 'Ready to Download' : 'Available'}
                  </div>
                </div>
                <a href={sevenDayPurchase?.pdfUrl || '/pricing'} target="_blank" rel="noreferrer" style={{ padding: '0.45rem 0.85rem', background: '#059669', color: 'white', borderRadius: '8px', fontWeight: 800, fontSize: '0.76rem', textDecoration: 'none' }}>
                  {sevenDayPurchase ? 'Download →' : 'View Plan →'}
                </a>
              </div>

              <div className="prof-metric-card">
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#ec4899', textTransform: 'uppercase' }}>30-Day Plan ($19)</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ec4899', marginTop: '0.2rem' }}>
                    {thirtyDayPurchase ? 'Ready to Download' : 'Available'}
                  </div>
                </div>
                <a href={thirtyDayPurchase?.pdfUrl || '/pricing'} target="_blank" rel="noreferrer" style={{ padding: '0.45rem 0.85rem', background: '#ec4899', color: 'white', borderRadius: '8px', fontWeight: 800, fontSize: '0.76rem', textDecoration: 'none' }}>
                  {thirtyDayPurchase ? 'Download →' : 'View Plan →'}
                </a>
              </div>
            </div>

            {/* Check-in History */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Saved Check-in History ({history.length})</h2>
              {history.length > 0 && (
                <button onClick={handleClearHistory} style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}>Clear History</button>
              )}
            </div>

            {history.length === 0 ? (
              <div style={{ background: 'var(--cream-2)', border: '1.5px solid var(--card-border)', borderRadius: '20px', padding: '3.5rem 2rem', textAlign: 'center' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>🌱</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>No Check-ins Saved Yet</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-subtle)', marginTop: '0.35rem', marginBottom: '1.25rem' }}>Select a mood on the homepage and tap Save Check-in to build your emotional roadmap.</p>
                <a href="/" className="prof-new-checkin-btn">Log First Check-In ✨</a>
              </div>
            ) : (
              <div>
                {history.map((item, idx) => (
                  <div key={idx} className="prof-history-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', fontWeight: 800 }}>
                        <span style={{ color: '#ef4444', textTransform: 'uppercase' }}>{item.primaryMood} • {item.subFeeling || item.specificFeeling}</span>
                        <span>→</span>
                        <span style={{ color: '#047857', background: '#dcfce7', border: '1px solid #86efac', padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.76rem' }}>
                          {item.targetMood} ✨
                        </span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-subtle)' }}>
                        {item.date ? new Date(item.date).toLocaleDateString() : 'Recent'}
                      </div>
                    </div>
                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '0.8rem 1rem', fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
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
