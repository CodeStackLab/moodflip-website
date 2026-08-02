'use client';

import React, { useMemo, useState } from 'react';
import SiteLoader from '@/components/SiteLoader';

const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || '';

type MoodFamily = 'Sad' | 'Fearful' | 'Angry' | 'Disgusted' | 'Stressed';

type MoodEntry = {
  target: string;
  title: string;
  action: string;
};

const MOOD_DATA: Record<MoodFamily, Record<string, MoodEntry>> = {
  Sad: {
    Lonely: { target: 'Connected', title: 'Reach out for a moment', action: 'Send one short message to someone you trust. Just say hi.' },
    Rejected: { target: 'Grounded', title: 'Come back to solid ground', action: 'Name three things around you that are solid and real.' },
    Hurt: { target: 'Comforted', title: 'A slow, comforting breath', action: 'Place a hand on your chest and take five slow breaths.' },
    Ashamed: { target: 'Accepted', title: 'Speak kindly to yourself', action: 'Say to yourself: I am doing my best with what I know right now.' },
    Guilty: { target: 'Forgiving', title: 'Write it out once', action: 'Write the one thing you would say to a friend in your position.' },
    Empty: { target: 'Nourished', title: 'A small act of care', action: 'Drink a full glass of water slowly, without doing anything else.' },
    Overwhelmed: { target: 'Peaceful', title: 'A steady 4-6 breath', action: 'Breathe in for 4, out for 6. Repeat six times.' },
    Abandoned: { target: 'Held', title: 'Give yourself a hold', action: 'Wrap your arms around yourself and press gently for 10 seconds.' },
  },
  Fearful: {
    Anxious: { target: 'Steady', title: 'Feel your feet', action: 'Plant both feet flat on the floor and press down for 10 seconds.' },
    Worried: { target: 'Reassured', title: 'Separate the worry', action: 'Write down the worry, then write one thing within your control.' },
    Insecure: { target: 'Confident', title: 'Take up your space', action: 'Stand tall, shoulders back, for 20 seconds before your next task.' },
    Nervous: { target: 'Calm', title: 'Shake it loose', action: 'Shake out your hands for 10 seconds, then let them go loose.' },
  },
  Angry: {
    Frustrated: { target: 'Clear-headed', title: 'Release the tension', action: 'Unclench your jaw and drop your shoulders. Exhale hard once.' },
    Irritated: { target: 'Patient', title: 'Take one step back', action: 'Step away for 60 seconds before you respond to anything.' },
    Resentful: { target: 'Released', title: 'Say it once, out loud', action: 'Name what you needed and did not get, out loud, once.' },
    Provoked: { target: 'Composed', title: 'Count it down', action: 'Press your tongue to the roof of your mouth and count to 20.' },
  },
  Disgusted: {
    Disapproving: { target: 'Open', title: 'Ask one honest question', action: 'Ask yourself one honest question: what am I not seeing?' },
    Judgmental: { target: 'Understanding', title: 'Picture their side', action: 'Picture one reason someone might act this way.' },
    Repulsed: { target: 'Neutral', title: 'Look away, reset', action: 'Look away for 30 seconds and focus on something plain.' },
  },
  Stressed: {
    Overworked: { target: 'Rested', title: 'A short shoulder reset', action: 'Close your eyes and roll your shoulders back five times.' },
    Pressured: { target: 'In control', title: 'Just the next step', action: 'List the next single step. Only the next one.' },
    Rushed: { target: 'Unhurried', title: 'One breath first', action: 'Take one breath before you open the next tab or message.' },
    Tense: { target: 'Loose', title: 'Shrug it off', action: 'Shrug your shoulders to your ears, hold, then drop them fully.' },
  },
};

const FAMILY_ORDER = Object.keys(MOOD_DATA) as MoodFamily[];
const FAQS = [
  ['Is MoodFlip completely free to use?', 'Yes. The interactive mood tool is free with no account or credit card required.'],
  ['Do I need to sign up or create a profile?', 'No. You can flip your mood without sign-up. Login is optional for saved check-ins and plans.'],
  ['Is MoodFlip therapy or medical advice?', 'No. MoodFlip is a self-reflection utility, not therapy, diagnosis, or crisis support.'],
  ['How does the 90-day automatic data cleanup work?', 'Optional saved profile or check-in data is scheduled for deletion after 90 days of inactivity.'],
];

