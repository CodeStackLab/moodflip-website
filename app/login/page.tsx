'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Account login successful! Redirecting...');
    setTimeout(() => {
      window.location.href = '/profile';
    }, 1200);
  };

  return (
    <main className={styles.pageShell}>
      <div className={styles.appFrame}>
        <header className={styles.header}>
          <a className={styles.logo} href="/" aria-label="MoodFlip home">
            <div className="relative flex h-9 w-9 items-center justify-center mr-1">
              <span className="absolute bottom-0 left-1 h-[22px] w-[22px] rounded-full border-[5px] border-[#713ee2] border-t-transparent" />
              <span className="absolute left-1 top-0 h-2.5 w-2.5 rounded-full bg-[#f4a746]" />
              <span className="absolute right-0 top-1 h-2 w-2 rounded-full bg-[#d94fc5]" />
            </div>
            <span>mood<span>flip</span></span>
          </a>

          <nav className={styles.nav} aria-label="Primary navigation">
            <Link href="/">Home</Link>
            <a href="/#about">About</a>
            <a href="/#how">How It Works</a>
            <a href="/#library">Mood Library</a>
            <a href="/#resources">Resources</a>
          </nav>

          <div className={styles.headerActions}>
            <button className={styles.loginButton} type="button"><span>👤</span> Login</button>
            <button className={styles.planButton} type="button">Get 7-Day Plan</button>
          </div>
        </header>

        <section className={styles.dashboard} style={{ minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '40px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 20px 60px rgba(80,50,150,0.08)',
            border: '1px solid #f0ebf8',
            textAlign: 'center'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e4d7ff 0%, #f4efff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              margin: '0 auto 16px'
            }}>
              👤
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1a142c', marginBottom: '8px' }}>Welcome Back</h1>
            <p style={{ fontSize: '13px', color: '#7a748c', marginBottom: '24px' }}>Enter your email to log into your MoodFlip check-ins</p>

            {msg && (
              <div style={{ marginBottom: '16px', borderRadius: '12px', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '12px', fontSize: '12px', fontWeight: 'bold', color: '#047857' }}>
                {msg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#a09cb0', marginBottom: '4px' }}>Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    border: '1px solid #e2d5f8',
                    padding: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#6f42c1'}
                  onBlur={(e) => e.target.style.borderColor = '#e2d5f8'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#a09cb0', marginBottom: '4px' }}>Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    border: '1px solid #e2d5f8',
                    padding: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#6f42c1'}
                  onBlur={(e) => e.target.style.borderColor = '#e2d5f8'}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(to right, #6f42c1, #5a32a3)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginTop: '8px',
                  boxShadow: '0 8px 20px rgba(111, 66, 193, 0.25)',
                }}
              >
                Sign In
              </button>
            </form>

            <div style={{ marginTop: '24px', fontSize: '12px', color: '#7a748c' }}>
              Don't have an account?{' '}
              <Link href="/register" style={{ fontWeight: 'bold', color: '#6f42c1', textDecoration: 'none' }}>
                Create Free Account
              </Link>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <a className={`${styles.logo} ${styles.footerLogo}`} href="/">
            <div className="relative flex h-9 w-9 items-center justify-center mr-1">
              <span className="absolute bottom-0 left-1 h-[22px] w-[22px] rounded-full border-[5px] border-[#713ee2] border-t-transparent" />
              <span className="absolute left-1 top-0 h-2.5 w-2.5 rounded-full bg-[#f4a746]" />
              <span className="absolute right-0 top-1 h-2 w-2 rounded-full bg-[#d94fc5]" />
            </div>
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
