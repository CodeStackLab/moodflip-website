'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import AuthModal from '@/components/AuthModal';
import PaidPlansSection from '@/components/PaidPlansSection';

/* ----------------------------------------------------------------
   MoodFlip v2 — "A quiet breath between how you feel and what's next"
   Calm, premium, minimal wellness-utility aesthetic.
------------------------------------------------------------------- */

type FamilyName = 'Sad' | 'Fearful' | 'Angry' | 'Disgusted' | 'Stressed';

interface FamilyMetaEntry {
  icon: string;
  dot: string;
  bgGradient: string;
  border: string;
  desc: string;
}

interface FeelingLeaf {
  target: string;
  action: string;
}

type CategoryMap = Record<string, Record<string, FeelingLeaf>>;
type MoodDataShape = Record<FamilyName, CategoryMap>;

const FAMILY_ORDER: FamilyName[] = ['Sad', 'Fearful', 'Angry', 'Disgusted', 'Stressed'];

const FAMILY_META: Record<FamilyName, FamilyMetaEntry> = {
  Sad: {
    icon: '🌧️',
    dot: '#6366f1',
    bgGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%)',
    border: 'rgba(99, 102, 241, 0.3)',
    desc: 'Loneliness, grief, or feeling empty'
  },
  Fearful: {
    icon: '🌫️',
    dot: '#a855f7',
    bgGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(236, 72, 153, 0.08) 100%)',
    border: 'rgba(168, 85, 247, 0.3)',
    desc: 'Anxiety, worry, or feeling exposed'
  },
  Angry: {
    icon: '⛈️',
    dot: '#f43f5e',
    bgGradient: 'linear-gradient(135deg, rgba(244, 63, 94, 0.12) 0%, rgba(249, 115, 22, 0.08) 100%)',
    border: 'rgba(244, 63, 94, 0.3)',
    desc: 'Frustration, annoyance, or impatience'
  },
  Disgusted: {
    icon: '🌪️',
    dot: '#10b981',
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%)',
    border: 'rgba(16, 185, 129, 0.3)',
    desc: 'Judgmental, uncomfortable, or avoidant'
  },
  Stressed: {
    icon: '💨',
    dot: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(234, 179, 8, 0.08) 100%)',
    border: 'rgba(245, 158, 11, 0.3)',
    desc: 'Pressured, wound up, or overburdened'
  },
};

const MOOD_DATA: MoodDataShape = {
  Sad: {
    Lonely: {
      Isolated: { target: 'Connected', action: 'Send one voice note to someone you trust. Just say hi — no big update needed.' },
      'Left out': { target: 'Included', action: "List three people who'd want to hear from you right now. Text the first one." },
      Abandoned: { target: 'Secure', action: 'Wrap a soft blanket around yourself and ground your feet into the floor for 60 seconds.' },
      Hurt: { target: 'Healed', action: "Place a hand over your heart, take 3 slow breaths, and say out loud: 'I acknowledge this pain.'" },
    },
    Discouraged: {
      Disappointed: { target: 'Hopeful', action: 'Write down one thing today that went slightly better than you expected.' },
      Hopeless: { target: 'Reassured', action: 'Name one hard thing you already got through, even when it felt impossible.' },
      Ashamed: { target: 'Self-Compassionate', action: "Say out loud: 'I am human, I make mistakes, and I am worthy of kindness.'" },
      Guilty: { target: 'Forgiven', action: 'Write down what you can learn from this moment, then take a deep cleansing exhale.' },
    },
    Empty: {
      Grieving: { target: 'Comforted', action: 'Allow yourself 60 seconds of gentle stillness with no expectations or pressure.' },
      Numb: { target: 'Awakened', action: 'Sip a glass of cold water mindfully, paying attention to the sensation in your throat.' },
      Exhausted: { target: 'Rested', action: 'Close your eyes for 60 seconds, unclench your teeth, and let your body sink into your chair.' },
    },
  },
  Fearful: {
    Anxious: {
      Overwhelmed: { target: 'Grounded', action: 'Name 5 things you can see, 4 you can touch, 3 you can hear, right now.' },
      Worried: { target: 'Steady', action: "Write the worst case. Then write what you'd actually do if it happened." },
      Panicked: { target: 'Calm', action: 'Breathe in for 4 seconds, hold for 4, exhale for 6. Repeat 3 times slowly.' },
      Restless: { target: 'Centered', action: 'Plant both feet flat on the floor and feel the solid ground holding you up.' },
    },
    Insecure: {
      Inadequate: { target: 'Capable', action: 'List one skill you used well this week, however small it seems.' },
      Exposed: { target: 'Safe', action: 'Wrap yourself in a blanket or hoodie for two minutes. Let your shoulders drop.' },
      Scared: { target: 'Protected', action: 'Place one hand on your belly and breathe into your palm 5 slow times.' },
      Terrified: { target: 'Anchored', action: 'Look around the room and name 3 physical objects that are completely stable.' },
    },
  },
  Angry: {
    Frustrated: {
      Stuck: { target: 'Clear', action: "Write the one-sentence version of what's actually bothering you." },
      'Let down': { target: 'Understanding', action: "Consider one reason the other person's view might make some sense." },
      Annoyed: { target: 'Peaceful', action: 'Take one step back physically from your screen or work for 60 seconds.' },
      Furious: { target: 'Cool', action: 'Run cold water over your wrists for 30 seconds and focus on the temperature.' },
    },
    Irritated: {
      Impatient: { target: 'Patient', action: 'Breathe out for twice as long as you breathe in. Repeat four times.' },
      Resentful: { target: 'Released', action: "Say out loud, alone, exactly what you wish you'd said. Then let it go." },
      Hostile: { target: 'Softened', action: 'Unclench your fists, open your palms facing upward, and take a long breath.' },
      Betrayed: { target: 'Self-Reliant', action: "Remind yourself: 'My peace belongs to me, regardless of others' actions.'" },
    },
  },
  Disgusted: {
    Disapproving: {
      Judgmental: { target: 'Open', action: 'Ask yourself what you might not know about the full situation.' },
      Critical: { target: 'Accepting', action: "Name one thing about this moment that's simply neutral, not good or bad." },
      Disapproved: { target: 'Self-Validating', action: "Remind yourself that your worth doesn't depend on external approval." },
    },
    Repulsed: {
      Uncomfortable: { target: 'Settled', action: 'Change your physical position. Stand, stretch, or step outside for a minute.' },
      Avoidant: { target: 'Present', action: "Name the exact thing you're avoiding, in one short sentence." },
      Revolted: { target: 'Cleansed', action: 'Wash your hands with warm water, noticing the comforting sensory sensation.' },
    },
  },
  Stressed: {
    Pressured: {
      Rushed: { target: 'Paced', action: 'Pick the one task that actually matters in the next hour. Do only that.' },
      'Burnt out': { target: 'Restored', action: 'Close your eyes for 60 seconds. Do nothing else. Let that be enough.' },
      Overburdened: { target: 'Lightened', action: 'Identify one small thing you can delegate, postpone, or say no to today.' },
    },
    Tense: {
      'Wound up': { target: 'Calm', action: 'Drop your shoulders, unclench your jaw, uncurl your fingers. Slow exhale.' },
      'On edge': { target: 'Centered', action: 'Plant both feet flat on the floor. Notice the ground holding you up.' },
      Frazzled: { target: 'Ordered', action: 'Take 3 slow breaths and clear off your immediate physical workspace.' },
    },
  },
};

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  { q: 'Is MoodFlip really free?', a: 'Yes. The full tap-through tool costs nothing to use, with no account or card required.' },
  { q: 'Do I have to make a profile?', a: 'No. You can use MoodFlip anonymously any time. Saving a profile is optional, never required.' },
  { q: 'Is this therapy or medical advice?', a: "No. MoodFlip is a self-reflection utility, not a substitute for professional care. If you're in crisis, please contact a licensed professional or your local emergency number." },
  { q: 'What happens to my data after 90 days?', a: 'Anything you choose to save is automatically and permanently deleted after 90 days of inactivity.' },
  { q: "What's in the $7 Mindset Plan?", a: 'A one-time downloadable PDF with a deeper set of prompts and 60-second actions to keep, no subscription attached.' },
];

