'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface AdminUser {
  id: string;
  email: string;
  name?: string;
  visitCount: number;
  checkinsCount: number;
  isPaid: boolean;
  lastActiveAt: string;
  purchasesCount?: number;
}

interface AdminCheckin {
  id: string;
  primaryMood: string;
  subFeeling: string;
  specificFeeling: string;
  targetMood: string;
  actionShown: string;
  createdAt: string;
  profile?: { email?: string } | null;
}

interface AdminPurchase {
  id: string;
  amount: number;
  status: string;
  productType: string;
  pdfUrl?: string | null;
  createdAt: string;
  profile: { email: string; name?: string | null };
}

type Tab = 'overview' | 'users' | 'reports' | 'seo' | 'adsense';

const csvCell = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;

function downloadCsv(filename: string, headers: string[], rows: unknown[][]) {
  const content = [headers, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [purchases, setPurchases] = useState<AdminPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  // SEO settings state
  const [seoTitle, setSeoTitle] = useState('MoodFlip | Self-Reflection Utility & Mindset Shift');
  const [seoDescription, setSeoDescription] = useState('Instant self-reflection tool. Flip negative moods into positive target states with practical 60-second actions.');
  const [seoKeywords, setSeoKeywords] = useState('mood flip, self help, mindset shift, 60 second actions');
  const [ogImage, setOgImage] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('https://moodflip.coach');
  const [gscVerification, setGscVerification] = useState('');
  const [robotsIndex, setRobotsIndex] = useState(true);
  const [seoSaved, setSeoSaved] = useState(false);

  // AdSense settings state
  const [adsenseEnabled, setAdsenseEnabled] = useState(false);
  const [adsensePubId, setAdsensePubId] = useState('');
  const [adsenseTopSlot, setAdsenseTopSlot] = useState('');
  const [adsenseBottomSlot, setAdsenseBottomSlot] = useState('');
  const [adsenseAutoAds, setAdsenseAutoAds] = useState(false);
  const [adsenseSaved, setAdsenseSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/users')
      .then(async r => {
        if (r.status === 401) {
          window.location.href = '/';
          throw new Error('Unauthorized');
        }
        return r.json();
      })
      .then(d => { setUsers(d.users || []); setLoading(false); })
      .catch(() => setLoading(false));

    fetch('/api/admin/purchases')
      .then(response => response.ok ? response.json() : { purchases: [] })
      .then(data => setPurchases(data.purchases || []))
      .catch(() => setPurchases([]));

    const saved = localStorage.getItem('moodflip_admin_settings');
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (s.seoTitle) setSeoTitle(s.seoTitle);
        if (s.seoDescription) setSeoDescription(s.seoDescription);
        if (s.seoKeywords) setSeoKeywords(s.seoKeywords);
        if (s.gscVerification) setGscVerification(s.gscVerification);
        if (s.canonicalUrl) setCanonicalUrl(s.canonicalUrl);
        if (s.ogImage) setOgImage(s.ogImage);
        if (s.robotsIndex !== undefined) setRobotsIndex(s.robotsIndex);
        if (s.adsenseEnabled !== undefined) setAdsenseEnabled(s.adsenseEnabled);
        if (s.adsensePubId) setAdsensePubId(s.adsensePubId);
        if (s.adsenseTopSlot) setAdsenseTopSlot(s.adsenseTopSlot);
        if (s.adsenseBottomSlot) setAdsenseBottomSlot(s.adsenseBottomSlot);
        if (s.adsenseAutoAds !== undefined) setAdsenseAutoAds(s.adsenseAutoAds);
      } catch (_) {}
    }
  }, []);

  const saveSeo = () => {
    localStorage.setItem('moodflip_admin_settings', JSON.stringify({
      seoTitle, seoDescription, seoKeywords, gscVerification, canonicalUrl, ogImage, robotsIndex,
      adsenseEnabled, adsensePubId, adsenseTopSlot, adsenseBottomSlot, adsenseAutoAds,
    }));
    setSeoSaved(true);
    setTimeout(() => setSeoSaved(false), 2500);
  };

  const saveAdsense = () => {
    localStorage.setItem('moodflip_admin_settings', JSON.stringify({
      seoTitle, seoDescription, seoKeywords, gscVerification, canonicalUrl, ogImage, robotsIndex,
      adsenseEnabled, adsensePubId, adsenseTopSlot, adsenseBottomSlot, adsenseAutoAds,
    }));
    setAdsenseSaved(true);
    setTimeout(() => setAdsenseSaved(false), 2500);
  };

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.name || '').toLowerCase().includes(search.toLowerCase())
  );

  const paidCount = users.filter(u => u.isPaid).length;
  const totalCheckins = users.reduce((sum, u) => sum + u.checkinsCount, 0);

  const exportUsers = () => downloadCsv(
    `moodflip-users-${new Date().toISOString().slice(0, 10)}.csv`,
    ['Name', 'Email', 'Visits', 'Saved check-ins', 'Purchase status', 'Purchases', 'Last active'],
    users.map(user => [user.name || '', user.email, user.visitCount, user.checkinsCount, user.isPaid ? 'PAID' : 'FREE', user.purchasesCount || 0, user.lastActiveAt])
  );

  const exportCheckins = async () => {
    const response = await fetch('/api/admin/checkins', { method: 'POST' });
    if (!response.ok) {
      alert('Check-in export is temporarily unavailable.');
      return;
    }
    const data = await response.json();
    const checkins: AdminCheckin[] = data.checkins || [];
    downloadCsv(
      `moodflip-checkins-${new Date().toISOString().slice(0, 10)}.csv`,
      ['Email', 'Primary mood', 'Sub-feeling', 'Specific feeling', 'Target mood', 'Action shown', 'Created at'],
      checkins.map(item => [item.profile?.email || '', item.primaryMood, item.subFeeling, item.specificFeeling, item.targetMood, item.actionShown, item.createdAt])
    );
  };

  const resendPurchase = async (purchaseId: string) => {
    const response = await fetch('/api/admin/purchases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ purchaseId }),
    });
    const data = await response.json();
    if (!response.ok) return alert(data.error || 'Unable to resend this report.');
    setPurchases(current => current.map(item => item.id === purchaseId ? { ...item, status: 'COMPLETED_DELIVERED' } : item));
    alert('Report email resent successfully.');
  };

  const navItems: { icon: string; label: string; tab: Tab; badge?: number }[] = [
    { icon: '📊', label: 'Overview', tab: 'overview' },
    { icon: '👥', label: 'Manage Users', tab: 'users', badge: users.length },
    { icon: '💳', label: 'Financial & Sales', tab: 'reports', badge: paidCount > 0 ? paidCount : undefined },
    { icon: '🔍', label: 'SEO & Google Search', tab: 'seo' },
    { icon: '💰', label: 'AdSense Settings', tab: 'adsense' },
  ];

  return (
    <div className="site-shell">
      <Header />

      <style>{`
        @keyframes adminFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes adminTabFade {
          from { opacity: 0; transform: translateX(6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes adminMetricPop {
          0% { transform: scale(0.94); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes adminSavedPulse {
          0%, 100% { box-shadow: 0 4px 14px rgba(5,150,105,0.2); }
          50% { box-shadow: 0 4px 24px rgba(5,150,105,0.45); }
        }
        .admin-shell {
          max-width: 1280px; margin: 1.5rem auto;
          padding: 0 0.75rem;
          animation: adminFadeIn 0.4s ease both;
        }
        .admin-layout {
          background: var(--card-bg);
          border: 1.5px solid var(--card-border);
          border-radius: 28px;
          box-shadow: 0 24px 64px rgba(74,57,102,0.1);
          display: flex; min-height: 760px; overflow: hidden;
          color: var(--text-main);
        }
        /* ━━━ SIDEBAR ━━━ */
        .admin-sidebar {
          flex: 0 0 256px; min-width: 220px;
          background: linear-gradient(180deg, #1a1330 0%, #120e22 100%);
          border-right: 1.5px solid rgba(255,255,255,0.08);
          padding: 1.75rem 1rem;
          display: flex; flex-direction: column;
          justify-content: space-between; gap: 1.25rem;
        }
        .admin-sidebar-brand {
          display: flex; align-items: center; gap: 0.65rem;
          padding: 0 0.25rem; margin-bottom: 1.25rem;
        }
        .admin-sidebar-brand-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, #6c5ce7, #ec4899);
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 1.1rem; flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(108,92,231,0.4);
        }
        .admin-sidebar-brand-name {
          font-size: 0.9rem; font-weight: 800; color: #f5f3ff; line-height: 1.2;
        }
        .admin-sidebar-brand-sub {
          font-size: 0.65rem; color: rgba(255,255,255,0.4); text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .admin-sidebar-section-label {
          font-size: 0.64rem; font-weight: 900; color: rgba(255,255,255,0.3);
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0 0.5rem; margin-bottom: 0.35rem; margin-top: 0.25rem;
          display: flex; align-items: center; gap: 0.4rem;
        }
        .admin-sidebar-divider {
          height: 1px; background: rgba(255,255,255,0.08);
          margin: 0.6rem 0.25rem;
        }
        .admin-nav-btn {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.68rem 0.85rem; border-radius: 12px;
          width: 100%; border: none;
          font-family: inherit; font-weight: 600; font-size: 0.85rem;
          cursor: pointer; text-align: left;
          transition: all 0.18s ease; position: relative;
        }
        .admin-nav-btn.active {
          background: linear-gradient(135deg, rgba(108,92,231,0.9), rgba(168,85,247,0.85));
          color: #ffffff;
          box-shadow: 0 4px 16px rgba(108,92,231,0.35);
        }
        .admin-nav-btn.inactive {
          background: transparent; color: rgba(255,255,255,0.6);
        }
        .admin-nav-btn.inactive:hover {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.9);
        }
        .admin-nav-badge {
          margin-left: auto; font-size: 0.66rem; font-weight: 900;
          padding: 0.1rem 0.5rem; border-radius: 9999px; min-width: 22px;
          text-align: center;
        }
        .admin-nav-btn.active .admin-nav-badge { background: rgba(255,255,255,0.25); color: #fff; }
        .admin-nav-btn.inactive .admin-nav-badge { background: rgba(108,92,231,0.35); color: #c4b5fd; }
        .admin-ai-link {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.68rem 0.85rem; border-radius: 12px;
          background: linear-gradient(135deg, #18152b, #3d2fa0);
          color: #c4b5fd; font-weight: 800; text-decoration: none;
          font-size: 0.85rem; border: 1px solid rgba(108,92,231,0.4);
          transition: all 0.2s ease;
        }
        .admin-ai-link:hover {
          background: linear-gradient(135deg, #1e1a35, #4c3dbf);
          color: #fff; box-shadow: 0 4px 16px rgba(76,61,191,0.4);
        }
        .admin-user-link {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.68rem 0.85rem; border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.55); font-weight: 600; font-size: 0.85rem;
          text-decoration: none; transition: all 0.18s ease;
        }
        .admin-user-link:hover {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.85);
        }
        .admin-sidebar-footer { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem; }
        .admin-profile-row {
          display: flex; align-items: center; gap: 0.65rem;
          padding: 0 0.25rem; margin-bottom: 0.75rem;
        }
        .admin-profile-avatar {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #6c5ce7, #ec4899);
          color: white; font-weight: 900; font-size: 0.88rem;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(108,92,231,0.35);
        }
        .admin-profile-name { font-size: 0.83rem; font-weight: 800; color: #f5f3ff; }
        .admin-profile-email { font-size: 0.68rem; color: rgba(255,255,255,0.4); }
        .admin-signout-btn {
          width: 100%; padding: 0.6rem; font-family: inherit;
          background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.25);
          color: #f87171; border-radius: 12px; font-weight: 800;
          font-size: 0.82rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          transition: all 0.18s ease;
        }
        .admin-signout-btn:hover {
          background: rgba(239,68,68,0.2);
          color: #fca5a5;
        }
        /* ━━━ CONTENT ━━━ */
        .admin-content {
          flex: 1; padding: 2.25rem 2.5rem;
          overflow-y: auto; min-width: 0;
          background: var(--card-bg);
        }
        .admin-content-anim {
          animation: adminTabFade 0.28s ease both;
        }
        .admin-page-header {
          margin-bottom: 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 1.5px solid var(--card-border);
        }
        .admin-page-eyebrow {
          font-size: 0.72rem; font-weight: 800;
          color: #6c5ce7; letter-spacing: 0.06em;
          text-transform: uppercase; margin-bottom: 0.35rem;
        }
        .admin-page-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.8rem; font-weight: 640;
          color: var(--text-main); margin: 0;
          display: flex; align-items: center; gap: 0.5rem;
        }
        /* ━━━ METRICS ━━━ */
        .admin-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(185px, 1fr));
          gap: 1rem; margin-bottom: 2rem;
        }
        .admin-metric-card {
          background: var(--cream-2);
          border: 1.5px solid var(--card-border);
          border-radius: 20px; padding: 1.25rem 1.35rem;
          display: flex; justify-content: space-between; align-items: center;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          animation: adminMetricPop 0.4s cubic-bezier(0.22,1,0.36,1) both;
        }
        .admin-metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(74,57,102,0.1);
        }
        .admin-metric-label {
          font-size: 0.68rem; font-weight: 800; color: var(--text-subtle);
          text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 0.4rem;
        }
        .admin-metric-value {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.9rem; font-weight: 800; line-height: 1;
        }
        .admin-metric-icon {
          width: 46px; height: 46px; border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.25rem; flex-shrink: 0;
        }
        /* ━━━ QUICK LINKS ━━━ */
        .admin-quicklinks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 1rem; margin-bottom: 2rem;
        }
        .admin-quicklink-card {
          background: var(--cream-2);
          border: 1.5px solid var(--card-border);
          border-radius: 18px; padding: 1.25rem;
          cursor: pointer; text-align: left;
          transition: all 0.18s ease; font-family: inherit;
          display: flex; flex-direction: column; gap: 0.45rem;
          position: relative; overflow: hidden;
        }
        .admin-quicklink-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(108,92,231,0.05), rgba(236,72,153,0.04));
          opacity: 0; transition: opacity 0.2s;
        }
        .admin-quicklink-card:hover::before { opacity: 1; }
        .admin-quicklink-card:hover {
          border-color: rgba(108,92,231,0.35);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(108,92,231,0.1);
        }
        .admin-quicklink-icon { font-size: 1.5rem; margin-bottom: 0.2rem; }
        .admin-quicklink-title { font-size: 0.9rem; font-weight: 800; color: var(--text-main); }
        .admin-quicklink-desc { font-size: 0.76rem; color: var(--text-subtle); line-height: 1.4; }
        /* ━━━ INFO PANEL ━━━ */
        .admin-info-panel {
          background: var(--cream-2);
          border: 1.5px solid var(--card-border);
          border-radius: 18px; padding: 1.35rem 1.5rem;
        }
        .admin-info-title {
          font-size: 0.82rem; font-weight: 800;
          color: var(--text-main); margin-bottom: 0.85rem;
        }
        .admin-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.65rem;
        }
        .admin-info-item { display: flex; flex-direction: column; gap: 0.15rem; }
        .admin-info-key {
          font-size: 0.68rem; font-weight: 800; color: var(--text-subtle);
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .admin-info-val { font-size: 0.82rem; font-weight: 600; color: var(--text-main); }
        /* ━━━ USERS TABLE ━━━ */
        .admin-table-actions {
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 1rem;
          margin-bottom: 2rem; padding-bottom: 1.25rem;
          border-bottom: 1.5px solid var(--card-border);
        }
        .admin-table-action-row { display: flex; gap: 0.65rem; flex-wrap: wrap; }
        .admin-export-btn {
          padding: 0.6rem 1.15rem;
          border: none; border-radius: 12px;
          font-weight: 800; font-size: 0.82rem;
          cursor: pointer; font-family: inherit;
          transition: all 0.18s ease;
          display: flex; align-items: center; gap: 0.4rem;
        }
        .admin-export-btn.indigo {
          background: #6366f1; color: #fff;
          box-shadow: 0 4px 12px rgba(99,102,241,0.3);
        }
        .admin-export-btn.indigo:hover { background: #4f46e5; transform: translateY(-1px); }
        .admin-export-btn.gradient {
          background: linear-gradient(135deg, #6c5ce7, #ec4899); color: #fff;
          box-shadow: 0 4px 12px rgba(108,92,231,0.3);
        }
        .admin-export-btn.gradient:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(108,92,231,0.4); }
        .admin-search-input {
          padding: 0.65rem 1rem 0.65rem 2.5rem;
          background: var(--cream);
          border: 1.5px solid var(--card-border);
          border-radius: 12px; color: var(--text-main);
          font-size: 0.86rem; outline: none; width: 100%; max-width: 360px;
          font-family: inherit; transition: border-color 0.2s;
        }
        .admin-search-input:focus { border-color: #6c5ce7; }
        .admin-search-wrap { position: relative; width: 100%; max-width: 360px; }
        .admin-search-icon {
          position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
          font-size: 0.9rem; pointer-events: none;
        }
        .admin-table-wrap {
          background: var(--cream-2);
          border: 1.5px solid var(--card-border);
          border-radius: 18px; overflow: hidden;
        }
        .admin-table {
          width: 100%; border-collapse: collapse;
          text-align: left; font-size: 0.84rem;
        }
        .admin-table thead tr {
          background: var(--card-bg);
          border-bottom: 1px solid var(--card-border);
        }
        .admin-table th {
          padding: 0.85rem 1.1rem; font-weight: 900;
          color: var(--text-subtle); font-size: 0.68rem;
          letter-spacing: 0.07em; text-transform: uppercase;
        }
        .admin-table tbody tr {
          border-bottom: 1px solid var(--card-border);
          transition: background 0.15s ease;
        }
        .admin-table tbody tr:hover { background: var(--card-bg); }
        .admin-table tbody tr:last-child { border-bottom: none; }
        .admin-table td { padding: 0.9rem 1.1rem; }
        .admin-user-name { font-weight: 800; color: var(--text-main); }
        .admin-user-email { font-size: 0.73rem; color: var(--text-subtle); margin-top: 1px; }
        .admin-badge-paid {
          display: inline-flex; align-items: center; gap: 3px;
          font-size: 0.68rem; font-weight: 900;
          color: #047857; background: #dcfce7;
          border: 1px solid #86efac; padding: 0.18rem 0.65rem;
          border-radius: 9999px;
        }
        .admin-badge-free {
          display: inline-flex; align-items: center; gap: 3px;
          font-size: 0.68rem; font-weight: 800;
          color: var(--text-subtle); background: var(--cream-2);
          border: 1px solid var(--card-border); padding: 0.18rem 0.65rem;
          border-radius: 9999px;
        }
        .admin-table-empty {
          padding: 3rem; text-align: center; color: var(--text-subtle);
        }
        .admin-table-empty-icon { font-size: 2rem; margin-bottom: 0.5rem; }
        /* ━━━ SETTINGS FORM ━━━ */
        .admin-settings-wrap { display: flex; flex-direction: column; gap: 1.5rem; max-width: 700px; }
        .admin-setting-row {
          display: flex; flex-direction: column; gap: 0.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--card-border);
        }
        .admin-setting-label {
          font-size: 0.82rem; font-weight: 800; color: var(--text-main);
        }
        .admin-setting-hint {
          font-size: 0.74rem; color: var(--text-subtle); line-height: 1.5;
        }
        .admin-setting-input {
          padding: 0.68rem 1rem;
          background: var(--cream);
          border: 1.5px solid var(--card-border);
          border-radius: 12px; color: var(--text-main);
          font-size: 0.88rem; outline: none; width: 100%; max-width: 540px;
          font-family: inherit; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .admin-setting-input:focus {
          border-color: #6c5ce7;
          box-shadow: 0 0 0 3px rgba(108,92,231,0.1);
        }
        .admin-setting-textarea {
          padding: 0.68rem 1rem;
          background: var(--cream);
          border: 1.5px solid var(--card-border);
          border-radius: 12px; color: var(--text-main);
          font-size: 0.88rem; outline: none; width: 100%; max-width: 540px;
          font-family: inherit; resize: vertical;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .admin-setting-textarea:focus {
          border-color: #6c5ce7;
          box-shadow: 0 0 0 3px rgba(108,92,231,0.1);
        }
        .admin-char-count { font-size: 0.7rem; font-weight: 700; }
        .admin-toggle-wrap {
          display: flex; align-items: center; gap: 0.85rem; cursor: pointer;
        }
        .admin-toggle-track {
          width: 46px; height: 26px; border-radius: 9999px; flex-shrink: 0;
          position: relative; transition: background 0.22s ease; cursor: pointer;
        }
        .admin-toggle-thumb {
          position: absolute; top: 3px;
          width: 20px; height: 20px; border-radius: 50%;
          background: #ffffff;
          transition: left 0.22s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        .admin-toggle-label { font-size: 0.85rem; font-weight: 600; color: var(--text-main); }
        .admin-save-btn {
          padding: 0.75rem 2rem;
          border: none; border-radius: 14px;
          color: #fff; font-weight: 800; font-size: 0.9rem;
          cursor: pointer; font-family: inherit;
          display: flex; align-items: center; gap: 0.5rem;
          transition: all 0.22s ease;
        }
        .admin-save-btn.saved {
          background: #059669;
          box-shadow: 0 4px 14px rgba(5,150,105,0.3);
          animation: adminSavedPulse 1.5s ease infinite;
        }
        .admin-save-btn.unsaved {
          background: linear-gradient(135deg, #6c5ce7, #ec4899);
          box-shadow: 0 4px 14px rgba(108,92,231,0.35);
        }
        .admin-save-btn.unsaved:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(108,92,231,0.45);
        }
        .admin-guide-box {
          border-radius: 18px; padding: 1.25rem 1.4rem; margin-bottom: 2rem;
        }
        .admin-guide-title {
          font-weight: 800; font-size: 0.9rem; margin-bottom: 0.65rem;
        }
        .admin-guide-list {
          padding-left: 1.35rem; font-size: 0.82rem;
          color: var(--text-subtle); line-height: 2; margin: 0;
        }
        .admin-guide-list strong { color: var(--text-main); }
        .admin-guide-code {
          background: var(--cream-2); padding: 0.1rem 0.45rem;
          border-radius: 5px; font-size: 0.78rem;
          font-family: 'Space Mono', monospace;
        }
        .admin-code-preview {
          background: var(--cream-2);
          border: 1.5px solid var(--card-border);
          border-radius: 14px; padding: 1.1rem 1.25rem;
          margin-bottom: 1rem;
        }
        .admin-code-preview-title {
          font-weight: 800; font-size: 0.84rem;
          margin-bottom: 0.65rem; color: var(--text-main);
        }
        .admin-code-preview pre {
          font-size: 0.72rem; color: var(--text-subtle);
          overflow-x: auto; line-height: 1.7; margin: 0;
          white-space: pre-wrap;
          font-family: 'Space Mono', monospace;
        }
        .admin-adsense-warning {
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 12px; padding: 0.9rem 1.1rem;
          font-size: 0.78rem; color: #dc2626; line-height: 1.6;
        }
        .admin-sitemap-info {
          background: var(--cream-2);
          border: 1.5px solid var(--card-border);
          border-radius: 14px; padding: 1.1rem 1.25rem;
        }
        .admin-sitemap-title { font-weight: 800; font-size: 0.84rem; margin-bottom: 0.5rem; color: var(--text-main); }
        .admin-sitemap-text { font-size: 0.8rem; color: var(--text-subtle); line-height: 1.7; }
        .admin-sitemap-text a { color: #6c5ce7; font-weight: 700; text-decoration: none; }
        .admin-sitemap-text a:hover { text-decoration: underline; }
        /* Purchases table */
        .admin-purchases-wrap {
          margin-top: 1.5rem;
          background: var(--cream-2);
          border: 1.5px solid var(--card-border);
          border-radius: 18px; overflow: hidden;
        }
        .admin-purchases-header {
          padding: 1rem 1.25rem; font-weight: 800; font-size: 0.9rem;
          border-bottom: 1px solid var(--card-border);
          color: var(--text-main);
        }
        @media (max-width: 840px) {
          .admin-layout { flex-direction: column; min-height: unset; }
          .admin-sidebar { flex: none; width: 100%; flex-direction: row; flex-wrap: wrap; padding: 1rem; gap: 0.5rem; }
          .admin-sidebar > * { flex-shrink: 0; }
          .admin-content { padding: 1.5rem 1rem; }
        }
      `}</style>

      <main className="admin-shell">
        <div className="admin-layout">

          {/* ━━━━━ LEFT SIDEBAR ━━━━━ */}
          <nav className="admin-sidebar">
            <div>
              {/* Brand */}
              <div className="admin-sidebar-brand">
                <div className="admin-sidebar-brand-icon">🛡️</div>
                <div>
                  <div className="admin-sidebar-brand-name">MoodFlip Admin</div>
                  <div className="admin-sidebar-brand-sub">Control Center</div>
                </div>
              </div>

              {/* Nav Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div className="admin-sidebar-section-label">📊 Analytics</div>
                {navItems.slice(0, 3).map(item => (
                  <button
                    key={item.tab}
                    id={`admin-nav-${item.tab}`}
                    className={`admin-nav-btn ${activeTab === item.tab ? 'active' : 'inactive'}`}
                    onClick={() => setActiveTab(item.tab)}
                  >
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="admin-nav-badge">{item.badge}</span>
                    )}
                  </button>
                ))}

                <div className="admin-sidebar-divider" />
                <div className="admin-sidebar-section-label">🔍 Marketing</div>
                {navItems.slice(3).map(item => (
                  <button
                    key={item.tab}
                    id={`admin-nav-${item.tab}`}
                    className={`admin-nav-btn ${activeTab === item.tab ? 'active' : 'inactive'}`}
                    onClick={() => setActiveTab(item.tab)}
                  >
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                  </button>
                ))}

                <div className="admin-sidebar-divider" />
                <a href="/admin/ai" className="admin-ai-link">
                  <span>✦</span> AI Control Center
                </a>
                <a href="/profile" className="admin-user-link">
                  <span>👤</span> User Dashboard
                </a>
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="admin-sidebar-footer">
              <div className="admin-profile-row">
                <div className="admin-profile-avatar">A</div>
                <div>
                  <div className="admin-profile-name">Admin</div>
                  <div className="admin-profile-email">admin@moodflip.coach</div>
                </div>
              </div>
              <button
                id="admin-signout-btn"
                className="admin-signout-btn"
                onClick={() => { localStorage.removeItem('moodflip_profile'); window.location.href = '/'; }}
              >
                <span>🚪</span> Sign Out
              </button>
            </div>
          </nav>

          {/* ━━━━━ MAIN CONTENT ━━━━━ */}
          <div className="admin-content">

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <div className="admin-content-anim" key="overview">
                <div className="admin-page-header">
                  <div className="admin-page-eyebrow">Operations Console • Administration</div>
                  <h1 className="admin-page-title">📊 System Overview</h1>
                </div>

                <div className="admin-metrics-grid">
                  {[
                    { icon: '👥', label: 'Total Users', value: users.length, color: '#6c5ce7', bg: '#ede5fa' },
                    { icon: '💳', label: 'Paid Subscribers', value: paidCount, color: '#059669', bg: '#dcfce7' },
                    { icon: '📋', label: 'Total Check-ins', value: totalCheckins, color: '#0ea5e9', bg: '#e0f2fe' },
                    { icon: '🟢', label: 'System Status', value: 'Healthy', color: '#047857', bg: '#d1fae5' },
                  ].map((m, i) => (
                    <div key={i} className="admin-metric-card" style={{ animationDelay: `${i * 0.07}s` }}>
                      <div>
                        <div className="admin-metric-label">{m.label}</div>
                        <div className="admin-metric-value" style={{ color: m.color }}>{m.value}</div>
                      </div>
                      <div className="admin-metric-icon" style={{ background: m.bg }}>{m.icon}</div>
                    </div>
                  ))}
                </div>

                <div className="admin-quicklinks-grid">
                  {[
                    { icon: '🔍', title: 'SEO Settings', desc: 'Google Search Console, meta tags, sitemap', tab: 'seo' as Tab },
                    { icon: '💰', title: 'AdSense Settings', desc: 'Enable ads, add publisher ID and slot codes', tab: 'adsense' as Tab },
                    { icon: '👥', title: 'User Management', desc: 'View, search and manage all user profiles', tab: 'users' as Tab },
                    { icon: '📊', title: 'Financial Reports', desc: 'Export check-ins and subscription data', tab: 'reports' as Tab },
                  ].map(card => (
                    <button key={card.tab} id={`admin-quicklink-${card.tab}`} onClick={() => setActiveTab(card.tab)} className="admin-quicklink-card">
                      <div className="admin-quicklink-icon">{card.icon}</div>
                      <div className="admin-quicklink-title">{card.title}</div>
                      <div className="admin-quicklink-desc">{card.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="admin-info-panel">
                  <div className="admin-info-title">📋 Platform Information</div>
                  <div className="admin-info-grid">
                    {[
                      ['Stack', 'Next.js 14, Supabase, Vercel'],
                      ['Database', 'Supabase PostgreSQL (Free Tier)'],
                      ['Email OTP', 'Custom via Supabase Auth'],
                      ['Payments', 'PayPal (Integration Ready)'],
                      ['AdSense', adsenseEnabled ? `Enabled (${adsensePubId || 'ID not set'})` : 'Disabled'],
                      ['SEO', gscVerification ? 'GSC: Verified ✅' : 'GSC: Not verified'],
                    ].map(([k, v]) => (
                      <div key={k} className="admin-info-item">
                        <span className="admin-info-key">{k}</span>
                        <span className="admin-info-val">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── USERS TAB ── */}
            {activeTab === 'users' && (
              <div className="admin-content-anim" key="users">
                <div className="admin-table-actions">
                  <div>
                    <div className="admin-page-eyebrow">User Management</div>
                    <h1 className="admin-page-title">
                      All Users <span style={{ fontSize: '1.1rem', color: '#6c5ce7' }}>({users.length})</span>
                    </h1>
                  </div>
                  <div className="admin-table-action-row">
                    <button id="admin-export-checkins-btn" onClick={exportCheckins} className="admin-export-btn indigo">
                      📥 Export Check-ins
                    </button>
                    <button id="admin-export-users-btn" onClick={exportUsers} className="admin-export-btn gradient">
                      📥 Export Users
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div className="admin-search-wrap">
                    <span className="admin-search-icon">🔍</span>
                    <input
                      id="admin-user-search"
                      type="text"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search by name or email..."
                      className="admin-search-input"
                    />
                  </div>
                </div>

                <div className="admin-table-wrap">
                  {loading ? (
                    <div className="admin-table-empty">
                      <div className="admin-table-empty-icon">🔄</div>
                      Loading users...
                    </div>
                  ) : filteredUsers.length === 0 ? (
                    <div className="admin-table-empty">
                      <div className="admin-table-empty-icon">👥</div>
                      No users found
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table className="admin-table">
                        <thead>
                          <tr>
                            {['User', 'Visits', 'Check-ins', 'Status', 'Last Active'].map(h => (
                              <th key={h}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map(u => (
                            <tr key={u.id}>
                              <td>
                                <div className="admin-user-name">{u.name || u.email.split('@')[0]}</div>
                                <div className="admin-user-email">{u.email}</div>
                              </td>
                              <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>{u.visitCount}</td>
                              <td style={{ fontWeight: 800, color: '#6c5ce7' }}>{u.checkinsCount}</td>
                              <td>
                                {u.isPaid ? (
                                  <span className="admin-badge-paid">✅ PAID</span>
                                ) : (
                                  <span className="admin-badge-free">FREE</span>
                                )}
                              </td>
                              <td style={{ fontSize: '0.76rem', color: 'var(--text-subtle)' }}>
                                {new Date(u.lastActiveAt).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── REPORTS TAB ── */}
            {activeTab === 'reports' && (
              <div className="admin-content-anim" key="reports">
                <div className="admin-page-header">
                  <div className="admin-page-eyebrow">Financial Dashboard</div>
                  <h1 className="admin-page-title">💳 Sales & Reports</h1>
                </div>

                <div className="admin-metrics-grid">
                  {[
                    { icon: '💳', label: 'Paid Users', value: paidCount, color: '#059669', bg: '#dcfce7' },
                    { icon: '🆓', label: 'Free Users', value: users.length - paidCount, color: '#0ea5e9', bg: '#e0f2fe' },
                    { icon: '💰', label: 'Est. Revenue', value: `$${(paidCount * 7).toFixed(0)}`, color: '#f59e0b', bg: '#fef3c7' },
                  ].map((m, i) => (
                    <div key={i} className="admin-metric-card" style={{ animationDelay: `${i * 0.07}s` }}>
                      <div>
                        <div className="admin-metric-label">{m.label}</div>
                        <div className="admin-metric-value" style={{ color: m.color }}>{m.value}</div>
                      </div>
                      <div className="admin-metric-icon" style={{ background: m.bg }}>{m.icon}</div>
                    </div>
                  ))}
                </div>

                <div className="admin-info-panel" style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', lineHeight: 1.6, marginBottom: '1.25rem', margin: '0 0 1.25rem' }}>
                    Export your data as CSV for analysis in Google Sheets or Excel. Check-ins export includes mood, action, and date. Users export includes email, payment status, and activity.
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button id="admin-reports-export-checkins" onClick={exportCheckins} className="admin-export-btn indigo">📥 Export Check-ins CSV</button>
                    <button id="admin-reports-export-users" onClick={exportUsers} className="admin-export-btn gradient">📥 Export Users CSV</button>
                  </div>
                </div>

                <div className="admin-purchases-wrap">
                  <div className="admin-purchases-header">📄 Paid Report Recovery</div>
                  {purchases.length === 0 ? (
                    <p style={{ padding: '1.25rem', color: 'var(--text-subtle)', fontSize: '0.88rem' }}>
                      No paid reports recorded yet.
                    </p>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table className="admin-table">
                        <thead>
                          <tr>
                            {['Customer', 'Product', 'Status', 'Date', 'Recovery'].map(l => <th key={l}>{l}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {purchases.map(item => (
                            <tr key={item.id}>
                              <td>{item.profile.email}</td>
                              <td>{item.productType === '30_DAY_PDF' ? '30-Day · $19' : '7-Day · $7'}</td>
                              <td style={{ fontWeight: 700 }}>{item.status}</td>
                              <td style={{ fontSize: '0.76rem' }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                              <td style={{ whiteSpace: 'nowrap' }}>
                                {item.pdfUrl && (
                                  <a href={item.pdfUrl} target="_blank" rel="noreferrer"
                                    style={{ marginRight: '0.65rem', color: '#6366f1', fontWeight: 700, fontSize: '0.82rem' }}>
                                    Download
                                  </a>
                                )}
                                <button onClick={() => resendPurchase(item.id)}
                                  style={{ border: 0, borderRadius: '8px', padding: '0.38rem 0.65rem', background: '#ede9fe', color: '#6d28d9', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem' }}>
                                  Resend
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── SEO TAB ── */}
            {activeTab === 'seo' && (
              <div className="admin-content-anim" key="seo">
                <div className="admin-page-header">
                  <div className="admin-page-eyebrow">Marketing & Discovery</div>
                  <h1 className="admin-page-title">🔍 SEO & Google Search</h1>
                </div>

                <div className="admin-guide-box" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(16,185,129,0.06))', border: '1.5px solid rgba(14,165,233,0.22)' }}>
                  <div className="admin-guide-title" style={{ color: '#0ea5e9' }}>📋 Google Search Console Setup Guide</div>
                  <ol className="admin-guide-list">
                    <li>Go to <strong>search.google.com/search-console</strong> and sign in with your Google account</li>
                    <li>Click <strong>Add Property</strong> → enter <code className="admin-guide-code">https://moodflip.coach</code></li>
                    <li>Choose <strong>HTML tag</strong> verification → copy the content= value</li>
                    <li>Paste the verification code below and save → then click Verify in Google</li>
                    <li>After verification, submit your sitemap: <code className="admin-guide-code">https://moodflip.coach/sitemap.xml</code></li>
                  </ol>
                </div>

                <div className="admin-settings-wrap">
                  {/* SEO Title */}
                  <div className="admin-setting-row">
                    <div className="admin-setting-label">Page Title (Title Tag)</div>
                    <div className="admin-setting-hint">Shown in Google search results and browser tab. Keep under 60 characters.</div>
                    <input id="admin-seo-title" className="admin-setting-input" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder="MoodFlip | Self-Reflection Utility" />
                    <div className="admin-char-count" style={{ color: seoTitle.length > 60 ? '#ef4444' : '#059669' }}>
                      {seoTitle.length}/60 characters
                    </div>
                  </div>

                  {/* Meta Description */}
                  <div className="admin-setting-row">
                    <div className="admin-setting-label">Meta Description</div>
                    <div className="admin-setting-hint">Shown under the page title in Google. Keep under 160 characters for best results.</div>
                    <textarea id="admin-seo-description" className="admin-setting-textarea" rows={3} value={seoDescription} onChange={e => setSeoDescription(e.target.value)} placeholder="Your site description..." />
                    <div className="admin-char-count" style={{ color: seoDescription.length > 160 ? '#ef4444' : '#059669' }}>
                      {seoDescription.length}/160 characters
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="admin-setting-row">
                    <div className="admin-setting-label">Keywords</div>
                    <div className="admin-setting-hint">Comma-separated keywords for internal reference (Google no longer uses meta keywords for ranking).</div>
                    <input id="admin-seo-keywords" className="admin-setting-input" value={seoKeywords} onChange={e => setSeoKeywords(e.target.value)} placeholder="mood flip, self help, mindset shift" />
                  </div>

                  {/* Canonical URL */}
                  <div className="admin-setting-row">
                    <div className="admin-setting-label">Canonical URL</div>
                    <div className="admin-setting-hint">Your primary domain URL (prevents duplicate content issues).</div>
                    <input id="admin-seo-canonical" className="admin-setting-input" value={canonicalUrl} onChange={e => setCanonicalUrl(e.target.value)} placeholder="https://moodflip.coach" />
                  </div>

                  {/* GSC Verification */}
                  <div className="admin-setting-row">
                    <div className="admin-setting-label">Google Search Console Verification</div>
                    <div className="admin-setting-hint">Paste the content value from your Google Search Console HTML meta tag here.</div>
                    <input id="admin-seo-gsc" className="admin-setting-input" value={gscVerification} onChange={e => setGscVerification(e.target.value)} placeholder="Paste GSC verification code here..." />
                    {gscVerification && (
                      <div style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 700 }}>
                        ✅ Meta tag preview: {`<meta name="google-site-verification" content="${gscVerification}" />`}
                      </div>
                    )}
                  </div>

                  {/* OG Image */}
                  <div className="admin-setting-row">
                    <div className="admin-setting-label">Open Graph Image URL</div>
                    <div className="admin-setting-hint">Image shown when your site is shared on social media. Recommended: 1200×630px.</div>
                    <input id="admin-seo-og-image" className="admin-setting-input" value={ogImage} onChange={e => setOgImage(e.target.value)} placeholder="https://moodflip.coach/og-image.png" />
                  </div>

                  {/* Robots Index Toggle */}
                  <div className="admin-setting-row">
                    <div className="admin-setting-label">Allow Search Engine Indexing</div>
                    <div className="admin-setting-hint">Turn OFF only if you want to hide the site from Google temporarily.</div>
                    <div className="admin-toggle-wrap" onClick={() => setRobotsIndex(!robotsIndex)}>
                      <div className="admin-toggle-track" style={{ background: robotsIndex ? 'linear-gradient(135deg, #6c5ce7, #a855f7)' : 'var(--card-border)', boxShadow: robotsIndex ? '0 0 10px rgba(108,92,231,0.4)' : 'none' }}>
                        <div className="admin-toggle-thumb" style={{ left: robotsIndex ? 'calc(100% - 23px)' : '3px' }} />
                      </div>
                      <span className="admin-toggle-label">{robotsIndex ? 'Indexing ON — Google can find and show this site' : 'Indexing OFF — Google is blocked (noindex)'}</span>
                    </div>
                  </div>

                  {/* Sitemap Info */}
                  <div className="admin-sitemap-info">
                    <div className="admin-sitemap-title">🗺️ Sitemap & Robots.txt</div>
                    <div className="admin-sitemap-text">
                      Your sitemap is auto-generated at: <a href="/sitemap.xml" target="_blank">moodflip.coach/sitemap.xml</a><br />
                      Robots.txt is at: <a href="/robots.txt" target="_blank">moodflip.coach/robots.txt</a><br />
                      Submit sitemap URL in Google Search Console → Sitemaps section.
                    </div>
                  </div>

                  <button id="admin-seo-save-btn" className={`admin-save-btn ${seoSaved ? 'saved' : 'unsaved'}`} onClick={saveSeo}>
                    {seoSaved ? '✅ Saved!' : '💾 Save SEO Settings'}
                  </button>
                </div>
              </div>
            )}

            {/* ── ADSENSE TAB ── */}
            {activeTab === 'adsense' && (
              <div className="admin-content-anim" key="adsense">
                <div className="admin-page-header">
                  <div className="admin-page-eyebrow">Monetisation</div>
                  <h1 className="admin-page-title">💰 Google AdSense</h1>
                </div>

                <div className="admin-guide-box" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.08), rgba(245,158,11,0.05))', border: '1.5px solid rgba(251,191,36,0.28)' }}>
                  <div className="admin-guide-title" style={{ color: '#d97706' }}>💡 Google AdSense Setup Guide</div>
                  <ol className="admin-guide-list">
                    <li>Go to <strong>adsense.google.com</strong> and apply for an AdSense account</li>
                    <li>After approval, get your Publisher ID (format: <code className="admin-guide-code">ca-pub-XXXXXXXXXXXXXXXX</code>)</li>
                    <li>Create Ad Units in AdSense dashboard for Top Banner and Bottom Banner</li>
                    <li>Copy each slot code and paste below</li>
                    <li>Add <code className="admin-guide-code">NEXT_PUBLIC_ADSENSE_PUB_ID=ca-pub-xxx</code> and <code className="admin-guide-code">NEXT_PUBLIC_ADSENSE_ENABLED=true</code> to your Vercel environment variables</li>
                    <li>Enable ads below to start showing them on the site</li>
                  </ol>
                </div>

                <div className="admin-settings-wrap">
                  {/* Enable Toggle */}
                  <div className="admin-setting-row">
                    <div className="admin-setting-label">Enable Google AdSense</div>
                    <div className="admin-setting-hint">When ON and publisher ID is set, ad slots will appear on the homepage.</div>
                    <div className="admin-toggle-wrap" onClick={() => setAdsenseEnabled(!adsenseEnabled)}>
                      <div className="admin-toggle-track" style={{ background: adsenseEnabled ? 'linear-gradient(135deg, #6c5ce7, #a855f7)' : 'var(--card-border)', boxShadow: adsenseEnabled ? '0 0 10px rgba(108,92,231,0.4)' : 'none' }}>
                        <div className="admin-toggle-thumb" style={{ left: adsenseEnabled ? 'calc(100% - 23px)' : '3px' }} />
                      </div>
                      <span className="admin-toggle-label">{adsenseEnabled ? '✅ Ads are ENABLED — showing on site' : '⭕ Ads DISABLED — not showing on site'}</span>
                    </div>
                  </div>

                  {/* Publisher ID */}
                  <div className="admin-setting-row">
                    <div className="admin-setting-label">Publisher ID</div>
                    <div className="admin-setting-hint">Your AdSense publisher ID. Format: ca-pub-XXXXXXXXXXXXXXXX</div>
                    <input id="admin-adsense-pub-id" className="admin-setting-input" value={adsensePubId} onChange={e => setAdsensePubId(e.target.value)} placeholder="ca-pub-XXXXXXXXXXXXXXXX" />
                    {adsensePubId && !adsensePubId.startsWith('ca-pub-') && (
                      <div style={{ fontSize: '0.73rem', color: '#ef4444', fontWeight: 700 }}>⚠️ Publisher ID should start with ca-pub-</div>
                    )}
                    {adsensePubId && adsensePubId.startsWith('ca-pub-') && (
                      <div style={{ fontSize: '0.73rem', color: '#059669', fontWeight: 700 }}>✅ Valid publisher ID format</div>
                    )}
                  </div>

                  {/* Top Slot */}
                  <div className="admin-setting-row">
                    <div className="admin-setting-label">Top Banner Ad Slot</div>
                    <div className="admin-setting-hint">Ad slot code for the banner below the header. Create a Leaderboard (728×90) unit in AdSense.</div>
                    <input id="admin-adsense-top-slot" className="admin-setting-input" value={adsenseTopSlot} onChange={e => setAdsenseTopSlot(e.target.value)} placeholder="1234567890" />
                  </div>

                  {/* Bottom Slot */}
                  <div className="admin-setting-row">
                    <div className="admin-setting-label">Bottom Banner Ad Slot</div>
                    <div className="admin-setting-hint">Ad slot code for the banner at the bottom of the page.</div>
                    <input id="admin-adsense-bottom-slot" className="admin-setting-input" value={adsenseBottomSlot} onChange={e => setAdsenseBottomSlot(e.target.value)} placeholder="0987654321" />
                  </div>

                  {/* Auto Ads Toggle */}
                  <div className="admin-setting-row">
                    <div className="admin-setting-label">Auto Ads</div>
                    <div className="admin-setting-hint">Let Google automatically place ads on your site. Recommended for beginners.</div>
                    <div className="admin-toggle-wrap" onClick={() => setAdsenseAutoAds(!adsenseAutoAds)}>
                      <div className="admin-toggle-track" style={{ background: adsenseAutoAds ? 'linear-gradient(135deg, #6c5ce7, #a855f7)' : 'var(--card-border)', boxShadow: adsenseAutoAds ? '0 0 10px rgba(108,92,231,0.4)' : 'none' }}>
                        <div className="admin-toggle-thumb" style={{ left: adsenseAutoAds ? 'calc(100% - 23px)' : '3px' }} />
                      </div>
                      <span className="admin-toggle-label">{adsenseAutoAds ? 'Auto Ads ON — Google places ads automatically' : 'Auto Ads OFF — Using manual ad slots'}</span>
                    </div>
                  </div>

                  {/* Code Preview */}
                  {adsenseEnabled && adsensePubId && (
                    <div className="admin-code-preview">
                      <div className="admin-code-preview-title">📄 Generated Code Preview</div>
                      <pre>{`<!-- Add to your <head> tag in layout.tsx -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePubId}" crossOrigin="anonymous"></script>

<!-- Top banner slot -->
<ins class="adsbygoogle" data-ad-client="${adsensePubId}" data-ad-slot="${adsenseTopSlot || 'YOUR_SLOT_ID'}"></ins>

<!-- Vercel env vars to add: -->
NEXT_PUBLIC_ADSENSE_ENABLED=true
NEXT_PUBLIC_ADSENSE_PUB_ID=${adsensePubId}`}</pre>
                    </div>
                  )}

                  <div className="admin-adsense-warning">
                    ⚠️ <strong>AdSense Policy:</strong> Do not click your own ads. Ads will only show after Google approves your account and site. MoodFlip must meet AdSense content policies before approval.
                  </div>

                  <button id="admin-adsense-save-btn" className={`admin-save-btn ${adsenseSaved ? 'saved' : 'unsaved'}`} onClick={saveAdsense}>
                    {adsenseSaved ? '✅ Saved!' : '💾 Save AdSense Settings'}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
