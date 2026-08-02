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
  { name: "Sad", emoji: "😞", category: "Low", tone: "lavender", feelings: ["Down", "Heavy", "Blue"] },
  { name: "Hopeless", emoji: "☁️", category: "Low", tone: "gray", feelings: ["Stuck", "Defeated", "Empty"] },
  { name: "Disappointed", emoji: "💔", category: "Low", tone: "rose", feelings: ["Let down", "Discouraged", "Unseen"] },
  { name: "Lonely", emoji: "👤", category: "Lonely", tone: "blue", feelings: ["Disconnected", "Left out", "Missing someone"] },
  { name: "Tired", emoji: "🔋", category: "Low", tone: "green", feelings: ["Drained", "Sleepy", "Burnt out"] },
  { name: "Anxious", emoji: "🧿", category: "Anxious", tone: "cyan", feelings: ["Nervous", "Uneasy", "On edge"] },
  { name: "Worried", emoji: "🌧️", category: "Anxious", tone: "aqua", feelings: ["Concerned", "Restless", "Uncertain"] },
  { name: "Overwhelmed", emoji: "🌀", category: "Overwhelmed", tone: "purple", feelings: ["Flooded", "Scattered", "Too much"] },
  { name: "Stressed", emoji: "🌩️", category: "Overwhelmed", tone: "violet", feelings: ["Pressured", "Tense", "Rushed"] },
  { name: "Insecure", emoji: "🛡️", category: "Anxious", tone: "peach", feelings: ["Doubtful", "Exposed", "Not enough"] },
  { name: "Angry", emoji: "😡", category: "Angry", tone: "red", feelings: ["Mad", "Furious", "Resentful"] },
  { name: "Frustrated", emoji: "💥", category: "Angry", tone: "orange", feelings: ["Blocked", "Annoyed", "Impatient"] },
  { name: "Irritable", emoji: "😣", category: "Angry", tone: "yellow", feelings: ["Snappy", "Agitated", "Bothered"] },
  { name: "Guilty", emoji: "😔", category: "Low", tone: "mauve", feelings: ["Regretful", "Ashamed", "Responsible"] },
  { name: "Stuck", emoji: "🔒", category: "Overwhelmed", tone: "slate", feelings: ["Frozen", "Confused", "Unable to move"] },
];

