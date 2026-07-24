'use client';

import React, { useState, useEffect } from 'react';
import { MOOD_DATA, getActionForFeeling, MoodFamily, FeelingDetail } from '../lib/moodData';
import CloudVector from './CloudVector';

interface SavedCheckin {
  primaryMood: string;
  subFeeling: string;
  specificFeeling: string;
  targetMood: string;
  actionShown: string;
  date: string;
}

// Cloud shape wrapping the mood family name with colorful multi-theme support
const CloudPill = ({ id, name, color, selected }: { id: string; name: string; color: string; selected: boolean }) => (
  <button
    className={`cloud-pill-card ${id}-pill ${selected ? 'selected' : ''}`}
  >
    <div style={{ width: '22px', height: '16px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
      <CloudVector type={id} color={selected ? color : '#94a3b8'} />
    </div>
    <span>
      {name}
    </span>
  </button>
);

export default function MoodTool() {
  const [selectedFamily, setSelectedFamily] = useState<MoodFamily | null>(MOOD_DATA[0]);
  const [selectedSubId, setSelectedSubId] = useState<string | null>(MOOD_DATA[0].subCategories[0].id);
  const [selectedFeeling, setSelectedFeeling] = useState<FeelingDetail | null>(MOOD_DATA[0].subCategories[0].feelings[0]);

  const [result, setResult] = useState<{ targetMood: string; actionText: string; actionIndex: number } | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const [visitCount, setVisitCount] = useState<number>(1);
  const [savedHistory, setSavedHistory] = useState<SavedCheckin[]>([]);
  const [userProfile, setUserProfile] = useState<{ email: string; name?: string } | null>(null);
  const [profileSaved, setProfileSaved] = useState<boolean>(false);
  const [showSevenDayOffer, setShowSevenDayOffer] = useState<boolean>(false);

  useEffect(() => {
    const savedVisits = parseInt(localStorage.getItem('moodflip_visit_count') || '0', 10) + 1;
    localStorage.setItem('moodflip_visit_count', savedVisits.toString());
    setVisitCount(savedVisits);

    const savedProfile = localStorage.getItem('moodflip_profile');
    if (savedProfile) {
      try { setUserProfile(JSON.parse(savedProfile)); } catch (e) {}
    }
    const history = JSON.parse(localStorage.getItem('moodflip_checkins') || '[]');
    setSavedHistory(history);
  }, []);

  const handleFlipMood = () => {
    if (!selectedFeeling) return;
    const flipped = getActionForFeeling(selectedFeeling.id, visitCount);
    setResult({ ...flipped, actionIndex: (visitCount % 10) + 1 });
    setIsAnimating(true);
    setIsFlipped(true);
    setTimeout(() => setIsAnimating(false), 500);

    const history = JSON.parse(localStorage.getItem('moodflip_checkins') || '[]');
    const newEntry: SavedCheckin = {
      primaryMood: selectedFamily?.name || 'Sad',
      subFeeling: selectedSubId || '',
      specificFeeling: selectedFeeling.name,
      targetMood: flipped.targetMood,
      actionShown: flipped.actionText,
      date: new Date().toISOString()
    };
    history.unshift(newEntry);
    localStorage.setItem('moodflip_checkins', JSON.stringify(history));
    setSavedHistory(history);
    setProfileSaved(false);
  };

  const handleClearSelection = () => {
    setSelectedFamily(MOOD_DATA[0]);
    setSelectedSubId(MOOD_DATA[0].subCategories[0].id);
    setSelectedFeeling(MOOD_DATA[0].subCategories[0].feelings[0]);
    setIsFlipped(false);
    setResult(null);
    setProfileSaved(false);
  };

  const handleSaveCheckinToProfile = () => {
    if (!userProfile) {
      window.location.href = '/login';
      return;
    }

    const latestCheckin = savedHistory[0];
    if (!latestCheckin) return;

    fetch('/api/checkins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userProfile.email, ...latestCheckin }),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to save check-in');
        return response.json();
      })
      .then((data) => {
        setProfileSaved(true);
        setShowSevenDayOffer(Boolean(data.showSevenDayOffer));
      })
      .catch(() => setProfileSaved(false));
  };

  const selectedSubCategory = selectedFamily
    ? selectedFamily.subCategories.find(s => s.id === selectedSubId)
    : null;

  return (
    <div>
      {/* Clean Utility bar (Links directly to /profile or /login — NO POPUPS) */}
      <div className="mood-tool-utilities">
        {userProfile && (
          <span style={{ fontSize: '0.76rem', color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.75rem', borderRadius: '9999px', fontWeight: 600 }}>
            👤 {userProfile.email}
          </span>
        )}
        <a
          href={userProfile ? '/profile' : '/login'}
          style={{ background: '#f3e8ff', border: '1px solid #d8b4fe', color: '#6d28d9', padding: '0.3rem 0.85rem', borderRadius: '9999px', fontSize: '0.76rem', fontWeight: 800, textDecoration: 'none' }}
        >
          ✨ {userProfile ? 'My Profile' : 'Create Profile'}
        </a>
        {savedHistory.length > 0 && (
          <a
            href="/profile"
            style={{ background: '#ffffff', border: '1px solid #e2e8f0', color: '#475569', padding: '0.3rem 0.85rem', borderRadius: '9999px', fontSize: '0.76rem', fontWeight: 700, textDecoration: 'none' }}
          >
            📜 History ({savedHistory.length})
          </a>
        )}
      </div>

      {/* MAIN CANVAS */}
      <div className="moodflip-canvas">

        {/* ===== LEFT PANEL ===== */}
        <div className="left-selection-panel">

          {/* STEP 1 — Choose mood family */}
          <div>
            <div className="step-arrow-badge">
              <span style={{ fontSize: '0.9rem' }}>☁️</span>
              <span>Choose your current mood</span>
            </div>
            <div className="cloud-grid">
              {MOOD_DATA.map((family) => {
                const isSel = selectedFamily?.id === family.id;
                return (
                  <div
                    key={family.id}
                    onClick={() => {
                      setSelectedFamily(family);
                      setSelectedSubId(family.subCategories[0].id);
                      setSelectedFeeling(family.subCategories[0].feelings[0]);
                      setIsFlipped(false);
                      setResult(null);
                    }}
                  >
                    <CloudPill id={family.id} name={family.name} color={family.cloudColor} selected={isSel} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2 — Pick sub-feeling */}
          {selectedFamily && (
            <div>
              <div className="step-arrow-badge">
                <span style={{ fontSize: '0.9rem' }}>💜</span>
                <span>Pick the feeling closest to how you feel</span>
              </div>
              <div className="feeling-card-grid">
                {selectedFamily.subCategories.map((sub) => {
                  const isSel = selectedSubId === sub.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubId(sub.id);
                        setSelectedFeeling(sub.feelings[0]);
                        setIsFlipped(false);
                        setResult(null);
                      }}
                      className={`feeling-square-tile ${isSel ? 'selected' : ''}`}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{sub.icon}</span>
                      <span style={{ fontSize: '0.76rem', fontWeight: 700, color: isSel ? '#53389e' : '#475569', textAlign: 'center', lineHeight: 1.2 }}>
                        {sub.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3 — Specific feeling nuance pills */}
          {selectedSubCategory && selectedSubCategory.feelings.length > 1 && (
            <div>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', marginBottom: '0.4rem' }}>
                Specific nuance:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {selectedSubCategory.feelings.map((feeling) => {
                  const isSel = selectedFeeling?.id === feeling.id;
                  return (
                    <button
                      key={feeling.id}
                      onClick={() => { setSelectedFeeling(feeling); setIsFlipped(false); setResult(null); }}
                      style={{
                        padding: '0.32rem 0.75rem',
                        borderRadius: '9999px',
                        border: isSel ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                        background: isSel ? '#f3e8ff' : '#ffffff',
                        color: isSel ? '#6d28d9' : '#475569',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <span>{feeling.icon}</span>
                      <span>{feeling.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* FLIP MY MOOD button */}
          <div style={{ paddingTop: '0.4rem' }}>
            <button
              onClick={handleFlipMood}
              disabled={!selectedFeeling}
              className="flip-mood-button"
              id="flip-mood-btn"
            >
              <span>Flip My Mood</span>
              <span style={{ fontSize: '1rem' }}>✨</span>
            </button>
            {isFlipped && (
              <button
                onClick={handleClearSelection}
                style={{
                  display: 'block',
                  marginTop: '0.5rem',
                  background: 'none',
                  border: '1px solid #cbd5e1',
                  color: '#64748b',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                ↺ Start over
              </button>
            )}
            {showSevenDayOffer && (
              <div style={{ marginTop: '0.75rem', padding: '0.75rem', borderRadius: '12px', background: '#fff7ed', border: '1px solid #fed7aa', textAlign: 'center' }}>
                <strong style={{ display: 'block', color: '#9a3412', fontSize: '0.82rem' }}>You have 7 saved check-ins!</strong>
                <a href="#paid-pdf-section" style={{ color: '#b45309', fontSize: '0.78rem', fontWeight: 800 }}>
                  View your personalised 7-day plan
                </a>
              </div>
            )}
          </div>

        </div>

        {/* ===== RIGHT SUN PANEL ===== */}
        <div className="right-sun-panel">
          <div className="sun-rays-bg" />

          {/* Rising Sun Semicircle */}
          <div className="rising-sun-element">
            <span style={{ fontSize: '1.35rem', color: '#e11d48' }}>♡</span>
            <span style={{
              fontSize: '0.76rem',
              fontWeight: 700,
              color: '#7a5c30',
              marginTop: '0.15rem',
              lineHeight: 1.2,
              padding: '0 0.4rem',
              textAlign: 'center'
            }}>
              Your mood has changed to:
            </span>
          </div>

          {/* Target mood title */}
          <h2 className="serif-target-title">
            {isFlipped && result
              ? result.targetMood.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2700-\u27BF]|[\uE000-\uF8FF]/g, '').trim()
              : 'Peaceful'}
          </h2>

          {/* Action card */}
          <div
            className="action-white-card"
            style={{ animation: isAnimating ? 'resultSlideIn 0.4s ease both' : undefined }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                flexShrink: 0
              }}>
                🧘
              </div>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1e1b4b', lineHeight: 1.3 }}>
                60-sec action to get to a {isFlipped && result
                  ? result.targetMood.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2700-\u27BF]|[\uE000-\uF8FF]/g, '').trim().toLowerCase()
                  : 'peaceful'} mood
              </h4>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.6, fontWeight: 500, marginBottom: '0.85rem' }}>
              {isFlipped && result
                ? result.actionText
                : 'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.'}
            </p>

            {/* SAVE MY PROFILE button */}
            <button
              onClick={handleSaveCheckinToProfile}
              className="save-profile-button"
              id="save-profile-btn"
            >
              {profileSaved
                ? '✅ Saved to Profile!'
                : userProfile
                  ? '💾 Save This Check-in'
                  : '💾 Save My Profile'}
            </button>

            {isFlipped && (
              <div style={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid #f4eefc', paddingTop: '0.65rem', marginTop: '0.45rem' }}>
                <a href="#paid-pdf-section" style={{ fontSize: '0.76rem', fontWeight: 700, color: '#b45309', textDecoration: 'underline' }}>
                  📘 Get 7-Day Personalised Plan ($7)
                </a>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ===== BOTTOM QUOTES BANNER ===== */}
      <div className="bottom-quotes-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <span style={{ fontSize: '1.2rem', color: '#8b5cf6' }}>♡</span>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Small shifts can change how you feel.</div>
            <div style={{ fontSize: '0.72rem', color: '#8b5cf6' }}>You&apos;ve got this.</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🍃</span>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Be kind to yourself.</div>
            <div style={{ fontSize: '0.72rem', color: '#8b5cf6' }}>One choice at a time.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
