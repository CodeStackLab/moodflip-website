'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SiteLoader from '@/components/SiteLoader';

const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || '';

type MoodFamily = 'Sad' | 'Fearful' | 'Angry' | 'Disgusted' | 'Stressed';

type FeelingData = {
  target: string;
  iconSvg: React.ReactNode;
  title: string;
  action: string;
};

const ICONS: Record<string, React.ReactNode> = {
  moonperson: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="20" cy="27" r="4.5" />
      <path d="M14 33c1-4 3-6 6-6s5 2 6 6" />
      <path d="M27 9a5 5 0 1 0 5 6 4 4 0 0 1-5-6z" />
      <path d="M12 12l1 2m-3 1l2 .6" />
    </svg>
  ),
  facex: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="20" cy="20" r="11" />
      <path d="M15 17l3 3m0-3l-3 3M22 17l3 3m0-3l-3 3" />
      <path d="M15 27c2-2 8-2 10 0" />
    </svg>
  ),
  heartbreak: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 30S8 23 8 14.5C8 10 11 7 15 7c2.3 0 4 1.2 5 3l1 2-2 3 3 3-2 4 2 3-2 5z" />
      <path d="M20 30s12-7 12-15.5C32 10 29 7 25 7c-2.3 0-4 1.2-5 3" />
    </svg>
  ),
  mountainhands: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 26l7-11 5 6 4-5 8 10z" />
      <path d="M4 30h32" />
    </svg>
  ),
  raincloud: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 20a6 6 0 0 1 11.5-2.3A5.5 5.5 0 0 1 28 27H13a5 5 0 0 1-1-10z" />
      <path d="M14 31l-1.5 3M20 31l-1.5 3M26 31l-1.5 3" />
    </svg>
  ),
  dashedcircle: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 4">
      <circle cx="20" cy="20" r="11" />
    </svg>
  ),
  spiral: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M20 20a3 3 0 1 1 3 3 6 6 0 1 1 6-6 9 9 0 1 1-9-9" />
    </svg>
  ),
  dashedperson: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="20" cy="14" r="4.5" strokeDasharray="2.5 3.5" />
      <path d="M13 30c1.5-6 4-8.5 7-8.5s5.5 2.5 7 8.5" strokeDasharray="2.5 3.5" />
    </svg>
  ),
  hug: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="20" cy="12" r="4.5" />
      <path d="M12 30c1-6 4-9 8-9s7 3 8 9" />
      <path d="M14 22c-2 1-3 3-3 6M26 22c2 1 3 3 3 6" />
    </svg>
  ),
  steady: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="20" cy="14" r="4.5" />
      <path d="M13 30c1.5-6 4-8.5 7-8.5s5.5 2.5 7 8.5" />
      <path d="M9 33h22" />
    </svg>
  ),
  scroll: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="10" y="10" width="20" height="20" rx="3" />
      <path d="M15 17h10M15 22h7" />
    </svg>
  ),
  handsup: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="20" cy="12" r="4.5" />
      <path d="M20 20v11M20 20l-7-6M20 20l7-6" />
    </svg>
  ),
  shake: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="20" cy="12" r="4.5" />
      <path d="M13 30c1-6 4-9 7-9s6 3 7 9" />
      <path d="M10 20l2 2M30 20l-2 2" />
    </svg>
  ),
  exhale: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="17" cy="18" r="6" />
      <path d="M23 18h9M28 14l4 4-4 4" />
    </svg>
  ),
  step: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M10 28V18M18 28V12M26 28V22" />
    </svg>
  ),
  speak: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12h22v13H18l-5 4v-4H9z" />
    </svg>
  ),
  breathe2: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M20 30c8-4 8-10 0-16-8 6-8 12 0 16z" />
    </svg>
  ),
  question: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="20" cy="20" r="11" />
      <path d="M17 16a3 3 0 1 1 4.5 2.6C20 19.4 20 20.4 20 22" />
      <circle cx="20" cy="26" r=".6" fill="currentColor" />
    </svg>
  ),
  eyeoff: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M9 20s5-8 11-8 11 8 11 8-5 8-11 8-11-8-11-8z" />
      <circle cx="20" cy="20" r="3" />
    </svg>
  ),
  away: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="20" cy="20" r="11" />
      <path d="M25 15l-10 10" />
    </svg>
  ),
};

