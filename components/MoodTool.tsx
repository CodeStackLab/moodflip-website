'use client';

import React, { useState, useEffect } from 'react';
import { MOOD_DATA, getActionForFeeling } from '@/lib/moodData';
import AuthModal from '@/components/AuthModal';
import PaidPlansSection from '@/components/PaidPlansSection';
import {
  LonelyIcon,
  RejectedIcon,
  HurtIcon,
  AshamedIcon,
  GuiltyIcon,
  EmptyIcon,
  OverwhelmedIcon,
  AbandonedIcon,
  TrashIcon,
  MeditateIcon,
  BotanicalSprig
} from '@/components/FeelingIcons';

/* =====================================================================
   ICON MAP
   ===================================================================== */
const FEELING_ICON_MAP: Record<string, React.FC<{ size?: number; color?: string }>> = {
  lonely: LonelyIcon,
  isolated: LonelyIcon,
  abandoned: AbandonedIcon,
  rejected: RejectedIcon,
  hurt: HurtIcon,
  disappointed: HurtIcon,
  grief: HurtIcon,
  grieving: HurtIcon,
  ashamed: AshamedIcon,
  guilty: GuiltyIcon,
  empty: EmptyIcon,
  depressed: EmptyIcon,
  overwhelmed: OverwhelmedIcon,
  anxious: OverwhelmedIcon,
  terrified: AbandonedIcon,
  scared: AbandonedIcon,
  panicked: OverwhelmedIcon,
  insecure: AshamedIcon,
  nervous: OverwhelmedIcon,
  fearful: AbandonedIcon,
  worried: OverwhelmedIcon,
  helpless: AbandonedIcon,
  frozen: EmptyIcon,
  enraged: HurtIcon,
  annoyed: RejectedIcon,
  frustrated: OverwhelmedIcon,
  resentful: HurtIcon,
  irritated: RejectedIcon,
  betrayed: HurtIcon,
  furious: HurtIcon,
  hostile: HurtIcon,
  repulsed: EmptyIcon,
  revolted: EmptyIcon,
  repelled: EmptyIcon,
  disapproved: RejectedIcon,
  awful: AshamedIcon,
  detestable: AshamedIcon,
  hesitant: GuiltyIcon,
  embarrassed: AshamedIcon,
  avoidant: EmptyIcon,
  exhausted: EmptyIcon,
  'burned-out': EmptyIcon,
  burntout: EmptyIcon,
  frazzled: OverwhelmedIcon,
  swamped: OverwhelmedIcon,
  pressured: OverwhelmedIcon,
  rushed: OverwhelmedIcon,
  restless: OverwhelmedIcon,
  overburdened: OverwhelmedIcon
};

/* =====================================================================
   FIXED 8-FEELING GRID PER FAMILY (exact mockup order)
   Row 1: [0][1][2][3]   Row 2: [4][5][6][7]
   ===================================================================== */
const FAMILY_DISPLAY_FEELINGS: Record<string, { id: string; name: string }[]> = {
  sad: [
    { id: 'lonely',      name: 'Lonely' },
    { id: 'rejected',    name: 'Rejected' },
    { id: 'hurt',        name: 'Hurt' },
    { id: 'ashamed',     name: 'Ashamed' },
    { id: 'guilty',      name: 'Guilty' },
    { id: 'empty',       name: 'Empty' },
    { id: 'overwhelmed', name: 'Overwhelmed' },
    { id: 'abandoned',   name: 'Abandoned' },
  ],
  fearful: [
    { id: 'anxious',   name: 'Anxious' },
    { id: 'terrified', name: 'Terrified' },
    { id: 'scared',    name: 'Scared' },
    { id: 'panicked',  name: 'Panicked' },
    { id: 'insecure',  name: 'Insecure' },
    { id: 'nervous',   name: 'Nervous' },
    { id: 'worried',   name: 'Worried' },
    { id: 'helpless',  name: 'Helpless' },
  ],
  angry: [
    { id: 'enraged',   name: 'Enraged' },
    { id: 'furious',   name: 'Furious' },
    { id: 'frustrated',name: 'Frustrated' },
    { id: 'resentful', name: 'Resentful' },
    { id: 'irritated', name: 'Irritated' },
    { id: 'hostile',   name: 'Hostile' },
    { id: 'annoyed',   name: 'Annoyed' },
    { id: 'betrayed',  name: 'Betrayed' },
  ],
  disgusted: [
    { id: 'repulsed',   name: 'Repulsed' },
    { id: 'revolted',   name: 'Revolted' },
    { id: 'repelled',   name: 'Repelled' },
    { id: 'detestable', name: 'Detestable' },
    { id: 'awful',      name: 'Awful' },
    { id: 'embarrassed',name: 'Embarrassed' },
    { id: 'hesitant',   name: 'Hesitant' },
    { id: 'avoidant',   name: 'Avoidant' },
  ],
  stressed: [
    { id: 'overwhelmed',  name: 'Overwhelmed' },
    { id: 'exhausted',    name: 'Exhausted' },
    { id: 'frazzled',     name: 'Frazzled' },
    { id: 'pressured',    name: 'Pressured' },
    { id: 'restless',     name: 'Restless' },
    { id: 'rushed',       name: 'Rushed' },
    { id: 'overburdened', name: 'Overburdened' },
    { id: 'burntout',     name: 'Burnt-Out' },
  ],
};

