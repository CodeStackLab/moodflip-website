'use client';

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
    setMsg('Account login successful! Redirecting to your profile...');
    setTimeout(() => {
      window.location.href = '/profile';
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFBF7', color: '#2D264B' }}>
      <Header />

      <main style={{ maxWidth: '1240px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 460px',
          gap: '24px',
          alignItems: 'stretch',
          minHeight: '560px'
        }}>
          {/* Left Column: Sunset Pastel Hero */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '24px',
            border: '1px solid #EAE3D6',
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

            {/* Sunset Sun Glow Graphic */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '200px',
              margin: '20px 0',
              borderRadius: '20px',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 235, 242, 0.8) 100%)',
              border: '1px solid rgba(240, 220, 240, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justify-content: 'center',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #fff7d6 0%, #ffcf75 60%, #ef9c4e 100%)',
                boxShadow: '0 0 45px rgba(255, 180, 100, 0.6)'
              }} />
            </div>

            {/* Bottom 4 Feature Items */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '16px 14px',
              border: '1px solid #E6DCF5',
              boxShadow: '0 4px 16px rgba(60, 40, 110, 0.04)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F2EBFF', color: '#7147E8', display: 'grid', placeItems: 'center', margin: '0 auto 6px', fontSize: '15px' }}>🛡️</div>
                <strong style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#231D3E' }}>Private &amp; Secure</strong>
                <span style={{ fontSize: '9px', color: '#736B85' }}>Encrypted data</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EDFAEF', color: '#28AD79', display: 'grid', placeItems: 'center', margin: '0 auto 6px', fontSize: '15px' }}>🟢</div>
                <strong style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#231D3E' }}>Encrypted Access</strong>
                <span style={{ fontSize: '9px', color: '#736B85' }}>SSL Security</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FFF0F3', color: '#E64F8E', display: 'grid', placeItems: 'center', margin: '0 auto 6px', fontSize: '15px' }}>❤️</div>
                <strong style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#231D3E' }}>Wellness Built</strong>
                <span style={{ fontSize: '9px', color: '#736B85' }}>Supportive mind</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F4EBFF', color: '#9A4ACB', display: 'grid', placeItems: 'center', margin: '0 auto 6px', fontSize: '15px' }}>🔒</div>
                <strong style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#231D3E' }}>In Control</strong>
                <span style={{ fontSize: '9px', color: '#736B85' }}>Privacy first</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sign In Card */}
          <div style={{
            borderRadius: '24px',
            border: '1px solid #EAE3D6',
            background: '#ffffff',
            padding: '36px 32px',
            boxShadow: '0 10px 30px rgba(60, 40, 100, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            justify-content: 'center',
            textAlign: 'center'
          }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#F5EEFF', display: 'grid', placeItems: 'center', margin: '0 auto 12px', fontSize: '26px' }}>
              😊
            </div>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: '700', color: '#181236', margin: '0 0 4px' }}>
              Welcome Back
            </h2>

            <p style={{ fontSize: '13px', fontWeight: '700', color: '#7147E8', margin: '0 0 20px' }}>
              Sign in to MoodFlip
            </p>

            {msg && (
              <div style={{ marginBottom: '16px', borderRadius: '12px', background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '12px', fontSize: '12px', fontWeight: 'bold', color: '#047857' }}>
                {msg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#6B638B', marginBottom: '6px' }}>
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
                    border: '1px solid #E2D5F8',
                    fontSize: '14px',
                    outline: 'none',
                    background: '#FAF9FD',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#6B638B', marginBottom: '6px' }}>
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
                      border: '1px solid #E2D5F8',
                      fontSize: '14px',
                      outline: 'none',
                      background: '#FAF9FD',
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
                      color: '#968EA8',
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
                    style={{ accentColor: '#7147E8', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  Remember me
                </label>
                <a href="/forgot-password" style={{ color: '#7147E8', fontWeight: '700', textDecoration: 'none' }}>
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
                  background: 'linear-gradient(135deg, #7147E8 0%, #A644C9 100%)',
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

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #F2EDF8', fontSize: '12px', color: '#6B638B' }}>
              Don&apos;t have an account?{' '}
              <Link href="/register" style={{ fontWeight: '700', color: '#7147E8', textDecoration: 'none' }}>
                Register Free
              </Link>
            </div>
          </div>
        </div>

        {/* Security Bar Below Main Login Grid */}
        <section style={{
          marginTop: '24px',
          padding: '16px 28px',
          borderRadius: '16px',
          border: '1px solid #EAE3D6',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justify-content: 'space-between',
          fontSize: '13px',
          color: '#443C60',
          boxShadow: '0 4px 16px rgba(60, 40, 110, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: '#E8DCFF',
              display: 'grid',
              placeItems: 'center',
              fontSize: '20px'
            }}>🛡️</span>
            <span>We use industry-standard encryption to keep your data safe and your mind at ease.</span>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '12px', fontWeight: '600', color: '#554A78' }}>
            <span>✓ 256-bit SSL encryption</span>
            <span>✓ Secure authentication</span>
            <span>✓ Regular security audits</span>
            <span>✓ Privacy by design</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