function AdBanner({ slot }: { slot: string }) {
  if (!ADSENSE_ENABLED || !ADSENSE_PUB_ID) {
    return (
      <div className="mf-ad-slot">
        <div className="mf-ad-box">Advertisement space</div>
      </div>
    );
  }
  return (
    <div className="mf-ad-slot">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '90px' }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={slot}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export default function HomePage() {
  const [family, setFamily] = useState<MoodFamily | null>(null);
  const [feeling, setFeeling] = useState<string | null>(null);
  const [result, setResult] = useState<MoodEntry | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const feelings = useMemo(() => (family ? Object.keys(MOOD_DATA[family]) : []), [family]);

  const chooseFamily = (nextFamily: MoodFamily) => {
    setFamily(nextFamily);
    setFeeling(null);
    setResult(null);
  };

  const chooseFeeling = (nextFeeling: string) => {
    setFeeling(nextFeeling);
    setResult(null);
  };

  const flipMood = () => {
    if (!family || !feeling) return;
    setResult(MOOD_DATA[family][feeling]);
  };

  return (
    <>
      <SiteLoader />
      <div className="mf-redesign-page">
        <AdBanner slot="top-banner" />

        <header className="mf-header">
          <div className="mf-nav">
            <a className="mf-logo" href="/">Mood<span>Flip</span></a>
            <nav className="mf-navlinks" aria-label="Primary navigation">
              <a className="active" href="/">Home</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </nav>
            <div className="mf-nav-actions">
              <button className="mf-nav-cta" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
                Flip my mood
              </button>
              <a className="mf-login" href="/login">Login</a>
            </div>
          </div>
        </header>

        <main>
          <section className="mf-hero-lead">
            <div className="mf-wrap">
              <span className="mf-tag">100% Free | Tap-Only | No Sign-Up</span>
              <h1>Shift your mindset in 60 seconds</h1>
              <p>Select your current mood, discover your positive counterpart, and get a practical 60-second action to regain emotional clarity.</p>
            </div>
          </section>

          <section className="mf-tool" id="demo">
            <div className="mf-wrap">
              <div className="mf-tool-grid">
                <div className="mf-panel mf-panel-left">
                  <span className="mf-step-tag"><span className="mf-step-dot">1</span> Choose your current mood</span>
                  <div className="mf-chip-row">
                    {FAMILY_ORDER.map((name) => (
                      <button
                        key={name}
                        className={`mf-fam-chip ${family === name ? 'selected' : ''}`}
                        onClick={() => chooseFamily(name)}
                      >
                        {name}
                      </button>
                    ))}
                  </div>

                  <div className="mf-feel-row">
                    <span className="mf-step-tag"><span className="mf-step-dot">2</span> Pick the feeling closest to how you feel</span>
                    <div className="mf-feel-grid">
                      {!family ? (
                        <div className="mf-feel-empty">Choose a mood family above to see feelings.</div>
                      ) : (
                        feelings.map((name) => (
                          <button
                            key={name}
                            className={`mf-feel-tile ${feeling === name ? 'selected' : ''}`}
                            onClick={() => chooseFeeling(name)}
                          >
                            <span className="mf-feel-icon">{name.slice(0, 1)}</span>
                            <span>{name}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="mf-flip-col">
                  <button className="mf-flip-btn" disabled={!family || !feeling} onClick={flipMood}>
                    <span>Flip</span>
                    <strong>My Mood</strong>
                  </button>
                </div>

                <div className="mf-panel mf-panel-right">
                  <div className="mf-sun-rays" />
                  {!result ? (
                    <div className="mf-empty-right">
                      Your positive mood and 60-second action will appear here once you flip.
                    </div>
                  ) : (
                    <div className="mf-result-wrap">
                      <div className="mf-result-label">Your mood has changed to:</div>
                      <div className="mf-result-mood">{result.target}</div>
                      <div className="mf-action-card">
                        <div className="mf-action-head">
                          <div className="mf-action-icon">60</div>
                          <h3>{result.title}</h3>
                        </div>
                        <div className="mf-hr-soft" />
                        <p>{result.action}</p>
                        <a className="mf-save-btn" href="/login">Login to save this check-in</a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mf-reassure">
                <div><strong>Small shifts can change how you feel.</strong><span>You have got this.</span></div>
                <div><strong>Be kind to yourself.</strong><span>One choice at a time.</span></div>
              </div>
            </div>
          </section>

          <section className="mf-light mf-alt">
            <div className="mf-wrap">
              <div className="mf-section-head">
                <span className="mf-tag">How MoodFlip works</span>
                <h2>From stuck to moving in three gentle taps.</h2>
                <p>No typing and no long questionnaire. Narrow the feeling, then take one manageable next step.</p>
              </div>
              <div className="mf-steps">
                <article><span>01</span><h3>Choose what feels closest</h3><p>Start with a broad mood family, then tap the feeling that best matches this moment.</p></article>
                <article><span>02</span><h3>Flip the emotional direction</h3><p>MoodFlip pairs that feeling with a more supportive target state without asking you to type anything.</p></article>
                <article><span>03</span><h3>Take one tiny action</h3><p>Try a practical 60-second reset designed to feel manageable, even on a difficult day.</p></article>
              </div>
            </div>
          </section>

          <section className="mf-light">
            <div className="mf-wrap">
              <div className="mf-section-head">
                <span className="mf-tag">Got questions?</span>
                <h2>Frequently asked questions</h2>
              </div>
              <div className="mf-faq">
                {FAQS.map(([question, answer], index) => (
                  <div className={`mf-faq-item ${openFaq === index ? 'open' : ''}`} key={question}>
                    <button className="mf-faq-q" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                      <span>{question}</span><span>+</span>
                    </button>
                    <div className="mf-faq-a"><p>{answer}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <AdBanner slot="bottom-banner" />

        <footer className="mf-footer">
          <div className="mf-wrap">
            <div className="mf-footer-top">
              <div>
                <div className="mf-footer-logo">Mood<span>Flip</span></div>
                <p>A gentle, tap-only reset for difficult everyday emotions, one practical 60-second action at a time.</p>
              </div>
              <div className="mf-footer-links">
                <a href="/">Flip my mood</a>
                <a href="/about">How it works</a>
                <a href="/contact">Contact us</a>
                <a href="/privacy">Privacy policy</a>
                <a href="/disclaimer">Safety disclaimer</a>
              </div>
            </div>
            <div className="mf-footer-bottom">
              <span>2026 MoodFlip. All rights reserved.</span>
              <span>Self-reflection utility | Not therapy or medical advice</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
