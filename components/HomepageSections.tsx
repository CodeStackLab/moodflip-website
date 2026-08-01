'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ================================================================
   SCROLL ANIMATION HOOK — fires once when element enters viewport
   ================================================================ */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ================================================================
   ANIMATION STYLES — injected once into the document head
   ================================================================ */
const ANIM_STYLES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes starShine {
    0%,100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.8; transform: scale(1.15); }
  }

  .reveal-hidden { opacity: 0; }
  .reveal-fadeUp   { animation: fadeUp   0.65s cubic-bezier(0.22,1,0.36,1) forwards; }
  .reveal-fadeIn   { animation: fadeIn   0.65s ease forwards; }
  .reveal-slideLeft  { animation: slideLeft  0.65s cubic-bezier(0.22,1,0.36,1) forwards; }
  .reveal-slideRight { animation: slideRight 0.65s cubic-bezier(0.22,1,0.36,1) forwards; }
  .reveal-scaleIn  { animation: scaleIn  0.6s cubic-bezier(0.22,1,0.36,1) forwards; }

  /* CARD HOVER LIFTS */
  .hover-card { transition: transform 0.28s ease, box-shadow 0.28s ease; }
  .hover-card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(124,84,209,0.14) !important; }

  /* STEP NUMBER GRADIENT */
  .step-num { 
    background: linear-gradient(135deg, rgba(168,85,247,0.22), rgba(236,72,153,0.12));
    border: 1.5px solid var(--card-border);
    border-radius: 12px;
    width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.8rem; font-weight: 900; color: #a855f7;
    letter-spacing: 0.04em; flex-shrink: 0;
  }

  /* STAR ANIMATION ON CARD HOVER */
  .testimonial-card:hover .star-icon { animation: starShine 0.6s ease infinite; }

  /* SECTION PILL BADGE */
  .section-pill {
    display: inline-flex; align-items: center; gap: 0.35rem;
    font-size: 0.75rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase;
    padding: 0.3rem 0.9rem; border-radius: 9999px;
  }

  /* GRADIENT HEADINGS */
  .gradient-heading {
    background: linear-gradient(135deg, var(--text-main) 0%, #a855f7 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  /* RESPONSIVE GRIDS */
  @media (max-width: 768px) {
    .how-grid, .science-grid, .testimonial-grid-3 { grid-template-columns: 1fr 1fr !important; }
    .faq-container { padding: 0 0.25rem !important; }
  }
  @media (max-width: 540px) {
    .how-grid, .science-grid, .testimonial-grid-3 { grid-template-columns: 1fr !important; }
    .section-heading { font-size: clamp(1.5rem, 7vw, 2rem) !important; }
  }
`;

function InjectStyles() {
  useEffect(() => {
    if (document.getElementById('moodflip-anim-styles')) return;
    const el = document.createElement('style');
    el.id = 'moodflip-anim-styles';
    el.textContent = ANIM_STYLES;
    document.head.appendChild(el);
  }, []);
  return null;
}

/* ================================================================
   HOW IT WORKS SECTION
   ================================================================ */
export function HowItWorksSection() {
  const { ref: headRef, visible: headVis } = useScrollReveal(0.2);
  const { ref: cardsRef, visible: cardsVis } = useScrollReveal(0.1);

  const steps = [
    { step: '01', emoji: '☁️', color: '#818cf8', title: 'Choose a Mood Family', desc: 'Start with one of five broad mood clouds. No typing or interpretation required.' },
    { step: '02', emoji: '🧭', color: '#a855f7', title: 'Narrow the Category', desc: 'Choose the second-layer Feelings Wheel category that feels closest to this moment.' },
    { step: '03', emoji: '🎯', color: '#ec4899', title: 'Pick the Exact Feeling', desc: 'Tap the specific third-layer feeling that best describes what you are experiencing.' },
    { step: '04', emoji: '⚡', color: '#e98a54', title: 'Flip & Take One Step', desc: 'Receive a supportive target mood and one practical 60-second action.' },
  ];

  return (
    <>
      <InjectStyles />
      <section style={{ maxWidth: '1280px', margin: '5rem auto 0 auto', padding: '0 1rem' }}>

        {/* Section Header */}
        <div
          ref={headRef}
          className={`reveal-hidden ${headVis ? 'reveal-fadeUp' : ''}`}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div className="section-pill" style={{ color: '#818cf8', background: 'rgba(129,140,248,0.12)', marginBottom: '1rem' }}>
            ⚡ Simple 4-Step Process
          </div>
          <h2 className="section-heading gradient-heading" style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 700, margin: '0 0 0.75rem 0' }}>
            How MoodFlip Works in Seconds
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-subtle)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.65 }}>
            No typing and no long questionnaire. Narrow the feeling, then take one manageable next step.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="how-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              className={`hover-card reveal-hidden ${cardsVis ? 'reveal-fadeUp' : ''}`}
              style={{
                animationDelay: `${i * 0.12}s`,
                background: 'var(--card-bg)',
                border: '1.5px solid var(--card-border)',
                borderRadius: '24px',
                padding: '2rem 1.75rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* BG Orb */}
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: `radial-gradient(circle, ${s.color}22 0%, transparent 70%)`, pointerEvents: 'none' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div className="step-num">{s.step}</div>
                <span style={{ fontSize: '1.8rem' }}>{s.emoji}</span>
              </div>

              <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 0.5rem 0' }}>{s.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>

              {/* Bottom accent */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${s.color}88, transparent)` }} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ================================================================
   TESTIMONIALS SECTION
   ================================================================ */
