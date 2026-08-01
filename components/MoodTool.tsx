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
}

interface FeelingLeaf {
  target: string;
  action: string;
}

type CategoryMap = Record<string, Record<string, FeelingLeaf>>;
type MoodDataShape = Record<FamilyName, CategoryMap>;

const FAMILY_ORDER: FamilyName[] = ['Sad', 'Fearful', 'Angry', 'Disgusted', 'Stressed'];

const FAMILY_META: Record<FamilyName, FamilyMetaEntry> = {
  Sad: { icon: '🌧️', dot: '#7E8FBE' },
  Fearful: { icon: '🌫️', dot: '#9583B8' },
  Angry: { icon: '⛈️', dot: '#C97B72' },
  Disgusted: { icon: '🌪️', dot: '#5C9490' },
  Stressed: { icon: '💨', dot: '#C79A5D' },
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
  const [openFaq, setOpenFaq] = useState<number>(0);

  useEffect(() => {
    if (!revealed) return;
    setSecondsLeft(60);
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [revealed]);

  const categories = family ? Object.keys(MOOD_DATA[family]) : [];
  const feelings = family && category ? Object.keys(MOOD_DATA[family][category]) : [];
  const result = family && category && feeling ? MOOD_DATA[family][category][feeling] : null;

  function pickFamily(name: FamilyName): void { setFamily(name); setCategory(null); setFeeling(null); setRevealed(false); }
  function pickCategory(name: string): void { setCategory(name); setFeeling(null); setRevealed(false); }
  function pickFeeling(name: string): void { setFeeling(name); setRevealed(false); }
  function reset() { setFamily(null); setCategory(null); setFeeling(null); setRevealed(false); }

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
          --paper: #F6F7F2;
          --surface: #FFFFFF;
          --ink: #1E211C;
          --ink-soft: rgba(30,33,28,0.60);
          --ink-faint: rgba(30,33,28,0.38);
          --sage: #56765B;
          --sage-deep: #3E5942;
          --sage-soft: #E3EAE0;
          --gold: #CBA766;
          --line: rgba(30,33,28,0.10);

          font-family: 'Manrope', sans-serif;
          background: var(--paper);
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

        .mf2-wrap { max-width: 1080px; margin: 0 auto; padding: 0 28px; }
        .mf2-wrap-narrow { max-width: 720px; margin: 0 auto; padding: 0 28px; }

        /* ---------------- nav ---------------- */
        .mf2-nav { position: sticky; top: 0; z-index: 50; padding: 22px 0; transition: all 0.35s ease; }
        .mf2-nav.mf2-scrolled { background: rgba(246,247,242,0.92); backdrop-filter: blur(12px); padding: 14px 0; box-shadow: 0 1px 0 var(--line); }
        .mf2-nav-row { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
        .mf2-brand { display: flex; align-items: center; gap: 10px; font-size: 18px; font-weight: 700; letter-spacing: -0.01em; }
        .mf2-brand-mark { width: 26px; height: 26px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, var(--sage), var(--sage-deep)); flex-shrink: 0; }
        .mf2-nav-links { display: flex; align-items: center; gap: 34px; font-size: 14.5px; font-weight: 500; color: var(--ink-soft); }
        .mf2-nav-links a:hover { color: var(--ink); }
        .mf2-nav-right { display: flex; align-items: center; gap: 22px; }
        .mf2-login { font-size: 14px; font-weight: 600; color: var(--ink-soft); text-decoration: underline; text-underline-offset: 3px; background: none; border: none; padding: 0; }
        .mf2-login:hover { color: var(--ink); }
        .mf2-burger { display: none; background: none; border: none; font-size: 22px; color: var(--ink); }

        .mf2-btn { border-radius: 10px; padding: 13px 24px; font-weight: 700; font-size: 14.5px; border: none; transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease; }
        .mf2-btn:hover { transform: translateY(-1px); }
        .mf2-btn-primary { background: var(--sage-deep); color: #fff; box-shadow: 0 8px 20px rgba(62,89,66,0.22); }
        .mf2-btn-primary:hover { background: #334a36; }
        .mf2-btn-sm { padding: 10px 18px; font-size: 13.5px; }

        /* ---------------- hero ---------------- */
        .mf2-hero { padding: 75px 0 40px; text-align: center; position: relative; }
        .mf2-eyebrow-line { font-size: 13px; font-weight: 700; color: var(--sage-deep); letter-spacing: 0.04em; margin-bottom: 22px; text-transform: uppercase; }
        .mf2-hero h1 { font-size: clamp(36px, 5.4vw, 56px); line-height: 1.12; max-width: 16ch; margin: 0 auto 22px; }
        .mf2-hero-sub { font-size: 17.5px; line-height: 1.65; color: var(--ink-soft); max-width: 46ch; margin: 0 auto 30px; }
        .mf2-hero-cta { margin-bottom: 26px; }
        .mf2-trust-line { font-size: 13.5px; color: var(--ink-faint); font-weight: 500; }
        .mf2-trust-line span { margin: 0 10px; opacity: 0.5; }

        /* ---------------- demo section ---------------- */
        .mf2-demo-section { padding: 30px 0 90px; }
        .mf2-demo-card {
          background: var(--surface); border: 1px solid var(--line); border-radius: 28px;
          padding: 46px; display: grid; grid-template-columns: 220px 1fr; gap: 44px; align-items: center;
          box-shadow: 0 24px 60px rgba(30,33,28,0.06);
        }
        .mf2-orb-col { display: flex; flex-direction: column; align-items: center; gap: 18px; }
        .mf2-orb-wrap { position: relative; width: 170px; height: 170px; display: flex; align-items: center; justify-content: center; }
        .mf2-orb-ring { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 34% 30%, var(--sage-soft), rgba(227,234,224,0)); animation: mf2Breathe 5.5s ease-in-out infinite; }
        .mf2-cleared .mf2-orb-ring { background: radial-gradient(circle at 34% 30%, #F1E4C4, rgba(241,228,196,0)); }
        @keyframes mf2Breathe { 0%, 100% { transform: scale(0.92); opacity: 0.75; } 50% { transform: scale(1.08); opacity: 1; } }
        .mf2-orb-core {
          position: relative; width: 128px; height: 128px; border-radius: 50%;
          background: var(--sage-deep); display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: background 0.8s ease; box-shadow: 0 14px 30px rgba(62,89,66,0.25);
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

        .mf2-options-label { font-size: 13.5px; color: var(--ink-soft); margin-bottom: 14px; display: block; font-weight: 600; }
        .mf2-chip-row { display: flex; flex-wrap: wrap; gap: 10px; }
        .mf2-chip {
          border: 1.5px solid var(--line); background: var(--paper); border-radius: 999px;
          padding: 10px 18px 10px 14px; font-size: 14px; font-weight: 600; color: var(--ink);
          display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;
        }
        .mf2-chip:hover { border-color: var(--sage-deep); background: var(--sage-soft); transform: translateY(-1px); }
        .mf2-chip-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

        .mf2-flip-btn { background: var(--sage-deep); color: #fff; border: none; border-radius: 999px; padding: 13px 26px; font-size: 14.5px; font-weight: 700; cursor: pointer; transition: background 0.2s ease, transform 0.15s ease; }
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
        .mf2-faq-item { border-bottom: 1px solid var(--line); }
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
          .mf2-price-card { grid-template-columns: 1fr; text-align: center; }
        }
        @media (max-width: 520px) {
          .mf2-wrap, .mf2-wrap-narrow { padding: 0 18px; }
          .mf2-demo-card { padding: 30px 22px; border-radius: 22px; }
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
              <div className="mf2-crumbs">
                {crumbs.length === 0 && <span>Nothing chosen yet</span>}
                {crumbs.map((c, i) => (
                  <span key={c} style={{ display: 'flex' }}>
                    {i > 0 && <span className="mf2-crumb-sep">/</span>}
                    <span className={i === crumbs.length - 1 ? 'mf2-crumb-current' : ''}>{c}</span>
                  </span>
                ))}
                {crumbs.length > 0 && (
                  <button className="mf2-start-over" onClick={reset}>
                    start over
                  </button>
                )}
              </div>

              {!family && (
                <>
                  <span className="mf2-options-label">Choose your current mood</span>
                  <div className="mf2-chip-row">
                    {FAMILY_ORDER.map((name) => (
                      <button key={name} className="mf2-chip" onClick={() => pickFamily(name)}>
                        <span className="mf2-chip-dot" style={{ background: FAMILY_META[name].dot }} />
                        {name}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {family && !category && (
                <>
                  <span className="mf2-options-label">Choose the closer category</span>
                  <div className="mf2-chip-row">
                    {categories.map((name) => (
                      <button key={name} className="mf2-chip" onClick={() => pickCategory(name)}>
                        <span className="mf2-chip-dot" style={{ background: FAMILY_META[family].dot }} />
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
                        <span className="mf2-chip-dot" style={{ background: FAMILY_META[family].dot }} />
                        {name}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {result && !revealed && (
                <button className="mf2-flip-btn" onClick={() => setRevealed(true)}>
                  Reveal my flip →
                </button>
              )}

              {result && revealed && (
                <div className="mf2-result">
                  <div className="mf2-result-eyebrow">Your mood is flipping to</div>
                  <div className="mf2-result-mood">{result.target}</div>
                  <p className="mf2-result-action">{result.action}</p>
                  <span className="mf2-timer mf2-mono">
                    <span className="mf2-timer-dot" /> 00:{String(secondsLeft).padStart(2, '0')} left
                  </span>
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