/* =====================================================================
   ARROW PILL BANNER — pentagon shape pointing right
   ===================================================================== */
function ArrowPillBanner({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.38rem',
      background: 'rgba(232,225,248,0.75)',
      border: '1.5px solid rgba(180,160,230,0.35)',
      color: '#5b4a7a',
      padding: '0.45rem 1.2rem 0.45rem 0.55rem',
      clipPath: 'polygon(0% 0%, 86% 0%, 100% 50%, 86% 100%, 0% 100%)',
      fontSize: '0.71rem',
      fontWeight: 700,
      width: '145px',
      flexShrink: 0,
      letterSpacing: '0.01em',
      lineHeight: 1.25
    }}>
      <div style={{
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.85)',
        color: '#7c54d1',
        border: '1.5px solid rgba(180,160,230,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.7rem',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <span style={{ paddingRight: '0.55rem' }}>{text}</span>
    </div>
  );
}

/* =====================================================================
   CLOUD BUTTON
   ===================================================================== */
function FamilyCloudButton({ name, isSelected, onClick }: { name: string; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        background: 'transparent',
        border: 'none',
        padding: '0.35rem 0.6rem',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '70px',
        height: '44px',
        flexShrink: 0,
        transition: 'transform 0.2s cubic-bezier(0.16,1,0.3,1)',
        transform: isSelected ? 'scale(1.08)' : 'scale(1)'
      }}
    >
      <svg
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1,
          filter: isSelected ? 'drop-shadow(0 4px 14px rgba(124,84,209,0.42))' : 'drop-shadow(0 2px 5px rgba(0,0,0,0.04))',
          transition: 'all 0.25s ease'
        }}
        viewBox="0 0 120 54"
      >
        <path
          d="M 24 48 C 12 48, 4 38, 10 26 C 4 15, 18 5, 36 11 C 46 2, 72 3, 82 13 C 96 8, 108 20, 104 33 C 114 40, 108 48, 94 48 Z"
          fill={isSelected ? '#ede5fa' : '#ffffff'}
          stroke={isSelected ? '#7c54d1' : '#ddd6f0'}
          strokeWidth={isSelected ? '2.5' : '1.5'}
        />
      </svg>
      <span style={{
        position: 'relative', zIndex: 2,
        fontFamily: "'Outfit','Inter',sans-serif",
        fontSize: '0.8rem',
        fontWeight: isSelected ? 700 : 600,
        color: isSelected ? '#7c54d1' : '#5b4a7a',
      }}>
        {name}
      </span>
    </button>
  );
}

/* =====================================================================
   LANDSCAPE SVG — right panel background art (sun + rolling hills)
   ===================================================================== */
