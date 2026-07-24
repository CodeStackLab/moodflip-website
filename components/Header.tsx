'use client';

import React, { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="nav-header" style={{ position: 'relative' }}>
      {/* Brand Logo */}
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #7c5cbf 0%, #a855f7 50%, #e59849 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          boxShadow: '0 6px 18px rgba(124, 92, 191, 0.25)'
        }}>
          💫
        </div>
        <div style={{ textAlign: 'left' }}>
          <span style={{
            fontSize: '1.6rem',
            fontWeight: 800,
            color: '#2d2638',
            fontFamily: "'Playfair Display', Georgia, serif",
            letterSpacing: '-0.02em'
          }}>
            Mood<span style={{ color: '#e59849' }}>Flip</span>
          </span>
          <span style={{ fontSize: '0.72rem', display: 'block', color: '#7c5cbf', marginTop: '-4px', fontWeight: 700 }}>
            moodflip.coach
          </span>
        </div>
      </a>

      {/* Navigation Links */}
      <nav className={`header-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="/" style={{ color: '#2d2638', textDecoration: 'none', fontWeight: 700 }}>Home</a>
        <a href="/about" style={{ color: '#6e6578', textDecoration: 'none' }}>About</a>
        <a href="/contact" style={{ color: '#6e6578', textDecoration: 'none' }}>Contact</a>
        <a href="/privacy" style={{ color: '#6e6578', textDecoration: 'none' }}>Privacy</a>
        <a href="/admin" style={{ color: '#7c5cbf', textDecoration: 'none', fontWeight: 800 }}>Admin</a>
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
