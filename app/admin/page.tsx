'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pass, setPass] = useState('');

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-[#2D264B]">
        <Header />
        <main className="mx-auto max-w-sm px-6 py-20 text-center">
          <div className="rounded-3xl border border-[#EAE3D6] bg-white p-8 shadow-sm">
            <h1 className="font-serif text-2xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-xs text-[#6B638B] mb-6">Enter admin passkey to continue</p>
            <input
              type="password"
              placeholder="Enter Passkey"
              value={pass}
              onChange={e => setPass(e.target.value)}
              className="w-full rounded-xl border border-[#EAE3D6] p-3 text-sm mb-4 focus:outline-[#6C5CE7]"
            />
            <button
              onClick={() => {
                if (pass === 'admin123' || pass === 'admin') setAuthenticated(true);
                else alert('Invalid passkey! Try admin123');
              }}
              className="w-full rounded-full bg-[#6C5CE7] py-3 text-sm font-bold text-white shadow-md hover:bg-[#5B4B9A]"
            >
              Access Dashboard
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D264B]">
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="font-serif text-3xl font-bold mb-6">Admin Analytics &amp; Control</h1>

        {/* METRICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl border border-[#EAE3D6] bg-white p-4 shadow-sm">
            <span className="text-xs text-[#6B638B] font-bold uppercase">Users</span>
            <div className="font-serif text-2xl font-bold mt-1">1,248</div>
          </div>
          <div className="rounded-2xl border border-[#EAE3D6] bg-white p-4 shadow-sm">
            <span className="text-xs text-[#6B638B] font-bold uppercase">Check-ins</span>
            <div className="font-serif text-2xl font-bold mt-1">5,821</div>
          </div>
          <div className="rounded-2xl border border-[#EAE3D6] bg-white p-4 shadow-sm">
            <span className="text-xs text-[#6B638B] font-bold uppercase">Reports Sold</span>
            <div className="font-serif text-2xl font-bold mt-1">142</div>
          </div>
          <div className="rounded-2xl border border-[#EAE3D6] bg-white p-4 shadow-sm">
            <span className="text-xs text-[#6B638B] font-bold uppercase">Revenue</span>
            <div className="font-serif text-2xl font-bold mt-1 text-[#059669]">$994</div>
          </div>
        </div>

        {/* RECENT USERS TABLE */}
        <div className="rounded-3xl border border-[#EAE3D6] bg-white p-6 shadow-sm">
          <h2 className="font-serif text-lg font-bold mb-4">Recent User Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#EAE3D6] text-[#6B638B] uppercase">
                <tr>
                  <th className="py-2">User Email</th>
                  <th className="py-2">Total Check-ins</th>
                  <th className="py-2">Paid Plan</th>
                  <th className="py-2">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE3D6] text-[#2D264B]">
                <tr>
                  <td className="py-3 font-semibold">user1@example.com</td>
                  <td className="py-3">12</td>
                  <td className="py-3"><span className="rounded bg-emerald-100 px-2 py-0.5 font-bold text-emerald-800">7-Day ($7)</span></td>
                  <td className="py-3">Today</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">user2@example.com</td>
                  <td className="py-3">4</td>
                  <td className="py-3"><span className="rounded bg-gray-100 px-2 py-0.5 font-bold text-gray-600">Free</span></td>
                  <td className="py-3">Yesterday</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
