import PageFrame from '@/components/PageFrame';

export const metadata = {
  title: 'About MoodFlip | Mindset Shift Tool',
  description: 'Learn how MoodFlip turns difficult everyday moods into gentle, practical 60-second actions.'
};

const steps = [
  ['01', 'Choose what feels closest', 'Start with a broad mood family, then tap the feeling that best matches this moment.'],
  ['02', 'Flip the emotional direction', 'MoodFlip pairs that feeling with a more supportive target state—without asking you to type.'],
  ['03', 'Take one tiny action', 'Try a practical 60-second reset designed to feel manageable, even on a difficult day.'],
];

export default function AboutPage() {
  return (
    <PageFrame eyebrow="Why MoodFlip" title="A small reset can change the next moment." intro="MoodFlip is a calm, tap-only self-reflection tool for moving through everyday emotional friction with one clear next step.">
      <section className="mf-section">
        <div className="mf-section-heading"><span>How it works</span><h2>From stuck to moving—in three gentle taps</h2></div>
        <div className="mf-step-grid">
          {steps.map(([number, title, copy]) => <article className="mf-step" key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>
      <section className="mf-split-section">
        <div><span className="mf-mini-label">Built for real life</span><h2>Less analysis. More momentum.</h2><p>MoodFlip uses visual choices inspired by the Feelings Wheel, then gives you a positive target state and a rotating micro-action. It is quick enough for a break between meetings, a stressful commute, or a restless night.</p></div>
        <ul className="mf-check-list"><li>No typing or journaling required</li><li>Use the core tool without an account</li><li>Optional private check-in history</li><li>Designed for phone, tablet, and desktop</li></ul>
      </section>
      <aside className="mf-callout mf-callout--danger"><span>Safety first</span><div><h2>A self-help tool, not clinical care</h2><p>MoodFlip is not therapy, medical advice, diagnosis, treatment, or crisis support. If you may be in danger or need urgent help, contact local emergency services or a qualified professional.</p></div><a href="/disclaimer">Read the safety notice →</a></aside>
    </PageFrame>
  );
}
