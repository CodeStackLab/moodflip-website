import React from 'react';

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', background: 'rgba(18,24,44,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2.5rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#f8fafc' }}>
        About MoodFlip
      </h1>

      <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        MoodFlip is a simple, intuitive self-reflection utility designed to help individuals move out of stuck emotional states through immediate, actionable 60-second steps.
      </p>

      {/* Explicit Non-Medical & Emergency Crisis Notice Box */}
      <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '14px', padding: '1.25rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f87171', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🚨</span> Important Notice: Not Therapy, Medical Advice, or Crisis Support
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#fca5a5', lineHeight: 1.6, marginBottom: '0.75rem' }}>
          MoodFlip is strictly a self-reflection tool. It is <strong>not therapy</strong>, <strong>not mental health treatment</strong>, and <strong>not medical advice</strong>.
        </p>
        <p style={{ fontSize: '0.88rem', color: '#fecaca', lineHeight: 1.6 }}>
          If you are experiencing a mental health emergency, crisis, or thoughts of self-harm, please reach out immediately to a licensed healthcare professional or call your local emergency crisis hotline (e.g. Call or Text <strong>988</strong> in North America or your local emergency services).
        </p>
      </div>

      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
        How MoodFlip Works
      </h2>
      <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '1rem' }}>
        Instead of asking you to type long free-form text or read overwhelming articles, MoodFlip utilizes visual, clickable choices based on the classic Feelings Wheel framework:
      </p>
      <ol style={{ color: '#cbd5e1', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
        <li>Choose your broad primary feeling family (Sad, Disgusted, Angry, Fearful, Bad).</li>
        <li>Pinpoint the specific underlying emotion from visual sub-tiles.</li>
        <li>Click <strong>Flip My Mood</strong> to receive a positive target state and a practical 60-second micro-action.</li>
      </ol>
    </div>
  );
}
