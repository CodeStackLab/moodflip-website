'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SiteLoader from '@/components/SiteLoader';

const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || '';

type MoodFamily = 'Sad' | 'Fearful' | 'Angry' | 'Disgusted' | 'Stressed';

type MoodEntry = {
  target: string;
  title: string;
  action: string;
  tip: string;
};

const MOOD_DATA: Record<MoodFamily, Record<string, MoodEntry>> = {
  Sad: {
    Lonely: { target: 'Connected', title: 'Reach out for a moment', action: 'Send one short message to someone you trust. Just say hi or send a warm emoji.', tip: 'Connection doesn\'t require long conversations. A 5-second hello bridges isolation.' },
    Rejected: { target: 'Grounded', title: 'Come back to solid ground', action: 'Name three things around you right now that are solid, real, and unchanging.', tip: 'Rejection is a moment in time, not a reflection of your worth.' },
    Hurt: { target: 'Comforted', title: 'A slow, comforting breath', action: 'Place a hand on your heart and take five slow, deep breaths in through your nose.', tip: 'Physical touch from yourself lowers cortisol and signals safety to your nervous system.' },
    Ashamed: { target: 'Accepted', title: 'Speak kindly to yourself', action: 'Say out loud or write: "I am doing my best with what I know right now."', tip: 'Self-compassion builds resilience far faster than self-criticism ever can.' },
    Guilty: { target: 'Forgiving', title: 'Write it out once', action: 'Write down what you would say to a dear friend who made the exact same mistake.', tip: 'We are almost always far harsher on ourselves than we would ever be to others.' },
    Empty: { target: 'Nourished', title: 'A small act of care', action: 'Drink a full glass of fresh water slowly, noticing how it feels, with zero distractions.', tip: 'Physical hydration provides an instant physiological reset to your brain.' },
    Overwhelmed: { target: 'Peaceful', title: 'A steady 4-6 breath', action: 'Inhale deeply for 4 seconds, then exhale slowly for 6 seconds. Repeat 5 times.', tip: 'Extended exhales stimulate the vagus nerve and slow down your heart rate.' },
    Abandoned: { target: 'Held', title: 'Give yourself a hold', action: 'Wrap your arms around yourself and press gently with steady pressure for 15 seconds.', tip: 'Proprioceptive pressure releases oxytocin, making you feel secure and grounded.' },
  },
  Fearful: {
    Anxious: { target: 'Steady', title: 'Feel your feet flat', action: 'Plant both feet flat on the floor, push down gently, and notice the earth beneath you.', tip: 'Anxiety pulls you into an imaginary future. Feet on the ground pull you into now.' },
    Worried: { target: 'Reassured', title: 'Separate the worry', action: 'Write down the worry in 5 words, then list 1 single action within your immediate control.', tip: 'Differentiating between what you can and cannot control resolves mental loops.' },
    Insecure: { target: 'Confident', title: 'Take up your space', action: 'Stand tall with your shoulders back and chest open for 30 full seconds.', tip: 'Power posing shifts your hormonal state, lowering stress and boosting assurance.' },
    Nervous: { target: 'Calm', title: 'Shake it loose', action: 'Shake out your hands and arms vigorously for 15 seconds, then let them go completely limp.', tip: 'Animals shake off physical tension after danger; your body responds the exact same way.' },
  },
  Angry: {
    Frustrated: { target: 'Clear-headed', title: 'Release physical tension', action: 'Unclench your jaw, drop your shoulders down away from your ears, and exhale hard once.', tip: 'We subconsciously hold anger in our jaw and shoulders. Releasing them clears the mind.' },
    Irritated: { target: 'Patient', title: 'Take one step back', action: 'Step away from your screen or situation for 60 seconds before responding.', tip: 'A 60-second pause prevents reactive words you might regret later.' },
    Resentful: { target: 'Released', title: 'Say it once, out loud', action: 'Name what you needed and didn\'t get, out loud to yourself once, then let out a deep sigh.', tip: 'Acknowledging unmet needs validates your emotion without letting it fester.' },
    Provoked: { target: 'Composed', title: 'Count it down', action: 'Press your tongue to the roof of your mouth and slowly count down from 20 to 1.', tip: 'Engaging your prefrontal cortex via counting bypasses amygdala anger hijacking.' },
  },
  Disgusted: {
    Disapproving: { target: 'Open', title: 'Ask one honest question', action: 'Ask yourself: "What perspective or context might I be missing here?"', tip: 'Curiosity is the direct antidote to rigid judgment.' },
    Judgmental: { target: 'Understanding', title: 'Picture their side', action: 'Think of 1 underlying fear or hardship that might explain someone\'s behavior.', tip: 'Empathy doesn\'t mean agreeing; it simply frees you from toxic irritation.' },
    Repulsed: { target: 'Neutral', title: 'Look away and reset', action: 'Look out a window or at a plain wall for 30 seconds to refresh your visual focus.', tip: 'Visual resets disrupt emotional hyper-fixation.' },
  },
  Stressed: {
    Overworked: { target: 'Rested', title: 'A short shoulder reset', action: 'Close your eyes, roll your shoulders backward 5 times, and relax your eyes.', tip: 'Resting for just 60 seconds improves cognitive clarity for your next task.' },
    Pressured: { target: 'In Control', title: 'Just the next step', action: 'Write down only the single next physical step you need to take. Ignore everything else.', tip: 'Overwhelm disappears when you shrink your focus to the immediate micro-step.' },
    Rushed: { target: 'Unhurried', title: 'One deliberate breath', action: 'Pause completely and take one slow, deliberate breath before clicking or typing.', tip: 'Slowness is a choice. You can move with intention even in a busy environment.' },
    Tense: { target: 'Loose', title: 'Shrug and drop', action: 'Squeeze your shoulders up to your ears, hold for 5 seconds, then drop them heavily.', tip: 'Exaggerating tension before releasing it allows deeper muscle relaxation.' },
  },
};