const DATA: Record<MoodFamily, Record<string, FeelingData>> = {
  Sad: {
    Lonely: { target: 'Connected', iconSvg: ICONS.moonperson, title: 'Reach out for a moment', action: 'Send one short message to someone you trust. Just say hi.' },
    Rejected: { target: 'Grounded', iconSvg: ICONS.facex, title: 'Come back to solid ground', action: 'Name three things around you that are solid and real.' },
    Hurt: { target: 'Comforted', iconSvg: ICONS.heartbreak, title: 'A slow, comforting breath', action: 'Place a hand on your chest and take five slow breaths.' },
    Ashamed: { target: 'Accepted', iconSvg: ICONS.mountainhands, title: 'Speak kindly to yourself', action: 'Say to yourself: I am doing my best with what I know right now.' },
    Guilty: { target: 'Forgiving', iconSvg: ICONS.raincloud, title: 'Write it out, once', action: 'Write the one thing you would say to a friend in your position.' },
    Empty: { target: 'Nourished', iconSvg: ICONS.dashedcircle, title: 'A small act of care', action: 'Drink a full glass of water, slowly, without doing anything else.' },
    Overwhelmed: { target: 'Peaceful', iconSvg: ICONS.spiral, title: 'A steady 4–6 breath', action: 'Breathe in for 4, breathe out for 6. Repeat six times while relaxing your jaw and shoulders.' },
    Abandoned: { target: 'Held', iconSvg: ICONS.dashedperson, title: 'Give yourself a hold', action: 'Wrap your arms around yourself and press gently for 10 seconds.' },
  },
  Fearful: {
    Anxious: { target: 'Steady', iconSvg: ICONS.steady, title: 'Feel your feet', action: 'Plant both feet flat on the floor and press down for 10 seconds.' },
    Worried: { target: 'Reassured', iconSvg: ICONS.scroll, title: 'Separate the worry', action: 'Write down the worry, then write one thing within your control.' },
    Insecure: { target: 'Confident', iconSvg: ICONS.handsup, title: 'Take up your space', action: 'Stand tall, shoulders back, for 20 seconds before your next task.' },
    Nervous: { target: 'Calm', iconSvg: ICONS.shake, title: 'Shake it loose', action: 'Shake out your hands for 10 seconds, then let them go loose.' },
  },
  Angry: {
    Frustrated: { target: 'Clear-headed', iconSvg: ICONS.exhale, title: 'Release the tension', action: 'Unclench your jaw and drop your shoulders. Exhale hard once.' },
    Irritated: { target: 'Patient', iconSvg: ICONS.step, title: 'Take one step back', action: 'Step away for 60 seconds before you respond to anything.' },
    Resentful: { target: 'Released', iconSvg: ICONS.speak, title: 'Say it once, out loud', action: 'Name what you needed and did not get, out loud, once.' },
    Provoked: { target: 'Composed', iconSvg: ICONS.breathe2, title: 'Count it down', action: 'Press your tongue to the roof of your mouth and count to 20.' },
  },
  Disgusted: {
    Disapproving: { target: 'Open', iconSvg: ICONS.question, title: 'Ask one honest question', action: 'Ask yourself one honest question: what am I not seeing?' },
    Judgmental: { target: 'Understanding', iconSvg: ICONS.hug, title: 'Picture their side', action: 'Picture one reason someone might act this way.' },
    Repulsed: { target: 'Neutral', iconSvg: ICONS.eyeoff, title: 'Look away, reset', action: 'Look away for 30 seconds and focus on something plain.' },
  },
  Stressed: {
    Overworked: { target: 'Rested', iconSvg: ICONS.breathe2, title: 'A short shoulder reset', action: 'Close your eyes and roll your shoulders back five times.' },
    Pressured: { target: 'In control', iconSvg: ICONS.step, title: 'Just the next step', action: 'List the next single step. Only the next one.' },
    Rushed: { target: 'Unhurried', iconSvg: ICONS.exhale, title: 'One breath first', action: 'Take one breath before you open the next tab or message.' },
    Tense: { target: 'Loose', iconSvg: ICONS.shake, title: 'Shrug it off', action: 'Shrug your shoulders to your ears, hold, then drop them fully.' },
  },
};

