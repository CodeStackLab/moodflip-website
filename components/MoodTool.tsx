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
   ICON MAP — maps feeling IDs to line icon components
   ===================================================================== */
const FEELING_ICON_MAP: Record<string, React.FC<{ size?: number; color?: string }>> = {
  lonely: LonelyIcon,
  isolated: LonelyIcon,
  abandoned: AbandonedIcon,
  rejected: RejectedIcon,
  hurt: HurtIcon,
  disappointed: HurtIcon,
  grief: HurtIcon,
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
   ARROW PILL BANNER — left-pointing right arrow tag shape
   ===================================================================== */
function ArrowPillBanner({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.38rem',
      background: 'linear-gradient(135deg, rgba(124,84,209,0.09) 0%, rgba(231,124,116,0.07) 100%)',
      border: '1.5px solid rgba(124,84,209,0.18)',
      color: 'var(--text-main)',
      padding: '0.42rem 1.15rem 0.42rem 0.55rem',
      /* right-pointing arrow shape */
      clipPath: 'polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%)',
      fontSize: '0.72rem',
      fontWeight: 700,
      width: '148px',
      flexShrink: 0,
      letterSpacing: '0.01em',
      lineHeight: 1.2
    }}>
      <div style={{
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        background: 'var(--tile-bg)',
        color: '#7c54d1',
        border: '1px solid rgba(124,84,209,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.72rem',
        flexShrink: 0,
        fontWeight: 700
      }}>
        {icon}
      </div>
      <span style={{ lineHeight: 1.15, paddingRight: '0.5rem' }}>{text}</span>
    </div>
  );
}

/* =====================================================================
   FAMILY CLOUD BUTTON — organic cloud silhouette
   ===================================================================== */
function FamilyCloudButton({
  name,
  isSelected,
  onClick
}: {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        background: 'transparent',
        border: 'none',
        padding: '0.4rem 0.65rem',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '68px',
        height: '40px',
        flexShrink: 0,
        transition: 'transform 0.2s cubic-bezier(0.16,1,0.3,1)',
        transform: isSelected ? 'scale(1.07)' : 'scale(1)'
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          zIndex: 1,
          filter: isSelected
            ? 'drop-shadow(0 4px 14px rgba(124,84,209,0.38))'
            : 'drop-shadow(0 2px 5px rgba(0,0,0,0.04))',
          transition: 'all 0.25s ease'
        }}
        viewBox="0 0 120 54"
      >
        <path
          d="M 24 48 
             C 12 48, 4 38, 10 26 
             C 4 15, 18 5, 36 11 
             C 46 2, 72 3, 82 13 
             C 96 8, 108 20, 104 33 
             C 114 40, 108 48, 94 48 
             Z"
          fill={isSelected ? 'var(--tile-selected-bg)' : 'var(--tile-bg)'}
          stroke={isSelected ? '#7c54d1' : 'var(--card-border)'}
          strokeWidth={isSelected ? '2.5' : '1.5'}
        />
      </svg>
      <span style={{
        position: 'relative',
        zIndex: 2,
        fontFamily: "'Outfit','Inter',sans-serif",
        fontSize: '0.78rem',
        fontWeight: isSelected ? 700 : 600,
        color: isSelected ? '#7c54d1' : 'var(--text-main)',
        letterSpacing: '0.01em'
      }}>
        {name}
      </span>
    </button>
  );
}

/* =====================================================================
   FLIP BUTTON — pentagon arrow pointing right, bridging left→right panel
   ===================================================================== */
