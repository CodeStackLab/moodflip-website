'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{ email: string; name?: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('moodflip_profile');
    if (saved) {
      try { setUserProfile(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  return (
    <header className="nav-header">
      {/* Brand Logo */}
      <a href="/" className="header-brand">
        <div className="header-logo-badge">
          💫
        </div>
        <div style={{ textAlign: 'left' }}>
          <span className="header-brand-name">
            MoodFlip
          </span>
          <span className="header-brand-domain">
            moodflip.coach
          </span>
        </div>
      </a>

      {/* Navigation Links */}
      <nav className={`header-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</a>
        <a href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>About</a>
        <a href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>Contact</a>
        <a href="/privacy" className={`nav-link ${pathname === '/privacy' ? 'active' : ''}`}>Privacy</a>

        {/* Dynamic User Profile Badge or Login CTA */}
        {userProfile ? (
          <a
            href="/profile"
            className="header-user-profile-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.85rem 0.35rem 0.45rem',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              color: '#ffffff',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '0.78rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)',
              transition: 'all 0.2s ease',
              border: '1.5px solid rgba(255, 255, 255, 0.4)'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#ffffff',
              color: '#8b5cf6',
              fontSize: '0.75rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              {(userProfile.name || userProfile.email)[0].toUpperCase()}
            </div>
            <span>{userProfile.name || userProfile.email.split('@')[0]}</span>
            <span style={{ fontSize: '0.65rem' }}>🟢</span>
          </a>
        ) : (
          <a href="/login" className="header-auth-btn">
            ✨ Login / Register
          </a>
        )}
      </nav>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="mobile-menu-toggle"
        aria-label="Toggle Navigation Menu"
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>
    </header>
  );
}