function useReveal(rootRef: React.RefObject<HTMLDivElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>('.mf2-reveal');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('mf2-in-view');
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [rootRef]);
}

export default function MoodTool(): React.JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [family, setFamily] = useState<FamilyName | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [feeling, setFeeling] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedShift, setSavedShift] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number>(0);

  useEffect(() => {
    if (!revealed || !timerRunning) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [revealed, timerRunning]);

  const categories = family ? Object.keys(MOOD_DATA[family]) : [];
  const feelings = family && category ? Object.keys(MOOD_DATA[family][category]) : [];
  const result = family && category && feeling ? MOOD_DATA[family][category][feeling] : null;

  function pickFamily(name: FamilyName): void { setFamily(name); setCategory(null); setFeeling(null); setRevealed(false); setTimerRunning(false); }
  function pickCategory(name: string): void { setCategory(name); setFeeling(null); setRevealed(false); setTimerRunning(false); }
  function pickFeeling(name: string): void { setFeeling(name); setRevealed(false); setTimerRunning(false); }
  function revealFlip(): void {
    setRevealed(true);
    setSecondsLeft(60);
    setTimerRunning(true);
    setSavedShift(false);
  }
  function reset() { setFamily(null); setCategory(null); setFeeling(null); setRevealed(false); setTimerRunning(false); setSavedShift(false); }

  const currentStep = useMemo(() => {
    if (revealed) return 4;
    if (feeling) return 3;
    if (category) return 3;
    if (family) return 2;
    return 1;
  }, [family, category, feeling, revealed]);

  const orbLabel = useMemo(() => {
    if (revealed && result) return result.target;
    if (feeling) return feeling;
    if (category) return category;
    if (family) return family;
    return 'Begin';
  }, [revealed, result, feeling, category, family]);

  const crumbs = [family, category, feeling].filter(Boolean);

  return (
    <div className={`mf2-root ${revealed ? 'mf2-cleared' : ''}`} ref={rootRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Manrope:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        .mf2-root {
          --paper: #f7f7ff;
          --surface: rgba(255,255,255,0.84);
          --ink: #18152b;
          --ink-soft: rgba(24,21,43,0.68);
          --ink-faint: rgba(24,21,43,0.46);
          --sage: #6d5ce8;
          --sage-deep: #5543d8;
          --sage-soft: #eeebff;
          --gold: #f09a70;
          --line: rgba(73,61,139,0.13);

          font-family: 'Manrope', sans-serif;
          background: radial-gradient(circle at 8% 4%, rgba(239,108,168,.13), transparent 30rem), radial-gradient(circle at 92% 10%, rgba(86,200,207,.14), transparent 34rem), linear-gradient(180deg, #fbfaff 0%, var(--paper) 50%, #f3f6ff 100%);
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
          transition: background 1.2s ease;
          min-height: 100vh;
        }
        .mf2-root * { box-sizing: border-box; }
        .mf2-root h1, .mf2-root h2, .mf2-root h3 { font-family: 'Newsreader', serif; font-weight: 500; letter-spacing: -0.01em; margin: 0; }
        .mf2-root em { font-style: italic; font-weight: 500; }
        .mf2-root p { margin: 0; }
        .mf2-root button { font-family: inherit; cursor: pointer; }
        .mf2-root a { color: inherit; text-decoration: none; }
        .mf2-mono { font-family: 'Space Mono', monospace; }
        .mf2-root :focus-visible { outline: 2px solid var(--sage-deep); outline-offset: 3px; border-radius: 4px; }

        .mf2-wrap { max-width: 1160px; margin: 0 auto; padding: 0 28px; }
        .mf2-wrap-narrow { max-width: 720px; margin: 0 auto; padding: 0 28px; }

        /* ---------------- nav ---------------- */
        .mf2-nav { position: sticky; top: 0; z-index: 50; padding: 22px 0; transition: all 0.35s ease; }
        .mf2-nav.mf2-scrolled { background: rgba(250,249,255,0.82); backdrop-filter: blur(20px) saturate(140%); padding: 14px 0; box-shadow: 0 1px 0 var(--line); }
        .mf2-nav-row { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
        .mf2-brand { display: flex; align-items: center; gap: 10px; font-size: 18px; font-weight: 700; letter-spacing: -0.01em; }
        .mf2-brand-mark { width: 30px; height: 30px; border-radius: 10px; background: linear-gradient(135deg, #ef6ca8, var(--sage-deep) 55%, #56c8cf); box-shadow: 0 8px 18px rgba(85,67,216,.28); transform: rotate(-8deg); flex-shrink: 0; display:grid; place-items:center; }
        .mf2-brand-mark::before { content: "♥"; color:#fff; font-size:15px; line-height:1; transform:rotate(8deg); text-shadow:0 1px 2px rgba(49,35,132,.2); }
        .mf2-nav-links { display: flex; align-items: center; gap: 34px; font-size: 14.5px; font-weight: 500; color: var(--ink-soft); }
        .mf2-nav-links a:hover { color: var(--ink); }
        .mf2-nav-right { display: flex; align-items: center; gap: 22px; }
        .mf2-login { font-size: 14px; font-weight: 600; color: var(--ink-soft); text-decoration: underline; text-underline-offset: 3px; background: none; border: none; padding: 0; }
        .mf2-login:hover { color: var(--ink); }
        .mf2-burger { display: none; background: none; border: none; font-size: 22px; color: var(--ink); }

        .mf2-btn { border-radius: 999px; padding: 13px 24px; font-weight: 700; font-size: 14.5px; border: none; transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease; }
        .mf2-btn:hover { transform: translateY(-1px); }
        .mf2-btn-primary { background: linear-gradient(135deg, #6654e8, #4b3bc5); color: #fff; box-shadow: 0 12px 28px rgba(85,67,216,.28); }
        .mf2-btn-primary:hover { background: linear-gradient(135deg, #725ff1, #4434bb); }
        .mf2-btn-sm { padding: 10px 18px; font-size: 13.5px; }

        /* ---------------- hero ---------------- */
        .mf2-hero { padding: 86px 0 46px; text-align: center; position: relative; }
        .mf2-eyebrow-line { display: inline-flex; font-size: 12px; font-weight: 800; color: var(--sage-deep); letter-spacing: .07em; margin-bottom: 24px; text-transform: uppercase; padding: 8px 14px; border-radius: 999px; background: rgba(255,255,255,.72); border: 1px solid var(--line); }
        .mf2-hero h1 { font-size: clamp(40px, 6vw, 68px); line-height: 1.04; max-width: 15ch; letter-spacing: -0.035em; margin: 0 auto 22px; }
        .mf2-hero-sub { font-size: 17.5px; line-height: 1.65; color: var(--ink-soft); max-width: 46ch; margin: 0 auto 30px; }
        .mf2-hero-cta { margin-bottom: 26px; }
        .mf2-trust-line { font-size: 13.5px; color: var(--ink-faint); font-weight: 500; }
        .mf2-trust-line span { margin: 0 10px; opacity: 0.5; }

        /* ---------------- demo section ---------------- */
        .mf2-demo-section { padding: 30px 0 90px; }
        .mf2-demo-card {
          background: var(--surface); border: 1px solid rgba(255,255,255,.82); border-radius: 32px;
          padding: 50px; display: grid; grid-template-columns: 240px 1fr; gap: 52px; align-items: center;
          box-shadow: 0 32px 80px rgba(55,43,120,.12), inset 0 0 0 1px var(--line); backdrop-filter: blur(18px);
        }
        .mf2-orb-col { display: flex; flex-direction: column; align-items: center; gap: 18px; }
        .mf2-orb-wrap { position: relative; width: 170px; height: 170px; display: flex; align-items: center; justify-content: center; }
        .mf2-orb-ring { position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from 30deg, rgba(239,108,168,.22), rgba(109,92,232,.22), rgba(86,200,207,.22), rgba(239,108,168,.22)); animation: mf2Breathe 5.5s ease-in-out infinite; }
        .mf2-cleared .mf2-orb-ring { background: radial-gradient(circle at 34% 30%, #F1E4C4, rgba(241,228,196,0)); }
        @keyframes mf2Breathe { 0%, 100% { transform: scale(0.92); opacity: 0.75; } 50% { transform: scale(1.08); opacity: 1; } }
        .mf2-orb-core {
          position: relative; width: 128px; height: 128px; border-radius: 50%;
          background: linear-gradient(145deg, #7463ee, #4c3bc2); display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: background 0.8s ease; box-shadow: 0 18px 38px rgba(85,67,216,.32), inset 0 1px 0 rgba(255,255,255,.3);
        }
        .mf2-cleared .mf2-orb-core { background: linear-gradient(140deg, var(--gold), var(--sage)); }
        .mf2-orb-icon { font-size: 28px; margin-bottom: 4px; }
        .mf2-orb-label { color: #fff; font-size: 13px; font-weight: 600; max-width: 95px; text-align: center; line-height: 1.3; }
        .mf2-orb-caption { font-size: 12.5px; color: var(--ink-faint); text-align: center; font-weight: 500; }

        .mf2-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; min-height: 20px; margin-bottom: 16px; font-size: 13.5px; color: var(--ink-faint); }
        .mf2-crumb-sep { opacity: 0.5; margin: 0 4px; }
        .mf2-crumb-current { color: var(--ink); font-weight: 600; }
        .mf2-start-over { margin-left: auto; font-size: 12.5px; text-decoration: underline; color: var(--ink-faint); background: none; border: none; font-weight: 600; }
        .mf2-start-over:hover { color: var(--ink); }
        .mf2-start-over-btn:hover {
          background: linear-gradient(135deg, var(--m3-purple-primary), var(--pink-grad)) !important;
          color: #ffffff !important;
          border-color: transparent !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(124, 58, 237, 0.3) !important;
        }

        .mf2-options-label { font-size: 13.5px; color: var(--ink-soft); margin-bottom: 14px; display: block; font-weight: 600; }
        .mf2-chip-row { display: flex; flex-wrap: wrap; gap: 10px; }
        .mf2-chip {
          border: 1.5px solid var(--line); background: var(--paper); border-radius: 999px;
          padding: 10px 18px 10px 14px; font-size: 14px; font-weight: 600; color: var(--ink);
          display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;
        }
        .mf2-chip:hover { border-color: var(--sage); background: var(--sage-soft); transform: translateY(-2px); box-shadow: 0 8px 18px rgba(85,67,216,.11); }
        .mf2-chip-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

        .mf2-mood-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 14px;
          margin-top: 14px;
        }
        .mf2-family-card {
          border-radius: 20px;
          padding: 18px 16px;
          text-align: left;
          cursor: pointer;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
          overflow: hidden;
          background: var(--tile-bg);
          border: 1.5px solid var(--card-border);
        }
        .mf2-family-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 16px 36px -8px rgba(109, 92, 232, 0.25) !important;
          border-color: var(--sage) !important;
        }
        .mf2-family-card-Sad { background: linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%); border-color: rgba(99, 102, 241, 0.3); }
        .mf2-family-card-Fearful { background: linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(236, 72, 153, 0.08) 100%); border-color: rgba(168, 85, 247, 0.3); }
        .mf2-family-card-Angry { background: linear-gradient(135deg, rgba(244, 63, 94, 0.12) 0%, rgba(249, 115, 22, 0.08) 100%); border-color: rgba(244, 63, 94, 0.3); }
        .mf2-family-card-Disgusted { background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%); border-color: rgba(16, 185, 129, 0.3); }
        .mf2-family-card-Stressed { background: linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(234, 179, 8, 0.08) 100%); border-color: rgba(245, 158, 11, 0.3); }

        .mf2-flip-btn { background: linear-gradient(135deg, #ef6ca8, var(--sage-deep)); color: #fff; border: none; border-radius: 999px; padding: 13px 26px; font-size: 14.5px; font-weight: 700; cursor: pointer; transition: background 0.2s ease, transform 0.15s ease; }
        .mf2-flip-btn:hover { background: #334a36; transform: translateY(-1px); }

        .mf2-result { animation: mf2Fade 0.6s ease; }
        @keyframes mf2Fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .mf2-result-eyebrow { font-size: 13px; color: var(--ink-soft); margin-bottom: 6px; font-weight: 600; }
        .mf2-result-mood { font-family: 'Newsreader', serif; font-size: 32px; color: var(--sage-deep); margin-bottom: 10px; font-weight: 600; }
        .mf2-result-action { font-size: 15.5px; line-height: 1.6; color: var(--ink-soft); max-width: 48ch; margin-bottom: 16px; background: #FAF9F6; border: 1px solid var(--line); padding: 16px 20px; border-radius: 16px; }
        .mf2-timer { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink-faint); font-weight: 600; }
        .mf2-timer-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sage); }

        /* ---------------- quote strip ---------------- */
        .mf2-quote-section { padding: 20px 0 90px; text-align: center; }
        .mf2-quote { font-family: 'Newsreader', serif; font-style: italic; font-size: clamp(22px, 3vw, 30px); line-height: 1.5; max-width: 28ch; margin: 0 auto 14px; }
        .mf2-quote-attr { font-size: 13.5px; color: var(--ink-faint); font-weight: 600; }

        /* ---------------- generic section ---------------- */
        .mf2-section { padding: 90px 0; }
        .mf2-section-head { text-align: center; margin-bottom: 60px; }
        .mf2-eyebrow { font-size: 13px; font-weight: 700; color: var(--sage-deep); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px; }
        .mf2-section h2 { font-size: clamp(26px, 3.2vw, 38px); margin-bottom: 12px; }
        .mf2-section-sub { font-size: 16px; color: var(--ink-soft); max-width: 50ch; margin: 0 auto; line-height: 1.6; }

        .mf2-reveal { opacity: 0; transform: translateY(16px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .mf2-reveal.mf2-in-view { opacity: 1; transform: translateY(0); }

        /* how it works — timeline */
        .mf2-timeline { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; }
        .mf2-timeline::before { content: ""; position: absolute; top: 11px; left: 6%; right: 6%; height: 1px; background: var(--line); }
        .mf2-tl-step { padding: 0 18px; position: relative; text-align: left; }
        .mf2-tl-dot { width: 24px; height: 24px; border-radius: 50%; background: var(--surface); border: 1.5px solid var(--sage-deep); color: var(--sage-deep); font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; position: relative; z-index: 1; }
        .mf2-tl-step h3 { font-size: 17.5px; margin-bottom: 8px; }
        .mf2-tl-step p { font-size: 14px; color: var(--ink-soft); line-height: 1.55; }

        /* why — flat list with dividers */
        .mf2-why-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .mf2-why-item { padding: 32px 36px; border-top: 1px solid var(--line); display: flex; gap: 18px; }
        .mf2-why-item:nth-child(-n+2) { border-top: none; }
        .mf2-why-item:nth-child(odd) { border-right: 1px solid var(--line); }
        .mf2-why-icon { font-size: 20px; flex-shrink: 0; width: 40px; height: 40px; border-radius: 12px; background: var(--sage-soft); display: flex; align-items: center; justify-content: center; }
        .mf2-why-item h3 { font-size: 16.5px; margin-bottom: 6px; }
        .mf2-why-item p { font-size: 14px; color: var(--ink-soft); line-height: 1.55; }

        /* pricing */
        .mf2-price-card { background: var(--surface); border: 1px solid var(--line); border-radius: 26px; padding: 48px; display: grid; grid-template-columns: 1fr auto; gap: 36px; align-items: center; box-shadow: 0 16px 45px rgba(30,33,28,0.04); }
        .mf2-price-card h2 { font-size: 28px; margin-bottom: 10px; }
        .mf2-price-list { list-style: none; padding: 0; margin: 16px 0 0; display: flex; flex-direction: column; gap: 10px; }
        .mf2-price-list li { font-size: 14.5px; color: var(--ink-soft); display: flex; align-items: center; gap: 10px; }
        .mf2-price-list li::before { content: "✓"; color: var(--sage-deep); font-weight: 700; }
        .mf2-price-tag { text-align: center; }
        .mf2-price-num { font-family: 'Newsreader', serif; font-size: 48px; font-weight: 500; }
        .mf2-price-note { font-size: 12.5px; color: var(--ink-faint); margin-bottom: 18px; font-weight: 500; }

        /* faq */
        .mf2-faq-item { border: 1px solid var(--line); background: rgba(255,255,255,.68); border-radius: 16px; margin-bottom: 10px; padding: 0 18px; }
        .mf2-faq-item.mf2-open { background: rgba(255,255,255,.94); border-color: rgba(109,92,232,.26); }
        .mf2-faq-q { width: 100%; text-align: left; background: none; border: none; display: flex; justify-content: space-between; align-items: center; padding: 22px 2px; font-size: 16.5px; font-weight: 600; color: var(--ink); cursor: pointer; }
        .mf2-faq-icon { font-size: 20px; font-weight: 400; color: var(--ink-faint); transition: transform 0.3s ease; }
        .mf2-faq-item.mf2-open .mf2-faq-icon { transform: rotate(45deg); }
        .mf2-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; font-size: 14.5px; line-height: 1.6; color: var(--ink-soft); padding: 0 2px; }
        .mf2-faq-item.mf2-open .mf2-faq-a { max-height: 200px; padding: 0 2px 22px; }

        /* modal overlay */
        .mf2-modal-overlay { position: fixed; inset: 0; z-index: 100; background: rgba(30,33,28,0.45); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 20px; }
        .mf2-modal-card { background: var(--surface); border: 1px solid var(--line); border-radius: 24px; padding: 32px; max-width: 580px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative; box-shadow: 0 24px 60px rgba(0,0,0,0.15); }
        .mf2-modal-close { position: absolute; top: 20px; right: 20px; background: none; border: none; font-size: 22px; color: var(--ink-faint); cursor: pointer; }
        .mf2-modal-close:hover { color: var(--ink); }

        /* footer */
        .mf2-footer { padding: 50px 0; border-top: 1px solid var(--line); }
        .mf2-footer-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 18px; }
        .mf2-footer-links { display: flex; gap: 26px; font-size: 14px; color: var(--ink-soft); }
        .mf2-footer-links a:hover { color: var(--ink); }
        .mf2-footer-note { font-size: 12.5px; color: var(--ink-faint); margin-top: 18px; text-align: center; font-weight: 500; }

        @media (max-width: 860px) {
          .mf2-demo-card { grid-template-columns: 1fr; text-align: center; }
          .mf2-orb-col { margin: 0 auto; }
          .mf2-crumbs { justify-content: center; }
          .mf2-start-over { margin-left: 0; }
          .mf2-chip-row { justify-content: center; }
          .mf2-timeline { grid-template-columns: 1fr 1fr; row-gap: 34px; }
          .mf2-timeline::before { display: none; }
          .mf2-why-grid { grid-template-columns: 1fr; }
          .mf2-why-item:nth-child(odd) { border-right: none; }
          .mf2-why-item:nth-child(n+2) { border-top: 1px solid var(--line); }
          .mf2-nav-links { display: none; }
          .mf2-burger { display: block; }
          .mf2-nav-right > .mf2-login, .mf2-nav-right > .mf2-btn { display: none; }
          .mf2-price-card { grid-template-columns: 1fr; text-align: center; }
        }
        @media (max-width: 520px) {
          .mf2-wrap, .mf2-wrap-narrow { padding: 0 18px; }
          .mf2-hero { padding: 58px 0 28px; }
          .mf2-hero h1 { font-size: clamp(38px, 12vw, 52px); }
          .mf2-hero-sub { font-size: 16px; }
          .mf2-trust-line { display: flex; flex-direction: column; gap: 5px; }
          .mf2-trust-line span { display: none; }
          .mf2-demo-card { padding: 30px 20px; border-radius: 24px; gap: 26px; }
          .mf2-chip-row { display: grid; grid-template-columns: 1fr 1fr; }
          .mf2-chip { justify-content: center; padding: 11px 12px; }
          .mf2-timeline { grid-template-columns: 1fr; }
          .mf2-footer-row { flex-direction: column; align-items: flex-start; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mf2-orb-ring, .mf2-reveal { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ---------------- NAV ---------------- */}
      <header className={`mf2-nav ${scrolled ? 'mf2-scrolled' : ''}`}>
        <div className="mf2-wrap mf2-nav-row">
          <a href="#top" className="mf2-brand">
            <span className="mf2-brand-mark" /> MoodFlip
          </a>
          <nav className="mf2-nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#why">Why it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="mf2-nav-right">
            <button className="mf2-login" onClick={() => setShowAuth(true)}>
              Log in
            </button>
            <button
              className="mf2-btn mf2-btn-primary mf2-btn-sm"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Try it free
            </button>
            <button className="mf2-burger" aria-label="Menu" onClick={() => setMenuOpen((v) => !v)}>
              ☰
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mf2-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 16, background: 'var(--surface)', paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#why" onClick={() => setMenuOpen(false)}>Why it works</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
            <button className="mf2-login" style={{ textAlign: 'left' }} onClick={() => { setMenuOpen(false); setShowAuth(true); }}>Log in</button>
          </div>
        )}
      </header>

      {/* ---------------- HERO ---------------- */}
      <section className="mf2-hero" id="top">
        <div className="mf2-wrap-narrow">
          <div className="mf2-eyebrow-line">A free self-reflection utility</div>
          <h1>
            A quiet <em>breath</em> between how you feel and what's next.
          </h1>
          <p className="mf2-hero-sub">
            Tap through three quick choices and get one small, doable action to shift how you feel — in under a minute.
          </p>
          <div className="mf2-hero-cta">
            <button
              className="mf2-btn mf2-btn-primary"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start your flip — free
            </button>
          </div>
          <p className="mf2-trust-line">
            No sign-up<span>·</span>Nothing to type<span>·</span>Auto-deletes in 90 days
          </p>
        </div>
      </section>

      {/* ---------------- DEMO ---------------- */}
      <section className="mf2-demo-section" id="demo">
        <div className="mf2-wrap">
          <div className="mf2-demo-card mf2-reveal">
            <div className="mf2-orb-col">
              <div className="mf2-orb-wrap">
                <div className="mf2-orb-ring" />
                <div className="mf2-orb-core">
                  <span className="mf2-orb-icon">{family ? FAMILY_META[family].icon : '☁️'}</span>
                  <span className="mf2-orb-label">{orbLabel}</span>
                </div>
              </div>
              <span className="mf2-orb-caption">{revealed ? 'Mood cleared' : 'Breathe, then choose'}</span>
            </div>

            <div>
              {/* Sleek Top Header Bar & Breadcrumb Navigation */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                marginBottom: '1.25rem',
                paddingBottom: '0.85rem',
                borderBottom: '1px solid var(--card-border)',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span style={{
                    background: 'linear-gradient(135deg, var(--m3-purple-primary), var(--pink-grad))',
                    color: '#fff',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '999px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)'
                  }}>
                    STEP {currentStep} OF 4
                  </span>

                  {/* Breadcrumb Pills */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {crumbs.length === 0 ? (
                      <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        Select primary mood cloud
                      </span>
                    ) : (
                      crumbs.map((c, i) => (
                        <React.Fragment key={c}>
                          {i > 0 && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>➔</span>}
                          <span style={{
                            background: i === crumbs.length - 1 ? 'rgba(124, 58, 237, 0.12)' : 'var(--tile-bg)',
                            color: i === crumbs.length - 1 ? 'var(--m3-purple-primary)' : 'var(--text-subtle)',
                            border: '1px solid var(--card-border)',
                            padding: '0.2rem 0.65rem',
                            borderRadius: '999px',
                            fontSize: '0.78rem',
                            fontWeight: i === crumbs.length - 1 ? 800 : 600
                          }}>
                            {i === 0 && family ? `${FAMILY_META[family].icon} ` : ''}{c}
                          </span>
                        </React.Fragment>
                      ))
                    )}
                  </div>
                </div>

                {crumbs.length > 0 && (
                  <button
                    onClick={reset}
                    className="mf2-start-over-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.38rem 0.9rem',
                      borderRadius: '999px',
                      border: '1px solid rgba(124, 58, 237, 0.3)',
                      background: 'rgba(124, 58, 237, 0.08)',
                      color: 'var(--m3-purple-primary)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 8px rgba(124, 58, 237, 0.08)'
                    }}
                  >
                    <span>🔄</span> Start Over
                  </button>
                )}
              </div>

              {!family && (
                <>
                  <div style={{ marginBottom: '1.1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem', fontFamily: "'Outfit', sans-serif" }}>
                      Choose your current mood cloud
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>
                      Tap one of the five core feeling families to begin your 60-second shift.
                    </p>
                  </div>
                  <div className="mf2-mood-grid">
                    {FAMILY_ORDER.map((name) => {
                      const meta = FAMILY_META[name];
                      return (
                        <button
                          key={name}
                          onClick={() => pickFamily(name)}
                          className={'mf2-family-card mf2-family-card-' + name}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{
                              fontSize: '1.7rem',
                              width: '42px',
                              height: '42px',
                              borderRadius: '12px',
                              background: 'var(--card-bg-solid)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              {meta.icon}
                            </span>
                            <span style={{
                              width: '9px',
                              height: '9px',
                              borderRadius: '50%',
                              background: meta.dot,
                            }} />
                          </div>
                          <div>
                            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                              {name}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', lineHeight: 1.35, marginTop: '2px' }}>
                              {meta.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {family && !category && (
                <>
                  <span className="mf2-options-label">Select the closer category</span>
                  <div className="mf2-chip-row">
                    {categories.map((name) => (
                      <button key={name} className="mf2-chip" onClick={() => pickCategory(name)}>
                        <span className="mf2-chip-dot" style={{ background: family ? FAMILY_META[family].dot : '#6366f1' }} />
                        {name}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {family && category && !feeling && (
                <>
                  <span className="mf2-options-label">Pick your exact feeling</span>
                  <div className="mf2-chip-row">
                    {feelings.map((name) => (
                      <button key={name} className="mf2-chip" onClick={() => pickFeeling(name)}>
                        <span className="mf2-chip-dot" style={{ background: family ? FAMILY_META[family].dot : '#6366f1' }} />
                        {name}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {result && !revealed && (
                <button className="mf2-flip-btn" onClick={revealFlip} style={{ marginTop: '0.5rem' }}>
                  ✨ Reveal My Mindset Shift →
                </button>
              )}

              {result && revealed && (
                <div className="mf2-result" style={{ marginTop: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{
                      background: 'rgba(239, 108, 168, 0.15)',
                      color: '#ec4899',
                      padding: '0.3rem 0.85rem',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}>
                      From: {feeling}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-subtle)' }}>➔</span>
                    <span style={{
                      background: 'rgba(124, 58, 237, 0.15)',
                      color: 'var(--m3-purple-primary)',
                      padding: '0.3rem 0.85rem',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}>
                      To: {result.target}
                    </span>
                  </div>

                  <div className="mf2-result-mood">{result.target}</div>
                  
                  <div className="mf2-result-action" style={{ position: 'relative' }}>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 500, color: 'var(--text-main)' }}>
                      {result.action}
                    </p>
                  </div>

                  {/* Interactive 60-Second Countdown Timer Widget */}
                  <div style={{
                    marginTop: '1.2rem',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '20px',
                    padding: '1.25rem',
                    boxShadow: 'var(--glass-shadow)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="mf2-mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: timerRunning ? '#22c55e' : '#eab308',
                          boxShadow: timerRunning ? '0 0 10px #22c55e' : 'none'
                        }} />
                        60-Second Action Timer
                      </span>
                      <span className="mf2-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: secondsLeft === 0 ? '#22c55e' : 'var(--m3-purple-primary)' }}>
                        00:{String(secondsLeft).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: 'var(--line)',
                      borderRadius: '999px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${(secondsLeft / 60) * 100}%`,
                        height: '100%',
                        background: secondsLeft === 0 ? '#22c55e' : 'linear-gradient(90deg, var(--m3-purple-primary), var(--pink-grad))',
                        transition: 'width 1s linear'
                      }} />
                    </div>

                    {secondsLeft === 0 ? (
                      <div style={{
                        padding: '0.65rem 1rem',
                        background: 'rgba(34, 197, 94, 0.12)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: '12px',
                        color: '#15803d',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        textAlign: 'center'
                      }}>
                        🎉 Outstanding! You gave yourself 60 seconds of space. How do you feel now?
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                        <button
                          onClick={() => setTimerRunning(!timerRunning)}
                          style={{
                            flex: 1,
                            padding: '0.5rem 0.85rem',
                            borderRadius: '10px',
                            border: '1px solid var(--card-border)',
                            background: timerRunning ? 'rgba(234, 179, 8, 0.15)' : 'rgba(124, 58, 237, 0.15)',
                            color: timerRunning ? '#a16207' : 'var(--m3-purple-primary)',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            cursor: 'pointer'
                          }}
                        >
                          {timerRunning ? '⏸ Pause Timer' : '▶ Resume Timer'}
                        </button>
                        <button
                          onClick={() => { setSecondsLeft(60); setTimerRunning(true); }}
                          style={{
                            padding: '0.5rem 0.85rem',
                            borderRadius: '10px',
                            border: '1px solid var(--card-border)',
                            background: 'var(--tile-bg)',
                            color: 'var(--text-subtle)',
                            fontWeight: 600,
                            fontSize: '0.82rem',
                            cursor: 'pointer'
                          }}
                        >
                          🔄 Restart
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Actions footer bar */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1.25rem' }}>
                    <button
                      onClick={() => {
                        if (result?.action) {
                          navigator.clipboard.writeText(`MoodFlip Shift (${feeling} ➔ ${result.target}): ${result.action}`);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }
                      }}
                      style={{
                        padding: '0.55rem 1rem',
                        borderRadius: '999px',
                        border: '1px solid var(--card-border)',
                        background: 'var(--card-bg)',
                        color: 'var(--text-main)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      {copied ? '✅ Copied!' : '📋 Copy Action'}
                    </button>

                    <button
                      onClick={() => {
                        setSavedShift(true);
                        setTimeout(() => setSavedShift(false), 2500);
                      }}
                      style={{
                        padding: '0.55rem 1rem',
                        borderRadius: '999px',
                        border: '1px solid var(--card-border)',
                        background: 'var(--card-bg)',
                        color: 'var(--text-main)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      {savedShift ? '💖 Saved!' : '💾 Save Shift'}
                    </button>

                    <button
                      onClick={reset}
                      style={{
                        padding: '0.55rem 1rem',
                        borderRadius: '999px',
                        border: '1px solid var(--card-border)',
                        background: 'linear-gradient(135deg, var(--m3-purple-primary), var(--purple-btn-2))',
                        color: '#ffffff',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        marginLeft: 'auto'
                      }}
                    >
                      🔄 Flip Another Mood
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- QUOTE ---------------- */}
      <section className="mf2-quote-section">
        <div className="mf2-wrap-narrow mf2-reveal">
          <p className="mf2-quote">"Feelings move. Give this one somewhere to go."</p>
          <p className="mf2-quote-attr">— the idea behind MoodFlip</p>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="mf2-section" id="how-it-works">
        <div className="mf2-wrap">
          <div className="mf2-section-head mf2-reveal">
            <div className="mf2-eyebrow">How it works</div>
            <h2>Four taps, no typing</h2>
            <p className="mf2-section-sub">Narrow the feeling, then take one manageable next step.</p>
          </div>
          <div className="mf2-timeline mf2-reveal">
            {[
              { n: '1', t: 'Name the cloud', d: 'Pick the broad mood family that matches how you feel.' },
              { n: '2', t: 'Narrow it down', d: 'Choose the closer category from that family.' },
              { n: '3', t: 'Get specific', d: 'Tap the exact feeling that fits this moment.' },
              { n: '4', t: 'Take one step', d: 'Get a target mood and a 60-second action to try.' },
            ].map((s) => (
              <div className="mf2-tl-step" key={s.n}>
                <div className="mf2-tl-dot">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WHY ---------------- */}
      <section className="mf2-section" id="why" style={{ paddingTop: 0 }}>
        <div className="mf2-wrap">
          <div className="mf2-section-head mf2-reveal">
            <div className="mf2-eyebrow">Why it feels manageable</div>
            <h2>Built to reduce friction, not add to it</h2>
          </div>
          <div className="mf2-why-grid mf2-reveal" style={{ border: '1px solid var(--line)', borderRadius: 24, overflow: 'hidden' }}>
            {[
              { icon: '🧠', t: 'A real pause', d: 'One small action creates space between a difficult feeling and what you do next.' },
              { icon: '🫧', t: 'Visual, not verbal', d: 'Every choice is a tap. Nothing to write, explain, or overthink.' },
              { icon: '🌱', t: 'One manageable step', d: 'A 60-second suggestion stays small enough to actually try.' },
              { icon: '🔒', t: 'Private by default', d: 'No profile needed. Anything you save clears automatically after 90 days.' },
            ].map((c) => (
              <div className="mf2-why-item" key={c.t}>
                <div className="mf2-why-icon">{c.icon}</div>
                <div>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PRICING ---------------- */}
      <section className="mf2-section" id="pricing" style={{ paddingTop: 0 }}>
        <div className="mf2-wrap">
          <div className="mf2-price-card mf2-reveal">
            <div>
              <div className="mf2-eyebrow">Optional upgrade</div>
              <h2>The Mindset Plan</h2>
              <p style={{ color: 'var(--ink-soft)', fontSize: 14.5 }}>For when one flip a day isn't enough.</p>
              <ul className="mf2-price-list">
                <li>Full set of 60-second actions, ready to keep</li>
                <li>Deeper prompts for recurring feelings</li>
                <li>One-time payment, yours forever</li>
              </ul>
            </div>
            <div className="mf2-price-tag">
              <div className="mf2-price-num">$7</div>
              <div className="mf2-price-note">one-time · no subscription</div>
              <button className="mf2-btn mf2-btn-primary" onClick={() => setShowPlanModal(true)}>
                Get the plan →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="mf2-section" id="faq" style={{ paddingTop: 0 }}>
        <div className="mf2-wrap-narrow">
          <div className="mf2-section-head mf2-reveal">
            <div className="mf2-eyebrow">Questions</div>
            <h2>Frequently asked</h2>
          </div>
          <div className="mf2-reveal">
            {FAQ_ITEMS.map((item, i) => (
              <div key={item.q} className={`mf2-faq-item ${openFaq === i ? 'mf2-open' : ''}`}>
                <button
                  className="mf2-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                >
                  {item.q} <span className="mf2-faq-icon">+</span>
                </button>
                <div className="mf2-faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="mf2-footer">
        <div className="mf2-wrap">
          <div className="mf2-footer-row">
            <a href="#top" className="mf2-brand">
              <span className="mf2-brand-mark" /> MoodFlip
            </a>
            <div className="mf2-footer-links">
              <a href="/contact">Contact</a>
              <a href="/privacy">Privacy</a>
              <a href="/disclaimer">Disclaimer</a>
            </div>
            <span className="mf2-footer-note" style={{ marginTop: 0 }}>© 2026 MoodFlip</span>
          </div>
          <p className="mf2-footer-note">Self-reflection utility · Not therapy or medical advice.</p>
        </div>
      </footer>

      {/* ---------------- MODALS ---------------- */}
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />

      {showPlanModal && (
        <div className="mf2-modal-overlay" onClick={() => setShowPlanModal(false)}>
          <div className="mf2-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="mf2-modal-close" onClick={() => setShowPlanModal(false)}>
              ✕
            </button>
            <PaidPlansSection />
          </div>
        </div>
      )}
    </div>
  );
}
