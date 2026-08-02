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

const FAMILY_META: Record<MoodFamily, { emoji: string; desc: string }> = {
  Sad:      { emoji: '🌧️', desc: 'Feeling low, empty, or isolated' },
  Fearful:  { emoji: '🌀', desc: 'Unsteady, worried, or anxious' },
  Angry:    { emoji: '⚡', desc: 'Frustrated, tense, or provoked' },
  Disgusted:{ emoji: '🍃', desc: 'Critical, resistant, or repulsed' },
  Stressed: { emoji: '🌊', desc: 'Overwhelmed, rushed, or pressured' },
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
  const [isFlipping, setIsFlipping] = useState(false);

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

  const flipMood = async () => {
    if (!family || !feeling) return;
    setIsFlipping(true);
    await new Promise(r => setTimeout(r, 350));
    setResult(MOOD_DATA[family][feeling]);
    setIsFlipping(false);
    setTimerRunning(false);
    setTimeLeft(60);
    setSavedSuccess(false);

    setTimeout(() => {
      document.getElementById('rightPanel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
          @keyframes softPulseGlow {
            0%, 100% { box-shadow: 0 10px 28px rgba(108,92,231,0.32), 0 0 0 0 rgba(108,92,231,0.2); }
            50% { box-shadow: 0 14px 38px rgba(108,92,231,0.52), 0 0 0 8px rgba(108,92,231,0); transform: translateY(-2px); }
          }
          @keyframes sunGlowRotate {
            0%, 100% { transform: translate(-50%, -50%) rotate(0deg) scale(1); opacity: 0.7; }
            50% { transform: translate(-50%, -50%) rotate(6deg) scale(1.06); opacity: 0.9; }
          }
          @keyframes revealCard {
            from { opacity: 0; transform: translateY(16px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }

          /* HERO */
          .wellness-hero {
            padding: 3.5rem 1.25rem 2rem;
            text-align: center;
            max-width: 820px; margin: 0 auto;
          }
          .wellness-pill-tag {
            display: inline-flex; align-items: center; gap: 8px;
            font-size: 0.81rem; font-weight: 700;
            color: #5b4b9a; background: linear-gradient(135deg, #efeafa 0%, #e6dff7 100%);
            border: 1px solid #d9d0f0;
            border-radius: 999px; padding: 0.5rem 1.35rem;
            margin-bottom: 1.35rem;
            box-shadow: 0 4px 14px rgba(91,75,154,0.08);
          }
          .wellness-title {
            font-family: 'Fraunces', Georgia, serif;
            font-size: clamp(2.4rem, 5vw, 3.8rem);
            font-weight: 640; line-height: 1.12;
            color: var(--text-main); margin-bottom: 1.1rem;
            letter-spacing: -0.02em;
          }
          .wellness-title span {
            background: linear-gradient(135deg, #5b4b9a 0%, #7c8b5e 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .wellness-subtitle {
            font-size: 1.1rem; color: var(--text-subtle);
            line-height: 1.7; max-width: 640px; margin: 0 auto;
          }

          /* TOOL CONTAINER */
          .wellness-tool-container {
            max-width: 1240px; margin: 2rem auto 5rem;
            padding: 0 1.25rem;
          }
          .wellness-grid {
            display: grid;
            grid-template-columns: 1.15fr 80px 1fr;
            align-items: stretch; gap: 0;
            position: relative;
          }
          @media (max-width: 980px) {
            .wellness-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          }

          /* LEFT PANEL */
          .wellness-panel-left {
            background: #ffffff;
            border: 1.5px solid #eae3d6;
            border-radius: 32px;
            padding: 2.5rem 2.25rem;
            box-shadow: 0 24px 70px rgba(74,57,102,0.07);
            display: flex; flex-direction: column; justify-content: space-between;
          }
          .wellness-step-label {
            display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 1rem;
          }
          .wellness-step-tag {
            display: inline-flex; align-items: center; gap: 8px;
            background: #efeafa; color: #5b4b9a;
            font-size: 0.78rem; font-weight: 800; text-transform: uppercase;
            letter-spacing: 0.06em; padding: 0.45rem 1rem;
            border-radius: 999px;
          }
          .wellness-step-num {
            font-size: 0.78rem; font-weight: 700; color: #9a8ebf;
          }

          /* MOOD CHIPS */
          .wellness-chip-group {
            display: flex; flex-wrap: wrap; gap: 0.65rem; margin-bottom: 2.25rem;
          }
          .wellness-fam-btn {
            font-family: inherit; font-size: 0.92rem; font-weight: 700;
            padding: 0.75rem 1.35rem; border-radius: 999px;
            border: 1.5px solid #eae3d6; background: #faf6ee;
            color: var(--text-main); cursor: pointer;
            transition: all 0.22s cubic-bezier(0.4,0,0.2,1);
            display: flex; align-items: center; gap: 8px;
          }
          .wellness-fam-btn:hover {
            border-color: #c9bfeb;
            background: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(91,75,154,0.1);
          }
          .wellness-fam-btn.selected {
            background: linear-gradient(135deg, #5b4b9a 0%, #463a78 100%);
            border-color: #5b4b9a; color: #ffffff;
            box-shadow: 0 8px 22px rgba(91,75,154,0.3);
            transform: translateY(-2px);
          }

          /* FEELINGS GRID */
          .wellness-feelings-grid {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 0.7rem; margin-top: 0.5rem;
          }
          .wellness-feel-btn {
            border: 1.5px solid #eae3d6; background: #faf6ee;
            border-radius: 18px; padding: 0.85rem 0.75rem;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; transition: all 0.2s ease; text-align: center;
            font-family: inherit; font-weight: 700; font-size: 0.86rem;
            color: var(--text-main);
          }
          .wellness-feel-btn:hover {
            border-color: #5b4b9a; background: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(91,75,154,0.1);
          }
          .wellness-feel-btn.selected {
            background: #efeafa; border-color: #5b4b9a; color: #463a78;
            box-shadow: 0 8px 20px rgba(91,75,154,0.2);
            transform: translateY(-2px); font-weight: 800;
          }
          .wellness-empty-feelings {
            grid-column: 1 / -1; font-size: 0.86rem; color: var(--text-subtle);
            padding: 2.25rem 1rem; text-align: center; border: 2px dashed #eae3d6;
            border-radius: 20px; background: rgba(250,246,238,0.5);
          }

          /* CENTER FLIP BUTTON */
          .wellness-flip-col {
            display: flex; align-items: center; justify-content: center;
            position: relative; z-index: 10;
          }
          .wellness-flip-btn {
            font-family: inherit; font-weight: 800; font-size: 0.88rem;
            letter-spacing: 0.05em; text-transform: uppercase;
            background: linear-gradient(135deg, #5b4b9a 0%, #463a78 100%);
            color: #ffffff; border: none; border-radius: 999px;
            padding: 1.25rem 0.85rem; cursor: pointer;
            display: flex; flex-direction: column; align-items: center; gap: 8px;
            text-align: center; width: 96px; height: 120px; justify-content: center;
            box-shadow: 0 12px 32px rgba(91,75,154,0.4);
            animation: softPulseGlow 3s ease-in-out infinite;
            transition: all 0.25s ease;
          }
          .wellness-flip-btn:disabled {
            opacity: 0.45; cursor: not-allowed; animation: none; box-shadow: none;
          }
          .wellness-flip-btn:hover:not(:disabled) {
            transform: scale(1.08); box-shadow: 0 16px 42px rgba(91,75,154,0.55);
          }
          @media (max-width: 980px) {
            .wellness-flip-col { margin: 0.5rem 0; }
            .wellness-flip-btn { width: 100%; height: auto; border-radius: 999px; padding: 1.1rem; flex-direction: row; justify-content: center; }
          }

          /* RIGHT PANEL */
          .wellness-panel-right {
            background:
              radial-gradient(circle at 50% 20%, #fef3df 0%, #f9e2b8 40%, #f4d39f 65%, transparent 80%),
              linear-gradient(180deg, #fdfbf7 0%, #f7efe0 100%);
            border: 1.5px solid #eae3d6;
            border-radius: 32px;
            padding: 2.5rem 2.25rem;
            box-shadow: 0 24px 70px rgba(74,57,102,0.07);
            position: relative; overflow: hidden; text-align: center;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            min-height: 420px;
          }
          .wellness-sun-halo {
            position: absolute; top: 35%; left: 50%;
            transform: translate(-50%, -50%); width: 440px; height: 320px;
            background: radial-gradient(circle, rgba(255,200,90,0.35) 0%, rgba(255,182,72,0.12) 50%, transparent 70%);
            pointer-events: none; animation: sunGlowRotate 10s ease-in-out infinite;
          }
          .wellness-empty-right {
            color: var(--text-subtle); font-size: 0.95rem;
            padding: 3rem 1.5rem; line-height: 1.75; max-width: 340px;
            position: relative; z-index: 1;
          }
          .wellness-sun-icon-box {
            width: 80px; height: 80px; border-radius: 24px;
            background: linear-gradient(135deg, #fff5d4 0%, #ffe399 100%);
            border: 2px solid #ffd166;
            display: flex; align-items: center; justify-content: center;
            font-size: 2.5rem; margin: 0 auto 1.5rem;
            box-shadow: 0 10px 28px rgba(255,182,72,0.35);
          }

          /* RESULT PANEL */
          .wellness-result-box {
            position: relative; z-index: 1; width: 100%;
            animation: revealCard 0.45s cubic-bezier(0.22,1,0.36,1) both;
          }
          .wellness-result-eyebrow {
            font-size: 0.85rem; font-weight: 700; color: #7c8b5e;
            text-transform: uppercase; letter-spacing: 0.08em;
            margin-bottom: 0.35rem;
          }
          .wellness-target-heading {
            font-family: 'Fraunces', Georgia, serif;
            font-weight: 700; font-size: clamp(2.4rem, 4vw, 3.6rem);
            color: #5b4b9a; margin-bottom: 1.75rem; line-height: 1.1;
          }
          .wellness-action-card {
            background: #ffffff; border-radius: 24px; padding: 1.75rem 2rem;
            text-align: left; width: 100%;
            box-shadow: 0 18px 45px rgba(217,165,75,0.18);
            border: 1.5px solid rgba(217,165,75,0.3);
          }
          .wellness-action-header {
            display: flex; align-items: center; gap: 14px; margin-bottom: 1rem;
          }
          .wellness-timer-button {
            width: 48px; height: 48px; border-radius: 50%;
            background: #efeafa; color: #5b4b9a; border: 1.5px solid #d9d0f0;
            display: flex; align-items: center; justify-content: center;
            font-size: 0.85rem; font-weight: 900; cursor: pointer;
            flex-shrink: 0; font-family: 'Space Mono', monospace;
            transition: all 0.22s ease;
            box-shadow: 0 4px 12px rgba(91,75,154,0.15);
          }
          .wellness-timer-button:hover {
            background: #5b4b9a; color: #ffffff; transform: scale(1.05);
          }
          .wellness-action-title {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin: 0;
          }
          .wellness-action-desc {
            font-size: 0.94rem; color: var(--text-subtle); line-height: 1.7; margin-bottom: 1.1rem;
          }
          .wellness-insight-box {
            font-size: 0.82rem; color: var(--text-main);
            padding: 0.75rem 1rem; border-radius: 14px;
            background: #faf6ee; border-left: 4px solid #7c8b5e;
            line-height: 1.6;
          }
          .wellness-save-button {
            margin-top: 1.35rem; width: 100%;
            background: transparent; border: 1.5px solid #5b4b9a;
            color: #463a78; font-weight: 800; font-size: 0.88rem;
            padding: 0.85rem; border-radius: 999px; cursor: pointer;
            transition: all 0.22s ease; font-family: inherit;
            display: flex; align-items: center; justify-content: center; gap: 8px;
          }
          .wellness-save-button:hover {
            background: #efeafa; transform: translateY(-1px);
          }
          .wellness-save-button.saved {
            background: #dcfce7; border-color: #86efac; color: #166534;
          }

          /* REASSURANCE BANNER */
          .wellness-reassure-strip {
            margin-top: 2.25rem; background: linear-gradient(135deg, #efeafa 0%, #e6dff7 100%);
            border-radius: 24px; padding: 1.35rem 2rem; border: 1.5px solid #d9d0f0;
            display: flex; justify-content: space-around; gap: 1.5rem; flex-wrap: wrap;
            box-shadow: 0 10px 30px rgba(91,75,154,0.06);
          }
          .wellness-reassure-item {
            display: flex; align-items: flex-start; gap: 12px;
            font-size: 0.86rem; color: var(--text-main); max-width: 340px;
          }
          .wellness-reassure-item strong { display: block; font-size: 0.9rem; margin-bottom: 2px; color: #463a78; }

          /* HOW IT WORKS SECTION */
          .wellness-section { padding: 5rem 1.25rem; position: relative; z-index: 1; }
          .wellness-section.alt { background: #faf6ee; border-top: 1px solid #eae3d6; border-bottom: 1px solid #eae3d6; }
          .wellness-sec-head { max-width: 640px; margin: 0 auto 3.5rem; text-align: center; }
          .wellness-sec-tag {
            display: inline-flex; font-size: 0.78rem; font-weight: 800;
            color: #5b4b9a; background: #efeafa; border-radius: 999px;
            padding: 0.45rem 1.25rem; margin-bottom: 1rem;
            text-transform: uppercase; letter-spacing: 0.07em;
            border: 1px solid #d9d0f0;
          }
          .wellness-sec-title {
            font-family: 'Fraunces', Georgia, serif;
            font-size: clamp(2rem, 3.8vw, 2.7rem);
            font-weight: 640; line-height: 1.2; color: var(--text-main);
          }
          .wellness-sec-desc { font-size: 1rem; color: var(--text-subtle); margin-top: 0.85rem; line-height: 1.7; }

          .wellness-steps-grid {
            max-width: 1140px; margin: 0 auto;
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.75rem;
          }
          .wellness-step-card {
            background: #ffffff; border: 1.5px solid #eae3d6;
            border-radius: 24px; padding: 2.25rem 2rem;
            box-shadow: 0 16px 45px rgba(44,39,53,0.05);
            transition: all 0.25s ease;
          }
          .wellness-step-card:hover { transform: translateY(-4px); border-color: #c9bfeb; box-shadow: 0 20px 50px rgba(91,75,154,0.1); }
          .wellness-step-num {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 2.2rem; color: #5b4b9a; font-weight: 800;
            display: block; margin-bottom: 0.75rem;
          }
          .wellness-step-h3 { font-size: 1.15rem; font-weight: 700; margin: 0 0 0.6rem; font-family: 'Fraunces', Georgia, serif; color: var(--text-main); }
          .wellness-step-p { font-size: 0.9rem; color: var(--text-subtle); line-height: 1.65; margin: 0; }

          /* FAQ ACCORDION */
          .wellness-faq-wrap { max-width: 780px; margin: 0 auto; display: flex; flex-direction: column; gap: 0.9rem; }
          .wellness-faq-card {
            background: #ffffff; border: 1.5px solid #eae3d6;
            border-radius: 20px; transition: all 0.22s ease;
          }
          .wellness-faq-card.open { border-color: #5b4b9a; box-shadow: 0 12px 32px rgba(91,75,154,0.08); }
          .wellness-faq-q {
            width: 100%; padding: 1.35rem 1.65rem; border: none; background: transparent;
            text-align: left; font-family: inherit; font-size: 0.98rem; font-weight: 700;
            color: var(--text-main); cursor: pointer;
            display: flex; justify-content: space-between; align-items: center; gap: 1rem;
          }
          .wellness-faq-plus {
            width: 28px; height: 28px; border-radius: 50%;
            background: #efeafa; color: #5b4b9a;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.15rem; font-weight: 900; flex-shrink: 0;
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.2s;
          }
          .wellness-faq-card.open .wellness-faq-plus { transform: rotate(45deg); background: #5b4b9a; color: #ffffff; }
          .wellness-faq-a {
            padding: 1rem 1.65rem 1.5rem; font-size: 0.9rem; color: var(--text-subtle);
            line-height: 1.7; border-top: 1px solid #eae3d6;
            max-height: none !important; overflow: visible !important; opacity: 1 !important;
          }
        `}</style>

        <main>
          <AdBanner slot="top-banner" />

          {/* HERO */}
          <section className="wellness-hero">
            <span className="wellness-pill-tag">
              ✨ 100% Free • Tap-Only • No Account Required
            </span>
            <h1 className="wellness-title">
              Shift your mindset in <span>60 seconds</span>
            </h1>
            <p className="wellness-subtitle">
              Select your current mood, discover your positive counterpart, and get a practical 60-second action to regain emotional clarity.
            </p>
          </section>

          {/* INTERACTIVE TOOL */}
          <section className="wellness-tool-container" id="demo">
            <div className="wellness-grid">

              {/* LEFT PANEL */}
              <div className="wellness-panel-left">
                {/* STEP 1 */}
                <div>
                  <div className="wellness-step-label">
                    <span className="wellness-step-tag">☁️ Step 1 · Choose Your Mood</span>
                    <span className="wellness-step-num">1 of 2</span>
                  </div>
                  <div className="wellness-chip-group">
                    {FAMILY_ORDER.map((name) => {
                      const meta = FAMILY_META[name];
                      const isSelected = family === name;
                      return (
                        <button
                          key={name}
                          className={`wellness-fam-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => chooseFamily(name)}
                        >
                          <span>{meta.emoji}</span>
                          <span>{name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 2 */}
                <div style={{ marginTop: '1rem' }}>
                  <div className="wellness-step-label">
                    <span className="wellness-step-tag">🤍 Step 2 · Pick Exact Feeling</span>
                    <span className="wellness-step-num">2 of 2</span>
                  </div>
                  <div className="wellness-feelings-grid">
                    {!family ? (
                      <div className="wellness-empty-feelings">
                        👈 Select a mood family above to see specific feelings
                      </div>
                    ) : (
                      feelings.map((name) => (
                        <button
                          key={name}
                          className={`wellness-feel-btn ${feeling === name ? 'selected' : ''}`}
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
              <div className="wellness-flip-col">
                <button
                  id="flip-mood-btn"
                  className="wellness-flip-btn"
                  disabled={!family || !feeling || isFlipping}
                  onClick={flipMood}
                  title={!family || !feeling ? 'Select a mood & feeling first' : 'Click to flip your mood'}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                  <span>{isFlipping ? 'Flipping...' : 'Flip My Mood'}</span>
                </button>
              </div>

              {/* RIGHT PANEL */}
              <div className="wellness-panel-right" id="rightPanel">
                <div className="wellness-sun-halo" />

                {!result ? (
                  <div className="wellness-empty-right">
                    <div className="wellness-sun-icon-box">🌤️</div>
                    Select your current feeling on the left and tap <strong>FLIP MY MOOD</strong> to reveal your positive shift &amp; 60-second action.
                  </div>
                ) : (
                  <div className="wellness-result-box">
                    <div className="wellness-result-eyebrow">Your Target Mood Shift:</div>
                    <div className="wellness-target-heading">{result.target}</div>

                    <div className="wellness-action-card">
                      <div className="wellness-action-header">
                        <button
                          className="wellness-timer-button"
                          onClick={startTimer}
                          title="Start/pause 60s timer"
                        >
                          {timerRunning ? `${timeLeft}s` : '▶ 60s'}
                        </button>
                        <h3 className="wellness-action-title">{result.title}</h3>
                      </div>

                      <p className="wellness-action-desc">{result.action}</p>

                      <div className="wellness-insight-box">
                        💡 <strong>Mindset Insight:</strong> {result.tip}
                      </div>

                      <button
                        className={`wellness-save-button ${savedSuccess ? 'saved' : ''}`}
                        onClick={handleSaveCheckin}
                      >
                        <span>{savedSuccess ? '✅ Check-in Saved!' : '📌 Save Check-in'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* REASSURANCE STRIP */}
            <div className="wellness-reassure-strip">
              <div className="wellness-reassure-item">
                <span style={{ fontSize: '1.3rem' }}>🌿</span>
                <div>
                  <strong>Small shifts change how you feel.</strong>
                  <span style={{ color: 'var(--text-subtle)' }}>You have got this, one moment at a time.</span>
                </div>
              </div>
              <div className="wellness-reassure-item">
                <span style={{ fontSize: '1.3rem' }}>💛</span>
                <div>
                  <strong>Be kind to yourself.</strong>
                  <span style={{ color: 'var(--text-subtle)' }}>One choice at a time.</span>
                </div>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="wellness-section alt">
            <div className="wellness-sec-head">
              <span className="wellness-sec-tag">How MoodFlip Works</span>
              <h2 className="wellness-sec-title">From stuck to moving in three gentle taps.</h2>
              <p className="wellness-sec-desc">No typing and no long questionnaires. Narrow the feeling, then take one manageable next step.</p>
            </div>

            <div className="wellness-steps-grid">
              {[
                { num: '01', title: 'Choose what feels closest', text: 'Start with a broad mood family, then tap the feeling that best matches this moment.' },
                { num: '02', title: 'Flip the emotional direction', text: 'MoodFlip pairs that feeling with a more supportive target state without asking you to type anything.' },
                { num: '03', title: 'Take one tiny action', text: 'Try a practical 60-second reset designed to feel manageable, even on a difficult day.' },
              ].map(s => (
                <div key={s.num} className="wellness-step-card">
                  <span className="wellness-step-num">{s.num}</span>
                  <h3 className="wellness-step-h3">{s.title}</h3>
                  <p className="wellness-step-p">{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="wellness-section">
            <div className="wellness-sec-head">
              <span className="wellness-sec-tag">Got Questions?</span>
              <h2 className="wellness-sec-title">Frequently asked questions</h2>
            </div>

            <div className="wellness-faq-wrap">
              {FAQS.map(([q, a], idx) => (
                <div key={idx} className={`wellness-faq-card ${openFaq === idx ? 'open' : ''}`}>
                  <button className="wellness-faq-q" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    <span>{q}</span>
                    <span className="wellness-faq-plus">+</span>
                  </button>
                  {openFaq === idx && (
                    <div className="wellness-faq-a">{a}</div>
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