function LandscapeArt() {
  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 600 560"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* warm gradient sky wash */}
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="38%" r="52%">
          <stop offset="0%"   stopColor="#fff4d6" stopOpacity="0.95" />
          <stop offset="55%"  stopColor="#ffe8b0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fde8d0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sunCircle" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#fff3d0" stopOpacity="1" />
          <stop offset="100%" stopColor="#fcd98a" stopOpacity="0.7" />
        </radialGradient>
      </defs>

      {/* Sky glow behind sun */}
      <ellipse cx="300" cy="215" rx="260" ry="195" fill="url(#sunGlow)" />

      {/* Sun rays — thin lines radiating out */}
      {[0,18,36,54,72,90,108,126,144,162,180,198,216,234,252,270,288,306,324,342].map((deg, i) => (
        <line
          key={i}
          x1="300" y1="215"
          x2={300 + 195 * Math.cos((deg - 90) * Math.PI / 180)}
          y2={215 + 195 * Math.sin((deg - 90) * Math.PI / 180)}
          stroke="#f5d87a"
          strokeWidth="1.4"
          opacity="0.22"
        />
      ))}

      {/* Sun circle */}
      <circle cx="300" cy="215" r="72" fill="url(#sunCircle)" opacity="0.88" />
      <circle cx="300" cy="215" r="55" fill="#fff8e8" opacity="0.65" />

      {/* Far hill — light lavender */}
      <path
        d="M -20 420 Q 100 290 200 340 Q 290 380 380 300 Q 460 235 560 310 L 620 420 Z"
        fill="#e8e0f5"
        opacity="0.55"
      />
      {/* Mid hill — soft mauve/pink */}
      <path
        d="M -20 480 Q 80 370 180 400 Q 280 430 370 370 Q 450 320 560 390 L 620 500 Z"
        fill="#e8d5e8"
        opacity="0.6"
      />
      {/* Foreground hill — warm cream */}
      <path
        d="M -20 540 Q 120 430 240 460 Q 340 490 450 440 Q 520 410 620 470 L 620 600 L -20 600 Z"
        fill="#f5ede8"
        opacity="0.75"
      />

      {/* Tiny sparkles / stars */}
      <text x="400" y="105" fontSize="12" fill="#c8a0e8" opacity="0.5" textAnchor="middle">✦</text>
      <text x="460" y="145" fontSize="8"  fill="#e8c878" opacity="0.4" textAnchor="middle">✦</text>
      <text x="158" y="128" fontSize="9"  fill="#c8a0e8" opacity="0.38" textAnchor="middle">✦</text>
      <text x="520" y="80"  fontSize="7"  fill="#e8a8c0" opacity="0.35" textAnchor="middle">✦</text>

      {/* Bird silhouette */}
      <path d="M 488 118 Q 498 108 508 118 Q 518 108 528 118" stroke="#b090d8" strokeWidth="1.4" fill="none" opacity="0.4" />
    </svg>
  );
}

/* =====================================================================
   MAIN MOOD TOOL COMPONENT
   ===================================================================== */
