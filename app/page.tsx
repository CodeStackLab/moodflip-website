// Cache buster: 2026-08-04-v1.0.2
"use client";

import React, { useEffect, useMemo, useState, Fragment } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import styles from "./page.module.css";

type Mood = {
  name: string;
  emoji: string;
  category: "Low" | "Anxious" | "Angry" | "Overwhelmed" | "Lonely";
  tone: string;
  feelings: string[];
};

const moods: Mood[] = [
  { name: "Sad", emoji: "😢", category: "Low", tone: "lavender", feelings: ["Down", "Heavy", "Blue"] },
  { name: "Hopeless", emoji: "☁️", category: "Low", tone: "gray", feelings: ["Stuck", "Defeated", "Empty"] },
  { name: "Disappointed", emoji: "💔", category: "Low", tone: "rose", feelings: ["Let down", "Discouraged", "Unseen"] },
  { name: "Lonely", emoji: "🧍", category: "Lonely", tone: "blue", feelings: ["Disconnected", "Left out", "Missing someone"] },
  { name: "Tired", emoji: "🪫", category: "Low", tone: "green", feelings: ["Drained", "Sleepy", "Burnt out"] },
  { name: "Anxious", emoji: "🫀", category: "Anxious", tone: "cyan", feelings: ["Nervous", "Uneasy", "On edge"] },
  { name: "Worried", emoji: "🌧️", category: "Anxious", tone: "aqua", feelings: ["Concerned", "Restless", "Uncertain"] },
  { name: "Overwhelmed", emoji: "🌸", category: "Overwhelmed", tone: "purple", feelings: ["Flooded", "Scattered", "Too much"] },
  { name: "Stressed", emoji: "⚡", category: "Overwhelmed", tone: "violet", feelings: ["Pressured", "Tense", "Rushed"] },
  { name: "Insecure", emoji: "🛡️", category: "Anxious", tone: "peach", feelings: ["Doubtful", "Exposed", "Not enough"] },
  { name: "Angry", emoji: "😡", category: "Angry", tone: "red", feelings: ["Mad", "Furious", "Resentful"] },
  { name: "Frustrated", emoji: "💢", category: "Angry", tone: "orange", feelings: ["Blocked", "Annoyed", "Impatient"] },
  { name: "Irritable", emoji: "😤", category: "Angry", tone: "yellow", feelings: ["Snappy", "Agitated", "Bothered"] },
  { name: "Guilty", emoji: "😞", category: "Low", tone: "mauve", feelings: ["Regretful", "Ashamed", "Responsible"] },
  { name: "Stuck", emoji: "🔐", category: "Overwhelmed", tone: "slate", feelings: ["Frozen", "Confused", "Unable to move"] },
];

