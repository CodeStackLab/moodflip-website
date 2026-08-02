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
  targetEmoji: string;
  title: string;
  action: string;
  tip: string;
};

const MOOD_DATA: Record<MoodFamily, Record<string, MoodEntry>> = {
  Sad: {
    Lonely: { target: 'Connected', targetEmoji: '🤝', title: 'Reach out for a moment', action: 'Send one short message to someone you trust. Just say hi or send a warm emoji.', tip: 'Connection doesn\'t require long conversations. A 5-second hello bridges isolation.' },
    Rejected: { target: 'Grounded', targetEmoji: '🌱', title: 'Come back to solid ground', action: 'Name three things around you right now that are solid, real, and unchanging.', tip: 'Rejection is a moment in time, not a reflection of your worth.' },
    Hurt: { target: 'Comforted', targetEmoji: '💖', title: 'A slow, comforting breath', action: 'Place a hand on your heart and take five slow, deep breaths in through your nose.', tip: 'Physical touch from yourself lowers cortisol and signals safety to your nervous system.' },
    Ashamed: { target: 'Accepted', targetEmoji: '☀️', title: 'Speak kindly to yourself', action: 'Say out loud or write: "I am doing my best with what I know right now."', tip: 'Self-compassion builds resilience far faster than self-criticism ever can.' },
    Guilty: { target: 'Forgiving', targetEmoji: '🕊️', title: 'Write it out once', action: 'Write down what you would say to a dear friend who made the exact same mistake.', tip: 'We are almost always far harsher on ourselves than we would ever be to others.' },
    Empty: { target: 'Nourished', targetEmoji: '🍵', title: 'A small act of care', action: 'Drink a full glass of fresh water slowly, noticing how it feels, with zero distractions.', tip: 'Physical hydration provides an instant physiological reset to your brain.' },
    Overwhelmed: { target: 'Peaceful', targetEmoji: '🌊', title: 'A steady 4-6 breath', action: 'Inhale deeply for 4 seconds, then exhale slowly for 6 seconds. Repeat 5 times.', tip: 'Extended exhales stimulate the vagus nerve and slow down your heart rate.' },
    Abandoned: { target: 'Held', targetEmoji: '🤗', title: 'Give yourself a hold', action: 'Wrap your arms around yourself and press gently with steady pressure for 15 seconds.', tip: 'Proprioceptive pressure releases oxytocin, making you feel secure and grounded.' },
  },
  Fearful: {
    Anxious: { target: 'Steady', targetEmoji: '⚓', title: 'Feel your feet flat', action: 'Plant both feet flat on the floor, push down gently, and notice the earth beneath you.', tip: 'Anxiety pulls you into an imaginary future. Feet on the ground pull you into now.' },
    Worried: { target: 'Reassured', targetEmoji: '🛡️', title: 'Separate the worry', action: 'Write down the worry in 5 words, then list 1 single action within your immediate control.', tip: 'Differentiating between what you can and cannot control resolves mental loops.' },
    Insecure: { target: 'Confident', targetEmoji: '🦁', title: 'Take up your space', action: 'Stand tall with your shoulders back and chest open for 30 full seconds.', tip: 'Power posing shifts your hormonal state, lowering stress and boosting assurance.' },
    Nervous: { target: 'Calm', targetEmoji: '🧘', title: 'Shake it loose', action: 'Shake out your hands and arms vigorously for 15 seconds, then let them go completely limp.', tip: 'Animals shake off physical tension after danger; your body responds the exact same way.' },
  },
  Angry: {
    Frustrated: { target: 'Clear-headed', targetEmoji: '🎯', title: 'Release physical tension', action: 'Unclench your jaw, drop your shoulders down away from your ears, and exhale hard once.', tip: 'We subconsciously hold anger in our jaw and shoulders. Releasing them clears the mind.' },
    Irritated: { target: 'Patient', targetEmoji: '🌿', title: 'Take one step back', action: 'Step away from your screen or situation for 60 seconds before responding.', tip: 'A 60-second pause prevents reactive words you might regret later.' },
    Resentful: { target: 'Released', targetEmoji: '🎈', title: 'Say it once, out loud', action: 'Name what you needed and didn\'t get, out loud to yourself once, then let out a deep sigh.', tip: 'Acknowledging unmet needs validates your emotion without letting it fester.' },
    Provoked: { target: 'Composed', targetEmoji: '🏛️', title: 'Count it down', action: 'Press your tongue to the roof of your mouth and slowly count down from 20 to 1.', tip: 'Engaging your prefrontal cortex via counting bypasses amygdala anger hijacking.' },
  },
  Disgusted: {
    Disapproving: { target: 'Open', targetEmoji: '🔓', title: 'Ask one honest question', action: 'Ask yourself: "What perspective or context might I be missing here?"', tip: 'Curiosity is the direct antidote to rigid judgment.' },
    Judgmental: { target: 'Understanding', targetEmoji: '👁️', title: 'Picture their side', action: 'Think of 1 underlying fear or hardship that might explain someone\'s behavior.', tip: 'Empathy doesn\'t mean agreeing; it simply frees you from toxic irritation.' },
    Repulsed: { target: 'Neutral', targetEmoji: '⚖️', title: 'Look away and reset', action: 'Look out a window or at a plain wall for 30 seconds to refresh your visual focus.', tip: 'Visual resets disrupt emotional hyper-fixation.' },
  },
  Stressed: {
    Overworked: { target: 'Rested', targetEmoji: '🔋', title: 'A short shoulder reset', action: 'Close your eyes, roll your shoulders backward 5 times, and relax your eyes.', tip: 'Resting for just 60 seconds improves cognitive clarity for your next task.' },
    Pressured: { target: 'In Control', targetEmoji: '👑', title: 'Just the next step', action: 'Write down only the single next physical step you need to take. Ignore everything else.', tip: 'Overwhelm disappears when you shrink your focus to the immediate micro-step.' },
    Rushed: { target: 'Unhurried', targetEmoji: '⏳', title: 'One deliberate breath', action: 'Pause completely and take one slow, deliberate breath before clicking or typing.', tip: 'Slowness is a choice. You can move with intention even in a busy environment.' },
    Tense: { target: 'Loose', targetEmoji: '☁️', title: 'Shrug and drop', action: 'Squeeze your shoulders up to your ears, hold for 5 seconds, then drop them heavily.', tip: 'Exaggerating tension before releasing it allows deeper muscle relaxation.' },
  },
};

