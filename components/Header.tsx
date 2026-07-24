'use client';

import React, { useState, useEffect } from 'react';

export default function Header() {
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

      {/* Navigation Links & Dedicated Auth Button */}
      <nav className={`header-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="/" className="nav-link active">Home</a>
        <a href="/about" className="nav-link">About</a>
        <a href="/contact" className="nav-link">Contact</a>
        <a href="/privacy" className="nav-link">Privacy</a>
        <a href="/admin" className="nav-link admin-link">Admin</a>

        {/* Prominent Login / Register Link Button (Navigates directly to /login page) */}
        <a
          href="/login"
          className="header-auth-btn"
          id="header-login-register-btn"
        >
          {userProfile ? `👤 ${userProfile.name || userProfile.email.split('@')[0]}` : '✨ Login / Register'}
        </a>
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
