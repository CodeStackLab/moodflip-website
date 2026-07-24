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

// Simple inline SVG icons for each sub-category feeling tile
const FeelingIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    // Sad family
    'Lonely': (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
        <circle cx="20" cy="14" r="7"/>
        <path d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12"/>
        <path d="M15 31 Q20 35 25 31" strokeLinecap="round"/>
      </svg>
    ),
    'Rejected': (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
        <circle cx="20" cy="20" r="12"/>
        <path d="M15 17 Q20 23 25 17" strokeLinecap="round"/>
        <circle cx="15" cy="15" r="1.5" fill="currentColor"/>
        <circle cx="25" cy="15" r="1.5" fill="currentColor"/>
        <path d="M13 13 l4-4 M27 13 l-4-4" strokeLinecap="round"/>
      </svg>
    ),
    'Hurt': (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
        <path d="M20 34 L8 22 C5 18 5 13 9 10 C13 7 17 9 20 13 C23 9 27 7 31 10 C35 13 35 18 32 22 Z"/>
        <path d="M20 34 L20 20 M17 25 L23 15" strokeLinecap="round"/>
      </svg>
    ),
    'Ashamed': (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
        <circle cx="20" cy="14" r="7"/>
        <path d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12"/>
        <path d="M16 20 Q20 18 24 20" strokeLinecap="round"/>
        <path d="M13 10 Q15 7 18 9" strokeLinecap="round"/>
      </svg>
    ),
    'Guilty': (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
        <path d="M20 6 L22 16 L32 16 L24 22 L27 32 L20 26 L13 32 L16 22 L8 16 L18 16 Z"/>
      </svg>
    ),
    'Empty': (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
        <circle cx="20" cy="20" r="13"/>
        <circle cx="15" cy="17" r="1.5"/>
        <circle cx="25" cy="17" r="1.5"/>
        <path d="M15 25 h10" strokeLinecap="round"/>
      </svg>
    ),
    'Overwhelmed': (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
        <circle cx="20" cy="20" r="10"/>
        <path d="M14 28 Q20 24 26 28" strokeLinecap="round"/>
        <path d="M12 10 Q16 6 20 8 Q24 6 28 10" strokeLinecap="round"/>
        <path d="M10 16 Q8 20 10 24" strokeLinecap="round"/>
        <path d="M30 16 Q32 20 30 24" strokeLinecap="round"/>
      </svg>
    ),
    'Abandoned': (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
        <circle cx="20" cy="13" r="7"/>
        <path d="M8 36c0-6.627 5.373-12 12-12"/>
        <path d="M30 22 L38 22 M34 18 L38 22 L34 26" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icons[name] || (
        <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
          <circle cx="20" cy="20" r="12"/>
        </svg>
      )}
    </span>
  );
};

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

  const selectedSubCategory = selectedFamily
    ? selectedFamily.subCategories.find(s => s.id === selectedSubId)
    : null;

  return (
    <div>
      {/* Utility bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '0.75rem', gap: '0.5rem', flexWrap: 'wrap' }}>
        {userProfile && (
          <span style={{ fontSize: '0.78rem', color: '#059669', background: '#e6f4ea', padding: '0.2rem 0.75rem', borderRadius: '9999px', fontWeight: 600 }}>
            👤 {userProfile.email}
          </span>
        )}
        <button
          onClick={() => setIsModalOpen(true)}
          style={{ background: '#efe8f8', border: '1px solid #d4c4ed', color: '#6346a7', padding: '0.35rem 0.9rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
        >
          ✨ Create Profile
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

          {/* STEP 1 — Choose mood family (cloud pills in a row) */}
          <div>
            <div className="step-arrow-badge">
              <span style={{ fontSize: '1rem' }}>☁️</span>
              <span>Choose your current mood</span>
            </div>
            <div className="cloud-grid">
              {MOOD_DATA.map((family) => {
                const isSel = selectedFamily?.id === family.id;
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
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: family.cloudColor, display: 'inline-block', flexShrink: 0, opacity: isSel ? 1 : 0.6 }} />
                    <span>{family.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2 — Pick feeling closest (square icon tiles) */}
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
                      }}
                      className={`feeling-square-tile ${isSel ? 'selected' : ''}`}
                    >
                      <span style={{ color: isSel ? '#7c5cbf' : '#9b89b3' }}>
                        <FeelingIcon name={sub.name} />
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isSel ? '#53389e' : '#4a3a2c' }}>
                        {sub.name}
                      </span>
                    </div>
                  );
                })}

                {/* Clear Selection tile — last in the grid */}
                <div
                  onClick={handleClearSelection}
                  className="feeling-square-tile"
                  style={{ cursor: 'pointer', opacity: 0.65 }}
                >
                  <span style={{ fontSize: '1.5rem', color: '#9b89b3' }}>🗑️</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6e6578' }}>Clear selection</span>
                  <span style={{ fontSize: '0.65rem', color: '#9b89b3' }}>Start over</span>
                </div>
              </div>
            </div>
          )}

          {/* Specific nuance pills (optional) */}
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
                      onClick={() => { setSelectedFeeling(feeling); setIsFlipped(false); }}
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '9999px',
                        border: isSel ? '2px solid #7c5cbf' : '1px solid #eae2f5',
                        background: isSel ? '#efe8f8' : '#ffffff',
                        color: isSel ? '#53389e' : '#4a3a2c',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {feeling.icon} {feeling.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* CHANGE MY MOOD → button */}
          <div style={{ paddingTop: '0.5rem' }}>
            <button
              onClick={handleFlipMood}
              disabled={!selectedFeeling}
              className="center-arrow-button"
            >
              <span>Change My Mood</span>
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </button>
          </div>

        </div>

        {/* ===== RIGHT SUN PANEL ===== */}
        <div className="right-sun-panel">
          <div className="sun-rays-bg" />

          {/* Rising Sun Semicircle with heart + text */}
          <div className="rising-sun-element" style={{ zIndex: 1 }}>
            <span style={{ fontSize: '1.5rem', color: '#e11d48' }}>♡</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7a5c30', marginTop: '0.2rem', lineHeight: 1.2, padding: '0 0.5rem', textAlign: 'center' }}>
              Your mood has changed to:
            </span>
          </div>

          {/* Target mood title */}
          <h2 className="serif-target-title">
            {isFlipped && result ? result.targetMood : 'Peaceful'}
          </h2>

          {/* Action card */}
          <div className="action-white-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
                🧘
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#2d2638', lineHeight: 1.35 }}>
                60-sec action to get to a {isFlipped && result ? result.targetMood.toLowerCase() : 'peaceful'} mood
              </h4>
            </div>

            <div style={{ textAlign: 'center', color: '#e11d48', fontSize: '0.75rem', margin: '0.2rem 0 0.5rem 0' }}>♡</div>

            <p style={{ fontSize: '0.9rem', color: '#4a3a2c', lineHeight: 1.65, fontWeight: 500 }}>
              {isFlipped && result
                ? result.actionText
                : 'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.'}
            </p>

            {/* Decorative leaf */}
            <svg style={{ position: 'absolute', bottom: '10px', right: '10px', opacity: 0.18, pointerEvents: 'none' }} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2d5a37" strokeWidth="1.5">
              <path d="M12 22C12 22 17 17 17 11C17 5 12 2 12 2C12 2 7 5 7 11C7 17 12 22 12 22Z"/>
              <path d="M12 22V2"/>
            </svg>

            {isFlipped && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f4eefc', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                <button
                  onClick={() => setIsModalOpen(true)}
                  style={{ background: 'none', border: 'none', color: '#7c5cbf', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  💾 Save to Profile
                </button>
                <a href="#paid-pdf-section" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#b45309', textDecoration: 'underline' }}>
                  Get 7-Day Plan ($7)
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

      {/* ===== HISTORY MODAL ===== */}
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