const categories = [
  { name: "All", icon: "⊞", iconBg: "#7147e8", iconColor: "#fff" },
  { name: "Low", icon: "😢", iconBg: "", iconColor: "" },
  { name: "Anxious", icon: "🌧️", iconBg: "", iconColor: "" },
  { name: "Angry", icon: "🔥", iconBg: "", iconColor: "" },
  { name: "Overwhelmed", icon: "〰️", iconBg: "", iconColor: "" },
  { name: "Lonely", icon: "🧍", iconBg: "", iconColor: "" },
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
  const [showWelcome, setShowWelcome] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

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

  function selectMood(mood: Mood) {
    setSelectedMood(mood);
    setSelectedFeeling(null);
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
          </nav>

          <div className={styles.headerActions}>
            <a href="/login" className={styles.loginButton}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Login</span>
            </a>
            <button className={styles.planButton} type="button">Get 7-Day Plan</button>
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
            </div>

            <div className={styles.mobileDrawerActions}>
              <a href="/login" className={styles.mobileLoginBtn} onClick={() => setMenuOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Login</span>
              </a>
              <a href="/profile?tab=My%207-Day%20Plan" className={styles.mobilePlanBtn} onClick={() => setMenuOpen(false)}>
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
          <section className={styles.moodPanel}>
            <div className={styles.stepHeader}>
              <div className={styles.stepTitle}><span>1</span><strong>STEP 1 · CHOOSE YOUR MOOD</strong></div>
              <div className={styles.stepCount}>1 of 2</div>
            </div>

            <h1>How are you feeling right now?</h1>
            <p className={styles.subheading}>Select the mood that feels closest to you.</p>

            <div className={styles.categoryRow}>
              {categories.map((item) => (
                <button
                  key={item.name}
                  className={`${styles.categoryButton} ${category === item.name ? styles.categoryActive : ""}`}
                  type="button"
                  onClick={() => setCategory(item.name)}
                >
                  <span>{item.icon}</span>{item.name}
                </button>
              ))}
            </div>

            <div className={styles.moodGrid}>
              {visibleMoods.map((mood) => (
                <button
                  key={mood.name}
                  type="button"
                  className={`${styles.moodCard} ${styles[mood.tone]} ${selectedMood?.name === mood.name ? styles.moodSelected : ""}`}
                  onClick={() => selectMood(mood)}
                >
                  <div className={styles.moodEmojiWrap}>
                    <span className={styles.moodEmoji}>{mood.emoji}</span>
                  </div>
                  <span>{mood.name}</span>
                </button>
              ))}
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
              onClick={() => document.getElementById("positive-flip")?.scrollIntoView({ behavior: "smooth", block: "center" })}
            >
              ✨ FLIP MY MOOD <span>→</span>
            </button>
          </section>

          <section className={styles.flipCard} id="positive-flip" style={{ background: "url('/sunset-hero-bg.png') center 15% / cover no-repeat" }}>

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

            <h2>Towards Calm &amp; Clarity</h2>
            <p className={styles.flipSubtitle}>You&apos;ve got this. Small steps, big shifts.</p>

            <div className={styles.actionCard}>
              <div className={styles.actionTitleRow}>
                <strong>✨ Your 60-Second Action</strong>
                <span>⏱ {seconds}s</span>
              </div>

              <div className={styles.breathAction}>
                <button
                  type="button"
                  className={styles.playButton}
                  onClick={() => {
                    if (seconds === 0) resetAction();
                    setRunning((value) => !value);
                  }}
                  aria-label={running ? "Pause timer" : "Start timer"}
                >
                  {running ? "Ⅱ" : "▶"}
                </button>
                <div className={styles.actionCopy}>
                  <strong>Take 3 deep breaths.</strong>
                  <span>Inhale for 4 seconds, hold for 4,<br />exhale for 6 seconds.</span>
                </div>
                <button className={styles.timerCircle} type="button" onClick={resetAction} aria-label="Reset timer">
                  <strong>{seconds}</strong>
                  <small>SECONDS</small>
                </button>
              </div>

              <div className={styles.whyBlock}>
                <div>♡&nbsp;&nbsp; Why this helps</div>
                <p>+&nbsp;&nbsp; Deep breathing activates your body&apos;s natural calm response<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and helps reset your mind.</p>
              </div>
            </div>

            <div className={styles.flipActions}>
              <button type="button" onClick={() => { setSelectedMood(null); setSelectedFeeling(null); }}><span>⟳</span> Try Another</button>
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
                onClick={() => setShowWelcome(false)}
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
                onClick={() => setShowWelcome(false)}
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
            <button type="button">Get 7-Day Plan Now</button>
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
                  <a href="#">View &rarr;</a>
                </div>
              </div>
            ))}
          </div>
          <a href="#library" className={styles.allMoodsButton}>View All Moods &rarr;</a>
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

        <footer className={styles.footer}>
          <a className={`${styles.logo} ${styles.footerLogo}`} href="#">
            <span className={styles.logoMark} aria-hidden="true"><span /><span /></span>
            <span>mood<span>flip</span></span>
          </a>
          <p>A self-reflection utility for real life.</p>
          <nav>
            <a href="#about">About</a>
            <a href="#library">Mood Library</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </nav>
          <span>© 2026 MoodFlip.coach 💜</span>
        </footer>


      </div>
    </main>
  );
}
