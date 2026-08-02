import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D264B]">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="font-serif text-4xl font-bold mb-4">Contact Support</h1>
        <p className="text-[#6B638B] mb-8">
          Have questions or need assistance with your 7-Day Mindset Plan? We&apos;re here to help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-[#EAE3D6] bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold mb-4">Get in Touch</h2>
            <div className="space-y-4 text-sm text-[#6B638B]">
              <div>
                <strong className="block text-[#2D264B]">Email Support:</strong>
                <span className="text-[#6C5CE7] font-semibold">support@moodflip.coach</span>
              </div>
              <div>
                <strong className="block text-[#2D264B]">Response Time:</strong>
                <span>Average response time: 24-48 hours</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#EAE3D6] bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold mb-4">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#6B638B] mb-1">Your Name</label>
                <input type="text" className="w-full rounded-xl border border-[#EAE3D6] p-3 text-sm focus:outline-[#6C5CE7]" placeholder="Jane Doe" required />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[#6B638B] mb-1">Your Email</label>
                <input type="email" className="w-full rounded-xl border border-[#EAE3D6] p-3 text-sm focus:outline-[#6C5CE7]" placeholder="jane@example.com" required />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[#6B638B] mb-1">Message</label>
                <textarea rows={4} className="w-full rounded-xl border border-[#EAE3D6] p-3 text-sm focus:outline-[#6C5CE7]" placeholder="How can we help?" required></textarea>
              </div>
              <button type="submit" className="w-full rounded-full bg-[#6C5CE7] py-3 text-sm font-bold text-white shadow-md hover:bg-[#5B4B9A]">
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
