'use client';

import React, { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="nav-header" style={{ position: 'relative' }}>
      {/* Brand Logo */}
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)'
        }}>
          💫
        </div>
        <div style={{ textAlign: 'left' }}>
          <span style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em'
          }}>
            MoodFlip
          </span>
          <span style={{ fontSize: '0.72rem', display: 'block', color: '#94a3b8', marginTop: '-3px', fontWeight: 600 }}>
            moodflip.coach
          </span>
        </div>
      </a>

      {/* Desktop & Mobile Navigation Links */}
      <nav className={`header-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="/" style={{ color: '#f8fafc', textDecoration: 'none' }}>Home</a>
        <a href="/about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About</a>
        <a href="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact</a>
        <a href="/privacy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy</a>
        <a href="/admin" style={{ color: '#c084fc', textDecoration: 'none', fontWeight: 700 }}>Admin</a>
      </nav>

      {/* Mobile Hamburger Menu Button */}
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
