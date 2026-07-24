'use client';

import React, { useState, useEffect } from 'react';
import { MOOD_DATA, getActionForFeeling, MoodFamily, FeelingDetail } from '../lib/moodData';
import CloudVector from './CloudVector';
import ProfileModal from './ProfileModal';

interface SavedCheckin {
  primaryMood: string;
  subFeeling: string;
  specificFeeling: string;
  targetMood: string;
  actionShown: string;
  date: string;
}

export default function MoodTool() {
  const [selectedFamily, setSelectedFamily] = useState<MoodFamily | null>(MOOD_DATA[0]);
  const [selectedSubId, setSelectedSubId] = useState<string | null>(MOOD_DATA[0].subCategories[0].id);
  const [selectedFeeling, setSelectedFeeling] = useState<FeelingDetail | null>(MOOD_DATA[0].subCategories[0].feelings[0]);

  const [result, setResult] = useState<{ targetMood: string; actionText: string; actionIndex: number } | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const [visitCount, setVisitCount] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [savedHistory, setSavedHistory] = useState<SavedCheckin[]>([]);
  const [userProfile, setUserProfile] = useState<{ email: string; name?: string } | null>(null);

  useEffect(() => {
    const savedVisits = parseInt(localStorage.getItem('moodflip_visit_count') || '0', 10) + 1;
    localStorage.setItem('moodflip_visit_count', savedVisits.toString());
    setVisitCount(savedVisits);

    if (savedVisits === 2) {
      setTimeout(() => {
        setIsModalOpen(true);
      }, 1200);
    }

    const savedProfile = localStorage.getItem('moodflip_profile');
    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (e) {}
    }

    const history = JSON.parse(localStorage.getItem('moodflip_checkins') || '[]');
    setSavedHistory(history);
  }, []);

  const handleFlipMood = () => {
    if (!selectedFeeling) return;
    const flipped = getActionForFeeling(selectedFeeling.id, visitCount);
    setResult({ ...flipped, actionIndex: (visitCount % 10) + 1 });
    setIsFlipped(true);

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
  };

  const handleClearSelection = () => {
    setSelectedFamily(MOOD_DATA[0]);
    setSelectedSubId(MOOD_DATA[0].subCategories[0].id);
    setSelectedFeeling(MOOD_DATA[0].subCategories[0].feelings[0]);
    setIsFlipped(false);
    setResult(null);
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

  const selectedSubCategory = selectedFamily ? selectedFamily.subCategories.find(s => s.id === selectedSubId) : null;

  return (
    <div>
      {/* Action Bar Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.82rem', color: '#7c5cbf', fontWeight: 700 }}>
            🔄 Action Rotation Active: Visit #{visitCount}
          </span>
          {userProfile && (
            <span style={{ fontSize: '0.78rem', color: '#059669', background: '#e6f4ea', padding: '0.2rem 0.75rem', borderRadius: '9999px', fontWeight: 600 }}>
              👤 Profile: {userProfile.email}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              background: '#efe8f8',
              border: '1px solid #d4c4ed',
              color: '#6346a7',
              padding: '0.4rem 0.95rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ✨ {visitCount === 2 ? '2nd Visit Pop-up Active' : 'Create Profile'}
          </button>

          {savedHistory.length > 0 && (
            <button
              onClick={() => setIsHistoryOpen(true)}
              style={{
                background: '#ffffff',
                border: '1px solid #e2d7f5',
                color: '#4a3a2c',
                padding: '0.4rem 0.95rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              📜 Saved Check-ins ({savedHistory.length})
            </button>
          )}
        </div>
      </div>

      {/* Main Split Canvas */}
      <div className="moodflip-canvas">
        {/* Left Selection Side */}
        <div className="left-selection-panel">
          <div>
            {/* Step 1 */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div className="step-arrow-badge">
                <span>☁️</span>
                <span>Choose your current mood</span>
              </div>

              <div className="cloud-grid">
                {MOOD_DATA.map((family) => {
                  const isSel = selectedFamily ? selectedFamily.id === family.id : false;
                  return (
                    <button
                      key={family.id}
                      onClick={() => {
                        setSelectedFamily(family);
                        setSelectedSubId(family.subCategories[0].id);
                        setSelectedFeeling(family.subCategories[0].feelings[0]);
                        setIsFlipped(false);
                      }}
                      className={`cloud-pill-card ${isSel ? 'selected' : ''}`}
                    >
                      <CloudVector type={family.id} color={isSel ? '#7c5cbf' : '#9b89b3'} />
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: isSel ? '#53389e' : '#5c5268', marginTop: '0.3rem' }}>
                        {family.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 */}
            {selectedFamily && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div className="step-arrow-badge">
                  <span>💜</span>
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
                        }}
                        className={`feeling-square-tile ${isSel ? 'selected' : ''}`}
                      >
                        <span style={{ fontSize: '1.75rem' }}>{sub.icon}</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isSel ? '#53389e' : '#4a3a2c' }}>
                          {sub.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Specific Feeling Options */}
            {selectedSubCategory && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#6e6578', marginBottom: '0.5rem' }}>
                  Specific feeling nuance:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {selectedSubCategory.feelings.map((feeling) => {
                    const isSel = selectedFeeling ? selectedFeeling.id === feeling.id : false;
                    return (
                      <button
                        key={feeling.id}
                        onClick={() => {
                          setSelectedFeeling(feeling);
                          setIsFlipped(false);
                        }}
                        style={{
                          padding: '0.5rem 0.9rem',
                          borderRadius: '12px',
                          border: isSel ? '2px solid #7c5cbf' : '1px solid #eae2f5',
                          background: isSel ? '#efe8f8' : '#ffffff',
                          color: isSel ? '#53389e' : '#4a3a2c',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
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

            {/* Clear Selection Tile */}
            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={handleClearSelection}
                style={{
                  background: '#fcfbfe',
                  border: '1.5px solid #eae2f5',
                  borderRadius: '18px',
                  padding: '0.75rem 1.25rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  cursor: 'pointer',
                  color: '#6e6578'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>🗑️</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>Clear selection</div>
                  <div style={{ fontSize: '0.72rem', color: '#9b89b3' }}>Start over</div>
                </div>
              </button>
            </div>
          </div>

          {/* Center Action Arrow Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleFlipMood}
              disabled={!selectedFeeling}
              className="center-arrow-button"
            >
              <span>Change My Mood</span>
              <span style={{ fontSize: '1.3rem' }}>➔</span>
            </button>
          </div>
        </div>

        {/* Right Sun Panel */}
        <div className="right-sun-panel">
          <div className="sun-rays-bg" />

          {isFlipped && result ? (
            <div style={{ animation: 'fadeIn 0.5s ease', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Rising Sun Element */}
              <div className="rising-sun-element">
                <span style={{ fontSize: '2rem', color: '#e11d48' }}>♡</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#6e563b', letterSpacing: '0.02em', marginTop: '0.35rem' }}>
                  Your mood has changed to:
                </span>
              </div>

              {/* Huge Serif Target Title */}
              <h2 className="serif-target-title" style={{ color: '#2d5a37', marginBottom: '1.5rem' }}>
                {result.targetMood}
              </h2>

              {/* White Action Card with Decorative Branch */}
              <div className="action-white-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.85rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    🧘
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2d2638', lineHeight: 1.3 }}>
                      60-sec action to get to a {result.targetMood.toLowerCase()} mood
                    </h4>
                    <span style={{ fontSize: '0.7rem', color: '#7c5cbf', fontWeight: 700 }}>
                      Action #{result.actionIndex} of 10
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'center', color: '#e11d48', fontSize: '0.8rem', margin: '0.25rem 0 0.5rem 0' }}>♡</div>

                <p style={{ fontSize: '0.98rem', color: '#4a3a2c', lineHeight: 1.65, fontWeight: 500, marginBottom: '1.25rem' }}>
                  &quot;{result.actionText}&quot;
                </p>

                {/* Decorative Leaf Branch SVG on bottom-right */}
                <svg style={{ position: 'absolute', bottom: '12px', right: '12px', opacity: 0.25, pointerEvents: 'none' }} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#2d5a37" strokeWidth="1.5">
                  <path d="M12 22C12 22 17 17 17 11C17 5 12 2 12 2C12 2 7 5 7 11C7 17 12 22 12 22Z" />
                  <path d="M12 22V2" />
                </svg>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f4eefc', paddingTop: '0.85rem' }}>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#7c5cbf',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    💾 Save to Profile
                  </button>

                  <a
                    href="#paid-pdf-section"
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#b45309',
                      textDecoration: 'underline'
                    }}
                  >
                    Get 7-Day Plan ($7)
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="rising-sun-element">
                <span style={{ fontSize: '2rem', color: '#e11d48' }}>♡</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#6e563b', marginTop: '0.35rem' }}>
                  Your mood has changed to:
                </span>
              </div>
              <h2 className="serif-target-title" style={{ color: '#2d5a37', fontSize: '3.6rem', marginBottom: '1.25rem' }}>
                Peaceful
              </h2>

              {/* Sample White Action Box */}
              <div className="action-white-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    🧘
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2d2638' }}>
                      60-sec action to get to a peaceful mood
                    </h4>
                  </div>
                </div>

                <div style={{ textAlign: 'center', color: '#e11d48', fontSize: '0.8rem', margin: '0.25rem 0 0.5rem 0' }}>♡</div>

                <p style={{ fontSize: '0.95rem', color: '#4a3a2c', lineHeight: 1.6, fontWeight: 500 }}>
                  Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.
                </p>

                {/* Decorative Leaf Branch SVG */}
                <svg style={{ position: 'absolute', bottom: '12px', right: '12px', opacity: 0.25, pointerEvents: 'none' }} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#2d5a37" strokeWidth="1.5">
                  <path d="M12 22C12 22 17 17 17 11C17 5 12 2 12 2C12 2 7 5 7 11C7 17 12 22 12 22Z" />
                  <path d="M12 22V2" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Quotes Banner */}
      <div className="bottom-quotes-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.4rem', color: '#7c5cbf' }}>♡</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#4a3a2c' }}>Small shifts can change how you feel.</div>
            <div style={{ fontSize: '0.78rem', color: '#7c5cbf' }}>You&apos;ve got this.</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.4rem' }}>🍃</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#4a3a2c' }}>Be kind to yourself.</div>
            <div style={{ fontSize: '0.78rem', color: '#7c5cbf' }}>One choice at a time.</div>
          </div>
        </div>
      </div>

      {/* Saved History Modal Drawer */}
      {isHistoryOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>📜 Your Saved Check-ins</h3>
              <button
                onClick={() => setIsHistoryOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '350px', overflowY: 'auto' }}>
              {savedHistory.map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                    <span>{new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span style={{ color: '#c084fc', fontWeight: 600 }}>{item.primaryMood} ➔ {item.specificFeeling}</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#34d399', marginBottom: '0.2rem' }}>
                    Target: {item.targetMood}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                    &quot;{item.actionShown}&quot;
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2nd Visit Profile Modal */}
      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveProfile={handleSaveProfileSubmit}
      />
    </div>
  );
}
