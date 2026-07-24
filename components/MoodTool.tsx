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
  const [, setUserProfile] = useState<{ email: string; name?: string } | null>(null);

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
      primaryMood: selectedFamily?.name || 'SAD',
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
      {/* Top Banner Bar for Returning Visitors */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', padding: '0 0.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: 600 }}>
          🔄 Action Rotation Active: Visit #{visitCount}
        </div>

        {savedHistory.length > 0 && (
          <button
            onClick={() => setIsHistoryOpen(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#cbd5e1',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            📜 Saved Check-ins ({savedHistory.length})
          </button>
        )}
      </div>

      <div className="moodflip-container">
        {/* Left Panel */}
        <div className="left-dark-panel">
          <div>
            {/* Step 1 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0' }}>Step 1: Choose Mood Family</h3>
                <span style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 600 }}>Clickable Cloud Tiles</span>
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
                      className={`cloud-card ${isSel ? 'selected' : ''}`}
                    >
                      <CloudVector type={family.id} color={family.cloudColor} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: family.cloudColor, marginTop: '0.2rem' }}>
                        {family.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 */}
            {selectedFamily ? (
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '0.5rem' }}>
                  Step 2: How does {selectedFamily.name} feel?
                </h3>
                <div className="sub-category-grid">
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
                        className={`feeling-tile ${isSel ? 'selected' : ''}`}
                      >
                        <span style={{ fontSize: '1.2rem' }}>{sub.icon}</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{sub.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Step 3 */}
            {selectedSubCategory ? (
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '0.5rem' }}>
                  Step 3: Select Specific Feeling
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
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
                          padding: '0.55rem 0.9rem',
                          borderRadius: '12px',
                          border: isSel ? '2px solid #a855f7' : '1px solid rgba(255,255,255,0.1)',
                          background: isSel ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255,255,255,0.03)',
                          color: 'white',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        <span>{feeling.icon}</span>
                        <span>{feeling.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          {/* Step 4: Pulsing Center Flip Button */}
          <div style={{ marginTop: '1.5rem' }}>
            <button
              onClick={handleFlipMood}
              disabled={!selectedFeeling}
              className="flip-action-button"
            >
              ✨ Flip My Mood
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-sun-panel">
          <div className="sun-rays" />

          <div className="action-card-sun">
            {isFlipped && result ? (
              <div style={{ animation: 'fadeIn 0.5s ease' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem' }}>☀️</span>

                <div style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#92400e', marginBottom: '0.25rem' }}>
                  Your Positive Target Mood Is:
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#78350f', marginBottom: '1rem' }}>
                  {result.targetMood}
                </h2>

                <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '16px', padding: '1.1rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b45309' }}>⚡ YOUR 60-SECOND ACTION:</span>
                    <span style={{ fontSize: '0.68rem', background: '#fde68a', color: '#92400e', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
                      Action #{result.actionIndex} of 10
                    </span>
                  </div>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: '#451a03', lineHeight: 1.5 }}>
                    &quot;{result.actionText}&quot;
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      borderRadius: '12px',
                      border: 'none',
                      background: '#78350f',
                      color: '#fffbe6',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(120, 53, 15, 0.25)'
                    }}
                  >
                    💾 SAVE MY PROFILE
                  </button>

                  <a
                    href="#paid-pdf-section"
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#92400e',
                      textDecoration: 'underline'
                    }}
                  >
                    Get Personalised 7-Day MoodFlip PDF ($7)
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ padding: '1.5rem 0.5rem' }}>
                <span style={{ fontSize: '3rem', display: 'block', opacity: 0.8, marginBottom: '0.5rem' }}>🌅</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#78350f', marginBottom: '0.5rem' }}>
                  Ready to Shift Your State?
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#92400e', lineHeight: 1.6 }}>
                  Select your current mood on the left panel and click the <strong>&quot;Flip My Mood&quot;</strong> button to unlock your uplifting positive target state and 60-second micro-action.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Saved History Modal Drawer for Profile Users */}
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
                    <span style={{ color: '#818cf8', fontWeight: 600 }}>{item.primaryMood} ➔ {item.specificFeeling}</span>
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
