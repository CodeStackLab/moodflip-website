'use client';

import React, { useState, useEffect } from 'react';
import PaidPlansSection from '@/components/PaidPlansSection';

/* ── FAMILY COLORS ── */
const FAMILY_COLORS: Record<string, string> = {
  Sad: '#5B7FDE',
  Fearful: '#9B6BDE',
  Angry: '#FF6B6B',
  Disgusted: '#5FA96B',
  Stressed: '#FFA94D'
};

/* ── MOOD DATA MAP ── */
const MOOD_DATA_MAP: Record<string, Record<string, { target: string; action: string }>> = {
  Sad: {
    Lonely: { target: 'Connected', action: 'Send one short message to someone you trust. Just say hi.' },
    Rejected: { target: 'Grounded', action: 'Name three things around you that are solid and real.' },
    Hurt: { target: 'Comforted', action: 'Place a hand on your chest and take five slow breaths.' },
    Ashamed: { target: 'Accepted', action: 'Say to yourself: I am doing my best with what I know right now.' },
    Guilty: { target: 'Forgiving', action: 'Write the one thing you would say to a friend in your position.' },
    Empty: { target: 'Nourished', action: 'Drink a full glass of water, slowly, without doing anything else.' },
    Overwhelmed: { target: 'Peaceful', action: 'Breathe in for 4, out for 6. Repeat six times.' },
    Abandoned: { target: 'Held', action: 'Wrap your arms around yourself and press gently for 10 seconds.' }
  },
  Fearful: {
    Anxious: { target: 'Steady', action: 'Plant both feet flat on the floor and press down for 10 seconds.' },
    Worried: { target: 'Reassured', action: 'Write down the worry, then write one thing within your control.' },
    Insecure: { target: 'Confident', action: 'Stand tall, shoulders back, for 20 seconds before your next task.' },
    Nervous: { target: 'Calm', action: 'Shake out your hands for 10 seconds, then let them go loose.' }
  },
  Angry: {
    Frustrated: { target: 'Clear-headed', action: 'Unclench your jaw and drop your shoulders. Exhale hard once.' },
    Irritated: { target: 'Patient', action: 'Step away for 60 seconds before you respond to anything.' },
    Resentful: { target: 'Released', action: 'Name what you needed and did not get, out loud, once.' },
    Provoked: { target: 'Composed', action: 'Press your tongue to the roof of your mouth and count to 20.' }
  },
  Disgusted: {
    Disapproving: { target: 'Open', action: 'Ask yourself one honest question: what am I not seeing?' },
    Judgmental: { target: 'Understanding', action: 'Picture one reason someone might act this way.' },
    Repulsed: { target: 'Neutral', action: 'Look away for 30 seconds and focus on something plain.' }
  },
  Stressed: {
    Overworked: { target: 'Rested', action: 'Close your eyes and roll your shoulders back five times.' },
    Pressured: { target: 'In control', action: 'List the next single step. Only the next one.' },
    Rushed: { target: 'Unhurried', action: 'Take one breath before you open the next tab or message.' },
    Tense: { target: 'Loose', action: 'Shrug your shoulders to your ears, hold, then drop them fully.' }
  }
};

const FAMILY_NAMES = Object.keys(MOOD_DATA_MAP);

