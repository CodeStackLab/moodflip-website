'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid #eae3d6',
      backgroundColor: 'rgba(253, 251, 247, 0.92)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 10px rgba(60, 40, 100, 0.03)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 24px'
      }}>
        {/* LOGO */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            position: 'relative',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7147e8 0%, #a644c9 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(113, 71, 232, 0.25)',
            fontSize: '18px'
          }}>
            😊
          </div>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: '800', color: '#2d264b', letterSpacing: '-0.5px' }}>
            mood<span style={{ color: '#7147e8' }}>flip</span>
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '26px', fontSize: '14px', fontWeight: '600', color: '#6b638b' }}>
          <Link href="/" style={{ color: '#2d264b', textDecoration: 'none' }}>Home</Link>
          <a href="/#about" style={{ color: '#6b638b', textDecoration: 'none' }}>About</a>
          <a href="/#how" style={{ color: '#6b638b', textDecoration: 'none' }}>How It Works</a>
          <a href="/#library" style={{ color: '#6b638b', textDecoration: 'none' }}>Mood Library</a>
          <a href="/#resources" style={{ color: '#6b638b', textDecoration: 'none' }}>Resources</a>
          <a href="/#contact" style={{ color: '#6b638b', textDecoration: 'none' }}>Contact</a>
        </nav>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '38px',
              padding: '0 18px',
              borderRadius: '19px',
              border: '1px solid #dcd4ee',
              background: '#ffffff',
              color: '#683cd7',
              fontSize: '13px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(104, 60, 215, 0.08)'
            }}
          >
            <span>👤</span> Login
          </Link>

          <Link
            href="/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: '38px',
              padding: '0 20px',
              borderRadius: '19px',
              background: 'linear-gradient(135deg, #7147e8 0%, #a644c9 100%)',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(113, 71, 232, 0.28)'
            }}
          >
            ✨ Get 7-Day Plan
          </Link>
        </div>
      </div>
    </header>
  );
}
