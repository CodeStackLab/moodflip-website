'use client';

import React, { useState, useEffect } from 'react';
import { MOOD_DATA, getActionForFeeling, MoodFamily, MoodSubCategory } from '../lib/moodData';
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
} from './FeelingIcons';

// Helper to render the matching line-art icon
const renderFeelingIcon = (iconName: string, isSelected: boolean) => {
  const iconColor = isSelected ? '#53389e' : '#475569';
  switch (iconName) {
    case 'Lonely':
      return <LonelyIcon size={36} color={iconColor} />;
    case 'Rejected':
      return <RejectedIcon size={36} color={iconColor} />;
    case 'Hurt':
      return <HurtIcon size={36} color={iconColor} />;
    case 'Ashamed':
      return <AshamedIcon size={36} color={iconColor} />;
    case 'Guilty':
      return <GuiltyIcon size={36} color={iconColor} />;
    case 'Empty':
      return <EmptyIcon size={36} color={iconColor} />;
    case 'Overwhelmed':
      return <OverwhelmedIcon size={36} color={iconColor} />;
    case 'Abandoned':
      return <AbandonedIcon size={36} color={iconColor} />;
    default:
      return <LonelyIcon size={36} color={iconColor} />;
  }
};

export default function MoodTool() {
  const [selectedFamily, setSelectedFamily] = useState<MoodFamily>(MOOD_DATA[0]);
  const [selectedSub, setSelectedSub] = useState<MoodSubCategory>(MOOD_DATA[0].subCategories[0]);
  const [result, setResult] = useState<{ targetMood: string; actionText: string } | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [visitCount, setVisitCount] = useState<number>(1);

  useEffect(() => {
    const savedVisits = parseInt(localStorage.getItem('moodflip_visit_count') || '0', 10) + 1;
    localStorage.setItem('moodflip_visit_count', savedVisits.toString());
    setVisitCount(savedVisits);
  }, []);

  const handleFlipMood = () => {
    if (!selectedSub) return;
    const flipped = getActionForFeeling(selectedSub.id, visitCount);
    setResult(flipped);
    setIsAnimating(true);
    setIsFlipped(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleClearSelection = () => {
    setSelectedFamily(MOOD_DATA[0]);
    setSelectedSub(MOOD_DATA[0].subCategories[0]);
    setIsFlipped(false);
    setResult(null);
  };

  const currentTargetMood = isFlipped && result ? result.targetMood : 'Peaceful';
  const currentActionText = isFlipped && result
    ? result.actionText
    : 'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.';

  return (
    <div className="moodflip-wrapper">
      {/* Centered MoodFlip Title Header matching the reference image */}
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

          {/* Step 1 Badge */}
          <div className="step-arrow-container">
            <div className="step-pill-badge">
              <span className="badge-icon-circle">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>
              </span>
              <span className="badge-text">Choose your current mood</span>
            </div>
            <div className="step-arrow-line">
              <svg width="40" height="18" viewBox="0 0 40 18" fill="none">
                <path d="M0 9H34M34 9L27 2M34 9L27 16" stroke="#C4B5FD" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Cloud Mood Family Pills Row */}
          <div className="cloud-pills-row">
            {MOOD_DATA.map((family) => {
              const isSelected = selectedFamily.id === family.id;
              return (
                <button
                  key={family.id}
                  onClick={() => {
                    setSelectedFamily(family);
                    setSelectedSub(family.subCategories[0]);
                    setIsFlipped(false);
                    setResult(null);
                  }}
                  className={`cloud-shape-pill ${isSelected ? 'selected' : ''}`}
                >
                  <svg className="cloud-svg-bg" viewBox="0 0 100 45" fill="none" preserveAspectRatio="none">
                    <path d="M20 38 C 10 38 5 30 10 22 C 10 14 20 10 30 14 C 40 5 60 5 70 14 C 80 10 90 14 90 22 C 95 30 90 38 80 38 Z"
                      fill={isSelected ? '#F0EBFF' : '#FFFFFF'}
                      stroke={isSelected ? '#7C5CFC' : '#E2E8F0'}
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="cloud-pill-label">{family.name}</span>
                </button>
              );
            })}
          </div>

          {/* Step 2 Badge */}
          <div className="step-arrow-container">
            <div className="step-pill-badge">
              <span className="badge-icon-circle">
                <span style={{ fontSize: '0.75rem', color: '#7C5CFC' }}>♡</span>
              </span>
              <span className="badge-text">Pick the feeling closest to how you feel</span>
            </div>
            <div className="step-arrow-line">
              <svg width="40" height="18" viewBox="0 0 40 18" fill="none">
                <path d="M0 9H34M34 9L27 2M34 9L27 16" stroke="#C4B5FD" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* 4x2 Feeling Cards Grid */}
          <div className="feeling-grid-layout">
            {selectedFamily.subCategories.slice(0, 8).map((sub) => {
              const isSelected = selectedSub.id === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSub(sub);
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

            {/* Clear Selection Tile (at bottom left) */}
            <button
              onClick={handleClearSelection}
              className="feeling-tile-card clear-tile"
            >
              <div className="feeling-tile-icon">
                <TrashIcon size={28} color="#8A92A6" />
              </div>
              <div className="clear-tile-text">
                <span className="clear-title">Clear selection</span>
                <span className="clear-sub">Start over</span>
              </div>
            </button>
          </div>

        </div>

        {/* CENTER OVERLAPPING 3D PURPLE ARROW BUTTON */}
        <div className="center-flip-trigger-wrapper">
          <button
            onClick={handleFlipMood}
            className="purple-3d-arrow-button"
            id="change-my-mood-btn"
          >
            <span className="arrow-btn-text">Change My Mood</span>
            <span className="arrow-btn-symbol">→</span>
          </button>
        </div>

        {/* RIGHT SUNSET SCENIC PANEL */}
        <div className="moodflip-right-panel">

          {/* Sunburst rays effect */}
          <div className="sunburst-rays"></div>

          {/* Flying bird in sky outline */}
          <div className="sky-bird-icon">
            <svg width="24" height="14" viewBox="0 0 24 14" fill="none" stroke="#7A8B9E" strokeWidth="1.5" strokeLinecap="round">
              <path d="M1 8C5 4 8 2 12 7C16 2 19 4 23 8" />
            </svg>
          </div>

          {/* Rising Semicircle Sun */}
          <div className="rising-sun-wrapper">
            <div className="rising-sun-arc">
              {/* Heart icon on top of sun */}
              <div className="sun-heart-icon">♡</div>
              <div className="sun-change-label">Your mood has changed to:</div>
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

            {/* Decorative Botanical Branch on Right */}
            <div className="botanical-branch-graphic">
              <BotanicalSprig size={56} color="#6B8E73" />
            </div>
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
    </div>
  );
}
