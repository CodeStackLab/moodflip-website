"use client";

import React, { useEffect, useMemo, useState, Fragment } from "react";
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
  { icon: "▣", title: "7-Day Plan", text: "Build a better mindset starting today.", action: "View Plan →", kind: "planPurple" },
  { icon: "▦", title: "30-Day Plan", text: "Go deeper. Lasting change in 30 days.", action: "Coming Soon", kind: "planBlue" },
  { icon: "🎁", title: "Daily Reminders", text: "Gentle nudges for your better days.", action: "Enable →", kind: "planGreen" },
  { icon: "▥", title: "Track Progress", text: "See how far you’ve come.", action: "View Profile →", kind: "planPink" },
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
            <button className={styles.loginButton} type="button"><span>♙</span> Login</button>
            <button className={styles.planButton} type="button">Get 7-Day Plan</button>
          </div>
        </header>

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

          <section className={styles.flipCard} id="positive-flip">
            <div className={styles.cardToolbar}>
              <span />
              <div>
                <button type="button" className={styles.topIconBtn}><span style={{color: '#ff4d6d'}}>🔖</span> Save</button>
                <button type="button" className={styles.topIconBtn}><span>🔗</span> Share</button>
              </div>
            </div>

            <div className={styles.flipIntro}>
              <span className={styles.checkCircle}>✓</span> Here&apos;s your <strong>positive flip</strong>
            </div>

            <div className={styles.sunBadge} aria-hidden="true">
              <span className={styles.sunCore}>🌅</span>
            </div>

            <h2>Towards Calm &amp; Clarity</h2>
            <p className={styles.flipSubtitle}>You&apos;ve got this. Small steps, big shifts.</p>

            <div className={styles.landscape} aria-hidden="true">
              <span className={styles.sparkOne}>✦</span>
              <span className={styles.sparkTwo}>✦</span>
              <span className={styles.birdOne}>⌁</span>
              <span className={styles.birdTwo}>⌁</span>
              <div className={styles.hillBack} />
              <div className={styles.hillFront} />
              
              {/* Left Plant Branch SVG - Taller & Fuller */}
              <div className={styles.plantLeft}>
                <svg width="120" height="320" viewBox="0 0 120 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="leafGradLeft" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffb0a0" stopOpacity="0.95" />
                      <stop offset="40%" stopColor="#f38181" stopOpacity="0.9" />
                      <stop offset="80%" stopColor="#e25865" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#d13f50" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  {/* Main curved stem */}
                  <path d="M 30 320 Q 45 180 85 30" stroke="url(#leafGradLeft)" strokeWidth="4.5" strokeLinecap="round" />
                  {/* Top terminal leaf */}
                  <path d="M 85 30 C 65 10, 35 18, 48 50 C 61 82, 80 50, 85 30 Z" fill="url(#leafGradLeft)" />
                  {/* Pair 1 */}
                  <path d="M 68 85 C 32 72, 12 98, 32 122 C 52 146, 72 108, 68 85 Z" fill="url(#leafGradLeft)" />
                  <path d="M 76 112 C 106 95, 122 122, 102 144 C 82 166, 64 132, 76 112 Z" fill="url(#leafGradLeft)" />
                  {/* Pair 2 */}
                  <path d="M 52 160 C 18 148, -2 175, 18 198 C 38 221, 58 185, 52 160 Z" fill="url(#leafGradLeft)" />
                  <path d="M 58 185 C 90 168, 108 195, 88 218 C 68 241, 48 206, 58 185 Z" fill="url(#leafGradLeft)" />
                  {/* Pair 3 */}
                  <path d="M 40 235 C 8 222, -10 250, 10 272 C 30 294, 50 258, 40 235 Z" fill="url(#leafGradLeft)" />
                  <path d="M 45 258 C 76 242, 94 268, 74 290 C 54 312, 34 278, 45 258 Z" fill="url(#leafGradLeft)" />
                </svg>
              </div>

              {/* Right Plant Branch SVG - Taller & Fuller */}
              <div className={styles.plantRight}>
                <svg width="120" height="320" viewBox="0 0 120 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="leafGradRight" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffb0a0" stopOpacity="0.95" />
                      <stop offset="40%" stopColor="#f38181" stopOpacity="0.9" />
                      <stop offset="80%" stopColor="#e25865" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#d13f50" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  {/* Main curved stem */}
                  <path d="M 90 320 Q 75 180 35 30" stroke="url(#leafGradRight)" strokeWidth="4.5" strokeLinecap="round" />
                  {/* Top terminal leaf */}
                  <path d="M 35 30 C 55 10, 85 18, 72 50 C 59 82, 40 50, 35 30 Z" fill="url(#leafGradRight)" />
                  {/* Pair 1 */}
                  <path d="M 52 85 C 88 72, 108 98, 88 122 C 68 146, 48 108, 52 85 Z" fill="url(#leafGradRight)" />
                  <path d="M 44 112 C 14 95, -2 122, 18 144 C 38 166, 56 132, 44 112 Z" fill="url(#leafGradRight)" />
                  {/* Pair 2 */}
                  <path d="M 68 160 C 102 148, 122 175, 102 198 C 82 221, 62 185, 68 160 Z" fill="url(#leafGradRight)" />
                  <path d="M 62 185 C 30 168, 12 195, 32 218 C 52 241, 72 206, 62 185 Z" fill="url(#leafGradRight)" />
                  {/* Pair 3 */}
                  <path d="M 80 235 C 112 222, 130 250, 110 272 C 90 294, 70 258, 80 235 Z" fill="url(#leafGradRight)" />
                  <path d="M 75 258 C 44 242, 26 268, 46 290 C 66 312, 86 278, 75 258 Z" fill="url(#leafGradRight)" />
                </svg>
              </div>
            </div>

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
                    <button type="button">{plan.action}</button>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className={styles.bottomAd} aria-label="Advertisement placeholder">
          <span className={styles.adBadge}>Ad</span>
          <span>Google AdSense Banner (728x90)</span>
        </section>

        <section className={styles.trustStrip}>
          <article><span className={styles.trustIcon}>🔒</span><div><strong>Private &amp; Secure</strong><p>Your data is encrypted<br />and protected.</p></div></article>
          <article><span className={styles.trustIcon}>🛡️</span><div><strong>90-Day Auto Delete</strong><p>We automatically delete your<br />data after 90 days.</p></div></article>
          <article><span className={styles.trustIcon}>💗</span><div><strong>Not Therapy</strong><p>MoodFlip is a self-reflection<br />utility, not a medical service.</p></div></article>
          <article><span className={styles.trustIcon}>👥</span><div><strong>You&apos;re Not Alone</strong><p>Millions use MoodFlip for small<br />shifts, every day.</p></div></article>
          <article><span className={styles.trustIcon}>✨</span><div><strong>Made with Care</strong><p>Simple tools for a better<br />you, one step at a time.</p></div></article>
        </section>

        {/* Section 1: How MoodFlip Works */}
        <section id="how" className={styles.howSection}>
          <div className={styles.howHeader}>
            <h2>How MoodFlip Works</h2>
            <p>A simple 5-step journey to a better you.</p>
          </div>
          <div className={styles.stepsFlow}>
            {[
              { icon: '🎛️', color: 'how_blue', step: '01', title: 'Choose Your Mood', desc: 'Pick the mood that feels closest to you.' },
              { icon: '☁️', color: 'how_purple', step: '02', title: 'Pick Exact Feeling', desc: 'Select the feeling that matches you best.' },
              { icon: '🔄', color: 'how_green', step: '03', title: 'Flip Your Mood', desc: 'We find your positive counterpart.' },
              { icon: '▶️', color: 'how_pink', step: '04', title: '60-Second Action', desc: 'A short action to shift your energy.' },
              { icon: '📈', color: 'how_orange', step: '05', title: 'Save & Track', desc: 'Save your check-in and see growth.' }
            ].map((step) => (
              <div key={step.title} className={styles.howStep}>
                <div className={`${styles.howIcon} ${styles[step.color]}`}>{step.icon}</div>
                <b>{step.step}</b>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: 7-Day Plan Promo */}
        <section className={styles.planSection}>
          <div className={styles.bookCompact}>
            <div className={styles.bookCover}>
              <div className={styles.bookLogo}>mood<span>flip</span></div>
              <strong>7-DAY PLAN</strong>
              <div className={styles.bookSun}></div>
              <div className={styles.bookHillOne}></div>
              <div className={styles.bookHillTwo}></div>
              <div className={styles.bookBadge}>BEST FOR<br/><b>BEGINNERS</b></div>
              <div className={`${styles.bookLeaf} ${styles.bookLeafLeft}`}>❧</div>
              <div className={`${styles.bookLeaf} ${styles.bookLeafRight}`}>❧</div>
            </div>
          </div>
          <div className={styles.planCopy}>
            <h2>Build a Better Mindset in Just 7 Days</h2>
            <p>Simple daily check-ins, practical actions, real change.</p>
            <ul>
              <li>Daily mood check-ins</li>
              <li>Personalized 60-second actions</li>
              <li>7-day PDF report</li>
              <li>Gentle guidance for you</li>
            </ul>
          </div>
          <div className={styles.priceCard}>
            <h3>7-Day Plan</h3>
            <p>Perfect for getting started</p>
            <strong><span>$</span>7</strong>
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
              { icon: '🌀', title: 'Anxiety', sub: 'Find calm & clarity', color: 'library_cyan' },
              { icon: '💥', title: 'Stress', sub: 'Find balance', color: 'library_orange' },
              { icon: '😢', title: 'Sadness', sub: 'Find light again', color: 'library_blue' },
              { icon: '😡', title: 'Anger', sub: 'Find peace', color: 'library_rose' },
              { icon: '👤', title: 'Loneliness', sub: 'Find connection', color: 'library_sky' },
              { icon: '🌪️', title: 'Overwhelmed', sub: 'Find control', color: 'library_violet' }
            ].map(mood => (
              <div key={mood.title} className={`${styles.libraryCard} ${styles[mood.color]}`}>
                <span>{mood.icon}</span>
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
             <div style={{ fontSize: '120px' }}>👩🏻‍🦰</div>
          </div>
          <div className={styles.aboutCopy}>
            <h2>About MoodFlip</h2>
            <p>MoodFlip is a self-reflection utility designed to help you find your mood match, meaningfully.</p>
            <p>We are not a therapy or medical service. We provide simple tools, not medical advice.</p>
          </div>
          <div className={styles.aboutPoints}>
            <p><span>💗</span> Self-reflection, not diagnosis</p>
            <p><span>🛠️</span> Practical tools for daily life</p>
            <p><span>✨</span> Designed with care &amp; empathy</p>
            <p><span>🔒</span> Your privacy comes first</p>
          </div>
        </section>

        {/* Section 5: Frequently Asked Questions */}
        <section className={styles.faqSection}>
          <div className={styles.howHeader}>
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
                <summary>{q} <span style={{marginLeft: 'auto'}}>▼</span></summary>
                <p>This is a placeholder answer. MoodFlip provides simple self-reflection tools to help you shift your mindset.</p>
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

        {showWelcome && (
          <aside className={styles.welcomeCard} role="dialog" aria-label="Create profile prompt">
            <button className={styles.closeWelcome} type="button" onClick={() => setShowWelcome(false)} aria-label="Close">×</button>
            <div className={styles.welcomeContent}>
              <div className={styles.profileBubble}>👤</div>
              <div>
                <h3>Welcome Back! 👋</h3>
                <p>Create a profile to save your mood<br />check-ins and get personalized<br />support.</p>
              </div>
            </div>
            <button className={styles.createProfile} type="button">Create My Profile</button>
            <button className={styles.maybeLater} type="button" onClick={() => setShowWelcome(false)}>Maybe Later</button>
            <small>It only takes 30 seconds.</small>
          </aside>
        )}
      </div>
    </main>
  );
}
