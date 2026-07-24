'use client';

import React, { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <a href="/" className="active">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy</a>
        <a href="/admin" className="admin-link">Admin</a>
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
