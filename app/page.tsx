// Cache buster: 2026-08-08-counselor-v1.0
"use client";

import React, { useEffect, useMemo, useState, Fragment } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import BoxBreathingWidget from "@/components/BoxBreathingWidget";
import styles from "./page.module.css";
import { COUNSELOR_MOODS, CounselorPromptItem } from "@/data/moods";

const moods: CounselorPromptItem[] = COUNSELOR_MOODS;

const categories = [
  { name: "All", icon: "⊞" },
  { name: "Low", icon: "🥺" },
  { name: "Anxious", icon: "🌧️" },
  { name: "Angry", icon: "🔥" },
  { name: "Overwhelmed", icon: "〰️" },
  { name: "Lonely", icon: "👤" },
] as const;

const plans = [
  { icon: "📅", title: "7-Day Plan", text: "Build a better mindset starting today.", action: "View Plan →", kind: "planPurple", link: "/profile?tab=My%207-Day%20Plan" },
  { icon: "🗓️", title: "30-Day Plan", text: "Go deeper. Lasting change in 30 days.", action: "Explore →", kind: "planBlue", link: "/profile?tab=My%2030-Day%20Plan" },
  { icon: "🎁", title: "Daily Reminders", text: "Gentle nudges for your better days.", action: "Enable →", kind: "planGreen", link: "/profile?tab=Notifications" },
  { icon: "📊", title: "Track Progress", text: "See how far you’ve come.", action: "View Profile →", kind: "planPink", link: "/profile?tab=Dashboard" },
];

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button className={styles.iconButton} type="button" aria-label={label}>
      {children}
      <span>{label}</span>
    </button>
  );
}