const MOOD_EMOJIS: Record<MoodFamily, string> = {
  Sad: '🌧️',
  Fearful: '⚡',
  Angry: '🔥',
  Disgusted: '🌀',
  Stressed: '💥',
};

const FAMILY_ORDER = Object.keys(MOOD_DATA) as MoodFamily[];

const FAQS = [
  ['Is MoodFlip completely free to use?', 'Yes! The interactive mood tool is 100% free with no account or credit card required. Tap and flip as often as you like.'],
  ['Do I need to sign up or create a profile?', 'No. You can use the full tool without signing up. An optional free account lets you save your check-ins and track 7-day emotional growth.'],
  ['Is MoodFlip therapy or medical advice?', 'No. MoodFlip is an interactive self-reflection and mindset reset tool, not therapy, clinical treatment, or crisis intervention.'],
  ['How does the 90-day automatic data cleanup work?', 'To protect your privacy, any optional saved check-ins are automatically deleted after 90 days of profile inactivity.'],
];

function AdBanner({ slot }: { slot: string }) {
  if (!ADSENSE_ENABLED || !ADSENSE_PUB_ID) {
    return null;
  }
  return (
    <div style={{ maxWidth: '1120px', margin: '1rem auto', padding: '0 1rem', textAlign: 'center' }}>
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

    // Smooth scroll to result on mobile
    setTimeout(() => {
      document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
          @keyframes floatBlob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(25px, -35px) scale(1.06); }
            66% { transform: translate(-20px, 25px) scale(0.96); }
          }
          @keyframes pulseSun {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
            50% { transform: scale(1.08) rotate(10deg); opacity: 1; }
          }
          @keyframes resultPop {
            0% { transform: scale(0.92) translateY(15px); opacity: 0; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
          @keyframes shimmerBtn {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }

          /* Ambient Blobs */
          .home-ambient-1 {
            position: fixed; top: -140px; left: -140px;
            width: 550px; height: 550px; border-radius: 50%;
            background: radial-gradient(circle, rgba(108,92,231,0.14) 0%, transparent 70%);
            animation: floatBlob 16s ease-in-out infinite;
            pointer-events: none; z-index: 0;
          }
          .home-ambient-2 {
            position: fixed; bottom: -120px; right: -100px;
            width: 500px; height: 500px; border-radius: 50%;
            background: radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%);
            animation: floatBlob 19s ease-in-out infinite 5s;
            pointer-events: none; z-index: 0;
          }
          .home-ambient-3 {
            position: fixed; top: 45%; right: 10%;
            width: 350px; height: 350px; border-radius: 50%;
            background: radial-gradient(circle, rgba(255,182,72,0.12) 0%, transparent 70%);
            animation: floatBlob 22s ease-in-out infinite 9s;
            pointer-events: none; z-index: 0;
          }

          /* HERO */
          .hero-section {
            text-align: center;
            padding: 3rem 1.5rem 2.5rem;
            position: relative; z-index: 1;
            max-width: 820px; margin: 0 auto;
          }
          .hero-pill {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 0.45rem 1.25rem; border-radius: 999px;
            background: linear-gradient(135deg, rgba(108,92,231,0.1), rgba(236,72,153,0.08));
            border: 1.5px solid rgba(108,92,231,0.22);
            color: #6c5ce7; font-size: 0.8rem; font-weight: 800;
            letter-spacing: 0.04em; text-transform: uppercase;
            margin-bottom: 1.5rem; backdrop-filter: blur(8px);
          }
          .hero-title {
            font-family: 'Fraunces', Georgia, serif;
            font-size: clamp(2.3rem, 5vw, 3.8rem);
            font-weight: 640; line-height: 1.12;
            color: var(--text-main); margin-bottom: 1.25rem;
            letter-spacing: -0.02em;
          }
          .hero-title span {
            background: linear-gradient(135deg, #6c5ce7 0%, #ec4899 50%, #ffb648 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .hero-desc {
            font-size: clamp(1rem, 2vw, 1.2rem);
            color: var(--text-subtle); line-height: 1.65;
            max-width: 680px; margin: 0 auto 2rem;
          }

          /* TOOL CONTAINER */
          .tool-container {
            position: relative; z-index: 1;
            max-width: 1160px; margin: 0 auto 4rem;
            padding: 0 1rem;
          }
          .tool-card {
            background: var(--card-bg);
            border: 1.5px solid var(--card-border);
            border-radius: 36px;
            box-shadow: 0 32px 80px rgba(74,57,102,0.12);
            overflow: hidden;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            display: grid; grid-template-columns: 1fr 110px 1fr;
          }
          @media (max-width: 960px) {
            .tool-card { grid-template-columns: 1fr; }
          }

          /* LEFT PANEL: SELECTION */
          .tool-left {
            padding: 2.75rem 2.5rem;
            display: flex; flex-direction: column; gap: 2rem;
            background: linear-gradient(160deg, rgba(255,248,239,0.5) 0%, rgba(253,238,221,0.3) 100%);
            border-right: 1.5px solid var(--card-border);
          }
          @media (max-width: 960px) {
            .tool-left { border-right: none; border-bottom: 1.5px solid var(--card-border); padding: 2rem 1.5rem; }
          }

          .step-header {
            display: flex; align-items: center; gap: 0.6rem;
            font-size: 0.76rem; font-weight: 800; text-transform: uppercase;
            letter-spacing: 0.06em; color: #6c5ce7; margin-bottom: 0.85rem;
          }
          .step-num {
            width: 24px; height: 24px; border-radius: 50%;
            background: #6c5ce7; color: white;
            display: inline-flex; align-items: center; justify-content: center;
            font-size: 0.75rem; font-weight: 900;
          }

          /* MOOD FAMILY CHIPS */
          .family-grid {
            display: flex; flex-wrap: wrap; gap: 0.65rem;
          }
          .family-chip {
            padding: 0.65rem 1.15rem; border-radius: 999px;
            border: 1.5px solid var(--card-border);
            background: var(--cream);
            color: var(--text-main); font-weight: 700; font-size: 0.9rem;
            cursor: pointer; transition: all 0.22s cubic-bezier(0.4,0,0.2,1);
            display: flex; align-items: center; gap: 6px;
            font-family: inherit;
          }
          .family-chip:hover {
            border-color: #6c5ce7; transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(108,92,231,0.15);
          }
          .family-chip.selected {
            background: linear-gradient(135deg, #6c5ce7, #8a7cf0);
            color: #ffffff; border-color: transparent;
            box-shadow: 0 8px 22px rgba(108,92,231,0.35);
            transform: translateY(-2px);
          }

          /* SUB-FEELING TILES */
          .feelings-grid {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
            gap: 0.65rem; margin-top: 0.5rem;
          }
          .feeling-tile {
            padding: 0.85rem 1rem; border-radius: 16px;
            border: 1.5px solid var(--card-border);
            background: var(--cream);
            color: var(--text-main); font-weight: 700; font-size: 0.88rem;
            cursor: pointer; transition: all 0.22s cubic-bezier(0.4,0,0.2,1);
            text-align: center; font-family: inherit;
            display: flex; flex-direction: column; align-items: center; gap: 4px;
          }
          .feeling-tile:hover {
            border-color: #ec4899; transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(236,72,153,0.15);
          }
          .feeling-tile.selected {
            background: linear-gradient(135deg, #ec4899, #f43f5e);
            color: #ffffff; border-color: transparent;
            box-shadow: 0 8px 22px rgba(236,72,153,0.35);
            transform: translateY(-2px);
          }
          .feelings-placeholder {
            padding: 2rem 1rem; text-align: center;
            border: 2px dashed var(--card-border); border-radius: 18px;
            color: var(--text-subtle); font-size: 0.86rem;
          }

          /* CENTER FLIP BUTTON PANEL */
          .tool-center {
            display: flex; align-items: center; justify-content: center;
            padding: 1.5rem; background: var(--card-bg);
            position: relative; z-index: 2;
          }
          .flip-main-btn {
            width: 88px; height: 88px; border-radius: 50%;
            border: none; cursor: pointer;
            background: linear-gradient(135deg, #6c5ce7 0%, #ec4899 50%, #ffb648 100%);
            background-size: 200% 200%;
            color: #ffffff; font-family: inherit;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            box-shadow: 0 12px 32px rgba(108,92,231,0.45);
            transition: all 0.28s cubic-bezier(0.34,1.56,0.64,1);
            animation: shimmerBtn 4s linear infinite;
          }
          .flip-main-btn:hover:not(:disabled) {
            transform: scale(1.12) rotate(5deg);
            box-shadow: 0 18px 42px rgba(108,92,231,0.55);
          }
          .flip-main-btn:active:not(:disabled) { transform: scale(0.96); }
          .flip-main-btn:disabled {
            opacity: 0.45; cursor: not-allowed; box-shadow: none; animation: none;
          }
          .flip-btn-label { font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
          .flip-btn-main { font-family: 'Fraunces', Georgia, serif; font-size: 1.1rem; font-weight: 800; }

          /* RIGHT PANEL: RESULT */
          .tool-right {
            padding: 2.75rem 2.5rem;
            display: flex; flex-direction: column; justify-content: center;
            background: var(--card-bg);
            position: relative; overflow: hidden;
          }
          @media (max-width: 960px) {
            .tool-right { padding: 2rem 1.5rem; }
          }
          .result-empty {
            text-align: center; color: var(--text-subtle);
            padding: 3rem 1rem; font-size: 0.92rem; line-height: 1.6;
          }
          .result-empty-icon { font-size: 3rem; display: block; margin-bottom: 1rem; opacity: 0.7; }

          .result-card-anim {
            animation: resultPop 0.45s cubic-bezier(0.22,1,0.36,1) both;
          }
          .result-tag {
            font-size: 0.72rem; font-weight: 800; text-transform: uppercase;
            letter-spacing: 0.08em; color: #12a594; margin-bottom: 0.4rem;
          }
          .result-target-name {
            font-family: 'Fraunces', Georgia, serif;
            font-size: clamp(2rem, 3.5vw, 2.7rem);
            font-weight: 640; color: var(--text-main);
            display: flex; align-items: center; gap: 0.5rem;
            margin-bottom: 1.5rem; line-height: 1.1;
          }
          .action-box {
            background: linear-gradient(145deg, rgba(18,165,148,0.06) 0%, rgba(108,92,231,0.05) 100%);
            border: 1.5px solid rgba(18,165,148,0.2);
            border-radius: 24px; padding: 1.5rem;
            margin-bottom: 1.5rem;
          }
          .action-title-row {
            display: flex; align-items: center; gap: 0.75rem;
            margin-bottom: 0.85rem;
          }
          .timer-circle-btn {
            width: 44px; height: 44px; border-radius: 50%;
            background: #12a594; color: white; border: none;
            font-weight: 900; font-size: 0.85rem; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 4px 14px rgba(18,165,148,0.35);
            transition: all 0.2s ease; flex-shrink: 0;
            font-family: 'Space Mono', monospace;
          }
          .timer-circle-btn:hover { transform: scale(1.08); background: #0f8e7f; }
          .action-title {
            font-size: 1.1rem; font-weight: 800; color: var(--text-main);
            margin: 0;
          }
          .action-text {
            font-size: 0.94rem; color: var(--text-main); line-height: 1.6;
            margin-bottom: 0.85rem;
          }
          .action-tip {
            font-size: 0.78rem; color: var(--text-subtle);
            padding: 0.6rem 0.85rem; border-radius: 12px;
            background: rgba(255,255,255,0.7);
            border-left: 3px solid #12a594; line-height: 1.5;
          }
          .result-actions-row {
            display: flex; gap: 0.75rem; flex-wrap: wrap;
          }
          .save-checkin-btn {
            flex: 1; padding: 0.75rem 1.25rem; border-radius: 14px;
            border: 1.5px solid var(--card-border);
            background: var(--cream); color: var(--text-main);
            font-weight: 800; font-size: 0.84rem; cursor: pointer;
            display: flex; align-items: center; justify-content: center; gap: 6px;
            transition: all 0.2s ease; font-family: inherit;
          }
          .save-checkin-btn:hover {
            border-color: #6c5ce7; color: #6c5ce7; background: #ffffff;
          }
          .save-checkin-btn.saved {
            background: #dcfce7; color: #166534; border-color: #86efac;
          }

          /* REASSURANCE CARDS */
          .reassure-section {
            max-width: 1120px; margin: 0 auto 5rem; padding: 0 1rem;
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.25rem; position: relative; z-index: 1;
          }
          .reassure-card {
            background: var(--card-bg);
            border: 1.5px solid var(--card-border);
            border-radius: 24px; padding: 1.75rem;
            box-shadow: 0 16px 40px rgba(74,57,102,0.06);
            display: flex; align-items: flex-start; gap: 1rem;
            transition: transform 0.2s ease;
          }
          .reassure-card:hover { transform: translateY(-3px); }
          .reassure-icon {
            width: 48px; height: 48px; border-radius: 14px;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.4rem; flex-shrink: 0;
          }
          .reassure-title { font-size: 1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.3rem; }
          .reassure-desc { font-size: 0.84rem; color: var(--text-subtle); line-height: 1.55; margin: 0; }

          /* HOW IT WORKS SECTION */
          .works-section {
            padding: 5rem 1rem; position: relative; z-index: 1;
            background: linear-gradient(180deg, transparent 0%, rgba(108,92,231,0.04) 50%, transparent 100%);
          }
          .section-head {
            text-align: center; max-width: 650px; margin: 0 auto 3.5rem;
          }
          .section-tag {
            font-size: 0.75rem; font-weight: 800; text-transform: uppercase;
            letter-spacing: 0.1em; color: #6c5ce7; margin-bottom: 0.5rem;
            display: inline-block;
          }
          .section-title {
            font-family: 'Fraunces', Georgia, serif;
            font-size: clamp(1.8rem, 3.5vw, 2.6rem);
            font-weight: 640; color: var(--text-main); margin-bottom: 0.85rem;
          }
          .section-desc {
            font-size: 0.95rem; color: var(--text-subtle); line-height: 1.65;
          }

          .steps-grid {
            max-width: 1120px; margin: 0 auto;
            display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
          }
          .step-card {
            background: var(--card-bg);
            border: 1.5px solid var(--card-border);
            border-radius: 28px; padding: 2.25rem 2rem;
            box-shadow: 0 20px 50px rgba(74,57,102,0.06);
            position: relative; overflow: hidden;
            transition: all 0.25s ease;
          }
          .step-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 28px 60px rgba(74,57,102,0.1);
            border-color: rgba(108,92,231,0.3);
          }
          .step-number {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 3.5rem; font-weight: 800; line-height: 1;
            color: rgba(108,92,231,0.15); margin-bottom: 1rem;
          }
          .step-card-title {
            font-size: 1.15rem; font-weight: 800; color: var(--text-main);
            margin-bottom: 0.6rem;
          }
          .step-card-text {
            font-size: 0.88rem; color: var(--text-subtle); line-height: 1.6; margin: 0;
          }

          /* FAQ SECTION */
          .faq-section {
            max-width: 820px; margin: 0 auto 5rem; padding: 0 1rem;
            position: relative; z-index: 1;
          }
          .faq-accordion { display: flex; flex-direction: column; gap: 0.85rem; }
          .faq-item {
            background: var(--card-bg);
            border: 1.5px solid var(--card-border);
            border-radius: 20px; overflow: hidden;
            transition: border-color 0.2s ease;
          }
          .faq-item.open { border-color: #6c5ce7; box-shadow: 0 12px 30px rgba(108,92,231,0.08); }
          .faq-btn {
            width: 100%; padding: 1.25rem 1.5rem; border: none; background: transparent;
            text-align: left; font-family: inherit; font-size: 0.98rem; font-weight: 700;
            color: var(--text-main); cursor: pointer;
            display: flex; justify-content: space-between; align-items: center; gap: 1rem;
          }
          .faq-icon {
            width: 28px; height: 28px; border-radius: 50%;
            background: var(--cream-2); color: #6c5ce7;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.1rem; font-weight: 800; flex-shrink: 0;
            transition: transform 0.25s ease;
          }
          .faq-item.open .faq-icon { transform: rotate(45deg); background: #6c5ce7; color: white; }
          .faq-body {
            padding: 0 1.5rem 1.25rem; font-size: 0.88rem; color: var(--text-subtle);
            line-height: 1.65; border-top: 1px solid var(--card-border);
            margin-top: -0.25rem; padding-top: 1rem;
          }
        `}</style>

        <main style={{ position: 'relative' }}>
          <div className="home-ambient-1" />
          <div className="home-ambient-2" />
          <div className="home-ambient-3" />

          <AdBanner slot="top-banner" />

          {/* HERO LEAD */}
          <section className="hero-section">
            <div className="hero-pill">
              ✨ 100% Free • Tap-Only • No Typing Needed
            </div>
            <h1 className="hero-title">
              Shift your mindset in <span>60 seconds</span>
            </h1>
            <p className="hero-desc">
              Select how you feel right now. MoodFlip instantly pairs it with a positive target state and a practical 60-second action to regain emotional balance.
            </p>
          </section>

          {/* INTERACTIVE TOOL */}
          <section className="tool-container" id="demo">
            <div className="tool-card">

              {/* LEFT: SELECTION */}
              <div className="tool-left">
                {/* Step 1 */}
                <div>
                  <div className="step-header">
                    <span className="step-num">1</span>
                    <span>Choose your primary mood</span>
                  </div>
                  <div className="family-grid">
                    {FAMILY_ORDER.map((name) => (
                      <button
                        key={name}
                        className={`family-chip ${family === name ? 'selected' : ''}`}
                        onClick={() => chooseFamily(name)}
                      >
                        <span>{MOOD_EMOJIS[name]}</span>
                        <span>{name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2 */}
                <div>
                  <div className="step-header">
                    <span className="step-num">2</span>
                    <span>Pick the specific feeling</span>
                  </div>
                  {!family ? (
                    <div className="feelings-placeholder">
                      👈 Tap a mood family above to see specific feelings.
                    </div>
                  ) : (
                    <div className="feelings-grid">
                      {feelings.map((name) => (
                        <button
                          key={name}
                          className={`feeling-tile ${feeling === name ? 'selected' : ''}`}
                          onClick={() => chooseFeeling(name)}
                        >
                          <span>{name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* CENTER: FLIP BUTTON */}
              <div className="tool-center">
                <button
                  id="flip-mood-btn"
                  className="flip-main-btn"
                  disabled={!family || !feeling}
                  onClick={flipMood}
                  title={!family || !feeling ? 'Select a mood and feeling first' : 'Click to flip your mood'}
                >
                  <span className="flip-btn-label">FLIP</span>
                  <span className="flip-btn-main">MOOD</span>
                </button>
              </div>

              {/* RIGHT: RESULT */}
              <div className="tool-right" id="result-section">
                {!result ? (
                  <div className="result-empty">
                    <span className="result-empty-icon">🌤️</span>
                    Select your current feeling on the left and tap <strong>FLIP MOOD</strong> to reveal your positive shift &amp; 60-second action.
                  </div>
                ) : (
                  <div className="result-card-anim">
                    <div className="result-tag">Your positive target mood</div>
                    <h2 className="result-target-name">
                      <span>{result.targetEmoji}</span>
                      <span>{result.target}</span>
                    </h2>

                    <div className="action-box">
                      <div className="action-title-row">
                        <button
                          className="timer-circle-btn"
                          onClick={startTimer}
                          title="Click to start/pause 60-second timer"
                        >
                          {timerRunning ? `${timeLeft}s` : '▶ 60s'}
                        </button>
                        <h3 className="action-title">{result.title}</h3>
                      </div>
                      <p className="action-text">{result.action}</p>
                      <div className="action-tip">
                        💡 <strong>Mindset Insight:</strong> {result.tip}
                      </div>
                    </div>

                    <div className="result-actions-row">
                      <button
                        className={`save-checkin-btn ${savedSuccess ? 'saved' : ''}`}
                        onClick={handleSaveCheckin}
                      >
                        <span>{savedSuccess ? '✅ Check-in Saved!' : '📌 Save Check-in'}</span>
                      </button>
                      <a href="/login" className="save-checkin-btn" style={{ background: '#6c5ce7', color: 'white', border: 'none' }}>
                        <span>👤 View Profile</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </section>

          {/* REASSURANCE CARDS */}
          <section className="reassure-section">
            {[
              { icon: '🌿', title: 'Small shifts change everything', desc: 'You don\'t need to overhaul your mindset at once. One tiny 60-second action breaks emotional paralysis.', bg: 'rgba(95,169,107,0.12)' },
              { icon: '💛', title: 'Be kind to yourself', desc: 'Emotions are signals, not flaws. Acknowledge what you feel without judgment and give yourself room to breathe.', bg: 'rgba(255,182,72,0.14)' },
              { icon: '🔒', title: 'Private & Tap-Only', desc: 'No complex journaling or mandatory log-ins. Fast, accessible, and completely safe whenever friction hits.', bg: 'rgba(108,92,231,0.12)' },
            ].map((card, i) => (
              <div key={i} className="reassure-card">
                <div className="reassure-icon" style={{ background: card.bg }}>{card.icon}</div>
                <div>
                  <h3 className="reassure-title">{card.title}</h3>
                  <p className="reassure-desc">{card.desc}</p>
                </div>
              </div>
            ))}
          </section>

          {/* HOW IT WORKS */}
          <section className="works-section">
            <div className="section-head">
              <span className="section-tag">Simple &amp; Gentle</span>
              <h2 className="section-title">From stuck to moving in three taps</h2>
              <p className="section-desc">Designed for high-stress moments when your brain doesn&apos;t have energy for long questionnaires or complex exercises.</p>
            </div>

            <div className="steps-grid">
              {[
                { num: '01', title: 'Tap what feels closest', text: 'Select a broad mood family, then tap the specific feeling matching your current emotional state.' },
                { num: '02', title: 'Flip the direction', text: 'MoodFlip instantly pairs your negative emotion with a supportive, grounding counterpart.' },
                { num: '03', title: 'Take 1 micro-action', text: 'Execute a practical 60-second exercise designed to calm your nervous system immediately.' },
              ].map((s) => (
                <div key={s.num} className="step-card">
                  <div className="step-number">{s.num}</div>
                  <h3 className="step-card-title">{s.title}</h3>
                  <p className="step-card-text">{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQS */}
          <section className="faq-section">
            <div className="section-head">
              <span className="section-tag">Got Questions?</span>
              <h2 className="section-title">Frequently asked questions</h2>
            </div>

            <div className="faq-accordion">
              {FAQS.map(([q, a], idx) => (
                <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                  <button className="faq-btn" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    <span>{q}</span>
                    <span className="faq-icon">+</span>
                  </button>
                  {openFaq === idx && (
                    <div className="faq-body">
                      {a}
                    </div>
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
