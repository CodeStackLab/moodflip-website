import type { Metadata } from 'next';
import PageFrame from '@/components/PageFrame';

export const metadata: Metadata = { title: 'Privacy Policy | MoodFlip', description: 'How MoodFlip handles account, check-in, purchase, and activity data.' };

export default function PrivacyPage() {
  return (
    <PageFrame eyebrow="Privacy, in plain language" title="Your emotions are personal. Your data should be, too." intro="You can use the core MoodFlip tool without creating an account. When you choose to save progress, we keep the data limited and purposeful." narrow>
      <p className="mf-updated">Last updated: July 2026</p>
      <section className="mf-prose-section"><h2>1. What we store</h2><p>If you voluntarily create a profile or purchase a personalized plan, MoodFlip may store:</p><ul><li>Your email address for account access and plan delivery</li><li>Selected moods, check-in dates, and actions shown</li><li>Purchase and eligibility status</li><li>Your last-active timestamp and check-in count</li></ul></section>
      <aside className="mf-callout"><span>90-day promise</span><div><h2>Automatic inactivity deletion</h2><p>After 90 consecutive days without a login or check-in, your profile and associated check-in records are scheduled for permanent deletion. This reduces unnecessary retention of personal data.</p></div></aside>
      <section className="mf-prose-section"><h2>2. Anonymous use and local storage</h2><p>The interactive mood tool works without a profile. We may use your browser’s local storage for on-device visit preferences, check-in progress, theme, and language choices.</p></section>
      <section className="mf-prose-section"><h2>3. Payments, email, and advertising</h2><p>Payments are processed by Stripe; MoodFlip does not store complete card details. Transactional providers may process the minimum information needed to deliver a purchased plan. If advertising is introduced, third-party networks may use cookies subject to your browser and consent settings.</p></section>
      <section className="mf-prose-section"><h2>4. Questions or requests</h2><p>For privacy questions or an account-data request, use our <a href="/contact">contact form</a>. We may need to verify account ownership before completing a request.</p></section>
    </PageFrame>
  );
}
