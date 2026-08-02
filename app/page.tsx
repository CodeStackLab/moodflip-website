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

const FAMILY_META: Record<MoodFamily, { emoji: string; color: string; glow: string; bg: string }> = {
  Sad:      { emoji: '🌧️', color: '#6366f1', glow: 'rgba(99,102,241,0.35)', bg: 'rgba(99,102,241,0.08)' },
  Fearful:  { emoji: '🌀', color: '#8b5cf6', glow: 'rgba(139,92,246,0.35)', bg: 'rgba(139,92,246,0.08)' },
  Angry:    { emoji: '🔥', color: '#ef4444', glow: 'rgba(239,68,68,0.3)',   bg: 'rgba(239,68,68,0.07)'  },
  Disgusted:{ emoji: '😶', color: '#f97316', glow: 'rgba(249,115,22,0.3)',  bg: 'rgba(249,115,22,0.07)' },
  Stressed: { emoji: '⚡', color: '#ec4899', glow: 'rgba(236,72,153,0.3)',  bg: 'rgba(236,72,153,0.07)' },
};

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
  const [flipping, setFlipping] = useState(false);

  const feelings = useMemo(() => (family ? Object.keys(MOOD_DATA[family]) : []), [family]);
  const activeMeta = family ? FAMILY_META[family] : null;

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

  const flipMood = async () => {
    if (!family || !feeling) return;
    setFlipping(true);
    await new Promise(r => setTimeout(r, 420));
    setResult(MOOD_DATA[family][feeling]);
    setFlipping(false);
    setTimerRunning(false);
    setTimeLeft(60);
    setSavedSuccess(false);
    setTimeout(() => {
      document.getElementById('resultPanel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

  const timerPct = ((60 - timeLeft) / 60) * 100;
  const circumference = 2 * Math.PI * 20;

  return (
    <>
      <SiteLoader />
      <div className="site-shell">
        <Header />

        <style>{`
          /* ── KEYFRAMES ── */
          @keyframes heroFloat {
            0%,100% { transform: translateY(0px) rotate(0deg); }
            33%      { transform: translateY(-10px) rotate(1deg); }
            66%      { transform: translateY(-5px) rotate(-1deg); }
          }
          @keyframes orb1 {
            0%,100% { transform: translate(0,0) scale(1); opacity: 0.6; }
            50%      { transform: translate(40px,-50px) scale(1.15); opacity: 0.9; }
          }
          @keyframes orb2 {
            0%,100% { transform: translate(0,0) scale(1); opacity: 0.5; }
            50%      { transform: translate(-30px,40px) scale(1.2); opacity: 0.75; }
          }
          @keyframes flipReveal {
            0%   { opacity:0; transform: translateY(24px) scale(0.97); }
            100% { opacity:1; transform: translateY(0) scale(1); }
          }
          @keyframes spinTimer {
            from { stroke-dashoffset: ${circumference}; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes pulseRing {
            0%,100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.4), 0 8px 28px rgba(99,102,241,0.35); }
            50%      { box-shadow: 0 0 0 12px rgba(99,102,241,0), 0 12px 36px rgba(99,102,241,0.5); }
          }
          @keyframes shimmerBtn {
            0%   { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
          @keyframes fadeUp {
            from { opacity:0; transform:translateY(16px); }
            to   { opacity:1; transform:translateY(0); }
          }
          @keyframes starPop {
            0%   { transform: scale(0) rotate(-15deg); opacity:0; }
            60%  { transform: scale(1.15) rotate(5deg); opacity:1; }
            100% { transform: scale(1) rotate(0); opacity:1; }
          }
          @keyframes timerPulse {
            0%,100% { opacity:1; }
            50%      { opacity:0.6; }
          }

          /* ── PAGE SHELL ── */
          .hp-root {
            background: #0d0d14;
            color: #f1f1f5;
            min-height: 100vh;
            font-family: 'Outfit', 'Inter', sans-serif;
          }

          /* ── HERO ── */
          .hp-hero {
            position: relative; overflow: hidden;
            padding: 5rem 1.25rem 4rem;
            text-align: center;
          }
          .hp-hero-orb1 {
            position: absolute; top: -140px; left: -100px;
            width: 520px; height: 520px; border-radius: 50%;
            background: radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 65%);
            animation: orb1 12s ease-in-out infinite;
            pointer-events: none;
          }
          .hp-hero-orb2 {
            position: absolute; bottom: -120px; right: -80px;
            width: 460px; height: 460px; border-radius: 50%;
            background: radial-gradient(circle, rgba(236,72,153,0.22) 0%, transparent 65%);
            animation: orb2 16s ease-in-out infinite;
            pointer-events: none;
          }
          .hp-hero-inner {
            position: relative; z-index: 2;
            max-width: 820px; margin: 0 auto;
          }
          .hp-badge {
            display: inline-flex; align-items: center; gap: 8px;
            background: rgba(99,102,241,0.15);
            border: 1px solid rgba(99,102,241,0.35);
            color: #a5b4fc;
            padding: 0.45rem 1.25rem; border-radius: 999px;
            font-size: 0.8rem; font-weight: 700; letter-spacing: 0.04em;
            margin-bottom: 1.5rem;
            animation: fadeUp 0.5s 0.1s both;
          }
          .hp-h1 {
            font-family: 'Fraunces', 'Playfair Display', Georgia, serif;
            font-size: clamp(2.6rem, 5.5vw, 4.2rem);
            font-weight: 700; line-height: 1.1;
            color: #ffffff; margin-bottom: 1.25rem;
            letter-spacing: -0.025em;
            animation: fadeUp 0.5s 0.2s both;
          }
          .hp-h1 .hp-gradient-text {
            background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .hp-sub {
            font-size: 1.1rem; color: #9ca3af; line-height: 1.7;
            max-width: 580px; margin: 0 auto 2.5rem;
            animation: fadeUp 0.5s 0.3s both;
          }
          .hp-trust-row {
            display: flex; align-items: center; justify-content: center; gap: 1.25rem; flex-wrap: wrap;
            animation: fadeUp 0.5s 0.4s both;
          }
          .hp-trust-item {
            display: flex; align-items: center; gap: 6px;
            font-size: 0.78rem; color: #6b7280; font-weight: 600;
          }
          .hp-trust-dot {
            width: 6px; height: 6px; border-radius: 50%; background: #374151;
          }

          /* ── TOOL WRAPPER ── */
          .hp-tool-wrap {
            max-width: 1200px; margin: 0 auto 5rem;
            padding: 0 1.25rem;
          }

          /* ── TWO COLUMN GRID ── */
          .hp-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            align-items: stretch;
          }
          @media (max-width: 860px) {
            .hp-grid { grid-template-columns: 1fr; }
          }

          /* ── GLASS CARD BASE ── */
          .hp-glass {
            background: rgba(255,255,255,0.045);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 28px;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow: 0 24px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08);
          }

          /* ── LEFT CARD ── */
          .hp-left { padding: 2.25rem 2rem; display: flex; flex-direction: column; gap: 2rem; }
          .hp-section-label {
            display: flex; align-items: center; gap: 10px;
            font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em;
            text-transform: uppercase; color: #6b7280; margin-bottom: 1rem;
          }
          .hp-label-line {
            flex: 1; height: 1px;
            background: linear-gradient(90deg, rgba(255,255,255,0.12), transparent);
          }

          /* MOOD FAMILY CHIPS */
          .hp-fam-row {
            display: flex; flex-wrap: wrap; gap: 0.6rem;
          }
          .hp-fam-chip {
            font-family: inherit; font-size: 0.9rem; font-weight: 700;
            padding: 0.65rem 1.2rem; border-radius: 14px;
            border: 1.5px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.05);
            color: #d1d5db; cursor: pointer;
            transition: all 0.2s ease;
            display: flex; align-items: center; gap: 7px;
          }
          .hp-fam-chip:hover {
            border-color: rgba(255,255,255,0.25);
            background: rgba(255,255,255,0.1);
            color: #ffffff;
            transform: translateY(-1px);
          }
          .hp-fam-chip.sel {
            color: #ffffff;
            border-color: transparent;
            transform: translateY(-2px);
          }

          /* FEELING TILES */
          .hp-feel-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 0.6rem;
          }
          .hp-feel-tile {
            font-family: inherit; font-size: 0.84rem; font-weight: 700;
            padding: 0.75rem 0.65rem; border-radius: 14px;
            border: 1.5px solid rgba(255,255,255,0.08);
            background: rgba(255,255,255,0.04);
            color: #9ca3af; cursor: pointer; text-align: center;
            transition: all 0.2s ease;
          }
          .hp-feel-tile:hover {
            border-color: rgba(255,255,255,0.2);
            color: #e5e7eb;
            background: rgba(255,255,255,0.08);
            transform: translateY(-2px);
          }
          .hp-feel-tile.sel {
            color: #ffffff;
            border-color: transparent;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(99,102,241,0.3);
          }
          .hp-feel-empty {
            grid-column: 1 / -1;
            padding: 2rem 1rem; text-align: center;
            color: #4b5563; font-size: 0.85rem;
            border: 1.5px dashed rgba(255,255,255,0.08);
            border-radius: 16px;
          }

          /* ── FLIP BUTTON ── */
          .hp-flip-wrap {
            padding: 1.25rem 2rem;
            border-top: 1px solid rgba(255,255,255,0.07);
          }
          .hp-flip-btn {
            width: 100%; padding: 1rem 1.5rem;
            border: none; border-radius: 18px; cursor: pointer;
            font-family: inherit; font-weight: 800; font-size: 1rem;
            letter-spacing: 0.04em; text-transform: uppercase;
            color: #ffffff;
            background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899, #6366f1);
            background-size: 300% auto;
            display: flex; align-items: center; justify-content: center; gap: 10px;
            transition: all 0.25s ease;
            animation: shimmerBtn 4s linear infinite;
            box-shadow: 0 8px 28px rgba(99,102,241,0.4);
          }
          .hp-flip-btn:hover:not(:disabled) {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 14px 36px rgba(99,102,241,0.55);
          }
          .hp-flip-btn:disabled {
            opacity: 0.3; cursor: not-allowed; animation: none;
            background: rgba(255,255,255,0.08);
            box-shadow: none; transform: none;
          }
          .hp-flip-arrow {
            width: 26px; height: 26px; border-radius: 50%;
            background: rgba(255,255,255,0.2);
            display: flex; align-items: center; justify-content: center;
            font-size: 0.95rem; transition: transform 0.2s;
          }
          .hp-flip-btn:hover:not(:disabled) .hp-flip-arrow {
            transform: translateX(4px);
          }

          /* ── RIGHT CARD ── */
          .hp-right {
            padding: 2.25rem 2rem;
            display: flex; flex-direction: column;
            position: relative; overflow: hidden;
          }
          .hp-right-orb {
            position: absolute; top: -60px; right: -60px;
            width: 280px; height: 280px; border-radius: 50%;
            pointer-events: none; opacity: 0.5;
            transition: background 0.5s ease;
          }
          .hp-empty-state {
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            flex: 1; text-align: center; padding: 2rem 1rem;
            position: relative; z-index: 1;
          }
          .hp-empty-icon {
            width: 80px; height: 80px; border-radius: 24px;
            background: rgba(255,255,255,0.06);
            border: 1.5px solid rgba(255,255,255,0.1);
            display: flex; align-items: center; justify-content: center;
            font-size: 2.4rem; margin-bottom: 1.5rem;
            box-shadow: 0 12px 30px rgba(0,0,0,0.3);
          }
          .hp-empty-title {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 1.35rem; font-weight: 700; color: #e5e7eb; margin-bottom: 0.6rem;
          }
          .hp-empty-desc { font-size: 0.85rem; color: #6b7280; line-height: 1.65; max-width: 280px; }

          /* ── RESULT PANEL ── */
          .hp-result {
            position: relative; z-index: 1;
            animation: flipReveal 0.45s cubic-bezier(0.22,1,0.36,1) both;
          }
          .hp-result-eyebrow {
            font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em;
            text-transform: uppercase; color: #6b7280; margin-bottom: 0.5rem;
          }
          .hp-result-mood {
            font-family: 'Fraunces', 'Playfair Display', Georgia, serif;
            font-size: clamp(2.2rem, 4vw, 3rem);
            font-weight: 700; line-height: 1.1;
            background: linear-gradient(135deg, #818cf8, #c084fc, #f472b6);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1.75rem;
          }

          /* ACTION CARD */
          .hp-action-card {
            background: rgba(255,255,255,0.055);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 20px; padding: 1.5rem 1.75rem;
            margin-bottom: 1.25rem;
          }
          .hp-action-head {
            display: flex; align-items: center; gap: 14px; margin-bottom: 0.9rem;
          }
          .hp-timer-wrap {
            position: relative; width: 52px; height: 52px; flex-shrink: 0;
          }
          .hp-timer-svg { width: 52px; height: 52px; transform: rotate(-90deg); }
          .hp-timer-track { fill: none; stroke: rgba(255,255,255,0.1); stroke-width: 3.5; }
          .hp-timer-prog {
            fill: none; stroke: #818cf8; stroke-width: 3.5;
            stroke-linecap: round;
            stroke-dasharray: ${circumference};
            transition: stroke-dashoffset 1s linear;
          }
          .hp-timer-label {
            position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
            font-size: 0.75rem; font-weight: 900; color: #a5b4fc;
            font-family: 'Space Mono', monospace;
          }
          .hp-timer-btn-overlay {
            position: absolute; inset: 0; border-radius: 50%;
            background: transparent; border: none; cursor: pointer;
          }
          .hp-action-title {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 1.1rem; font-weight: 700; color: #f3f4f6; margin: 0;
          }
          .hp-action-desc {
            font-size: 0.88rem; color: #9ca3af; line-height: 1.7; margin-bottom: 1rem;
          }
          .hp-insight {
            display: flex; gap: 10px; align-items: flex-start;
            padding: 0.75rem 1rem; border-radius: 12px;
            background: rgba(99,102,241,0.12);
            border: 1px solid rgba(99,102,241,0.25);
            font-size: 0.8rem; color: #a5b4fc; line-height: 1.55;
          }

          /* SAVE BTN */
          .hp-save-btn {
            width: 100%; padding: 0.85rem;
            background: transparent;
            border: 1.5px solid rgba(255,255,255,0.15);
            border-radius: 14px; color: #9ca3af;
            font-weight: 700; font-size: 0.86rem;
            cursor: pointer; font-family: inherit;
            display: flex; align-items: center; justify-content: center; gap: 8px;
            transition: all 0.2s ease;
          }
          .hp-save-btn:hover { border-color: rgba(255,255,255,0.3); color: #e5e7eb; background: rgba(255,255,255,0.06); }
          .hp-save-btn.saved { border-color: rgba(34,197,94,0.4); color: #4ade80; background: rgba(34,197,94,0.08); }

          /* ── REASSURANCE STRIP ── */
          .hp-strip {
            display: grid; grid-template-columns: 1fr 1fr;
            gap: 1rem; margin-top: 1.5rem;
          }
          @media (max-width: 540px) { .hp-strip { grid-template-columns: 1fr; } }
          .hp-strip-card {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 18px; padding: 1.1rem 1.25rem;
            display: flex; align-items: center; gap: 12px;
          }
          .hp-strip-icon { font-size: 1.5rem; flex-shrink: 0; }
          .hp-strip-strong { font-size: 0.88rem; font-weight: 800; color: #e5e7eb; display: block; margin-bottom: 2px; }
          .hp-strip-desc { font-size: 0.78rem; color: #6b7280; }

          /* ── HOW IT WORKS ── */
          .hp-section {
            padding: 5rem 1.25rem; position: relative;
          }
          .hp-section.alt {
            background: rgba(255,255,255,0.02);
            border-top: 1px solid rgba(255,255,255,0.06);
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
          .hp-sec-wrap { max-width: 1100px; margin: 0 auto; }
          .hp-sec-head { text-align: center; margin-bottom: 3.5rem; }
          .hp-sec-eyebrow {
            display: inline-flex; align-items: center; gap: 8px;
            background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.3);
            color: #818cf8; font-size: 0.76rem; font-weight: 800;
            padding: 0.4rem 1rem; border-radius: 999px; letter-spacing: 0.06em;
            text-transform: uppercase; margin-bottom: 1rem;
          }
          .hp-sec-title {
            font-family: 'Fraunces', Georgia, serif;
            font-size: clamp(1.9rem, 3.8vw, 2.8rem);
            font-weight: 700; color: #f9fafb; line-height: 1.15;
          }
          .hp-sec-desc { font-size: 0.95rem; color: #6b7280; margin-top: 0.75rem; line-height: 1.7; max-width: 560px; margin-left: auto; margin-right: auto; }

          /* STEPS */
          .hp-steps {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
          }
          .hp-step-card {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 22px; padding: 2rem 1.75rem;
            transition: all 0.25s ease;
            position: relative; overflow: hidden;
          }
          .hp-step-card::before {
            content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
            background: linear-gradient(90deg, #6366f1, #ec4899);
            opacity: 0; transition: opacity 0.25s;
          }
          .hp-step-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.18); }
          .hp-step-card:hover::before { opacity: 1; }
          .hp-step-num {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 2.5rem; font-weight: 800; line-height: 1;
            background: linear-gradient(135deg, #818cf8, #f472b6);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text; margin-bottom: 0.75rem; display: block;
          }
          .hp-step-h3 { font-size: 1.05rem; font-weight: 700; color: #f3f4f6; margin-bottom: 0.5rem; }
          .hp-step-p { font-size: 0.85rem; color: #6b7280; line-height: 1.65; margin: 0; }

          /* ── FAQ ── */
          .hp-faq-list { max-width: 740px; margin: 0 auto; display: flex; flex-direction: column; gap: 0.85rem; }
          .hp-faq-card {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 18px; overflow: hidden; transition: border-color 0.2s;
          }
          .hp-faq-card.open { border-color: rgba(99,102,241,0.4); }
          .hp-faq-q {
            width: 100%; padding: 1.2rem 1.5rem; border: none; background: transparent;
            text-align: left; font-family: inherit; font-size: 0.93rem; font-weight: 700;
            color: #e5e7eb; cursor: pointer;
            display: flex; justify-content: space-between; align-items: center; gap: 1rem;
          }
          .hp-faq-ic {
            width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
            background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
            display: flex; align-items: center; justify-content: center;
            font-size: 1.1rem; font-weight: 900; color: #818cf8;
            transition: transform 0.25s ease, background 0.2s;
          }
          .hp-faq-card.open .hp-faq-ic { transform: rotate(45deg); background: rgba(99,102,241,0.25); }
          .hp-faq-a {
            padding: 0 1.5rem 1.25rem; font-size: 0.86rem; color: #6b7280;
            line-height: 1.7; border-top: 1px solid rgba(255,255,255,0.06);
            padding-top: 1rem;
          }
        `}</style>

        <main className="hp-root">
          <AdBanner slot="top-banner" />

          {/* ── HERO ── */}
          <section className="hp-hero">
            <div className="hp-hero-orb1" />
            <div className="hp-hero-orb2" />
            <div className="hp-hero-inner">
              <div className="hp-badge">✨ 100% Free &nbsp;·&nbsp; Tap-Only &nbsp;·&nbsp; No Sign-Up Required</div>
              <h1 className="hp-h1">
                Shift your mindset<br />
                in <span className="hp-gradient-text">60 seconds</span>
              </h1>
              <p className="hp-sub">
                Select your current mood, discover your positive counterpart, and unlock a practical 60-second action to regain emotional clarity — instantly.
              </p>
              <div className="hp-trust-row">
                <div className="hp-trust-item">🧠 Science-backed techniques</div>
                <div className="hp-trust-dot" />
                <div className="hp-trust-item">🔒 Privacy-first</div>
                <div className="hp-trust-dot" />
                <div className="hp-trust-item">⚡ Works in 3 taps</div>
                <div className="hp-trust-dot" />
                <div className="hp-trust-item">🌍 Helping people globally</div>
              </div>
            </div>
          </section>

          {/* ── MOOD TOOL ── */}
          <section className="hp-tool-wrap" id="demo">
            <div className="hp-grid">

              {/* LEFT: SELECTION */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <div className="hp-glass hp-left" style={{ flex: 1 }}>
                  {/* Step 1 */}
                  <div>
                    <div className="hp-section-label">
                      <span>Step 1</span>
                      <div className="hp-label-line" />
                      <span>Choose your mood</span>
                    </div>
                    <div className="hp-fam-row">
                      {FAMILY_ORDER.map((name) => {
                        const m = FAMILY_META[name];
                        const isSel = family === name;
                        return (
                          <button
                            key={name}
                            className={`hp-fam-chip ${isSel ? 'sel' : ''}`}
                            onClick={() => chooseFamily(name)}
                            style={isSel ? {
                              background: m.bg,
                              borderColor: m.color,
                              color: '#fff',
                              boxShadow: `0 6px 20px ${m.glow}`,
                            } : {}}
                          >
                            <span>{m.emoji}</span>
                            <span>{name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div>
                    <div className="hp-section-label">
                      <span>Step 2</span>
                      <div className="hp-label-line" />
                      <span>Pick the exact feeling</span>
                    </div>
                    <div className="hp-feel-grid">
                      {!family ? (
                        <div className="hp-feel-empty">← Choose a mood family to see specific feelings</div>
                      ) : feelings.map((name) => {
                        const isSel = feeling === name;
                        return (
                          <button
                            key={name}
                            className={`hp-feel-tile ${isSel ? 'sel' : ''}`}
                            onClick={() => chooseFeeling(name)}
                            style={isSel && activeMeta ? {
                              background: activeMeta.bg,
                              borderColor: activeMeta.color,
                              boxShadow: `0 6px 20px ${activeMeta.glow}`,
                            } : {}}
                          >
                            {name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* FLIP BUTTON */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderTop: 'none',
                  borderRadius: '0 0 28px 28px',
                  padding: '1.25rem 2rem',
                }}>
                  <button
                    id="flip-mood-btn"
                    className="hp-flip-btn"
                    disabled={!family || !feeling || flipping}
                    onClick={flipMood}
                  >
                    <span className="hp-flip-arrow">
                      {flipping ? '⟳' : '✦'}
                    </span>
                    <span>{flipping ? 'Flipping…' : 'Flip My Mood'}</span>
                  </button>
                </div>
              </div>

              {/* RIGHT: RESULT */}
              <div
                className="hp-glass hp-right"
                id="resultPanel"
                style={{ minHeight: 420 }}
              >
                <div
                  className="hp-right-orb"
                  style={result && activeMeta ? {
                    background: `radial-gradient(circle, ${activeMeta.glow.replace('0.35','0.25').replace('0.3','0.2')} 0%, transparent 70%)`,
                  } : {
                    background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
                  }}
                />

                {!result ? (
                  <div className="hp-empty-state">
                    <div className="hp-empty-icon">🌤️</div>
                    <div className="hp-empty-title">Your flip awaits</div>
                    <p className="hp-empty-desc">
                      Select a mood on the left and tap <strong style={{ color: '#a5b4fc' }}>Flip My Mood</strong> to discover your positive shift and 60-second action.
                    </p>
                  </div>
                ) : (
                  <div className="hp-result">
                    <div className="hp-result-eyebrow">Your mood flips to →</div>
                    <div className="hp-result-mood">{result.target}</div>

                    <div className="hp-action-card">
                      <div className="hp-action-head">
                        <div className="hp-timer-wrap">
                          <svg className="hp-timer-svg" viewBox="0 0 46 46">
                            <circle className="hp-timer-track" cx="23" cy="23" r="20" />
                            <circle
                              className="hp-timer-prog"
                              cx="23" cy="23" r="20"
                              style={{
                                strokeDashoffset: circumference - (circumference * timerPct / 100),
                                animation: timerRunning ? 'timerPulse 1.2s ease-in-out infinite' : 'none',
                              }}
                            />
                          </svg>
                          <div className="hp-timer-label">
                            {timerRunning ? `${timeLeft}s` : '60s'}
                          </div>
                          <button
                            className="hp-timer-btn-overlay"
                            onClick={startTimer}
                            title="Start/pause timer"
                          />
                        </div>
                        <h3 className="hp-action-title">{result.title}</h3>
                      </div>
                      <p className="hp-action-desc">{result.action}</p>
                      <div className="hp-insight">
                        <span>💡</span>
                        <div><strong style={{ color: '#c4b5fd' }}>Mindset Insight:</strong> {result.tip}</div>
                      </div>
                    </div>

                    <button
                      className={`hp-save-btn ${savedSuccess ? 'saved' : ''}`}
                      onClick={handleSaveCheckin}
                    >
                      {savedSuccess ? '✅ Saved to your profile!' : '📌 Save this check-in'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* STRIP */}
            <div className="hp-strip">
              <div className="hp-strip-card">
                <span className="hp-strip-icon">🌿</span>
                <div>
                  <strong className="hp-strip-strong">Small shifts change everything.</strong>
                  <span className="hp-strip-desc">You have got this, one moment at a time.</span>
                </div>
              </div>
              <div className="hp-strip-card">
                <span className="hp-strip-icon">💛</span>
                <div>
                  <strong className="hp-strip-strong">Be kind to yourself.</strong>
                  <span className="hp-strip-desc">Progress is built one choice at a time.</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section className="hp-section alt">
            <div className="hp-sec-wrap">
              <div className="hp-sec-head">
                <div className="hp-sec-eyebrow">How MoodFlip works</div>
                <h2 className="hp-sec-title">From stuck to moving in three gentle taps.</h2>
                <p className="hp-sec-desc">No typing, no long questionnaires. Choose a feeling, then take one manageable next step.</p>
              </div>
              <div className="hp-steps">
                {[
                  { num: '01', title: 'Choose what feels closest', text: 'Start with a broad mood family, then tap the specific feeling that best matches this moment.' },
                  { num: '02', title: 'Flip the emotional direction', text: 'MoodFlip pairs that feeling with a more supportive target state — no typing required.' },
                  { num: '03', title: 'Take one tiny action', text: 'Try a practical 60-second reset designed to feel genuinely manageable, even on a difficult day.' },
                ].map(s => (
                  <div key={s.num} className="hp-step-card">
                    <span className="hp-step-num">{s.num}</span>
                    <h3 className="hp-step-h3">{s.title}</h3>
                    <p className="hp-step-p">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="hp-section">
            <div className="hp-sec-wrap">
              <div className="hp-sec-head">
                <div className="hp-sec-eyebrow">Got questions?</div>
                <h2 className="hp-sec-title">Frequently asked questions</h2>
              </div>
              <div className="hp-faq-list">
                {FAQS.map(([q, a], idx) => (
                  <div key={idx} className={`hp-faq-card ${openFaq === idx ? 'open' : ''}`}>
                    <button className="hp-faq-q" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                      <span>{q}</span>
                      <span className="hp-faq-ic">+</span>
                    </button>
                    {openFaq === idx && <div className="hp-faq-a">{a}</div>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <AdBanner slot="bottom-banner" />
        </main>

        <Footer />
      </div>
    </>
  );
}
