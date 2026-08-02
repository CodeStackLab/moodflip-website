import type { Metadata } from 'next';
import PageFrame from '@/components/PageFrame';

export const metadata: Metadata = { title: 'Safety Disclaimer | MoodFlip', description: 'Important limitations and crisis-support guidance for MoodFlip.' };

export default function DisclaimerPage() {
  return (
    <PageFrame eyebrow="Essential safety notice" tone="danger" title="MoodFlip supports reflection—not treatment." intro="Please understand these boundaries before using the tool or a personalized plan." narrow>
      <aside className="mf-crisis-card"><span aria-hidden="true">!</span><div><h2>Need immediate support?</h2><p>If you are in danger, experiencing severe distress, or thinking about self-harm, stop using this site and contact local emergency services or a qualified crisis professional now.</p><a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer">Find verified help in your country ↗</a></div></aside>
      <section className="mf-prose-section"><h2>Not therapy or medical advice</h2><p>MoodFlip is a general self-reflection utility for everyday emotional fluctuations. Its suggestions, content, and personalized PDFs are educational and motivational only. They are not diagnosis, therapy, treatment, medical advice, or crisis intervention.</p></section>
      <section className="mf-prose-section"><h2>No professional relationship</h2><p>Using MoodFlip does not create a therapist–client, doctor–patient, or other healthcare relationship. Do not delay or replace professional care because of information shown here.</p></section>
      <section className="mf-prose-section"><h2>Use your judgment</h2><p>Skip any action that feels unsafe, unsuitable, or beyond your physical ability. Seek guidance from a licensed professional when you have concerns about your health or wellbeing.</p></section>
    </PageFrame>
  );
}