function FlipButton({ onClick, isFlipping }: { onClick: () => void; isFlipping: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={isFlipping}
      id="flip-mood-btn"
      style={{
        background: isFlipping
          ? 'linear-gradient(135deg, #9e82e0 0%, #7059b0 100%)'
          : 'linear-gradient(135deg, #7c54d1 0%, #523793 100%)',
        color: '#ffffff',
        border: 'none',
        padding: '1rem 2.5rem 1rem 1.8rem',
        /* pentagon / arrow shape pointing right */
        clipPath: 'polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%)',
        fontWeight: 800,
        fontSize: '1.05rem',
        cursor: isFlipping ? 'wait' : 'pointer',
        filter: isFlipping
          ? 'drop-shadow(0 6px 14px rgba(82,55,147,0.25))'
          : 'drop-shadow(0 8px 22px rgba(82,55,147,0.5))',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
        transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
        whiteSpace: 'nowrap',
        lineHeight: 1.2,
        fontFamily: "'Outfit','Inter',sans-serif",
        letterSpacing: '0.01em',
        animation: isFlipping ? 'none' : 'btnPulse 2.4s ease-in-out infinite'
      }}
    >
      <span>{isFlipping ? 'Flipping...' : 'Flip My Mood'}</span>
      <span style={{ fontSize: '1.3rem', fontWeight: 400, marginLeft: '0.1rem' }}>→</span>
    </button>
  );
}

/* =====================================================================
   SUNBURST SVG BACKGROUND for right panel
   ===================================================================== */
