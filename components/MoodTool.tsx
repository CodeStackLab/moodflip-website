'use client';

import React, { useState, useEffect } from 'react';
import { MOOD_DATA, getActionForFeeling, MoodFamily, MoodSubCategory, FeelingDetail } from '../lib/moodData';
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
} from './FeelingIcons';
import AuthModal from './AuthModal';
import PayPalModal from './PayPalModal';

// Helper to render matching line-art icon
// Selected cards have deep purple bg → use white icon
const renderFeelingIcon = (iconName: string, isSelected: boolean) => {
  const iconColor = isSelected ? '#FFFFFF' : '#6B5EA0';
  switch (iconName) {
    case 'Lonely':
      return <LonelyIcon size={34} color={iconColor} />;
    case 'Rejected':
      return <RejectedIcon size={34} color={iconColor} />;
    case 'Hurt':
      return <HurtIcon size={34} color={iconColor} />;
    case 'Ashamed':
      return <AshamedIcon size={34} color={iconColor} />;
    case 'Guilty':
      return <GuiltyIcon size={34} color={iconColor} />;
    case 'Empty':
      return <EmptyIcon size={34} color={iconColor} />;
    case 'Overwhelmed':
      return <OverwhelmedIcon size={34} color={iconColor} />;
    case 'Abandoned':
      return <AbandonedIcon size={34} color={iconColor} />;
    default:
      return <LonelyIcon size={34} color={iconColor} />;
  }
};

