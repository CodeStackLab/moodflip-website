'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [messageSent, setMessageSent] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDF8F5] text-[#1A143F]">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="font-serif text-4xl font-bold mb-4 text-[#1A143F]">Contact Support</h1>
        <p className="text-[#5C527A] mb-8">
          Have questions or need assistance with your 7-Day Mindset Plan? We&apos;re here to help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 shadow-[0_10px_28px_rgba(26,20,63,0.03)]">
            <h2 className="font-serif text-xl font-bold mb-4 text-[#1A143F]">Get in Touch</h2>
            <div className="space-y-4 text-sm text-[#5C527A]">
              <div>
                <strong className="block text-[#1A143F]">Email Support:</strong>
                <span className="text-[#7464AC] font-semibold">support@moodflip.coach</span>
              </div>
              <div>
                <strong className="block text-[#1A143F]">Response Time:</strong>
                <span>Average response time: 24-48 hours</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 shadow-[0_10px_28px_rgba(26,20,63,0.03)]">
            <h2 className="font-serif text-xl font-bold mb-4 text-[#1A143F]">Send a Message</h2>
            {messageSent && (
              <div className="rounded-xl border border-[#E4DAD7] bg-[#FCF3E9] p-3 text-xs font-semibold text-[#7D8164] mb-3">
                Message sent successfully. We&apos;ll get back to you within 24-48 hours.
              </div>
            )}
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setMessageSent(true);
                event.currentTarget.reset();
              }}
            >
              <div>
                <label className="block text-xs font-bold uppercase text-[#5C527A] mb-1">Your Name</label>
                <input type="text" className="w-full rounded-xl border border-[#E4DAD7] bg-[#FEFAF8] p-3 text-sm text-[#1A143F] focus:outline-[#7464AC]" placeholder="Jane Doe" required />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[#5C527A] mb-1">Your Email</label>
                <input type="email" className="w-full rounded-xl border border-[#E4DAD7] bg-[#FEFAF8] p-3 text-sm text-[#1A143F] focus:outline-[#7464AC]" placeholder="jane@example.com" required />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[#5C527A] mb-1">Message</label>
                <textarea rows={4} className="w-full rounded-xl border border-[#E4DAD7] bg-[#FEFAF8] p-3 text-sm text-[#1A143F] focus:outline-[#7464AC]" placeholder="How can we help?" required></textarea>
              </div>
              <button type="submit" className="w-full rounded-full bg-gradient-to-r from-[#7464AC] to-[#4F438B] py-3 text-sm font-bold text-white shadow-md hover:shadow-lg transition cursor-pointer">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