export function TestimonialsSection() {
  const { ref: headRef, visible: headVis } = useScrollReveal(0.2);
  const { ref: cardsRef, visible: cardsVis } = useScrollReveal(0.1);

  const reviews = [
    { stars: 5, quote: '"I felt completely overwhelmed at work. MoodFlip gave me a 60-second breathing reset that actually worked. I come back almost every day now!"', name: 'Sarah M.', tag: 'Daily MoodFlip user', emoji: '🌸', color: '#818cf8' },
    { stars: 5, quote: '"I was spiraling with anger. Within one minute of using MoodFlip I had a calm, grounding action. The Enraged → Tranquil flip genuinely works."', name: 'James T.', tag: 'Returned 12× this month', emoji: '🧠', color: '#a855f7' },
    { stars: 5, quote: '"No signup, no typing, no judgment. Just click my mood and instantly get what I need. The simplicity is what makes it so powerful."', name: 'Priya K.', tag: 'Recommended to 5 friends', emoji: '✨', color: '#ec4899' },
  ];

  return (
    <section style={{ maxWidth: '1280px', margin: '5rem auto 0 auto', padding: '0 1rem' }}>
      {/* Header */}
      <div
        ref={headRef}
        className={`reveal-hidden ${headVis ? 'reveal-fadeUp' : ''}`}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <div className="section-pill" style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.12)', marginBottom: '1rem' }}>
          ⭐ Real User Love
        </div>
        <h2 className="section-heading" style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 0.75rem 0' }}>
          People Are Flipping Their Moods
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-subtle)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.65 }}>
          Real stories from users who shifted from negative to positive in under 60 seconds.
        </p>
      </div>

      {/* Cards */}
      <div
        ref={cardsRef}
        className="testimonial-grid-3"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}
      >
        {reviews.map((r, i) => (
          <div
            key={i}
            className={`hover-card testimonial-card reveal-hidden ${cardsVis ? 'reveal-scaleIn' : ''}`}
            style={{
              animationDelay: `${i * 0.14}s`,
              background: 'var(--card-bg)',
              border: '1.5px solid var(--card-border)',
              borderRadius: '24px',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.1rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* BG Orb */}
            <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: `radial-gradient(circle, ${r.color}18 0%, transparent 70%)`, pointerEvents: 'none' }} />

            {/* Stars */}
            <div style={{ display: 'flex', gap: '0.18rem' }}>
              {Array.from({ length: r.stars }).map((_, si) => (
                <span key={si} className="star-icon" style={{ color: '#f59e0b', fontSize: '1.15rem' }}>★</span>
              ))}
            </div>

            {/* Quote */}
            <p style={{ fontSize: '0.9rem', color: 'var(--text-subtle)', lineHeight: 1.7, fontStyle: 'italic', margin: 0, flexGrow: 1 }}>
              {r.quote}
            </p>

            {/* User Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--tile-selected-bg)', border: `2px solid ${r.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
                {r.emoji}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)' }}>{r.name}</div>
                <div style={{ fontSize: '0.76rem', color: r.color, fontWeight: 600 }}>{r.tag}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================
   SCIENCE / WHY IT WORKS SECTION
   ================================================================ */
export function ScienceSection() {
  const { ref: leftRef, visible: leftVis } = useScrollReveal(0.15);
  const { ref: rightRef, visible: rightVis } = useScrollReveal(0.15);

  const features = [
    { icon: '🧠', title: 'A Clear Pause', desc: 'A tiny action creates a brief pause between a difficult feeling and what you do next.', color: '#818cf8' },
    { icon: '🎡', title: 'Visual Emotion Labels', desc: 'Feelings Wheel categories make it easier to identify a feeling without writing a long explanation.', color: '#a855f7' },
    { icon: '🌱', title: 'One Manageable Step', desc: 'A 60-second suggestion keeps the next step small, practical, and easy to try or skip.', color: '#ec4899' },
    { icon: '🔒', title: 'Private by Design', desc: 'The free tool needs no profile. Optional saved data is scheduled for deletion after 90 days of inactivity.', color: '#10b981' },
  ];

  return (
    <section style={{ maxWidth: '1280px', margin: '5rem auto 0 auto', padding: '0 1rem' }}>
      <div style={{ background: 'var(--card-bg)', border: '1.5px solid var(--card-border)', borderRadius: '32px', padding: 'clamp(2rem, 5vw, 3.5rem)', position: 'relative', overflow: 'hidden' }}>

        {/* BG decoration */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Left: Header */}
        <div
          ref={leftRef}
          className={`reveal-hidden ${leftVis ? 'reveal-slideLeft' : ''}`}
          style={{ marginBottom: '2.5rem' }}
        >
          <div className="section-pill" style={{ color: '#10b981', background: 'rgba(16,185,129,0.12)', marginBottom: '1rem' }}>
            🌿 Thoughtful by design
          </div>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 0.6rem 0' }}>
            Why the format feels manageable
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-subtle)', maxWidth: '560px', lineHeight: 1.65, margin: 0 }}>
            MoodFlip reduces friction: visual choices, plain language, and one small action instead of an overwhelming programme.
          </p>
        </div>

        {/* Right: Feature Grid */}
        <div
          ref={rightRef}
          className={`science-grid reveal-hidden ${rightVis ? 'reveal-fadeUp' : ''}`}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="hover-card"
              style={{ background: 'var(--tile-bg)', border: '1px solid var(--card-border)', borderRadius: '18px', padding: '1.5rem', animationDelay: `${i * 0.1}s` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${f.color}18`, border: `1px solid ${f.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{f.icon}</div>
                <h4 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>{f.title}</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FAQ SECTION
   ================================================================ */
export function FAQSection() {
  const { ref: headRef, visible: headVis } = useScrollReveal(0.2);
  const { ref: listRef, visible: listVis } = useScrollReveal(0.1);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: 'Is MoodFlip completely free to use?', a: 'Yes! The interactive mood tool is 100% free with no account or credit card required.' },
    { q: 'Do I need to sign up or create a profile?', a: 'No. Profiles are 100% optional — only useful if you want to save check-in history or receive a personalised 7-day PDF plan.' },
    { q: 'Is MoodFlip therapy or medical advice?', a: 'No. MoodFlip is a lighthearted self-reflection utility. It is not therapy, not medical advice, and not for emergencies.' },
    { q: 'How does the 90-day automatic data cleanup work?', a: 'If a profile is inactive for 90 days, all saved data is automatically and permanently deleted to protect your privacy.' },
    { q: 'What\'s in the optional $7 PDF Mindset Plan?', a: 'A custom 7-day PDF based on your saved mood check-ins with unique non-repeating 60-second daily actions — delivered instantly to your email.' },
  ];

  return (
    <section style={{ maxWidth: '860px', margin: '5rem auto 5rem auto', padding: '0 1rem' }} className="faq-container">

      {/* Header */}
      <div
        ref={headRef}
        className={`reveal-hidden ${headVis ? 'reveal-fadeUp' : ''}`}
        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
      >
        <div className="section-pill" style={{ color: '#a855f7', background: 'var(--tile-selected-bg)', marginBottom: '1rem' }}>
          💬 Got Questions?
        </div>
        <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
          Frequently Asked Questions
        </h2>
      </div>

      {/* Accordion */}
      <div
        ref={listRef}
        className={`reveal-hidden ${listVis ? 'reveal-fadeUp' : ''}`}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
      >
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              onClick={() => setOpenIdx(isOpen ? null : i)}
              style={{
                background: isOpen ? 'var(--tile-selected-bg)' : 'var(--card-bg)',
                border: `1.5px solid ${isOpen ? '#a855f7' : 'var(--card-border)'}`,
                borderRadius: '18px',
                padding: '1.25rem 1.5rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isOpen ? '0 6px 24px rgba(168,85,247,0.12)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                  {faq.q}
                </h3>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: isOpen ? '#a855f7' : 'var(--tile-bg)',
                  border: '1.5px solid var(--card-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isOpen ? 'white' : '#a855f7',
                  fontSize: '1.1rem', fontWeight: 700, flexShrink: 0,
                  transition: 'all 0.25s ease',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
                }}>+</div>
              </div>
              {isOpen && (
                <p style={{ fontSize: '0.9rem', color: 'var(--text-subtle)', lineHeight: 1.65, margin: '0.85rem 0 0 0', borderTop: '1px solid var(--card-border)', paddingTop: '0.85rem', animationFillMode: 'forwards' }}>
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
