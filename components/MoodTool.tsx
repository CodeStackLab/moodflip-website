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

  // Angry feelings
  enraged: HurtIcon,
  annoyed: RejectedIcon,
  frustrated: OverwhelmedIcon,
  resentful: HurtIcon,
  irritated: RejectedIcon,
  betrayed: HurtIcon,
  furious: HurtIcon,
  hostile: HurtIcon,

  // Disgusted feelings
  repulsed: EmptyIcon,
  revolted: EmptyIcon,
  repelled: EmptyIcon,
  disapproved: RejectedIcon,
  awful: AshamedIcon,
  detestable: AshamedIcon,
  hesitant: GuiltyIcon,
  embarrassed: AshamedIcon,
  avoidant: EmptyIcon,

  // Stressed feelings
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

// Google Material 3 Arrow Banner Component with Guided Step Animation
function GoogleArrowBanner({
  number,
  icon,
  text,
  isDone,
  isActive
}: {
  number: string;
  icon: string;
  text: string;
  isDone?: boolean;
  isActive?: boolean;
}) {
  return (
    <div className={`arrow-banner-item arrow-banner-animated ${isActive ? 'step-active-glow' : ''}`} style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.6rem',
      background: isDone
        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(124, 84, 209, 0.12) 100%)'
        : 'linear-gradient(135deg, rgba(124, 84, 209, 0.12) 0%, rgba(231, 124, 116, 0.12) 100%)',
      border: isDone ? '1.5px solid #10b981' : isActive ? '1.5px solid #a855f7' : '1.5px solid var(--card-border)',
      color: 'var(--text-main)',
      padding: '0.65rem 1.6rem 0.65rem 0.75rem',
      borderRadius: '9999px 24px 24px 9999px',
      clipPath: 'polygon(0% 0%, 86% 0%, 100% 50%, 86% 100%, 0% 100%)',
      fontSize: '0.8rem',
      fontWeight: 600,
      boxShadow: isActive ? '0 6px 18px rgba(168, 85, 247, 0.25)' : '0 4px 12px rgba(120, 90, 160, 0.06)',
      position: 'relative',
      minWidth: '200px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: isDone ? '#10b981' : 'var(--tile-bg)',
        color: isDone ? '#ffffff' : '#a855f7',
        border: '1px solid var(--card-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.85rem',
        flexShrink: 0,
        boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
        fontWeight: 800
      }}>
        {isDone ? '✓' : icon}
      </div>
      <span style={{ paddingRight: '0.6rem', lineHeight: 1.25 }}>
        <strong style={{ color: isDone ? '#10b981' : '#a855f7', marginRight: '0.25rem' }}>{number}</strong> {text}
      </span>
    </div>
  );
}

// Google Material 3 Cloud Chip Button
function GoogleCloudButton({
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
        padding: '0.65rem 1.35rem',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '94px',
        height: '48px',
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isSelected ? 'scale(1.06)' : 'scale(1)'
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          filter: isSelected
            ? 'drop-shadow(0 6px 16px rgba(168, 85, 247, 0.35))'
            : 'drop-shadow(0 2px 6px rgba(0,0,0,0.03))',
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
          stroke={isSelected ? '#a855f7' : 'var(--card-border)'}
          strokeWidth={isSelected ? '2.5' : '1.6'}
        />
      </svg>

      <span style={{
        position: 'relative',
        zIndex: 2,
        fontFamily: "'Outfit', 'Inter', sans-serif",
        fontSize: '0.88rem',
        fontWeight: isSelected ? 700 : 600,
        color: isSelected ? '#a855f7' : 'var(--text-main)',
        letterSpacing: '0.01em'
      }}>
        {name}
      </span>
    </button>
  );
}

