// Cache buster: 2026-08-04-v1.0.2
"use client";

import React, { useEffect, useMemo, useState, Fragment } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import HeroSectionExact from "@/components/HeroSectionExact";
import AdBanner from "@/components/AdBanner";
import styles from "./page.module.css";

type Mood = {
  name: string;
  emoji: string;
  category: "Low" | "Anxious" | "Angry" | "Overwhelmed" | "Lonely";
  tone: string;
  bgColor: string;
  feelings: string[];
};

const moods: Mood[] = [
  { name: "Sad", emoji: "😢", category: "Low", tone: "lavender", bgColor: "#F0EBFB", feelings: ["Down", "Heavy", "Blue"] },
  { name: "Hopeless", emoji: "☁️", category: "Low", tone: "gray", bgColor: "#F2F4F7", feelings: ["Stuck", "Defeated", "Empty"] },
  { name: "Disappointed", emoji: "💔", category: "Low", tone: "rose", bgColor: "#FFF0F3", feelings: ["Let down", "Discouraged", "Unseen"] },
  { name: "Lonely", emoji: "👤", category: "Lonely", tone: "blue", bgColor: "#EEF6FF", feelings: ["Disconnected", "Left out", "Missing someone"] },
  { name: "Tired", emoji: "🔋", category: "Low", tone: "green", bgColor: "#ECFDF5", feelings: ["Drained", "Sleepy", "Burnt out"] },
  { name: "Anxious", emoji: "🎯", category: "Anxious", tone: "cyan", bgColor: "#E6F7FF", feelings: ["Nervous", "Uneasy", "On edge"] },
  { name: "Worried", emoji: "🌧️", category: "Anxious", tone: "aqua", bgColor: "#EAF8F6", feelings: ["Concerned", "Restless", "Uncertain"] },
  { name: "Overwhelmed", emoji: "🌀", category: "Overwhelmed", tone: "purple", bgColor: "#F6F0FD", feelings: ["Flooded", "Scattered", "Too much"] },
  { name: "Stressed", emoji: "🌩️", category: "Overwhelmed", tone: "violet", bgColor: "#FBF0F8", feelings: ["Pressured", "Tense", "Rushed"] },
  { name: "Insecure", emoji: "🛡️", category: "Anxious", tone: "peach", bgColor: "#FFF7EB", feelings: ["Doubtful", "Exposed", "Not enough"] },
  { name: "Angry", emoji: "😡", category: "Angry", tone: "red", bgColor: "#FFF0F0", feelings: ["Mad", "Furious", "Resentful"] },
  { name: "Frustrated", emoji: "💥", category: "Angry", tone: "orange", bgColor: "#FFF4EB", feelings: ["Blocked", "Annoyed", "Impatient"] },
  { name: "Irritable", emoji: "😟", category: "Angry", tone: "yellow", bgColor: "#FFFDEB", feelings: ["Snappy", "Agitated", "Bothered"] },
  { name: "Guilty", emoji: "🥺", category: "Low", tone: "mauve", bgColor: "#F8EFFC", feelings: ["Regretful", "Ashamed", "Responsible"] },
  { name: "Stuck", emoji: "🔒", category: "Overwhelmed", tone: "slate", bgColor: "#F3F4F6", feelings: ["Frozen", "Confused", "Unable to move"] },
];

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
  const [category, setCategory] = useState<(typeof categories)[number]["name"]>("All");
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const [saved, setSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiData, setAiData] = useState<{
    reframingQuote?: string;
    actionTitle?: string;
    actionSteps?: string[];
    scienceInsight?: string;
  } | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [justGenerated, setJustGenerated] = useState(false);

  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [mobileStep, setMobileStep] = useState<'feeling' | 'result'>('feeling');

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

  const fetchAiFlip = async (moodName: string, feelingName: string) => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/flip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: moodName, feeling: feelingName })
      });
      const data = await res.json();
      if (data.success && data.aiData) {
        setAiData(data.aiData);
        setJustGenerated(true);
        setTimeout(() => {
          const el = document.getElementById("positive-flip");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 50);
        setTimeout(() => setJustGenerated(false), 2500);
      }
    } catch (e) {
      // silently handle error
    } finally {
      setAiLoading(false);
    }
  };

  const handleFlipClick = () => {
    if (selectedMood && selectedFeeling) {
      fetchAiFlip(selectedMood.name, selectedFeeling);
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
    () => moods.filter((mood) => category === "All" || mood.category === category),
    [category],
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

  function selectMood(mood: Mood) {
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
          <Link className={styles.logo} href="/" aria-label="MoodFlip home">
            <img
              src="/moodflip-logo.png"
              alt="MoodFlip"
              style={{ height: '48px', maxHeight: '48px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </Link>

          <nav className={styles.nav} aria-label="Primary navigation">
            <Link href="/">Mood Tool</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/login">Login</Link>
          </nav>

          <div className={styles.headerActions}>
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
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <span className={styles.mobileNavIcon}>🏠</span>
                <span>Mood Tool</span>
              </Link>
              <Link href="/about" onClick={() => setMenuOpen(false)}>
                <span className={styles.mobileNavIcon}>ℹ️</span>
                <span>About</span>
              </Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                <span className={styles.mobileNavIcon}>✉️</span>
                <span>Contact</span>
              </Link>
              <Link href="/privacy" onClick={() => setMenuOpen(false)}>
                <span className={styles.mobileNavIcon}>🔒</span>
                <span>Privacy Policy</span>
              </Link>
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <span className={styles.mobileNavIcon}>🔑</span>
                <span>Login</span>
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



        <AdBanner placement="headerBanner" />

        {/* Exact Hero Section matching the design reference */}
        <section id="home" style={{ width: '100%', maxWidth: '1240px', margin: '0 auto 28px auto', padding: '0 16px' }}>
          <HeroSectionExact
            onFlipTriggered={(mood, feeling) => {
              fetchAiFlip(mood, feeling);
            }}
            aiData={aiData}
            aiLoading={aiLoading}
          />
        </section>

        {/* More For You & Plans Quick Access */}
        <section style={{ width: '100%', maxWidth: '1240px', margin: '0 auto 36px auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1A1338', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✨</span> More for You
            </h3>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#7147E8' }}>Guided Plans &amp; Tools</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {plans.map((plan) => (
              <article
                key={plan.title}
                className={`${styles.planCard} ${styles[plan.kind]}`}
                style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px', padding: '18px 20px', borderRadius: '18px', background: '#FFFFFF', border: '1px solid #ECE7F5', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}
              >
                <div className={styles.planIcon} style={{ fontSize: '28px', lineHeight: 1 }}>{plan.icon}</div>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '15px', fontWeight: '800', color: '#1A1338', display: 'block', marginBottom: '4px' }}>{plan.title}</strong>
                  <p style={{ fontSize: '13px', color: '#5C527A', margin: '0 0 8px 0', lineHeight: '1.4' }}>{plan.text}</p>
                  <a href={plan.link} style={{ fontSize: '13px', fontWeight: '700', color: '#7147E8', textDecoration: 'none' }}>{plan.action}</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.trustStrip}>
          <article><span className={`${styles.trustIcon} ${styles.trustPurple}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span><div><strong>Private &amp; Secure</strong><p>Your data is encrypted<br />and protected.</p></div></article>
          <article><span className={`${styles.trustIcon} ${styles.trustGreen}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span><div><strong>90-Day Auto Delete</strong><p>We automatically delete your<br />data after 90 days.</p></div></article>
          <article><span className={`${styles.trustIcon} ${styles.trustRed}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></span><div><strong>Not Therapy</strong><p>MoodFlip is a self-reflection<br />utility, not a medical service.</p></div></article>
          <article><span className={`${styles.trustIcon} ${styles.trustBlue}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span><div><strong>You&apos;re Not Alone</strong><p>Millions use MoodFlip for small<br />shifts, every day.</p></div></article>
          <article><span className={`${styles.trustIcon} ${styles.trustOrange}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span><div><strong>Made with Care</strong><p>Simple tools for a better<br />you, one step at a time.</p></div></article>
        </section>

        <AdBanner placement="footerBanner" />


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









        {/* 📱 MOBILE STEP-BY-STEP BOTTOM SHEET WIZARD 📱 */}
        {mobileModalOpen && selectedMood && (
          <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-xs flex items-end justify-center sm:hidden animate-in fade-in duration-200">
            <div className="w-full bg-white rounded-t-[32px] p-6 max-h-[90vh] overflow-y-auto space-y-5 border-t border-[#EAE3F2] shadow-2xl relative animate-in slide-in-from-bottom-8 duration-300">
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setMobileModalOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-base font-extrabold w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>

              {/* STEP 2: PICK FEELING */}
              {mobileStep === 'feeling' && (
                <div className="space-y-5 text-left">
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

                  {/* Feeling Buttons */}
                  <div className="grid grid-cols-1 gap-2.5">
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
                    disabled={!selectedFeeling || aiLoading}
                    onClick={() => {
                      if (selectedFeeling) {
                        setMobileStep('result');
                        fetchAiFlip(selectedMood.name, selectedFeeling);
                      }
                    }}
                    className="w-full py-4 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-[#7147E8] to-[#9333EA] shadow-lg shadow-[#7147E8]/25 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {aiLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>🤖 MOODFLIP COACH THINKING...</span>
                      </>
                    ) : (
                      <>
                        <span>✨</span> <span>FLIP MY MOOD →</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* STEP 3: RESULT VIEW */}
              {mobileStep === 'result' && (
                <div className="space-y-4 text-left">
                  {aiLoading ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-14 h-14 bg-purple-100 text-[#7147E8] rounded-full flex items-center justify-center text-2xl mx-auto animate-bounce">
                        ✨
                      </div>
                      <h4 className="font-serif text-lg font-extrabold text-[#1A1338]">Finding your positive flip...</h4>
                      <p className="text-xs text-gray-500 font-medium">MoodFlip Coach is processing your mindset shift.</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          ✓ POSITIVE FLIP GENERATED
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-extrabold text-[#1A1338] leading-tight">
                        {aiData?.actionTitle || 'Towards Calm & Clarity'}
                      </h3>

                      <p className="text-xs font-semibold text-[#3d2f6e] leading-relaxed p-3.5 bg-[#F8F5FE] border-l-4 border-[#7147E8] rounded-xl">
                        {aiData?.reframingQuote || "You've got this. Small steps lead to big shifts."}
                      </p>

                      {/* 60-Second Action Box */}
                      <div className="p-4 rounded-2xl bg-white border border-[#EAE3F2] shadow-sm space-y-3">
                        <div className="flex items-center justify-between text-xs font-black text-[#7147E8]">
                          <span>✨ YOUR 60-SECOND ACTION</span>
                          <span className="bg-purple-100 px-2.5 py-0.5 rounded-full">⏱ {seconds}s</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#F5F0FF] border-l-4 border-[#7147E8] text-xs font-extrabold text-[#1A1338]">
                          {aiData?.actionSteps && aiData.actionSteps.length > 0 ? aiData.actionSteps[0] : 'Take 3 deep breaths.'}
                        </div>

                        {aiData?.actionSteps && aiData.actionSteps.length > 1 && (
                          <div className="space-y-2 text-xs font-semibold text-[#4A3F6D]">
                            {aiData.actionSteps.slice(1).map((s, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="w-5 h-5 rounded-full bg-[#7147E8] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                                <span>{s}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (seconds === 0) resetAction();
                              setRunning((v) => !v);
                            }}
                            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>{running ? 'Ⅱ' : '▶'}</span>
                            <span>{running ? 'Pause' : 'Start 60s Reset'}</span>
                          </button>
                          <Link
                            href="/profile?tab=60-Second+Actions"
                            className="py-3 px-3.5 rounded-xl bg-[#F4EFFC] text-[#7147E8] border border-[#DCD4EE] font-extrabold text-xs flex items-center justify-center gap-1 cursor-pointer text-decoration-none"
                          >
                            <span>🧘</span>
                            <span>Mood Breath →</span>
                          </Link>
                        </div>
                      </div>

                      {/* Science Insight */}
                      <div className="p-3 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA] text-[11px] text-[#5B5278] font-medium space-y-1">
                        <strong className="block text-[#7147E8] font-black">🧬 WHY THIS HELPS</strong>
                        <p className="leading-relaxed">{aiData?.scienceInsight || "Gentle breathing activates the vagus nerve, reducing cortisol."}</p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => { setMobileStep('feeling'); setSelectedFeeling(null); }}
                          className="flex-1 py-3 rounded-xl bg-gray-100 text-[#1A1338] font-extrabold text-xs hover:bg-gray-200 cursor-pointer"
                        >
                          ⟳ Try Another
                        </button>
                        <button
                          type="button"
                          onClick={() => { setSaved(!saved); setMobileModalOpen(false); }}
                          className="flex-1 py-3 rounded-xl bg-[#7147E8] text-white font-extrabold text-xs shadow-md cursor-pointer"
                        >
                          {saved ? '✓ Saved' : '🔖 Save & Close'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </main>
  );
}
