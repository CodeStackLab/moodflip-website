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

        {/* Dynamic User Profile or Login CTA */}
        {userProfile ? (
          <a href="/profile" className="header-auth-btn" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: '#ffffff' }}>
            👤 {userProfile.name || userProfile.email.split('@')[0]}
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
