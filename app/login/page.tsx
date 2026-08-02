'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Sign in successful! Redirecting to your profile...');
    setTimeout(() => {
      window.location.href = '/profile';
    }, 1200);
  };

  return (
    <main className={styles.pageShell}>
      <div className={styles.appFrame}>
        {/* Header */}
        <header className={styles.header}>
          <a className={styles.logo} href="/" aria-label="MoodFlip home">
            <span className={styles.logoMark} aria-hidden="true">
              <span />
              <span />
            </span>
            <span>mood<span>flip</span></span>
          </a>

          <nav className={styles.nav} aria-label="Primary navigation">
            <Link href="/">Home</Link>
            <a href="/#about">About</a>
            <a href="/#how">How It Works</a>
            <a href="/#library">Mood Library</a>
            <a href="/#resources">Resources</a>
            <a href="/#contact">Contact</a>
          </nav>

          <div className={styles.headerActions}>
            <button className={styles.loginButton} type="button"><span>👤</span> Login</button>
            <button className={styles.planButton} type="button">Get 7-Day Plan</button>
          </div>
        </header>

        {/* Main 2-Column Grid */}
        <section style={{ padding: '24px 28px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 480px',
            gap: '24px',
            alignItems: 'stretch',
            minHeight: '600px'
          }}>
            {/* Left Column: Artistic Landscape Hero & Feature Strip */}
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '24px',
              border: '1px solid #ede6f5',
              padding: '40px 36px 28px',
              display: 'flex',
              flexDirection: 'column',
              justify-content: 'space-between',
              background: 'radial-gradient(circle at 50% 30%, rgba(255, 248, 220, 0.9), transparent 50%), radial-gradient(circle at 10% 10%, rgba(252, 225, 245, 0.8), transparent 40%), linear-gradient(180deg, #fff2f8 0%, #fff9ea 50%, #fff4fa 100%)',
              boxShadow: '0 16px 38px rgba(81, 59, 128, 0.035)'
            }}>
              <div>
                <h1 style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '36px',
                  lineHeight: '1.25',
                  color: '#1a1338',
                  fontWeight: '800',
                  margin: '0 0 14px'
                }}>
                  A calmer mind.<br />A better you.
                </h1>
                <p style={{
                  fontSize: '15px',
                  color: '#554d6e',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Login to continue your journey<br />towards calm, clarity and growth.
                </p>
              </div>

              {/* Sunrise & Mountain Background */}
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '160px',
                height: '280px',
                pointerEvents: 'none',
                zIndex: 1
              }}>
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '40px',
                  transform: 'translateX(-50%)',
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #fff7d6 0%, #ffcf75 60%, #ef9c4e 100%)',
                  boxShadow: '0 0 40px rgba(255, 207, 117, 0.8)'
                }} />
                <div style={{
                  position: 'absolute',
                  left: '-10%',
                  right: '-10%',
                  bottom: '20px',
                  height: '140px',
                  borderRadius: '50% 50% 0 0',
                  background: 'linear-gradient(180deg, rgba(246, 183, 211, 0.8), rgba(220, 129, 199, 0.7))'
                }} />
                <div style={{
                  position: 'absolute',
                  left: '-15%',
                  right: '-15%',
                  bottom: '-40px',
                  height: '180px',
                  borderRadius: '50% 50% 0 0',
                  background: 'linear-gradient(180deg, #f4b8d7, #cf75bb)'
                }} />
              </div>

              {/* Bottom Feature Items Strip */}
              <div style={{
                position: 'relative',
                zIndex: 4,
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(10px)',
                borderRadius: '18px',
                padding: '16px 14px',
                border: '1px solid rgba(230, 220, 245, 0.85)',
                boxShadow: '0 8px 24px rgba(60, 40, 110, 0.05)',
                marginTop: '40px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: '#f2ebff',
                    color: '#7147e8',
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 6px',
                    fontSize: '16px'
                  }}>🛡️</div>
                  <strong style={{ display: 'block', fontSize: '11px', color: '#231d3e' }}>Private &amp; Secure</strong>
                  <span style={{ fontSize: '9px', color: '#736b85', lineHeight: '1.2', display: 'block' }}>Your data is encrypted.</span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: '#edfaef',
                    color: '#28ad79',
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 6px',
                    fontSize: '16px'
                  }}>🟢</div>
                  <strong style={{ display: 'block', fontSize: '11px', color: '#231d3e' }}>Encrypted Access</strong>
                  <span style={{ fontSize: '9px', color: '#736b85', lineHeight: '1.2', display: 'block' }}>Enterprise-grade security</span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: '#fff0f3',
                    color: '#e64f8e',
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 6px',
                    fontSize: '16px'
                  }}>❤️</div>
                  <strong style={{ display: 'block', fontSize: '11px', color: '#231d3e' }}>Built for Wellness</strong>
                  <span style={{ fontSize: '9px', color: '#736b85', lineHeight: '1.2', display: 'block' }}>Supporting your mind</span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: '#f4ebff',
                    color: '#9a4acb',
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 6px',
                    fontSize: '16px'
                  }}>🔒</div>
                  <strong style={{ display: 'block', fontSize: '11px', color: '#231d3e' }}>You&apos;re in Control</strong>
                  <span style={{ fontSize: '9px', color: '#736b85', lineHeight: '1.2', display: 'block' }}>Privacy comes first</span>
                </div>
              </div>
            </div>

            {/* Right Column: Unified Login Form Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '36px 32px',
              border: '1px solid #eee7f5',
              boxShadow: '0 16px 40px rgba(60, 40, 110, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              justify-content: 'center'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: '#f5eeff',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 12px',
                fontSize: '26px'
              }}>
                😊
              </div>

              <h2 style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '28px',
                color: '#181236',
                margin: '0 0 4px',
                textAlign: 'center',
                fontWeight: '700'
              }}>
                Welcome Back
              </h2>

              <p style={{
                fontSize: '14px',
                color: '#7147e8',
                fontWeight: '700',
                margin: '0 0 14px',
                textAlign: 'center'
              }}>
                Sign in to MoodFlip
              </p>

              <div style={{
                background: '#f9f6fe',
                border: '1px solid #eee4fa',
                borderRadius: '12px',
                padding: '10px 14px',
                margin: '0 0 20px',
                textAlign: 'center'
              }}>
                <strong style={{ display: 'block', fontSize: '12px', color: '#2b2345' }}>Admin &amp; User Login</strong>
                <span style={{ fontSize: '11px', color: '#756d8c' }}>One secure portal for both users and admins.</span>
              </div>

              {msg && (
                <div style={{
                  marginBottom: '16px',
                  borderRadius: '12px',
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  padding: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#047857',
                  textAlign: 'center'
                }}>
                  {msg}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#383050', marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '13px', fontSize: '15px', color: '#968ea8' }}>✉️</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      style={{
                        width: '100%',
                        height: '46px',
                        paddingLeft: '44px',
                        paddingRight: '14px',
                        borderRadius: '12px',
                        border: '1px solid #e1d8f2',
                        fontSize: '14px',
                        outline: 'none',
                        background: '#faf9fd'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#383050', marginBottom: '6px' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '13px', fontSize: '15px', color: '#968ea8' }}>🔒</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      style={{
                        width: '100%',
                        height: '46px',
                        paddingLeft: '44px',
                        paddingRight: '44px',
                        borderRadius: '12px',
                        border: '1px solid #e1d8f2',
                        fontSize: '14px',
                        outline: 'none',
                        background: '#faf9fd'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '12px',
                        border: 'none',
                        background: 'transparent',
                        fontSize: '16px',
                        color: '#968ea8',
                        cursor: 'pointer'
                      }}
                    >
                      {showPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#383252', fontWeight: '600' }}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      style={{ accentColor: '#7147e8', width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                    Remember me
                  </label>
                  <a href="/forgot-password" style={{ color: '#7147e8', fontWeight: '700', textDecoration: 'none' }}>
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    height: '48px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #a644c9 0%, #683cd7 100%)',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    marginTop: '8px',
                    boxShadow: '0 8px 20px rgba(105, 60, 215, 0.24)',
                    display: 'flex',
                    alignItems: 'center',
                    justify-content: 'center',
                    gap: '8px'
                  }}
                >
                  <span>→]</span> Login
                </button>
              </form>

              <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: '#aa9fbe', fontSize: '12px' }}>
                <div style={{ flex: 1, height: '1px', background: '#ece5f5' }} />
                <span style={{ padding: '0 12px' }}>or</span>
                <div style={{ flex: 1, height: '1px', background: '#ece5f5' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: '#564d73' }}>Don&apos;t have an account?</span>
                <Link
                  href="/register"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    height: '40px',
                    padding: '0 20px',
                    borderRadius: '10px',
                    border: '1px solid #d8cdfa',
                    background: '#ffffff',
                    color: '#7147e8',
                    fontSize: '13px',
                    fontWeight: '700',
                    textDecoration: 'none'
                  }}
                >
                  <span>👤</span> Register
                </Link>
              </div>

              <div style={{
                marginTop: '22px',
                paddingTop: '14px',
                borderTop: '1px solid #f2edf8',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textAlign: 'left',
                fontSize: '11px',
                color: '#78708c'
              }}>
                <span style={{ fontSize: '16px' }}>🔒</span>
                <div>
                  Role is determined automatically after sign in.<br />
                  You&apos;ll be redirected to your dashboard securely.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Bar Below Main Login Grid */}
        <section style={{
          margin: '0 28px 24px',
          padding: '16px 28px',
          borderRadius: '16px',
          border: '1px solid #eee7f5',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justify-content: 'space-between',
          fontSize: '13px',
          color: '#443c60',
          boxShadow: '0 4px 16px rgba(60, 40, 110, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: '#e8dcff',
              display: 'grid',
              placeItems: 'center',
              fontSize: '20px'
            }}>🛡️</span>
            <span>We use industry-standard encryption to keep your data safe and your mind at ease.</span>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '12px', fontWeight: '600', color: '#554a78' }}>
            <span>✓ 256-bit SSL encryption</span>
            <span>✓ Secure authentication</span>
            <span>✓ Regular security audits</span>
            <span>✓ Privacy by design</span>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <a className={styles.logo + " " + styles.footerLogo} href="/">
            <span className={styles.logoMark} aria-hidden="true">
              <span />
              <span />
            </span>
            <span>mood<span>flip</span></span>
          </a>
          <p>A self-reflection utility for real life.</p>
          <nav>
            <a href="/#about">About</a>
            <a href="/#library">Mood Library</a>
            <a href="/#privacy">Privacy Policy</a>
            <a href="/#terms">Terms</a>
            <a href="/#contact">Contact</a>
          </nav>
          <span>© 2026 MoodFlip.coach 💜</span>
        </footer>
      </div>
    </main>
  );
}
