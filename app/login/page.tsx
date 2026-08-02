'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabaseBrowser } from '@/lib/supabaseBrowser';

type LoginPortalTab = 'user' | 'admin';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<LoginPortalTab>('user');

  // User Login State
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showUserPassword, setShowUserPassword] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [userSuccess, setUserSuccess] = useState(false);
  const [userError, setUserError] = useState('');

  // Admin Login State
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminSuccess, setAdminSuccess] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Handle User Login
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userPassword) return;
    setUserLoading(true);
    setUserError('');

    try {
      if (!supabaseBrowser) throw new Error('Secure sign-in is temporarily unavailable.');
      const { data, error } = await supabaseBrowser.auth.signInWithPassword({
        email: userEmail.trim().toLowerCase(),
        password: userPassword,
      });

      if (error || !data.session || !data.user.email) {
        throw new Error(error?.message || 'Invalid email or password. Please try again.');
      }

      const profile = {
        email: data.user.email,
        name: String(data.user.user_metadata?.name || data.user.email.split('@')[0]),
        lastActiveAt: new Date().toISOString(),
      };
      localStorage.setItem('moodflip_profile', JSON.stringify(profile));

      await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.session.access_token}`,
        },
        body: JSON.stringify({ name: profile.name }),
      }).catch(() => null);

      setUserSuccess(true);
      setTimeout(() => {
        window.location.href = '/profile';
      }, 1000);
    } catch (err) {
      console.error(err);
      setUserError(err instanceof Error ? err.message : 'Authentication failed. Please check your credentials.');
    } finally {
      setUserLoading(false);
    }
  };

  // Handle Admin Login
  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPassword) return;
    setAdminLoading(true);
    setAdminError('');

    try {
      const res = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data.authenticated) {
        throw new Error(data.error || 'Incorrect admin access password.');
      }

      setAdminSuccess(true);
      setTimeout(() => {
        window.location.href = '/admin';
      }, 800);
    } catch (err) {
      console.error(err);
      setAdminError(err instanceof Error ? err.message : 'Admin authentication failed.');
    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <div className="site-shell">
      <Header />

      <main style={{ maxWidth: '1180px', margin: '2.5rem auto', padding: '0 1rem' }}>
        
        {/* TOP SEGMENTED PORTAL SWITCHER */}
        <div style={{
          maxWidth: '460px',
          margin: '0 auto 2.25rem auto',
          background: 'var(--card-bg)',
          border: '1.5px solid var(--card-border)',
          borderRadius: '999px',
          padding: '0.35rem',
          display: 'flex',
          gap: '0.35rem',
          boxShadow: 'var(--glass-shadow)'
        }}>
          <button
            onClick={() => setActiveTab('user')}
            style={{
              flex: 1,
              padding: '0.65rem 1.25rem',
              borderRadius: '999px',
              border: 'none',
              background: activeTab === 'user' ? 'linear-gradient(135deg, var(--purple-btn-1), var(--purple-btn-2))' : 'transparent',
              color: activeTab === 'user' ? '#ffffff' : 'var(--text-subtle)',
              fontWeight: 800,
              fontSize: '0.86rem',
              cursor: 'pointer',
              transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              boxShadow: activeTab === 'user' ? '0 4px 16px rgba(124, 58, 237, 0.35)' : 'none'
            }}
          >
            <span>👤</span> User Login
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            style={{
              flex: 1,
              padding: '0.65rem 1.25rem',
              borderRadius: '999px',
              border: 'none',
              background: activeTab === 'admin' ? 'linear-gradient(135deg, #1e1b4b, #4c1d95)' : 'transparent',
              color: activeTab === 'admin' ? '#ffffff' : 'var(--text-subtle)',
              fontWeight: 800,
              fontSize: '0.86rem',
              cursor: 'pointer',
              transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              boxShadow: activeTab === 'admin' ? '0 4px 16px rgba(30, 27, 75, 0.4)' : 'none'
            }}
          >
            <span>🛡️</span> Admin Portal
          </button>
        </div>

        {/* MAIN DEDICATED LOGIN CONTAINER CARD */}
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: '32px',
          border: '1.5px solid var(--card-border)',
          boxShadow: 'var(--glass-shadow-hover)',
          overflow: 'hidden',
          display: 'flex',
          flexWrap: 'wrap',
          color: 'var(--text-main)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)'
        }}>

          {/* LEFT COLUMN: HERO CONTEXT & FEATURES */}
          <div style={{
            flex: '1 1 440px',
            padding: '3rem 2.5rem',
            background: activeTab === 'user' ? 'var(--left-bg)' : 'linear-gradient(168deg, rgba(30, 27, 75, 0.95) 0%, rgba(15, 12, 41, 0.9) 100%)',
            borderRight: '1.5px solid var(--card-border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '2rem',
            transition: 'background 0.35s ease'
          }}>
            <div>
              {/* Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: activeTab === 'user' ? 'rgba(124, 58, 237, 0.12)' : 'rgba(168, 85, 247, 0.2)',
                border: '1px solid var(--card-border)',
                color: activeTab === 'user' ? 'var(--m3-purple-primary)' : '#c084fc',
                padding: '0.35rem 0.9rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                marginBottom: '1.25rem'
              }}>
                <span>{activeTab === 'user' ? '✨ USER MINDSET DASHBOARD' : '🛡️ ADMINISTRATION CONSOLE'}</span>
              </div>

              {/* Title & Subtitle */}
              {activeTab === 'user' ? (
                <>
                  <h1 style={{
                    fontFamily: "'Newsreader', serif",
                    fontSize: 'clamp(2rem, 3.8vw, 2.6rem)',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    lineHeight: 1.15,
                    marginBottom: '0.85rem'
                  }}>
                    Welcome back to your <em style={{ fontStyle: 'italic', color: 'var(--m3-purple-primary)' }}>Mindset Hub</em>.
                  </h1>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-subtle)', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Log in to view your saved mood check-ins, custom 60-second action history, and personal progress dashboard.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div style={{
                      background: 'var(--tile-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '16px',
                      padding: '0.85rem 1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem'
                    }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                        📊
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>Saved Mood Check-ins</div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-subtle)' }}>Track your daily emotional shifts and 60s actions</div>
                      </div>
                    </div>

                    <div style={{
                      background: 'var(--tile-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '16px',
                      padding: '0.85rem 1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem'
                    }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                        📘
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>Personal PDF Shift Reports</div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-subtle)' }}>Access your downloaded Mindset Plan guides</div>
                      </div>
                    </div>

                    <div style={{
                      background: 'var(--tile-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '16px',
                      padding: '0.85rem 1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem'
                    }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                        🔒
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>Privacy Guaranteed</div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-subtle)' }}>Automatic 90-day inactivity data purge policy</div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h1 style={{
                    fontFamily: "'Newsreader', serif",
                    fontSize: 'clamp(2rem, 3.8vw, 2.6rem)',
                    fontWeight: 600,
                    color: '#ffffff',
                    lineHeight: 1.15,
                    marginBottom: '0.85rem'
                  }}>
                    System <em style={{ fontStyle: 'italic', color: '#c084fc' }}>Administration</em> Portal.
                  </h1>
                  <p style={{ fontSize: '0.95rem', color: '#c4b5fd', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Secure access console for managing platform users, check-ins, sales reports, SEO meta tags, and AdSense settings.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '16px',
                      padding: '0.85rem 1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      color: '#ffffff'
                    }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                        🛡️
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>System Controls & AI Settings</div>
                        <div style={{ fontSize: '0.76rem', color: '#c4b5fd' }}>Manage AI provider fallback and prompt configurations</div>
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '16px',
                      padding: '0.85rem 1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      color: '#ffffff'
                    }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                        🔍
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>SEO & AdSense Integration</div>
                        <div style={{ fontSize: '0.76rem', color: '#c4b5fd' }}>Google Search Console verification & ad slots</div>
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '16px',
                      padding: '0.85rem 1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      color: '#ffffff'
                    }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                        📈
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>User Analytics & CSV Exports</div>
                        <div style={{ fontSize: '0.76rem', color: '#c4b5fd' }}>Export complete check-ins and sales data</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Quote */}
            <div style={{
              background: activeTab === 'user' ? 'var(--tile-bg)' : 'rgba(255,255,255,0.06)',
              borderLeft: '3.5px solid var(--m3-purple-primary)',
              padding: '0.85rem 1.1rem',
              borderRadius: '0 12px 12px 0',
              marginTop: '1.5rem',
              border: '1px solid var(--card-border)',
              borderLeftWidth: '3.5px'
            }}>
              <p style={{ fontSize: '0.8rem', color: activeTab === 'user' ? 'var(--text-subtle)' : '#c4b5fd', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
                &ldquo;Feelings move. Give this one somewhere to go.&rdquo;
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: LOGIN FORMS */}
          <div style={{
            flex: '1 1 440px',
            padding: '3rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'var(--card-bg-solid)'
          }}>
            <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>

              {/* USER LOGIN FORM */}
              {activeTab === 'user' && (
                <>
                  <div style={{ marginBottom: '1.75rem' }}>
                    <h2 style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: 'var(--text-main)',
                      marginBottom: '0.35rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontFamily: "'Outfit', sans-serif"
                    }}>
                      <span>🔑</span> User Sign In
                    </h2>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', margin: 0 }}>
                      Enter your email and password to access your profile.
                    </p>
                  </div>

                  {userError && (
                    <div style={{
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#dc2626',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      marginBottom: '1.25rem',
                      fontWeight: 600
                    }}>
                      ⚠️ {userError}
                    </div>
                  )}

                  {userSuccess ? (
                    <div style={{
                      background: 'rgba(34, 197, 94, 0.12)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      color: '#15803d',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      textAlign: 'center'
                    }}>
                      <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '0.5rem' }}>✨</span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Signed In Successfully!</h3>
                      <p style={{ fontSize: '0.85rem', marginTop: '0.35rem', margin: 0 }}>
                        Redirecting to your dashboard...
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {/* Email Input */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.45rem' }}>
                          EMAIL ADDRESS
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: 'var(--m3-purple-primary)' }}>
                            ✉️
                          </span>
                          <input
                            type="email"
                            required
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="you@example.com"
                            style={{
                              width: '100%',
                              padding: '0.8rem 1rem 0.8rem 2.6rem',
                              background: 'var(--tile-bg)',
                              border: '1.5px solid var(--card-border)',
                              borderRadius: '12px',
                              color: 'var(--text-main)',
                              fontSize: '0.92rem',
                              outline: 'none'
                            }}
                          />
                        </div>
                      </div>

                      {/* Password Input */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                          <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            PASSWORD
                          </label>
                        </div>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: 'var(--m3-purple-primary)' }}>
                            🔒
                          </span>
                          <input
                            type={showUserPassword ? 'text' : 'password'}
                            required
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{
                              width: '100%',
                              padding: '0.8rem 2.6rem 0.8rem 2.6rem',
                              background: 'var(--tile-bg)',
                              border: '1.5px solid var(--card-border)',
                              borderRadius: '12px',
                              color: 'var(--text-main)',
                              fontSize: '0.92rem',
                              outline: 'none'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowUserPassword(!showUserPassword)}
                            style={{
                              position: 'absolute',
                              right: '12px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '1rem'
                            }}
                          >
                            {showUserPassword ? '🙈' : '👁️'}
                          </button>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={userLoading}
                        style={{
                          width: '100%',
                          padding: '0.9rem',
                          background: 'linear-gradient(135deg, var(--purple-btn-1) 0%, var(--purple-btn-2) 100%)',
                          border: 'none',
                          borderRadius: '14px',
                          color: 'white',
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                          boxShadow: '0 8px 24px rgba(124, 58, 237, 0.35)',
                          marginTop: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <span>{userLoading ? 'Authenticating...' : 'Sign In to User Dashboard'}</span>
                        <span>→</span>
                      </button>
                    </form>
                  )}

                  <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.85rem', color: 'var(--text-subtle)' }}>
                    Don&apos;t have a profile yet?{' '}
                    <a href="/register" style={{ color: 'var(--m3-purple-primary)', fontWeight: 800, textDecoration: 'none' }}>
                      Register Free
                    </a>
                  </div>
                </>
              )}

              {/* ADMIN LOGIN FORM */}
              {activeTab === 'admin' && (
                <>
                  <div style={{ marginBottom: '1.75rem' }}>
                    <h2 style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: 'var(--text-main)',
                      marginBottom: '0.35rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontFamily: "'Outfit', sans-serif"
                    }}>
                      <span>🛡️</span> Admin Console Login
                    </h2>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', margin: 0 }}>
                      Enter the master admin password to access system controls.
                    </p>
                  </div>

                  {adminError && (
                    <div style={{
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#dc2626',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      marginBottom: '1.25rem',
                      fontWeight: 600
                    }}>
                      ⚠️ {adminError}
                    </div>
                  )}

                  {adminSuccess ? (
                    <div style={{
                      background: 'rgba(34, 197, 94, 0.12)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      color: '#15803d',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      textAlign: 'center'
                    }}>
                      <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '0.5rem' }}>🔓</span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Admin Authenticated!</h3>
                      <p style={{ fontSize: '0.85rem', marginTop: '0.35rem', margin: 0 }}>
                        Opening administration console...
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleAdminSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.45rem' }}>
                          ADMIN SECRET PASSWORD
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: '#a855f7' }}>
                            🔑
                          </span>
                          <input
                            type={showAdminPassword ? 'text' : 'password'}
                            required
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="Enter master admin key..."
                            style={{
                              width: '100%',
                              padding: '0.8rem 2.6rem 0.8rem 2.6rem',
                              background: 'var(--tile-bg)',
                              border: '1.5px solid var(--card-border)',
                              borderRadius: '12px',
                              color: 'var(--text-main)',
                              fontSize: '0.92rem',
                              outline: 'none'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowAdminPassword(!showAdminPassword)}
                            style={{
                              position: 'absolute',
                              right: '12px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '1rem'
                            }}
                          >
                            {showAdminPassword ? '🙈' : '👁️'}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={adminLoading}
                        style={{
                          width: '100%',
                          padding: '0.9rem',
                          background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)',
                          border: 'none',
                          borderRadius: '14px',
                          color: 'white',
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                          boxShadow: '0 8px 24px rgba(30, 27, 75, 0.4)',
                          marginTop: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <span>{adminLoading ? 'Authenticating Admin...' : 'Open Admin Console'}</span>
                        <span>→</span>
                      </button>
                    </form>
                  )}

                  <div style={{
                    marginTop: '1.75rem',
                    padding: '0.85rem 1rem',
                    background: 'var(--banner-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '12px',
                    fontSize: '0.78rem',
                    color: 'var(--text-subtle)',
                    textAlign: 'center',
                    lineHeight: 1.5
                  }}>
                    🛡️ <strong>Authorized Access Only.</strong> Sessions are protected by SHA-256 HMAC cookie encryption.
                  </div>
                </>
              )}

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