const FAQS = [
  { q: 'Is MoodFlip completely free to use?', a: 'Yes. The interactive mood tool is 100% free with no account or credit card required.' },
  { q: 'Do I need to sign up or create a profile?', a: 'No. You can flip your mood without any sign-up. A profile is only needed if you want to save check-ins toward a personalized PDF plan.' },
  { q: 'Is MoodFlip therapy or medical advice?', a: 'No. MoodFlip is a self-reflection utility, not therapy, diagnosis, or crisis support.' },
  { q: 'How does the 90-day automatic data cleanup work?', a: 'Any optional saved profile or check-in is automatically deleted after 90 days of inactivity.' },
  { q: "What's in the optional $7 PDF Mindset Plan?", a: 'A personalized 7-day roadmap generated from your eligible saved check-ins, delivered as an instant PDF download and email backup.' },
];

function AdBanner() {
  if (!ADSENSE_ENABLED || !ADSENSE_PUB_ID) return null;
  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '10px 24px' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '90px', borderRadius: '10px', overflow: 'hidden' }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot="top-banner"
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export default function HomePage() {
  const [selectedFamily, setSelectedFamily] = useState<MoodFamily | null>(null);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [activeResult, setActiveResult] = useState<FeelingData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const pickFamily = (family: MoodFamily) => {
    setSelectedFamily(family);
    setSelectedFeeling(null);
    setActiveResult(null);
  };

  const pickFeeling = (feeling: string) => {
    setSelectedFeeling(feeling);
    setActiveResult(null);
  };

  const doFlip = () => {
    if (!selectedFamily || !selectedFeeling) return;
    const data = DATA[selectedFamily][selectedFeeling];
    if (data) {
      setActiveResult(data);
      setTimeout(() => {
        document.getElementById('rightPanel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  return (
    <>
      <SiteLoader />
      <div className="site-shell">
        <Header />

        <style>{`
          :root {
            --cream: #FBF7EF;
            --panel: #FFFFFF;
            --panel-soft: #FAF6EE;
            --ink: #2C2735;
            --ink-soft: #726B7E;
            --purple: #5B4B9A;
            --purple-deep: #463A78;
            --purple-fill: #EFEAFA;
            --purple-line: #D9D0F0;
            --gold: #D9A54B;
            --sage: #7C8B5E;
            --line: #EAE3D6;
            --shadow: 0 20px 50px rgba(44,39,53,0.08);
            --display: 'Playfair Display', Georgia, serif;
            --body: 'Inter', system-ui, sans-serif;
          }

          .mf-exact-root {
            background: var(--cream);
            color: var(--ink);
            font-family: var(--body);
            -webkit-font-smoothing: antialiased;
            min-height: 100vh;
          }
          .mf-exact-wrap {
            max-width: 1240px; margin: 0 auto; padding: 0 24px;
          }

          /* HERO */
          .mf-hero-lead { padding: 36px 0 8px; text-align: center; }
          .mf-hero-lead .tag {
            display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 600;
            color: var(--purple); background: var(--purple-fill); border-radius: 20px; padding: 7px 16px; margin-bottom: 16px;
          }
          .mf-hero-lead h1 {
            font-family: var(--display); font-size: clamp(26px, 3.6vw, 40px); font-weight: 600; line-height: 1.18;
            max-width: 720px; margin: 0 auto 12px; color: var(--ink);
          }
          .mf-hero-lead p { font-size: 15.5px; color: var(--ink-soft); max-width: 560px; margin: 0 auto; line-height: 1.6; }

          /* TOOL MAIN */
          .mf-tool { padding: 36px 0 70px; }
          .mf-tool-grid {
            display: grid; grid-template-columns: 1.15fr 46px 1fr; align-items: stretch; gap: 0; position: relative;
          }
          @media (max-width: 980px) {
            .mf-tool-grid { grid-template-columns: 1fr; }
          }

          .mf-panel { border-radius: 26px; box-shadow: var(--shadow); padding: 34px; }
          .mf-panel-left { background: var(--panel); border: 1px solid var(--line); }

          .mf-step-tag {
            display: inline-flex; align-items: center; gap: 8px; background: var(--purple-fill); color: var(--purple);
            font-size: 13px; font-weight: 600; padding: 8px 14px 8px 10px; border-radius: 16px; margin-bottom: 14px;
          }
          .mf-step-tag .ic {
            width: 22px; height: 22px; border-radius: 50%; background: #fff;
            display: flex; align-items: center; justify-content: center; font-size: 12px;
          }

          .mf-chip-row { display: flex; flex-wrap: wrap; gap: 10px; }
          .mf-fam-chip {
            font-family: var(--body); font-size: 14.5px; font-weight: 600; padding: 12px 20px; border-radius: 18px;
            border: 1.5px solid var(--line); background: var(--panel-soft); color: var(--ink); cursor: pointer; transition: .15s;
          }
          .mf-fam-chip:hover { border-color: var(--purple-line); }
          .mf-fam-chip.selected {
            background: var(--purple-fill); border-color: var(--purple); color: var(--purple-deep); box-shadow: 0 6px 16px rgba(91,75,154,0.14);
          }

          .mf-feel-row { margin-top: 28px; }
          .mf-feel-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
          @media (max-width: 720px) {
            .mf-feel-grid { grid-template-columns: repeat(2, 1fr); }
          }
          .mf-feel-tile {
            border: 1.5px solid var(--line); background: var(--panel-soft); border-radius: 16px; padding: 16px 10px 14px;
            display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; transition: .15s; text-align: center;
          }
          .mf-feel-tile:hover { border-color: var(--purple-line); transform: translateY(-1px); }
          .mf-feel-tile.selected { background: var(--purple-fill); border-color: var(--purple); box-shadow: 0 8px 18px rgba(91,75,154,0.16); }
          .mf-feel-tile .icon { width: 34px; height: 34px; color: var(--purple); display: flex; align-items: center; justify-content: center; }
          .mf-feel-tile span { font-size: 13px; font-weight: 600; color: var(--ink); }
          .mf-feel-empty { grid-column: 1 / -1; font-size: 13.5px; color: var(--ink-soft); padding: 18px 0; text-align: center; }

          /* CENTER FLIP BUTTON */
          .mf-flip-col { display: flex; align-items: center; justify-content: center; position: relative; }
          @media (max-width: 980px) {
            .mf-flip-col { padding: 18px 0; }
          }

          .mf-flip-btn {
            font-family: var(--body); font-weight: 700; font-size: 14px; letter-spacing: .01em;
            background: linear-gradient(135deg, var(--purple), var(--purple-deep)); color: #fff;
            border: none; border-radius: 50px; padding: 18px 14px; cursor: pointer;
            display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center;
            box-shadow: 0 12px 30px rgba(91,75,154,0.38); width: 88px;
            transition: all 0.2s ease;
          }
          @media (max-width: 980px) {
            .mf-flip-btn { width: auto; flex-direction: row; padding: 16px 28px; border-radius: 30px; }
          }
          .mf-flip-btn:disabled { opacity: .4; cursor: not-allowed; animation: none; box-shadow: none; }
          .mf-flip-btn:not(:disabled) { animation: pulseGlow 2.6s ease-in-out infinite; }
          .mf-flip-btn svg { width: 20px; height: 20px; }
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 12px 30px rgba(91,75,154,0.38); }
            50% { box-shadow: 0 12px 40px rgba(91,75,154,0.6); }
          }

          /* RIGHT PANEL */
          .mf-panel-right {
            position: relative; overflow: hidden; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
            background:
              radial-gradient(circle at 50% 8%, #FCEFD6 0%, #F8DFAF 32%, #F4CFA0 52%, transparent 72%),
              linear-gradient(180deg, #FEFBF4 0%, #FBF3E2 100%);
            border: 1px solid var(--line); min-height: 440px;
          }
          .mf-sun-rays { position: absolute; top: -40px; left: 50%; transform: translateX(-50%); width: 520px; height: 320px; opacity: .55; pointer-events: none; }
          .mf-heart-ic { color: #D98E8E; margin-bottom: 10px; width: 22px; height: 22px; }
          .mf-result-label { font-size: 13.5px; color: var(--ink-soft); font-weight: 600; margin-bottom: 6px; }
          .mf-result-mood {
            font-family: var(--display); font-weight: 700; font-size: clamp(38px, 5.4vw, 56px); color: var(--sage);
            margin-bottom: 26px; min-height: 64px; line-height: 1.1;
          }
          .mf-action-card {
            background: #fff; border-radius: 18px; padding: 24px 26px; text-align: left; width: 100%;
            box-shadow: 0 14px 30px rgba(217,165,75,0.16); position: relative; z-index: 1;
          }
          .mf-action-head { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
          .mf-action-ic { width: 44px; height: 44px; border-radius: 50%; background: var(--purple-fill); display: flex; align-items: center; justify-content: center; color: var(--purple); flex-shrink: 0; }
          .mf-action-ic svg { width: 24px; height: 24px; }
          .mf-action-head h3 { font-family: var(--display); font-size: 16.5px; font-weight: 600; margin: 0; line-height: 1.3; color: var(--ink); }
          .mf-action-card p.desc { font-size: 14.5px; color: var(--ink-soft); line-height: 1.65; margin: 0; }
          .mf-hr-soft { height: 1px; background: var(--line); margin: 14px 0; }
          .mf-save-btn {
            margin-top: 20px; width: 100%; background: transparent; border: 1.5px solid var(--purple); color: var(--purple-deep);
            font-weight: 700; font-size: 13px; letter-spacing: .03em; padding: 13px; border-radius: 24px; cursor: pointer; transition: .2s;
          }
          .mf-save-btn:hover { background: var(--purple-fill); }
          .mf-empty-right { color: var(--ink-soft); font-size: 14px; padding: 60px 12px; line-height: 1.7; }

          /* REASSURANCE */
          .mf-reassure {
            margin-top: 26px; background: var(--purple-fill); border-radius: 20px; padding: 20px 26px;
            display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap;
          }
          .mf-reassure div { display: flex; align-items: flex-start; gap: 10px; font-size: 13.5px; color: var(--ink); max-width: 280px; }
          .mf-reassure strong { display: block; font-size: 14px; margin-bottom: 2px; }
          .mf-reassure svg { width: 18px; height: 18px; color: var(--purple); flex-shrink: 0; margin-top: 2px; }

          /* SECTIONS */
          section.light { padding: 70px 0; }
          section.light.alt { background: var(--panel-soft); }
          .mf-section-head { max-width: 600px; margin-bottom: 40px; }
          .mf-section-head .tag { display: inline-flex; font-size: 12.5px; font-weight: 600; color: var(--purple); background: var(--purple-fill); border-radius: 20px; padding: 7px 16px; margin-bottom: 14px; }
          .mf-section-head h2 { font-family: var(--display); font-size: clamp(24px, 3vw, 34px); font-weight: 600; line-height: 1.2; color: var(--ink); }
          .mf-section-head p { font-size: 15px; color: var(--ink-soft); margin-top: 12px; line-height: 1.6; }

          .mf-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
          @media (max-width: 980px) {
            .mf-steps { grid-template-columns: 1fr; }
          }
          .mf-step-card { background: var(--panel); border: 1px solid var(--line); border-radius: 18px; padding: 26px; box-shadow: var(--shadow); }
          .mf-step-num { font-family: var(--display); font-size: 26px; color: var(--purple); font-weight: 700; display: block; margin-bottom: 10px; }
          .mf-step-card h3 { font-size: 17.5px; margin: 0 0 8px; font-family: var(--display); font-weight: 600; color: var(--ink); }
          .mf-step-card p { font-size: 14px; color: var(--ink-soft); line-height: 1.6; margin: 0; }

          /* FAQ */
          .mf-faq { max-width: 720px; }
          .mf-faq-item { border-bottom: 1px solid var(--line); padding: 18px 0; }
          .mf-faq-q { display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-weight: 600; font-size: 15px; color: var(--ink); }
          .mf-faq-plus { color: var(--purple); font-size: 18px; transition: .2s; }
          .mf-faq-item.open .mf-faq-plus { transform: rotate(45deg); }
          .mf-faq-a { padding-top: 10px; font-size: 14px; color: var(--ink-soft); line-height: 1.6; max-height: none !important; overflow: visible !important; }

          /* TOAST */
          .mf-toast {
            position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(20px); z-index: 200;
            background: var(--ink); color: #fff; padding: 14px 22px; border-radius: 14px; font-size: 13.5px;
            box-shadow: 0 14px 30px rgba(0,0,0,0.25); opacity: 0; pointer-events: none; transition: .3s ease; max-width: 90vw; text-align: center;
          }
          .mf-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
        `}</style>

        <main className="mf-exact-root">
          <AdBanner />

          {/* HERO LEAD */}
          <div className="mf-hero-lead">
            <div className="mf-exact-wrap">
              <span className="tag">✨ 100% Free · Tap-Only · No Sign-Up</span>
              <h1>Shift your mindset in 60 seconds</h1>
              <p>Select your current mood, discover your positive counterpart, and get a practical 60-second action to regain emotional clarity.</p>
            </div>
          </div>

          {/* TOOL CONTAINER */}
          <div className="mf-tool" id="demo">
            <div className="mf-exact-wrap">
              <div className="mf-tool-grid">

                {/* LEFT PANEL */}
                <div className="mf-panel mf-panel-left">
                  <span className="mf-step-tag"><span className="ic">☁️</span> Choose your current mood</span>
                  <div className="mf-chip-row">
                    {(Object.keys(DATA) as MoodFamily[]).map((f) => (
                      <button
                        key={f}
                        className={`mf-fam-chip ${selectedFamily === f ? 'selected' : ''}`}
                        onClick={() => pickFamily(f)}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  <div className="mf-feel-row">
                    <span className="mf-step-tag"><span className="ic">🤍</span> Pick the feeling closest to how you feel</span>
                    <div className="mf-feel-grid">
                      {!selectedFamily ? (
                        <div className="mf-feel-empty">Choose a mood family above to see feelings.</div>
                      ) : (
                        Object.entries(DATA[selectedFamily]).map(([feel, d]) => (
                          <button
                            key={feel}
                            className={`mf-feel-tile ${selectedFeeling === feel ? 'selected' : ''}`}
                            onClick={() => pickFeeling(feel)}
                          >
                            <span className="icon">{d.iconSvg}</span>
                            <span>{feel}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* CENTER FLIP BUTTON */}
                <div className="mf-flip-col">
                  <button
                    className="mf-flip-btn"
                    disabled={!selectedFamily || !selectedFeeling}
                    onClick={doFlip}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                    <span>Flip My Mood</span>
                  </button>
                </div>

                {/* RIGHT PANEL */}
                <div className="mf-panel mf-panel-right" id="rightPanel">
                  <svg className="mf-sun-rays" viewBox="0 0 520 320">
                    <g stroke="#E9C27C" strokeWidth="1.5" opacity="0.6">
                      <line x1="260" y1="40" x2="260" y2="0" />
                      <line x1="180" y1="55" x2="150" y2="15" />
                      <line x1="340" y1="55" x2="370" y2="15" />
                      <line x1="120" y1="90" x2="70" y2="60" />
                      <line x1="400" y1="90" x2="450" y2="60" />
                      <line x1="90" y1="150" x2="30" y2="140" />
                      <line x1="430" y1="150" x2="490" y2="140" />
                    </g>
                  </svg>

                  {!activeResult ? (
                    <div className="mf-empty-right">
                      Your positive mood and 60-second action will appear here once you flip.
                    </div>
                  ) : (
                    <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
                      <svg className="mf-heart-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 21s-7.5-4.6-10-9.3C.5 8 2.4 4.5 6 4c2-.3 3.7.7 6 3 2.3-2.3 4-3.3 6-3 3.6.5 5.5 4 4 7.7C19.5 16.4 12 21 12 21z" />
                      </svg>
                      <div className="mf-result-label">Your mood has changed to:</div>
                      <div className="mf-result-mood">{activeResult.target}</div>
                      <div className="mf-action-card">
                        <div className="mf-action-head">
                          <div className="mf-action-ic">{activeResult.iconSvg}</div>
                          <h3>{activeResult.title}</h3>
                        </div>
                        <div className="mf-hr-soft" />
                        <p className="desc">{activeResult.action}</p>
                        <button className="mf-save-btn" onClick={() => showToast('Profile saving needs a free account — coming right after you try a few flips.')}>
                          ✨ Save My Profile
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* REASSURANCE STRIP */}
              <div className="mf-reassure">
                <div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 21s-7.5-4.6-10-9.3C.5 8 2.4 4.5 6 4c2-.3 3.7.7 6 3 2.3-2.3 4-3.3 6-3 3.6.5 5.5 4 4 7.7C19.5 16.4 12 21 12 21z" />
                  </svg>
                  <span><strong>Small shifts can change how you feel.</strong>You&apos;ve got this.</span>
                </div>
                <div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 3c9 0 15 6 15 15-9 0-15-6-15-15z" />
                    <path d="M6 21c0-6 3-9 7-11" />
                  </svg>
                  <span><strong>Be kind to yourself.</strong>One choice at a time.</span>
                </div>
              </div>
            </div>
          </div>

          {/* HOW IT WORKS */}
          <section className="light alt">
            <div className="mf-exact-wrap">
              <div className="mf-section-head">
                <span className="tag">⚡ How MoodFlip works</span>
                <h2>From stuck to moving — in three gentle taps.</h2>
                <p>No typing and no long questionnaire. Narrow the feeling, then take one manageable next step.</p>
              </div>
              <div className="mf-steps">
                <div className="mf-step-card"><span className="mf-step-num">01</span><h3>Choose what feels closest</h3><p>Start with a broad mood family, then tap the feeling that best matches this moment.</p></div>
                <div className="mf-step-card"><span className="mf-step-num">02</span><h3>Flip the emotional direction</h3><p>MoodFlip pairs that feeling with a more supportive target state — without asking you to type anything.</p></div>
                <div className="mf-step-card"><span className="mf-step-num">03</span><h3>Take one tiny action</h3><p>Try a practical 60-second reset designed to feel manageable, even on a difficult day.</p></div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="light">
            <div className="mf-exact-wrap">
              <div className="mf-section-head">
                <span className="tag">💬 Got questions?</span>
                <h2>Frequently asked questions</h2>
              </div>
              <div className="mf-faq">
                {FAQS.map((item, idx) => (
                  <div key={idx} className={`mf-faq-item ${openFaq === idx ? 'open' : ''}`}>
                    <div className="mf-faq-q" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                      <span>{item.q}</span>
                      <span className="mf-faq-plus">+</span>
                    </div>
                    {openFaq === idx && (
                      <div className="mf-faq-a"><p>{item.a}</p></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {/* TOAST NOTIFICATION */}
        <div className={`mf-toast ${toastMsg ? 'show' : ''}`}>
          {toastMsg}
        </div>
      </div>
    </>
  );
}
