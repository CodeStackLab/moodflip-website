'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface AdminUser {
  id: string;
  email: string;
  name?: string;
  visitCount: number;
  checkinsCount: number;
  isPaid: boolean;
  lastActiveAt: string;
}

type Tab = 'overview' | 'users' | 'reports' | 'seo' | 'adsense';

/* ─── Sidebar Nav Item ─── */
function SidebarBtn({ icon, label, active, onClick, badge }: {
  icon: string; label: string; active: boolean; onClick: () => void; badge?: string | number;
}) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '0.75rem',
      padding: '0.72rem 1rem', borderRadius: '12px', width: '100%',
      border: active ? '1.5px solid rgba(124,84,209,0.6)' : '1px solid transparent',
      background: active ? 'linear-gradient(135deg, #7c54d1 0%, #a855f7 100%)' : 'transparent',
      color: active ? '#ffffff' : 'var(--text-subtle)',
      fontWeight: active ? 800 : 600, fontSize: '0.87rem', cursor: 'pointer',
      textAlign: 'left', transition: 'all 0.18s ease', fontFamily: 'inherit',
      boxShadow: active ? '0 4px 14px rgba(124,84,209,0.3)' : 'none',
    }}>
      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge !== undefined && (
        <span style={{
          background: active ? 'rgba(255,255,255,0.25)' : '#7c54d1',
          color: active ? '#fff' : '#fff',
          fontSize: '0.68rem', fontWeight: 800, padding: '0.1rem 0.5rem',
          borderRadius: '9999px', minWidth: '22px', textAlign: 'center',
        }}>{badge}</span>
      )}
    </button>
  );
}

/* ─── Metric Card ─── */
function MetricCard({ icon, label, value, color, bg }: {
  icon: string; label: string; value: React.ReactNode; color: string; bg: string;
}) {
  return (
    <div style={{
      background: 'var(--banner-bg)', border: '1.5px solid var(--card-border)',
      borderRadius: '18px', padding: '1.3rem 1.4rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <div>
        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>{label}</div>
        <div style={{ fontSize: '1.9rem', fontWeight: 800, color, fontFamily: "'Fraunces', serif", lineHeight: 1 }}>{value}</div>
      </div>
      <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>{icon}</div>
    </div>
  );
}

/* ─── Settings Input Row ─── */
function SettingRow({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', paddingBottom: '1.4rem', borderBottom: '1px solid var(--card-border)' }}>
      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>{label}</div>
      {hint && <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', lineHeight: 1.5 }}>{hint}</div>}
      {children}
    </div>
  );
}

function SettingInput({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        padding: '0.65rem 1rem',
        background: 'var(--tile-bg)',
        border: '1.5px solid var(--card-border)',
        borderRadius: '10px',
        color: 'var(--text-main)',
        fontSize: '0.86rem',
        outline: 'none',
        width: '100%',
        maxWidth: '520px',
        fontFamily: 'inherit',
        transition: 'border-color 0.18s ease',
      }}
    />
  );
}

function SettingToggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}>
      <div
        onClick={() => onChange(!value)}
        style={{
          width: '44px', height: '24px', borderRadius: '9999px', flexShrink: 0,
          background: value ? 'linear-gradient(135deg, #7c54d1, #a855f7)' : 'var(--card-border)',
          position: 'relative', transition: 'background 0.22s ease', cursor: 'pointer',
          boxShadow: value ? '0 0 10px rgba(124,84,209,0.4)' : 'none',
        }}
      >
        <div style={{
          position: 'absolute', top: '3px',
          left: value ? 'calc(100% - 21px)' : '3px',
          width: '18px', height: '18px', borderRadius: '50%',
          background: '#ffffff',
          transition: 'left 0.22s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        }} />
      </div>
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{label}</span>
    </label>
  );
}

