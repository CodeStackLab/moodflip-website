const fs = require('fs');

const loginCode = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Account login successful! Redirecting to your profile...');
    setTimeout(() => {
      window.location.href = '/profile';
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFBF7', color: '#2D264B' }}>
      <Header />
      <main style={{ maxWidth: '440px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ borderRadius: '24px', border: '1px solid #EAE3D6', backgroundColor: '#ffffff', padding: '32px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#F5F3FF', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            👤
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Welcome Back</h1>
          <p style={{ fontSize: '12px', color: '#6B638B', marginBottom: '24px' }}>Enter your credentials to log into your MoodFlip account.</p>

          {msg && (
            <div style={{ marginBottom: '16px', borderRadius: '12px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '12px', fontSize: '12px', fontWeight: 'bold', color: '#047857' }}>
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#6B638B', marginBottom: '4px' }}>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{ width: '100%', borderRadius: '12px', border: '1px solid #EAE3D6', padding: '12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#6B638B', marginBottom: '4px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: '100%', borderRadius: '12px', border: '1px solid #EAE3D6', padding: '12px', paddingRight: '40px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '12px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '14px' }}
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{ width: '100%', borderRadius: '24px', backgroundColor: '#6C5CE7', padding: '12px', fontSize: '14px', fontWeight: 'bold', color: '#ffffff', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(108, 92, 231, 0.25)', marginTop: '8px' }}
            >
              Sign In
            </button>
          </form>

          <div style={{ marginTop: '24px', fontSize: '12px', color: '#6B638B' }}>
            New to MoodFlip?{' '}
            <Link href="/register" style={{ fontWeight: 'bold', color: '#6C5CE7', textDecoration: 'none' }}>
              Create Account
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
`;

const loginCodeCRLF = loginCode.replace(/\r?\n/g, '\r\n');
fs.writeFileSync('app/login/page.tsx', loginCodeCRLF, 'utf8');

console.log('Successfully created clean LoginPage based on RegisterPage architecture!');
