const fs = require('fs');

// 1. Update components/Header.tsx with rich inline styling & linked Login button
const headerCode = `'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid #eae3d6',
      backgroundColor: 'rgba(253, 251, 247, 0.92)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 10px rgba(60, 40, 100, 0.03)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 24px'
      }}>
        {/* LOGO */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            position: 'relative',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7147e8 0%, #a644c9 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(113, 71, 232, 0.25)',
            fontSize: '18px'
          }}>
            😊
          </div>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: '800', color: '#2d264b', letterSpacing: '-0.5px' }}>
            mood<span style={{ color: '#7147e8' }}>flip</span>
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '26px', fontSize: '14px', fontWeight: '600', color: '#6b638b' }}>
          <Link href="/" style={{ color: '#2d264b', textDecoration: 'none' }}>Home</Link>
          <a href="/#about" style={{ color: '#6b638b', textDecoration: 'none' }}>About</a>
          <a href="/#how" style={{ color: '#6b638b', textDecoration: 'none' }}>How It Works</a>
          <a href="/#library" style={{ color: '#6b638b', textDecoration: 'none' }}>Mood Library</a>
          <a href="/#resources" style={{ color: '#6b638b', textDecoration: 'none' }}>Resources</a>
          <a href="/#contact" style={{ color: '#6b638b', textDecoration: 'none' }}>Contact</a>
        </nav>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '38px',
              padding: '0 18px',
              borderRadius: '19px',
              border: '1px solid #dcd4ee',
              background: '#ffffff',
              color: '#683cd7',
              fontSize: '13px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(104, 60, 215, 0.08)'
            }}
          >
            <span>👤</span> Login
          </Link>

          <Link
            href="/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: '38px',
              padding: '0 20px',
              borderRadius: '19px',
              background: 'linear-gradient(135deg, #7147e8 0%, #a644c9 100%)',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(113, 71, 232, 0.28)'
            }}
          >
            ✨ Get 7-Day Plan
          </Link>
        </div>
      </div>
    </header>
  );
}
`;

let headerCodeCRLF = headerCode.replace(/\r?\n/g, '\r\n');
fs.writeFileSync('components/Header.tsx', headerCodeCRLF, 'utf8');

// 2. Update app/login/page.tsx cleanly matching register page component architecture
const loginCode = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFBF7', color: '#2D264B', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Header />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '36px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 450px',
          gap: '24px',
          alignItems: 'stretch',
          minHeight: '540px'
        }}>
          {/* Left Column: Pastel Landscape Hero */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '24px',
            border: '1px solid #eae3d6',
            padding: '40px 36px 28px',
            display: 'flex',
            flexDirection: 'column',
            justify-content: 'space-between',
            boxShadow: '0 10px 30px rgba(60, 40, 100, 0.03)',
            background: 'radial-gradient(circle at 50% 30%, rgba(255, 248, 220, 0.9), transparent 50%), radial-gradient(circle at 10% 10%, rgba(252, 225, 245, 0.8), transparent 40%), linear-gradient(180deg, #fff2f8 0%, #fff9ea 50%, #fff4fa 100%)'
          }}>
            <div>
              <h1 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '36px',
                lineHeight: '1.25',
                color: '#1A1338',
                fontWeight: '800',
                margin: '0 0 14px'
              }}>
                A calmer mind.<br />A better you.
              </h1>
              <p style={{
                fontSize: '15px',
                color: '#554D6E',
                lineHeight: '1.5',
                margin: 0
              }}>
                Login to continue your journey<br />towards calm, clarity and growth.
              </p>
            </div>

            {/* Bottom 4 Feature Items */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '16px 14px',
              border: '1px solid #e6dcf5',
              boxShadow: '0 4px 16px rgba(60, 40, 110, 0.04)',
              marginTop: '40px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f2ebff', color: '#7147e8', display: 'grid', placeItems: 'center', margin: '0 auto 6px', fontSize: '15px' }}>🛡️</div>
                <strong style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#231d3e' }}>Private &amp; Secure</strong>
                <span style={{ fontSize: '9px', color: '#736b85' }}>Encrypted data</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#edfaef', color: '#28ad79', display: 'grid', placeItems: 'center', margin: '0 auto 6px', fontSize: '15px' }}>🟢</div>
                <strong style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#231d3e' }}>Encrypted Access</strong>
                <span style={{ fontSize: '9px', color: '#736b85' }}>SSL Security</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fff0f3', color: '#e64f8e', display: 'grid', placeItems: 'center', margin: '0 auto 6px', fontSize: '15px' }}>❤️</div>
                <strong style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#231d3e' }}>Wellness Built</strong>
                <span style={{ fontSize: '9px', color: '#736b85' }}>Supportive mind</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f4ebff', color: '#9a4acb', display: 'grid', placeItems: 'center', margin: '0 auto 6px', fontSize: '15px' }}>🔒</div>
                <strong style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#231d3e' }}>In Control</strong>
                <span style={{ fontSize: '9px', color: '#736b85' }}>Privacy first</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sign In Card */}
          <div style={{
            borderRadius: '24px',
            border: '1px solid #eae3d6',
            background: '#ffffff',
            padding: '36px 32px',
            boxShadow: '0 10px 30px rgba(60, 40, 100, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            justify-content: 'center',
            textAlign: 'center'
          }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#f5eeff', display: 'grid', placeItems: 'center', margin: '0 auto 12px', fontSize: '26px' }}>
              😊
            </div>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: '700', color: '#181236', margin: '0 0 4px' }}>
              Welcome Back
            </h2>

            <p style={{ fontSize: '13px', fontWeight: '700', color: '#7147e8', margin: '0 0 20px' }}>
              Sign in to MoodFlip
            </p>

            {msg && (
              <div style={{ marginBottom: '16px', borderRadius: '12px', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '12px', fontSize: '12px', fontWeight: 'bold', color: '#047857' }}>
                {msg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#6b638b', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 14px',
                    borderRadius: '12px',
                    border: '1px solid #e2d5f8',
                    fontSize: '14px',
                    outline: 'none',
                    background: '#faf9fd',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#6b638b', marginBottom: '6px' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    style={{
                      width: '100%',
                      height: '44px',
                      paddingLeft: '14px',
                      paddingRight: '44px',
                      borderRadius: '12px',
                      border: '1px solid #e2d5f8',
                      fontSize: '14px',
                      outline: 'none',
                      background: '#faf9fd',
                      boxSizing: 'border-box'
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
                      fontSize: '15px',
                      color: '#968ea8',
                      cursor: 'pointer'
                    }}
                  >
                    {showPassword ? '👁️' : '🙈'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
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
                  height: '44px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #7147e8 0%, #a644c9 100%)',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '700',
                  boxShadow: '0 4px 14px rgba(113, 71, 232, 0.28)',
                  cursor: 'pointer'
                }}
              >
                Login
              </button>
            </form>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f2edf8', fontSize: '12px', color: '#6b638b' }}>
              Don&apos;t have an account?{' '}
              <Link href="/register" style={{ fontWeight: '700', color: '#7147e8', textDecoration: 'none' }}>
                Register Free
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
`;

let loginCodeCRLF = loginCode.replace(/\r?\n/g, '\r\n');
fs.writeFileSync('app/login/page.tsx', loginCodeCRLF, 'utf8');

console.log('Successfully updated Header component and LoginPage with CRLF formatting!');
