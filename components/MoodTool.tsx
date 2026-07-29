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
  MeditateIcon,
  BotanicalSprig
} from '@/components/FeelingIcons';

/* =====================================================================
   ICON MAP — maps feeling / sub-category IDs to icon components
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
   FAMILY CLOUD BUTTON
   Renders the 5 main mood family options as cloud-shaped SVG buttons
   ===================================================================== */
function FamilyCloudButton({
  name,
  color,
  isSelected,
  onClick
}: {
  name: string;
  color: string;
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
        padding: '0.5rem 0.85rem',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '88px',
        height: '52px',
        transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isSelected ? 'scale(1.08)' : 'scale(1)'
      }}
    >
      {/* Cloud SVG shape */}
      <svg
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          zIndex: 1,
          filter: isSelected
            ? `drop-shadow(0 6px 16px ${color}55)`
            : 'drop-shadow(0 2px 6px rgba(0,0,0,0.05))',
          transition: 'all 0.25s ease'
        }}
        viewBox="0 0 120 54"
      >
        <path
          d="M 24 48 C 12 48, 4 38, 10 26 C 4 15, 18 5, 36 11 C 46 2, 72 3, 82 13 C 96 8, 108 20, 104 33 C 114 40, 108 48, 94 48 Z"
          fill={isSelected ? `${color}22` : 'var(--tile-bg)'}
          stroke={isSelected ? color : 'var(--card-border)'}
          strokeWidth={isSelected ? '2.5' : '1.5'}
        />
        {/* Sad face on cloud — two dots + frown */}
        {isSelected && (
          <>
            <circle cx="46" cy="28" r="2.5" fill={color} />
            <circle cx="62" cy="28" r="2.5" fill={color} />
            <path d="M 44 36 Q 54 32 64 36" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        )}
      </svg>

      <span style={{
        position: 'relative',
        zIndex: 2,
        fontFamily: "'Outfit', 'Inter', sans-serif",
        fontSize: '0.82rem',
        fontWeight: isSelected ? 800 : 600,
        color: isSelected ? color : 'var(--text-main)',
        letterSpacing: '0.01em',
        textTransform: 'uppercase'
      }}>
        {name}
      </span>
    </button>
  );
}

/* =====================================================================
   SUB-CATEGORY CARD (Step 2)
   ===================================================================== */
function SubCategoryCard({
  name,
  iconId,
  isSelected,
  onClick
}: {
  name: string;
  iconId: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const IconComponent = FEELING_ICON_MAP[iconId.toLowerCase()] || LonelyIcon;
  return (
    <button
      onClick={onClick}
      className="feeling-card-item"
      style={{
        background: isSelected ? 'var(--tile-selected-bg)' : 'var(--tile-bg)',
        border: isSelected ? '2px solid #a855f7' : '1.5px solid var(--card-border)',
        borderRadius: '18px',
        padding: '1rem 0.5rem 0.85rem 0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.55rem',
        cursor: 'pointer',
        boxShadow: isSelected ? '0 6px 18px rgba(168, 85, 247, 0.25)' : '0 2px 8px rgba(0,0,0,0.02)',
        transform: isSelected ? 'scale(1.03)' : 'scale(1)',
        transition: 'all 0.22s ease'
      }}
    >
      <div style={{ color: isSelected ? '#a855f7' : 'var(--text-main)' }}>
        <IconComponent size={30} color={isSelected ? '#a855f7' : 'var(--text-main)'} />
      </div>
      <span style={{
        fontSize: '0.8rem',
        fontWeight: isSelected ? 700 : 500,
        color: isSelected ? '#a855f7' : 'var(--text-main)',
        textTransform: 'capitalize',
        textAlign: 'center',
        lineHeight: 1.2
      }}>
        {name}
      </span>
    </button>
  );
}

/* =====================================================================
   SPECIFIC FEELING CARD (Step 3)
   ===================================================================== */
function SpecificFeelingCard({
  name,
  iconId,
  isSelected,
  onClick
}: {
  name: string;
  iconId: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const IconComponent = FEELING_ICON_MAP[iconId.toLowerCase()] || LonelyIcon;
  return (
    <button
      onClick={onClick}
      className="feeling-card-item"
      style={{
        background: isSelected ? 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.08))' : 'var(--tile-bg)',
        border: isSelected ? '2px solid #ec4899' : '1.5px solid var(--card-border)',
        borderRadius: '16px',
        padding: '0.9rem 0.5rem 0.75rem 0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.45rem',
        cursor: 'pointer',
        boxShadow: isSelected ? '0 6px 18px rgba(236, 72, 153, 0.2)' : '0 2px 6px rgba(0,0,0,0.02)',
        transform: isSelected ? 'scale(1.04)' : 'scale(1)',
        transition: 'all 0.2s ease'
      }}
    >
      <div style={{ color: isSelected ? '#ec4899' : 'var(--text-subtle)' }}>
        <IconComponent size={26} color={isSelected ? '#ec4899' : 'var(--text-subtle)'} />
      </div>
      <span style={{
        fontSize: '0.76rem',
        fontWeight: isSelected ? 700 : 500,
        color: isSelected ? '#ec4899' : 'var(--text-main)',
        textTransform: 'capitalize',
        textAlign: 'center',
        lineHeight: 1.2
      }}>
        {name}
      </span>
    </button>
  );
}