const categories = [
  { name: "All", icon: "▦" },
  { name: "Low", icon: "😢" },
  { name: "Anxious", icon: "🌧️" },
  { name: "Angry", icon: "🔥" },
  { name: "Overwhelmed", icon: "≋" },
  { name: "Lonely", icon: "👤" },
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
          <div className="relative flex h-9 w-9 items-center justify-center mr-1">
            <span className="absolute bottom-0 left-1 h-[22px] w-[22px] rounded-full border-[5px] border-[#713ee2] border-t-transparent" />
            <span className="absolute left-1 top-0 h-2.5 w-2.5 rounded-full bg-[#f4a746]" />
            <span className="absolute right-0 top-1 h-2 w-2 rounded-full bg-[#d94fc5]" />
          </div>
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
            <button className={styles.loginButton} type="button"><span>👤</span> Login</button>
            <button className={styles.planButton} type="button">Get 7-Day Plan</button>
          </div>
        </header>


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
                  <span className={styles.moodEmoji}>{mood.emoji}</span>
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
                <IconButton label="Save"><span>♡</span></IconButton>
                <IconButton label="Share"><span>↗</span></IconButton>
              </div>
            </div>

            <div className={styles.flipIntro}>✓&nbsp;&nbsp; Here&apos;s your <strong>positive flip</strong></div>

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
              <div className={styles.plantLeft}>❧</div>
              <div className={styles.plantRight}>❧</div>
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
                <p>✦&nbsp;&nbsp; Deep breathing activates your body&apos;s natural calm response<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and helps reset your mind.</p>
              </div>
            </div>

            <div className={styles.flipActions}>
              <button type="button" onClick={() => { setSelectedMood(null); setSelectedFeeling(null); }}><span>⟳</span> Try Another</button>
              <button
                type="button"
                className={styles.saveButton}
                onClick={() => setSaved((value) => !value)}
              >
                <span>{saved ? "✓" : "♡"}</span> {saved ? "Saved to My Check-ins" : "Save to My Check-ins"}
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


        <section className={styles.trustStrip}>
          <article><span className={styles.trustIcon}>🔒</span><div><strong>Private &amp; Secure</strong><p>Your data is encrypted<br />and protected.</p></div></article>
          <article><span className={styles.trustIcon}>🛡️</span><div><strong>90-Day Auto Delete</strong><p>We automatically delete your<br />data after 90 days.</p></div></article>
          <article><span className={styles.trustIcon}>💗</span><div><strong>Not Therapy</strong><p>MoodFlip is a self-reflection<br />utility, not a medical service.</p></div></article>
          <article><span className={styles.trustIcon}>👥</span><div><strong>You&apos;re Not Alone</strong><p>Millions use MoodFlip for small<br />shifts, every day.</p></div></article>
          <article><span className={styles.trustIcon}>✨</span><div><strong>Made with Care</strong><p>Simple tools for a better<br />you, one step at a time.</p></div></article>
        </section>

        {/* Section 1: How MoodFlip Works */}
        <section id="how" className={styles.howItWorks}>
          <h2>How MoodFlip Works</h2>
          <p className={styles.sectionSub}>A simple 5-step journey to a better you.</p>
          <div className={styles.stepsContainer}>
            {[
              { icon: '🎛️', title: 'Choose Your Mood', desc: 'Pick the mood that\\nfeels closest to you.' },
              { icon: '☁️', title: 'Pick Exact Feeling', desc: 'Select the feeling that\\nmatches you best.' },
              { icon: '🔄', title: 'Flip Your Mood', desc: 'We find your positive\\ncounterpart.' },
              { icon: '▶️', title: 'Get 60-Second Action', desc: 'A short action to shift\\nyour energy.' },
              { icon: '📈', title: 'Save & Track Progress', desc: 'Save your check-in\\nand see growth.' }
            ].map((step, i) => (
              <React.Fragment key={step.title}>
                <div className={styles.stepItem}>
                  <div className={styles.stepIconBubble}>{step.icon}</div>
                  <div className={styles.stepNumber}>{i + 1}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc.split('\\n').map((line, idx) => <React.Fragment key={idx}>{line}<br/></React.Fragment>)}</p>
                </div>
                {i < 4 && <div className={styles.stepArrow}>--&gt;</div>}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Section 2: 7-Day Plan Promo */}
        <section className={styles.promoSection}>
          <div className={styles.promoImagePlaceholder}>
            <div className={styles.promoBook}>
              <h3>mood<span>flip</span></h3>
              <h2>7-DAY PLAN</h2>
              <div className={styles.promoBadge}>BEST FOR<br />BEGINNERS</div>
            </div>
          </div>
          <div className={styles.promoContent}>
            <h2>Build a Better Mindset in Just 7 Days</h2>
            <p>Simple daily check-ins, practical actions, real change.</p>
            <ul className={styles.promoList}>
              <li><span>✓</span> Daily mood check-ins</li>
              <li><span>✓</span> Personalized 60-second actions</li>
              <li><span>✓</span> 7-day PDF report</li>
              <li><span>✓</span> Gentle guidance for you</li>
            </ul>
          </div>
          <div className={styles.promoPricing}>
            <h4>7-Day Plan</h4>
            <p>Perfect for getting started</p>
            <h2>$7</h2>
            <p className={styles.promoOneTime}>One-time payment</p>
            <button className={styles.promoButton} type="button">Get 7-Day Plan Now</button>
            <small>Secure payment • Instant PDF</small>
          </div>
        </section>

        {/* Section 3: Explore Your Feelings */}
        <section id="library" className={styles.exploreSection}>
          <h2>Explore Your Feelings</h2>
          <p className={styles.sectionSub}>Browse common moods and learn how to shift them.</p>
          <div className={styles.exploreGrid}>
            {[
              { icon: '🌀', title: 'Anxiety', sub: 'Find calm & clarity' },
              { icon: '💥', title: 'Stress', sub: 'Find balance' },
              { icon: '😢', title: 'Sadness', sub: 'Find light again' },
              { icon: '😡', title: 'Anger', sub: 'Find peace' },
              { icon: '👤', title: 'Loneliness', sub: 'Find connection' },
              { icon: '🌪️', title: 'Overwhelmed', sub: 'Find control' }
            ].map(mood => (
              <a href="#" key={mood.title} className={styles.exploreCard}>
                <div className={styles.exploreIcon}>{mood.icon}</div>
                <div>
                  <h4>{mood.title}</h4>
                  <p>{mood.sub}</p>
                  <span className={styles.viewLink}>View &rarr;</span>
                </div>
              </a>
            ))}
          </div>
          <button className={styles.viewAllButton} type="button">View All Moods &rarr;</button>
        </section>

        {/* Section 4: About MoodFlip */}
        <section id="about" className={styles.aboutSection}>
          <div className={styles.aboutIllustration}>
            {/* CSS placeholder for the woman illustration */}
            <div className={styles.illustrationPlaceholder}>👩🏻‍🦰</div>
          </div>
          <div className={styles.aboutContent}>
            <h2>About MoodFlip</h2>
            <p>MoodFlip is a self-reflection utility designed to help you find your mood match, meaningfully.</p>
            <p>We are not a therapy or medical service. We provide simple tools, not medical advice.</p>
            <p>For emergencies, please contact local emergency services.</p>
          </div>
          <div className={styles.aboutFeatures}>
            <ul>
              <li><span>💗</span> Self-reflection, not diagnosis</li>
              <li><span>🛠️</span> Practical tools for daily life</li>
              <li><span>✨</span> Designed with care &amp; empathy</li>
              <li><span>🔒</span> Your privacy comes first</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Frequently Asked Questions */}
        <section className={styles.faqSection}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            {[
              "Is MoodFlip a therapy or medical service?",
              "Do I need an account to use MoodFlip?",
              "How does the 60-second action work?",
              "How long is my data kept?",
              "How is my data stored and protected?",
              "Can I get a refund on my plan?"
            ].map((q, i) => (
              <details key={i} className={styles.faqItem}>
                <summary>{q}</summary>
                <div className={styles.faqAnswer}>
                  <p>This is a placeholder answer. MoodFlip provides simple self-reflection tools to help you shift your mindset.</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <a className={`${styles.logo} ${styles.footerLogo}`} href="#">
            <div className="relative flex h-9 w-9 items-center justify-center mr-1">
              <span className="absolute bottom-0 left-1 h-[22px] w-[22px] rounded-full border-[5px] border-[#713ee2] border-t-transparent" />
              <span className="absolute left-1 top-0 h-2.5 w-2.5 rounded-full bg-[#f4a746]" />
              <span className="absolute right-0 top-1 h-2 w-2 rounded-full bg-[#d94fc5]" />
            </div>
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