export default function MoodTool() {
  const [activeFamilyId, setActiveFamilyId] = useState<string>('sad');
  const [selectedFeelingId, setSelectedFeelingId] = useState<string>('lonely');
  const [currentFlip, setCurrentFlip] = useState<{ targetMood: string; actionText: string; isAiGenerated?: boolean }>({
    targetMood: 'Peaceful',
    actionText: 'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.',
    isAiGenerated: false
  });
  const [flipCount, setFlipCount] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [show2ndVisitModal, setShow2ndVisitModal] = useState<boolean>(false);
  const [show7thCheckinOffer, setShow7thCheckinOffer] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);

  const activeFamily = MOOD_DATA.find((f) => f.id === activeFamilyId) || MOOD_DATA[0];
  // Use the fixed display feelings map — 8 feelings in exact mockup order
  const displayFeelings = FAMILY_DISPLAY_FEELINGS[activeFamilyId] || FAMILY_DISPLAY_FEELINGS['sad'];
  // Row 1: indices 0-3, Row 2: indices 4-7
  const row1 = displayFeelings.slice(0, 4);
  const row2 = displayFeelings.slice(4, 8);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProfile = localStorage.getItem('moodflip_profile');
      if (storedProfile) setProfile(JSON.parse(storedProfile));
      const visits = parseInt(localStorage.getItem('moodflip_visit_count') || '0', 10) + 1;
      localStorage.setItem('moodflip_visit_count', visits.toString());
      if (visits === 2 && !storedProfile && !localStorage.getItem('moodflip_2nd_visit_dismissed')) {
        setShow2ndVisitModal(true);
      }
      const checkins = parseInt(localStorage.getItem('moodflip_checkin_count') || '0', 10);
      setFlipCount(checkins);
    }
  }, []);

  const handleSelectFamily = (familyId: string) => {
    setActiveFamilyId(familyId);
    const feelings = FAMILY_DISPLAY_FEELINGS[familyId] || FAMILY_DISPLAY_FEELINGS['sad'];
    if (feelings[0]) setSelectedFeelingId(feelings[0].id);
  };

  const handleClearSelection = () => {
    setActiveFamilyId('sad');
    setSelectedFeelingId('lonely');
    setCurrentFlip({
      targetMood: 'Peaceful',
      actionText: 'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.',
      isAiGenerated: false
    });
  };

  const handleFlipMood = async () => {
    setIsFlipping(true);
    const nextCount = flipCount + 1;
    setFlipCount(nextCount);
    if (typeof window !== 'undefined') {
      localStorage.setItem('moodflip_checkin_count', nextCount.toString());
    }
    let newFlip = getActionForFeeling(selectedFeelingId, nextCount);
    let isAi = false;
    try {
      const aiRes = await fetch('/api/ai/flip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          primaryMood: activeFamily.name,
          subFeeling: selectedFeelingId,
          specificFeeling: selectedFeelingId,
          visitCount: nextCount
        })
      });
      if (aiRes.ok) {
        const aiData = await aiRes.json();
        if (aiData.targetMood && aiData.actionText) {
          newFlip = { targetMood: aiData.targetMood, actionText: aiData.actionText };
          isAi = !!aiData.isAiGenerated;
        }
      }
    } catch (e) {
      console.warn('AI fallback:', e);
    }
    const finalFlip = { ...newFlip, isAiGenerated: isAi };
    setTimeout(() => {
      setCurrentFlip(finalFlip);
      setIsFlipping(false);
      if (nextCount >= 7 && typeof window !== 'undefined' && !localStorage.getItem('moodflip_7th_offer_shown')) {
        setShow7thCheckinOffer(true);
        localStorage.setItem('moodflip_7th_offer_shown', 'true');
      }
    }, 350);
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('moodflip_checkins') || '[]');
      localStorage.setItem('moodflip_checkins', JSON.stringify([{
        primaryMood: activeFamily.name,
        subFeeling: selectedFeelingId,
        specificFeeling: selectedFeelingId,
        targetMood: newFlip.targetMood,
        actionShown: newFlip.actionText,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        isAiGenerated: isAi
      }, ...existing]));
    }
    if (profile?.email) {
      try {
        await fetch('/api/checkins', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: profile.email,
            primaryMood: activeFamily.name,
            subFeeling: selectedFeelingId,
            specificFeeling: selectedFeelingId,
            targetMood: newFlip.targetMood,
            actionShown: newFlip.actionText
          })
        });
      } catch (_) { /* silent */ }
    }
  };

  const FeelingTile = ({ feeling, isRow2 }: { feeling: { id: string; name: string }; isRow2?: boolean }) => {
    const isSelected = feeling.id === selectedFeelingId;
    const IconComp = FEELING_ICON_MAP[feeling.id] || LonelyIcon;
    return (
      <button
        onClick={() => setSelectedFeelingId(feeling.id)}
        className="feeling-card-item"
        style={{
          background: isSelected ? '#ede5fa' : '#ffffff',
          border: isSelected ? '2px solid #7c54d1' : '1.5px solid #e2d9f3',
          borderRadius: '18px',
          padding: '1rem 0.3rem 0.75rem 0.3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          boxShadow: isSelected ? '0 4px 18px rgba(124,84,209,0.22)' : '0 2px 6px rgba(0,0,0,0.03)',
          transform: isSelected ? 'scale(1.035)' : 'scale(1)',
          transition: 'all 0.18s ease',
          flex: 1,
          minWidth: 0
        }}
      >
        <IconComp size={30} color={isSelected ? '#7c54d1' : '#8a7aaa'} />
        <span style={{
          fontSize: '0.77rem',
          fontWeight: isSelected ? 700 : 500,
          color: isSelected ? '#7c54d1' : '#5b4a7a',
          textTransform: 'capitalize',
          lineHeight: 1.15,
          textAlign: 'center'
        }}>
          {feeling.name}
        </span>
      </button>
    );
  };

  return (
    <>
      <style>{`
        @keyframes moodAppear {
          0%   { opacity:0; transform:scale(0.85) translateY(10px); }
          65%  { opacity:1; transform:scale(1.04) translateY(-2px); }
          100% { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes btnPulse {
          0%,100% { filter:drop-shadow(0 6px 20px rgba(82,55,147,0.48)); }
          50%      { filter:drop-shadow(0 10px 28px rgba(82,55,147,0.7)); transform:scale(1.025); }
        }
        .target-mood-animate { animation: moodAppear 0.52s cubic-bezier(0.16,1,0.3,1) both; }
        .flip-arrow-btn { animation: btnPulse 2.5s ease-in-out infinite; }
        .flip-arrow-btn:hover { filter:drop-shadow(0 12px 28px rgba(82,55,147,0.72)) !important; transform:scale(1.04) !important; }
        .flip-arrow-btn:active { transform:scale(0.97) !important; }
        .feeling-card-item:hover { transform:scale(1.05) !important; box-shadow:0 6px 20px rgba(124,84,209,0.2) !important; }
        .feeling-card-item:active { transform:scale(0.97) !important; }
        @media (max-width:768px) {
          .moodtool-split { flex-direction:column !important; }
          .moodtool-left  { border-right:none !important; border-bottom:1px solid #e2d9f3 !important; }
          .row2-with-btn  { flex-wrap:wrap !important; }
          .flip-btn-cell  { width:100% !important; margin-right:0 !important; justify-content:center !important; margin-top:0.5rem; }
        }
      `}</style>

      {/* ══════════════════════════════════════
          HERO ABOVE CARD
      ══════════════════════════════════════ */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '0.5rem 0.75rem',
        fontFamily: "'Outfit','Inter',-apple-system,sans-serif"
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.85rem', marginTop: '0.4rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: '#ede5fa', border: '1px solid #d6c8f5',
            padding: '0.4rem 1.15rem', borderRadius: '9999px',
            fontSize: '0.78rem', fontWeight: 700, color: '#7c54d1',
            marginBottom: '0.75rem', boxShadow: '0 4px 14px rgba(124,84,209,0.1)'
          }}>
            <span>✨ 100% Free Self-Help Utility</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>Tap-Only</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>No Sign-Up Required</span>
          </div>
          <h1 style={{
            fontFamily: "'Fraunces','Playfair Display',Georgia,serif",
            fontSize: 'clamp(2.1rem, 5vw, 3.6rem)',
            fontWeight: 700, margin: '0 auto 0.55rem auto',
            letterSpacing: '-0.02em', lineHeight: 1.08, maxWidth: '820px'
          }}>
            <span style={{ color: '#362854' }}>Shift Your Mindset in </span>
            <span style={{
              background: 'linear-gradient(135deg, #7c54d1 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>60 Seconds</span>
          </h1>
          <p style={{
            fontSize: '0.98rem', color: '#665c7d', maxWidth: '640px',
            margin: '0 auto 1.1rem auto', lineHeight: 1.6, fontWeight: 400
          }}>
            Select your current negative mood, discover your positive counterpart, and get 1 practical 60-second action to regain emotional clarity.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap', fontSize: '0.81rem', color: '#362854', fontWeight: 600 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#fff', padding: '0.34rem 0.82rem', borderRadius: '9999px', border: '1px solid #efe6dc', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>🤖 AI-Powered Fresh Actions</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#fff', padding: '0.34rem 0.82rem', borderRadius: '9999px', border: '1px solid #efe6dc', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>🔒 100% Private (90-Day Auto-Purge)</span>
            <button onClick={() => setShow7thCheckinOffer(true)} style={{ background: '#ede5fa', border: '1px solid #d6c8f5', color: '#7c54d1', padding: '0.34rem 0.82rem', borderRadius: '9999px', fontWeight: 700, fontSize: '0.81rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              📘 Optional $7 Mindset Plan PDF →
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════
            MAIN TOOL CARD
        ══════════════════════════════════════ */}
        <div style={{
          background: '#faf7fd',
          borderRadius: '28px',
          border: '1px solid #e2d9f3',
          boxShadow: '0 16px 55px rgba(76,60,110,0.1)',
          overflow: 'visible',
          position: 'relative'
        }}>

          {/* Title: MoodFlip */}
          <div style={{ textAlign: 'center', paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
            <h2 style={{
              fontFamily: "'Fraunces','Playfair Display',Georgia,serif",
              fontSize: 'clamp(2.2rem,4vw,3rem)',
              fontWeight: 700, letterSpacing: '-0.02em', margin: 0, lineHeight: 1
            }}>
              {/* "Mood" = gradient purple→teal like mockup */}
              <span style={{
                background: 'linear-gradient(90deg, #7c54d1 0%, #5b9bd5 50%, #7c54d1 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>Mood</span>
              {/* "Flip" = coral/orange gradient */}
              <span style={{
                background: 'linear-gradient(135deg, #e87d5c 0%, #d4a855 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>Flip</span>
            </h2>
          </div>

          {/* Split: left + right — using flex so the button can hang over border */}
          <div
            className="moodtool-split"
            style={{
              display: 'flex',
              minHeight: '490px',
              borderRadius: '0 0 28px 28px',
              overflow: 'hidden'
            }}
          >

            {/* ━━━━━━━━━━━━━━━━━━━━━━
                LEFT PANEL
            ━━━━━━━━━━━━━━━━━━━━━━ */}
            <div
              className="moodtool-left"
              style={{
                flex: '0 0 52%',
                padding: '1.25rem 1.5rem 1.75rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                borderRight: '1px solid #e2d9f3',
                background: 'linear-gradient(170deg,#fdfaff 0%,#f5f0fc 100%)',
                position: 'relative',
                overflow: 'visible'
              }}
            >

              {/* ── ROW 1: Choose mood — banner + 5 clouds ── */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowPillBanner icon="☁️" text="Choose your current mood" />
                <div style={{ display: 'flex', gap: '0.1rem', alignItems: 'center', flexWrap: 'nowrap', overflowX: 'auto', flex: 1 }}>
                  {MOOD_DATA.map((fam) => (
                    <FamilyCloudButton
                      key={fam.id}
                      name={fam.name.charAt(0) + fam.name.slice(1).toLowerCase()}
                      isSelected={fam.id === activeFamilyId}
                      onClick={() => handleSelectFamily(fam.id)}
                    />
                  ))}
                </div>
              </div>

              {/* ── ROWS 2+3: Pick feeling — banner + grid ── */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <ArrowPillBanner icon="♡" text="Pick the feeling closest to how you feel" />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem', minWidth: 0 }}>

                  {/* Grid Row 1 — 4 tiles */}
                  <div style={{ display: 'flex', gap: '0.55rem' }}>
                    {row1.map((f) => <FeelingTile key={f.id} feeling={f} />)}
                  </div>

                  {/* Grid Row 2 — 4 tiles + Flip Button bleeding into right panel */}
                  <div
                    className="row2-with-btn"
                    style={{ display: 'flex', gap: '0.55rem', alignItems: 'stretch', overflow: 'visible' }}
                  >
                    {row2.map((f) => <FeelingTile key={f.id} feeling={f} isRow2 />)}

                    {/* Flip button cell — overflows right past border */}
                    <div
                      className="flip-btn-cell"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '-1.5rem',   /* bleeds into right panel */
                        flexShrink: 0,
                        zIndex: 20
                      }}
                    >
                      <button
                        id="flip-mood-btn"
                        onClick={handleFlipMood}
                        disabled={isFlipping}
                        className="flip-arrow-btn"
                        style={{
                          background: isFlipping
                            ? 'linear-gradient(135deg,#9e82e0,#7059b0)'
                            : 'linear-gradient(135deg,#7c54d1 0%,#523793 100%)',
                          color: '#fff',
                          border: 'none',
                          /* pentagon arrow pointing right */
                          clipPath: 'polygon(0% 0%, 78% 0%, 100% 50%, 78% 100%, 0% 100%)',
                          padding: '1.05rem 2.6rem 1.05rem 1.6rem',
                          fontWeight: 800,
                          fontSize: '1rem',
                          cursor: isFlipping ? 'wait' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          whiteSpace: 'nowrap',
                          lineHeight: 1.2,
                          fontFamily: "'Outfit','Inter',sans-serif",
                          transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)'
                        }}
                      >
                        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <span>{isFlipping ? 'Flipping...' : 'Change'}</span>
                          <span>{isFlipping ? '' : 'My Mood'}</span>
                        </span>
                        <span style={{ fontSize: '1.3rem', fontWeight: 400 }}>→</span>
                      </button>
                    </div>
                  </div>

                  {/* Row 3 — Clear tile (col 1 only) */}
                  <div style={{ display: 'flex' }}>
                    <button
                      onClick={handleClearSelection}
                      className="feeling-card-item"
                      style={{
                        flex: '0 0 calc(25% - 0.42rem)',
                        background: '#ede5fa',
                        border: '1.5px dashed #9b7de0',
                        borderRadius: '18px',
                        padding: '0.8rem 0.3rem 0.7rem 0.3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.28rem',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      <TrashIcon size={22} color="#7c54d1" />
                      <span style={{ fontSize: '0.73rem', fontWeight: 700, color: '#7c54d1', lineHeight: 1.1, textAlign: 'center' }}>Clear selection</span>
                      <span style={{ fontSize: '0.63rem', color: '#9b7de0' }}>Start over</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>{/* end LEFT */}

            {/* ━━━━━━━━━━━━━━━━━━━━━━
                RIGHT PANEL
            ━━━━━━━━━━━━━━━━━━━━━━ */}
            <div style={{
              flex: 1,
              background: 'linear-gradient(160deg,#fffcf5 0%,#fff8e8 35%,#faf0f5 100%)',
              padding: '2rem 1.75rem 2rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>

              {/* Landscape art background */}
              <LandscapeArt />

              {/* Outcome content */}
              <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', color: '#c8828a', marginBottom: '0.25rem' }}>♡</div>
                <div style={{ fontSize: '0.92rem', color: '#8a7aaa', fontWeight: 500 }}>
                  Your mood has changed to:
                </div>
                <h2
                  className="target-mood-animate"
                  key={currentFlip.targetMood}
                  style={{
                    fontFamily: "'Fraunces','Playfair Display',Georgia,serif",
                    fontSize: currentFlip.targetMood.length > 11 ? '2.3rem' : '3.4rem',
                    fontWeight: 700,
                    color: '#5a8a5a',
                    margin: '0.15rem 0 1.35rem 0',
                    lineHeight: 1.08,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {currentFlip.targetMood}
                </h2>

                {/* Action card */}
                <div style={{
                  background: 'rgba(255,255,255,0.9)',
                  border: '1.5px solid #e8dff5',
                  borderRadius: '20px',
                  padding: '1.25rem 1.35rem',
                  boxShadow: '0 8px 30px rgba(76,60,110,0.08)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.9rem',
                  textAlign: 'left'
                }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '50%',
                    background: '#f0e8f9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MeditateIcon size={30} color="#7c54d1" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.4rem' }}>
                      <h3 style={{
                        fontSize: '0.92rem', fontWeight: 700, color: '#362854',
                        margin: 0, fontFamily: "'Fraunces',Georgia,serif", lineHeight: 1.35
                      }}>
                        60-sec action to get to a {currentFlip.targetMood.toLowerCase()} mood
                      </h3>
                      {currentFlip.isAiGenerated && (
                        <span style={{
                          fontSize: '0.65rem', fontWeight: 800, color: '#7c54d1',
                          background: 'linear-gradient(135deg,rgba(124,84,209,0.12),rgba(236,72,153,0.12))',
                          border: '1px solid rgba(124,84,209,0.28)',
                          padding: '0.13rem 0.48rem', borderRadius: '9999px', flexShrink: 0
                        }}>✨ AI</span>
                      )}
                    </div>
                    <div style={{ borderTop: '1px solid #e8dff5', margin: '0.5rem 0', position: 'relative', textAlign: 'center' }}>
                      <span style={{ position: 'absolute', top: '-9px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.9)', padding: '0 0.32rem', fontSize: '0.66rem', color: '#c8828a' }}>♡</span>
                    </div>
                    <p style={{ fontSize: '0.87rem', color: '#665c7d', lineHeight: 1.58, margin: 0, fontWeight: 400 }}>
                      {currentFlip.actionText}
                    </p>
                  </div>
                  <div style={{ flexShrink: 0, opacity: 0.78, alignSelf: 'center' }}>
                    <BotanicalSprig size={34} color="#7c54d1" />
                  </div>
                </div>

                {/* Save profile */}
                <div style={{ textAlign: 'center', marginTop: '1.1rem' }}>
                  <button
                    onClick={() => { if (profile?.email) { window.location.href = '/profile'; } else { setShowAuthModal(true); } }}
                    style={{
                      padding: '0.68rem 1.5rem',
                      background: 'linear-gradient(135deg,#7c54d1,#ec4899)',
                      color: 'white', fontWeight: 800, fontSize: '0.82rem',
                      borderRadius: '9999px', border: 'none', cursor: 'pointer',
                      boxShadow: '0 6px 18px rgba(124,84,209,0.3)',
                      letterSpacing: '0.04em', textTransform: 'uppercase'
                    }}
                  >
                    ✨ SAVE MY PROFILE
                  </button>
                </div>
              </div>

            </div>{/* end RIGHT */}

          </div>{/* end flex split */}

          {/* Bottom banner */}
          <div style={{
            background: 'rgba(232,225,248,0.5)',
            borderTop: '1px solid #e2d9f3',
            padding: '0.85rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.8rem',
            fontSize: '0.82rem',
            color: '#362854'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '1.1rem', color: '#7c54d1' }}>♡</span>
              <div>
                <strong>Small shifts can change how you feel.</strong>
                <div style={{ fontSize: '0.75rem', color: '#665c7d' }}>You&apos;ve got this.</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '1.1rem', color: '#7c54d1' }}>🍃</span>
              <div>
                <strong>Be kind to yourself.</strong>
                <div style={{ fontSize: '0.75rem', color: '#665c7d' }}>One choice at a time.</div>
              </div>
            </div>
          </div>

        </div>{/* end card */}
      </div>{/* end wrapper */}

      {/* ── MODALS ── */}
      {show2ndVisitModal && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: '480px', background: '#fff', border: '1px solid #e2d9f3' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.4rem' }}>💫</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#362854', marginTop: '0.5rem' }}>Welcome Back to MoodFlip!</h3>
              <p style={{ fontSize: '0.87rem', color: '#665c7d', marginTop: '0.35rem', lineHeight: 1.5 }}>
                You&apos;ve used MoodFlip multiple times! Create a free profile to save your check-ins and track your positive mindset progress.
              </p>
            </div>
            <div style={{ background: '#ede5fa', border: '1px solid #d6c8f5', padding: '1rem', borderRadius: '16px', marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.77rem', color: '#7c54d1', lineHeight: 1.5, margin: 0, fontWeight: 600 }}>
                &ldquo;By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history so we can create and offer personalized downloads.&rdquo;
              </p>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#665c7d', textAlign: 'center', marginBottom: '1.25rem' }}>
              * The free tool always works with <strong>no profile required</strong>.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => { setShow2ndVisitModal(false); localStorage.setItem('moodflip_2nd_visit_dismissed','true'); }}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '12px', border: 'none', background: '#f5f0fc', color: '#665c7d', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                Continue Free
              </button>
              <button onClick={() => { setShow2ndVisitModal(false); setShowAuthModal(true); }}
                style={{ flex: 1.5, padding: '0.75rem', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#7c54d1,#ec4899)', color: 'white', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 6px 18px rgba(124,84,209,0.3)' }}>
                Create Profile →
              </button>
            </div>
          </div>
        </div>
      )}

      {show7thCheckinOffer && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: '540px', background: '#fff', border: '1px solid #e2d9f3' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
                🎉 Milestone Unlocked: 7 Check-Ins!
              </span>
              <button onClick={() => setShow7thCheckinOffer(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#665c7d' }}>✕</button>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#362854', margin: '0.3rem 0' }}>Get Your Personal 7-Day Mindset Plan</h3>
            <p style={{ fontSize: '0.87rem', color: '#665c7d', lineHeight: 1.55 }}>
              You&apos;ve completed 7 mood check-ins! Get your custom-generated 7-Day Mindset PDF report based on your exact check-in history.
            </p>
            <PaidPlansSection />
          </div>
        </div>
      )}

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