/* =====================================================================
   STEP PROGRESS BANNER
   ===================================================================== */
function StepBanner({
  number, icon, text, isDone, isActive
}: {
  number: string; icon: string; text: string; isDone?: boolean; isActive?: boolean;
}) {
  return (
    <div className={`arrow-banner-item arrow-banner-animated ${isActive ? 'step-active-glow' : ''}`} style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.6rem',
      background: isDone
        ? 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(124,84,209,0.12) 100%)'
        : 'linear-gradient(135deg, rgba(124,84,209,0.12) 0%, rgba(231,124,116,0.12) 100%)',
      border: isDone ? '1.5px solid #10b981' : isActive ? '1.5px solid #a855f7' : '1.5px solid var(--card-border)',
      color: 'var(--text-main)',
      padding: '0.65rem 1.6rem 0.65rem 0.75rem',
      borderRadius: '9999px 24px 24px 9999px',
      clipPath: 'polygon(0% 0%, 86% 0%, 100% 50%, 86% 100%, 0% 100%)',
      fontSize: '0.8rem',
      fontWeight: 600,
      boxShadow: isActive ? '0 6px 18px rgba(168,85,247,0.25)' : '0 4px 12px rgba(120,90,160,0.06)',
      position: 'relative',
      minWidth: '200px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        width: '28px', height: '28px',
        borderRadius: '50%',
        background: isDone ? '#10b981' : 'var(--tile-bg)',
        color: isDone ? '#ffffff' : '#a855f7',
        border: '1px solid var(--card-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.85rem', flexShrink: 0,
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

/* =====================================================================
   MAIN MOOD TOOL COMPONENT
   ===================================================================== */
export default function MoodTool() {
  // ─── Selection State (3 layers) ───────────────────────────────────
  const [activeFamilyId, setActiveFamilyId] = useState<string>('sad');
  const [activeSubCategoryId, setActiveSubCategoryId] = useState<string | null>(null);
  const [selectedFeelingId, setSelectedFeelingId] = useState<string | null>(null);

  // Step tracker: 1=choose family, 2=choose sub, 3=choose feeling, 4=result
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // ─── Result State ─────────────────────────────────────────────────
  const [currentFlip, setCurrentFlip] = useState<{ targetMood: string; actionText: string }>({
    targetMood: 'Peaceful',
    actionText: 'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.'
  });
  const [flipCount, setFlipCount] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

  // ─── UI State ────────────────────────────────────────────────────
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [show2ndVisitModal, setShow2ndVisitModal] = useState<boolean>(false);
  const [show7thCheckinOffer, setShow7thCheckinOffer] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);

  // ─── Derived Data ─────────────────────────────────────────────────
  const activeFamily = MOOD_DATA.find((f) => f.id === activeFamilyId) || MOOD_DATA[0];
  const activeSubCategory = activeFamily.subCategories.find((s) => s.id === activeSubCategoryId) || null;
  const selectedFeeling = activeSubCategory?.feelings.find((f) => f.id === selectedFeelingId) || null;

  // ─── Init ─────────────────────────────────────────────────────────
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

  // ─── Handlers ─────────────────────────────────────────────────────
  const handleSelectFamily = (familyId: string) => {
    setActiveFamilyId(familyId);
    setActiveSubCategoryId(null);
    setSelectedFeelingId(null);
    setStep(1);
  };

  const handleSelectSubCategory = (subId: string) => {
    setActiveSubCategoryId(subId);
    setSelectedFeelingId(null);
    setStep(3);
  };

  const handleSelectFeeling = (feelingId: string) => {
    setSelectedFeelingId(feelingId);
  };

  const handleFlipMood = async () => {
    if (!selectedFeelingId) return;
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
      setStep(4);

      if (nextCount >= 7 && !localStorage.getItem('moodflip_7th_offer_shown')) {
        setShow7thCheckinOffer(true);
        localStorage.setItem('moodflip_7th_offer_shown', 'true');
      }
    }, 380);

    if (profile?.email) {
      try {
        await fetch('/api/checkins', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: profile.email,
            primaryMood: activeFamily.name,
            subFeeling: activeSubCategoryId,
            specificFeeling: selectedFeelingId,
            targetMood: newFlip.targetMood,
            actionShown: newFlip.actionText
          })
        });
      } catch (e) {
        // Silent fallback — backend optional
      }
    }
  };

  const handleFlipAgain = () => {
    setStep(1);
    setActiveSubCategoryId(null);
    setSelectedFeelingId(null);
  };

  // ─── Render helpers ────────────────────────────────────────────────
  const canFlip = !!selectedFeelingId;
  const currentStep = step;

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0.5rem 0.5rem',
      fontFamily: "'Outfit', 'Inter', -apple-system, sans-serif"
    }}>

      {/* ── HERO HEADER ─────────────────────────────────────────────── */}
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
          boxShadow: '0 4px 14px rgba(168,85,247,0.12)'
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

        {/* FEATURE BADGES */}
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

      {/* ── MAIN TOOL CANVAS ─────────────────────────────────────────── */}
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: '32px',
        border: '1px solid var(--card-border)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'background 0.3s ease, border-color 0.3s ease'
      }}>
        <div className="mood-tool-grid" style={{ minHeight: '620px', position: 'relative' }}>

          {/* ════════════════════════════════════════════════════════
              LEFT PANEL — Mood selection (Steps 1-3) OR result display (Step 4)
              ════════════════════════════════════════════════════════ */}
          <div className="left-panel-container" style={{
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid var(--card-border)',
            background: 'var(--left-bg)'
          }}>

            {step === 4 ? (
              /* ── STEP 4 LEFT: Show selected negative mood path ─── */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                    ☁️ You Felt:
                  </div>

                  {/* Family badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--tile-bg)',
                    border: '1.5px solid var(--card-border)',
                    borderRadius: '9999px',
                    padding: '0.45rem 1rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '1rem' }}>☁️</span>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', textTransform: 'uppercase' }}>
                      {activeFamily.name}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div style={{ color: 'var(--text-subtle)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>↓</div>

                  {/* Sub-category badge */}
                  {activeSubCategory && (
                    <>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'var(--tile-selected-bg)',
                        border: '1.5px solid #a855f7',
                        borderRadius: '9999px',
                        padding: '0.45rem 1rem',
                        marginBottom: '0.75rem'
                      }}>
                        {(() => {
                          const Icon = FEELING_ICON_MAP[activeSubCategory.id.toLowerCase()] || LonelyIcon;
                          return <Icon size={18} color="#a855f7" />;
                        })()}
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#a855f7', textTransform: 'capitalize' }}>
                          {activeSubCategory.name}
                        </span>
                      </div>
                      <div style={{ color: 'var(--text-subtle)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>↓</div>
                    </>
                  )}

                  {/* Specific feeling badge */}
                  {selectedFeeling && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'rgba(239,68,68,0.08)',
                      border: '1.5px solid rgba(239,68,68,0.35)',
                      borderRadius: '9999px',
                      padding: '0.45rem 1rem',
                    }}>
                      {(() => {
                        const Icon = FEELING_ICON_MAP[selectedFeeling.id.toLowerCase()] || LonelyIcon;
                        return <Icon size={18} color="#ef4444" />;
                      })()}
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ef4444', textTransform: 'capitalize' }}>
                        {selectedFeeling.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Flip again button */}
                <button
                  onClick={handleFlipAgain}
                  style={{
                    alignSelf: 'flex-start',
                    padding: '0.7rem 1.5rem',
                    borderRadius: '9999px',
                    border: '1.5px solid var(--card-border)',
                    background: 'var(--tile-bg)',
                    color: 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ↺ Flip Another Mood
                </button>
              </div>

            ) : (
              /* ── STEPS 1-3 LEFT: Mood selector UI ─── */
              <div className="inner-left-layout" style={{ alignItems: 'start' }}>

                {/* STEP BANNERS COLUMN */}
                <div className="arrow-banners-col" style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem', paddingTop: '0.2rem' }}>
                  <StepBanner
                    number="01"
                    icon="☁️"
                    text="Choose your mood family"
                    isDone={!!activeFamilyId}
                    isActive={currentStep === 1}
                  />
                  <StepBanner
                    number="02"
                    icon="♡"
                    text="Pick a sub-feeling"
                    isDone={!!activeSubCategoryId}
                    isActive={currentStep === 1 && !!activeFamilyId}
                  />
                  <StepBanner
                    number="03"
                    icon="🎯"
                    text="Select the exact feeling"
                    isDone={!!selectedFeelingId}
                    isActive={currentStep === 3}
                  />
                </div>

                {/* SELECTOR COLUMN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                  {/* ── STEP 1: 5 Family Cloud Buttons ─── */}
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                      Step 1 — How are you feeling broadly?
                    </div>
                    <div className="cloud-buttons-row" style={{ display: 'flex', gap: '0.2rem', flexWrap: 'wrap' }}>
                      {MOOD_DATA.map((fam) => (
                        <FamilyCloudButton
                          key={fam.id}
                          name={fam.name}
                          color={fam.cloudColor}
                          isSelected={fam.id === activeFamilyId}
                          onClick={() => handleSelectFamily(fam.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* ── STEP 2: Sub-category grid ─── */}
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>
                      Step 2 — Which feels closer?
                    </div>
                    <div className="feelings-responsive-grid" style={{ gap: '0.75rem' }}>
                      {activeFamily.subCategories.map((sub) => (
                        <SubCategoryCard
                          key={sub.id}
                          name={sub.name}
                          iconId={sub.id}
                          isSelected={sub.id === activeSubCategoryId}
                          onClick={() => handleSelectSubCategory(sub.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* ── STEP 3: Specific feelings (only shown once sub is selected) ─── */}
                  {activeSubCategory && (
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>
                        Step 3 — Pick the exact feeling:
                      </div>
                      <div className="feelings-responsive-grid" style={{ gap: '0.65rem' }}>
                        {activeSubCategory.feelings.map((feeling) => (
                          <SpecificFeelingCard
                            key={feeling.id}
                            name={feeling.name}
                            iconId={feeling.iconName}
                            isSelected={feeling.id === selectedFeelingId}
                            onClick={() => handleSelectFeeling(feeling.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── STEP 4: FLIP MY MOOD BUTTON ─── */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                    <button
                      onClick={handleFlipMood}
                      disabled={isFlipping || !canFlip}
                      className="pulse-button"
                      style={{
                        padding: '1.1rem 2.75rem',
                        borderRadius: '9999px',
                        border: canFlip ? 'none' : '1.5px solid var(--card-border)',
                        background: canFlip
                          ? 'linear-gradient(135deg, #7c54d1 0%, #523793 100%)'
                          : 'var(--tile-bg)',
                        color: canFlip ? 'white' : 'var(--text-subtle)',
                        fontWeight: 800,
                        fontSize: '1.15rem',
                        cursor: canFlip ? 'pointer' : 'not-allowed',
                        boxShadow: canFlip ? '0 8px 28px rgba(124,84,209,0.45)' : 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.25s ease',
                        whiteSpace: 'nowrap',
                        opacity: canFlip ? 1 : 0.6
                      } as React.CSSProperties}
                    >
                      <span>{isFlipping ? 'Flipping...' : '💫 Flip My Mood'}</span>
                      {canFlip && !isFlipping && <span style={{ fontSize: '1.35rem' }}>&rarr;</span>}
                    </button>
                  </div>

                  {/* Helper text when no feeling selected yet */}
                  {!canFlip && (
                    <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-subtle)', margin: 0 }}>
                      ↑ Complete all 3 steps above to activate the Flip My Mood button
                    </p>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* ════════════════════════════════════════════════════════
              RIGHT PANEL — Sunburst artwork & outcome display
              ════════════════════════════════════════════════════════ */}
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
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              pointerEvents: 'none', opacity: 0.65
            }}>
              <svg width="100%" height="100%" viewBox="0 0 500 500" preserveAspectRatio="none">
                <circle cx="250" cy="190" r="150" fill="#fde68a" opacity="0.25" />
                <path d="M0 320 Q250 250 500 320 L500 500 L0 500 Z" fill="#fef3c7" opacity="0.35" />
                <path d="M0 380 Q250 320 500 380 L500 500 L0 500 Z" fill="#fce7f3" opacity="0.25" />
                {/* Sun rays */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <line
                    key={deg}
                    x1="250" y1="190"
                    x2={250 + 180 * Math.cos((deg - 90) * Math.PI / 180)}
                    y2={190 + 180 * Math.sin((deg - 90) * Math.PI / 180)}
                    stroke="#fde68a"
                    strokeWidth="1.5"
                    opacity="0.18"
                  />
                ))}
                <circle cx="250" cy="190" r="55" fill="#fef3c7" opacity="0.5" />
                <circle cx="250" cy="190" r="35" fill="#fde68a" opacity="0.45" />
              </svg>
            </div>

            {/* OUTCOME DISPLAY */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>

              {step === 4 ? (
                /* ── RESULT VIEW (after flip) ─── */
                <div className={`target-mood-animate`} key={currentFlip.targetMood}>
                  <div style={{ fontSize: '1.35rem', color: '#d97706', marginBottom: '0.4rem' }}>☀️</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', fontWeight: 600, marginBottom: '0.2rem' }}>
                    Your positive mood is:
                  </div>
                  <h2 style={{
                    fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                    fontSize: currentFlip.targetMood.length > 12 ? '2.4rem' : '3.5rem',
                    fontWeight: 700,
                    color: '#10b981',
                    margin: '0.2rem 0 1.75rem 0',
                    lineHeight: 1.1
                  }}>
                    {currentFlip.targetMood}
                  </h2>

                  {/* 60-SEC ACTION CARD */}
                  <div style={{
                    background: 'var(--action-card-bg)',
                    border: '1.5px solid var(--card-border)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.1rem',
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
                      <MeditateIcon size={34} color="#a855f7" />
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', margin: 0, fontFamily: "'Fraunces', Georgia, serif", lineHeight: 1.3 }}>
                        ⚡ Your 60-second action:
                      </h3>
                      <div style={{ borderTop: '1px solid var(--card-border)', margin: '0.6rem 0', position: 'relative', textAlign: 'center' }}>
                        <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--action-card-bg)', padding: '0 0.4rem', fontSize: '0.7rem', color: '#c8828a' }}>♡</span>
                      </div>
                      <p style={{ fontSize: '0.91rem', color: 'var(--text-subtle)', lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                        {currentFlip.actionText}
                      </p>
                    </div>

                    <div style={{ flexShrink: 0, opacity: 0.85 }}>
                      <BotanicalSprig size={38} color="#a855f7" />
                    </div>
                  </div>

                  {/* SAVE MY PROFILE BUTTON */}
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
                        padding: '0.75rem 1.75rem',
                        background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        borderRadius: '9999px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 6px 20px rgba(124,84,209,0.3)',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase'
                      }}
                    >
                      ✨ SAVE MY PROFILE
                    </button>
                  </div>
                </div>

              ) : (
                /* ── WAITING STATE (before flip) ─── */
                <div>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>☀️</div>
                  <h2 style={{
                    fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    marginBottom: '0.65rem',
                    lineHeight: 1.2
                  }}>
                    Your positive mood<br />awaits you here
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-subtle)', lineHeight: 1.65, marginBottom: '2rem', maxWidth: '280px', margin: '0 auto 2rem auto' }}>
                    Complete the 3 steps on the left and press <strong style={{ color: '#7c54d1' }}>Flip My Mood</strong> to reveal your positive target state and 60-second action.
                  </p>

                  {/* Progress indicator */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                    {[
                      { label: 'Mood Family', done: !!activeFamilyId },
                      { label: 'Sub-feeling', done: !!activeSubCategoryId },
                      { label: 'Exact Feeling', done: !!selectedFeelingId }
                    ].map(({ label, done }) => (
                      <div key={label} style={{
                        display: 'flex', alignItems: 'center', gap: '0.35rem',
                        fontSize: '0.78rem', fontWeight: 700,
                        color: done ? '#10b981' : 'var(--text-subtle)',
                        background: done ? 'rgba(16,185,129,0.1)' : 'var(--tile-bg)',
                        border: `1.5px solid ${done ? '#10b981' : 'var(--card-border)'}`,
                        padding: '0.35rem 0.8rem',
                        borderRadius: '9999px',
                        transition: 'all 0.25s ease'
                      }}>
                        <span>{done ? '✓' : '○'}</span>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
              <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>You&apos;ve got this.</div>
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

      {/* ── 2ND VISIT INVITATION MODAL ─────────────────────────────── */}
      {show2ndVisitModal && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: '480px', background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>💫</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.5rem' }}>
                Welcome Back to MoodFlip!
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                You&apos;ve used MoodFlip multiple times! Create a free profile to save your check-ins and track your positive mindset progress.
              </p>
            </div>

            <div style={{ background: 'var(--tile-selected-bg)', border: '1px solid var(--card-border)', padding: '1rem', borderRadius: '16px', marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.78rem', color: '#a855f7', lineHeight: 1.5, margin: 0, fontWeight: 600 }}>
                &ldquo;By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history so we can create and offer personalized downloads.&rdquo;
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
                  flex: 1, padding: '0.75rem', borderRadius: '12px',
                  border: 'none', background: 'var(--tile-bg)', color: 'var(--text-subtle)',
                  fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer'
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
                  flex: 1.5, padding: '0.75rem', borderRadius: '12px',
                  border: 'none', background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                  color: 'white', fontWeight: 800, fontSize: '0.85rem',
                  cursor: 'pointer', boxShadow: '0 6px 18px rgba(124,84,209,0.3)'
                }}
              >
                Create Profile &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 7TH CHECK-IN SALES OFFER MODAL ──────────────────────────── */}
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
              You&apos;ve completed 7 mood check-ins! Get your custom-generated 7-Day Mindset PDF report based on your exact check-in history.
            </p>

            <PaidPlansSection />
          </div>
        </div>
      )}

      {/* ── AUTH MODAL ───────────────────────────────────────────────── */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

    </div>
  );
}