export default function MoodTool() {
  const [selectedFamily, setSelectedFamily] = useState<MoodFamily>(MOOD_DATA[0]);
  const [selectedSub, setSelectedSub] = useState<MoodSubCategory>(MOOD_DATA[0].subCategories[0]);
  const [selectedFeeling, setSelectedFeeling] = useState<FeelingDetail>(MOOD_DATA[0].subCategories[0].feelings[0]);
  const [result, setResult] = useState<{ targetMood: string; actionText: string } | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [visitCount, setVisitCount] = useState<number>(1);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Section 9 & 10: State for 7-checkin offer popup & PayPal modal
  const [isOfferModalOpen, setIsOfferModalOpen] = useState<boolean>(false);
  const [isPayPalOpen, setIsPayPalOpen] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const savedVisits = parseInt(localStorage.getItem('moodflip_visit_count') || '0', 10) + 1;
    localStorage.setItem('moodflip_visit_count', savedVisits.toString());
    setVisitCount(savedVisits);

    // Section 10: Automatically trigger pop-up window on 2nd visit asking to create a profile
    if (savedVisits === 2) {
      const hasPrompted = localStorage.getItem('moodflip_2nd_visit_prompted');
      if (!hasPrompted) {
        setIsAuthOpen(true);
        localStorage.setItem('moodflip_2nd_visit_prompted', 'true');
      }
    }
  }, []);

  const handleFlipMood = () => {
    const feelingId = selectedFeeling ? selectedFeeling.id : selectedSub.id;
    const flipped = getActionForFeeling(feelingId, visitCount);
    setResult(flipped);
    setIsAnimating(true);
    setIsFlipped(true);

    // Track user check-in history if logged in
    try {
      const profileStr = localStorage.getItem('moodflip_profile');
      if (profileStr) {
        const profile = JSON.parse(profileStr);
        setUserEmail(profile.email);
        const checkinsKey = `moodflip_checkins_${profile.email}`;
        const existingCheckins = JSON.parse(localStorage.getItem(checkinsKey) || '[]');
        const newCheckin = {
          id: Date.now().toString(),
          primaryMood: selectedFamily.name,
          subFeeling: selectedSub.name,
          specificFeeling: selectedFeeling.name,
          targetMood: flipped.targetMood,
          actionShown: flipped.actionText,
          createdAt: new Date().toISOString()
        };
        const updatedCheckins = [newCheckin, ...existingCheckins];
        localStorage.setItem(checkinsKey, JSON.stringify(updatedCheckins));

        // Sync check-in to server route
        fetch('/api/checkins', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: profile.email, ...newCheckin })
        }).catch(() => {});

        // Section 9 & 10: After 7 saved check-ins, show offer popup for 7-day paid PDF ($7)
        if (updatedCheckins.length === 7) {
          const hasOffered = localStorage.getItem(`moodflip_7day_offered_${profile.email}`);
          if (!hasOffered) {
            setIsOfferModalOpen(true);
            localStorage.setItem(`moodflip_7day_offered_${profile.email}`, 'true');
          }
        }
      }
    } catch (e) {
      console.error('Check-in storage sync error:', e);
    }

    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentTargetMood = isFlipped && result ? result.targetMood : (selectedFeeling ? selectedFeeling.targetMood : 'Peaceful');
  const currentActionText = isFlipped && result
    ? result.actionText
    : (selectedFeeling && selectedFeeling.actions ? selectedFeeling.actions[0] : 'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.');

  return (
    <div className="moodflip-wrapper">
      {/* Centered Brand Title Header */}
      <div className="moodflip-brand-header">
        <h1 className="moodflip-brand-title">
          <span className="brand-mood">Mood</span>
          <span className="brand-flip">
            Flip
            <span className="brand-heart-dot">♡</span>
          </span>
        </h1>
      </div>

      {/* Main Split-Canvas Frame */}
      <div className="moodflip-main-canvas">

        {/* LEFT SELECTION PANEL */}
        <div className="moodflip-left-panel">

          {/* STEP 1: Select Broad Mood Family Cloud */}
          <div className="step-arrow-container">
            <div className="step-pill-badge">
              <span className="badge-icon-circle">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>
              </span>
              <span className="badge-text">Step 1: Choose your current mood cloud</span>
            </div>
          </div>

          {/* 5 Cloud Family Pills - cloud SVG shape with lavender selected state */}
          <div className="cloud-pills-row">
            {MOOD_DATA.map((family) => {
              const isSelected = selectedFamily.id === family.id;
              return (
                <button
                  key={family.id}
                  onClick={() => {
                    setSelectedFamily(family);
                    const defaultSub = family.subCategories[0];
                    setSelectedSub(defaultSub);
                    if (defaultSub && defaultSub.feelings && defaultSub.feelings.length > 0) {
                      setSelectedFeeling(defaultSub.feelings[0]);
                    }
                    setIsFlipped(false);
                    setResult(null);
                  }}
                  className={`cloud-shape-pill ${isSelected ? 'selected' : ''}`}
                >
                  <svg className="cloud-svg-bg" viewBox="0 0 110 50" fill="none" preserveAspectRatio="none">
                    {/* Cloud silhouette matching reference image */}
                    <path d="M18 40 C 8 40 3 31 8 22 C 7 12 18 8 28 13 C 36 4 62 4 72 13 C 82 8 95 13 95 22 C 100 31 95 40 85 40 Z"
                      fill={isSelected ? '#EAE0FA' : '#FFFFFF'}
                      stroke={isSelected ? '#9B7FE8' : '#DDD8D0'}
                      strokeWidth="1.8"
                    />
                  </svg>
                  <span className="cloud-pill-label">{family.name}</span>
                </button>
              );
            })}
          </div>

          {/* STEP 2: Pick 2nd Layer Feeling Card */}
          <div className="step-arrow-container">
            <div className="step-pill-badge">
              <span className="badge-icon-circle">
                <span style={{ fontSize: '0.75rem', color: '#7C5CFC' }}>♡</span>
              </span>
              <span className="badge-text">Step 2: Pick the feeling card closest to you</span>
            </div>
          </div>

          {/* Feeling Cards Grid */}
          <div className="feeling-grid-layout">
            {selectedFamily.subCategories.map((sub) => {
              const isSelected = selectedSub.id === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSub(sub);
                    if (sub.feelings && sub.feelings.length > 0) {
                      setSelectedFeeling(sub.feelings[0]);
                    }
                    setIsFlipped(false);
                    setResult(null);
                  }}
                  className={`feeling-tile-card ${isSelected ? 'selected' : ''}`}
                >
                  <div className="feeling-tile-icon">
                    {renderFeelingIcon(sub.iconName, isSelected)}
                  </div>
                  <span className="feeling-tile-label">{sub.name}</span>
                </button>
              );
            })}
          </div>

          {/* STEP 3: 3rd Layer Feeling Details (if available) */}
          {selectedSub && selectedSub.feelings && selectedSub.feelings.length > 0 ? (
            <div style={{ marginTop: '1rem' }}>
              <div className="step-arrow-container">
                <div className="step-pill-badge">
                  <span className="badge-icon-circle">✨</span>
                  <span className="badge-text">Step 3: Select specific feeling nuance</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                {selectedSub.feelings.map((f) => {
                  const isSel = selectedFeeling.id === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => {
                        setSelectedFeeling(f);
                        setIsFlipped(false);
                        setResult(null);
                      }}
                      style={{
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        border: isSel ? '2px solid #7C5CFC' : '1px solid #CBD5E1',
                        background: isSel ? '#F0EBFF' : '#FFFFFF',
                        color: isSel ? '#53389E' : '#475569',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {f.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

        </div>

        {/* CENTER ARROW BUTTON - "Change My Mood" label matching reference image exactly */}
        <div className="center-flip-trigger-wrapper">
          <button
            onClick={handleFlipMood}
            className="purple-3d-arrow-button"
            id="change-my-mood-btn"
          >
            <span className="arrow-btn-text">Change{"\n"}My Mood</span>
            <span className="arrow-btn-symbol">→</span>
          </button>
        </div>

        {/* RIGHT SUNSET SCENIC PANEL */}
        <div className="moodflip-right-panel">

          {/* Sunburst background rays */}
          <div className="sunburst-rays"></div>

          {/* Flying sky bird icon */}
          <div className="sky-bird-icon">
            <svg width="24" height="14" viewBox="0 0 24 14" fill="none" stroke="#7A8B9E" strokeWidth="1.5" strokeLinecap="round">
              <path d="M1 8C5 4 8 2 12 7C16 2 19 4 23 8" />
            </svg>
          </div>

          {/* Rising Sun Target Card (Section 6 Step 5: "Your positive mood is: Peaceful") */}
          <div className="rising-sun-wrapper">
            <div className="rising-sun-arc">
              <div className="sun-heart-icon">♡</div>
              <div className="sun-change-label">Your positive mood is:</div>
              <h2 className={`target-mood-serif-heading ${isAnimating ? 'pulse-fade' : ''}`}>
                {currentTargetMood}
              </h2>
            </div>
          </div>

          {/* Floating White Action Card */}
          <div className="floating-action-card">
            <div className="action-card-content">
              {/* Meditating Circle Icon */}
              <div className="meditate-avatar-circle">
                <MeditateIcon size={32} color="#4A6B53" />
              </div>

              {/* Title & Action */}
              <div className="action-text-container">
                <h3 className="action-card-title">
                  60-sec action to get to a {currentTargetMood.toLowerCase()} mood
                </h3>

                {/* Heart line divider */}
                <div className="heart-divider-line">
                  <span className="line-half"></span>
                  <span className="heart-center">♡</span>
                  <span className="line-half"></span>
                </div>

                <p className="action-card-description">
                  {currentActionText}
                </p>
              </div>
            </div>

            {/* Decorative Botanical Branch */}
            <div className="botanical-branch-graphic">
              <BotanicalSprig size={56} color="#6B8E73" />
            </div>
          </div>

          {/* Section 10 Requirement: "A button needs to appear right under the 60 sec action; SAVE MY PROFILE." */}
          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <button
              onClick={() => setIsAuthOpen(true)}
              style={{
                padding: '0.65rem 1.6rem',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                border: 'none',
                borderRadius: '9999px',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(139, 92, 246, 0.35)',
                transition: 'all 0.25 ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>♡</span>
              <span>SAVE MY PROFILE</span>
            </button>
          </div>

        </div>

      </div>

      {/* BOTTOM QUOTES BANNER */}
      <div className="bottom-quotes-card">
        <div className="quote-item">
          <span className="quote-heart-icon">♡</span>
          <div className="quote-text-group">
            <span className="quote-main">Small shifts can change how you feel.</span>
            <span className="quote-sub">You&apos;ve got this.</span>
          </div>
        </div>

        <div className="quote-item">
          <span className="quote-leaf-icon">🍃</span>
          <div className="quote-text-group">
            <span className="quote-main">Be kind to yourself.</span>
            <span className="quote-sub">One choice at a time.</span>
          </div>
        </div>
      </div>

      {/* Section 9 & 10: 7-Checkin Special Offer Modal Popup */}
      {isOfferModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ textAlign: 'center', padding: '1.75rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🎉</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.5rem' }}>
              Congratulations on 7 Check-ins!
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.4rem', lineHeight: 1.5 }}>
              You&apos;ve saved 7 mood entries with MoodFlip. Get your <strong>Personalised 7-Day Mood PDF Report ($7)</strong> delivered instantly with zero repeated actions!
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', justifyContent: 'center' }}>
              <button
                onClick={() => setIsOfferModalOpen(false)}
                style={{
                  padding: '0.6rem 1.1rem',
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#64748b',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Maybe Later
              </button>
              <button
                onClick={() => {
                  setIsOfferModalOpen(false);
                  setIsPayPalOpen(true);
                }}
                style={{
                  padding: '0.6rem 1.4rem',
                  background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(139, 92, 246, 0.35)'
                }}
              >
                Get 7-Day Plan ($7) ✨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile / Registration Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab="user"
      />

      {/* PayPal Checkout Modal for 7-Day Offer */}
      <PayPalModal
        isOpen={isPayPalOpen}
        onClose={() => setIsPayPalOpen(false)}
        planType="7_DAY_PDF"
        userEmail={userEmail}
      />
    </div>
  );
}