export default function MoodTool() {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [flipResult, setFlipResult] = useState<{ target: string; action: string } | null>(null);
  const [animating, setAnimating] = useState(false);

  const [visitCount, setVisitCount] = useState<number>(1);
  const [show2nd, setShow2nd] = useState(false);
  const [show7th, setShow7th] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const v = parseInt(localStorage.getItem('moodflip_visit_count') || '0', 10) + 1;
    localStorage.setItem('moodflip_visit_count', String(v));
    setVisitCount(v);

    const hasProfile = localStorage.getItem('moodflip_profile');
    if (v === 2 && !hasProfile && !localStorage.getItem('moodflip_2nd_visit_dismissed')) {
      setShow2nd(true);
    }
  }, []);

  const handlePickFamily = (family: string) => {
    setSelectedFamily(family);
    setSelectedFeeling(null);
    setFlipResult(null);
  };

  const handlePickFeeling = async (feeling: string) => {
    if (!selectedFamily) return;
    setSelectedFeeling(feeling);
    setAnimating(true);

    const baseEntry = MOOD_DATA_MAP[selectedFamily][feeling];
    let finalEntry = baseEntry;

    // Optional AI enhancement call if configured
    try {
      const res = await fetch('/api/ai/flip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ primaryMood: selectedFamily, subFeeling: feeling, specificFeeling: feeling, visitCount })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.targetMood && data.actionText) {
          finalEntry = { target: data.targetMood, action: data.actionText };
        }
      }
    } catch (_) {}

    setTimeout(() => {
      setFlipResult(finalEntry);
      setAnimating(false);
    }, 100);

    // Save checkin in localStorage
    if (typeof window !== 'undefined') {
      const history = JSON.parse(localStorage.getItem('moodflip_checkins') || '[]');
      const count = history.length + 1;
      localStorage.setItem('moodflip_checkins', JSON.stringify([
        { primaryMood: selectedFamily, subFeeling: feeling, specificFeeling: feeling, targetMood: finalEntry.target, actionShown: finalEntry.action, date: new Date().toLocaleDateString() },
        ...history
      ]));
      if (count >= 7 && !localStorage.getItem('moodflip_7th_offer_shown')) {
        setShow7th(true);
        localStorage.setItem('moodflip_7th_offer_shown', 'true');
      }
    }
  };

  const handleReset = () => {
    setSelectedFamily(null);
    setSelectedFeeling(null);
    setFlipResult(null);
  };

  const currentFamilyColor = selectedFamily ? FAMILY_COLORS[selectedFamily] : '#6C5CE7';
  const feelingsList = selectedFamily ? Object.keys(MOOD_DATA_MAP[selectedFamily]) : [];

  return (
    <div className="demo" id="demo">
      {/* STEP 1 */}
      <div className="demo-step">
        <span className="step-label">01 — Pick a mood family</span>
        <div className="chip-row">
          {FAMILY_NAMES.map((f) => {
            const isSelected = selectedFamily === f;
            return (
              <button
                key={f}
                className={`chip ${isSelected ? 'selected' : ''}`}
                style={isSelected ? { background: FAMILY_COLORS[f], borderColor: 'transparent' } : {}}
                onClick={() => handlePickFamily(f)}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2 */}
      <div className="demo-step">
        <span className="step-label">02 — Narrow it down</span>
        <div className="chip-row">
          {!selectedFamily ? (
            <span style={{ fontFamily: 'var(--mono)', fontSize: '12.5px', color: 'var(--ink-soft)' }}>
              Choose a mood family first
            </span>
          ) : (
            feelingsList.map((feel) => {
              const isSelected = selectedFeeling === feel;
              return (
                <button
                  key={feel}
                  className={`chip ${isSelected ? 'selected' : ''}`}
                  style={isSelected ? { background: currentFamilyColor, borderColor: 'transparent' } : {}}
                  onClick={() => handlePickFeeling(feel)}
                >
                  {feel}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* STEP 3 */}
      <div className="demo-step">
        <span className="step-label">03 — Your flip</span>
        <div className="flip-target">
          {/* Animated 3D Flip Tiles */}
          <div className="flip-board">
            {flipResult && (
              flipResult.target.toUpperCase().split('').map((char, index) => (
                <div
                  key={index + '-' + char}
                  className={`flip-tile ${char === ' ' ? 'space' : ''}`}
                  style={{
                    background: char === ' ' ? 'transparent' : currentFamilyColor,
                    animationDelay: `${index * 0.045}s`
                  }}
                >
                  {char === ' ' ? '' : char}
                </div>
              ))
            )}
          </div>

          {/* Action Card */}
          {flipResult && (
            <div className={`action-card ${flipResult ? 'show' : ''}`}>
              <span className="eyebrow">60-sec action</span>
              <p>{flipResult.action}</p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="demo-foot">
        <button className="reset-link" onClick={handleReset}>
          Clear selection — start over
        </button>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11.5px', color: 'var(--ink-soft)' }}>
          🔒 Nothing you tap here is saved
        </span>
      </div>

      {/* MODAL 2ND VISIT */}
      {show2nd && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(51,40,63,0.5)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            background: 'var(--paper)', borderRadius: '20px', padding: '32px',
            maxWidth: '480px', width: '100%', border: '1px solid var(--line)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: '24px', marginBottom: '12px' }}>
              Welcome back to MoodFlip!
            </h3>
            <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '20px' }}>
              Save your check-ins and receive personalized 7-day and 30-day mindset plans.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                className="btn btn-ghost"
                onClick={() => { setShow2nd(false); localStorage.setItem('moodflip_2nd_visit_dismissed', 'true'); }}
              >
                Continue Free
              </button>
              <a href="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                Create Profile
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 7TH VISIT */}
      {show7th && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(51,40,63,0.5)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            background: 'var(--paper)', borderRadius: '20px', padding: '32px',
            maxWidth: '560px', width: '100%', border: '1px solid var(--line)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)', position: 'relative'
          }}>
            <button
              onClick={() => setShow7th(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--ink-soft)' }}
            >
              ✕
            </button>
            <span className="eyebrow" style={{ color: 'var(--sage)', marginBottom: '8px' }}>🎉 7 Check-Ins Milestone</span>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: '24px', marginBottom: '12px' }}>
              Get Your Personal 7-Day Mindset Plan ($7)
            </h3>
            <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '20px' }}>
              Download your custom 7-day PDF roadmap generated from your exact check-in history.
            </p>
            <PaidPlansSection />
          </div>
        </div>
      )}
    </div>
  );
}