export default function HomePage() {
  const [moodsList, setMoodsList] = useState<CounselorPromptItem[]>(COUNSELOR_MOODS);

  useEffect(() => {
    const loadMoods = () => {
      if (typeof window !== 'undefined') {
        const isV6Synced = localStorage.getItem('moodflip_counselor_v6_synced');
        if (!isV6Synced) {
          localStorage.setItem('moodflip_counselor_moods', JSON.stringify(COUNSELOR_MOODS));
          localStorage.setItem('moodflip_counselor_v6_synced', 'true');
          setMoodsList(COUNSELOR_MOODS);
          return;
        }
        const saved = localStorage.getItem('moodflip_counselor_moods');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setMoodsList(parsed);
            }
          } catch (e) {}
        } else {
          setMoodsList(COUNSELOR_MOODS);
        }
      }
    };
    loadMoods();
    window.addEventListener('storage', loadMoods);
    return () => window.removeEventListener('storage', loadMoods);
  }, []);

  const [category, setCategory] = useState<(typeof categories)[number]["name"]>("All");
  const [selectedMood, setSelectedMood] = useState<CounselorPromptItem | null>(null);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const [saved, setSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [flipData, setFlipData] = useState<{
    reframingQuote?: string;
    actionTitle?: string;
    actionSteps?: string[];
    scienceInsight?: string;
    target?: string;
  } | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [justGenerated, setJustGenerated] = useState(false);

  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [mobileStep, setMobileStep] = useState<'feeling' | 'result'>('feeling');
  const [showMobileSteps, setShowMobileSteps] = useState(false);

  useEffect(() => {
    const isLoggedIn = typeof window !== 'undefined' && (localStorage.getItem('userLoggedIn') === 'true' || localStorage.getItem('isLoggedIn') === 'true');
    if (isLoggedIn) return;

    // Show automatically 5 seconds after page load
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    // Re-appear automatically after 5 minutes (300,000 ms)
    setTimeout(() => {
      const isLoggedIn = typeof window !== 'undefined' && (localStorage.getItem('userLoggedIn') === 'true' || localStorage.getItem('isLoggedIn') === 'true');
      if (!isLoggedIn) {
        setShowWelcome(true);
      }
    }, 300000);
  };

  const handleFlipClick = () => {
    if (selectedMood && selectedFeeling) {
      // Use verified human-reviewed counselor prompt data directly (no AI API call)
      setFlipData({
        reframingQuote: selectedMood.reframeQuote || selectedMood.actionDesc,
        actionTitle: selectedMood.actionTitle,
        actionSteps: selectedMood.actions,
        scienceInsight: selectedMood.whyHelps,
        target: selectedMood.target
      });
      setJustGenerated(true);
      setTimeout(() => {
        const el = document.getElementById("positive-flip");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 50);
      setTimeout(() => setJustGenerated(false), 2500);
    }
  };

  const handleSmartRedirect = (targetTab: string) => {
    const isLoggedIn = typeof window !== 'undefined' && (localStorage.getItem('userLoggedIn') === 'true' || localStorage.getItem('isLoggedIn') === 'true');
    if (isLoggedIn) {
      window.location.href = `/profile?tab=${encodeURIComponent(targetTab)}`;
    } else {
      window.location.href = `/register?redirect=${encodeURIComponent(`/profile?tab=${targetTab}`)}`;
    }
  };

  const visibleMoods = useMemo(
    () => moodsList.filter((mood) => category === "All" || mood.category === category),
    [category, moodsList],
  );

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [running, seconds]);

  useEffect(() => {
    if (seconds === 0) setRunning(false);
  }, [seconds]);

  useEffect(() => {
    const scrollToCheckIn = () => {
      if (typeof window !== 'undefined' && (window.location.hash === '#check-in' || window.location.search.includes('checkin=true'))) {
        setTimeout(() => {
          const el = document.getElementById('check-in');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            el.style.transition = 'all 0.5s ease';
            el.style.boxShadow = '0 0 0 4px rgba(113, 71, 232, 0.4)';
            setTimeout(() => {
              el.style.boxShadow = 'none';
            }, 2500);
          }
        }, 150);
      }
    };
    scrollToCheckIn();
    window.addEventListener('hashchange', scrollToCheckIn);
    return () => window.removeEventListener('hashchange', scrollToCheckIn);
  }, []);

  function selectMood(mood: CounselorPromptItem) {
    setSelectedMood(mood);
    setSelectedFeeling(null);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setMobileStep('feeling');
      setMobileModalOpen(true);
    }
  }

  function resetAction() {
    setSeconds(60);
    setRunning(false);
  }

  return (
    <main className={styles.pageShell}>
      <div className={styles.appFrame}>
        <header className={styles.header}>
          <a className={styles.logo} href="#" aria-label="MoodFlip home">
            <span className={styles.logoMark} aria-hidden="true">
              <span />
              <span />
            </span>
            <span>mood<span>flip</span></span>
          </a>

          <nav className={styles.nav} aria-label="Primary navigation">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#how">How It Works</a>
            <a href="#library">Mood Library</a>
            <a href="#resources">Resources</a>
            <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span>Blog</span>
              <span style={{ fontSize: '9px', fontWeight: '900', background: '#7147e8', color: '#ffffff', padding: '2px 6px', borderRadius: '10px', lineHeight: 1 }}>NEW</span>
            </Link>
          </nav>

          <div className={styles.headerActions}>
            <a href="/login" className={styles.loginButton}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Login</span>
            </a>
            <button className={styles.planButton} type="button" onClick={() => handleSmartRedirect('My 7-Day Plan')}>Get 7-Day Plan</button>
            <button
              className={styles.mobileToggleBtn}
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              )}
            </button>
          </div>
        </header>

        {menuOpen && (
          <nav className={styles.mobileMenuDrawer} aria-label="Mobile Navigation">
            <div className={styles.mobileNavLinks}>
              <a href="#home" onClick={() => setMenuOpen(false)}>
                <span className={styles.mobileNavIcon}>🏠</span>
                <span>Home</span>
              </a>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                <span className={styles.mobileNavIcon}>ℹ️</span>
                <span>About</span>
              </a>
              <a href="#how" onClick={() => setMenuOpen(false)}>
                <span className={styles.mobileNavIcon}>⚙️</span>
                <span>How It Works</span>
              </a>
              <a href="#library" onClick={() => setMenuOpen(false)}>
                <span className={styles.mobileNavIcon}>📚</span>
                <span>Mood Library</span>
              </a>
              <a href="#resources" onClick={() => setMenuOpen(false)}>
                <span className={styles.mobileNavIcon}>🎁</span>
                <span>Resources</span>
              </a>
              <Link href="/blog" onClick={() => setMenuOpen(false)}>
                <span className={styles.mobileNavIcon}>📝</span>
                <span>Blog</span>
              </Link>
            </div>

            <div className={styles.mobileDrawerActions}>
              <a href="/login" className={styles.mobileLoginBtn} onClick={() => setMenuOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Login</span>
              </a>
              <a href="#" className={styles.mobilePlanBtn} onClick={(e) => { e.preventDefault(); setMenuOpen(false); handleSmartRedirect('My 7-Day Plan'); }}>
                <span>Get 7-Day Plan</span>
              </a>
            </div>
          </nav>
        )}

        {/* Animated Hero Intro Banner */}
        <section className={styles.heroIntroBanner}>
          <div className={styles.heroIntroContent}>
            <div className={styles.heroIntroBadge}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" fill="#f59e0b"/>
                <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span>Self-Reflection Utility &bull; Daily Mindset Shifts</span>
            </div>
            
            <h1 className={styles.heroIntroTitle}>
              Shift Your Mood,<br />
              <span className={styles.heroIntroGradientText}>Instantly &amp; Meaningfully.</span>
            </h1>
            
            <p className={styles.heroIntroSubtitle}>
              Simple daily check-ins, personalized 60-second micro-actions,<br className={styles.desktopBr} />
              and gentle guidance to help you find calm when feeling<br className={styles.desktopBr} />
              low, anxious, or overwhelmed.
            </p>

            <div className={styles.heroIntroPills}>
              <div className={styles.heroPillCard}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.2"/>
                  <path d="M12 6.5l4.5 1.8v3.6c0 3.1-4.5 5.3-4.5 5.3s-4.5-2.2-4.5-5.3V8.3L12 6.5z" fill="#ffffff" opacity="0.95"/>
                </svg>
                <span className={styles.pillTextBold}>100% Private &amp; Free</span>
              </div>

              <div className={styles.heroPillCard}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#f59e0b" stroke="#d97706" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
                <span className={styles.pillTextBold}>60-Second Micro-Actions</span>
              </div>

              <div className={styles.heroPillCard}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.5V11.5M12 11.5C12 7 16 3 21 3C21 8 17 12 12 12ZM12 11.5C12 7.5 8 4 3 4C3 9 7 12.5 12 12.5Z" stroke="#22c55e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className={styles.pillTextTwoLines}>
                  <span>Gentle Guidance,</span>
                  <span>Not Medical Advice</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.topAd} aria-label="Advertisement placeholder">
          <span className={styles.adBadge}>Ad</span>
          <span>Google AdSense Banner (728x90)</span>
        </section>

        <section className={styles.dashboard} id="home">
          <section className={styles.moodPanel} id="check-in">
            <div className={styles.stepHeader}>
              <div className={styles.stepTitle}><span>1</span><strong>STEP 1 · CHOOSE YOUR MOOD</strong></div>
              <div className={styles.stepCount}>1 of 2</div>
            </div>

            <h1>How are you feeling right now?</h1>
            <p className={styles.subheading}>Select the mood that feels closest to you.</p>

            <div className={styles.categoryRow} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '22px' }}>
              {categories.map((item) => {
                const isActive = category === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setCategory(item.name)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      borderRadius: '16px',
                      fontSize: '13.5px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      background: isActive ? 'linear-gradient(135deg, #7147E8, #8257F6)' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#1A1338',
                      border: isActive ? '1px solid #7147E8' : '1px solid #ECE7F5',
                      boxShadow: isActive ? '0 6px 18px rgba(113, 71, 232, 0.28)' : '0 2px 6px rgba(0,0,0,0.02)'
                    }}
                  >
                    <span style={{ fontSize: '17px', lineHeight: '1' }}>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.moodGrid}>
              {visibleMoods.map((mood) => {
                const isSelected = selectedMood?.name === mood.name;
                return (
                  <button
                    key={mood.name}
                    type="button"
                    className={`${styles.moodCard} ${isSelected ? styles.moodSelected : ""}`}
                    style={{
                      backgroundColor: isSelected ? '#F4EFFC' : mood.bgColor,
                      borderColor: isSelected ? '#7147E8' : 'rgba(0, 0, 0, 0.04)',
                      borderWidth: isSelected ? '2px' : '1px',
                      borderRadius: '20px',
                      padding: '18px 10px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isSelected ? '0 8px 24px rgba(113, 71, 232, 0.2)' : 'none',
                      transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'pointer'
                    }}
                    onClick={() => selectMood(mood)}
                  >
                    <span style={{ fontSize: '36px', lineHeight: '1', marginBottom: '8px' }}>{mood.emoji}</span>
                    <span style={{ fontWeight: '800', color: isSelected ? '#7147E8' : '#1A1338', fontSize: '13px' }}>{mood.name}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.tipBar}><span>⚗</span><strong>Tip:</strong>&nbsp;There’s no right or wrong choice. Be honest with how you feel.</div>

            <div className={styles.divider} />

            <div className={styles.stepHeader}>
              <div className={styles.stepTitle}><span>2</span><strong>STEP 2 · PICK EXACT FEELING</strong></div>
              <div className={styles.stepCount}>2 of 2</div>
            </div>

            {!selectedMood ? (
              <div className={styles.feelingPlaceholder}>☝&nbsp;&nbsp; Select a mood above to see specific feelings</div>
            ) : (
              <div className={styles.feelingChoices}>
                {selectedMood.feelings.map((feeling) => (
                  <button
                    key={feeling}
                    type="button"
                    className={selectedFeeling === feeling ? styles.feelingSelected : ""}
                    onClick={() => setSelectedFeeling(feeling)}
                  >
                    {feeling}
                  </button>
                ))}
              </div>
            )}

            <button
              className={styles.flipButton}
              type="button"
              disabled={!selectedMood || !selectedFeeling}
              onClick={handleFlipClick}
            >
              ✨ FLIP MY MOOD <span>→</span>
            </button>
          </section>

          <section
            className={styles.flipCard}
            id="positive-flip"
            style={{
              background: "url('/sunset-hero-bg.png') center 15% / cover no-repeat",
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: justGenerated ? 'scale(1.025)' : 'scale(1)',
              boxShadow: justGenerated ? '0 0 40px rgba(113, 71, 232, 0.5), 0 12px 40px rgba(0,0,0,0.12)' : 'none',
              borderRadius: '24px'
            }}
          >

            <div className={styles.cardToolbar}>
              <span />
              <div>
                <button type="button" className={styles.topIconBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg> Save
                </button>
                <button type="button" className={styles.topIconBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg> Share
                </button>
              </div>
            </div>

            <div className={styles.flipIntro}>
              <span className={styles.checkCircle}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              Here&apos;s your <strong>positive flip</strong>
            </div>

            <div className={styles.sunBadge}>
              <span className={styles.sunCore}>
                <svg width="48" height="40" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="sunGradient" x1="24" y1="14" x2="24" y2="27" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFC107" />
                      <stop offset="100%" stopColor="#FF9800" />
                    </linearGradient>
                    <linearGradient id="oceanGradient1" x1="10" y1="28" x2="38" y2="32" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FF7675" />
                      <stop offset="100%" stopColor="#E84393" />
                    </linearGradient>
                    <linearGradient id="oceanGradient2" x1="14" y1="34" x2="34" y2="37.5" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FD79A8" />
                      <stop offset="100%" stopColor="#E84393" />
                    </linearGradient>
                  </defs>
                  <rect x="22.5" y="2" width="3" height="7" rx="1.5" fill="#FFC107" />
                  <rect x="11.5" y="6" width="3" height="6.5" rx="1.5" transform="rotate(-45 11.5 6)" fill="#FFC107" />
                  <rect x="33.5" y="8" width="3" height="6.5" rx="1.5" transform="rotate(45 33.5 8)" fill="#FFC107" />
                  <rect x="4" y="19" width="6.5" height="3" rx="1.5" fill="#FFB300" />
                  <rect x="37.5" y="19" width="6.5" height="3" rx="1.5" fill="#FFB300" />
                  <path d="M12 27A12 12 0 0 1 36 27H12Z" fill="url(#sunGradient)" />
                  <rect x="10" y="28" width="28" height="4" rx="2" fill="url(#oceanGradient1)" />
                  <rect x="14" y="34" width="20" height="3.5" rx="1.75" fill="url(#oceanGradient2)" />
                </svg>
              </span>
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1a1338', margin: '0 0 10px 0', lineHeight: '1.3', letterSpacing: '-0.5px', transition: 'all 0.5s ease' }}>
              {flipData?.target || selectedMood?.target || 'Towards Calm & Clarity'}
            </h2>
            <p style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#3d2f6e',
              lineHeight: '1.6',
              margin: '0 0 14px 0',
              padding: '12px 16px',
              background: justGenerated ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.72)',
              borderRadius: '12px',
              borderLeft: '4px solid #7147E8',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.5s ease',
              boxShadow: justGenerated ? '0 4px 20px rgba(113, 71, 232, 0.25)' : 'none'
            }}>
              {flipData?.reframingQuote || selectedMood?.reframeQuote || "You've got this. Small steps lead to big shifts."}
            </p>

            {/* ⚡ ULTRA-PREMIUM 60-SECOND ACTION CARD ⚡ */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(113, 71, 232, 0.18)',
              borderRadius: '20px',
              padding: '20px',
              margin: '16px 0',
              boxShadow: '0 8px 30px rgba(113, 71, 232, 0.08)',
              textAlign: 'left'
            }}>
              
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#7147E8', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>✨</span> YOUR 60-SECOND ACTION
                </span>
                <span style={{ fontSize: '12px', fontWeight: '800', background: 'rgba(113, 71, 232, 0.12)', color: '#7147E8', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>⏱</span> {seconds}s
                </span>
              </div>

              {/* Steps & Timer Body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                {/* Primary Action Title */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(245, 240, 255, 0.9), rgba(253, 240, 250, 0.9))',
                  borderLeft: '4px solid #7147E8',
                  padding: '12px 14px',
                  borderRadius: '12px'
                }}>
                  <strong style={{ fontSize: '15px', fontWeight: '800', color: '#1A1338', lineHeight: '1.4', display: 'block' }}>
                    {flipData?.actionTitle || selectedMood?.actionTitle || 'Take 3 deep, grounding breaths.'}
                  </strong>
                </div>

                {/* Numbered Sub-steps */}
                {Boolean(flipData?.actionSteps || selectedMood?.actions) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', padding: '2px 0' }}>
                    {(flipData?.actionSteps || selectedMood?.actions || []).map((step, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: '#7147E8',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: '800',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}>
                          {idx + 1}
                        </span>
                        <span style={{ fontSize: '13.5px', fontWeight: '600', color: '#4A3F6D', lineHeight: '1.55' }}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                                   {/* Interactive Timer Control Bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#FAF8FD',
                  border: '1px solid #EAE3F2',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  marginTop: '4px'
                }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (seconds === 0) resetAction();
                      setRunning((v) => !v);
                    }}
                    style={{
                      background: running ? '#1A1338' : 'linear-gradient(135deg, #7147E8, #9333EA)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 18px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(113, 71, 232, 0.25)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{running ? 'Ⅱ' : '▶'}</span>
                    <span>{running ? 'Pause Timer' : 'Start 60s Reset'}</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: running ? 'rgba(113, 71, 232, 0.15)' : '#F0EBFA',
                      border: '2px solid #7147E8',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: '1'
                    }}>
                      <strong style={{ fontSize: '15px', fontWeight: '900', color: '#7147E8' }}>{seconds}</strong>
                      <small style={{ fontSize: '7px', fontWeight: '800', color: '#7147E8' }}>SEC</small>
                    </div>
                    {seconds < 60 && (
                      <button
                        type="button"
                        onClick={resetAction}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#8A81A8',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Ultra-Premium Science Insight Card */}
              <div style={{
                marginTop: '16px',
                padding: '12px 14px',
                background: 'linear-gradient(135deg, rgba(246, 240, 255, 0.85), rgba(254, 242, 248, 0.85))',
                border: '1px solid rgba(113, 71, 232, 0.18)',
                borderLeft: '4px solid #7147E8',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                boxShadow: '0 4px 15px rgba(113, 71, 232, 0.05)'
              }}>
                <span style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'rgba(113, 71, 232, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  flexShrink: 0,
                  marginTop: '1px'
                }}>🧬</span>
                <div>
                  <strong style={{ fontSize: '11px', fontWeight: '900', color: '#7147E8', letterSpacing: '0.6px', display: 'block', marginBottom: '3px', textTransform: 'uppercase' }}>
                    WHY THIS HELPS (SCIENCE-BACKED INSIGHT)
                  </strong>
                  <p style={{ fontSize: '12.5px', fontWeight: '600', color: '#4A3F6D', lineHeight: '1.5', margin: 0 }}>
                    {flipData?.scienceInsight || selectedMood?.whyHelps || "Gentle touch and slow breathing activate the vagus nerve, lowering cortisol and signaling safety to the brain, while acknowledging small wins releases dopamine."}
                  </p>
                </div>
              </div>

              {/* Show Animated Box Breathing Circle ONLY AFTER user clicks FLIP MY MOOD */}
              {Boolean(flipData) && (
                <div style={{ marginTop: '24px', paddingTop: '6px' }}>
                  <BoxBreathingWidget />
                </div>
              )}

            </div>

            <div className={styles.flipActions}>
              <button type="button" onClick={() => { setSelectedMood(null); setSelectedFeeling(null); setFlipData(null); }}><span>⟳</span> Try Another</button>
              <button
                type="button"
                className={styles.saveButton}
                onClick={() => setSaved((value) => !value)}
              >
                <span>{saved ? "✓" : "🔖"}</span> {saved ? "Saved to My Check-ins" : "Save to My Check-ins"}
              </button>
            </div>
          </section>

          <aside className={styles.morePanel}>
            <h3>✨ More for You</h3>
            <div className={styles.planList}>
              {plans.map((plan) => (
                <article key={plan.title} className={`${styles.planCard} ${styles[plan.kind]}`}>
                  <div className={styles.planIcon}>{plan.icon}</div>
                  <div>
                    <strong>{plan.title}</strong>
                    <p>{plan.text}</p>
                    <a href={plan.link}>{plan.action}</a>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.privacyBox}>
              <div className={styles.privacyLockIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div>
                <strong>Your data is private</strong>
                <p>We use encryption &amp; auto-delete your data after 90 days.</p>
              </div>
            </div>
          </aside>

          {/* Welcome Back Floating Card Popup (Anchored at Bottom-Right of Dashboard) */}
          {showWelcome && (
            <aside className={styles.welcomeCardPopup} aria-label="Welcome Back Prompt">
              <button
                type="button"
                className={styles.welcomeCloseBtn}
                onClick={handleDismissWelcome}
                aria-label="Close message"
              >
                ✕
              </button>
              <div className={styles.welcomeCardHeader}>
                <div className={styles.welcomeAvatarCircle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#683cd7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div>
                  <h3>Welcome Back! 👋</h3>
                  <p>Create a profile to save your mood check-ins and get personalized support.</p>
                </div>
              </div>
              <a href="/register" className={styles.welcomeCreateBtn}>
                Create My Profile
              </a>
              <button
                type="button"
                className={styles.welcomeMaybeBtn}
                onClick={handleDismissWelcome}
              >
                Maybe Later
              </button>
              <span className={styles.welcomeSubnote}>It only takes 30 seconds.</span>
            </aside>
          )}
        </section>

        <section className={styles.trustStrip}>
          <article><span className={`${styles.trustIcon} ${styles.trustPurple}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span><div><strong>Private &amp; Secure</strong><p>Your data is encrypted<br />and protected.</p></div></article>
          <article><span className={`${styles.trustIcon} ${styles.trustGreen}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span><div><strong>90-Day Auto Delete</strong><p>We automatically delete your<br />data after 90 days.</p></div></article>
          <article><span className={`${styles.trustIcon} ${styles.trustRed}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></span><div><strong>Not Therapy</strong><p>MoodFlip is a self-reflection<br />utility, not a medical service.</p></div></article>
          <article><span className={`${styles.trustIcon} ${styles.trustBlue}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span><div><strong>You&apos;re Not Alone</strong><p>Millions use MoodFlip for small<br />shifts, every day.</p></div></article>
          <article><span className={`${styles.trustIcon} ${styles.trustOrange}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span><div><strong>Made with Care</strong><p>Simple tools for a better<br />you, one step at a time.</p></div></article>
        </section>

        <section className={styles.bottomAd} aria-label="Advertisement placeholder">
          <span className={styles.adBadge}>Ad</span>
          <span>Google AdSense Banner (728x90)</span>
        </section>


        {/* Section 1: How MoodFlip Works */}
        <section id="how" className={styles.howSection}>
          <div className={styles.howHeader}>
            <h2>How MoodFlip Works</h2>
            <p>A simple 5-step journey to a better you.</p>
          </div>
          <div className={styles.stepsFlow}>
            {[
              {
                icon: (
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="8" height="8" rx="2.5" fill="#0284C7" fillOpacity="0.85" />
                    <rect x="13" y="3" width="8" height="8" rx="2.5" fill="#38BDF8" fillOpacity="0.85" />
                    <rect x="3" y="13" width="8" height="8" rx="2.5" fill="#0EA5E9" fillOpacity="0.85" />
                    <rect x="13" y="13" width="8" height="8" rx="2.5" fill="#7DD3FC" fillOpacity="0.85" />
                  </svg>
                ),
                color: 'how_blue',
                step: '1',
                title: 'Choose Your Mood',
                desc: 'Pick the mood that feels closest to you.'
              },
              {
                icon: (
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="9" width="14" height="11" rx="3" fill="#DDD6FE" />
                    <path d="M17.5 13C19.433 13 21 11.433 21 9.5C21 7.76 19.73 6.32 18.06 6.05C17.62 3.73 15.57 2 13 2C10.74 2 8.84 3.32 8.19 5.25C7.5 5.16 4 6.73 4 8.66C4 9.84 4.21 10.37 4.21 10.84C2.91 11.37 2 12.64 2 14.12C2 16.1 3.61 17.71 5.59 17.71H17.5" fill="#8B5CF6" />
                  </svg>
                ),
                color: 'how_purple',
                step: '2',
                title: 'Pick Exact Feeling',
                desc: 'Select the feeling that matches you best.'
              },
              {
                icon: (
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6"/>
                    <path d="M2.5 11.5a10 10 0 0 1 15.9-4.8L21.5 8M2.5 16l3.1 1.3a10 10 0 0 0 15.9-4.8"/>
                  </svg>
                ),
                color: 'how_green',
                step: '3',
                title: 'Flip Your Mood',
                desc: 'We find your positive counterpart.'
              },
              {
                icon: (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="12" fill="#F43F5E" />
                    <path d="M9.5 8.5L16.5 12L9.5 15.5V8.5Z" fill="white" />
                  </svg>
                ),
                color: 'how_pink',
                step: '4',
                title: 'Get 60-Second Action',
                desc: 'A short action to shift your energy.'
              },
              {
                icon: (
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7C3 5.89543 3.89543 5 5 5H9.58579C10.1162 5 10.6249 5.21071 11 5.58579L12.4142 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" fill="#F59E0B" />
                    <rect x="7" y="13" width="2" height="3" rx="0.5" fill="white" />
                    <rect x="11" y="11" width="2" height="5" rx="0.5" fill="white" />
                    <rect x="15" y="9" width="2" height="7" rx="0.5" fill="white" />
                  </svg>
                ),
                color: 'how_orange',
                step: '5',
                title: 'Save & Track Progress',
                desc: 'Save your check-in and see growth.'
              }
            ].map((step) => (
              <div key={step.title} className={styles.howStep}>
                <div className={`${styles.howIcon} ${styles[step.color]}`}>
                  {step.icon}
                </div>
                <b>{step.step}</b>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {step.step !== '5' && <div className={styles.dashedArrow}></div>}
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: 7-Day Plan Promo */}
        <section className={styles.planSection}>
          <div className={styles.bookWrap}>
            <img
              src="/7day-book-cover-3d-v6.png"
              alt="MoodFlip 7-Day Plan Book Cover"
              className={styles.bookImg}
            />
          </div>
          <div className={styles.planCopy}>
            <h2>Build a Better Mindset in Just 7 Days</h2>
            <p>Simple daily check-ins, practical actions, real change.</p>
            <ul>
              <li><span className={styles.planCheckIcon} aria-hidden="true"></span> Daily mood check-ins</li>
              <li><span className={styles.planCheckIcon} aria-hidden="true"></span> Personalized 60-second actions</li>
              <li><span className={styles.planCheckIcon} aria-hidden="true"></span> 7-day PDF report</li>
              <li><span className={styles.planCheckIcon} aria-hidden="true"></span> Gentle guidance for you</li>
            </ul>
          </div>
          <div className={styles.priceCard}>
            <h3>7-Day Plan</h3>
            <p>Perfect for getting started</p>
            <strong><span>$</span>7</strong>
            <span className={styles.oneTimePay}>One-time payment</span>
            <button type="button" onClick={() => handleSmartRedirect('My 7-Day Plan')}>Get 7-Day Plan Now</button>
            <small>Secure payment • Instant PDF</small>
          </div>
        </section>

        {/* Section 3: Explore Your Feelings */}
        <section id="library" className={styles.librarySection}>
          <div className={styles.howHeader}>
            <h2>Explore Your Feelings</h2>
            <p>Browse common moods and learn how to shift them.</p>
          </div>
          <div className={styles.libraryGrid}>
            {[
              {
                title: 'Anxiety',
                sub: 'Find calm & clarity',
                colorClass: styles.library_cyan,
                iconBg: '#E0F2FE',
                icon: (
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L14.5 8.5L21.5 9L16 13.5L18 20.5L12 16.5L6 20.5L8 13.5L2.5 9L9.5 8.5L12 2Z" fill="#0EA5E9" fillOpacity="0.85" stroke="#0284C7" strokeWidth="1.5" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" fill="#38BDF8"/>
                    <circle cx="12" cy="12" r="1.2" fill="white"/>
                  </svg>
                )
              },
              {
                title: 'Stress',
                sub: 'Find balance',
                colorClass: styles.library_orange,
                iconBg: '#FFEBE0',
                icon: (
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="3" fill="#EA580C"/>
                    <path d="M12 3C12.8 3 13.5 4.5 13.5 6C13.5 7.5 12.8 9 12 9C11.2 9 10.5 7.5 10.5 6C10.5 4.5 11.2 3 12 3Z" fill="#F97316"/>
                    <path d="M12 15C12.8 15 13.5 16.5 13.5 18C13.5 19.5 12.8 21 12 21C11.2 21 10.5 19.5 10.5 18C10.5 16.5 11.2 15 12 15Z" fill="#F97316"/>
                    <path d="M3 12C3 11.2 4.5 10.5 6 10.5C7.5 10.5 9 11.2 9 12C9 12.8 7.5 13.5 6 13.5C4.5 13.5 3 12.8 3 12Z" fill="#F97316"/>
                    <path d="M15 12C15 11.2 16.5 10.5 18 10.5C19.5 10.5 21 11.2 21 12C21 12.8 19.5 13.5 18 13.5C16.5 13.5 15 12.8 15 12Z" fill="#F97316"/>
                    <path d="M5.636 5.636C6.2 5.07 7.76 5.77 8.82 6.83C9.88 7.89 10.58 9.45 10.02 10.02C9.45 10.58 7.89 9.88 6.83 8.82C5.77 7.76 5.07 6.2 5.636 5.636Z" fill="#FB923C"/>
                    <path d="M13.98 13.98C14.55 13.41 16.11 14.12 17.17 15.18C18.23 16.24 18.93 17.8 18.36 18.36C17.8 18.93 16.24 18.23 15.18 17.17C14.12 16.11 13.41 14.55 13.98 13.98Z" fill="#FB923C"/>
                  </svg>
                )
              },
              {
                title: 'Sadness',
                sub: 'Find light again',
                colorClass: styles.library_blue,
                iconBg: '#EEF2FF',
                icon: (
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9.5" fill="#818CF8" fillOpacity="0.3" stroke="#4F46E5" strokeWidth="1.8"/>
                    <ellipse cx="8.5" cy="9.5" rx="1.2" ry="1.8" fill="#312E81"/>
                    <ellipse cx="15.5" cy="9.5" rx="1.2" ry="1.8" fill="#312E81"/>
                    <path d="M7 7.5C8 6.8 9.5 6.8 10 7.2" stroke="#312E81" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M17 7.5C16 6.8 14.5 6.8 14 7.2" stroke="#312E81" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M15.5 16.2C14.5 14.8 13.2 14.2 12 14.2C10.8 14.2 9.5 14.8 8.5 16.2" stroke="#312E81" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                )
              },
              {
                title: 'Anger',
                sub: 'Find peace',
                colorClass: styles.library_rose,
                iconBg: '#FFE4E6',
                icon: (
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#EF4444"/>
                    <rect x="11.2" y="7.5" width="1.6" height="5" rx="0.8" fill="white"/>
                    <circle cx="12" cy="14.5" r="1" fill="white"/>
                  </svg>
                )
              },
              {
                title: 'Loneliness',
                sub: 'Find connection',
                colorClass: styles.library_sky,
                iconBg: '#E0F2FE',
                icon: (
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="7.5" r="4.5" fill="#2563EB"/>
                    <path d="M4 19.5C4 16 7.5 13.5 12 13.5C16.5 13.5 20 16 20 19.5" fill="#3B82F6"/>
                  </svg>
                )
              },
              {
                title: 'Overwhelmed',
                sub: 'Find control',
                colorClass: styles.library_violet,
                iconBg: '#F3E8FF',
                icon: (
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 4a6 6 0 1 1-6 6 6 6 0 0 1 6-6zm0 3a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/>
                  </svg>
                )
              }
            ].map(mood => (
              <div key={mood.title} className={`${styles.libraryCard} ${mood.colorClass}`}>
                <span className={styles.libraryIconWrap} style={{ background: mood.iconBg }}>
                  {mood.icon}
                </span>
                <div>
                  <strong>{mood.title}</strong>
                  <p>{mood.sub}</p>
                  <button type="button" style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', font: 'inherit', cursor: 'pointer' }} onClick={() => handleSmartRedirect('Mood Library')}>View &rarr;</button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className={styles.allMoodsButton} onClick={() => handleSmartRedirect('Mood Library')}>View All Moods &rarr;</button>
        </section>



        {/* Section 4: About MoodFlip */}
        <section id="about" className={styles.aboutSection}>
          <div className={styles.aboutIllustration}>
            <img
              src="/about-girl.png"
              alt="About MoodFlip - Self reflection utility illustration"
              className={styles.aboutImg}
            />
          </div>
          <div className={styles.aboutCopy}>
            <h2>About MoodFlip</h2>
            <p>MoodFlip is a self-reflection utility designed to help you find your mood match, meaningfully.</p>
            <p>We are not a therapy or medical service. We provide simple tools, not medical advice.</p>
            <p className={styles.emergencyNotice}>For emergencies, please contact local emergency services.</p>
          </div>
          <div className={styles.aboutPoints}>
            <p><span>💗</span> Self-reflection, not diagnosis</p>
            <p><span>🛠️</span> Practical tools for daily life</p>
            <p><span>🌱</span> Designed with care &amp; empathy</p>
            <p><span>🔒</span> Your privacy comes first</p>
          </div>
        </section>

        {/* Section 5: Frequently Asked Questions */}
        <section className={styles.faqSection}>
          <div className={styles.faqHeader}>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqGrid}>
            {[
              "Is MoodFlip a therapy or medical service?",
              "Do I need an account to use MoodFlip?",
              "How does the 60-second action work?",
              "How long is my data kept?",
              "How is my data stored and protected?",
              "Can I get a refund on my plan?"
            ].map((q, i) => (
              <details key={i}>
                <summary><span>{q}</span> <span className={styles.faqArrow}>▼</span></summary>
                <p>MoodFlip provides simple, accessible self-reflection tools to help you shift your mindset. We are not a medical service or therapy replacement.</p>
              </details>
            ))}
          </div>
        </section>


        {/* Section: Resources Hub — anchored at #resources */}
        <section id="resources" style={{ background: 'linear-gradient(180deg, #F9F7FD 0%, #F3EEFA 100%)', borderTop: '1px solid #EAE3F2', borderBottom: '1px solid #EAE3F2', padding: '44px 16px', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle ambient background glow */}
          <div style={{ position: 'absolute', top: '0', left: '10%', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(113,71,232,0.06)', filter: 'blur(70px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '0', right: '10%', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(217,80,192,0.05)', filter: 'blur(70px)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {/* Badge + heading */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EAE0FD', border: '1px solid #D8C8F8', color: '#7147E8', fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '999px', marginBottom: '12px' }}>
                📚 Free Resources
              </span>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: '900', color: '#15183B', margin: '0 0 8px', lineHeight: 1.2 }}>
                Your Wellness Resource Hub
              </h2>
              <p style={{ color: '#68607F', fontSize: '0.9rem', fontWeight: '600', maxWidth: '540px', margin: '0 auto 24px' }}>
                Curated guides, science-backed articles, exercises, and tools — all free.
              </p>
            </div>

            {/* Resource cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '28px' }}>
              {[
                { emoji: '⚡', title: 'Instant Mood Flip', desc: '60-second micro-actions to shift your emotional state right now.', link: '/#check-in', iconBg: 'linear-gradient(135deg, #7147E8, #9333EA)', badgeBg: 'rgba(113,71,232,0.08)', badgeText: '#7147E8' },
                { emoji: '🧠', title: 'Mindset Science', desc: 'Evidence-based articles on neuroplasticity and cognitive reframing.', link: '/blog', iconBg: 'linear-gradient(135deg, #3B82F6, #1D4ED8)', badgeBg: 'rgba(59,130,246,0.08)', badgeText: '#2563EB' },
                { emoji: '📅', title: '7-Day Reset Plan', desc: 'Structured daily plan to rewire negative thought patterns.', link: '/profile?tab=My%207-Day%20Plan', iconBg: 'linear-gradient(135deg, #10B981, #047857)', badgeBg: 'rgba(16,185,129,0.08)', badgeText: '#059669' },
                { emoji: '🆘', title: 'Crisis Support', desc: 'Immediate help resources. Call 988 (US) or text HOME to 741741.', link: '/resources#crisis', iconBg: 'linear-gradient(135deg, #F43F5E, #BE123C)', badgeBg: 'rgba(244,63,94,0.08)', badgeText: '#E11D48' },
              ].map((card, i) => (
                <a key={i} href={card.link} style={{ display: 'flex', flexDirection: 'column', background: '#FFFFFF', border: '1px solid #EAE3F2', borderRadius: '18px', padding: '20px 18px', color: '#15183B', textDecoration: 'none', transition: 'all 0.2s ease', boxShadow: '0 4px 16px rgba(113, 71, 232, 0.03)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.borderColor = '#7147E8'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 25px rgba(113, 71, 232, 0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.borderColor = '#EAE3F2'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(113, 71, 232, 0.03)'; }}
                >
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: '#fff', marginBottom: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}>
                    {card.emoji}
                  </div>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', fontWeight: '800', color: '#15183B', margin: '0 0 6px' }}>{card.title}</h3>
                  <p style={{ fontSize: '12px', color: '#68607F', fontWeight: '500', lineHeight: 1.55, flex: 1, margin: '0 0 14px' }}>{card.desc}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '800', color: card.badgeText, background: card.badgeBg, padding: '4px 10px', borderRadius: '8px', width: 'fit-content' }}>Explore →</span>
                </a>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a href="/resources" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#7147E8', color: '#FFFFFF', padding: '11px 22px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(113, 71, 232, 0.25)', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'none'}
              >
                🎁 Browse All Resources
              </a>
              <a href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', border: '1px solid #EAE3F2', color: '#15183B', padding: '11px 22px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F4EFFC'; (e.currentTarget as HTMLElement).style.borderColor = '#D8C8F8'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#FFFFFF'; (e.currentTarget as HTMLElement).style.borderColor = '#EAE3F2'; }}
              >
                📝 Read the Blog
              </a>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <a className={`${styles.logo} ${styles.footerLogo}`} href="#">
            <span className={styles.logoMark} aria-hidden="true"><span /><span /></span>
            <span>mood<span>flip</span></span>
          </a>
          <p>A self-reflection utility for real life.</p>
          <nav>
            <a href="/#about">About</a>
            <a href="/#library">Mood Library</a>
            <a href="/resources">Resources</a>
            <a href="/blog">Blog</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms</a>
            <a href="/refund">Refund Policy</a>
            <a href="/contact">Contact</a>
          </nav>
          <span>© 2026 MoodFlip.coach 💜</span>
        </footer>


        {/* 📱 MOBILE STEP-BY-STEP BOTTOM SHEET WIZARD 📱 */}
        {mobileModalOpen && selectedMood && (
          <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-xs flex items-end justify-center sm:hidden animate-in fade-in duration-200">
            <div className="w-full bg-white rounded-t-[32px] p-6 max-h-[92vh] flex flex-col overflow-hidden border-t border-[#EAE3F2] shadow-2xl relative animate-in slide-in-from-bottom-8 duration-300">
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setMobileModalOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-base font-extrabold w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer z-20"
              >
                ✕
              </button>

              {/* STEP 2: PICK FEELING */}
              {mobileStep === 'feeling' && (
                <div className="space-y-5 text-left overflow-y-auto pr-1 pt-2 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-black text-[#7147E8] uppercase tracking-wider mb-1">
                      <span>Step 2 of 2</span> · <span>{selectedMood.emoji} {selectedMood.name}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-extrabold text-[#1A1338]">
                      How does your {selectedMood.name.toLowerCase()} feel?
                    </h3>
                    <p className="text-xs text-[#68607F] font-semibold mt-1">
                      Pick the exact feeling that matches you right now.
                    </p>
                  </div>

                  {/* Feeling Buttons Grid */}
                  <div className="grid grid-cols-1 gap-2.5 max-h-[48vh] overflow-y-auto pr-1">
                    {selectedMood.feelings.map((feeling) => (
                      <button
                        key={feeling}
                        type="button"
                        onClick={() => setSelectedFeeling(feeling)}
                        className={`w-full p-3.5 rounded-2xl border text-sm font-extrabold transition-all text-left flex items-center justify-between cursor-pointer ${
                          selectedFeeling === feeling
                            ? 'border-[#7147E8] bg-[#F4EFFC] text-[#7147E8] shadow-md ring-2 ring-[#7147E8]/20'
                            : 'border-[#F0EBFA] bg-[#FAF8FD] text-[#4A4268]'
                        }`}
                      >
                        <span>{feeling}</span>
                        {selectedFeeling === feeling && <span>✓</span>}
                      </button>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    disabled={!selectedFeeling}
                    onClick={() => {
                      if (selectedFeeling && selectedMood) {
                        setFlipData({
                          reframingQuote: selectedMood.reframeQuote || selectedMood.actionDesc,
                          actionTitle: selectedMood.actionTitle,
                          actionSteps: selectedMood.actions,
                          scienceInsight: selectedMood.whyHelps,
                          target: selectedMood.target
                        });
                        setMobileStep('result');
                      }
                    }}
                    className="w-full py-4 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-[#7147E8] to-[#9333EA] shadow-lg shadow-[#7147E8]/25 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>✨</span> <span>FLIP MY MOOD →</span>
                  </button>
                </div>
              )}

              {/* STEP 3: RESULT VIEW */}
              {mobileStep === 'result' && (
                <div className="flex flex-col h-full overflow-hidden text-left">
                  
                  {/* Scrollable Content Body */}
                  <div className="flex-1 overflow-y-auto pr-1.5 pb-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 pt-1">
                      <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        ✓ POSITIVE FLIP GENERATED
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-extrabold text-[#1A1338] leading-tight">
                      {flipData?.target || selectedMood?.target || 'Towards Calm & Clarity'}
                    </h3>

                    <p className="text-xs font-semibold text-[#3d2f6e] leading-relaxed p-3.5 bg-[#F8F5FE] border-l-4 border-[#7147E8] rounded-xl">
                      {flipData?.reframingQuote || selectedMood?.reframeQuote || "You've got this. Small steps lead to big shifts."}
                    </p>

                    {/* 60-Second Action Box (Collapsible) */}
                    <div className="p-3.5 rounded-2xl bg-white border border-[#EAE3F2] shadow-sm space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-black text-[#7147E8]">
                        <span>✨ YOUR 60-SECOND ACTION</span>
                        <span className="bg-purple-100 px-2.5 py-0.5 rounded-full text-[10px]">⏱ {seconds}s</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#F5F0FF] border-l-4 border-[#7147E8] text-xs font-extrabold text-[#1A1338]">
                        {flipData?.actionTitle || selectedMood?.actionTitle || 'Take 3 deep breaths.'}
                      </div>

                      {/* Collapsible Action Steps Toggle */}
                      {(flipData?.actionSteps || selectedMood?.actions) && (
                        <div>
                          <button
                            type="button"
                            onClick={() => setShowMobileSteps((v) => !v)}
                            className="w-full py-2 px-3 rounded-xl bg-[#F4EFFC] hover:bg-[#EAE1FA] border border-[#E2D9F5] text-[11.5px] font-extrabold text-[#7147E8] flex items-center justify-between transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                          >
                            <span className="flex items-center gap-1.5">
                              <span>📋</span>
                              <span>{showMobileSteps ? 'Hide 3-Step Guide' : 'View 3-Step Guide'}</span>
                            </span>
                            <span className="flex items-center gap-1 bg-[#7147E8] text-white px-2 py-0.5 rounded-lg text-[10px] font-extrabold">
                              <span>{showMobileSteps ? '▲' : '▼'}</span>
                              <span>{(flipData?.actionSteps || selectedMood?.actions || []).length || 3} Steps</span>
                            </span>
                          </button>

                          {showMobileSteps && (
                            <div className="space-y-2 text-xs font-semibold text-[#4A3F6D] pt-2 border-t border-purple-100 mt-1.5 animate-in fade-in duration-200">
                              {(flipData?.actionSteps || selectedMood?.actions || []).map((s, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <span className="w-4 h-4 rounded-full bg-[#7147E8] text-white text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                                  <span>{s}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          if (seconds === 0) resetAction();
                          setRunning((v) => !v);
                        }}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{running ? 'Ⅱ' : '▶'}</span>
                        <span>{running ? 'Pause Timer' : 'Start 60s Reset'}</span>
                      </button>
                    </div>

                    {/* Animated Box Breathing Widget in Mobile Modal (ACTIVE & VISIBLE BY DEFAULT) */}
                    <div className="pt-1 pb-2">
                      <BoxBreathingWidget />
                    </div>

                    {/* Science Insight */}
                    <div className="p-3 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA] text-[11px] text-[#5B5278] font-medium space-y-1">
                      <strong className="block text-[#7147E8] font-black">🧬 WHY THIS HELPS</strong>
                      <p className="leading-relaxed">{flipData?.scienceInsight || selectedMood?.whyHelps || "Gentle breathing activates the vagus nerve, reducing cortisol."}</p>
                    </div>
                  </div>

                  {/* Fixed Bottom Action Buttons Bar */}
                  <div className="pt-3 pb-1 bg-white border-t border-gray-100 flex gap-2 shrink-0 z-10">
                    <button
                      type="button"
                      onClick={() => { setMobileStep('feeling'); setSelectedFeeling(null); }}
                      className="flex-1 py-3.5 rounded-xl bg-gray-100 text-[#1A1338] font-extrabold text-xs hover:bg-gray-200 cursor-pointer"
                    >
                      ⟳ Try Another
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSaved(!saved); setMobileModalOpen(false); }}
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white font-extrabold text-xs shadow-md cursor-pointer"
                    >
                      {saved ? '✓ Saved' : '🔖 Save & Close'}
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </main>
  );
}