const FAMILY_ORDER = Object.keys(MOOD_DATA) as MoodFamily[];

const FAQS = [
  ['Is MoodFlip completely free to use?', 'Yes! The interactive mood tool is 100% free with no account or credit card required. Tap and flip as often as you like.'],
  ['Do I need to sign up or create a profile?', 'No. You can use the full tool without signing up. An optional free account lets you save your check-ins and track 7-day emotional growth.'],
  ['Is MoodFlip therapy or medical advice?', 'No. MoodFlip is an interactive self-reflection and mindset reset tool, not therapy, clinical treatment, or crisis intervention.'],
  ['How does the 90-day automatic data cleanup work?', 'To protect your privacy, any optional saved check-ins are automatically deleted after 90 days of profile inactivity.'],
];

function AdBanner({ slot }: { slot: string }) {
  if (!ADSENSE_ENABLED || !ADSENSE_PUB_ID) return null;
  return (
    <div style={{ maxWidth: '1240px', margin: '1rem auto', padding: '0 1.5rem', textAlign: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '90px', borderRadius: '12px', overflow: 'hidden' }}
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
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const feelings = useMemo(() => (family ? Object.keys(MOOD_DATA[family]) : []), [family]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const chooseFamily = (nextFamily: MoodFamily) => {
    setFamily(nextFamily);
    setFeeling(null);
    setResult(null);
    setTimerRunning(false);
    setTimeLeft(60);
  };

  const chooseFeeling = (nextFeeling: string) => {
    setFeeling(nextFeeling);
    setResult(null);
    setTimerRunning(false);
    setTimeLeft(60);
  };

  const flipMood = () => {
    if (!family || !feeling) return;
    setResult(MOOD_DATA[family][feeling]);
    setTimerRunning(false);
    setTimeLeft(60);
    setSavedSuccess(false);

    setTimeout(() => {
      document.getElementById('rightPanel')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const startTimer = () => {
    if (timeLeft === 0) setTimeLeft(60);
    setTimerRunning(!timerRunning);
  };

  const handleSaveCheckin = () => {
    if (!family || !feeling || !result) return;
    try {
      const existing = JSON.parse(localStorage.getItem('moodflip_history') || '[]');
      const newEntry = {
        id: Date.now().toString(),
        primaryMood: family,
        subFeeling: feeling,
        targetMood: result.target,
        actionShown: result.action,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('moodflip_history', JSON.stringify([newEntry, ...existing]));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (_) {}
  };

  return (
    <>
      <SiteLoader />
      <div className="site-shell">
        <Header />

        <style>{`
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 12px 30px rgba(91,75,154,0.38); }
            50% { box-shadow: 0 12px 42px rgba(91,75,154,0.65); transform: scale(1.04); }
          }
          @keyframes floatSunRays {
            0%, 100% { transform: translateX(-50%) rotate(0deg) scale(1); opacity: 0.65; }
            50% { transform: translateX(-50%) rotate(4deg) scale(1.05); opacity: 0.85; }
          }
          @keyframes slideUpResult {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* HERO LEAD */
          .mf-hero-lead {
            padding: 3rem 1rem 1.5rem;
            text-align: center;
            max-width: 800px; margin: 0 auto;
          }
          .mf-hero-tag {
            display: inline-flex; align-items: center; gap: 8px;
            font-size: 0.8rem; font-weight: 700;
            color: #5b4b9a; background: #efeafa;
            border: 1px solid #d9d0f0;
            border-radius: 999px; padding: 0.45rem 1.25rem;
            margin-bottom: 1.25rem;
          }
          .mf-hero-h1 {
            font-family: 'Fraunces', 'Playfair Display', Georgia, serif;
            font-size: clamp(2.4rem, 4.8vw, 3.6rem);
            font-weight: 640; line-height: 1.15;
            color: var(--text-main); margin-bottom: 1rem;
            letter-spacing: -0.02em;
          }
          .mf-hero-h1 span {
            color: #5b4b9a;
          }
          .mf-hero-p {
            font-size: 1.08rem; color: var(--text-subtle);
            line-height: 1.65; max-width: 620px; margin: 0 auto;
          }

          /* MAIN TOOL SECTION */
          .mf-tool-container {
            max-width: 1240px; margin: 1.5rem auto 4.5rem;
            padding: 0 1.25rem;
          }
          .mf-tool-grid {
            display: grid;
            grid-template-columns: 1.15fr 70px 1fr;
            align-items: stretch; gap: 0;
            position: relative;
          }
          @media (max-width: 980px) {
            .mf-tool-grid { grid-template-columns: 1fr; gap: 1.25rem; }
          }

          /* PANELS */
          .mf-panel {
            border-radius: 28px;
            box-shadow: 0 20px 60px rgba(44,39,53,0.08);
            padding: 2.25rem 2.25rem;
            position: relative;
          }

          /* LEFT PANEL */
          .mf-panel-left {
            background: #ffffff;
            border: 1.5px solid #eae3d6;
          }
          .mf-step-tag {
            display: inline-flex; align-items: center; gap: 8px;
            background: #efeafa; color: #5b4b9a;
            font-size: 0.8rem; font-weight: 800; text-transform: uppercase;
            letter-spacing: 0.05em; padding: 0.45rem 1rem 0.45rem 0.6rem;
            border-radius: 14px; margin-bottom: 1rem;
          }
          .mf-step-ic {
            width: 22px; height: 22px; border-radius: 50%;
            background: #ffffff; color: #5b4b9a;
            display: flex; align-items: center; justify-content: center;
            font-size: 0.75rem; font-weight: 900;
          }

          /* MOOD FAMILY CHIPS */
          .mf-chip-row { display: flex; flex-wrap: wrap; gap: 0.65rem; margin-bottom: 2rem; }
          .mf-fam-chip {
            font-family: inherit; font-size: 0.92rem; font-weight: 700;
            padding: 0.7rem 1.35rem; border-radius: 18px;
            border: 1.5px solid #eae3d6; background: #faf6ee;
            color: var(--text-main); cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
          }
          .mf-fam-chip:hover { border-color: #d9d0f0; transform: translateY(-1px); }
          .mf-fam-chip.selected {
            background: #efeafa; border-color: #5b4b9a; color: #463a78;
            box-shadow: 0 6px 18px rgba(91,75,154,0.18); transform: translateY(-1px);
          }

          /* FEELINGS GRID */
          .mf-feel-grid {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(115px, 1fr));
            gap: 0.65rem; margin-top: 0.5rem;
          }
          .mf-feel-tile {
            border: 1.5px solid #eae3d6; background: #faf6ee;
            border-radius: 16px; padding: 0.85rem 0.75rem;
            display: flex; flex-direction: column; align-items: center; gap: 6px;
            cursor: pointer; transition: all 0.2s ease; text-align: center;
            font-family: inherit; font-weight: 700; font-size: 0.86rem;
            color: var(--text-main);
          }
          .mf-feel-tile:hover { border-color: #d9d0f0; transform: translateY(-2px); }
          .mf-feel-tile.selected {
            background: #efeafa; border-color: #5b4b9a;
            box-shadow: 0 8px 20px rgba(91,75,154,0.2); transform: translateY(-2px);
          }
          .mf-feel-empty {
            grid-column: 1 / -1; font-size: 0.86rem; color: var(--text-subtle);
            padding: 2rem 1rem; text-align: center; border: 2px dashed #eae3d6;
            border-radius: 18px;
          }

          /* FLIP COLUMN */
          .mf-flip-col {
            display: flex; align-items: center; justify-content: center;
            position: relative; z-index: 10;
          }
          .mf-flip-btn {
            font-family: inherit; font-weight: 800; font-size: 0.86rem;
            letter-spacing: 0.04em; text-transform: uppercase;
            background: linear-gradient(135deg, #5b4b9a 0%, #463a78 100%);
            color: #ffffff; border: none; border-radius: 999px;
            padding: 1.25rem 0.85rem; cursor: pointer;
            display: flex; flex-direction: column; align-items: center; gap: 6px;
            text-align: center; width: 90px; height: 115px; justify-content: center;
            box-shadow: 0 12px 32px rgba(91,75,154,0.4);
            animation: pulseGlow 2.8s ease-in-out infinite;
            transition: all 0.25s ease;
          }
          .mf-flip-btn:disabled {
            opacity: 0.4; cursor: not-allowed; animation: none; box-shadow: none;
          }
          .mf-flip-btn:hover:not(:disabled) {
            transform: scale(1.08); box-shadow: 0 16px 40px rgba(91,75,154,0.55);
          }
          @media (max-width: 980px) {
            .mf-flip-btn { width: 100%; height: auto; border-radius: 20px; padding: 1.1rem; flex-direction: row; justify-content: center; }
          }

          /* RIGHT PANEL */
          .mf-panel-right {
            border: 1.5px solid #eae3d6;
            position: relative; overflow: hidden; text-align: center;
            display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
            background:
              radial-gradient(circle at 50% 12%, #fcefd6 0%, #f8dfaf 35%, #f4cfa0 55%, transparent 75%),
              linear-gradient(180deg, #fefbf4 0%, #fbf3e2 100%);
          }
          .mf-sun-bg {
            position: absolute; top: -20px; left: 50%;
            transform: translateX(-50%); width: 480px; height: 280px;
            pointer-events: none; animation: floatSunRays 8s ease-in-out infinite;
          }
          .mf-empty-right {
            color: var(--text-subtle); font-size: 0.92rem;
            padding: 4rem 1.5rem; line-height: 1.75; max-width: 320px;
            position: relative; z-index: 1;
          }
          .mf-sun-icon-placeholder {
            width: 72px; height: 72px; border-radius: 50%;
            background: linear-gradient(135deg, #fff5d4, #ffe8a3);
            border: 2px solid #ffd675;
            display: flex; align-items: center; justify-content: center;
            font-size: 2.2rem; margin: 0 auto 1.25rem;
            box-shadow: 0 8px 24px rgba(255,182,72,0.3);
          }

          .mf-result-content {
            position: relative; z-index: 1; width: 100%;
            animation: slideUpResult 0.45s cubic-bezier(0.22,1,0.36,1) both;
          }
          .mf-result-label {
            font-size: 0.84rem; font-weight: 700; color: var(--text-subtle);
            margin-bottom: 0.4rem; margin-top: 1rem;
          }
          .mf-result-mood {
            font-family: 'Fraunces', 'Playfair Display', Georgia, serif;
            font-weight: 700; font-size: clamp(2.4rem, 4vw, 3.4rem);
            color: #7c8b5e; margin-bottom: 1.75rem; line-height: 1.1;
          }
          .mf-action-card {
            background: #ffffff; border-radius: 20px; padding: 1.5rem 1.75rem;
            text-align: left; width: 100%;
            box-shadow: 0 16px 36px rgba(217,165,75,0.16);
            border: 1px solid rgba(217,165,75,0.25);
          }
          .mf-action-head {
            display: flex; align-items: center; gap: 12px; margin-bottom: 0.85rem;
          }
          .mf-timer-btn {
            width: 44px; height: 44px; border-radius: 50%;
            background: #efeafa; color: #5b4b9a; border: 1.5px solid #d9d0f0;
            display: flex; align-items: center; justify-content: center;
            font-size: 0.85rem; font-weight: 900; cursor: pointer;
            flex-shrink: 0; font-family: 'Space Mono', monospace;
            transition: all 0.2s ease;
          }
          .mf-timer-btn:hover { background: #5b4b9a; color: #ffffff; }
          .mf-action-title {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin: 0;
          }
          .mf-action-desc {
            font-size: 0.92rem; color: var(--text-subtle); line-height: 1.65; margin-bottom: 1rem;
          }
          .mf-action-tip {
            font-size: 0.78rem; color: var(--text-subtle);
            padding: 0.6rem 0.85rem; border-radius: 12px;
            background: #faf6ee; border-left: 3.5px solid #7c8b5e;
            line-height: 1.5;
          }
          .mf-save-btn {
            margin-top: 1.25rem; width: 100%;
            background: transparent; border: 1.5px solid #5b4b9a;
            color: #463a78; font-weight: 800; font-size: 0.85rem;
            padding: 0.8rem; border-radius: 999px; cursor: pointer;
            transition: all 0.2s ease; font-family: inherit;
            display: flex; align-items: center; justify-content: center; gap: 6px;
          }
          .mf-save-btn:hover { background: #efeafa; }
          .mf-save-btn.saved { background: #dcfce7; border-color: #86efac; color: #166534; }

          /* REASSURANCE BANNER */
          .mf-reassure {
            margin-top: 2rem; background: #efeafa; border-radius: 20px;
            padding: 1.25rem 1.75rem; border: 1.5px solid #d9d0f0;
            display: flex; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;
          }
          .mf-reassure-item {
            display: flex; align-items: flex-start; gap: 10px;
            font-size: 0.84rem; color: var(--text-main); max-width: 320px;
          }
          .mf-reassure-item strong { display: block; font-size: 0.88rem; margin-bottom: 2px; color: #463a78; }

          /* SECTIONS */
          .mf-section-light { padding: 4.5rem 1rem; position: relative; z-index: 1; }
          .mf-section-light.alt { background: #faf6ee; }
          .mf-sec-head { max-width: 620px; margin: 0 auto 3rem; text-align: center; }
          .mf-sec-tag {
            display: inline-flex; font-size: 0.76rem; font-weight: 800;
            color: #5b4b9a; background: #efeafa; border-radius: 999px;
            padding: 0.4rem 1.1rem; margin-bottom: 0.85rem;
            text-transform: uppercase; letter-spacing: 0.06em;
          }
          .mf-sec-title {
            font-family: 'Fraunces', Georgia, serif;
            font-size: clamp(1.8rem, 3.5vw, 2.5rem);
            font-weight: 640; line-height: 1.2; color: var(--text-main);
          }
          .mf-sec-desc { font-size: 0.95rem; color: var(--text-subtle); margin-top: 0.75rem; line-height: 1.65; }

          .mf-steps-grid {
            max-width: 1120px; margin: 0 auto;
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
          }
          .mf-step-card {
            background: #ffffff; border: 1.5px solid #eae3d6;
            border-radius: 22px; padding: 2rem 1.75rem;
            box-shadow: 0 16px 40px rgba(44,39,53,0.06);
            transition: transform 0.2s ease, border-color 0.2s ease;
          }
          .mf-step-card:hover { transform: translateY(-3px); border-color: #d9d0f0; }
          .mf-step-card-num {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 2rem; color: #5b4b9a; font-weight: 800;
            display: block; margin-bottom: 0.6rem;
          }
          .mf-step-card-h3 { font-size: 1.1rem; font-weight: 700; margin: 0 0 0.5rem; font-family: 'Fraunces', Georgia, serif; color: var(--text-main); }
          .mf-step-card-p { font-size: 0.88rem; color: var(--text-subtle); line-height: 1.6; margin: 0; }

          /* FAQ */
          .mf-faq-wrap { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 0.85rem; }
          @keyframes mfFaqIn {
            from { opacity: 0; transform: translateY(-5px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .mf-faq-card {
            background: #ffffff; border: 1.5px solid #eae3d6;
            border-radius: 18px; transition: border-color 0.2s ease, box-shadow 0.2s ease;
          }
          .mf-faq-card.open { border-color: #5b4b9a; box-shadow: 0 10px 28px rgba(91,75,154,0.08); }
          .mf-faq-q {
            width: 100%; padding: 1.2rem 1.5rem; border: none; background: transparent;
            text-align: left; font-family: inherit; font-size: 0.95rem; font-weight: 700;
            color: var(--text-main); cursor: pointer;
            display: flex; justify-content: space-between; align-items: center; gap: 1rem;
          }
          .mf-faq-plus {
            width: 26px; height: 26px; border-radius: 50%;
            background: #efeafa; color: #5b4b9a;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.1rem; font-weight: 900; flex-shrink: 0;
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.2s;
          }
          .mf-faq-card.open .mf-faq-plus { transform: rotate(45deg); background: #5b4b9a; color: #ffffff; }
          .mf-faq-a {
            padding: 1rem 1.5rem 1.5rem; font-size: 0.9rem; color: var(--text-subtle);
            line-height: 1.7; border-top: 1px solid #eae3d6;
            max-height: none !important; overflow: visible !important; opacity: 1 !important;
            animation: mfFaqIn 0.28s ease both;
          }
        `}</style>

        <main>
          <AdBanner slot="top-banner" />

          {/* HERO */}
          <section className="mf-hero-lead">
            <span className="mf-hero-tag">✨ 100% Free • Tap-Only • No Sign-Up</span>
            <h1 className="mf-hero-h1">
              Shift your mindset in <span>60 seconds</span>
            </h1>
            <p className="mf-hero-p">
              Select your current mood, discover your positive counterpart, and get a practical 60-second action to regain emotional clarity.
            </p>
          </section>

          {/* TOOL CONTAINER */}
          <section className="mf-tool-container" id="demo">
            <div className="mf-tool-grid">

              {/* LEFT PANEL */}
              <div className="mf-panel mf-panel-left">
                <span className="mf-step-tag">
                  <span className="mf-step-ic">☁️</span>
                  <span>Choose your current mood</span>
                </span>
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

                <div style={{ marginTop: '1.75rem' }}>
                  <span className="mf-step-tag">
                    <span className="mf-step-ic">🤍</span>
                    <span>Pick the feeling closest to how you feel</span>
                  </span>
                  <div className="mf-feel-grid">
                    {!family ? (
                      <div className="mf-feel-empty">
                        Choose a mood family above to see feelings.
                      </div>
                    ) : (
                      feelings.map((name) => (
                        <button
                          key={name}
                          className={`mf-feel-tile ${feeling === name ? 'selected' : ''}`}
                          onClick={() => chooseFeeling(name)}
                        >
                          <span>{name}</span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* CENTER FLIP BUTTON */}
              <div className="mf-flip-col">
                <button
                  id="flip-mood-btn"
                  className="mf-flip-btn"
                  disabled={!family || !feeling}
                  onClick={flipMood}
                  title={!family || !feeling ? 'Select a mood & feeling first' : 'Click to flip your mood'}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                  <span>Flip My Mood</span>
                </button>
              </div>

              {/* RIGHT PANEL */}
              <div className="mf-panel mf-panel-right" id="rightPanel">
                <div className="mf-sun-bg" />

                {!result ? (
                  <div className="mf-empty-right">
                    <div className="mf-sun-icon-placeholder">🌤️</div>
                    Select your current feeling on the left and tap <strong>FLIP MY MOOD</strong> to reveal your positive shift &amp; 60-second action.
                  </div>
                ) : (
                  <div className="mf-result-content">
                    <div className="mf-result-label">Your mood has changed to:</div>
                    <div className="mf-result-mood">{result.target}</div>

                    <div className="mf-action-card">
                      <div className="mf-action-head">
                        <button
                          className="mf-timer-btn"
                          onClick={startTimer}
                          title="Start/pause 60s timer"
                        >
                          {timerRunning ? `${timeLeft}s` : '▶ 60s'}
                        </button>
                        <h3 className="mf-action-title">{result.title}</h3>
                      </div>

                      <p className="mf-action-desc">{result.action}</p>

                      <div className="mf-action-tip">
                        💡 <strong>Mindset Insight:</strong> {result.tip}
                      </div>

                      <button
                        className={`mf-save-btn ${savedSuccess ? 'saved' : ''}`}
                        onClick={handleSaveCheckin}
                      >
                        <span>{savedSuccess ? '✅ Check-in Saved!' : '📌 Save Check-in'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* REASSURANCE BANNER */}
            <div className="mf-reassure">
              <div className="mf-reassure-item">
                <span style={{ fontSize: '1.2rem' }}>🌿</span>
                <div>
                  <strong>Small shifts change how you feel.</strong>
                  <span>You have got this, one moment at a time.</span>
                </div>
              </div>
              <div className="mf-reassure-item">
                <span style={{ fontSize: '1.2rem' }}>💛</span>
                <div>
                  <strong>Be kind to yourself.</strong>
                  <span>One choice at a time.</span>
                </div>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="mf-section-light mf-alt">
            <div className="mf-sec-head">
              <span className="mf-sec-tag">How MoodFlip works</span>
              <h2 className="mf-sec-title">From stuck to moving in three gentle taps.</h2>
              <p className="mf-sec-desc">No typing and no long questionnaire. Narrow the feeling, then take one manageable next step.</p>
            </div>

            <div className="mf-steps-grid">
              {[
                { num: '01', title: 'Choose what feels closest', text: 'Start with a broad mood family, then tap the feeling that best matches this moment.' },
                { num: '02', title: 'Flip the emotional direction', text: 'MoodFlip pairs that feeling with a more supportive target state without asking you to type anything.' },
                { num: '03', title: 'Take one tiny action', text: 'Try a practical 60-second reset designed to feel manageable, even on a difficult day.' },
              ].map(s => (
                <div key={s.num} className="mf-step-card">
                  <span className="mf-step-card-num">{s.num}</span>
                  <h3 className="mf-step-card-h3">{s.title}</h3>
                  <p className="mf-step-card-p">{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQS */}
          <section className="mf-section-light">
            <div className="mf-sec-head">
              <span className="mf-sec-tag">Got questions?</span>
              <h2 className="mf-sec-title">Frequently asked questions</h2>
            </div>

            <div className="mf-faq-wrap">
              {FAQS.map(([q, a], idx) => (
                <div key={idx} className={`mf-faq-card ${openFaq === idx ? 'open' : ''}`}>
                  <button className="mf-faq-q" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    <span>{q}</span>
                    <span className="mf-faq-plus">+</span>
                  </button>
                  {openFaq === idx && (
                    <div className="mf-faq-a">{a}</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <AdBanner slot="bottom-banner" />
        </main>

        <Footer />
      </div>
    </>
  );
}
