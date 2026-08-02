'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabaseBrowser } from '@/lib/supabaseBrowser';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  /**
   * Single unified submit:
   * 1. Try admin password first (no email needed for admin).
   * 2. If that matches → /admin
   * 3. Else try Supabase user login → /profile
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError('');

    try {
      // ── STEP 1: Try admin password ──
      const adminRes = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const adminData = await adminRes.json();

      if (adminRes.ok && adminData.authenticated) {
        setSuccessMsg('Admin authenticated! Opening console...');
        setSuccess(true);
        setTimeout(() => { window.location.href = '/admin'; }, 900);
        return;
      }

      // ── STEP 2: Try user login via Supabase ──
      if (!email) {
        setError('Please enter your email address to sign in.');
        setLoading(false);
        return;
      }
      if (!supabaseBrowser) throw new Error('Secure sign-in is temporarily unavailable.');

      const { data, error: authError } = await supabaseBrowser.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (authError || !data.session || !data.user.email) {
        throw new Error(authError?.message || 'Invalid email or password.');
      }

      const profile = {
        email: data.user.email,
        name: String(data.user.user_metadata?.name || data.user.email.split('@')[0]),
        lastActiveAt: new Date().toISOString(),
      };
      localStorage.setItem('moodflip_profile', JSON.stringify(profile));

      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.session.access_token}` },
        body: JSON.stringify({ name: profile.name }),
      }).catch(() => null);

      setSuccessMsg('Signed in! Redirecting to your dashboard...');
      setSuccess(true);
      setTimeout(() => { window.location.href = '/profile'; }, 1000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-shell">
      <Header />

      <style>{`
        @keyframes lpBlob {
          0%,100%{transform:translate(0,0) scale(1);}
          40%{transform:translate(22px,-28px) scale(1.05);}
          70%{transform:translate(-14px,16px) scale(0.97);}
        }
        @keyframes lpCardIn {
          from{opacity:0;transform:translateY(24px);}
          to{opacity:1;transform:translateY(0);}
        }
        @keyframes lpSuccessPop {
          0%{transform:scale(0.5);opacity:0;}
          65%{transform:scale(1.08);}
          100%{transform:scale(1);opacity:1;}
        }
        @keyframes lpShimmer {
          0%{background-position:-200% center;}
          100%{background-position:200% center;}
        }
        @keyframes lpPulse {
          0%,100%{opacity:1;} 50%{opacity:0.6;}
        }

        .lp-page {
          min-height: calc(100vh - 170px);
          display: flex; align-items: center; justify-content: center;
          padding: 3rem 1rem; position: relative; overflow: hidden;
        }
        .lp-blob {
          position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
          animation: lpBlob 16s ease-in-out infinite;
        }
        .lp-b1 {
          width: 520px; height: 520px; top: -140px; left: -120px;
          background: radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 70%);
        }
        .lp-b2 {
          width: 440px; height: 440px; bottom: -110px; right: -90px;
          background: radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%);
          animation-delay: 5s;
        }
        .lp-b3 {
          width: 320px; height: 320px; top: 40%; right: 14%;
          background: radial-gradient(circle, rgba(18,165,148,0.08) 0%, transparent 70%);
          animation-delay: 10s;
        }

        /* Card */
        .lp-card {
          position: relative; z-index: 1;
          width: 100%; max-width: 460px;
          background: var(--card-bg);
          border: 1.5px solid var(--card-border);
          border-radius: 28px;
          box-shadow: 0 32px 80px rgba(74,57,102,0.12);
          overflow: hidden;
          animation: lpCardIn 0.45s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* Top colour strip */
        .lp-strip {
          height: 4px;
          background: linear-gradient(90deg, #6c5ce7 0%, #ec4899 50%, #12a594 100%);
        }

        /* Inner padding */
        .lp-body { padding: 2.75rem 2.75rem 2.25rem; }

        /* Brand area */
        .lp-brand { text-align: center; margin-bottom: 2rem; }
        .lp-brand-sun {
          width: 62px; height: 62px; border-radius: 18px;
          margin: 0 auto 0.9rem;
          background: linear-gradient(135deg, #fff5d4 0%, #ffe8a3 100%);
          border: 2px solid rgba(255,182,72,0.35);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem;
          box-shadow: 0 0 0 6px rgba(255,182,72,0.1), 0 8px 24px rgba(255,182,72,0.2);
          animation: lpPulse 3s ease-in-out infinite;
        }
        .lp-brand-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.65rem; font-weight: 640;
          color: var(--text-main); margin: 0 0 0.3rem;
        }
        .lp-brand-subtitle {
          font-size: 0.84rem; color: var(--text-subtle); margin: 0;
        }

        /* Form */
        .lp-form { display: flex; flex-direction: column; gap: 1.1rem; }
        .lp-field { display: flex; flex-direction: column; gap: 0.42rem; }
        .lp-label {
          font-size: 0.7rem; font-weight: 800;
          color: var(--text-main); text-transform: uppercase; letter-spacing: 0.07em;
        }
        .lp-input-wrap { position: relative; }
        .lp-icon {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%); font-size: 0.92rem;
          pointer-events: none; z-index: 1;
        }
        .lp-input {
          width: 100%; padding: 0.82rem 1rem 0.82rem 2.5rem;
          background: var(--cream);
          border: 1.5px solid var(--card-border);
          border-radius: 12px; color: var(--text-main);
          font-size: 0.9rem; outline: none; font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .lp-input:focus {
          border-color: #6c5ce7;
          box-shadow: 0 0 0 3px rgba(108,92,231,0.13);
        }
        .lp-eye {
          position: absolute; right: 11px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          font-size: 0.95rem; color: var(--text-subtle); padding: 3px;
          transition: color 0.2s;
        }
        .lp-eye:hover { color: var(--text-main); }

        /* Hint below email */
        .lp-hint {
          font-size: 0.72rem; color: var(--text-subtle);
          padding: 0.5rem 0.75rem; border-radius: 8px;
          background: rgba(108,92,231,0.06);
          border: 1px solid rgba(108,92,231,0.12);
          line-height: 1.5;
        }

        /* Error */
        .lp-error {
          background: rgba(239,68,68,0.09);
          border: 1px solid rgba(239,68,68,0.25);
          color: #dc2626; border-radius: 12px;
          padding: 0.68rem 1rem; font-size: 0.82rem; font-weight: 600;
          display: flex; align-items: center; gap: 0.4rem;
        }

        /* Submit button */
        .lp-btn {
          width: 100%; padding: 0.9rem 1.5rem;
          border: none; border-radius: 14px;
          background: linear-gradient(135deg, #6c5ce7 0%, #ec4899 60%, #8a7cf0 100%);
          background-size: 200% auto;
          color: white; font-weight: 800; font-size: 0.94rem;
          cursor: pointer; font-family: inherit;
          display: flex; align-items: center; justify-content: center; gap: 0.45rem;
          margin-top: 0.5rem;
          transition: all 0.22s ease;
          box-shadow: 0 8px 24px rgba(108,92,231,0.38);
          position: relative; overflow: hidden;
          animation: lpShimmer 3s linear infinite;
        }
        .lp-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(108,92,231,0.46);
        }
        .lp-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

        /* Success state */
        .lp-success {
          text-align: center; padding: 2rem 1rem;
          animation: lpSuccessPop 0.45s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .lp-success-icon { font-size: 2.8rem; display: block; margin-bottom: 0.6rem; }
        .lp-success-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.2rem; font-weight: 640;
          color: var(--text-main); margin: 0 0 0.3rem;
        }
        .lp-success-sub { font-size: 0.83rem; color: var(--text-subtle); margin: 0; }

        /* Divider */
        .lp-divider {
          display: flex; align-items: center; gap: 0.7rem;
          margin: 0.25rem 0;
        }
        .lp-divider hr { flex: 1; border: none; border-top: 1px solid var(--card-border); }
        .lp-divider span { font-size: 0.7rem; color: var(--text-subtle); font-weight: 700; white-space: nowrap; }

        /* Footer links */
        .lp-footer {
          text-align: center; margin-top: 1.5rem;
          font-size: 0.83rem; color: var(--text-subtle);
          padding-top: 1.5rem;
          border-top: 1px solid var(--card-border);
        }
        .lp-footer a {
          color: #6c5ce7; font-weight: 800; text-decoration: none;
          transition: color 0.2s;
        }
        .lp-footer a:hover { color: #5546ce; text-decoration: underline; }

        /* Trust badges */
        .lp-trust {
          display: flex; flex-wrap: wrap;
          justify-content: center; gap: 0.5rem;
          margin-top: 1.25rem;
        }
        .lp-trust-badge {
          display: flex; align-items: center; gap: 4px;
          font-size: 0.72rem; font-weight: 700;
          color: var(--text-subtle);
          padding: 0.3rem 0.7rem; border-radius: 999px;
          background: var(--cream-2);
          border: 1px solid var(--card-border);
        }

        @media (max-width: 500px) {
          .lp-body { padding: 2rem 1.5rem 1.75rem; }
          .lp-card { max-width: 100%; }
        }
      `}</style>

      <main className="lp-page">
        <div className="lp-blob lp-b1" />
        <div className="lp-blob lp-b2" />
        <div className="lp-blob lp-b3" />

        <div className="lp-card">
          <div className="lp-strip" />

          <div className="lp-body">
            {/* Brand */}
            <div className="lp-brand">
              <div className="lp-brand-sun">🌤️</div>
              <h1 className="lp-brand-title">Welcome Back</h1>
              <p className="lp-brand-subtitle">Sign in to your MoodFlip account</p>
            </div>

            {success ? (
              <div className="lp-success">
                <span className="lp-success-icon">✨</span>
                <h2 className="lp-success-title">You&apos;re in!</h2>
                <p className="lp-success-sub">{successMsg}</p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="lp-error" style={{ marginBottom: '1rem' }}>
                    <span>⚠️</span> {error}
                  </div>
                )}

                <form id="login-form" onSubmit={handleSubmit} className="lp-form">
                  {/* Email */}
                  <div className="lp-field">
                    <label className="lp-label" htmlFor="login-email">Email Address</label>
                    <div className="lp-input-wrap">
                      <span className="lp-icon">✉️</span>
                      <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="lp-input"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="lp-field">
                    <label className="lp-label" htmlFor="login-password">Password</label>
                    <div className="lp-input-wrap">
                      <span className="lp-icon">🔒</span>
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="lp-input"
                        style={{ paddingRight: '2.5rem' }}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="lp-eye"
                        onClick={() => setShowPassword(v => !v)}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}

                  <button
                    id="login-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="lp-btn"
                  >
                    <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                    {!loading && <span>→</span>}
                  </button>
                </form>


              </>
            )}

            {/* Footer */}
            <div className="lp-footer">
              Don&apos;t have an account?{' '}
              <a href="/register">Create Free Profile</a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
