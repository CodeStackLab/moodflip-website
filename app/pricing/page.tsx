import PageFrame from '@/components/PageFrame';
import PaidPlansSection from '@/components/PaidPlansSection';

export const metadata = {
  title: 'Pricing & Plans | MoodFlip',
  description: 'Use MoodFlip free. Unlock an optional personalized 7-Day Mindset Plan for a one-time $7 payment.'
};

const faqs = [
  ['Can I use MoodFlip without paying?', 'Yes. The mood tool is free and does not require an account.'],
  ['What is included in the $7 plan?', 'A printable 7-day roadmap based on your eligible saved check-ins, with varied daily micro-actions.'],
  ['Is this a subscription?', 'No. The $7 plan is a one-time purchase, not a recurring subscription.'],
  ['How is my information handled?', 'Only the information needed for your account, check-ins, payment status, and delivery is used. See our Privacy Policy for details.'],
];

export default function PricingPage() {
  return (
    <PageFrame eyebrow="Simple, transparent pricing" title="Start free. Go deeper when it feels useful." intro="The everyday MoodFlip experience stays free. A personalized plan is an optional one-time purchase—no subscription pressure.">
      <div className="mf-price-summary">
        <article>
          <span>Everyday tool</span><h2>$0 <small>forever</small></h2>
          <ul className="mf-check-list"><li>Tap-only mood selection</li><li>Rotating 60-second actions</li><li>No profile required</li><li>Use whenever you need it</li></ul>
          <a href="/">Use MoodFlip free →</a>
        </article>
        <article className="mf-price-featured">
          <span>Personalized plan</span><h2>$7 <small>one time</small></h2>
          <ul className="mf-check-list"><li>Built from eligible saved check-ins</li><li>Personalized 7-day roadmap</li><li>Printable PDF format</li><li>Secure checkout and delivery</li></ul>
          <a href="/#paid-pdf-section">Get my 7-day plan →</a>
        </article>
      </div>
      <PaidPlansSection />
      <section className="mf-faq">
        <div className="mf-section-heading"><span>Good to know</span><h2>Frequently asked questions</h2></div>
        <div className="mf-faq-grid">{faqs.map(([q, a]) => <article key={q}><h3>{q}</h3><p>{a}</p></article>)}</div>
      </section>
    </PageFrame>
  );
}