function SunburstBg() {
  const rays = [0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340];
  return (
    <svg
      style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', pointerEvents:'none' }}
      viewBox="0 0 500 560"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* warm cream base glow */}
      <circle cx="250" cy="185" r="160" fill="#fde68a" opacity="0.18" />
      <circle cx="250" cy="185" r="100" fill="#fef9c3" opacity="0.22" />
      {/* sunrays */}
      {rays.map((deg) => (
        <line
          key={deg}
          x1="250" y1="185"
          x2={250 + 220 * Math.cos((deg - 90) * Math.PI / 180)}
          y2={185 + 220 * Math.sin((deg - 90) * Math.PI / 180)}
          stroke="#fde68a"
          strokeWidth="1.8"
          opacity="0.15"
        />
      ))}
      {/* lower warm wave fills */}
      <path d="M0 360 Q250 295 500 360 L500 560 L0 560 Z" fill="#fef3c7" opacity="0.28" />
      <path d="M0 430 Q250 370 500 430 L500 560 L0 560 Z" fill="#fce7f3" opacity="0.18" />
      {/* tiny bird silhouette */}
      <path d="M395 95 Q408 84 420 95 Q432 84 444 95" stroke="#a855f7" strokeWidth="1.2" fill="none" opacity="0.28" />
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
  const currentFeelings = activeFamily.subCategories.flatMap((sub) => sub.feelings);
  const displayFeelings = currentFeelings.slice(0, 8);

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
    const fam = MOOD_DATA.find((f) => f.id === familyId) || MOOD_DATA[0];
    const firstFeeling = fam.subCategories[0]?.feelings[0];
    if (firstFeeling) setSelectedFeelingId(firstFeeling.id);
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
      console.warn('AI call error, fallback to static:', e);
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
      const existingHistory = JSON.parse(localStorage.getItem('moodflip_checkins') || '[]');
      const newEntry = {
        primaryMood: activeFamily.name,
        subFeeling: selectedFeelingId,
        specificFeeling: selectedFeelingId,
        targetMood: newFlip.targetMood,
        actionShown: newFlip.actionText,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        isAiGenerated: isAi
      };
      localStorage.setItem('moodflip_checkins', JSON.stringify([newEntry, ...existingHistory]));
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
      } catch (e) { /* silent */ }
    }
  };

  return (
    <>
      {/* ── KEYFRAME ANIMATIONS ── */}
      <style>{`
        @keyframes btnPulse {
          0%, 100% { filter: drop-shadow(0 8px 22px rgba(82,55,147,0.5)); transform: scale(1); }
          50%       { filter: drop-shadow(0 12px 30px rgba(82,55,147,0.7)); transform: scale(1.03); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes moodAppear {
          0%   { opacity: 0; transform: scale(0.88) translateY(8px); }
          60%  { opacity: 1; transform: scale(1.04) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .target-mood-animate { animation: moodAppear 0.55s cubic-bezier(0.16,1,0.3,1) both; }
        .feeling-card-item:hover { transform: scale(1.05) !important; box-shadow: 0 8px 22px rgba(124,84,209,0.18) !important; }
        .feeling-card-item:active { transform: scale(0.97) !important; }
        @media (max-width: 768px) {
          .mood-tool-split { grid-template-columns: 1fr !important; }
          .flip-btn-wrapper { position: static !important; transform: none !important; display: flex !important; justify-content: center !important; margin: 1.25rem 0 !important; }
          .left-panel { border-right: none !important; border-bottom: 1px solid var(--card-border) !important; }
        }
      `}</style>

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.5rem 0.5rem',
        fontFamily: "'Outfit','Inter',-apple-system,sans-serif"
      }}>

        {/* ── HERO HEADER ── */}
        <div style={{ textAlign: 'center', marginBottom: '2.1rem', marginTop: '0.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--tile-selected-bg)', border: '1px solid var(--card-border)',
            padding: '0.42rem 1.2rem', borderRadius: '9999px',
            fontSize: '0.78rem', fontWeight: 700, color: '#7c54d1',
            marginBottom: '0.8rem', boxShadow: '0 4px 14px rgba(124,84,209,0.12)'
          }}>
            <span>✨ 100% Free Self-Help Utility</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>Tap-Only</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>No Sign-Up Required</span>
          </div>

          <h1 style={{
            fontFamily: "'Fraunces','Playfair Display',Georgia,serif",
            fontSize: 'clamp(2.2rem, 5.5vw, 3.7rem)',
            fontWeight: 700, margin: '0 auto 0.6rem auto',
            letterSpacing: '-0.02em', lineHeight: 1.1, maxWidth: '840px'
          }}>
            <span style={{ color: 'var(--text-main)' }}>Shift Your Mindset in </span>
            <span style={{
              background: 'linear-gradient(135deg, #7c54d1 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>60 Seconds</span>
          </h1>

          <p style={{
            fontSize: '1rem', color: 'var(--text-subtle)', maxWidth: '660px',
            margin: '0 auto 1.25rem auto', lineHeight: 1.6, fontWeight: 400
          }}>
            Select your current negative mood, discover your positive counterpart, and get 1 practical 60-second action to regain emotional clarity.
          </p>

          <div className="hero-feature-badges" style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            gap: '1rem', flexWrap: 'wrap', fontSize: '0.82rem',
            color: 'var(--text-main)', fontWeight: 600
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'var(--tile-bg)', padding: '0.36rem 0.85rem', borderRadius: '9999px', border: '1px solid var(--card-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              🤖 AI-Powered Fresh Actions
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'var(--tile-bg)', padding: '0.36rem 0.85rem', borderRadius: '9999px', border: '1px solid var(--card-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              🔒 100% Private (90-Day Auto-Purge)
            </span>
            <button onClick={() => setShow7thCheckinOffer(true)} style={{ background: 'var(--tile-selected-bg)', border: '1px solid var(--card-border)', color: '#7c54d1', padding: '0.36rem 0.85rem', borderRadius: '9999px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              📘 Optional $7 Mindset Plan PDF →
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            MAIN TOOL CARD
        ══════════════════════════════════════════ */}
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: '32px',
          border: '1px solid var(--card-border)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          position: 'relative',
          transition: 'background 0.3s ease, border-color 0.3s ease'
        }}>

          {/* ── CARD TOP BRAND TITLE ── */}
          <div style={{ textAlign: 'center', paddingTop: '1.5rem', paddingBottom: '0.4rem' }}>
            <h2 style={{
              fontFamily: "'Fraunces','Playfair Display',Georgia,serif",
              fontSize: '2.75rem', fontWeight: 700,
              letterSpacing: '-0.025em', margin: 0, lineHeight: 1
            }}>
              <span style={{ color: '#4c3c6e' }}>Mood</span>
              <span style={{
                background: 'linear-gradient(135deg, #7c54d1 0%, #e77c74 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>Flip</span>
            </h2>
          </div>

          {/* ══ SPLIT GRID: LEFT / RIGHT ══ */}
          <div
            className="mood-tool-split"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              minHeight: '540px',
              position: 'relative'
            }}
          >

            {/* ━━━━━━━━━━━━━━━━━━━━━━
                LEFT PANEL
            ━━━━━━━━━━━━━━━━━━━━━━ */}
            <div
              className="left-panel"
              style={{
                padding: '1.35rem 1.6rem 2rem 1.6rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.4rem',
                borderRight: '1px solid var(--card-border)',
                background: 'var(--left-bg)',
                position: 'relative'
              }}
            >

              {/* ── ROW 1: cloud family selectors ── */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ArrowPillBanner icon="☁️" text="Choose your current mood" />
                <div style={{
                  display: 'flex', gap: '0.15rem', alignItems: 'center',
                  flexWrap: 'nowrap', overflowX: 'auto', flex: 1
                }}>
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

              {/* ── ROW 2+: feelings grid with banner ── */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <ArrowPillBanner icon="♡" text="Pick the feeling closest to how you feel" />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>

                  {/* 4-column × 2-row grid of 8 feelings */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0.62rem'
                  }}>
                    {displayFeelings.map((feeling, idx) => {
                      const isSelected = feeling.id === selectedFeelingId;
                      const IconComponent = FEELING_ICON_MAP[feeling.id] || LonelyIcon;
                      // Inject the flip button after position 7 (end of row 2) in the grid
                      return (
                        <button
                          key={feeling.id}
                          onClick={() => setSelectedFeelingId(feeling.id)}
                          className="feeling-card-item"
                          style={{
                            background: isSelected ? 'var(--tile-selected-bg)' : 'var(--tile-bg)',
                            border: isSelected ? '2px solid #7c54d1' : '1.5px solid var(--card-border)',
                            borderRadius: '16px',
                            padding: '0.95rem 0.35rem 0.7rem 0.35rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            boxShadow: isSelected ? '0 6px 18px rgba(124,84,209,0.22)' : '0 2px 6px rgba(0,0,0,0.02)',
                            transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{ color: isSelected ? '#7c54d1' : 'var(--text-main)' }}>
                            <IconComponent size={30} color={isSelected ? '#7c54d1' : 'var(--text-main)'} />
                          </div>
                          <span style={{
                            fontSize: '0.77rem',
                            fontWeight: isSelected ? 700 : 500,
                            color: isSelected ? '#7c54d1' : 'var(--text-main)',
                            textTransform: 'capitalize',
                            lineHeight: 1.2
                          }}>
                            {feeling.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Row 3 — clear tile (col 1 only) + flip button occupying right side */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.62rem' }}>
                    {/* Clear selection tile — same width as one column */}
                    <button
                      onClick={handleClearSelection}
                      className="feeling-card-item"
                      style={{
                        width: 'calc(25% - 0.47rem)',
                        flexShrink: 0,
                        background: 'var(--tile-selected-bg)',
                        border: '1.5px dashed #7c54d1',
                        borderRadius: '16px',
                        padding: '0.78rem 0.3rem 0.68rem 0.3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.3rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ color: '#7c54d1' }}>
                        <TrashIcon size={24} color="#7c54d1" />
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7c54d1', lineHeight: 1.1, textAlign: 'center' }}>
                        Clear
                      </span>
                      <span style={{ fontSize: '0.63rem', color: 'var(--text-subtle)', lineHeight: 1 }}>
                        Start over
                      </span>
                    </button>

                    {/* ── FLIP BUTTON: anchored to right edge of left panel ─
                        It overflows rightward into the dividing border,
                        bridging left and right panels visually. ── */}
                    <div
                      className="flip-btn-wrapper"
                      style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        /* push past the panel border — the clip-path point stabs into right panel */
                        marginRight: '-1.6rem',
                        zIndex: 20,
                        position: 'relative'
                      }}
                    >
                      <FlipButton onClick={handleFlipMood} isFlipping={isFlipping} />
                    </div>
                  </div>

                </div>
              </div>

            </div>{/* end LEFT PANEL */}

            {/* ━━━━━━━━━━━━━━━━━━━━━━
                RIGHT PANEL
            ━━━━━━━━━━━━━━━━━━━━━━ */}
            <div style={{
              background: 'var(--right-bg)',
              padding: '2.25rem 2rem 2.25rem 3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>

              {/* sunburst art */}
              <SunburstBg />

              {/* outcome content */}
              <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', color: '#d97706', marginBottom: '0.3rem' }}>♡</div>
                <div style={{ fontSize: '0.94rem', color: 'var(--text-subtle)', fontWeight: 500 }}>
                  Your mood has changed to:
                </div>
                <h2
                  className="target-mood-animate"
                  key={currentFlip.targetMood}
                  style={{
                    fontFamily: "'Fraunces','Playfair Display',Georgia,serif",
                    fontSize: currentFlip.targetMood.length > 12 ? '2.4rem' : '3.6rem',
                    fontWeight: 700,
                    color: '#10b981',
                    margin: '0.2rem 0 1.5rem 0',
                    lineHeight: 1.1,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {currentFlip.targetMood}
                </h2>

                {/* 60-second action card */}
                <div style={{
                  background: 'var(--action-card-bg)',
                  border: '1.5px solid var(--card-border)',
                  borderRadius: '20px',
                  padding: '1.35rem 1.45rem',
                  boxShadow: '0 12px 35px rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  textAlign: 'left',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '56px', height: '56px',
                    borderRadius: '50%',
                    background: 'var(--tile-selected-bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MeditateIcon size={32} color="#7c54d1" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
                      <h3 style={{
                        fontSize: '0.93rem', fontWeight: 700, color: 'var(--text-main)',
                        margin: 0, fontFamily: "'Fraunces',Georgia,serif", lineHeight: 1.3
                      }}>
                        60-sec action to get to a {currentFlip.targetMood.toLowerCase()} mood
                      </h3>
                      {currentFlip.isAiGenerated && (
                        <span style={{
                          fontSize: '0.67rem', fontWeight: 800, color: '#7c54d1',
                          background: 'linear-gradient(135deg, rgba(124,84,209,0.12), rgba(236,72,153,0.12))',
                          border: '1px solid rgba(124,84,209,0.3)',
                          padding: '0.14rem 0.5rem', borderRadius: '9999px', flexShrink: 0
                        }}>
                          ✨ AI Powered
                        </span>
                      )}
                    </div>
                    <div style={{ borderTop: '1px solid var(--card-border)', margin: '0.55rem 0', position: 'relative', textAlign: 'center' }}>
                      <span style={{ position: 'absolute', top: '-9px', left: '50%', transform: 'translateX(-50%)', background: 'var(--action-card-bg)', padding: '0 0.35rem', fontSize: '0.68rem', color: '#c8828a' }}>♡</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', lineHeight: 1.55, margin: 0, fontWeight: 400 }}>
                      {currentFlip.actionText}
                    </p>
                  </div>
                  <div style={{ flexShrink: 0, opacity: 0.82 }}>
                    <BotanicalSprig size={36} color="#7c54d1" />
                  </div>
                </div>

                {/* save profile button */}
                <div style={{ textAlign: 'center', marginTop: '1.2rem' }}>
                  <button
                    onClick={() => {
                      if (profile?.email) { window.location.href = '/profile'; }
                      else { setShowAuthModal(true); }
                    }}
                    style={{
                      padding: '0.72rem 1.55rem',
                      background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                      color: 'white', fontWeight: 800, fontSize: '0.83rem',
                      borderRadius: '9999px', border: 'none', cursor: 'pointer',
                      boxShadow: '0 6px 18px rgba(124,84,209,0.3)',
                      letterSpacing: '0.04em', textTransform: 'uppercase'
                    }}
                  >
                    ✨ SAVE MY PROFILE
                  </button>
                </div>

              </div>
            </div>{/* end RIGHT PANEL */}

          </div>{/* end split grid */}

          {/* ── BOTTOM INSPIRATIONAL BANNER ── */}
          <div style={{
            background: 'var(--banner-bg)',
            borderTop: '1px solid var(--card-border)',
            padding: '0.9rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.9rem',
            fontSize: '0.83rem',
            color: 'var(--text-main)',
            borderRadius: '0 0 32px 32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <span style={{ fontSize: '1.2rem', color: '#7c54d1' }}>♡</span>
              <div>
                <strong>Small shifts can change how you feel.</strong>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-subtle)' }}>You&apos;ve got this.</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <span style={{ fontSize: '1.2rem', color: '#7c54d1' }}>🍃</span>
              <div>
                <strong>Be kind to yourself.</strong>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-subtle)' }}>One choice at a time.</div>
              </div>
            </div>
          </div>

        </div>{/* end main card */}

        {/* ── 2ND VISIT MODAL ── */}
        {show2ndVisitModal && (
          <div className="modal-overlay">
            <div className="modal-card" style={{ maxWidth: '480px', background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2.4rem' }}>💫</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.5rem' }}>
                  Welcome Back to MoodFlip!
                </h3>
                <p style={{ fontSize: '0.87rem', color: 'var(--text-subtle)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                  You&apos;ve used MoodFlip multiple times! Create a free profile to save your check-ins and track your positive mindset progress.
                </p>
              </div>
              <div style={{ background: 'var(--tile-selected-bg)', border: '1px solid var(--card-border)', padding: '1rem', borderRadius: '16px', marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '0.77rem', color: '#7c54d1', lineHeight: 1.5, margin: 0, fontWeight: 600 }}>
                  &ldquo;By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history so we can create and offer personalized downloads.&rdquo;
                </p>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', textAlign: 'center', marginBottom: '1.25rem' }}>
                * The free tool always works with <strong>no profile required</strong>.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => { setShow2ndVisitModal(false); localStorage.setItem('moodflip_2nd_visit_dismissed', 'true'); }}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '12px', border: 'none', background: 'var(--tile-bg)', color: 'var(--text-subtle)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Continue Free
                </button>
                <button
                  onClick={() => { setShow2ndVisitModal(false); setShowAuthModal(true); }}
                  style={{ flex: 1.5, padding: '0.75rem', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #7c54d1, #ec4899)', color: 'white', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 6px 18px rgba(124,84,209,0.3)' }}
                >
                  Create Profile →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── 7TH CHECK-IN OFFER MODAL ── */}
        {show7thCheckinOffer && (
          <div className="modal-overlay">
            <div className="modal-card" style={{ maxWidth: '540px', background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
                  🎉 Milestone Unlocked: 7 Check-Ins!
                </span>
                <button onClick={() => setShow7thCheckinOffer(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-subtle)' }}>✕</button>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.3rem 0' }}>
                Get Your Personal 7-Day Mindset Plan
              </h3>
              <p style={{ fontSize: '0.87rem', color: 'var(--text-subtle)', lineHeight: 1.55 }}>
                You&apos;ve completed 7 mood check-ins! Get your custom-generated 7-Day Mindset PDF report based on your exact check-in history.
              </p>
              <PaidPlansSection />
            </div>
          </div>
        )}

        {/* ── AUTH MODAL ── */}
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      </div>
    </>
  );
}
