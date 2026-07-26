'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{ email: string; name?: string } | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('moodflip_profile');
    if (saved) {
      try { setUserProfile(JSON.parse(saved)); } catch (e) {}
    }

    const savedTheme = (localStorage.getItem('moodflip_theme') as 'light' | 'dark') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('moodflip_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.65rem 1.4rem',
      background: 'var(--header-bg)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid var(--card-border)',
      borderRadius: '9999px',
      margin: '0.75rem 0 1.5rem 0',
      boxShadow: '0 8px 32px rgba(72, 60, 108, 0.06), 0 2px 8px rgba(0,0,0,0.02)',
      position: 'relative',
      zIndex: 100,
      width: '100%',
      transition: 'background 0.3s ease, border-color 0.3s ease'
    }}>

      {/* BRAND LOGO */}
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #7c54d1 0%, #e77c74 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
          color: '#ffffff',
          boxShadow: '0 4px 14px rgba(124, 84, 209, 0.3)',
          flexShrink: 0
        }}>
          💫
        </div>
        <div style={{ textAlign: 'left' }}>
          <span style={{
            display: 'block',
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--text-main)',
            lineHeight: 1
          }}>
            MoodFlip
          </span>
          <span style={{
            display: 'block',
            color: 'var(--text-subtle)',
            fontSize: '0.66rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            marginTop: '1px'
          }}>
            moodflip.coach
          </span>
        </div>
      </a>

      {/* DESKTOP NAVIGATION LINKS & THEME TOGGLE */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.4rem',
        fontSize: '0.88rem',
        fontWeight: 600
      }}>
        <a href="/" className={`modern-header-link ${pathname === '/' ? 'active' : ''}`} style={{ color: pathname === '/' ? '#7c54d1' : 'var(--text-subtle)', textDecoration: 'none' }}>
          Home
        </a>
        <a href="/about" className={`modern-header-link ${pathname === '/about' ? 'active' : ''}`} style={{ color: pathname === '/about' ? '#7c54d1' : 'var(--text-subtle)', textDecoration: 'none' }}>
          About
        </a>
        <a href="/contact" className={`modern-header-link ${pathname === '/contact' ? 'active' : ''}`} style={{ color: pathname === '/contact' ? '#7c54d1' : 'var(--text-subtle)', textDecoration: 'none' }}>
          Contact
        </a>
        <a href="/privacy" className={`modern-header-link ${pathname === '/privacy' ? 'active' : ''}`} style={{ color: pathname === '/privacy' ? '#7c54d1' : 'var(--text-subtle)', textDecoration: 'none' }}>
          Privacy
        </a>
        <a href="/disclaimer" className={`modern-header-link ${pathname === '/disclaimer' ? 'active' : ''}`} style={{ color: pathname === '/disclaimer' ? '#7c54d1' : 'var(--text-subtle)', textDecoration: 'none' }}>
          Disclaimer
        </a>

        {/* LIGHT / DARK MODE TOGGLE BUTTON */}
        <button
          onClick={toggleTheme}
          style={{
            background: theme === 'dark' ? '#271b42' : '#f4edfa',
            border: '1px solid ' + (theme === 'dark' ? '#4c347d' : '#d8c4ef'),
            color: theme === 'dark' ? '#f3e8ff' : '#6750a4',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'all 0.25s ease'
          }}
          title="Toggle Light / Dark Theme"
        >
          <span>{theme === 'dark' ? '☀️ Light' : '🌙 Dark'}</span>
        </button>

        {/* DYNAMIC USER PROFILE / LOGIN BUTTON */}
        {userProfile ? (
          <a
            href="/profile"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem 0.4rem 0.5rem',
              background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
              color: '#ffffff',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.82rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(124, 84, 209, 0.35)',
              transition: 'transform 0.2s ease'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#ffffff',
              color: '#7c54d1',
              fontSize: '0.75rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {(userProfile.name || userProfile.email)[0].toUpperCase()}
            </div>
            <span>{userProfile.name || userProfile.email.split('@')[0]}</span>
          </a>
        ) : (
          <a
            href="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 1.15rem',
              background: theme === 'dark' ? '#7c54d1' : '#362854',
              color: '#ffffff',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.82rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(54, 40, 84, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>✨ Login / Register</span>
          </a>
        )}
      </nav>

    </header>
  );
}
