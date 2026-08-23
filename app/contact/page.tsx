'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Question',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const faqs = [
    {
      q: 'How do I download my 7-Day Mindset Plan PDF?',
      a: 'After completing your 7-Day Mindset Plan or purchasing the instant PDF, you can download your branded guides directly from your Profile > Downloads tab at any time.',
    },
    {
      q: 'What is your refund policy?',
      a: 'We offer a 100% 30-day money-back guarantee on all 7-Day Plan purchases. If you are not satisfied, email us with your order email and we will process a full refund within 3-5 business days.',
    },
    {
      q: 'How do I delete my saved check-ins or account?',
      a: 'You can delete your check-in data directly in Profile > Data & Privacy > Delete Data. Furthermore, all inactive account records are automatically deleted from our servers after 90 days.',
    },
    {
      q: 'Is MoodFlip a medical or therapy service?',
      a: 'No. MoodFlip is a self-reflection and educational utility. It does not provide medical advice, diagnosis, treatment, or crisis intervention.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCF5EE] text-[#1A143F] font-sans antialiased relative flex flex-col justify-between selection:bg-[#F4EBF5] selection:text-[#7464AC]">
      <Header />

      {/* ── BACKGROUND ARTWORK (Peaceful sunrise/sun style - Soft & Faded) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-start justify-center opacity-25">
        <img
          src="/peaceful-sunrise-bg.png"
          alt="Peaceful Sunrise Backdrop"
          className="w-full max-w-5xl object-cover object-top filter contrast-105"
        />
      </div>

      {/* ── HERO BANNER ── */}
      <section className="relative z-10 overflow-hidden py-14 sm:py-18 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EBF5] border border-[#E4DAD7] px-4 py-1 text-xs font-extrabold text-[#7464AC] uppercase tracking-wider shadow-2xs">
            ✉️ We&apos;re Here to Help
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1A143F] leading-tight">
            Contact MoodFlip Support
          </h1>
          <p className="text-base sm:text-lg text-[#5C527A] font-medium max-w-xl mx-auto leading-relaxed">
            Have questions about your 7-Day Plan, account privacy, or need assistance? Send us a message and our team will get back to you promptly.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: CONTACT DETAILS & INFO CARDS (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Primary Email Card */}
            <div className="rounded-3xl border border-[#E4DAD7] bg-[#FEF9F5] p-6 shadow-[0_10px_28px_rgba(26,20,63,0.03)] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F4EBF5] border border-[#E4DAD7] flex items-center justify-center text-2xl text-[#7464AC]">
                📬
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#7464AC]">Direct Email</span>
                <h3 className="font-serif text-lg font-bold text-[#1A143F] mt-0.5">Customer Support</h3>
                <a
                  href="mailto:support@moodflip.coach"
                  className="text-sm sm:text-base font-extrabold text-[#7464AC] hover:underline block mt-1"
                >
                  support@moodflip.coach
                </a>
              </div>
              <div className="pt-2 border-t border-[#E4DAD7] text-xs text-[#5C527A] space-y-1 font-medium">
                <div className="flex items-center justify-between">
                  <span>Average Response Time:</span>
                  <strong className="text-[#1A143F]">24 – 48 Hours</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Support Schedule:</span>
                  <strong className="text-[#1A143F]">Monday – Friday</strong>
                </div>
              </div>
            </div>

            {/* Quick Assistance Box */}
            <div className="rounded-3xl border border-[#E4DAD7] bg-[#FCF3E9] p-6 shadow-2xs space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#7D8164]">Need Urgent Help?</span>
              <h4 className="font-serif text-base font-bold text-[#1A143F]">Looking for Crisis Helplines?</h4>
              <p className="text-xs text-[#5C527A] leading-relaxed">
                MoodFlip is not an emergency service. If you are experiencing a mental health emergency, please call <strong>988</strong> (US) or reach out to your local emergency medical facility immediately.
              </p>
              <Link
                href="/disclaimer"
                className="inline-block text-xs font-extrabold text-[#7464AC] hover:underline pt-1"
              >
                Read Safety &amp; Medical Disclaimer →
              </Link>
            </div>

            {/* 30-Day Guarantee Badge */}
            <div className="rounded-3xl border border-[#E4DAD7] bg-[#FAF5F6] p-6 shadow-2xs space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#E49C8C]">Peace of Mind</span>
              <h4 className="font-serif text-base font-bold text-[#1A143F]">100% 30-Day Refund Guarantee</h4>
              <p className="text-xs text-[#5C527A] leading-relaxed">
                Purchased a 7-Day Plan and feeling it wasn&apos;t the right fit? Just email us with your order email and we&apos;ll issue a full refund with no hassle.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: INTERACTIVE FORM (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#E4DAD7] bg-[#FEF9F5] p-6 sm:p-10 shadow-[0_10px_28px_rgba(26,20,63,0.03)] space-y-6">
              
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#7464AC]">Send a Note</span>
                <h2 className="font-serif text-2xl font-extrabold text-[#1A143F] mt-0.5">How Can We Help You?</h2>
                <p className="text-xs sm:text-sm text-[#5C527A] font-medium mt-1">
                  Fill out the form below and we will respond to your email address within 24-48 hours.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-[#E4DAD7] bg-[#FCF3E9] p-6 text-center space-y-3 animate-in fade-in zoom-in duration-300">
                  <span className="text-4xl block">✨</span>
                  <h3 className="font-serif text-xl font-bold text-[#1A143F]">Message Sent Successfully!</h3>
                  <p className="text-xs sm:text-sm text-[#5C527A] leading-relaxed max-w-md mx-auto font-medium">
                    Thank you for reaching out to MoodFlip. We have received your message and will respond to <strong>{formData.email}</strong> within 24 to 48 hours.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', category: 'General Question', subject: '', message: '' });
                      }}
                      className="px-5 py-2 rounded-full bg-[#F4EBF5] border border-[#E4DAD7] text-xs font-extrabold text-[#7464AC] hover:bg-[#7464AC] hover:text-white transition cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#5C527A] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Emma Johnson"
                        className="w-full rounded-2xl border border-[#E4DAD7] bg-[#FEF9F5] px-4 py-3 text-sm text-[#1A143F] placeholder-[#A49BA8] focus:outline-none focus:ring-2 focus:ring-[#7464AC]/40 focus:border-[#7464AC] transition font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#5C527A] mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="emma@example.com"
                        className="w-full rounded-2xl border border-[#E4DAD7] bg-[#FEF9F5] px-4 py-3 text-sm text-[#1A143F] placeholder-[#A49BA8] focus:outline-none focus:ring-2 focus:ring-[#7464AC]/40 focus:border-[#7464AC] transition font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#5C527A] mb-1.5">
                        Topic / Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full rounded-2xl border border-[#E4DAD7] bg-[#FEF9F5] px-4 py-3 text-sm text-[#1A143F] focus:outline-none focus:ring-2 focus:ring-[#7464AC]/40 focus:border-[#7464AC] transition font-medium"
                      >
                        <option value="General Question">General Question</option>
                        <option value="7-Day Plan Support">7-Day Plan Support</option>
                        <option value="Billing & Refund">Billing &amp; Refund Request</option>
                        <option value="Account & Privacy">Account &amp; Data Deletion</option>
                        <option value="Feedback & Ideas">Feedback &amp; Suggestions</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#5C527A] mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g., 7-Day Plan PDF inquiry"
                        className="w-full rounded-2xl border border-[#E4DAD7] bg-[#FEF9F5] px-4 py-3 text-sm text-[#1A143F] placeholder-[#A49BA8] focus:outline-none focus:ring-2 focus:ring-[#7464AC]/40 focus:border-[#7464AC] transition font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#5C527A] mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please write your questions or details here..."
                      className="w-full rounded-2xl border border-[#E4DAD7] bg-[#FEF9F5] px-4 py-3 text-sm text-[#1A143F] placeholder-[#A49BA8] focus:outline-none focus:ring-2 focus:ring-[#7464AC]/40 focus:border-[#7464AC] transition font-medium resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-gradient-to-r from-[#7464AC] to-[#4F438B] py-3.5 text-sm font-extrabold text-white shadow-md shadow-[#4F438B]/20 hover:opacity-95 hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Sending Message...' : 'Send Message →'}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* ── FREQUENTLY ASKED QUESTIONS SECTION ── */}
        <section className="space-y-6 pt-6 border-t border-[#E4DAD7]">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-[#7464AC]">Quick Answers</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1A143F]">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-[#5C527A]">Common questions regarding the MoodFlip tool, 7-day plans, and accounts.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-3xl border border-[#E4DAD7] bg-[#FEF9F5] p-6 shadow-[0_10px_28px_rgba(26,20,63,0.03)] space-y-2"
              >
                <h3 className="font-serif text-base font-bold text-[#1A143F] flex items-start gap-2">
                  <span className="text-[#7464AC]">Q.</span> {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C527A] leading-relaxed pl-5 font-medium">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
