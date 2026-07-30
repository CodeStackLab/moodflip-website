'use client';

import React, { useState, useEffect, useRef } from 'react';
import { supabaseBrowser } from '@/lib/supabaseBrowser';
import { usePathname } from 'next/navigation';

/* ─── Language Data ─── */
const LANGUAGES = [
  { code: 'en', flag: '🇺🇸', label: 'English',  native: 'English',    gtCode: 'en' },
  { code: 'hi', flag: '🇮🇳', label: 'Hindi',    native: 'हिन्दी',     gtCode: 'hi' },
  { code: 'es', flag: '🇪🇸', label: 'Spanish',  native: 'Español',    gtCode: 'es' },
  { code: 'fr', flag: '🇫🇷', label: 'French',   native: 'Français',   gtCode: 'fr' },
  { code: 'ar', flag: '🇸🇦', label: 'Arabic',   native: 'العربية',    gtCode: 'ar' },
  { code: 'de', flag: '🇩🇪', label: 'German',   native: 'Deutsch',    gtCode: 'de' },
  { code: 'pt', flag: '🇧🇷', label: 'Portuguese',native: 'Português', gtCode: 'pt' },
  { code: 'zh', flag: '🇨🇳', label: 'Chinese',  native: '中文',       gtCode: 'zh-CN' },
  { code: 'ja', flag: '🇯🇵', label: 'Japanese', native: '日本語',     gtCode: 'ja' },
  { code: 'ko', flag: '🇰🇷', label: 'Korean',   native: '한국어',     gtCode: 'ko' },
];

