'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F5] text-[#1A143F] font-sans antialiased">
      <Header />

      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF5F6] via-[#FCF3E9] to-[#FDF8F5] border-b border-[#E4DAD7] py-14 sm:py-18 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EBF5] border border-[#E4DAD7] px-4 py-1 text-xs font-extrabold text-[#7464AC] uppercase tracking-wider shadow-2xs">
            🔒 Privacy &amp; Data Security
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1A143F] leading-tight">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-[#5C527A] font-medium max-w-xl mx-auto leading-relaxed">
            Your emotional journey is personal and private. Learn how MoodFlip protects your data, implements automatic 90-day deletion, and respects your privacy.
          </p>
          <div className="pt-1">
            <span className="text-xs text-[#7E7096] font-semibold bg-[#FEFAF8] px-3.5 py-1 rounded-full border border-[#E4DAD7]">
              Effective Date: May 15, 2026 &bull; Version 3.2
            </span>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">

        {/* 90-DAY DELETION HIGHLIGHT BANNER */}
        <div className="rounded-3xl border border-[#E4DAD7] bg-[#FCF3E9] p-6 sm:p-8 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-[#FEFAF8] border border-[#E4DAD7] flex items-center justify-center text-2xl text-[#7D8164] shrink-0">
            ⏳
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-[#1A143F]">
              Automatic 90-Day Inactive Data Deletion Policy
            </h3>
            <p className="text-xs sm:text-sm text-[#5C527A] leading-relaxed">
              To minimize unnecessary data retention, MoodFlip automatically deletes inactive user profiles, saved mood check-ins, and associated records after <strong>90 continuous days of inactivity</strong>. You can also manually delete your entire history at any time with one click.
            </p>
          </div>
        </div>

        {/* POLICY SECTIONS CONTAINER */}
        <div className="bg-[#FEFAF8] border border-[#E4DAD7] rounded-3xl p-6 sm:p-10 shadow-[0_10px_28px_rgba(26,20,63,0.03)] space-y-10">

          {/* Section 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#7464AC]">Section 1</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#1A143F]">
              1. Our Core Privacy Philosophy
            </h2>
            <p className="text-sm text-[#5C527A] leading-relaxed">
              At MoodFlip (operated at <em>moodflip.coach</em>), we believe that self-reflection and emotional wellbeing tools must be completely safe, transparent, and respectful. We do not build advertiser profiles, we do not track you across other websites, and <strong>we never sell or rent your personal data to third parties</strong>.
            </p>
          </div>

          <hr className="border-[#E4DAD7]" />

          {/* Section 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#7464AC]">Section 2</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#1A143F]">
              2. Information We Collect &amp; How It Is Gathered
            </h2>
            <div className="space-y-3 text-sm text-[#5C527A] leading-relaxed">
              <p>We collect only the minimum information necessary to provide our self-reflection service:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Anonymous Tool Usage:</strong> When you use the homepage Mood Tool without an account, your selections (mood, feeling, 60-second action) exist purely in your temporary browser session and are not linked to your identity.
                </li>
                <li>
                  <strong>Optional Account Creation:</strong> If you choose to save your check-ins or purchase the 7-Day Mindset Plan, we collect your name, email address, and account password (stored as cryptographic hashes).
                </li>
                <li>
                  <strong>Check-in Logs:</strong> Mood selections and timestamps you explicitly choose to save to your personal dashboard.
                </li>
                <li>
                  <strong>Payment Information:</strong> All financial transactions are processed directly by certified payment gateways (Stripe and PayPal). MoodFlip never stores your full credit card numbers or banking credentials on our servers.
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-[#E4DAD7]" />

          {/* Section 3 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#7464AC]">Section 3</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#1A143F]">
              3. 90-Day Automatic Inactivity Deletion
            </h2>
            <div className="space-y-3 text-sm text-[#5C527A] leading-relaxed">
              <p>
                In strict adherence to data minimization principles, our backend system monitors account activity timestamps (<code>last_active_at</code>).
              </p>
              <p>
                If an account records zero login or check-in activity for a period exceeding <strong>90 consecutive calendar days</strong>, the account and all associated mood history, timestamps, and preferences are automatically and permanently purged from our active database.
              </p>
            </div>
          </div>

          <hr className="border-[#E4DAD7]" />

          {/* Section 4 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#7464AC]">Section 4</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#1A143F]">
              4. Cookies and Local Storage
            </h2>
            <div className="space-y-3 text-sm text-[#5C527A] leading-relaxed">
              <p>
                MoodFlip uses only <strong>essential cookies and browser local storage</strong> required for the functionality of the tool:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Remembering your active login session so you do not have to sign in on every refresh.</li>
                <li>Caching your offline 60-second breathing timer preferences and local check-in progress.</li>
                <li>Saving your dark/light and accessibility preferences.</li>
              </ul>
              <p>We do not deploy cross-site tracking pixels, third-party advertising cookies, or invasive device fingerprinting.</p>
            </div>
          </div>

          <hr className="border-[#E4DAD7]" />

          {/* Section 5 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#7464AC]">Section 5</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#1A143F]">
              5. Your Rights: Export &amp; Permanent Deletion
            </h2>
            <div className="space-y-3 text-sm text-[#5C527A] leading-relaxed">
              <p>You have full ownership of your data at all times:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Export Your Data:</strong> You can download a complete copy of your saved check-in history in JSON format at any time from your <em>Profile &gt; Data &amp; Privacy</em> page.
                </li>
                <li>
                  <strong>Manual Instant Deletion:</strong> You can click &quot;Delete Data&quot; in your profile to immediately wipe all records without waiting for the 90-day inactivity cycle.
                </li>
                <li>
                  <strong>Right to Rectification:</strong> You can update your email, display name, and preferences directly in your profile settings.
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-[#E4DAD7]" />

          {/* Section 6 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#7464AC]">Section 6</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#1A143F]">
              6. Data Security &amp; Encryption Standards
            </h2>
            <p className="text-sm text-[#5C527A] leading-relaxed">
              We implement industry-standard 256-bit TLS/SSL encryption for all data in transit between your browser and our servers. User authentication tokens and passwords are encrypted using modern salted hashing algorithms.
            </p>
          </div>

          <hr className="border-[#E4DAD7]" />

          {/* Section 7 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#7464AC]">Section 7</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#1A143F]">
              7. Contact Our Privacy Team
            </h2>
            <p className="text-sm text-[#5C527A] leading-relaxed">
              If you have any questions about this Privacy Policy, your personal data, or wish to submit a data erasure request, please contact our team:
            </p>
            <div className="p-4 rounded-2xl bg-[#FDF8F5] border border-[#E4DAD7] text-xs sm:text-sm text-[#5C527A] space-y-1">
              <p><strong className="text-[#1A143F]">Email:</strong> <a href="mailto:support@moodflip.coach" className="text-[#7464AC] font-bold hover:underline">support@moodflip.coach</a></p>
              <p><strong className="text-[#1A143F]">Platform:</strong> MoodFlip (moodflip.coach)</p>
              <p><strong className="text-[#1A143F]">Response Window:</strong> 24 – 48 business hours</p>
            </div>
          </div>

        </div>

        {/* RELATED LEGAL LINKS */}
        <div className="flex items-center justify-center gap-6 text-xs font-extrabold text-[#5C527A] flex-wrap pt-2">
          <Link href="/terms" className="hover:text-[#7464AC] transition">Terms of Service →</Link>
          <Link href="/disclaimer" className="hover:text-[#7464AC] transition">Medical &amp; Safety Disclaimer →</Link>
          <Link href="/refund" className="hover:text-[#7464AC] transition">Refund Policy →</Link>
          <Link href="/contact" className="hover:text-[#7464AC] transition">Contact Support →</Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