function SaveBtn({ onClick, saved }: { onClick: () => void; saved: boolean }) {
  return (
    <button onClick={onClick} style={{
      padding: '0.7rem 1.8rem',
      background: saved ? '#059669' : 'linear-gradient(135deg, #7c54d1, #ec4899)',
      color: '#fff', border: 'none', borderRadius: '12px',
      fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer',
      fontFamily: 'inherit', transition: 'all 0.22s ease',
      boxShadow: saved ? '0 4px 14px rgba(5,150,105,0.3)' : '0 4px 14px rgba(124,84,209,0.35)',
      display: 'flex', alignItems: 'center', gap: '0.5rem',
    }}>
      {saved ? '✅ Saved!' : '💾 Save Settings'}
    </button>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN ADMIN COMPONENT
═══════════════════════════════════════════════════ */
export default function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  // SEO settings state
  const [seoTitle, setSeoTitle] = useState('MoodFlip | Self-Reflection Utility & Mindset Shift');
  const [seoDescription, setSeoDescription] = useState('Instant self-reflection tool. Flip negative moods into positive target states with practical 60-second actions.');
  const [seoKeywords, setSeoKeywords] = useState('mood flip, self help, mindset shift, 60 second actions');
  const [ogImage, setOgImage] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('https://moodflip.coach');
  const [gscVerification, setGscVerification] = useState('');
  const [robotsIndex, setRobotsIndex] = useState(true);
  const [seoSaved, setSeoSaved] = useState(false);

  // AdSense settings state
  const [adsenseEnabled, setAdsenseEnabled] = useState(false);
  const [adsensePubId, setAdsensePubId] = useState('');
  const [adsenseTopSlot, setAdsenseTopSlot] = useState('');
  const [adsenseBottomSlot, setAdsenseBottomSlot] = useState('');
  const [adsenseAutoAds, setAdsenseAutoAds] = useState(false);
  const [adsenseSaved, setAdsenseSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/users')
      .then(async r => {
        if (r.status === 401) {
          window.location.href = '/';
          throw new Error('Unauthorized');
        }
        return r.json();
      })
      .then(d => { setUsers(d.users || []); setLoading(false); })
      .catch(() => setLoading(false));

    // Load saved settings
    const saved = localStorage.getItem('moodflip_admin_settings');
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (s.seoTitle) setSeoTitle(s.seoTitle);
        if (s.seoDescription) setSeoDescription(s.seoDescription);
        if (s.seoKeywords) setSeoKeywords(s.seoKeywords);
        if (s.gscVerification) setGscVerification(s.gscVerification);
        if (s.canonicalUrl) setCanonicalUrl(s.canonicalUrl);
        if (s.ogImage) setOgImage(s.ogImage);
        if (s.robotsIndex !== undefined) setRobotsIndex(s.robotsIndex);
        if (s.adsenseEnabled !== undefined) setAdsenseEnabled(s.adsenseEnabled);
        if (s.adsensePubId) setAdsensePubId(s.adsensePubId);
        if (s.adsenseTopSlot) setAdsenseTopSlot(s.adsenseTopSlot);
        if (s.adsenseBottomSlot) setAdsenseBottomSlot(s.adsenseBottomSlot);
        if (s.adsenseAutoAds !== undefined) setAdsenseAutoAds(s.adsenseAutoAds);
      } catch (_) {}
    }
  }, []);

  const saveSeo = () => {
    localStorage.setItem('moodflip_admin_settings', JSON.stringify({
      seoTitle, seoDescription, seoKeywords, gscVerification, canonicalUrl, ogImage, robotsIndex,
      adsenseEnabled, adsensePubId, adsenseTopSlot, adsenseBottomSlot, adsenseAutoAds,
    }));
    setSeoSaved(true);
    setTimeout(() => setSeoSaved(false), 2500);
  };

  const saveAdsense = () => {
    localStorage.setItem('moodflip_admin_settings', JSON.stringify({
      seoTitle, seoDescription, seoKeywords, gscVerification, canonicalUrl, ogImage, robotsIndex,
      adsenseEnabled, adsensePubId, adsenseTopSlot, adsenseBottomSlot, adsenseAutoAds,
    }));
    setAdsenseSaved(true);
    setTimeout(() => setAdsenseSaved(false), 2500);
  };

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.name || '').toLowerCase().includes(search.toLowerCase())
  );

  const paidCount = users.filter(u => u.isPaid).length;
  const totalCheckins = users.reduce((sum, u) => sum + u.checkinsCount, 0);

  return (
    <div className="site-shell">
      <Header />

      <main style={{ maxWidth: '1260px', margin: '1.5rem auto', padding: '0 0.5rem' }}>
        <div style={{
          background: 'var(--card-bg)',
          border: '1.5px solid var(--card-border)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.07)',
          display: 'flex',
          minHeight: '720px',
          overflow: 'hidden',
          color: 'var(--text-main)',
          position: 'relative',
        }}>

          {/* ━━━━━ LEFT SIDEBAR ━━━━━ */}
          <div style={{
            flex: '0 0 262px', minWidth: '220px',
            background: 'var(--banner-bg)',
            borderRight: '1.5px solid var(--card-border)',
            padding: '1.85rem 1.1rem',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', gap: '1.25rem',
          }}>
            <div>
              {/* Section label */}
              <div style={{
                fontSize: '0.68rem', fontWeight: 900, color: '#7c54d1',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                marginBottom: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
                paddingLeft: '0.25rem',
              }}>
                🛡️ ADMINISTRATION
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <SidebarBtn icon="📊" label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                <SidebarBtn icon="👥" label="Manage Users" active={activeTab === 'users'} onClick={() => setActiveTab('users')} badge={users.length} />
                <SidebarBtn icon="💳" label="Financial & Sales" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} badge={paidCount > 0 ? paidCount : undefined} />

                {/* Divider */}
                <div style={{ height: '1px', background: 'var(--card-border)', margin: '0.6rem 0.25rem' }} />
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase', paddingLeft: '0.25rem', marginBottom: '0.15rem' }}>
                  Marketing & SEO
                </div>
                <SidebarBtn icon="🔍" label="SEO & Google Search" active={activeTab === 'seo'} onClick={() => setActiveTab('seo')} />
                <SidebarBtn icon="💰" label="AdSense Settings" active={activeTab === 'adsense'} onClick={() => setActiveTab('adsense')} />

                {/* Divider */}
                <div style={{ height: '1px', background: 'var(--card-border)', margin: '0.6rem 0.25rem' }} />
                <a href="/profile" style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.72rem 1rem', borderRadius: '12px',
                  border: '1px solid var(--card-border)', background: 'var(--tile-bg)',
                  color: 'var(--text-subtle)', fontWeight: 600, fontSize: '0.87rem',
                  textDecoration: 'none',
                }}>
                  <span>👤</span> User Dashboard
                </a>
              </div>
            </div>

            {/* Sidebar footer — logout */}
            <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0 0.25rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                  color: 'white', fontWeight: 900, fontSize: '0.88rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(124,84,209,0.35)',
                }}>A</div>
                <div>
                  <div style={{ fontSize: '0.83rem', fontWeight: 800, color: 'var(--text-main)' }}>Admin</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>admin@moodflip.coach</div>
                </div>
              </div>
              <button
                onClick={() => { localStorage.removeItem('moodflip_profile'); window.location.href = '/'; }}
                style={{
                  width: '100%', padding: '0.65rem', fontFamily: 'inherit',
                  background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                  color: '#dc2626', borderRadius: '12px', fontWeight: 800,
                  fontSize: '0.84rem', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  transition: 'background 0.18s ease',
                }}
              >
                🚪 Sign Out
              </button>
            </div>
          </div>

          {/* ━━━━━ RIGHT CONTENT ━━━━━ */}
          <div style={{ flex: 1, padding: '2rem 2.2rem', overflowY: 'auto', minWidth: 0 }}>

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <>
                <div style={{ marginBottom: '1.75rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-subtle)', letterSpacing: '0.04em' }}>Operations Console • Administration</div>
                  <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0 0 0' }}>System Overview</h1>
                </div>

                {/* Metric cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.1rem', marginBottom: '2rem' }}>
                  <MetricCard icon="👥" label="Total Users" value={users.length} color="#7c54d1" bg="#ede5fa" />
                  <MetricCard icon="💳" label="Paid Subscribers" value={paidCount} color="#059669" bg="#dcfce7" />
                  <MetricCard icon="📋" label="Total Check-ins" value={totalCheckins} color="#0ea5e9" bg="#e0f2fe" />
                  <MetricCard icon="🔒" label="System Status" value="🟢 Healthy" color="#047857" bg="#d1fae5" />
                </div>

                {/* Quick links */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                  {[
                    { icon: '🔍', title: 'SEO Settings', desc: 'Google Search Console, meta tags, sitemap', tab: 'seo' as Tab },
                    { icon: '💰', title: 'AdSense Settings', desc: 'Enable ads, add publisher ID and slot codes', tab: 'adsense' as Tab },
                    { icon: '👥', title: 'User Management', desc: 'View, search and manage all user profiles', tab: 'users' as Tab },
                    { icon: '📊', title: 'Financial Reports', desc: 'Export check-ins and subscription data', tab: 'reports' as Tab },
                  ].map(card => (
                    <button key={card.tab} onClick={() => setActiveTab(card.tab)} style={{
                      background: 'var(--tile-bg)', border: '1.5px solid var(--card-border)',
                      borderRadius: '16px', padding: '1.2rem', cursor: 'pointer',
                      textAlign: 'left', transition: 'all 0.18s ease', fontFamily: 'inherit',
                      display: 'flex', flexDirection: 'column', gap: '0.45rem',
                    }}>
                      <div style={{ fontSize: '1.5rem' }}>{card.icon}</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>{card.title}</div>
                      <div style={{ fontSize: '0.77rem', color: 'var(--text-subtle)', lineHeight: 1.4 }}>{card.desc}</div>
                    </button>
                  ))}
                </div>

                {/* System info */}
                <div style={{ background: 'var(--banner-bg)', border: '1.5px solid var(--card-border)', borderRadius: '16px', padding: '1.25rem 1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>📋 Platform Information</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem', fontSize: '0.8rem' }}>
                    {[
                      ['Stack', 'Next.js 14, Supabase, Vercel'],
                      ['Database', 'Supabase PostgreSQL (Free Tier)'],
                      ['Email OTP', 'Custom via Supabase Auth'],
                      ['Payments', 'PayPal (Integration Ready)'],
                      ['AdSense', adsenseEnabled ? `Enabled (${adsensePubId || 'ID not set'})` : 'Disabled (configure below)'],
                      ['SEO', gscVerification ? 'Google Search Console: Verified' : 'Google Search Console: Not verified'],
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: '0.18rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>{k}</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── USERS TAB ── */}
            {activeTab === 'users' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1.25rem' }}>
                  <div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-subtle)' }}>User Management</div>
                    <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0 0 0' }}>
                      All Users <span style={{ fontSize: '1.1rem', color: '#7c54d1' }}>({users.length})</span>
                    </h1>
                  </div>
                  <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                    <button onClick={() => alert('Exporting check-ins CSV...')} style={{ padding: '0.6rem 1.1rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                      📥 Export Check-ins
                    </button>
                    <button onClick={() => alert('Exporting users CSV...')} style={{ padding: '0.6rem 1.1rem', background: 'linear-gradient(135deg, #7c54d1, #ec4899)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                      📥 Export Users
                    </button>
                  </div>
                </div>

                {/* Search */}
                <div style={{ marginBottom: '1rem' }}>
                  <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="🔍 Search by name or email..."
                    style={{ padding: '0.65rem 1rem', background: 'var(--tile-bg)', border: '1.5px solid var(--card-border)', borderRadius: '10px', color: 'var(--text-main)', fontSize: '0.86rem', outline: 'none', width: '100%', maxWidth: '380px', fontFamily: 'inherit' }}
                  />
                </div>

                {/* Table */}
                <div style={{ background: 'var(--tile-bg)', border: '1.5px solid var(--card-border)', borderRadius: '16px', overflow: 'hidden' }}>
                  {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-subtle)' }}>
                      <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🔄</div>Loading users...
                    </div>
                  ) : filteredUsers.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-subtle)' }}>
                      <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>👥</div>No users found
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                        <thead>
                          <tr style={{ background: 'var(--banner-bg)', borderBottom: '1px solid var(--card-border)' }}>
                            {['USER', 'VISITS', 'CHECK-INS', 'STATUS', 'LAST ACTIVE'].map(h => (
                              <th key={h} style={{ padding: '0.85rem 1.1rem', fontWeight: 800, color: 'var(--text-subtle)', fontSize: '0.72rem', letterSpacing: '0.06em' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map(u => (
                            <tr key={u.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                              <td style={{ padding: '0.85rem 1.1rem' }}>
                                <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>{u.name || u.email.split('@')[0]}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{u.email}</div>
                              </td>
                              <td style={{ padding: '0.85rem 1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{u.visitCount}</td>
                              <td style={{ padding: '0.85rem 1.1rem', fontWeight: 700, color: '#7c54d1' }}>{u.checkinsCount}</td>
                              <td style={{ padding: '0.85rem 1.1rem' }}>
                                {u.isPaid ? (
                                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#047857', background: '#dcfce7', border: '1px solid #86efac', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>✅ PAID</span>
                                ) : (
                                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-subtle)', background: 'var(--banner-bg)', border: '1px solid var(--card-border)', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>FREE</span>
                                )}
                              </td>
                              <td style={{ padding: '0.85rem 1.1rem', fontSize: '0.76rem', color: 'var(--text-subtle)' }}>{new Date(u.lastActiveAt).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ── REPORTS TAB ── */}
            {activeTab === 'reports' && (
              <>
                <div style={{ marginBottom: '1.75rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-subtle)' }}>Financial Dashboard</div>
                  <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0 0 0' }}>Sales & Reports</h1>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.1rem', marginBottom: '2rem' }}>
                  <MetricCard icon="💳" label="Paid Users" value={paidCount} color="#059669" bg="#dcfce7" />
                  <MetricCard icon="🆓" label="Free Users" value={users.length - paidCount} color="#0ea5e9" bg="#e0f2fe" />
                  <MetricCard icon="💰" label="Est. Revenue" value={`$${(paidCount * 7).toFixed(0)}`} color="#f59e0b" bg="#fef3c7" />
                </div>
                <div style={{ background: 'var(--banner-bg)', border: '1.5px solid var(--card-border)', borderRadius: '16px', padding: '1.5rem' }}>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Export your data as CSV for analysis in Google Sheets or Excel. Check-ins export includes mood, action, and date. Users export includes email, payment status, and activity.
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button onClick={() => alert('Exporting...')} style={{ padding: '0.7rem 1.4rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '0.86rem', cursor: 'pointer', fontFamily: 'inherit' }}>📥 Export Check-ins CSV</button>
                    <button onClick={() => alert('Exporting...')} style={{ padding: '0.7rem 1.4rem', background: 'linear-gradient(135deg, #7c54d1, #ec4899)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '0.86rem', cursor: 'pointer', fontFamily: 'inherit' }}>📥 Export Users CSV</button>
                  </div>
                </div>
              </>
            )}

            {/* ── SEO TAB ── */}
            {activeTab === 'seo' && (
              <>
                <div style={{ marginBottom: '1.75rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-subtle)' }}>Marketing & Discovery</div>
                  <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0 0 0' }}>SEO & Google Search</h1>
                </div>

                {/* Google Search Console setup guide */}
                <div style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(16,185,129,0.08))', border: '1.5px solid rgba(14,165,233,0.25)', borderRadius: '16px', padding: '1.25rem 1.4rem', marginBottom: '2rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0ea5e9', marginBottom: '0.6rem' }}>📋 Google Search Console Setup Guide</div>
                  <ol style={{ paddingLeft: '1.35rem', fontSize: '0.82rem', color: 'var(--text-subtle)', lineHeight: 2, margin: 0 }}>
                    <li>Go to <strong style={{ color: 'var(--text-main)' }}>search.google.com/search-console</strong> and sign in with your Google account</li>
                    <li>Click <strong style={{ color: 'var(--text-main)' }}>Add Property</strong> → enter <code style={{ background: 'var(--tile-bg)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem' }}>https://moodflip.coach</code></li>
                    <li>Choose <strong style={{ color: 'var(--text-main)' }}>HTML tag</strong> verification → copy the content= value</li>
                    <li>Paste the verification code below and save → then click Verify in Google</li>
                    <li>After verification, submit your sitemap: <code style={{ background: 'var(--tile-bg)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem' }}>https://moodflip.coach/sitemap.xml</code></li>
                  </ol>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '680px' }}>

                  <SettingRow label="Page Title (Title Tag)" hint="Shown in Google search results and browser tab. Keep under 60 characters.">
                    <SettingInput value={seoTitle} onChange={setSeoTitle} placeholder="MoodFlip | Self-Reflection Utility" />
                    <div style={{ fontSize: '0.72rem', color: seoTitle.length > 60 ? '#ef4444' : '#059669' }}>
                      {seoTitle.length}/60 characters
                    </div>
                  </SettingRow>

                  <SettingRow label="Meta Description" hint="Shown under the page title in Google. Keep under 160 characters for best results.">
                    <textarea value={seoDescription} onChange={e => setSeoDescription(e.target.value)}
                      rows={3} placeholder="Your site description..."
                      style={{ padding: '0.65rem 1rem', background: 'var(--tile-bg)', border: '1.5px solid var(--card-border)', borderRadius: '10px', color: 'var(--text-main)', fontSize: '0.86rem', outline: 'none', width: '100%', maxWidth: '520px', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                    <div style={{ fontSize: '0.72rem', color: seoDescription.length > 160 ? '#ef4444' : '#059669' }}>
                      {seoDescription.length}/160 characters
                    </div>
                  </SettingRow>

                  <SettingRow label="Keywords" hint="Comma-separated keywords for internal reference (Google no longer uses meta keywords for ranking).">
                    <SettingInput value={seoKeywords} onChange={setSeoKeywords} placeholder="mood flip, self help, mindset shift" />
                  </SettingRow>

                  <SettingRow label="Canonical URL" hint="Your primary domain URL (prevents duplicate content issues).">
                    <SettingInput value={canonicalUrl} onChange={setCanonicalUrl} placeholder="https://moodflip.coach" />
                  </SettingRow>

                  <SettingRow label="Google Search Console Verification" hint="Paste the content value from your Google Search Console HTML meta tag here (e.g. abc123xyz...).">
                    <SettingInput value={gscVerification} onChange={setGscVerification} placeholder="Paste GSC verification code here..." />
                    {gscVerification && (
                      <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                        ✅ Meta tag preview: {`<meta name="google-site-verification" content="${gscVerification}" />`}
                      </div>
                    )}
                  </SettingRow>

                  <SettingRow label="Open Graph Image URL" hint="Image shown when your site is shared on social media (Facebook, Twitter, WhatsApp). Recommended: 1200×630px.">
                    <SettingInput value={ogImage} onChange={setOgImage} placeholder="https://moodflip.coach/og-image.png" />
                  </SettingRow>

                  <SettingRow label="Allow Search Engine Indexing" hint="Turn OFF only if you want to hide the site from Google temporarily (e.g. during maintenance).">
                    <SettingToggle value={robotsIndex} onChange={setRobotsIndex} label={robotsIndex ? 'Indexing ON — Google can find and show this site' : 'Indexing OFF — Google is blocked (noindex)'} />
                  </SettingRow>

                  {/* Sitemap info */}
                  <div style={{ background: 'var(--tile-bg)', border: '1.5px solid var(--card-border)', borderRadius: '14px', padding: '1.1rem 1.25rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.84rem', marginBottom: '0.5rem' }}>🗺️ Sitemap & Robots.txt</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', lineHeight: 1.7 }}>
                      Your sitemap is auto-generated at: <a href="/sitemap.xml" target="_blank" style={{ color: '#7c54d1', fontWeight: 700, textDecoration: 'none' }}>moodflip.coach/sitemap.xml</a><br />
                      Robots.txt is at: <a href="/robots.txt" target="_blank" style={{ color: '#7c54d1', fontWeight: 700, textDecoration: 'none' }}>moodflip.coach/robots.txt</a><br />
                      Submit sitemap URL in Google Search Console → Sitemaps section.
                    </div>
                  </div>

                  <SaveBtn onClick={saveSeo} saved={seoSaved} />
                </div>
              </>
            )}

            {/* ── ADSENSE TAB ── */}
            {activeTab === 'adsense' && (
              <>
                <div style={{ marginBottom: '1.75rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-subtle)' }}>Monetisation</div>
                  <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0 0 0' }}>Google AdSense</h1>
                </div>

                {/* AdSense setup guide */}
                <div style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(245,158,11,0.06))', border: '1.5px solid rgba(251,191,36,0.3)', borderRadius: '16px', padding: '1.25rem 1.4rem', marginBottom: '2rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#d97706', marginBottom: '0.6rem' }}>💡 Google AdSense Setup Guide</div>
                  <ol style={{ paddingLeft: '1.35rem', fontSize: '0.82rem', color: 'var(--text-subtle)', lineHeight: 2, margin: 0 }}>
                    <li>Go to <strong style={{ color: 'var(--text-main)' }}>adsense.google.com</strong> and apply for an AdSense account</li>
                    <li>After approval, get your Publisher ID (format: <code style={{ background: 'var(--tile-bg)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem' }}>ca-pub-XXXXXXXXXXXXXXXX</code>)</li>
                    <li>Create Ad Units in AdSense dashboard for Top Banner and Bottom Banner</li>
                    <li>Copy each slot code and paste below</li>
                    <li>Add <code style={{ background: 'var(--tile-bg)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem' }}>NEXT_PUBLIC_ADSENSE_PUB_ID=ca-pub-xxx</code> and <code style={{ background: 'var(--tile-bg)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem' }}>NEXT_PUBLIC_ADSENSE_ENABLED=true</code> to your Vercel environment variables</li>
                    <li>Enable ads below to start showing them on the site</li>
                  </ol>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '680px' }}>

                  <SettingRow label="Enable Google AdSense" hint="When ON and publisher ID is set, ad slots will appear on the homepage. When OFF, no ads are shown regardless of settings.">
                    <SettingToggle
                      value={adsenseEnabled}
                      onChange={setAdsenseEnabled}
                      label={adsenseEnabled ? '✅ Ads are ENABLED — showing on site' : '⭕ Ads DISABLED — not showing on site'}
                    />
                  </SettingRow>

                  <SettingRow label="Publisher ID" hint="Your AdSense publisher ID from adsense.google.com → Account → Publisher ID. Format: ca-pub-XXXXXXXXXXXXXXXX">
                    <SettingInput value={adsensePubId} onChange={setAdsensePubId} placeholder="ca-pub-XXXXXXXXXXXXXXXX" />
                    {adsensePubId && !adsensePubId.startsWith('ca-pub-') && (
                      <div style={{ fontSize: '0.73rem', color: '#ef4444', fontWeight: 700 }}>⚠️ Publisher ID should start with ca-pub-</div>
                    )}
                    {adsensePubId && adsensePubId.startsWith('ca-pub-') && (
                      <div style={{ fontSize: '0.73rem', color: '#059669', fontWeight: 700 }}>✅ Valid publisher ID format</div>
                    )}
                  </SettingRow>

                  <SettingRow label="Top Banner Ad Slot" hint="Ad slot code for the banner that appears below the header. Create a Leaderboard (728×90) unit in AdSense.">
                    <SettingInput value={adsenseTopSlot} onChange={setAdsenseTopSlot} placeholder="1234567890" />
                  </SettingRow>

                  <SettingRow label="Bottom Banner Ad Slot" hint="Ad slot code for the banner that appears at the bottom of the page. Create another Leaderboard unit.">
                    <SettingInput value={adsenseBottomSlot} onChange={setAdsenseBottomSlot} placeholder="0987654321" />
                  </SettingRow>

                  <SettingRow label="Auto Ads" hint="Let Google automatically place ads on your site. Overrides manual slot placements. Recommended for beginners.">
                    <SettingToggle value={adsenseAutoAds} onChange={setAdsenseAutoAds} label={adsenseAutoAds ? 'Auto Ads ON — Google places ads automatically' : 'Auto Ads OFF — Using manual ad slots'} />
                  </SettingRow>

                  {/* Preview */}
                  {adsenseEnabled && adsensePubId && (
                    <div style={{ background: 'var(--tile-bg)', border: '1.5px solid var(--card-border)', borderRadius: '14px', padding: '1.1rem 1.25rem' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.84rem', marginBottom: '0.75rem' }}>📄 Generated Code Preview</div>
                      <pre style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', overflowX: 'auto', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>
{`<!-- Add to your <head> tag in layout.tsx -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePubId}" crossOrigin="anonymous"></script>

<!-- Top banner slot -->
<ins class="adsbygoogle" data-ad-client="${adsensePubId}" data-ad-slot="${adsenseTopSlot || 'YOUR_SLOT_ID'}"></ins>

<!-- Vercel env vars to add: -->
NEXT_PUBLIC_ADSENSE_ENABLED=true
NEXT_PUBLIC_ADSENSE_PUB_ID=${adsensePubId}`}
                      </pre>
                    </div>
                  )}

                  <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '0.9rem 1.1rem', fontSize: '0.78rem', color: '#dc2626', lineHeight: 1.6 }}>
                    ⚠️ <strong>AdSense Policy:</strong> Do not click your own ads. Ads will only show after Google approves your account and site. MoodFlip must meet AdSense content policies before approval.
                  </div>

                  <SaveBtn onClick={saveAdsense} saved={adsenseSaved} />
                </div>
              </>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