export default function MoodTool() {
  const [activeFamilyId, setActiveFamilyId] = useState<string>('sad');
  const [selectedFeelingId, setSelectedFeelingId] = useState<string>('lonely');
  const [currentFlip, setCurrentFlip] = useState<{ targetMood: string; actionText: string }>({
    targetMood: 'Peaceful',
    actionText: 'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.'
  });

  const [flipCount, setFlipCount] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [show2ndVisitModal, setShow2ndVisitModal] = useState<boolean>(false);
  const [show7thCheckinOffer, setShow7thCheckinOffer] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);

  const activeFamily = MOOD_DATA.find((f) => f.id === activeFamilyId) || MOOD_DATA[0];
  const currentFeelings = activeFamily.subCategories.flatMap((sub) => sub.feelings);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProfile = localStorage.getItem('moodflip_profile');
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }

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
    if (firstFeeling) {
      setSelectedFeelingId(firstFeeling.id);
    }
  };

  const handleClearSelection = () => {
    setActiveFamilyId('sad');
    setSelectedFeelingId('lonely');
    setCurrentFlip({
      targetMood: 'Peaceful',
      actionText: 'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.'
    });
  };

  const handleFlipMood = async () => {
    setIsFlipping(true);

    const nextCount = flipCount + 1;
    setFlipCount(nextCount);
    if (typeof window !== 'undefined') {
      localStorage.setItem('moodflip_checkin_count', nextCount.toString());
    }

    const newFlip = getActionForFeeling(selectedFeelingId, nextCount);

    setTimeout(() => {
      setCurrentFlip(newFlip);
      setIsFlipping(false);

      if (nextCount >= 7 && !localStorage.getItem('moodflip_7th_offer_shown')) {
        setShow7thCheckinOffer(true);
        localStorage.setItem('moodflip_7th_offer_shown', 'true');
      }
    }, 350);

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
      } catch (e) {
        // Fallback
      }
    }
  };

  const displayFeelings = currentFeelings.slice(0, 8);

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0.5rem 0.5rem',
      fontFamily: "'Outfit', 'Inter', -apple-system, sans-serif"
    }}>

      {/* GOOGLE MATERIAL 3 HERO SECTION */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', marginTop: '0.75rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--tile-selected-bg)',
          border: '1px solid var(--card-border)',
          padding: '0.45rem 1.25rem',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#a855f7',
          marginBottom: '1rem',
          boxShadow: '0 4px 14px rgba(168, 85, 247, 0.12)'
        }}>
          <span>✨ 100% Free Self-Help Utility</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span>Tap-Only</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span>No Sign-Up Required</span>
        </div>

        <h1 style={{
          fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
          fontSize: 'clamp(2.3rem, 5.5vw, 3.9rem)',
          fontWeight: 700,
          margin: '0 auto 0.75rem auto',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          maxWidth: '840px'
        }}>
          <span style={{ color: 'var(--text-main)' }}>Shift Your Mindset in </span>
          <span style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>60 Seconds</span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-subtle)',
          maxWidth: '680px',
          margin: '0 auto 1.5rem auto',
          lineHeight: 1.6,
          fontWeight: 400
        }}>
          Select your current negative mood, discover your positive counterpart, and get 1 practical 60-second action to regain emotional clarity.
        </p>

        {/* GOOGLE MATERIAL FEATURE BADGES */}
        <div className="hero-feature-badges" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.25rem',
          flexWrap: 'wrap',
          fontSize: '0.84rem',
          color: 'var(--text-main)',
          fontWeight: 600
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'var(--tile-bg)', padding: '0.4rem 0.95rem', borderRadius: '9999px', border: '1px solid var(--card-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            ⚡ 280+ 60-Sec Actions
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'var(--tile-bg)', padding: '0.4rem 0.95rem', borderRadius: '9999px', border: '1px solid var(--card-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            🔒 100% Private (90-Day Auto-Purge)
          </span>
          <button onClick={() => setShow7thCheckinOffer(true)} style={{ background: 'var(--tile-selected-bg)', border: '1px solid var(--card-border)', color: '#a855f7', padding: '0.4rem 0.95rem', borderRadius: '9999px', fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            📘 Optional $7 Mindset Plan PDF &rarr;
          </button>
        </div>
      </div>

      {/* MAIN GOOGLE MATERIAL TOOL CANVAS CARD */}
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: '32px',
        border: '1px solid var(--card-border)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'background 0.3s ease, border-color 0.3s ease'
      }}>

        <div className="mood-tool-grid" style={{ minHeight: '620px', position: 'relative' }}>

          {/* LEFT PANEL: MOOD SELECTORS & FEELING TILES GRID */}
          <div className="left-panel-container" style={{
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid var(--card-border)',
            background: 'var(--left-bg)'
          }}>

            {/* 2-COLUMN INNER LAYOUT */}
            <div className="inner-left-layout" style={{ alignItems: 'start' }}>

              {/* COLUMN A: GOOGLE MATERIAL ARROW BANNERS */}
              <div className="arrow-banners-col" style={{ display: 'flex', flexDirection: 'column', gap: '3.6rem', paddingTop: '0.2rem' }}>
                <GoogleArrowBanner number="01" icon="☁️" text="Choose your current mood" isDone={!!activeFamilyId} isActive={!selectedFeelingId} />
                <GoogleArrowBanner number="02" icon="♡" text="Pick the feeling closest to how you feel" isDone={!!selectedFeelingId} isActive={!!selectedFeelingId} />
              </div>

              {/* COLUMN B: CLOUD BUTTONS ROW & PERFECT 4x2 FEELINGS GRID */}
              <div>
                {/* 5 Cloud Family Buttons Row */}
                <div className="cloud-buttons-row" style={{ display: 'flex', gap: '0.35rem', marginBottom: '1.75rem' }}>
                  {MOOD_DATA.map((fam) => {
                    const isSelected = fam.id === activeFamilyId;
                    return (
                      <GoogleCloudButton
                        key={fam.id}
                        name={fam.name.charAt(0) + fam.name.slice(1).toLowerCase()}
                        isSelected={isSelected}
                        onClick={() => handleSelectFamily(fam.id)}
                      />
                    );
                  })}
                </div>

                {/* Perfect 4x2 Grid of 7 Feelings + 1 Clear Selection Tile */}
                <div className="feelings-responsive-grid" style={{ gap: '0.85rem' }}>
                  {displayFeelings.map((feeling) => {
                    const isSelected = feeling.id === selectedFeelingId;
                    const IconComponent = FEELING_ICON_MAP[feeling.id] || LonelyIcon;
                    return (
                      <button
                        key={feeling.id}
                        onClick={() => setSelectedFeelingId(feeling.id)}
                        className="feeling-card-item"
                        style={{
                          background: isSelected ? 'var(--tile-selected-bg)' : 'var(--tile-bg)',
                          border: isSelected ? '2px solid #a855f7' : '1.5px solid var(--card-border)',
                          borderRadius: '18px',
                          padding: '1.1rem 0.5rem 0.85rem 0.5rem',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.65rem',
                          cursor: 'pointer',
                          boxShadow: isSelected ? '0 6px 18px rgba(168, 85, 247, 0.25)' : '0 2px 8px rgba(0,0,0,0.02)',
                          transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                        }}
                      >
                        <div style={{ color: isSelected ? '#a855f7' : 'var(--text-main)' }}>
                          <IconComponent size={34} color={isSelected ? '#a855f7' : 'var(--text-main)'} />
                        </div>
                        <span style={{
                          fontSize: '0.83rem',
                          fontWeight: isSelected ? 700 : 500,
                          color: isSelected ? '#a855f7' : 'var(--text-main)',
                          textTransform: 'capitalize'
                        }}>
                          {feeling.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* STEP 03: FLIP MOOD BUTTON (CLEAN NON-OVERLAPPING PLACEMENT) */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.75rem' }}>
                  <button
                    onClick={handleFlipMood}
                    disabled={isFlipping}
                    className="pulse-button"
                    style={{
                      padding: '1.05rem 2.5rem',
                      borderRadius: '9999px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #7c54d1 0%, #523793 100%)',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(124, 84, 209, 0.4)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      transition: 'all 0.25s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <span>{isFlipping ? 'Flipping...' : 'Change My Mood'}</span>
                    <span style={{ fontSize: '1.35rem' }}>&rarr;</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT PANEL: SUNBURST PASTEL ARTWORK & OUTCOME CARD */}
          <div style={{
            background: 'var(--right-bg)',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>

            {/* SUNBURST RAY ARTWORK OVERLAY */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              opacity: 0.65
            }}>
              <svg width="100%" height="100%" viewBox="0 0 500 500" preserveAspectRatio="none">
                <circle cx="250" cy="190" r="150" fill="#fde68a" opacity="0.25" />
                <path d="M0 320 Q250 250 500 320 L500 500 L0 500 Z" fill="#fef3c7" opacity="0.35" />
                <path d="M0 380 Q250 320 500 380 L500 500 L0 500 Z" fill="#fce7f3" opacity="0.25" />
              </svg>
            </div>

            {/* OUTCOME DISPLAY */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', color: '#d97706', marginBottom: '0.35rem' }}>♡</div>
              <div style={{ fontSize: '0.98rem', color: 'var(--text-subtle)', fontWeight: 500 }}>Your mood has changed to:</div>
              <h2 className="target-mood-animate" key={currentFlip.targetMood} style={{
                fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                fontSize: currentFlip.targetMood.length > 12 ? '2.5rem' : '3.8rem',
                fontWeight: 700,
                color: '#10b981',
                margin: '0.25rem 0 1.75rem 0',
                lineHeight: 1.1,
                whiteSpace: 'nowrap'
              }}>
                {currentFlip.targetMood}
              </h2>

              {/* 60-SECOND ACTION CARD */}
              <div style={{
                background: 'var(--action-card-bg)',
                border: '1.5px solid var(--card-border)',
                borderRadius: '20px',
                padding: '1.5rem',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.1rem',
                textAlign: 'left',
                position: 'relative'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--tile-selected-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MeditateIcon size={36} color="#a855f7" />
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-main)', margin: 0, fontFamily: "'Fraunces', Georgia, serif", lineHeight: 1.3 }}>
                    60-sec action to get to a {currentFlip.targetMood.toLowerCase()} mood
                  </h3>
                  <div style={{ borderTop: '1px solid var(--card-border)', margin: '0.65rem 0', position: 'relative', textAlign: 'center' }}>
                    <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--action-card-bg)', padding: '0 0.4rem', fontSize: '0.7rem', color: '#c8828a' }}>♡</span>
                  </div>
                  <p style={{ fontSize: '0.91rem', color: 'var(--text-subtle)', lineHeight: 1.55, margin: 0, fontWeight: 400 }}>
                    {currentFlip.actionText}
                  </p>
                </div>

                <div style={{ flexShrink: 0, opacity: 0.85 }}>
                  <BotanicalSprig size={40} color="#a855f7" />
                </div>
              </div>

              {/* SAVE MY PROFILE BUTTON (SPEC REQUIREMENT #10) */}
              <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                <button
                  onClick={() => {
                    if (profile?.email) {
                      window.location.href = '/profile';
                    } else {
                      setShowAuthModal(true);
                    }
                  }}
                  style={{
                    padding: '0.75rem 1.6rem',
                    background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                    color: 'white',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(124, 84, 209, 0.3)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase'
                  }}
                >
                  ✨ SAVE MY PROFILE
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM INSPIRATIONAL BANNER */}
        <div style={{
          background: 'var(--banner-bg)',
          borderTop: '1px solid var(--card-border)',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-main)',
          borderRadius: '0 0 32px 32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem', color: '#a855f7' }}>♡</span>
            <div>
              <strong>Small shifts can change how you feel.</strong>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>You've got this.</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem', color: '#a855f7' }}>🍃</span>
            <div>
              <strong>Be kind to yourself.</strong>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>One choice at a time.</div>
            </div>
          </div>
        </div>

      </div>

      {/* 2ND VISIT INVITATION MODAL */}
      {show2ndVisitModal && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: '480px', background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>💫</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.5rem' }}>
                Welcome Back to MoodFlip!
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                You've used MoodFlip multiple times! Create a free profile to save your check-ins and track your positive mindset progress.
              </p>
            </div>

            <div style={{ background: 'var(--tile-selected-bg)', border: '1px solid var(--card-border)', padding: '1rem', borderRadius: '16px', marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.78rem', color: '#a855f7', lineHeight: 1.5, margin: 0, fontWeight: 600 }}>
                "By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history so we can create and offer personalized downloads."
              </p>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', textAlign: 'center', marginBottom: '1.25rem' }}>
              * The free tool always works with <strong>no profile required</strong>.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  setShow2ndVisitModal(false);
                  localStorage.setItem('moodflip_2nd_visit_dismissed', 'true');
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'var(--tile-bg)',
                  color: 'var(--text-subtle)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Continue Free
              </button>

              <button
                onClick={() => {
                  setShow2ndVisitModal(false);
                  setShowAuthModal(true);
                }}
                style={{
                  flex: 1.5,
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(124, 84, 209, 0.3)'
                }}
              >
                Create Profile &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7TH CHECK-IN SALES OFFER MODAL */}
      {show7thCheckinOffer && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: '540px', background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
                🎉 Milestone Unlocked: 7 Check-Ins!
              </span>
              <button
                onClick={() => setShow7thCheckinOffer(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-subtle)' }}
              >
                ✕
              </button>
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.3rem 0' }}>
              Get Your Personal 7-Day Mindset Plan
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', lineHeight: 1.55 }}>
              You've completed 7 mood check-ins! Get your custom-generated 7-Day Mindset PDF report based on your exact check-in history.
            </p>

            <PaidPlansSection />
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

    </div>
  );
}
