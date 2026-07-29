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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('moodflip_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/disclaimer', label: 'Disclaimer' },
  ];

  return (
    <>
      <style>{`
        .nav-hamburger {
          display: none;
          background: transparent;
          border: 1px solid var(--card-border);
          border-radius: 10px;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-direction: column;
          gap: 5px;
          padding: 0;
          transition: background 0.2s ease;
        }
        .nav-hamburger:hover { background: var(--tile-bg); }
        .nav-hamburger span {
          display: block;
          width: 18px;
          height: 2px;
          background: var(--text-main);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .mobile-nav-drawer {
          display: none;
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          right: 0;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 1.25rem 1.5rem;
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
          z-index: 200;
          flex-direction: column;
          gap: 0.2rem;
          animation: fadeDown 0.22s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .mobile-nav-drawer.open { display: flex; }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-nav-link {
          display: block;
          padding: 0.7rem 0.9rem;
          border-radius: 12px;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-subtle);
          text-decoration: none;
          transition: background 0.18s ease, color 0.18s ease;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active {
          background: var(--tile-selected-bg);
          color: #7c54d1;
        }
        .mobile-nav-divider {
          height: 1px;
          background: var(--card-border);
          margin: 0.5rem 0;
        }
        .mobile-nav-bottom {
          display: flex;
          gap: 0.65rem;
          padding-top: 0.25rem;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav-drawer { display: none !important; }
        }
      `}</style>

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
        <nav className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.4rem',
          fontSize: '0.88rem',
          fontWeight: 600
        }}>
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`modern-header-link ${pathname === href ? 'active' : ''}`}
              style={{ color: pathname === href ? '#7c54d1' : 'var(--text-subtle)', textDecoration: 'none' }}
            >
              {label}
            </a>
          ))}

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

        {/* MOBILE: RIGHT SIDE (theme toggle + hamburger) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* Mobile theme toggle */}
          <button
            onClick={toggleTheme}
            className="nav-hamburger"
            style={{
              background: theme === 'dark' ? '#271b42' : '#f4edfa',
              border: '1px solid ' + (theme === 'dark' ? '#4c347d' : '#d8c4ef'),
              color: theme === 'dark' ? '#f3e8ff' : '#6750a4',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 0,
              padding: 0,
            }}
            title="Toggle Theme"
            id="mobile-theme-btn"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Hamburger button */}
          <button
            className={`nav-hamburger ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* MOBILE DROPDOWN NAVIGATION DRAWER */}
        <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`mobile-nav-link ${pathname === href ? 'active' : ''}`}
            >
              {label}
            </a>
          ))}

          <div className="mobile-nav-divider" />

          <div className="mobile-nav-bottom">
            {userProfile ? (
              <a
                href="/profile"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem',
                  background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  textDecoration: 'none',
                }}
              >
                👤 My Profile
              </a>
            ) : (
              <a
                href="/login"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem',
                  background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  textDecoration: 'none',
                }}
              >
                ✨ Login / Register
              </a>
            )}
          </div>
        </div>

      </header>

      {/* Overlay to close mobile menu on outside click */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'transparent'
          }}
        />
      )}
    </>
  );
}