/* ─── SVG Icons ─── */
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function GlobeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [theme, setTheme] = useState('light');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(LANGUAGES[0]);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('moodflip_profile');
    if (saved) { try { setUserProfile(JSON.parse(saved)); } catch (_) {} }

    const savedTheme = (localStorage.getItem('moodflip_theme') as 'light' | 'dark') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedLang = localStorage.getItem('moodflip_lang');
    if (savedLang) {
      const found = LANGUAGES.find(l => l.code === savedLang);
      if (found) setActiveLang(found);
    }
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    setIsLangOpen(false);
  }, [pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) setIsUserDropdownOpen(false);
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) setIsLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('moodflip_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const selectLang = (lang: typeof LANGUAGES[0]) => {
    setActiveLang(lang);
    setIsLangOpen(false);
    localStorage.setItem('moodflip_lang', lang.code);
    // Trigger Google Translate
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = lang.gtCode;
      select.dispatchEvent(new Event('change'));
    } else {
      // Fallback: redirect with Google Translate
      if (lang.code !== 'en') {
        const url = `https://translate.google.com/translate?sl=en&tl=${lang.gtCode}&u=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
      }
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/disclaimer', label: 'Disclaimer' },
  ];

  const isDark = theme === 'dark';

  return (
    <>
      <style>{`
        /* ─── NAV LINK UNDERLINE ─── */
        .mf-nav-link {
          position: relative; padding-bottom: 2px;
          color: var(--text-subtle); text-decoration: none;
          font-weight: 600; font-size: 0.875rem;
          transition: color 0.18s ease;
        }
        .mf-nav-link::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: -2px;
          height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, #7c54d1, #ec4899);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.22s cubic-bezier(0.4,0,0.2,1);
        }
        .mf-nav-link:hover::after, .mf-nav-link.active::after { transform: scaleX(1); }
        .mf-nav-link:hover, .mf-nav-link.active { color: #7c54d1 !important; }

        /* ─── ICON BUTTON ─── */
        .mf-icon-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 10px;
          border: 1.5px solid var(--card-border);
          background: var(--tile-bg);
          color: var(--text-subtle);
          cursor: pointer; transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .mf-icon-btn:hover { color: #7c54d1; border-color: #c4b0e6; background: var(--tile-selected-bg); }

        /* ─── NAV SEPARATOR ─── */
        .mf-nav-sep {
          width: 1px; height: 22px;
          background: var(--card-border);
          flex-shrink: 0;
        }

        /* ─── LANGUAGE SELECTOR ─── */
        .mf-lang-wrapper { position: relative; }
        .mf-lang-btn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.38rem 0.75rem 0.38rem 0.55rem;
          border-radius: 9999px;
          border: 1.5px solid var(--card-border);
          background: var(--tile-bg);
          color: var(--text-main);
          font-size: 0.8rem; font-weight: 700;
          cursor: pointer; transition: all 0.2s ease;
          font-family: inherit; white-space: nowrap;
        }
        .mf-lang-btn:hover { border-color: #c4b0e6; background: var(--tile-selected-bg); color: #7c54d1; }
        .mf-lang-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          min-width: 220px; z-index: 9999;
          background: var(--card-bg);
          border: 1.5px solid var(--card-border);
          border-radius: 18px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.06);
          overflow: hidden;
          animation: langDropIn 0.18s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes langDropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .mf-lang-header {
          padding: 0.75rem 1rem 0.55rem;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid var(--card-border);
        }
        .mf-lang-header-label {
          font-size: 0.68rem; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-subtle);
        }
        .mf-lang-list { padding: 0.5rem; max-height: 320px; overflow-y: auto; }
        .mf-lang-item {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.6rem 0.75rem; border-radius: 10px;
          cursor: pointer; transition: background 0.14s ease;
          border: none; background: transparent; width: 100%;
          text-align: left; font-family: inherit;
        }
        .mf-lang-item:hover { background: var(--tile-selected-bg); }
        .mf-lang-item.active { background: var(--tile-selected-bg); }
        .mf-lang-flag { font-size: 1.25rem; line-height: 1; flex-shrink: 0; }
        .mf-lang-texts { flex: 1; }
        .mf-lang-name { font-size: 0.84rem; font-weight: 700; color: var(--text-main); line-height: 1.1; }
        .mf-lang-native { font-size: 0.72rem; color: var(--text-subtle); margin-top: 1px; }
        .mf-lang-check { color: #7c54d1; font-size: 1rem; flex-shrink: 0; }

        /* ─── LOGIN BUTTON ─── */
        .header-login-btn {
          display: inline-flex; align-items: center; gap: 0.42rem;
          padding: 0.46rem 1.2rem;
          background: linear-gradient(135deg, #0ea5e9 0%, #10b981 100%);
          color: #ffffff; border-radius: 9999px;
          font-weight: 700; font-size: 0.84rem;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(14,165,233,0.3);
          transition: all 0.22s cubic-bezier(0.4,0,0.2,1);
          border: none; cursor: pointer; font-family: inherit;
        }
        .header-login-btn:hover {
          background: linear-gradient(135deg, #0284c7 0%, #059669 100%);
          box-shadow: 0 6px 24px rgba(14,165,233,0.42);
          transform: translateY(-1px);
        }
        .header-login-btn:active { transform: translateY(0); }

        /* ─── USER BADGE ─── */
        .user-badge-btn {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.3rem 0.75rem 0.3rem 0.35rem;
          border-radius: 9999px; cursor: pointer;
          transition: all 0.2s ease; font-family: inherit;
          font-size: 0.84rem; font-weight: 700;
        }
        .user-badge-btn:hover { box-shadow: 0 4px 14px rgba(124,84,209,0.18); }
        .user-dropdown-wrapper { position: relative; }
        .user-dropdown-caret {
          font-size: 0.6rem; opacity: 0.65;
          transition: transform 0.2s ease;
          display: inline-block;
        }
        .user-dropdown-caret.open { transform: rotate(180deg); }
        .user-dropdown-menu {
          position: absolute; top: calc(100% + 10px); right: 0;
          min-width: 210px; z-index: 9999;
          border: 1.5px solid var(--card-border);
          border-radius: 18px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.05);
          overflow: hidden;
          animation: langDropIn 0.18s cubic-bezier(0.22,1,0.36,1) forwards;
          padding: 0.4rem;
        }
        .user-dropdown-header {
          padding: 0.65rem 0.8rem 0.5rem;
          border-bottom: 1px solid var(--card-border);
          margin-bottom: 0.35rem;
        }
        .user-dropdown-item {
          display: flex; align-items: center; gap: 0.6rem;
          padding: 0.6rem 0.85rem; border-radius: 10px;
          font-size: 0.875rem; font-weight: 600;
          text-decoration: none; cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
          border: none; width: 100%; text-align: left;
          font-family: inherit; background: transparent; color: var(--text-main);
        }
        .user-dropdown-item:hover { background: var(--tile-selected-bg); }
        .user-dropdown-item.danger { color: #ef4444; }
        .user-dropdown-item.danger:hover { background: rgba(239,68,68,0.08); }
        .user-dropdown-divider { height: 1px; background: var(--card-border); margin: 0.3rem 0.5rem; }

        /* ─── HAMBURGER ─── */
        .nav-hamburger {
          display: none; background: transparent;
          border: 1.5px solid var(--card-border); border-radius: 10px;
          width: 38px; height: 38px;
          align-items: center; justify-content: center;
          cursor: pointer; flex-direction: column; gap: 5px;
          padding: 0; transition: background 0.2s ease;
        }
        .nav-hamburger:hover { background: var(--tile-bg); }
        .nav-hamburger span {
          display: block; width: 18px; height: 2px;
          background: var(--text-main); border-radius: 2px;
          transition: all 0.3s ease;
        }
        .nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ─── MOBILE DRAWER ─── */
        .mobile-nav-drawer {
          display: none; position: absolute;
          top: calc(100% + 0.5rem); left: 0; right: 0;
          background: var(--card-bg); border: 1.5px solid var(--card-border);
          border-radius: 20px; padding: 1.1rem 1.25rem;
          box-shadow: 0 16px 40px rgba(0,0,0,0.12); z-index: 200;
          flex-direction: column; gap: 0.2rem;
          animation: langDropIn 0.22s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .mobile-nav-drawer.open { display: flex; }
        .mobile-nav-link {
          display: block; padding: 0.65rem 0.85rem; border-radius: 12px;
          font-size: 0.9rem; font-weight: 600; color: var(--text-subtle);
          text-decoration: none; transition: background 0.18s ease, color 0.18s ease;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active { background: var(--tile-selected-bg); color: #7c54d1; }
        .mobile-nav-divider { height: 1px; background: var(--card-border); margin: 0.45rem 0; }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 901px) {
          .mobile-nav-drawer { display: none !important; }
          .mobile-only { display: none !important; }
        }
      `}</style>

      {/* ─── GOOGLE TRANSLATE (hidden widget) ─── */}
      <div id="google_translate_element" style={{ display: 'none' }} />

      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0.55rem 1.2rem',
        background: 'var(--header-bg)',
        backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid var(--card-border)',
        borderRadius: '9999px',
        margin: '0.75rem 0 1.5rem 0',
        boxShadow: '0 8px 32px rgba(72,60,108,0.06), 0 2px 8px rgba(0,0,0,0.02)',
        position: 'relative', zIndex: 100, width: '100%',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>

        {/* ── BRAND LOGO ── */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #7c54d1 0%, #e77c74 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', boxShadow: '0 4px 14px rgba(124,84,209,0.3)', flexShrink: 0,
          }}>💫</div>
          <div>
            <span style={{ display: 'block', fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1 }}>MoodFlip</span>
            <span style={{ display: 'block', color: 'var(--text-subtle)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.04em', marginTop: '1px' }}>moodflip.coach</span>
          </div>
        </a>

        {/* ── DESKTOP NAV ── */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.35rem', fontSize: '0.875rem' }}>
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href}
              className={`mf-nav-link ${pathname === href ? 'active' : ''}`}
            >{label}</a>
          ))}

          {/* ── Separator ── */}
          <div className="mf-nav-sep" />

          {/* ── Language Selector ── */}
          <div className="mf-lang-wrapper" ref={langDropdownRef}>
            <button
              className="mf-lang-btn"
              onClick={() => { setIsLangOpen(p => !p); setIsUserDropdownOpen(false); }}
              id="lang-selector-btn"
              title="Select Language"
            >
              <GlobeIcon size={14} />
              <span style={{ fontSize: '1rem', lineHeight: 1 }}>{activeLang.flag}</span>
              <span style={{ fontSize: '0.78rem', letterSpacing: '0.01em' }}>{activeLang.label}</span>
              <span style={{ fontSize: '0.55rem', opacity: 0.6, transition: 'transform 0.2s ease', transform: isLangOpen ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>▼</span>
            </button>

            {isLangOpen && (
              <div className="mf-lang-dropdown">
                <div className="mf-lang-header">
                  <span className="mf-lang-header-label">Select Language</span>
                  <GlobeIcon size={14} />
                </div>
                <div className="mf-lang-list">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      className={`mf-lang-item ${lang.code === activeLang.code ? 'active' : ''}`}
                      onClick={() => selectLang(lang)}
                    >
                      <span className="mf-lang-flag">{lang.flag}</span>
                      <span className="mf-lang-texts">
                        <div className="mf-lang-name">{lang.label}</div>
                        <div className="mf-lang-native">{lang.native}</div>
                      </span>
                      {lang.code === activeLang.code && <span className="mf-lang-check">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Theme Toggle ── */}
          <button
            onClick={toggleTheme}
            className="mf-icon-btn"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            id="theme-toggle-btn"
            style={{
              background: isDark ? 'rgba(124,84,209,0.15)' : '#f4edfa',
              borderColor: isDark ? '#4c347d' : '#d8c4ef',
              color: isDark ? '#c084fc' : '#7c54d1',
            }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* ── Separator ── */}
          <div className="mf-nav-sep" />

          {/* ── User Profile / Login ── */}
          {userProfile ? (
            <div className="user-dropdown-wrapper" ref={userDropdownRef}>
              <button
                className="user-badge-btn"
                onClick={() => setIsUserDropdownOpen(p => !p)}
                style={{
                  background: isDark ? 'rgba(30,24,46,0.95)' : '#ffffff',
                  border: '1.5px solid ' + (isDark ? '#3d2e5a' : '#e2d9f3'),
                  color: isDark ? '#f3e8ff' : '#362854',
                }}
                aria-haspopup="true"
                aria-expanded={isUserDropdownOpen}
                id="user-profile-dropdown-btn"
              >
                {/* Avatar */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: '#1c152d', border: '2px solid #eab308',
                    color: '#eab308', fontSize: '0.82rem', fontWeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 10px rgba(234,179,8,0.35)',
                  }}>
                    {(userProfile.name ? userProfile.name[0] : (userProfile.email?.[0] ?? 'U')).toUpperCase()}
                  </div>
                  <div style={{
                    position: 'absolute', right: '-1px', bottom: '-1px',
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: '#22c55e', border: '1.5px solid #1c152d',
                  }} />
                </div>
                <span>{userProfile.name || userProfile.email.split('@')[0]}</span>
                <span style={{
                  background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
                  color: '#fff', fontSize: '0.6rem', fontWeight: 900,
                  letterSpacing: '0.05em', padding: '0.15rem 0.45rem',
                  borderRadius: '9999px', textTransform: 'uppercase',
                }}>
                  {userProfile.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? 'ADMIN' : 'USER'}
                </span>
                <span className={`user-dropdown-caret ${isUserDropdownOpen ? 'open' : ''}`}>▼</span>
              </button>

              {isUserDropdownOpen && (
                <div className="user-dropdown-menu" style={{ background: isDark ? '#1a1228' : '#ffffff' }} role="menu">
                  <div className="user-dropdown-header">
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)' }}>{userProfile.name || userProfile.email.split('@')[0]}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', marginTop: '2px' }}>{userProfile.email}</div>
                  </div>
                  <a href="/profile" className="user-dropdown-item" role="menuitem" onClick={() => setIsUserDropdownOpen(false)}><span>👤</span><span>My Profile</span></a>
                  {userProfile.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                    <a href="/admin" className="user-dropdown-item" role="menuitem" onClick={() => setIsUserDropdownOpen(false)}><span>🛡️</span><span>Admin Panel</span></a>
                  )}
                  <div className="user-dropdown-divider" />
                  <button className="user-dropdown-item danger" role="menuitem" onClick={async () => { setIsUserDropdownOpen(false); await supabaseBrowser?.auth.signOut(); localStorage.removeItem('moodflip_profile'); window.location.href = '/'; }}>
                    <span>🚪</span><span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="/login" className="header-login-btn" id="header-login-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              <span>Login</span>
            </a>
          )}
        </nav>

        {/* ── MOBILE RIGHT CONTROLS ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Mobile theme icon */}
          <button
            onClick={toggleTheme}
            className="nav-hamburger"
            style={{
              background: isDark ? 'rgba(124,84,209,0.15)' : '#f4edfa',
              borderColor: isDark ? '#4c347d' : '#d8c4ef',
              color: isDark ? '#c084fc' : '#7c54d1',
              width: '38px', height: '38px', borderRadius: '10px',
              border: '1.5px solid',
              display: 'none', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'row', gap: 0, padding: 0, cursor: 'pointer',
            }}
            id="mobile-theme-btn"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Hamburger */}
          <button
            className={`nav-hamburger ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* ── MOBILE DRAWER ── */}
        <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className={`mobile-nav-link ${pathname === href ? 'active' : ''}`}>{label}</a>
          ))}
          <div className="mobile-nav-divider" />

          {/* Mobile language selector */}
          <div style={{ padding: '0.3rem 0.5rem 0.5rem' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Language</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {LANGUAGES.slice(0, 6).map(lang => (
                <button key={lang.code} onClick={() => { selectLang(lang); setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                    padding: '0.35rem 0.65rem', borderRadius: '9999px',
                    border: lang.code === activeLang.code ? '1.5px solid #7c54d1' : '1px solid var(--card-border)',
                    background: lang.code === activeLang.code ? 'var(--tile-selected-bg)' : 'transparent',
                    color: lang.code === activeLang.code ? '#7c54d1' : 'var(--text-subtle)',
                    fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  <span>{lang.flag}</span><span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mobile-nav-divider" />

          <div style={{ display: 'flex', gap: '0.6rem', padding: '0.25rem 0' }}>
            {userProfile ? (
              <a href="/profile" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', padding: '0.65rem', background: 'linear-gradient(135deg, #7c54d1, #ec4899)', color: '#fff', borderRadius: '12px', fontWeight: 700, fontSize: '0.86rem', textDecoration: 'none' }}>
                👤 My Profile
              </a>
            ) : (
              <a href="/login" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', padding: '0.65rem', background: 'linear-gradient(135deg, #0ea5e9, #10b981)', color: '#fff', borderRadius: '12px', fontWeight: 700, fontSize: '0.86rem', textDecoration: 'none' }}>
                Login
              </a>
            )}
          </div>
        </div>

      </header>

      {isMobileMenuOpen && (
        <div onClick={() => setIsMobileMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'transparent' }} />
      )}
    </>
  );
}
