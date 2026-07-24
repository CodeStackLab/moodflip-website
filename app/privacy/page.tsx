import React from 'react';

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', background: 'rgba(18,24,44,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2.5rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
        Privacy Policy
      </h1>

      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        Last updated: July 2026
      </p>

      <section style={{ marginBottom: '1.5rem', color: '#cbd5e1', lineHeight: 1.7 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
          1. Optional Profile Creation & Data Storage
        </h2>
        <p>
          You can use the basic MoodFlip free tool completely anonymously without creating a profile. If you choose to create a voluntary profile, we store your email address, selected mood choices, dates of check-ins, actions shown, and purchase history to generate your personalized 7-day or 30-day PDF plans.
        </p>
      </section>

      {/* Automatic 90-Day Deletion Policy */}
      <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#818cf8', marginBottom: '0.5rem' }}>
          🧹 Automatic 90-Day Inactive Profile Deletion
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6 }}>
          To respect your privacy and minimize unnecessary data retention, MoodFlip enforces an <strong>automatic 90-day deletion policy</strong>. Any user profile that remains inactive for 90 consecutive days will have its profile information and associated mood check-in history permanently deleted from our database.
        </p>
      </div>

      <section style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
          2. Cookies & Advertising
        </h2>
        <p>
          We use local browser storage to track repeat visits so we can personalize your experience. We may display Google AdSense advertisements on our site. Third-party vendors, including Google, use cookies to serve ads based on user visits.
        </p>
      </section>
    </div>
  );
}
