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
    <div className="min-h-screen bg-[#FDF8F5] text-[#1A143F] font-sans antialiased flex flex-col justify-between selection:bg-[#F4EBF5] selection:text-[#7464AC]">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full space-y-8">
        
        {/* ── WIDE SUNRISE BANNER: TEXT DIRECTLY ON TOP OF ARTWORK ── */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E4DAD7] shadow-sm min-h-[230px] sm:min-h-[290px] md:min-h-[320px] flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-[#FDF8F5]">
          {/* Full Natural Sunrise Artwork */}
          <img
            src="/peaceful-sunrise-bg.png"
            alt="MoodFlip Peaceful Sunrise"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Text directly on top of the image */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-3 px-2">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A143F] tracking-tight">
              Contact MoodFlip Support
            </h1>
            <p className="text-xs sm:text-sm text-[#533B93] font-extrabold tracking-wide uppercase">
              ✉️ We&apos;re Here to Help
            </p>
            <p className="text-base sm:text-lg md:text-xl text-[#1A143F] font-bold leading-relaxed max-w-2xl mx-auto">
              Have questions about your 7-Day Plan, account privacy, or need assistance? Send us a message and our team will get back to you promptly.
            </p>
          </div>
        </div>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: CONTACT DETAILS & INFO CARDS (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 sm:p-8 shadow-[0_4px_24px_rgba(26,20,63,0.04)] space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#7464AC]">Direct Channels</span>
                <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#1A143F] mt-1">Get in Touch</h2>
                <p className="text-xs sm:text-sm text-[#5C527A] mt-1">We respond to all user inquiries within 24 to 48 business hours.</p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:support@moodflip.coach"
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FDF8F5] border border-[#E4DAD7] hover:border-[#7464AC] transition group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4EBF5] text-[#7464AC] text-lg font-bold group-hover:scale-105 transition">
                    ✉️
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#5C527A]">Email Support</div>
                    <div className="text-sm font-extrabold text-[#1A143F] group-hover:text-[#7464AC] transition">support@moodflip.coach</div>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FDF8F5] border border-[#E4DAD7]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4EBF5] text-[#7464AC] text-lg font-bold">
                    ⏱️
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#5C527A]">Support Hours</div>
                    <div className="text-sm font-extrabold text-[#1A143F]">Monday &ndash; Friday (9am &ndash; 6pm EST)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FAF3EC] border border-[#E8DDD8]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FCE8DE] text-[#C45E3D] text-lg font-bold">
                    🚨
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#A84A2A]">Crisis Resources</div>
                    <div className="text-xs text-[#5C527A] mt-0.5">
                      Need emergency help? Call or text <strong className="text-[#1A143F]">988</strong> (US/CA) or your local emergency line.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: CONTACT FORM (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 sm:p-10 shadow-[0_4px_24px_rgba(26,20,63,0.04)]">
              
              <div className="mb-6">
                <span className="text-xs font-black uppercase tracking-wider text-[#7464AC]">Send a Message</span>
                <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#1A143F] mt-1">How can we assist you?</h2>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 text-center space-y-3">
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
                        className="w-full rounded-2xl border border-[#E4DAD7] bg-[#FDF8F5] px-4 py-3 text-sm text-[#1A143F] placeholder-[#A49BA8] focus:outline-none focus:ring-2 focus:ring-[#7464AC]/40 focus:border-[#7464AC] transition font-medium"
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
                        className="w-full rounded-2xl border border-[#E4DAD7] bg-[#FDF8F5] px-4 py-3 text-sm text-[#1A143F] placeholder-[#A49BA8] focus:outline-none focus:ring-2 focus:ring-[#7464AC]/40 focus:border-[#7464AC] transition font-medium"
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
                        className="w-full rounded-2xl border border-[#E4DAD7] bg-[#FDF8F5] px-4 py-3 text-sm text-[#1A143F] focus:outline-none focus:ring-2 focus:ring-[#7464AC]/40 focus:border-[#7464AC] transition font-medium"
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
                        className="w-full rounded-2xl border border-[#E4DAD7] bg-[#FDF8F5] px-4 py-3 text-sm text-[#1A143F] placeholder-[#A49BA8] focus:outline-none focus:ring-2 focus:ring-[#7464AC]/40 focus:border-[#7464AC] transition font-medium"
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
                      className="w-full rounded-2xl border border-[#E4DAD7] bg-[#FDF8F5] px-4 py-3 text-sm text-[#1A143F] placeholder-[#A49BA8] focus:outline-none focus:ring-2 focus:ring-[#7464AC]/40 focus:border-[#7464AC] transition font-medium resize-y"
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
                className="rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 shadow-[0_4px_24px_rgba(26,20,63,0.03)] space-y-2"
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
