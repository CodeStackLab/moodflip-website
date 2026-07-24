'use client';

import React, { useState, useEffect } from 'react';
import { MOOD_DATA, getActionForFeeling, MoodFamily, FeelingDetail } from '../lib/moodData';
import ProfileModal from './ProfileModal';

interface SavedCheckin {
  primaryMood: string;
  subFeeling: string;
  specificFeeling: string;
  targetMood: string;
  actionShown: string;
  date: string;
}

// Cloud shape SVG wrapping the mood family name
const CloudPill = ({ name, color, selected }: { name: string; color: string; selected: boolean }) => (
  <button
    style={{
      position: 'relative',
      background: selected
        ? `linear-gradient(135deg, ${color}33, ${color}55)`
        : '#ffffff',
      border: selected ? `2px solid ${color}` : '1.5px solid #e9e2f5',
      borderRadius: '50px',
      padding: selected ? '0.65rem 1.4rem' : '0.55rem 1.1rem',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: selected
        ? `0 6px 20px ${color}44`
        : '0 2px 8px rgba(124,92,191,0.04)',
      transition: 'all 0.22s ease',
      fontFamily: 'inherit',
      whiteSpace: 'nowrap',
    }}
  >
    {/* Cloud bump decoration */}
    <span style={{
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: color,
      display: 'inline-block',
      opacity: selected ? 1 : 0.5,
      flexShrink: 0,
    }} />
    <span style={{
      fontSize: selected ? '0.95rem' : '0.85rem',
      fontWeight: 800,
      letterSpacing: '0.04em',
      color: selected ? '#3d2878' : '#5c5268',
    }}>
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [savedHistory, setSavedHistory] = useState<SavedCheckin[]>([]);
  const [userProfile, setUserProfile] = useState<{ email: string; name?: string } | null>(null);
  const [profileSaved, setProfileSaved] = useState<boolean>(false);
  const [showSevenDayOffer, setShowSevenDayOffer] = useState<boolean>(false);

  useEffect(() => {
    const savedVisits = parseInt(localStorage.getItem('moodflip_visit_count') || '0', 10) + 1;
    localStorage.setItem('moodflip_visit_count', savedVisits.toString());
    setVisitCount(savedVisits);
    if (savedVisits === 2) {
      setTimeout(() => { setIsModalOpen(true); }, 1200);
    }
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
    setTimeout(() => setIsAnimating(false), 600);

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

  const handleSaveProfileSubmit = async (email: string, name?: string) => {
    const profile = { email, name };
    localStorage.setItem('moodflip_profile', JSON.stringify(profile));
    setUserProfile(profile);
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, visitCount })
      });
    } catch (err) {
      console.warn('Backend offline fallback:', err);
    }
  };

  const handleSaveCheckinToProfile = () => {
    if (!userProfile) {
      setIsModalOpen(true);
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
      {/* Utility bar */}
      <div className="mood-tool-utilities">
        {userProfile && (
          <span style={{ fontSize: '0.78rem', color: '#059669', background: '#e6f4ea', padding: '0.2rem 0.75rem', borderRadius: '9999px', fontWeight: 600 }}>
            👤 {userProfile.email}
          </span>
        )}
        <button
          onClick={() => setIsModalOpen(true)}
          style={{ background: '#efe8f8', border: '1px solid #d4c4ed', color: '#6346a7', padding: '0.35rem 0.9rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
        >
          ✨ {userProfile ? 'My Profile' : 'Create Profile'}
        </button>
        {savedHistory.length > 0 && (
          <button
            onClick={() => setIsHistoryOpen(true)}
            style={{ background: '#ffffff', border: '1px solid #e2d7f5', color: '#4a3a2c', padding: '0.35rem 0.9rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
          >
            📜 History ({savedHistory.length})
          </button>
        )}
      </div>

      {/* MAIN CANVAS */}
      <div className="moodflip-canvas">

        {/* ===== LEFT PANEL ===== */}
        <div className="left-selection-panel">

          {/* STEP 1 — Choose mood family */}
          <div>
            <div className="step-arrow-badge">
              <span style={{ fontSize: '1rem' }}>☁️</span>
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
                    <CloudPill name={family.name} color={family.cloudColor} selected={isSel} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2 — Pick sub-feeling (square icon tiles) */}
          {selectedFamily && (
            <div>
              <div className="step-arrow-badge">
                <span style={{ fontSize: '1rem' }}>💜</span>
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
                      <span style={{ fontSize: '1.75rem' }}>{sub.icon}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isSel ? '#53389e' : '#4a3a2c', textAlign: 'center', lineHeight: 1.2 }}>
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
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6e6578', marginBottom: '0.5rem' }}>
                Specific nuance:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {selectedSubCategory.feelings.map((feeling) => {
                  const isSel = selectedFeeling?.id === feeling.id;
                  return (
                    <button
                      key={feeling.id}
                      onClick={() => { setSelectedFeeling(feeling); setIsFlipped(false); setResult(null); }}
                      style={{
                        padding: '0.4rem 0.85rem',
                        borderRadius: '9999px',
                        border: isSel ? '2px solid #7c5cbf' : '1px solid #eae2f5',
                        background: isSel ? '#efe8f8' : '#ffffff',
                        color: isSel ? '#53389e' : '#4a3a2c',
                        fontSize: '0.8rem',
                        fontWeight: 600,
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
          <div style={{ paddingTop: '0.5rem' }}>
            <button
              onClick={handleFlipMood}
              disabled={!selectedFeeling}
              className="flip-mood-button"
              id="flip-mood-btn"
            >
              <span>Flip My Mood</span>
              <span style={{ fontSize: '1.2rem' }}>✨</span>
            </button>
            {isFlipped && (
              <button
                onClick={handleClearSelection}
                style={{
                  display: 'block',
                  marginTop: '0.6rem',
                  background: 'none',
                  border: '1px solid #d4c4ed',
                  color: '#9b89b3',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                ↺ Start over
              </button>
            )}
            {showSevenDayOffer && (
              <div style={{ marginTop: '0.8rem', padding: '0.8rem', borderRadius: '12px', background: '#fff7ed', border: '1px solid #fed7aa', textAlign: 'center' }}>
                <strong style={{ display: 'block', color: '#9a3412', fontSize: '0.85rem' }}>You have 7 saved check-ins!</strong>
                <a href="#paid-pdf-section" style={{ color: '#b45309', fontSize: '0.8rem', fontWeight: 800 }}>
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
            <span style={{ fontSize: '1.5rem', color: '#e11d48' }}>♡</span>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#7a5c30',
              marginTop: '0.2rem',
              lineHeight: 1.2,
              padding: '0 0.5rem',
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
            style={{ animation: isAnimating ? 'resultSlideIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both' : undefined }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                flexShrink: 0
              }}>
                🧘
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#2d2638', lineHeight: 1.35 }}>
                60-sec action to get to a {isFlipped && result
                  ? result.targetMood.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2700-\u27BF]|[\uE000-\uF8FF]/g, '').trim().toLowerCase()
                  : 'peaceful'} mood
              </h4>
            </div>

            <div style={{ textAlign: 'center', color: '#e11d48', fontSize: '0.75rem', margin: '0.2rem 0 0.5rem 0' }}>♡</div>

            <p style={{ fontSize: '0.9rem', color: '#4a3a2c', lineHeight: 1.7, fontWeight: 500, marginBottom: '1rem' }}>
              {isFlipped && result
                ? result.actionText
                : 'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.'}
            </p>

            {/* Decorative leaf */}
            <svg style={{ position: 'absolute', bottom: '10px', right: '10px', opacity: 0.15, pointerEvents: 'none' }} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2d5a37" strokeWidth="1.5">
              <path d="M12 22C12 22 17 17 17 11C17 5 12 2 12 2C12 2 7 5 7 11C7 17 12 22 12 22Z"/>
              <path d="M12 22V2"/>
            </svg>

            {/* SAVE MY PROFILE button — spec §10 */}
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
              <div style={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid #f4eefc', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                <a href="#paid-pdf-section" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#b45309', textDecoration: 'underline' }}>
                  📘 Get 7-Day Personalised Plan ($7)
                </a>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ===== BOTTOM QUOTES BANNER ===== */}
      <div className="bottom-quotes-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span style={{ fontSize: '1.3rem', color: '#7c5cbf' }}>♡</span>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#4a3a2c' }}>Small shifts can change how you feel.</div>
            <div style={{ fontSize: '0.75rem', color: '#7c5cbf' }}>You&apos;ve got this.</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🍃</span>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#4a3a2c' }}>Be kind to yourself.</div>
            <div style={{ fontSize: '0.75rem', color: '#7c5cbf' }}>One choice at a time.</div>
          </div>
        </div>
      </div>

      {/* HISTORY MODAL */}
      {isHistoryOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>📜 Your Saved Check-ins</h3>
              <button onClick={() => setIsHistoryOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '340px', overflowY: 'auto' }}>
              {savedHistory.map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    <span style={{ color: '#c084fc', fontWeight: 600 }}>{item.primaryMood} → {item.specificFeeling}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399', marginBottom: '0.2rem' }}>Target: {item.targetMood}</div>
                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>&quot;{item.actionShown}&quot;</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveProfile={handleSaveProfileSubmit}
      />
    </div>
  );
}
