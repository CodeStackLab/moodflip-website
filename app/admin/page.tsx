'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { defaultBlogPosts, defaultLegalPages } from '@/lib/blogData';
import type { BlogPost, LegalPage } from '@/lib/blogData';
import RichEditor from '@/components/RichEditor';
import { COUNSELOR_MOODS, CounselorPromptItem } from '@/data/moods';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('May 9 - May 15, 2026');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  // Full Interactive Notifications Data
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New User Account', desc: 'Sarah Johnson registered a new account.', time: '5 mins ago', read: false, icon: '👤', category: 'User' },
    { id: 2, title: '7-Day Plan Purchase', desc: 'Michael Chen purchased 7-Day Mindset Plan ($9.99).', time: '18 mins ago', read: false, icon: '💳', category: 'Sale' },
    { id: 3, title: 'Users Export Completed', desc: 'Users CSV export is generated and ready for download.', time: '1 hour ago', read: false, icon: '📥', category: 'System' },
    { id: 4, title: 'New Check-in Logged', desc: 'Aisha Patel completed a 60-second Anxious → Calm shift.', time: '2 hours ago', read: false, icon: '⚡', category: 'Activity' },
    { id: 6, title: 'Search Console Tag Verified', desc: 'Google Search Console verification meta tag active.', time: '5 hours ago', read: true, icon: '🔍', category: 'SEO' },
    { id: 7, title: 'Database Backup Completed', desc: 'System database backup finished with zero errors.', time: '1 day ago', read: true, icon: '💾', category: 'System' },
    { id: 8, title: 'Admin Session Security', desc: 'Admin login credentials updated and active.', time: '2 days ago', read: true, icon: '🛡️', category: 'Security' },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userLoggedIn');
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const changeTab = (tabName: string) => {
    setActiveTab(tabName);
    setSidebarOpen(false);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tabName);
      window.history.pushState({}, '', url.toString());
    }
  };

  // Full Interactive Dummy Users Data
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@moodflip.coach', joinDate: 'May 15, 2026', visitCount: 42, status: 'Active', avatarBg: 'bg-purple-600 text-white' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@example.com', joinDate: 'May 15, 2026', visitCount: 24, status: 'Active', avatarBg: 'bg-purple-100 text-purple-700' },
    { id: 3, name: 'Michael Chen', email: 'michael.chen@example.com', joinDate: 'May 15, 2026', visitCount: 18, status: 'Active', avatarBg: 'bg-blue-100 text-blue-700' },
    { id: 4, name: 'Aisha Patel', email: 'aisha.patel@example.com', joinDate: 'May 14, 2026', visitCount: 31, status: 'Active', avatarBg: 'bg-pink-100 text-pink-700' },
    { id: 5, name: 'Daniel Kim', email: 'daniel.kim@example.com', joinDate: 'May 14, 2026', visitCount: 12, status: 'Inactive', avatarBg: 'bg-indigo-100 text-indigo-700' },
    { id: 6, name: 'Emily Davis', email: 'emily.davis@example.com', joinDate: 'May 13, 2026', visitCount: 27, status: 'Active', avatarBg: 'bg-emerald-100 text-emerald-700' },
  ]);

  const [editingUser, setEditingUser] = useState<{ id: number; name: string; email: string; status: string } | null>(null);

  // Admin Login Credentials State
  const [adminCreds, setAdminCreds] = useState({
    email: 'admin@moodflip.coach',
    password: 'admin123',
  });
  const [adminCredsMsg, setAdminCredsMsg] = useState('');

  // Blog Manager State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultBlogPosts);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Legal Pages State
  const [legalPages, setLegalPages] = useState<LegalPage[]>(defaultLegalPages);
  const [editingLegalPage, setEditingLegalPage] = useState<LegalPage | null>(null);
  const [blogFilter, setBlogFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [blogSearch, setBlogSearch] = useState('');

  // ── AI-Powered MoodFlip State ──
  const [aiSettings, setAiSettings] = useState({
    enabled: false,
    autoFallback: true,
    fallbackOrder: ['gemini', 'openai', 'mistral', 'claude'] as string[],
    providers: {
      gemini: {
        enabled: true,
        apiKey: '',
        model: 'gemini-1.5-pro',
        label: 'Google Gemini',
        color: '#4285F4',
        logo: '🔵',
        models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-pro'],
      },
      openai: {
        enabled: false,
        apiKey: '',
        model: 'gpt-4o',
        label: 'OpenAI',
        color: '#10A37F',
        logo: '🟢',
        models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
      },
      mistral: {
        enabled: false,
        apiKey: '',
        model: 'mistral-large-latest',
        label: 'Mistral AI',
        color: '#FF7000',
        logo: '🟠',
        models: ['mistral-large-latest', 'mistral-medium', 'mistral-small', 'open-mixtral-8x7b'],
      },
      claude: {
        enabled: false,
        apiKey: '',
        model: 'claude-3-5-sonnet-20241022',
        label: 'Anthropic Claude',
        color: '#CC785C',
        logo: '🟤',
        models: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229', 'claude-3-haiku-20240307'],
      },
    },
    systemPrompt: 'You are MoodFlip AI, a compassionate wellness assistant. Help users understand their emotions, suggest micro-actions to improve their mood, and provide evidence-based mental wellness tips. Be warm, supportive, and concise. Never replace professional therapy.',
    maxTokens: 1024,
    temperature: 0.7,
    features: {
      moodAnalysis: true,
      actionSuggestions: true,
      journalInsights: true,
      crisisDetection: true,
      personalizedPlan: false,
    },
  });

  // Google AdSense & Ad Spaces Manager State
  const [adsSettings, setAdsSettings] = useState({
    globalEnabled: true,
    mode: 'auto', // 'auto' | 'manual'
    adSenseClient: 'ca-pub-9876543210123456',
    autoAdsScript: '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9876543210123456" crossorigin="anonymous"></script>',
    slots: {
      headerBanner: { enabled: true, slotId: '1234567890', code: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9876543210123456" data-ad-slot="1234567890" data-ad-format="auto"></ins>' },
      sidebarAd: { enabled: true, slotId: '2345678901', code: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9876543210123456" data-ad-slot="2345678901" data-ad-format="rectangle"></ins>' },
      moodLibraryAd: { enabled: true, slotId: '3456789012', code: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9876543210123456" data-ad-slot="3456789012" data-ad-format="horizontal"></ins>' },
      footerBanner: { enabled: true, slotId: '4567890123', code: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9876543210123456" data-ad-slot="4567890123" data-ad-format="auto"></ins>' },
      planPageAd: { enabled: true, slotId: '5678901234', code: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9876543210123456" data-ad-slot="5678901234" data-ad-format="auto"></ins>' },
      checkinModalAd: { enabled: true, slotId: '6789012345', code: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9876543210123456" data-ad-slot="6789012345" data-ad-format="fluid"></ins>' },
      stickyMobileAd: { enabled: true, slotId: '7890123456', code: '<ins class="adsbygoogle" style="display:inline-block;width:320px;height:50px" data-ad-client="ca-pub-9876543210123456" data-ad-slot="7890123456"></ins>' }
    }
  });

  const saveAdsSettings = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('moodflip_ads_settings', JSON.stringify(adsSettings));
    }
  };
  // Email SMTP & Gmail Gateway Settings State
  const [smtpSettings, setSmtpSettings] = useState({
    enabled: true,
    provider: 'gmail',
    host: 'smtp.gmail.com',
    port: '587',
    username: 'support@moodflip.coach',
    password: '••••••••••••••••',
    security: 'TLS',
    senderName: 'MoodFlip Support Team',
    senderEmail: 'support@moodflip.coach',
  });
  const [smtpTestStatus, setSmtpTestStatus] = useState<{ type: 'testing' | 'success' | 'error'; text: string } | null>(null);

  // Email Marketing & Broadcast Campaigns State
  const [emailCampaign, setEmailCampaign] = useState({
    subject: '✨ Transform Your Mindset with MoodFlip 7-Day Plan',
    audience: 'All Registered Users (12,458)',
    template: 'welcome',
    body: 'Hi {{name}},\n\nWelcome to MoodFlip! We are thrilled to guide your mindset shift journey today. Discover your 7-Day Mindset Plan and daily check-ins.\n\nBest regards,\nThe MoodFlip Team',
  });
  const [campaignStatus, setCampaignStatus] = useState<{ type: 'sending' | 'success'; text: string } | null>(null);

  // Full Interactive Dummy Check-ins Data
  const [checkins] = useState([
    { id: 1, user: 'Sarah J.', mood: '😊 Calm', positiveMood: '😄 Happy', action: 'Breathe & Relax', time: 'May 15, 2026 8:42 AM' },
    { id: 2, user: 'Michael C.', mood: '😰 Anxious', positiveMood: '😌 Calm', action: 'Grounding Exercise', time: 'May 15, 2026 8:31 AM' },
    { id: 3, user: 'Aisha P.', mood: '😔 Sad', positiveMood: '😄 Happy', action: 'Gratitude Journal', time: 'May 15, 2026 7:58 AM' },
    { id: 4, user: 'Daniel K.', mood: '😡 Angry', positiveMood: '😌 Calm', action: 'Take a Break', time: 'May 15, 2026 7:44 AM' },
    { id: 5, user: 'Emily D.', mood: '😄 Happy', positiveMood: '😌 Calm', action: 'Affirmation', time: 'May 15, 2026 7:20 AM' },
  ]);

  // Email Leads Data
  const [leads] = useState([
    { id: 1, email: 'lead.alex@example.com', date: 'May 15, 2026', source: '7-Day Plan Popup' },
    { id: 2, email: 'lead.maria@example.com', date: 'May 14, 2026', source: 'Mood Library Download' },
    { id: 3, email: 'lead.sam@example.com', date: 'May 14, 2026', source: 'Homepage Subscribe' },
    { id: 4, email: 'lead.david@example.com', date: 'May 13, 2026', source: '7-Day Plan Checkout' },
    { id: 5, email: 'lead.priya@example.com', date: 'May 12, 2026', source: 'Daily Reminder Prompt' },
  ]);

  // Ad Spaces & Google AdSense State
  const [adSettings, setAdSettings] = useState({
    adsGlobalEnabled: true,
    adsenseClientId: 'ca-pub-9842019481928401',
    autoAdsEnabled: true,
    headerBannerEnabled: true,
    headerBannerSlotId: '7289012345',
    sidebarAdEnabled: true,
    sidebarAdSlotId: '3002501234',
    inFeedAdEnabled: true,
    inFeedAdSlotId: '5432109876',
    customAdScript: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9842019481928401" crossorigin="anonymous"></script>`,
  });

  // SEO, Google Search Console & Analytics State
  const [seoSettings, setSeoSettings] = useState({
    gaEnabled: true,
    gaMeasurementId: 'G-W982KSL9X8',
    googleSearchConsoleTag: 'google-site-verification=abc123_MoodFlip_Official_2026',
    metaTitle: 'MoodFlip | Daily Emotional Reflection & Mindset Utility',
    metaDescription: 'Transform your mindset in 60 seconds. MoodFlip helps you track emotions, flip negative thoughts, and build lasting resilience.',
    keywords: 'mindset, emotional clarity, 60-second actions, mood tracker, self reflection, mental health utility',
    canonicalUrl: 'https://moodflip.coach',
    ogImageUrl: 'https://moodflip.coach/og-image.png',
  });

  // Payment Gateway Settings State
  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    stripePubKey: 'pk_test_placeholder_key_xxxx',
    stripeSecretKey: 'sk_test_placeholder_key_xxxx',
    paypalEnabled: false,
    paypalClientId: 'A21AAH_PayPalClientIdMoodFlipDemo99',
    paypalSecretKey: 'EK_PayPalSecretKeyMoodFlipDemo99',
    paypalMode: 'sandbox',
  });

  // PWA & Mobile "Add to Home Screen" Prompt Settings (DEFAULT: OFF)
  const [pwaSettings, setPwaSettings] = useState({
    enabled: false, // Default is OFF as requested
    showDelay: 2000,
    bannerTitle: 'Install MoodFlip App',
    bannerSubtitle: 'Add MoodFlip to your Mobile Home Screen for instant 60-second mindset reset anywhere!',
    buttonText: 'Add to Home Screen',
  });
  const [pwaSavedMsg, setPwaSavedMsg] = useState('');

  // Cookie Consent & Privacy Banner Settings (DEFAULT: OFF)
  const [cookieSettings, setCookieSettings] = useState({
    enabled: false, // Default is OFF as requested
    bannerTitle: 'We Value Your Privacy & Cookies',
    bannerText: 'MoodFlip uses essential cookies and analytics to enhance your self-reflection experience and show personalized wellness insights.',
    privacyLink: '/privacy',
    acceptButtonText: '✓ Accept All Cookies',
    essentialButtonText: 'Essential Only',
  });
  const [cookieSavedMsg, setCookieSavedMsg] = useState('');

  // Counselor Mood Pairings Database State
  const [counselorMoods, setCounselorMoods] = useState<CounselorPromptItem[]>(() => {
    if (typeof window !== 'undefined') {
      const isV6Synced = localStorage.getItem('moodflip_counselor_v6_synced');
      if (!isV6Synced) {
        localStorage.setItem('moodflip_counselor_moods', JSON.stringify(COUNSELOR_MOODS));
        localStorage.setItem('moodflip_counselor_v6_synced', 'true');
        return COUNSELOR_MOODS;
      }
      const saved = localStorage.getItem('moodflip_counselor_moods');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return COUNSELOR_MOODS;
  });

  const [editingCounselorMoodItem, setEditingCounselorMoodItem] = useState<CounselorPromptItem | null>(null);
  const [showAddMoodModal, setShowAddMoodModal] = useState(false);
  const [moodSearchQuery, setMoodSearchQuery] = useState('');
  const [moodCategoryFilter, setMoodCategoryFilter] = useState('All');
  const [moodPage, setMoodPage] = useState(1);
  const MOODS_PER_PAGE = 18;

  const PREDEFINED_EMOJIS = ['😨', '🌀', '🤏', '🕯️', '💔', '💧', '😰', '😡', '🌸', '😢', '🧍', '⚡', '🧘', '🪴', '☀️', '🌊', '💡', '🛡️', '💜', '✨', '🕊️', '🌿', '🌈', '🔑', '❤️', '🧠', '🎁', '🔥'];

  const [newMoodForm, setNewMoodForm] = useState({
    serial: 29,
    name: '',
    target: '',
    actionDesc: '',
    actionsList: [''],
    reframeQuote: '',
    whyHelps: '',
    column1Notes: '',
    feelingsInput: '',
    emoji: '✨',
    iconUrl: '',
    category: 'Anxious' as const,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAdminEmail = localStorage.getItem('admin_login_email');
      const savedAdminPassword = localStorage.getItem('admin_login_password');
      if (savedAdminEmail || savedAdminPassword) {
        setAdminCreds({
          email: savedAdminEmail || 'admin@moodflip.coach',
          password: savedAdminPassword || 'admin123',
        });
      }

      const savedSmtp = localStorage.getItem('moodflip_smtp_settings');
      if (savedSmtp) {
        try { setSmtpSettings(JSON.parse(savedSmtp)); } catch (e) {}
      }

      const savedPay = localStorage.getItem('moodflip_payment_settings');
      if (savedPay) {
        try { setPaymentSettings(JSON.parse(savedPay)); } catch (e) {}
      }

      const savedAds = localStorage.getItem('moodflip_ad_settings');
      if (savedAds) {
        try { setAdSettings(JSON.parse(savedAds)); } catch (e) {}
      }

      const savedSeo = localStorage.getItem('moodflip_seo_settings');
      if (savedSeo) {
        try { setSeoSettings(JSON.parse(savedSeo)); } catch (e) {}
      }

      const savedBlog = localStorage.getItem('moodflip_blog_posts');
      if (savedBlog) {
        try { setBlogPosts(JSON.parse(savedBlog)); } catch (e) {}
      }

      const savedLegal = localStorage.getItem('moodflip_legal_pages');
      if (savedLegal) {
        try { setLegalPages(JSON.parse(savedLegal)); } catch (e) {}
      }

      const savedUsers = localStorage.getItem('moodflip_users_db');
      if (savedUsers) {
        try { setUsers(JSON.parse(savedUsers)); } catch (e) {}
      }

      const savedPwa = localStorage.getItem('moodflip_pwa_settings');
      if (savedPwa) {
        try { setPwaSettings(JSON.parse(savedPwa)); } catch (e) {}
      } else {
        const flag = localStorage.getItem('moodflip_pwa_enabled');
        if (flag !== null) {
          setPwaSettings((prev) => ({ ...prev, enabled: flag === 'true' }));
        }
      }

      const savedCookie = localStorage.getItem('moodflip_cookie_settings');
      if (savedCookie) {
        try { setCookieSettings(JSON.parse(savedCookie)); } catch (e) {}
      } else {
        const flag = localStorage.getItem('moodflip_cookie_consent_enabled');
        if (flag !== null) {
          setCookieSettings((prev) => ({ ...prev, enabled: flag === 'true' }));
        }
      }
    }
  }, []);

  const saveAdminCreds = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_login_email', adminCreds.email);
      localStorage.setItem('admin_login_password', adminCreds.password);
      window.dispatchEvent(new Event('storage'));
      setAdminCredsMsg('✅ Admin Login Credentials Updated! Next time use this email & password to login.');
      setTimeout(() => setAdminCredsMsg(''), 5000);
    }
  };

  const saveSmtpSettings = (newSmtp: any) => {
    setSmtpSettings(newSmtp);
    if (typeof window !== 'undefined') {
      localStorage.setItem('moodflip_smtp_settings', JSON.stringify(newSmtp));
      window.dispatchEvent(new Event('storage'));
    }
    setSmtpTestStatus({ type: 'success', text: '💾 Email SMTP & Gmail configuration saved successfully!' });
    setTimeout(() => setSmtpTestStatus(null), 4000);
  };

  const testSmtpConnection = () => {
    setSmtpTestStatus({ type: 'testing', text: `🔄 Connecting to ${smtpSettings.host}:${smtpSettings.port}...` });
    setTimeout(() => {
      setSmtpTestStatus({ type: 'success', text: `✅ SMTP Connection Successful! Authenticated via ${smtpSettings.security} as ${smtpSettings.username}.` });
    }, 1200);
  };

  const saveUserEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    const updatedUsers = users.map((u) => (u.id === editingUser.id ? { ...u, name: editingUser.name, email: editingUser.email, status: editingUser.status } : u));
    setUsers(updatedUsers);
    if (typeof window !== 'undefined') {
      localStorage.setItem('moodflip_users_db', JSON.stringify(updatedUsers));
    }
    setEditingUser(null);
  };

  const savePaymentSettings = (newSettings: any) => {
    setPaymentSettings(newSettings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('moodflip_payment_settings', JSON.stringify(newSettings));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const saveAdSettings = (newSettings: any) => {
    setAdSettings(newSettings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('moodflip_ad_settings', JSON.stringify(newSettings));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const saveSeoSettings = (newSettings: any) => {
    setSeoSettings(newSettings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('moodflip_seo_settings', JSON.stringify(newSettings));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const savePwaSettings = (newSettings: typeof pwaSettings) => {
    setPwaSettings(newSettings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('moodflip_pwa_settings', JSON.stringify(newSettings));
      localStorage.setItem('moodflip_pwa_enabled', newSettings.enabled ? 'true' : 'false');
      window.dispatchEvent(new Event('storage'));
      setPwaSavedMsg(newSettings.enabled ? '✅ Add to Home Screen prompt ENABLED and saved!' : '✅ Add to Home Screen prompt TURNED OFF and saved!');
      setTimeout(() => setPwaSavedMsg(''), 4500);
    }
  };

  const saveCookieSettings = (newSettings: typeof cookieSettings) => {
    setCookieSettings(newSettings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('moodflip_cookie_settings', JSON.stringify(newSettings));
      localStorage.setItem('moodflip_cookie_consent_enabled', newSettings.enabled ? 'true' : 'false');
      window.dispatchEvent(new Event('storage'));
      setCookieSavedMsg(newSettings.enabled ? '✅ Cookie Consent banner ENABLED and saved!' : '✅ Cookie Consent banner TURNED OFF and saved!');
      setTimeout(() => setCookieSavedMsg(''), 4500);
    }
  };


  // Export Users CSV
  const exportUsersCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Name,Email,Join Date,Visit Count,Status", ...users.map(u => `${u.id},"${u.name}",${u.email},${u.joinDate},${u.visitCount},${u.status}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `moodflip_users_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Leads CSV
  const exportLeadsCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Email,Date,Source", ...leads.map(l => `${l.id},${l.email},${l.date},${l.source}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `moodflip_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Users
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Check-ins
  const filteredCheckins = checkins.filter(c => 
    c.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.mood.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDF8F5] text-[#1A143F] font-sans antialiased flex flex-col">

      {/* MOBILE TOP NAVBAR */}
      <div className="lg:hidden bg-[#FEFAF8] border-b border-[#E4DAD7] px-4 py-2.5 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2.5 text-decoration-none group">
          <img
            src="/moodflip-logo.png"
            alt="MoodFlip"
            className="h-7 w-auto object-contain mix-blend-multiply"
          />
        </Link>

        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-9 h-9 rounded-xl bg-[#F4EBF5] text-[#1A143F] border border-[#E4DAD7] text-base font-bold flex items-center justify-center hover:bg-[#EEE0FC] transition-colors shrink-0 cursor-pointer"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* 1. LEFT SIDEBAR */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-[295px] bg-[#FEFAF8] border-r border-[#E4DAD7] p-5 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out overflow-y-auto overflow-x-hidden
          ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div>
            {/* DESKTOP BRAND LOGO */}
            <div className="hidden lg:flex items-center gap-3 mb-6 px-3 py-2.5 bg-[#FEFAF8] rounded-2xl border border-[#E4DAD7] shadow-2xs">
              <Link href="/" className="flex items-center gap-2.5 text-decoration-none group w-full">
                <img
                  src="/moodflip-logo.png"
                  alt="MoodFlip"
                  className="h-8 w-auto object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
            </div>



            {/* NAVIGATION MENU — Larger 14px bold text for easy readability */}
            <div className="mb-2 px-2 text-[11px] font-black uppercase tracking-wider text-[#A49BA8]">
              Main Menu
            </div>
            <nav className="space-y-1">
              {[
                { name: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                { name: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                { name: 'Check-ins', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
                { name: 'Mood Library', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                { name: 'Plans & Payments', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z' },
                { name: 'Reports', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                { name: 'Email Leads', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                { name: 'Analytics', icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z' },
                { name: 'Ad Spaces', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
                { name: 'Blog Manager', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
                { name: 'Legal Pages', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { name: 'SEO & Search Console', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
                { name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => changeTab(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[14px] font-bold transition-all ${
                    activeTab === item.name
                      ? 'bg-gradient-to-r from-[#7464AC] to-[#4F438B] text-white shadow-md shadow-[#7464AC]/25 scale-[1.01]'
                      : 'text-[#5C527A] hover:bg-[#F4EBF5] hover:text-[#1A143F]'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span>{item.name}</span>
                </button>
              ))}

              <Link
                href="/login"
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[14px] font-bold text-[#A49BA8] hover:bg-[#FAF5F6] hover:text-[#E49C8C] transition-all cursor-pointer mt-3"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </Link>
            </nav>
          </div>

          {/* SIDEBAR MOTIVATIONAL CARD */}
          <div 
            className="mt-6 relative overflow-hidden rounded-[24px] border border-[#E4DAD7] p-5 shadow-sm flex flex-col justify-between text-center min-h-[260px] bg-cover bg-center"
            style={{ backgroundImage: "url('/login-bg.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#FEFAF8]/95 via-[#FEFAF8]/50 to-transparent pointer-events-none" />

            <div className="relative z-10 text-center pt-2">
              <h4 className="font-serif font-extrabold text-base md:text-lg text-[#1A143F] leading-snug mb-1.5 tracking-tight">
                Spread positivity.<br />Inspire change.
              </h4>
              <p className="text-xs text-[#5C527A] font-medium leading-relaxed max-w-[210px] mx-auto">
                Thank you for helping millions live better.
              </p>
            </div>

            <div className="relative z-10 w-11 h-11 rounded-full bg-gradient-to-r from-[#7464AC] to-[#4F438B] text-white flex items-center justify-center shadow-lg shadow-[#7464AC]/40 mx-auto mt-4 mb-1 text-base">
              💜
            </div>
          </div>
        </aside>

        {/* MOBILE OVERLAY BACKDROP */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          />
        )}

        {/* 2. MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 p-3 sm:p-6 md:p-8 bg-[#FDF8F5] flex flex-col gap-6 overflow-y-auto w-full min-w-0">

          {/* TOP SEARCH & PROFILE HEADER BAR */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#FEFAF8] p-3 md:p-4 rounded-2xl border border-[#E4DAD7] shadow-[0_10px_28px_rgba(26,20,63,0.03)]">
            {/* Search Input */}
            <div className="relative w-full sm:w-[380px] lg:w-[440px]">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A49BA8] text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search users, emails, check-ins, plans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FEFAF8] border border-[#E4DAD7] rounded-xl pl-10 pr-12 py-2 text-xs text-[#1A143F] placeholder-[#A49BA8] focus:outline-none focus:border-[#7464AC] focus:bg-white transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#A49BA8] bg-[#F4EBF5] border border-[#E4DAD7] px-1.5 py-0.5 rounded-md hidden sm:inline-block">
                ⌘K
              </span>
            </div>

            {/* Top Right Controls & Profile */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 border-[#E4DAD7] pt-2.5 sm:pt-0">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowNotificationsModal(true)}
                  className="relative w-9 h-9 rounded-xl bg-[#F4EBF5] border border-[#E4DAD7] flex items-center justify-center text-[#5C527A] hover:bg-[#EEE0FC] transition-all cursor-pointer shrink-0"
                  title="View Notifications"
                >
                  🔔
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E49C8C] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#7464AC] to-[#4F438B] text-white font-extrabold flex items-center justify-center text-sm shadow-xs shrink-0">
                    A
                  </div>
                  <div className="text-left hidden md:block">
                    <span className="block text-xs font-bold text-[#1A143F]">Admin Panel</span>
                    <span className="block text-[10px] text-[#7E7096] font-medium">{adminCreds.email}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#FAF5F6] border border-[#E4DAD7] text-[#E49C8C] font-extrabold text-xs hover:bg-[#E49C8C] hover:text-white transition-all cursor-pointer shadow-2xs shrink-0"
                title="Logout Admin Session"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* PAGE TITLE & DATE SELECTOR ROW */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-[#1A143F] tracking-tight">
                {activeTab === 'Dashboard' ? 'Admin Dashboard' : `Admin — ${activeTab}`}
              </h1>
              <p className="text-xs md:text-sm text-[#5C527A] font-medium mt-0.5">
                Overview of users, check-ins, revenue and platform management
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#FEFAF8] border border-[#E4DAD7] rounded-xl px-3.5 py-2 shadow-xs cursor-pointer self-start sm:self-auto">
              <span>📅</span>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="text-xs font-bold text-[#1A143F] bg-transparent focus:outline-none cursor-pointer"
              >
                <option>May 9 - May 15, 2026</option>
                <option>May 1 - May 8, 2026</option>
                <option>April 2026</option>
                <option>Last 30 Days</option>
              </select>
            </div>
          </div>

          {/* DYNAMIC TAB CONTENT RENDERER */}
          {activeTab === 'Dashboard' && (
            <>
              {/* TOP 6 METRIC CARDS ROW */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
                {[
                  { label: 'Total Users', val: '12,458', change: '↑ 8.7%', icon: '👥', badgeBg: 'bg-[#F4EBF5]', iconColor: 'text-[#7464AC]' },
                  { label: 'Total Check-ins', val: '89,142', change: '↑ 12.4%', icon: '📋', badgeBg: 'bg-[#FCF3E9]', iconColor: 'text-[#7D8164]' },
                  { label: 'Active Paid Users', val: '3,276', change: '↑ 9.3%', icon: '💎', badgeBg: 'bg-[#FDE8C8]', iconColor: 'text-[#EDAA7A]' },
                  { label: '7-Day Plan Sales', val: '1,842', change: '↑ 15.2%', icon: '👑', badgeBg: 'bg-[#FAF5F6]', iconColor: 'text-[#E49C8C]' },
                  { label: 'Total Revenue', val: '$18,942', change: '↑ 13.1%', icon: '💵', badgeBg: 'bg-[#F4EBF5]', iconColor: 'text-[#7464AC]' },
                  { label: 'Avg. Daily Visits', val: '5,819', change: '↑ 10.8%', icon: '📈', badgeBg: 'bg-[#FCF3E9]', iconColor: 'text-[#7D8164]' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-[#FEFAF8] border border-[#E4DAD7] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:border-[#7666AB] hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold text-[#5C527A] uppercase tracking-wider">{stat.label}</span>
                      <span className={`w-8 h-8 rounded-xl ${stat.badgeBg} ${stat.iconColor} border border-[#E4DAD7] flex items-center justify-center text-sm shadow-2xs shrink-0`}>
                        {stat.icon}
                      </span>
                    </div>
                    <div>
                      <div className="font-serif text-xl sm:text-2xl font-extrabold text-[#1A143F]">{stat.val}</div>
                      <div className="text-[11px] font-extrabold text-[#7D8164] mt-1 flex items-center gap-1">
                        <span>{stat.change}</span>
                        <span className="text-[#7E7096] font-medium">vs last 7d</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* MIDDLE SECTION GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* WEEKLY ACTIVITY LINE CHART */}
                <div className="lg:col-span-5 bg-[#FEFAF8] border border-[#E4DAD7] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#1A143F]">Weekly Activity (Check-ins)</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#7464AC]" />
                        <span className="text-xs text-[#5C527A] font-medium">Check-ins</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-[180px] relative mt-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
                      <line x1="0" y1="30" x2="400" y2="30" stroke="#E4DAD7" strokeDasharray="3 3" />
                      <line x1="0" y1="70" x2="400" y2="70" stroke="#E4DAD7" strokeDasharray="3 3" />
                      <line x1="0" y1="110" x2="400" y2="110" stroke="#E4DAD7" strokeDasharray="3 3" />
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7464AC" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#7464AC" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M 10 100 L 70 85 L 130 90 L 190 60 L 250 50 L 310 40 L 370 65 L 370 140 L 10 140 Z" fill="url(#chartGrad)" />
                      <path d="M 10 100 Q 40 92 70 85 T 130 90 T 190 60 T 250 50 T 310 40 T 370 65" fill="none" stroke="#7464AC" strokeWidth="3" />
                      {[
                        { x: 10, y: 100 },
                        { x: 70, y: 85 },
                        { x: 130, y: 90 },
                        { x: 190, y: 60 },
                        { x: 250, y: 50 },
                        { x: 310, y: 40 },
                        { x: 370, y: 65 },
                      ].map((pt, i) => (
                        <circle key={i} cx={pt.x} cy={pt.y} r="4.5" fill="#7464AC" stroke="#FEFAF8" strokeWidth="2" />
                      ))}
                    </svg>

                    <div className="flex justify-between text-[11px] text-[#7E7096] font-semibold mt-2 px-1">
                      <span>Fri 9</span>
                      <span>Sat 10</span>
                      <span>Sun 11</span>
                      <span>Mon 12</span>
                      <span>Tue 13</span>
                      <span>Wed 14</span>
                      <span>Thu 15</span>
                    </div>
                  </div>
                </div>

                {/* MOOD DISTRIBUTION DONUT CHART */}
                <div className="lg:col-span-4 bg-[#FEFAF8] border border-[#E4DAD7] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <h3 className="font-serif font-bold text-base text-[#1A143F] mb-2">Mood Distribution (All Time)</h3>

                  <div className="flex items-center gap-4 my-auto">
                    <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#E49C8C" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="0" />
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#9C8CC4" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="30" />
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#7464AC" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="65" />
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#7D8164" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="110" />
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#EDAA7A" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="175" />
                      </svg>
                      <div className="absolute text-center">
                        <span className="block font-serif font-extrabold text-sm text-[#1A143F]">89,142</span>
                        <span className="block text-[9px] font-bold text-[#7E7096] uppercase">Total</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-[11px] font-semibold text-[#5C527A] flex-1">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#EDAA7A]" /> 😊 Happy</span>
                        <strong className="text-[#1A143F]">34.2%</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#7D8164]" /> 🌿 Calm</span>
                        <strong className="text-[#1A143F]">25.6%</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#7464AC]" /> 😰 Anxious</span>
                        <strong className="text-[#1A143F]">14.8%</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#9C8CC4]" /> 😔 Sad</span>
                        <strong className="text-[#1A143F]">11.3%</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#E49C8C]" /> 😡 Angry</span>
                        <strong className="text-[#1A143F]">6.4%</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QUICK ACTIONS BUTTONS */}
                <div className="lg:col-span-3 bg-[#FEFAF8] border border-[#E4DAD7] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <h3 className="font-serif font-extrabold text-base text-[#1A143F] mb-3">Quick Actions</h3>
                  <div className="space-y-2.5">
                    <button onClick={exportUsersCSV} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#E4DAD7] bg-[#F4EBF5] hover:bg-gradient-to-r hover:from-[#7464AC] hover:to-[#4F438B] hover:text-white text-xs font-extrabold text-[#7464AC] transition-all cursor-pointer shadow-2xs">
                      <span>📥 Export Users CSV</span>
                    </button>
                    <button onClick={exportLeadsCSV} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#E4DAD7] bg-[#F4EBF5] hover:bg-gradient-to-r hover:from-[#7464AC] hover:to-[#4F438B] hover:text-white text-xs font-extrabold text-[#7464AC] transition-all cursor-pointer shadow-2xs">
                      <span>✉️ Export Leads CSV</span>
                    </button>
                    <button onClick={() => setActiveModal('addMood')} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#E4DAD7] bg-[#F4EBF5] hover:bg-gradient-to-r hover:from-[#7464AC] hover:to-[#4F438B] hover:text-white text-xs font-extrabold text-[#7464AC] transition-all cursor-pointer shadow-2xs">
                      <span>➕ Add Mood Page</span>
                    </button>
                    <button onClick={() => setActiveModal('createPlan')} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#E4DAD7] bg-[#F4EBF5] hover:bg-gradient-to-r hover:from-[#7464AC] hover:to-[#4F438B] hover:text-white text-xs font-extrabold text-[#7464AC] transition-all cursor-pointer shadow-2xs">
                      <span>🎁 Create New Plan</span>
                    </button>
                    <button onClick={() => changeTab('Reports')} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#E4DAD7] bg-[#F4EBF5] hover:bg-gradient-to-r hover:from-[#7464AC] hover:to-[#4F438B] hover:text-white text-xs font-extrabold text-[#7464AC] transition-all cursor-pointer shadow-2xs">
                      <span>📊 View Reports</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* LOWER SECTION ROW 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* RECENT USERS TABLE */}
                <div className="lg:col-span-5 bg-[#FEFAF8] border border-[#E4DAD7] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif font-bold text-base text-[#1A143F]">Recent Users</h3>
                    <button onClick={() => changeTab('Users')} className="text-xs font-bold text-[#7464AC] hover:underline cursor-pointer">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#E4DAD7] text-[#5C527A] font-bold uppercase text-[10px]">
                          <th className="pb-2.5">Name</th>
                          <th className="pb-2.5">Email</th>
                          <th className="pb-2.5">Join Date</th>
                          <th className="pb-2.5">Visits</th>
                          <th className="pb-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4DAD7] text-[#1A143F] font-medium">
                        {filteredUsers.slice(0, 5).map((u) => (
                          <tr key={u.id} className="hover:bg-[#F4EBF5] transition-all">
                            <td className="py-2.5 font-bold text-[11px]">{u.name}</td>
                            <td className="py-2.5 text-[#7E7096] text-[11px]">{u.email}</td>
                            <td className="py-2.5 text-[11px]">{u.joinDate}</td>
                            <td className="py-2.5 text-[11px] font-bold">{u.visitCount}</td>
                            <td className="py-2.5">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${u.status === 'Active' ? 'bg-[#FCF3E9] text-[#7D8164] border border-[#E4DAD7]' : 'bg-[#F1ECED] text-[#7E7096]'}`}>
                                {u.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* LATEST CHECK-INS TABLE */}
                <div className="lg:col-span-4 bg-[#FEFAF8] border border-[#E4DAD7] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif font-bold text-base text-[#1A143F]">Latest Check-ins</h3>
                    <button onClick={() => changeTab('Check-ins')} className="text-xs font-bold text-[#7464AC] hover:underline cursor-pointer">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#E4DAD7] text-[#5C527A] font-bold uppercase text-[10px]">
                          <th className="pb-2.5">User</th>
                          <th className="pb-2.5">Mood</th>
                          <th className="pb-2.5">Action Shown</th>
                          <th className="pb-2.5">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4DAD7] text-[#1A143F] font-medium">
                        {filteredCheckins.slice(0, 5).map((c) => (
                          <tr key={c.id} className="hover:bg-[#FAF8FD] transition-all">
                            <td className="py-2.5 font-bold text-[11px]">{c.user}</td>
                            <td className="py-2.5 text-[11px]">{c.mood}</td>
                            <td className="py-2.5 text-[11px] font-semibold text-[#7147E8]">{c.action}</td>
                            <td className="py-2.5 text-[10px] text-gray-400">{c.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* CONSENT & PRIVACY CARDS */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs">
                    <h4 className="font-serif font-bold text-sm text-[#1A1338] mb-1">Consent &amp; Privacy</h4>
                    <p className="text-xs text-[#5B5278] leading-relaxed mb-2.5">
                      Users must consent to store their mood, moods, dates, actions and purchase history.
                    </p>
                    <button onClick={() => {}} className="text-xs font-extrabold text-[#7147E8] hover:underline cursor-pointer">
                      View Consent Logs →
                    </button>
                  </div>

                  <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs">
                    <h4 className="font-serif font-bold text-sm text-[#1A1338] mb-1">90-Day Auto Deletion</h4>
                    <p className="text-xs text-[#5B5278] leading-relaxed mb-2.5">
                      User data is automatically deleted 90 days after account deletion.
                    </p>
                    <button onClick={() => {}} className="text-xs font-extrabold text-[#7147E8] hover:underline cursor-pointer">
                      View Deletion Logs →
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* VIEW TAB 2: USERS DATABASE MANAGEMENT */}
          {activeTab === 'Users' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-5 sm:p-8 shadow-2xs space-y-6">
              {/* HEADER & FILTER CONTROLS */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                  <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338]">User Database ({filteredUsers.length}) 👥</h2>
                  <p className="text-xs md:text-sm text-[#68607F] font-semibold mt-1">View, search, manage registered users, edit emails, and monitor engagement.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <input
                      type="text"
                      placeholder="Search user name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#FAF8FD] border border-[#EAE3F2] rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-[#1A1338] focus:outline-none focus:border-[#7147E8] focus:bg-white transition shadow-2xs"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-[#EAE3F2] rounded-xl px-3 py-2 text-xs font-extrabold text-[#1A1338] bg-[#FAF8FD] focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active Only</option>
                      <option value="Inactive">Inactive Only</option>
                    </select>
                    <button onClick={exportUsersCSV} className="bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-md hover:scale-[1.01] transition cursor-pointer whitespace-nowrap">
                      📥 Export CSV
                    </button>
                  </div>
                </div>
              </div>

              {/* MOBILE CARDS VIEW (< md screens) */}
              <div className="grid grid-cols-1 gap-3.5 md:hidden">
                {filteredUsers.map((u) => (
                  <div key={u.id} className="bg-[#FAF8FD] border border-[#EAE3F2] rounded-2xl p-4 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-9 h-9 rounded-full ${u.avatarBg} font-extrabold flex items-center justify-center text-xs text-white shrink-0 shadow-2xs`}>
                          {u.name.charAt(0)}
                        </span>
                        <div className="min-w-0">
                          <strong className="block text-sm font-extrabold text-[#1A1338] truncate">{u.name}</strong>
                          <span className="block text-xs text-gray-500 truncate">{u.email}</span>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold shrink-0 ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'}`}>
                        {u.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-gray-200/60 font-semibold text-[#5B5278]">
                      <div>📅 Joined: <span className="text-[#1A1338] font-bold">{u.joinDate}</span></div>
                      <div>📊 Check-ins: <span className="text-[#7147E8] font-black">{u.visitCount}</span></div>
                    </div>

                    <button
                      onClick={() => setEditingUser(u)}
                      className="w-full bg-white border border-[#7147E8]/30 text-[#7147E8] py-2 rounded-xl text-xs font-extrabold hover:bg-[#7147E8] hover:text-white transition shadow-2xs flex items-center justify-center gap-1.5"
                    >
                      <span>✏️</span> Edit User Details
                    </button>
                  </div>
                ))}
              </div>

              {/* DESKTOP TABLE VIEW (>= md screens) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 font-extrabold uppercase text-[10px] tracking-wider">
                      <th className="py-3.5 px-3">User</th>
                      <th className="py-3.5 px-3">Email Address</th>
                      <th className="py-3.5 px-3">Joined Date</th>
                      <th className="py-3.5 px-3">Check-ins</th>
                      <th className="py-3.5 px-3">Status</th>
                      <th className="py-3.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-[#FAF8FD] transition-all">
                        <td className="py-3.5 px-3 flex items-center gap-3">
                          <span className={`w-9 h-9 rounded-full ${u.avatarBg} font-extrabold flex items-center justify-center text-xs text-white shadow-2xs shrink-0`}>
                            {u.name.charAt(0)}
                          </span>
                          <span className="font-extrabold text-sm text-[#1A1338]">{u.name}</span>
                        </td>
                        <td className="py-3.5 px-3 text-gray-600 font-bold">{u.email}</td>
                        <td className="py-3.5 px-3 text-gray-500 font-medium">{u.joinDate}</td>
                        <td className="py-3.5 px-3 font-extrabold text-[#7147E8]">{u.visitCount} check-ins</td>
                        <td className="py-3.5 px-3">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => setEditingUser(u)}
                            className="bg-purple-50 text-[#7147E8] hover:bg-[#7147E8] hover:text-white px-3 py-1.5 rounded-xl font-extrabold text-xs transition cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                          >
                            <span>✏️</span> Edit User
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW TAB 3: CHECK-INS ACTIVITY LOG */}
          {activeTab === 'Check-ins' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-5 sm:p-8 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338]">Check-ins Activity Log ({filteredCheckins.length}) 📋</h2>
                  <p className="text-xs md:text-sm text-[#68607F] font-semibold mt-1">Real-time mindset shifts, initial moods, target positive states, and recommendations.</p>
                </div>
              </div>

              {/* MOBILE CARDS VIEW (< md screens) */}
              <div className="grid grid-cols-1 gap-3.5 md:hidden">
                {filteredCheckins.map((c) => (
                  <div key={c.id} className="bg-[#FAF8FD] border border-[#EAE3F2] rounded-2xl p-4 shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-extrabold text-[#1A1338]">{c.user}</strong>
                      <span className="text-[10px] text-gray-400 font-bold">#{c.id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-extrabold">{c.mood}</span>
                      <span className="text-gray-400 font-bold">➔</span>
                      <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-extrabold">{c.positiveMood}</span>
                    </div>
                    <div className="text-xs text-[#7147E8] font-bold">Action: {c.action}</div>
                    <div className="text-[11px] text-gray-400 font-medium pt-1 border-t border-gray-200/60">🕒 {c.time}</div>
                  </div>
                ))}
              </div>

              {/* DESKTOP TABLE VIEW (>= md screens) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 font-extrabold uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-3">ID</th>
                      <th className="py-3 px-3">User</th>
                      <th className="py-3 px-3">Initial Mood</th>
                      <th className="py-3 px-3">Target Positive Mood</th>
                      <th className="py-3 px-3">Mindset Shift Action</th>
                      <th className="py-3 px-3 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {filteredCheckins.map((c) => (
                      <tr key={c.id} className="hover:bg-[#FAF8FD] transition">
                        <td className="py-3.5 px-3 text-gray-400 font-bold">#{c.id}</td>
                        <td className="py-3.5 px-3 font-extrabold text-sm text-[#1A1338]">{c.user}</td>
                        <td className="py-3.5 px-3"><span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-extrabold text-xs">{c.mood}</span></td>
                        <td className="py-3.5 px-3"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-extrabold text-xs">{c.positiveMood}</span></td>
                        <td className="py-3.5 px-3 font-extrabold text-[#7147E8]">{c.action}</td>
                        <td className="py-3.5 px-3 text-right text-gray-400 font-medium">{c.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW TAB 4: MOOD LIBRARY MANAGEMENT — BEAUTIFUL CARDS GRID WITH PAGINATION & CUSTOM LOGO UPLOAD */}
          {activeTab === 'Mood Library' && (() => {
            const filteredMoods = counselorMoods.filter(m => {
              const matchesSearch = !moodSearchQuery || 
                m.name.toLowerCase().includes(moodSearchQuery.toLowerCase()) || 
                m.target.toLowerCase().includes(moodSearchQuery.toLowerCase()) ||
                m.actionDesc.toLowerCase().includes(moodSearchQuery.toLowerCase()) ||
                (m.feelings && m.feelings.some(f => f.toLowerCase().includes(moodSearchQuery.toLowerCase())));
              const matchesCategory = moodCategoryFilter === 'All' || m.category === moodCategoryFilter;
              return matchesSearch && matchesCategory;
            });

            const totalPages = Math.ceil(filteredMoods.length / MOODS_PER_PAGE) || 1;
            const currentPage = Math.min(moodPage, totalPages);
            const paginatedMoods = filteredMoods.slice((currentPage - 1) * MOODS_PER_PAGE, currentPage * MOODS_PER_PAGE);

            return (
              <div className="bg-white border border-[#EAE3F2] rounded-3xl p-4 sm:p-8 shadow-2xs space-y-6">
                {/* HEADER & TOP CONTROL BAR */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                  <div>
                    <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338] flex items-center gap-2">
                      Mood Library Management 🧠
                    </h2>
                    <p className="text-xs md:text-sm text-[#68607F] font-semibold mt-1">
                      Configure supported moods, feelings tags, 60-second micro-actions, and counterpart shifts.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                    {/* Search Box */}
                    <div className="relative flex-1 sm:w-64">
                      <input
                        type="text"
                        placeholder="Search mood, feeling, action..."
                        value={moodSearchQuery}
                        onChange={(e) => { setMoodSearchQuery(e.target.value); setMoodPage(1); }}
                        className="w-full bg-[#FAF8FD] border border-[#EAE3F2] rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-[#1A1338] focus:outline-none focus:border-[#7147E8] focus:bg-white transition shadow-2xs"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                    </div>

                    {/* + Add New Mood Button (Matching User Screenshot!) */}
                    <button
                      onClick={() => {
                        setNewMoodForm({
                          serial: counselorMoods.length + 1,
                          name: '',
                          target: '',
                          actionDesc: '',
                          actionsList: [''],
                          reframeQuote: '',
                          whyHelps: '',
                          column1Notes: '',
                          feelingsInput: '',
                          emoji: '✨',
                          iconUrl: '',
                          category: 'Anxious',
                        });
                        setShowAddMoodModal(true);
                      }}
                      className="bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white px-5 py-2.5 rounded-2xl text-xs font-black shadow-md shadow-[#7147E8]/25 hover:scale-[1.02] active:scale-95 transition cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <span>+</span> Add New Mood
                    </button>
                  </div>
                </div>

                {/* CATEGORY FILTER PILLS */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  {['All', 'Low', 'Anxious', 'Angry', 'Overwhelmed', 'Lonely'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setMoodCategoryFilter(cat); setMoodPage(1); }}
                      className={`px-3.5 py-1.5 rounded-xl font-extrabold transition cursor-pointer whitespace-nowrap ${
                        moodCategoryFilter === cat
                          ? 'bg-[#7147E8] text-white shadow-xs'
                          : 'bg-[#FAF8FD] text-[#5B5278] border border-[#EAE3F2] hover:bg-[#F0EBFA]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                  <span className="ml-auto text-[11px] font-bold text-gray-400">
                    Showing {paginatedMoods.length} of {filteredMoods.length} moods
                  </span>
                </div>

                {/* CARDS GRID (Equal Height Boxes & Responsive Breakpoints) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 items-stretch w-full">
                  {paginatedMoods.map((m) => (
                    <div
                      key={m.id}
                      className="bg-white border border-[#EFE8F8] hover:border-[#7147E8]/40 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full group"
                    >
                      <div className="flex-1 flex flex-col justify-between space-y-3 pb-3">
                        <div className="space-y-2.5">
                          {/* Top Bar: Icon/Logo/Emoji + Category Badge */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {m.iconUrl ? (
                                <img src={m.iconUrl} alt={m.name} className="w-8 h-8 rounded-lg object-contain shrink-0" />
                              ) : (
                                <span className="text-2xl shrink-0">{m.emoji || '💧'}</span>
                              )}
                              <span className="text-[10px] font-black text-gray-400">#{m.serial}</span>
                            </div>
                            <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-[#F0EBFA] text-[#7147E8] shrink-0">
                              {m.category || 'Anxious'}
                            </span>
                          </div>

                          {/* Mood Shift Headline: Bad Mood ➔ Good Mood Target */}
                          <div className="font-serif font-extrabold text-base text-[#1A1338] leading-tight break-words">
                            {m.name} <span className="text-emerald-600 font-sans font-extrabold">➔ {m.target}</span>
                          </div>

                          {/* Feelings Tags */}
                          {m.feelings && m.feelings.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {m.feelings.map(f => (
                                <span key={f} className="text-[10.5px] bg-[#FAF8FD] border border-[#EAE3F2] px-2.5 py-0.5 rounded-lg text-[#5B5278] font-bold">
                                  {f}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* 60-Second Micro-Actions List (Support multiple rotating actions) */}
                          <div className="bg-[#FAF8FD] border border-[#F3EFF8] rounded-xl p-3 space-y-1.5 text-xs text-[#2D264B]">
                            <div className="text-[10px] font-black uppercase tracking-wider text-[#7147E8] flex items-center justify-between">
                              <span>⚡ 60s Micro-Actions ({m.actions ? m.actions.length : 1})</span>
                            </div>
                            {m.actions && m.actions.length > 0 ? (
                              <ul className="space-y-1 text-[11.5px] font-medium leading-snug">
                                {m.actions.map((act, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5 break-words">
                                    <span className="text-[#7147E8] font-bold shrink-0">{idx + 1}.</span>
                                    <span>{act}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-[11.5px] font-medium leading-snug break-words">{m.actionDesc}</p>
                            )}
                          </div>
                        </div>

                        {/* Counsellor Feedback / Notes (Anchored at bottom of top section) */}
                        {(m.whyHelps || m.reframeQuote) && (
                          <div className="text-[11px] text-[#68607F] font-semibold italic bg-[#FFFDF5] border border-amber-200/60 rounded-xl p-2.5 leading-snug break-words mt-auto">
                            💬 {m.whyHelps || m.reframeQuote}
                          </div>
                        )}

                        {/* Column1 Review Notes Badge */}
                        {m.column1Notes && (
                          <div className="text-[10.5px] text-amber-900 font-semibold bg-amber-50 border border-amber-200/80 rounded-xl p-2 leading-snug break-words">
                            <strong className="block text-amber-800 font-extrabold text-[9.5px] uppercase">📝 Column1 (Review Note):</strong>
                            <span>{m.column1Notes}</span>
                          </div>
                        )}
                      </div>

                      {/* Card Action Buttons: Edit ✏️ and Delete 🗑️ (Red Color Accent) */}
                      <div className="pt-3 border-t border-[#F0EBFA] flex items-center justify-between gap-2.5 shrink-0">
                        <button
                          onClick={() => setEditingCounselorMoodItem(m)}
                          className="flex-1 bg-[#F0EBFA] text-[#7147E8] hover:bg-[#7147E8] hover:text-white py-2.5 px-3 rounded-2xl text-xs font-black transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs active:scale-98"
                        >
                          <span>✏️</span> Edit Mood
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete '${m.name}' mood card?`)) {
                              const updated = counselorMoods.filter(item => item.id !== m.id);
                              setCounselorMoods(updated);
                              localStorage.setItem('moodflip_counselor_moods', JSON.stringify(updated));
                              window.dispatchEvent(new Event('storage'));
                            }
                          }}
                          className="bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 p-2.5 rounded-2xl text-xs font-black transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 shrink-0 shadow-2xs active:scale-95"
                          title="Delete Mood Card"
                        >
                          <span>🗑️</span>
                          <span className="hidden sm:inline font-bold">Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PAGINATION CONTROLS (When total moods > 18) */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-gray-100 pt-5 text-xs">
                    <span className="font-extrabold text-[#5B5278]">
                      Page {currentPage} of {totalPages} ({filteredMoods.length} total moods)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setMoodPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3.5 py-2 rounded-xl border border-[#EAE3F2] font-bold text-[#1A1338] hover:bg-[#FAF8FD] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        ← Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button
                          key={p}
                          onClick={() => setMoodPage(p)}
                          className={`w-8 h-8 rounded-xl font-extrabold text-xs transition cursor-pointer ${
                            currentPage === p ? 'bg-[#7147E8] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        onClick={() => setMoodPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3.5 py-2 rounded-xl border border-[#EAE3F2] font-bold text-[#1A1338] hover:bg-[#FAF8FD] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}

                {/* EDIT MOOD ITEM MODAL (Wider Container & Sticky Header/Footer) */}
                {editingCounselorMoodItem && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-white border border-[#EAE3F2] rounded-3xl p-6 md:p-8 max-w-2xl md:max-w-3xl w-full shadow-2xl max-h-[90vh] flex flex-col justify-between overflow-hidden">
                      
                      {/* STICKY TOP HEADER */}
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3 shrink-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[#7147E8] text-xl font-black">✏️</span>
                          <h3 className="font-serif font-extrabold text-lg text-[#1A1338]">
                            Edit Mood: {editingCounselorMoodItem.name}
                          </h3>
                        </div>
                        <button onClick={() => setEditingCounselorMoodItem(null)} className="text-gray-400 hover:text-gray-600 text-lg font-extrabold p-1 cursor-pointer">✕</button>
                      </div>

                      {/* SCROLLABLE FORM BODY */}
                      <div className="overflow-y-auto flex-1 space-y-4 py-4 pr-1.5 text-xs">
                        {/* Icon / Emoji Selection */}
                        <div>
                          <label className="block font-extrabold text-[#1A1338] mb-1">
                            Mood Logo / Emoji / Custom Image Upload
                          </label>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-2xl bg-[#FAF8FD] border border-[#EAE3F2] flex items-center justify-center text-2xl shrink-0 overflow-hidden shadow-2xs">
                              {editingCounselorMoodItem.iconUrl ? (
                                <img src={editingCounselorMoodItem.iconUrl} alt="Logo" className="w-full h-full object-contain" />
                              ) : (
                                editingCounselorMoodItem.emoji || '💧'
                              )}
                            </div>
                            <div className="flex-1 space-y-1">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      setEditingCounselorMoodItem({ ...editingCounselorMoodItem, iconUrl: ev.target?.result as string });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="text-[11px] text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#F0EBFA] file:text-[#7147E8]"
                              />
                              <p className="text-[10px] text-gray-400">Upload custom logo PNG/SVG or pick an emoji below</p>
                            </div>
                          </div>

                          {/* Predefined Emojis Grid */}
                          <div className="grid grid-cols-7 gap-1.5 p-2 bg-[#FAF8FD] border border-[#EAE3F2] rounded-xl">
                            {PREDEFINED_EMOJIS.map(em => (
                              <button
                                key={em}
                                type="button"
                                onClick={() => setEditingCounselorMoodItem({ ...editingCounselorMoodItem, emoji: em, iconUrl: '' })}
                                className={`h-8 rounded-lg text-lg flex items-center justify-center hover:bg-white transition ${
                                  editingCounselorMoodItem.emoji === em && !editingCounselorMoodItem.iconUrl ? 'bg-white border border-[#7147E8] shadow-xs' : ''
                                }`}
                              >
                                {em}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block font-extrabold text-[#1A1338] mb-1">Serial Number</label>
                            <input
                              type="number"
                              value={editingCounselorMoodItem.serial}
                              onChange={e => setEditingCounselorMoodItem({ ...editingCounselorMoodItem, serial: parseInt(e.target.value) || 1 })}
                              className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-extrabold bg-[#FAF8FD] text-[#7147E8]"
                            />
                          </div>
                          <div>
                            <label className="block font-extrabold text-[#1A1338] mb-1">Bad Mood</label>
                            <input
                              type="text"
                              value={editingCounselorMoodItem.name}
                              onChange={e => setEditingCounselorMoodItem({ ...editingCounselorMoodItem, name: e.target.value })}
                              className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-extrabold bg-[#FAF8FD]"
                            />
                          </div>
                          <div>
                            <label className="block font-extrabold text-[#1A1338] mb-1">Category</label>
                            <select
                              value={editingCounselorMoodItem.category || 'Anxious'}
                              onChange={e => setEditingCounselorMoodItem({ ...editingCounselorMoodItem, category: e.target.value as any })}
                              className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-bold bg-[#FAF8FD]"
                            >
                              <option value="Low">Low</option>
                              <option value="Anxious">Anxious</option>
                              <option value="Angry">Angry</option>
                              <option value="Overwhelmed">Overwhelmed</option>
                              <option value="Lonely">Lonely</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block font-extrabold text-[#1A1338] mb-1">Good Mood Target</label>
                          <input
                            type="text"
                            value={editingCounselorMoodItem.target}
                            onChange={e => setEditingCounselorMoodItem({ ...editingCounselorMoodItem, target: e.target.value })}
                            className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-bold text-emerald-700 bg-emerald-50/50"
                          />
                        </div>

                        <div>
                          <label className="block font-extrabold text-[#1A1338] mb-1">Feelings Tags (comma separated)</label>
                          <input
                            type="text"
                            value={(editingCounselorMoodItem.feelings || []).join(', ')}
                            onChange={e => setEditingCounselorMoodItem({
                              ...editingCounselorMoodItem,
                              feelings: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                            })}
                            placeholder="e.g. Nervous, Uneasy, On edge"
                            className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-medium bg-[#FAF8FD]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-extrabold text-[#1A1338] mb-1">Action Title</label>
                            <input
                              type="text"
                              value={editingCounselorMoodItem.actionTitle || ''}
                              onChange={e => setEditingCounselorMoodItem({ ...editingCounselorMoodItem, actionTitle: e.target.value })}
                              placeholder="e.g. Ground Your Feet & Name 5 Things"
                              className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-bold text-[#7147E8] bg-[#FAF8FD]"
                            />
                          </div>
                          <div>
                            <label className="block font-extrabold text-[#1A1338] mb-1">Positive Reframe Quote</label>
                            <input
                              type="text"
                              value={editingCounselorMoodItem.reframeQuote || ''}
                              onChange={e => setEditingCounselorMoodItem({ ...editingCounselorMoodItem, reframeQuote: e.target.value })}
                              placeholder="e.g. Right now, I am safe."
                              className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-bold text-[#3d2f6e] bg-[#FAF8FD]"
                            />
                          </div>
                        </div>

                        {/* Multiple 60-Second Actions Input */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="font-extrabold text-[#1A1338]">
                              60-Second Micro-Actions (Add extra actions)
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const current = editingCounselorMoodItem.actions || [editingCounselorMoodItem.actionDesc];
                                setEditingCounselorMoodItem({
                                  ...editingCounselorMoodItem,
                                  actions: [...current, '']
                                });
                              }}
                              className="text-[10px] font-extrabold text-[#7147E8] bg-[#F0EBFA] px-2.5 py-1 rounded-lg hover:bg-[#7147E8] hover:text-white transition cursor-pointer"
                            >
                              + Add Extra Action
                            </button>
                          </div>
                          <div className="space-y-2">
                            {(editingCounselorMoodItem.actions || [editingCounselorMoodItem.actionDesc]).map((act, idx) => (
                              <div key={idx} className="flex gap-2">
                                <span className="font-bold text-[#7147E8] pt-2 shrink-0">{idx + 1}.</span>
                                <textarea
                                  rows={2}
                                  value={act}
                                  onChange={e => {
                                    const newActions = [...(editingCounselorMoodItem.actions || [editingCounselorMoodItem.actionDesc])];
                                    newActions[idx] = e.target.value;
                                    setEditingCounselorMoodItem({
                                      ...editingCounselorMoodItem,
                                      actionDesc: newActions[0],
                                      actions: newActions
                                    });
                                  }}
                                  className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-medium bg-[#FAF8FD]"
                                />
                                {(editingCounselorMoodItem.actions || []).length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newActions = (editingCounselorMoodItem.actions || []).filter((_, i) => i !== idx);
                                      setEditingCounselorMoodItem({
                                        ...editingCounselorMoodItem,
                                        actionDesc: newActions[0] || '',
                                        actions: newActions
                                      });
                                    }}
                                    className="text-rose-500 hover:text-rose-700 font-extrabold text-xs px-2"
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block font-extrabold text-[#1A1338] mb-1">Counsellor Feedback / Notes (Why it helps)</label>
                          <textarea
                            rows={2}
                            value={editingCounselorMoodItem.whyHelps}
                            onChange={e => setEditingCounselorMoodItem({ ...editingCounselorMoodItem, whyHelps: e.target.value })}
                            placeholder="Enter counsellor notes..."
                            className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-medium bg-[#FAF8FD]"
                          />
                        </div>

                        <div>
                          <label className="block font-extrabold text-[#1A1338] mb-1">Column1 (Counsellor Review Notes)</label>
                          <textarea
                            rows={2}
                            value={editingCounselorMoodItem.column1Notes || ''}
                            onChange={e => setEditingCounselorMoodItem({ ...editingCounselorMoodItem, column1Notes: e.target.value })}
                            placeholder="e.g. I would remove the word 'enough'"
                            className="w-full border border-amber-200/80 rounded-xl px-3 py-2 font-medium bg-amber-50/50 text-amber-900"
                          />
                        </div>
                      </div>

                      {/* STICKY BOTTOM BUTTON BAR */}
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100 shrink-0">
                        <button
                          onClick={() => {
                            const updated = counselorMoods.map(item => item.id === editingCounselorMoodItem.id ? editingCounselorMoodItem : item);
                            setCounselorMoods(updated);
                            localStorage.setItem('moodflip_counselor_moods', JSON.stringify(updated));
                            window.dispatchEvent(new Event('storage'));
                            setEditingCounselorMoodItem(null);
                          }}
                          className="flex-1 bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white py-3 rounded-2xl text-xs font-extrabold shadow-lg shadow-[#7147E8]/25 hover:opacity-95 transition cursor-pointer active:scale-98"
                        >
                          💾 Save Changes
                        </button>
                        <button
                          onClick={() => setEditingCounselorMoodItem(null)}
                          className="px-5 py-3 rounded-2xl border border-[#EAE3F2] text-gray-600 text-xs font-bold hover:bg-gray-50 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ADD NEW MOOD PAGE MODAL (Wider Container) */}
                {showAddMoodModal && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-white border border-[#EAE3F2] rounded-3xl p-6 md:p-8 max-w-2xl md:max-w-3xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
                      {/* Modal Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[#7147E8] text-2xl font-black">+</span>
                          <h3 className="font-serif font-extrabold text-xl text-[#1A1338]">
                            Add New Mood Page
                          </h3>
                        </div>
                        <button onClick={() => setShowAddMoodModal(false)} className="text-gray-400 hover:text-gray-600 text-lg font-extrabold p-1 cursor-pointer">✕</button>
                      </div>

                      <div className="space-y-4 text-xs">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-extrabold text-[#1A1338] mb-1">
                              Serial Number
                            </label>
                            <input
                              type="number"
                              value={newMoodForm.serial}
                              onChange={(e) => setNewMoodForm({ ...newMoodForm, serial: parseInt(e.target.value) || 29 })}
                              className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-extrabold bg-[#FAF8FD] text-[#7147E8]"
                            />
                          </div>
                          <div>
                            <label className="block font-extrabold text-[#1A1338] mb-1">
                              Category
                            </label>
                            <select
                              value={newMoodForm.category}
                              onChange={e => setNewMoodForm({ ...newMoodForm, category: e.target.value as any })}
                              className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-bold bg-[#FAF8FD]"
                            >
                              <option value="Low">Low</option>
                              <option value="Anxious">Anxious</option>
                              <option value="Angry">Angry</option>
                              <option value="Overwhelmed">Overwhelmed</option>
                              <option value="Lonely">Lonely</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-extrabold text-[#1A1338] mb-1">
                              Bad Mood
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Scared, Anxious, Weak..."
                              value={newMoodForm.name}
                              onChange={(e) => setNewMoodForm({ ...newMoodForm, name: e.target.value })}
                              className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-extrabold bg-[#FAF8FD]"
                            />
                          </div>
                          <div>
                            <label className="block font-extrabold text-[#1A1338] mb-1">
                              Good Mood Target
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Safe / Peaceful, Confident..."
                              value={newMoodForm.target}
                              onChange={(e) => setNewMoodForm({ ...newMoodForm, target: e.target.value })}
                              className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-bold text-emerald-700 bg-emerald-50/50"
                            />
                          </div>
                        </div>

                        {/* Dynamic 60-Second Micro-Actions (+ Add Extra Action) List */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="font-extrabold text-[#1A1338]">
                              60-Second Micro-Actions (Add extra actions)
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                setNewMoodForm({
                                  ...newMoodForm,
                                  actionsList: [...(newMoodForm.actionsList || ['']), '']
                                });
                              }}
                              className="text-[10px] font-extrabold text-[#7147E8] bg-[#F0EBFA] px-2.5 py-1 rounded-lg hover:bg-[#7147E8] hover:text-white transition cursor-pointer"
                            >
                              + Add Extra Action
                            </button>
                          </div>
                          <div className="space-y-2">
                            {(newMoodForm.actionsList || ['']).map((act, idx) => (
                              <div key={idx} className="flex gap-2">
                                <span className="font-bold text-[#7147E8] pt-2 shrink-0">{idx + 1}.</span>
                                <textarea
                                  rows={2}
                                  value={act}
                                  onChange={e => {
                                    const newActions = [...(newMoodForm.actionsList || [''])];
                                    newActions[idx] = e.target.value;
                                    setNewMoodForm({
                                      ...newMoodForm,
                                      actionDesc: newActions[0] || '',
                                      actionsList: newActions
                                    });
                                  }}
                                  placeholder={`Action step ${idx + 1}...`}
                                  className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-medium bg-[#FAF8FD]"
                                />
                                {(newMoodForm.actionsList || []).length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newActions = (newMoodForm.actionsList || []).filter((_, i) => i !== idx);
                                      setNewMoodForm({
                                        ...newMoodForm,
                                        actionDesc: newActions[0] || '',
                                        actionsList: newActions
                                      });
                                    }}
                                    className="text-rose-500 hover:text-rose-700 font-extrabold text-xs px-2 cursor-pointer"
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block font-extrabold text-[#1A1338] mb-1">
                            Column1 (Counsellor Review Notes)
                          </label>
                          <textarea
                            rows={2}
                            placeholder="e.g. I would remove the word 'enough'..."
                            value={newMoodForm.column1Notes}
                            onChange={(e) => setNewMoodForm({ ...newMoodForm, column1Notes: e.target.value })}
                            className="w-full border border-amber-200/80 rounded-xl px-3 py-2 font-medium bg-amber-50/50 text-amber-900"
                          />
                        </div>

                        <div>
                          <label className="block font-extrabold text-[#1A1338] mb-1">Feelings Tags (comma separated)</label>
                          <input
                            type="text"
                            placeholder="e.g. Fearful, Terrified, Panicked, Uneasy"
                            value={newMoodForm.feelingsInput}
                            onChange={e => setNewMoodForm({ ...newMoodForm, feelingsInput: e.target.value })}
                            className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-medium bg-[#FAF8FD]"
                          />
                        </div>

                        {/* Mood Logo / Emoji / Custom Image Upload */}
                        <div>
                          <label className="block font-extrabold text-[#1A1338] mb-1">
                            Mood Logo / Emoji / Custom Image Upload
                          </label>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-2xl bg-[#FAF8FD] border border-[#EAE3F2] flex items-center justify-center text-2xl shrink-0 overflow-hidden shadow-2xs">
                              {newMoodForm.iconUrl ? (
                                <img src={newMoodForm.iconUrl} alt="Logo" className="w-full h-full object-contain" />
                              ) : (
                                newMoodForm.emoji || '😨'
                              )}
                            </div>
                            <div className="flex-1 space-y-1">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      setNewMoodForm({ ...newMoodForm, iconUrl: ev.target?.result as string });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="text-[11px] text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#F0EBFA] file:text-[#7147E8]"
                              />
                              <p className="text-[10px] text-gray-400">Upload custom logo PNG/SVG or pick an emoji below</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-7 gap-1.5 p-2 bg-[#FAF8FD] border border-[#EAE3F2] rounded-xl">
                            {PREDEFINED_EMOJIS.slice(0, 14).map(em => (
                              <button
                                key={em}
                                type="button"
                                onClick={() => setNewMoodForm({ ...newMoodForm, emoji: em, iconUrl: '' })}
                                className={`h-8 rounded-lg text-lg flex items-center justify-center hover:bg-white transition ${
                                  newMoodForm.emoji === em && !newMoodForm.iconUrl ? 'bg-white border border-[#7147E8] shadow-xs' : ''
                                }`}
                              >
                                {em}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Counsellor Notes */}
                        <div>
                          <label className="block font-extrabold text-[#1A1338] mb-1 text-[11px]">Counsellor Feedback / Notes</label>
                          <textarea
                            rows={2}
                            placeholder="Optional counsellor review notes..."
                            value={newMoodForm.whyHelps}
                            onChange={e => setNewMoodForm({ ...newMoodForm, whyHelps: e.target.value })}
                            className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-medium bg-[#FAF8FD] text-xs"
                          />
                        </div>
                      </div>

                      {/* Primary Button: Save & Publish Mood Page (Matching User Screenshot!) */}
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            if (!newMoodForm.name) {
                              alert('Please enter a Mood Title.');
                              return;
                            }
                            const validActions = newMoodForm.actionsList.filter(Boolean);
                            const feelingsArr = newMoodForm.feelingsInput
                              ? newMoodForm.feelingsInput.split(',').map(s => s.trim()).filter(Boolean)
                              : [newMoodForm.name];

                            const newEntry: CounselorPromptItem = {
                              serial: counselorMoods.length + 1,
                              id: newMoodForm.name.toLowerCase().replace(/\s+/g, '-'),
                              name: newMoodForm.name,
                              emoji: newMoodForm.emoji,
                              iconUrl: newMoodForm.iconUrl || undefined,
                              category: newMoodForm.category,
                              bgColor: '#F3E8FF',
                              textColor: '#7147E8',
                              feelings: feelingsArr,
                              target: newMoodForm.target || 'Peaceful',
                              actionTitle: newMoodForm.actionDesc || newMoodForm.name,
                              actionDesc: newMoodForm.actionDesc || 'Take 3 deep breaths and relax.',
                              whyHelps: newMoodForm.whyHelps || 'Grounds your body and clears your mind.',
                              actions: validActions.length > 0 ? validActions : [newMoodForm.actionDesc || 'Take 3 deep breaths.'],
                              reframeQuote: newMoodForm.reframeQuote || 'This is temporary and you are in control.',
                              column1Notes: newMoodForm.column1Notes || undefined,
                            };
                            const updated = [...counselorMoods, newEntry];
                            setCounselorMoods(updated);
                            localStorage.setItem('moodflip_counselor_moods', JSON.stringify(updated));
                            window.dispatchEvent(new Event('storage'));
                            setShowAddMoodModal(false);
                          }}
                          className="w-full bg-[#7147E8] hover:bg-[#6035DB] text-white py-3.5 rounded-2xl text-xs font-black shadow-lg shadow-[#7147E8]/25 transition cursor-pointer active:scale-98"
                        >
                          Save & Publish Mood Page
                        </button>
                        <button
                          onClick={() => setShowAddMoodModal(false)}
                          className="w-full mt-3 py-3 rounded-2xl border border-[#EAE3F2] text-gray-600 text-xs font-bold hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* VIEW TAB 5: PLANS & PAYMENTS */}
          {activeTab === 'Plans & Payments' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-4 sm:p-8 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="font-serif font-extrabold text-2xl text-[#1A1338]">Plans &amp; Payments Management 💳</h2>
                  <p className="text-xs text-gray-500 font-semibold mt-1">Track 7-Day &amp; 30-Day Plan pricing, sales and revenue metrics.</p>
                </div>
                <button onClick={() => setActiveModal('createPlan')} className="w-full sm:w-auto bg-[#7147E8] text-white px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-sm hover:opacity-95 transition text-center shrink-0">
                  🎁 Create New Plan
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] space-y-3">
                  <div className="flex items-center justify-between">
                    <strong className="text-base font-bold text-[#1A1338]">7-Day Mindset Plan</strong>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-extrabold">$9.99 / one-time</span>
                  </div>
                  <p className="text-xs text-[#5B5278]">Total Sales: 1,842 units · Total Revenue: $18,401</p>
                  <button onClick={exportUsersCSV} className="px-3.5 py-2 rounded-xl bg-[#7147E8] text-white text-xs font-bold">
                    Export Subscribers List
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] space-y-3">
                  <div className="flex items-center justify-between">
                    <strong className="text-base font-bold text-[#1A1338]">30-Day Transformation Plan</strong>
                    <span className="px-2.5 py-1 rounded-full bg-purple-100 text-[#7147E8] text-xs font-extrabold">$19.99 (Draft)</span>
                  </div>
                  <p className="text-xs text-[#5B5278]">Total Sales: 0 units · Launching soon</p>
                  <button onClick={() => {}} className="px-3.5 py-2 rounded-xl bg-gray-100 text-gray-700 border border-gray-200 text-xs font-bold">
                    Edit Plan Details
                  </button>
                </div>
              </div>

              {/* 💳 PAYMENT GATEWAY CONFIGURATION PANEL (STRIPE & PAYPAL) */}
              <div className="border-t border-gray-200 pt-6 space-y-5">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#1A1338] flex items-center gap-2">
                    💳 Payment Gateways Configuration (Stripe &amp; PayPal)
                  </h3>
                  <p className="text-xs text-gray-500">Enable or disable payment gateways and configure your API keys for live or sandbox checkouts.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* STRIPE CARD */}
                  <div className="p-5 rounded-2xl bg-white border border-[#EAE3F2] shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">💳</span>
                        <div>
                          <strong className="block text-sm font-bold text-[#1A1338]">Stripe Gateway</strong>
                          <span className="text-[10px] text-gray-400">Credit / Debit Cards, Apple Pay, Google Pay</span>
                        </div>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paymentSettings.stripeEnabled}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeEnabled: e.target.checked })}
                          className="w-5 h-5 accent-[#7147E8]"
                        />
                        <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${paymentSettings.stripeEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                          {paymentSettings.stripeEnabled ? 'ENABLED' : 'DISABLED'}
                        </span>
                      </label>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Stripe Publishable Key</label>
                        <input
                          type="text"
                          value={paymentSettings.stripePubKey}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, stripePubKey: e.target.value })}
                          className="w-full border border-gray-200 p-2.5 rounded-xl font-mono text-[11px] bg-[#FAF8FD]"
                          placeholder="pk_test_..."
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Stripe Secret Key</label>
                        <input
                          type="password"
                          value={paymentSettings.stripeSecretKey}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeSecretKey: e.target.value })}
                          className="w-full border border-gray-200 p-2.5 rounded-xl font-mono text-[11px] bg-[#FAF8FD]"
                          placeholder="sk_test_..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* PAYPAL CARD */}
                  <div className="p-5 rounded-2xl bg-white border border-[#EAE3F2] shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🅿️</span>
                        <div>
                          <strong className="block text-sm font-bold text-[#1A1338]">PayPal Gateway</strong>
                          <span className="text-[10px] text-gray-400">PayPal Balance &amp; Express Checkout</span>
                        </div>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paymentSettings.paypalEnabled}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalEnabled: e.target.checked })}
                          className="w-5 h-5 accent-[#7147E8]"
                        />
                        <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${paymentSettings.paypalEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                          {paymentSettings.paypalEnabled ? 'ENABLED' : 'DISABLED'}
                        </span>
                      </label>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">PayPal Client ID</label>
                        <input
                          type="text"
                          value={paymentSettings.paypalClientId}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalClientId: e.target.value })}
                          className="w-full border border-gray-200 p-2.5 rounded-xl font-mono text-[11px] bg-[#FAF8FD]"
                          placeholder="A21AAH..."
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">PayPal Mode</label>
                        <select
                          value={paymentSettings.paypalMode}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalMode: e.target.value })}
                          className="w-full border border-gray-200 p-2.5 rounded-xl font-medium text-xs bg-[#FAF8FD]"
                        >
                          <option value="sandbox">Sandbox (Testing)</option>
                          <option value="live">Live (Production)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => savePaymentSettings(paymentSettings)}
                    className="bg-[#7147E8] hover:bg-[#5f38d4] text-white px-6 py-3 rounded-xl text-xs font-extrabold shadow-md transition cursor-pointer"
                  >
                    💾 Save Gateway Settings
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* VIEW TAB 6: REPORTS */}
          {activeTab === 'Reports' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-5">
              <h2 className="font-serif font-bold text-xl text-[#1A1338]">Reports &amp; Platform Logs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Monthly User Retention Report', date: 'May 2026', format: 'PDF' },
                  { name: 'Mood Shift Efficacy Analysis', date: 'May 2026', format: 'CSV' },
                  { name: '90-Day Auto-Deletion Audit Log', date: 'May 2026', format: 'LOG' },
                ].map((rep, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA] flex items-center justify-between">
                    <div>
                      <strong className="block text-xs font-bold text-[#1A1338]">{rep.name}</strong>
                      <span className="text-[10px] text-gray-400">{rep.date} · {rep.format}</span>
                    </div>
                    <button onClick={() => {}} className="px-3 py-1.5 rounded-lg bg-[#7147E8] text-white text-xs font-bold">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW TAB 7: EMAIL LEADS & MARKETING SUITE */}
          {activeTab === 'Email Leads' && (
            <div className="space-y-6">
              <div className="bg-white border border-[#EAE3F2] rounded-3xl p-4 sm:p-8 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                  <div>
                    <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338]">Collected Email Leads ({leads.length}) ✉️</h2>
                    <p className="text-xs md:text-sm text-[#68607F] font-semibold mt-1">Leads captured through 7-Day Plan popups and daily reminders.</p>
                  </div>
                  <button onClick={exportLeadsCSV} className="w-full sm:w-auto bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md hover:scale-[1.01] transition cursor-pointer text-center">
                    📥 Export Leads CSV
                  </button>
                </div>

                <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
                  <table className="w-full min-w-[650px] text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-400 font-extrabold uppercase text-[10px] tracking-wider">
                        <th className="py-3.5 px-3">ID</th>
                        <th className="py-3.5 px-3">Email Address</th>
                        <th className="py-3.5 px-3">Date Captured</th>
                        <th className="py-3.5 px-3">Source Channel</th>
                        <th className="py-3.5 px-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {leads.map((l) => (
                        <tr key={l.id} className="hover:bg-[#FAF8FD] transition">
                          <td className="py-3.5 px-3 text-gray-400 font-bold">#{l.id}</td>
                          <td className="py-3.5 px-3 font-extrabold text-sm text-[#1A1338]">{l.email}</td>
                          <td className="py-3.5 px-3 text-gray-500 font-medium">{l.date}</td>
                          <td className="py-3.5 px-3">
                            <span className="bg-purple-100 text-[#7147E8] px-3 py-1 rounded-full text-xs font-extrabold whitespace-nowrap">{l.source}</span>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-extrabold whitespace-nowrap">Subscribed</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* EMAIL MARKETING BROADCAST CAMPAIGN SUITE */}
              <div className="bg-white border border-[#EAE3F2] rounded-3xl p-4 sm:p-8 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7147E8] to-[#9333EA] text-white flex items-center justify-center font-extrabold text-lg shadow-xs shrink-0">
                      🚀
                    </span>
                    <div>
                      <h3 className="font-serif font-extrabold text-xl text-[#1A1338]">Email Marketing &amp; Broadcast Suite</h3>
                      <p className="text-xs text-[#68607F] font-semibold">Send promotional newsletters, drip sequences, and 7-day plan offers to user segments.</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 self-start sm:self-auto">
                    SMTP Server Ready
                  </span>
                </div>

                {campaignStatus && (
                  <div className={`p-4 rounded-2xl text-xs font-bold transition-all ${
                    campaignStatus.type === 'sending' ? 'bg-amber-50 border border-amber-200 text-amber-800 animate-pulse' : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  }`}>
                    {campaignStatus.text}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-extrabold text-[#1A1338] mb-1.5">Target Audience Segment</label>
                    <select
                      value={emailCampaign.audience}
                      onChange={e => setEmailCampaign({ ...emailCampaign, audience: e.target.value })}
                      className="w-full border border-[#EAE3F2] p-3 rounded-xl bg-[#FAF8FD] font-extrabold text-[#1A1338]"
                    >
                      <option>All Registered Users (12,458)</option>
                      <option>Active Paid 7-Day Plan Buyers (3,276)</option>
                      <option>Email Lead Subscribers (8,942)</option>
                      <option>Inactive Users (1,842)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-extrabold text-[#1A1338] mb-1.5">Email Template</label>
                    <select
                      value={emailCampaign.template}
                      onChange={e => {
                        const t = e.target.value;
                        if (t === 'welcome') {
                          setEmailCampaign({
                            ...emailCampaign,
                            template: t,
                            subject: '✨ Transform Your Mindset with MoodFlip 7-Day Plan',
                            body: 'Hi {{name}},\n\nWelcome to MoodFlip! We are thrilled to guide your mindset shift journey today.\n\nBest regards,\nThe MoodFlip Team'
                          });
                        } else if (t === 'discount') {
                          setEmailCampaign({
                            ...emailCampaign,
                            template: t,
                            subject: '🔥 Limited Time Offer: Get 50% Off 7-Day Mindset Plan!',
                            body: 'Hi {{name}},\n\nUnlock full access to your personalized 30-day mindset shift plan today at 50% off!\n\nBest regards,\nThe MoodFlip Team'
                          });
                        }
                      }}
                      className="w-full border border-[#EAE3F2] p-3 rounded-xl bg-[#FAF8FD] font-extrabold text-[#1A1338]"
                    >
                      <option value="welcome">Welcome Onboarding Sequence</option>
                      <option value="discount">Special Discount Offer (50% Off)</option>
                      <option value="digest">Weekly Mindset Shift Digest</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-extrabold text-[#1A1338] mb-1.5">Email Subject Line</label>
                  <input
                    type="text"
                    value={emailCampaign.subject}
                    onChange={e => setEmailCampaign({ ...emailCampaign, subject: e.target.value })}
                    className="w-full border border-[#EAE3F2] p-3 rounded-xl bg-[#FAF8FD] font-bold text-[#1A1338] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-[#1A1338] mb-1.5">Email Body Content</label>
                  <textarea
                    rows={4}
                    value={emailCampaign.body}
                    onChange={e => setEmailCampaign({ ...emailCampaign, body: e.target.value })}
                    className="w-full border border-[#EAE3F2] p-3.5 rounded-xl bg-[#FAF8FD] font-medium text-[#1A1338] text-xs"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-gray-400 font-semibold">Tags available: {'{{name}}'}, {'{{email}}'}, {'{{plan_url}}'}</span>
                  <button
                    onClick={() => {
                      setCampaignStatus({ type: 'sending', text: '🚀 Preparing SMTP server and broadcasting email campaign to segment...' });
                      setTimeout(() => {
                        setCampaignStatus({ type: 'success', text: `✅ Email Broadcast Campaign successfully sent to ${emailCampaign.audience} via SMTP!` });
                      }, 1800);
                    }}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white px-6 py-3 rounded-xl text-xs font-extrabold shadow-md hover:scale-[1.01] transition cursor-pointer text-center"
                  >
                    🚀 Broadcast Campaign Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW TAB 8: ANALYTICS */}
          {activeTab === 'Analytics' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-5">
              <h2 className="font-serif font-bold text-xl text-[#1A1338]">Traffic &amp; Engagement Analytics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA]">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Daily Active Users</span>
                  <div className="font-serif text-2xl font-extrabold text-[#1A1338]">3,420</div>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA]">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Conversion Rate</span>
                  <div className="font-serif text-2xl font-extrabold text-emerald-600">14.8%</div>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA]">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Bounce Rate</span>
                  <div className="font-serif text-2xl font-extrabold text-sky-600">22.4%</div>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA]">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Avg. Session Time</span>
                  <div className="font-serif text-2xl font-extrabold text-purple-600">4m 12s</div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW TAB 9: GOOGLE ADSENSE & AD SPACES */}
          {activeTab === 'Ad Spaces' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                  <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338]">Google AdSense &amp; Ad Spaces Manager 📢</h2>
                  <p className="text-xs md:text-sm text-[#68607F] font-semibold mt-1">Enable global ads, configure Google Auto Ads script, and toggle individual ad placement slots.</p>
                </div>
                <button
                  onClick={saveAdsSettings}
                  className="bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md hover:scale-[1.01] transition cursor-pointer shrink-0"
                >
                  💾 Save All Ad Settings
                </button>
              </div>

              {/* 1. MASTER ADSENSE TOGGLE & MODE SWITCH */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Global Status Switch */}
                <div className="bg-[#FAF8FD] border border-[#EAE3F2] rounded-2xl p-5 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="block text-sm font-extrabold text-[#1A1338]">Global Advertisements Status</strong>
                      <span className="text-xs text-gray-500 font-medium">Turn on/off all ads across the entire site</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={adsSettings.globalEnabled}
                      onChange={e => setAdsSettings({ ...adsSettings, globalEnabled: e.target.checked })}
                      className="w-5 h-5 accent-[#7147E8] cursor-pointer"
                    />
                  </div>
                  <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-500">Current Status:</span>
                    <span className={`font-extrabold px-3 py-1 rounded-full text-[10px] ${adsSettings.globalEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {adsSettings.globalEnabled ? '🟢 GLOBAL ADS ACTIVE' : '🔴 ALL ADS DISABLED'}
                    </span>
                  </div>
                </div>

                {/* Ads Mode Switch */}
                <div className="bg-[#FAF8FD] border border-[#EAE3F2] rounded-2xl p-5 shadow-2xs space-y-3">
                  <strong className="block text-sm font-extrabold text-[#1A1338]">Ad Placement Mode</strong>
                  <span className="text-xs text-gray-500 font-medium block">Choose between Google Automatic Ads or Manual Ad Units</span>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setAdsSettings({ ...adsSettings, mode: 'auto' })}
                      className={`py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                        adsSettings.mode === 'auto'
                          ? 'bg-[#7147E8] text-white border-[#7147E8] shadow-xs'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      🤖 Auto Ads (Script)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdsSettings({ ...adsSettings, mode: 'manual' })}
                      className={`py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                        adsSettings.mode === 'manual'
                          ? 'bg-[#7147E8] text-white border-[#7147E8] shadow-xs'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      📐 Manual Ad Slots
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. ADSENSE PUBLISHER ID & AUTO ADS SCRIPT */}
              <div className="bg-[#FAF8FD] border border-[#EAE3F2] rounded-2xl p-5 shadow-2xs space-y-4">
                <h3 className="font-serif font-extrabold text-base text-[#1A1338] flex items-center gap-2">
                  <span>📜</span> AdSense Publisher ID &amp; Script Configuration
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#1A1338] mb-1">AdSense Client / Publisher ID</label>
                    <input
                      type="text"
                      value={adsSettings.adSenseClient}
                      onChange={e => setAdsSettings({ ...adsSettings, adSenseClient: e.target.value })}
                      placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                      className="w-full bg-white border border-[#EAE3F2] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#1A1338] focus:outline-none focus:border-[#7147E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#1A1338] mb-1">Auto Ads Script Tag</label>
                    <textarea
                      rows={2}
                      value={adsSettings.autoAdsScript}
                      onChange={e => setAdsSettings({ ...adsSettings, autoAdsScript: e.target.value })}
                      placeholder="<script async src='...'></script>"
                      className="w-full bg-white border border-[#EAE3F2] rounded-xl px-3.5 py-2 text-[11px] font-mono text-[#1A1338] focus:outline-none focus:border-[#7147E8]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. INDIVIDUAL MANUAL AD SLOTS CONFIGURATION (7 PLACEMENTS) */}
              <div className="space-y-4 w-full min-w-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <h3 className="font-serif font-extrabold text-lg sm:text-xl text-[#1A1338] flex items-center gap-2">
                    <span>🎯</span> Manual Ad Slots Enable/Disable &amp; Code Snippets (7 Placements)
                  </h3>
                  <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Responsive Grid Activated
                  </span>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 w-full min-w-0">
                  {[
                    { key: 'headerBanner', title: 'Header Top Leaderboard Ad (728x90)', desc: 'Displayed below page navigation header', defaultCode: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9876543210123456" data-ad-slot="1234567890" data-ad-format="auto"></ins>' },
                    { key: 'sidebarAd', title: 'Sidebar Medium Rectangle Ad (300x250)', desc: 'Displayed in dashboard & profile sidebars', defaultCode: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9876543210123456" data-ad-slot="2345678901" data-ad-format="rectangle"></ins>' },
                    { key: 'moodLibraryAd', title: 'In-Feed Mood Library Ad (Responsive)', desc: 'Inserted between mood items in feed', defaultCode: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9876543210123456" data-ad-slot="3456789012" data-ad-format="horizontal"></ins>' },
                    { key: 'footerBanner', title: 'Footer Banner Ad Unit (728x90)', desc: 'Displayed above footer on all pages', defaultCode: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9876543210123456" data-ad-slot="4567890123" data-ad-format="auto"></ins>' },
                    { key: 'planPageAd', title: '30-Day Plan Page Banner Ad', desc: 'Displayed on My 30-Day Plan tab', defaultCode: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9876543210123456" data-ad-slot="5678901234" data-ad-format="auto"></ins>' },
                    { key: 'checkinModalAd', title: 'Check-in Results Popup Ad', desc: 'Displayed inside check-in modal', defaultCode: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9876543210123456" data-ad-slot="6789012345" data-ad-format="fluid"></ins>' },
                    { key: 'stickyMobileAd', title: 'Sticky Mobile Anchor Ad (320x50)', desc: 'Pinned to bottom of mobile screens', defaultCode: '<ins class="adsbygoogle" style="display:inline-block;width:320px;height:50px" data-ad-client="ca-pub-9876543210123456" data-ad-slot="7890123456"></ins>' },
                  ].map((item) => {
                    const slot = (adsSettings.slots as any)[item.key] || { enabled: true, code: item.defaultCode };
                    return (
                      <div key={item.key} className="bg-white border border-[#EAE3F2] rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 w-full min-w-0 overflow-hidden break-words flex flex-col justify-between hover:border-[#7147E8]/40 transition">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 pr-2">
                              <strong className="block text-xs sm:text-sm font-extrabold text-[#1A1338] truncate">{item.title}</strong>
                              <span className="text-[11px] text-gray-500 font-medium block leading-tight">{item.desc}</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${slot.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                                {slot.enabled ? '🟢 ACTIVE' : '⚪ OFF'}
                              </span>
                              <input 
                                type="checkbox" 
                                checked={slot.enabled}
                                onChange={e => setAdsSettings({
                                  ...adsSettings,
                                  slots: {
                                    ...adsSettings.slots,
                                    [item.key]: { ...slot, enabled: e.target.checked }
                                  }
                                })}
                                className="w-5 h-5 accent-[#7147E8] cursor-pointer"
                              />
                            </div>
                          </div>

                          <div className="relative">
                            <textarea
                              rows={3}
                              value={slot.code || ''}
                              onChange={e => setAdsSettings({
                                ...adsSettings,
                                slots: {
                                  ...adsSettings.slots,
                                  [item.key]: { ...slot, code: e.target.value }
                                }
                              })}
                              placeholder="Paste AdSense <ins ...></ins> code snippet here..."
                              className="w-full bg-[#FAF8FD] border border-[#EAE3F2] rounded-xl p-3 text-[11px] sm:text-xs font-mono text-[#1A1338] focus:bg-white focus:outline-none focus:border-[#7147E8] transition resize-y min-h-[80px] whitespace-pre-wrap break-all sm:break-normal"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-100 text-[11px]">
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard?.writeText(slot.code || '');
                            }}
                            className="text-[#7147E8] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            📋 Copy Snippet
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setAdsSettings({
                                ...adsSettings,
                                slots: {
                                  ...adsSettings.slots,
                                  [item.key]: { ...slot, code: item.defaultCode }
                                }
                              });
                            }}
                            className="text-gray-400 font-bold hover:text-gray-600 flex items-center gap-1 cursor-pointer"
                          >
                            🔄 Reset Default
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* VIEW TAB 10: SEO & SEARCH CONSOLE */}
          {activeTab === 'SEO & Search Console' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-4 sm:p-8 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                  <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338]">SEO &amp; Webmaster Control Center 🔍</h2>
                  <p className="text-xs md:text-sm text-[#68607F] font-semibold mt-1">Configure Meta Titles, Meta Descriptions, Google Search Console Verification, GA4 Analytics, and Traffic Monitoring.</p>
                </div>
                <button
                  onClick={() => saveSeoSettings(seoSettings)}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md hover:scale-[1.01] transition cursor-pointer text-center shrink-0"
                >
                  💾 Save SEO Settings
                </button>
              </div>

              {/* 1. SITE-WIDE META & HEADINGS CONFIG */}
              <div className="bg-[#FAF8FD] border border-[#EAE3F2] rounded-2xl p-5 shadow-2xs space-y-4">
                <h3 className="font-serif font-extrabold text-base text-[#1A1338] flex items-center gap-2">
                  <span>🏷️</span> Website Global Meta Tags &amp; Title Configuration
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-extrabold text-[#1A1338] mb-1">Homepage &amp; Global Meta Title Tag (&lt;title&gt;)</label>
                    <input
                      type="text"
                      value={seoSettings.metaTitle}
                      onChange={e => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                      className="w-full bg-white border border-[#EAE3F2] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#1A1338]"
                    />
                  </div>

                  <div>
                    <label className="block font-extrabold text-[#1A1338] mb-1">Global Meta Description Tag</label>
                    <textarea
                      rows={2}
                      value={seoSettings.metaDescription}
                      onChange={e => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                      className="w-full bg-white border border-[#EAE3F2] rounded-xl px-3.5 py-2 text-xs font-medium text-[#1A1338]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-extrabold text-[#1A1338] mb-1">Keywords Tag</label>
                      <input
                        type="text"
                        value={seoSettings.keywords}
                        onChange={e => setSeoSettings({ ...seoSettings, keywords: e.target.value })}
                        className="w-full bg-white border border-[#EAE3F2] rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#1A1338]"
                      />
                    </div>
                    <div>
                      <label className="block font-extrabold text-[#1A1338] mb-1">Canonical Site URL</label>
                      <input
                        type="text"
                        value={seoSettings.canonicalUrl}
                        onChange={e => setSeoSettings({ ...seoSettings, canonicalUrl: e.target.value })}
                        className="w-full bg-white border border-[#EAE3F2] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#1A1338]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. GOOGLE SEARCH CONSOLE & ANALYTICS INTEGRATION */}
              <div className="bg-[#FAF8FD] border border-[#EAE3F2] rounded-2xl p-5 shadow-2xs space-y-4">
                <h3 className="font-serif font-extrabold text-base text-[#1A1338] flex items-center gap-2">
                  <span>📊</span> Google Search Console &amp; GA4 Analytics Verification
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-extrabold text-[#1A1338] mb-1">Google Search Console Verification Meta Tag</label>
                    <input
                      type="text"
                      value={seoSettings.googleSearchConsoleTag}
                      onChange={e => setSeoSettings({ ...seoSettings, googleSearchConsoleTag: e.target.value })}
                      placeholder="google-site-verification=..."
                      className="w-full bg-white border border-[#EAE3F2] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#1A1338]"
                    />
                  </div>

                  <div>
                    <label className="block font-extrabold text-[#1A1338] mb-1">Google Analytics (GA4) Measurement ID</label>
                    <input
                      type="text"
                      value={seoSettings.gaMeasurementId}
                      onChange={e => setSeoSettings({ ...seoSettings, gaMeasurementId: e.target.value })}
                      placeholder="G-XXXXXXXXXX"
                      className="w-full bg-white border border-[#EAE3F2] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#1A1338]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* ═══════════════════════════════════════════════════════════
               BLOG MANAGER — WordPress-Style
          ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'Blog Manager' && !editingPost && (
            <div className="space-y-5">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#EAE3F2] shadow-2xs">
                <div>
                  <h2 className="font-serif font-extrabold text-2xl text-[#1A1338]">Posts 📝</h2>
                  <div className="flex items-center gap-3 mt-1.5 text-xs font-semibold">
                    {(['all', 'published', 'draft'] as const).map(f => (
                      <button key={f} onClick={() => setBlogFilter(f)}
                        className={`capitalize transition ${blogFilter === f ? 'text-[#7147E8] font-extrabold underline underline-offset-4' : 'text-gray-400 hover:text-[#7147E8]'}`}>
                        {f} ({f === 'all' ? blogPosts.length : blogPosts.filter(p => f === 'published' ? p.published : !p.published).length})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                  <div className="relative w-full sm:w-48">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input type="text" value={blogSearch} onChange={e => setBlogSearch(e.target.value)}
                      placeholder="Search posts..."
                      className="w-full pl-8 pr-3 py-2 text-xs font-semibold border border-[#EAE3F2] rounded-xl bg-[#FAF8FD] focus:bg-white focus:outline-none focus:border-[#7147E8]"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const newPost = {
                        id: Date.now().toString(),
                        slug: 'new-post-' + Date.now(),
                        title: 'New Post',
                        excerpt: '',
                        content: '<h2>Introduction</h2><p>Write your content here...</p>',
                        category: 'Mindset Science',
                        author: 'MoodFlip Team',
                        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                        readTime: '3 min read',
                        emoji: '📝',
                        published: false,
                        coverColor: 'from-violet-500 to-purple-700',
                      };
                      setBlogPosts(prev => {
                        const updated = [...prev, newPost];
                        localStorage.setItem('moodflip_blog_posts', JSON.stringify(updated));
                        return updated;
                      });
                      setEditingPost(newPost);
                    }}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-sm hover:opacity-90 transition cursor-pointer text-center shrink-0"
                  >
                    + Add New Post
                  </button>
                </div>
              </div>

              {/* 1. MOBILE CARD VIEW (Block on mobile screens) */}
              <div className="block md:hidden space-y-3">
                {blogPosts
                  .filter(p => blogFilter === 'all' ? true : blogFilter === 'published' ? p.published : !p.published)
                  .filter(p => !blogSearch || p.title.toLowerCase().includes(blogSearch.toLowerCase()) || p.category.toLowerCase().includes(blogSearch.toLowerCase()))
                  .map((post) => (
                    <div key={post.id} className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-2xs space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <span className="text-2xl shrink-0 mt-0.5">{post.emoji}</span>
                          <div className="min-w-0">
                            <h3 className="font-serif font-extrabold text-sm text-[#1A1338] leading-snug">{post.title}</h3>
                            <p className="text-[11px] text-gray-400 font-mono truncate mt-0.5">/{post.slug}</p>
                          </div>
                        </div>
                        <span className={`shrink-0 text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                          post.published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {post.published ? '● Published' : '○ Draft'}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500 font-semibold pt-1 border-t border-gray-100">
                        <span className="bg-purple-50 text-[#7147E8] px-2.5 py-0.5 rounded-md font-bold">{post.category}</span>
                        <span>•</span>
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>

                      {/* Always Visible Mobile Action Buttons */}
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100 text-xs font-extrabold">
                        <button
                          onClick={() => setEditingPost(post)}
                          className="flex-1 py-1.5 rounded-lg bg-[#FAF8FD] border border-[#EAE3F2] text-[#7147E8] text-center hover:bg-[#7147E8] hover:text-white transition"
                        >
                          ✏️ Edit
                        </button>
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-1.5 rounded-lg bg-[#FAF8FD] border border-[#EAE3F2] text-gray-700 text-center hover:bg-gray-100 transition"
                        >
                          👁️ View
                        </a>
                        <button
                          onClick={() => {
                            const updated = blogPosts.map(p => p.id === post.id ? { ...p, published: !p.published } : p);
                            setBlogPosts(updated);
                            localStorage.setItem('moodflip_blog_posts', JSON.stringify(updated));
                          }}
                          className="flex-1 py-1.5 rounded-lg bg-[#FAF8FD] border border-[#EAE3F2] text-amber-600 text-center hover:bg-amber-50 transition"
                        >
                          {post.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => {
                            if (!confirm(`Delete "${post.title}"?`)) return;
                            const updated = blogPosts.filter(p => p.id !== post.id);
                            setBlogPosts(updated);
                            localStorage.setItem('moodflip_blog_posts', JSON.stringify(updated));
                          }}
                          className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-center hover:bg-rose-600 hover:text-white transition"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                ))}
              </div>

              {/* 2. DESKTOP TABLE VIEW (Hidden on mobile) */}
              <div className="hidden md:block bg-white border border-[#EAE3F2] rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-left text-xs">
                    <thead>
                      <tr className="bg-[#FAF8FD] border-b border-[#EAE3F2] text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">
                        <th className="py-3 px-4">Title</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Author</th>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3EFF8]">
                      {blogPosts
                        .filter(p => blogFilter === 'all' ? true : blogFilter === 'published' ? p.published : !p.published)
                        .filter(p => !blogSearch || p.title.toLowerCase().includes(blogSearch.toLowerCase()) || p.category.toLowerCase().includes(blogSearch.toLowerCase()))
                        .map((post, i) => (
                        <tr key={post.id}
                          className={`hover:bg-[#FAF8FD] transition group ${i % 2 === 0 ? 'bg-white' : 'bg-[#FDFCFF]'}`}
                        >
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-lg shrink-0">{post.emoji}</span>
                              <span className="font-serif font-extrabold text-sm text-[#1A1338] leading-snug line-clamp-1 group-hover:text-[#7147E8] transition">{post.title}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-mono ml-7 mb-1.5">/{post.slug}</p>
                            <div className="ml-7 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => setEditingPost(post)}
                                className="text-[11px] font-extrabold text-[#7147E8] hover:underline cursor-pointer">Edit</button>
                              <span className="text-gray-300">|</span>
                              <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer"
                                className="text-[11px] font-extrabold text-gray-500 hover:text-[#7147E8] hover:underline">View</a>
                              <span className="text-gray-300">|</span>
                              <button
                                onClick={() => {
                                  const updated = blogPosts.map(p => p.id === post.id ? { ...p, published: !p.published } : p);
                                  setBlogPosts(updated);
                                  localStorage.setItem('moodflip_blog_posts', JSON.stringify(updated));
                                }}
                                className="text-[11px] font-extrabold text-amber-600 hover:underline cursor-pointer">
                                {post.published ? 'Unpublish' : 'Publish'}
                              </button>
                              <span className="text-gray-300">|</span>
                              <button
                                onClick={() => {
                                  if (!confirm(`Delete "${post.title}"?`)) return;
                                  const updated = blogPosts.filter(p => p.id !== post.id);
                                  setBlogPosts(updated);
                                  localStorage.setItem('moodflip_blog_posts', JSON.stringify(updated));
                                }}
                                className="text-[11px] font-extrabold text-rose-500 hover:underline cursor-pointer">Trash</button>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 text-xs text-gray-600 font-semibold align-top pt-4">{post.category}</td>
                          <td className="py-3.5 px-3 text-xs text-gray-600 font-semibold align-top pt-4">{post.author}</td>
                          <td className="py-3.5 px-3 text-[11px] text-gray-400 font-semibold align-top pt-4">{post.date}</td>
                          <td className="py-3.5 px-4 text-right align-top pt-4">
                            <span className={`inline-block text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                              post.published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}>{post.published ? '● Published' : '○ Draft'}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {blogPosts.filter(p => blogFilter === 'all' ? true : blogFilter === 'published' ? p.published : !p.published).filter(p => !blogSearch || p.title.toLowerCase().includes(blogSearch.toLowerCase())).length === 0 && (
                <div className="py-16 text-center bg-white border border-[#EAE3F2] rounded-2xl">
                  <span className="text-4xl">📭</span>
                  <p className="mt-3 text-sm font-bold text-gray-400">No posts found</p>
                </div>
              )}
            </div>
          )}

          {/* ═══ BLOG POST EDITOR — WordPress Full-Screen Style ═══ */}
          {activeTab === 'Blog Manager' && editingPost && (
            <div className="space-y-0">
              {/* Editor Top Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#EAE3F2] shadow-2xs mb-5">
                <div className="flex items-center justify-between sm:justify-start gap-3">
                  <button onClick={() => setEditingPost(null)}
                    className="flex items-center gap-1.5 text-xs font-extrabold text-[#7147E8] hover:underline cursor-pointer">
                    ← All Posts
                  </button>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                    editingPost.published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>{editingPost.published ? '● Published' : '○ Draft'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingPost({ ...editingPost, published: false })}
                    className="flex-1 sm:flex-initial px-3.5 py-2 border border-[#EAE3F2] text-xs font-extrabold text-gray-600 rounded-xl hover:bg-gray-50 transition cursor-pointer text-center"
                  >Save Draft</button>
                  <button
                    onClick={() => {
                      const withPublish = { ...editingPost, published: true };
                      const updated = blogPosts.some(p => p.id === editingPost.id)
                        ? blogPosts.map(p => p.id === editingPost.id ? withPublish : p)
                        : [...blogPosts, withPublish];
                      setBlogPosts(updated);
                      localStorage.setItem('moodflip_blog_posts', JSON.stringify(updated));
                      setEditingPost(null);
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2 bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white text-xs font-extrabold rounded-xl shadow-sm hover:opacity-90 transition cursor-pointer text-center"
                  >
                    {editingPost.published ? '💾 Update' : '🚀 Publish'}
                  </button>
                </div>
              </div>

              {/* Two-column layout: Editor (left) + Sidebar (right) */}
              <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5 items-start">

                {/* LEFT: Title + Editor */}
                <div className="space-y-4">
                  {/* Post Title */}
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={e => setEditingPost({ ...editingPost, title: e.target.value })}
                    placeholder="Add title"
                    className="w-full text-2xl sm:text-3xl font-serif font-extrabold text-[#1A1338] placeholder-gray-300 border-0 border-b-2 border-[#EAE3F2] focus:border-[#7147E8] focus:outline-none pb-3 bg-transparent transition"
                  />
                  {/* Permalink */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
                    <span>Permalink:</span>
                    <span className="font-mono text-[#7147E8]">moodflip.coach/blog/</span>
                    <input
                      type="text"
                      value={editingPost.slug}
                      onChange={e => setEditingPost({ ...editingPost, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-') })}
                      className="flex-1 border border-[#EAE3F2] rounded-lg px-2 py-1 text-xs font-mono text-[#1A1338] focus:outline-none focus:border-[#7147E8] bg-[#FAF8FD]"
                    />
                    <a href={`/blog/${editingPost.slug}`} target="_blank" rel="noopener noreferrer"
                      className="text-[#7147E8] hover:underline text-[10px] font-extrabold">View ↗</a>
                  </div>

                  {/* Rich Text Editor Component */}
                  <RichEditor
                    value={editingPost.content}
                    onChange={val => setEditingPost({ ...editingPost, content: val })}
                    placeholder="Write post content with full formatting, headings, quotes, and inline images..."
                    minHeight="380px"
                  />

                  {/* Excerpt */}
                  <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs">
                    <h4 className="font-serif font-extrabold text-sm text-[#1A1338] mb-2">Excerpt / Meta Description</h4>
                    <textarea
                      rows={3}
                      value={editingPost.excerpt}
                      onChange={e => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                      placeholder="Short description shown in blog listings and SEO previews..."
                      className="w-full text-xs text-[#1A1338] font-medium border border-[#EAE3F2] rounded-xl px-3.5 py-2.5 bg-[#FAF8FD] focus:outline-none focus:border-[#7147E8] resize-y"
                    />
                  </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="space-y-4">
                  {/* Publish Box */}
                  <div className="bg-white border border-[#EAE3F2] rounded-2xl overflow-hidden shadow-xs">
                    <div className="px-4 py-3 bg-[#FAF8FD] border-b border-[#EAE3F2]">
                      <h4 className="font-serif font-extrabold text-sm text-[#1A1338]">Publish</h4>
                    </div>
                    <div className="p-4 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-600">Status</span>
                        <select
                          value={editingPost.published ? 'published' : 'draft'}
                          onChange={e => setEditingPost({ ...editingPost, published: e.target.value === 'published' })}
                          className="border border-[#EAE3F2] rounded-lg px-2 py-1 text-xs font-bold bg-white focus:outline-none focus:border-[#7147E8]"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-600">Visibility</span>
                        <span className="text-[#1A1338] font-extrabold">Public</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-600">Published</span>
                        <span className="text-[#1A1338] font-semibold">{editingPost.date}</span>
                      </div>
                      <div className="pt-2 flex gap-2 border-t border-gray-100">
                        <button
                          onClick={() => {
                            const updated = blogPosts.some(p => p.id === editingPost.id)
                              ? blogPosts.map(p => p.id === editingPost.id ? editingPost : p)
                              : [...blogPosts, editingPost];
                            setBlogPosts(updated);
                            localStorage.setItem('moodflip_blog_posts', JSON.stringify(updated));
                            setEditingPost(null);
                          }}
                          className="flex-1 py-2 bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white font-extrabold rounded-xl hover:opacity-90 transition cursor-pointer shadow-sm text-xs"
                        >
                          {editingPost.published ? '💾 Update' : '🚀 Publish'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Featured Image Box */}
                  <div className="bg-white border border-[#EAE3F2] rounded-2xl overflow-hidden shadow-xs">
                    <div className="px-4 py-3 bg-[#FAF8FD] border-b border-[#EAE3F2] flex items-center justify-between">
                      <h4 className="font-serif font-extrabold text-sm text-[#1A1338]">🖼️ Featured Image</h4>
                      {editingPost.featuredImage && (
                        <button
                          type="button"
                          onClick={() => setEditingPost({ ...editingPost, featuredImage: '' })}
                          className="text-[10px] font-extrabold text-rose-600 hover:underline"
                        >Remove</button>
                      )}
                    </div>
                    <div className="p-4 space-y-3 text-xs">
                      {editingPost.featuredImage ? (
                        <div className="relative rounded-xl overflow-hidden border border-[#EAE3F2]">
                          <img src={editingPost.featuredImage} alt="Featured Preview" className="w-full h-36 object-cover" />
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-[#EAE3F2] rounded-xl p-4 text-center text-gray-400">
                          <span className="text-2xl block mb-1">🖼️</span>
                          <span className="text-[11px] font-semibold">No featured image set</span>
                        </div>
                      )}
                      <div>
                        <label className="block font-extrabold text-[#1A1338] mb-1">Image URL</label>
                        <input
                          type="text"
                          value={editingPost.featuredImage || ''}
                          onChange={e => setEditingPost({ ...editingPost, featuredImage: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-mono text-[11px] bg-[#FAF8FD] focus:outline-none focus:border-[#7147E8]"
                        />
                      </div>
                      <div>
                        <label className="block font-extrabold text-[#1A1338] mb-1">Or Upload from Computer</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = ev => {
                                setEditingPost({ ...editingPost, featuredImage: ev.target?.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full text-[10px] text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-[11px] file:font-extrabold file:bg-[#F0EBFA] file:text-[#7147E8] hover:file:bg-[#E8E0F8] cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SEO */}
                  <div className="bg-white border border-[#EAE3F2] rounded-2xl overflow-hidden shadow-xs">
                    <div className="px-4 py-3 bg-[#FAF8FD] border-b border-[#EAE3F2]">
                      <h4 className="font-serif font-extrabold text-sm text-[#1A1338]">🔍 SEO Preview</h4>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="bg-white border border-gray-200 rounded-xl p-3 text-xs">
                        <p className="text-[#1558d6] font-semibold truncate text-sm">{editingPost.title || 'Post Title'}</p>
                        <p className="text-[#006621] text-[10px] font-mono">moodflip.coach/blog/{editingPost.slug}</p>
                        <p className="text-[#545454] mt-1 line-clamp-2 leading-relaxed">{editingPost.excerpt || 'Meta description will appear here...'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
                    <h4 className="font-extrabold text-xs text-rose-700 mb-3">Danger Zone</h4>
                    <button
                      onClick={() => {
                        if (!confirm(`Move "${editingPost.title}" to trash?`)) return;
                        const updated = blogPosts.filter(p => p.id !== editingPost.id);
                        setBlogPosts(updated);
                        localStorage.setItem('moodflip_blog_posts', JSON.stringify(updated));
                        setEditingPost(null);
                      }}
                      className="w-full py-2 text-xs font-extrabold text-rose-600 border border-rose-300 rounded-xl hover:bg-rose-100 transition cursor-pointer"
                    >
                      🗑️ Move to Trash
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* ═══════════════════════════════════════════════════════════
               LEGAL PAGES — WordPress-Style Pages List + Editor
          ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'Legal Pages' && !editingLegalPage && (
            <div className="space-y-5">
              <div className="bg-white p-4 rounded-2xl border border-[#EAE3F2] shadow-2xs">
                <h2 className="font-serif font-extrabold text-2xl text-[#1A1338]">Pages 📄</h2>
                <p className="text-xs text-gray-500 font-semibold mt-1">Edit your legal pages. Changes are saved and reflected live on the public pages.</p>
              </div>

              {/* 1. MOBILE CARD VIEW (Block on mobile screens) */}
              <div className="block md:hidden space-y-3">
                {legalPages.map((page) => (
                  <div key={page.id} className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif font-extrabold text-base text-[#1A1338] leading-snug">{page.title}</h3>
                        <p className="text-[11px] text-gray-400 font-mono mt-0.5">/{page.slug}</p>
                      </div>
                      <span className="shrink-0 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">● Published</span>
                    </div>

                    <div className="text-[11px] text-gray-500 font-medium pt-1 border-t border-gray-100">
                      <span>Last Updated: <strong className="text-gray-700">{page.lastUpdated}</strong></span>
                    </div>

                    {/* Always Visible Mobile Action Buttons */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100 text-xs font-extrabold">
                      <button
                        onClick={() => setEditingLegalPage(page)}
                        className="flex-1 py-2 rounded-xl bg-[#FAF8FD] border border-[#EAE3F2] text-[#7147E8] text-center hover:bg-[#7147E8] hover:text-white transition cursor-pointer"
                      >
                        ✏️ Edit Page
                      </button>
                      <a
                        href={`/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 rounded-xl bg-[#FAF8FD] border border-[#EAE3F2] text-gray-700 text-center hover:bg-gray-100 transition"
                      >
                        👁️ Preview ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. DESKTOP TABLE VIEW (Hidden on mobile) */}
              <div className="hidden md:block bg-white border border-[#EAE3F2] rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-left text-xs">
                    <thead>
                      <tr className="bg-[#FAF8FD] border-b border-[#EAE3F2] text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">
                        <th className="py-3 px-4">Title</th>
                        <th className="py-3 px-3">Last Updated</th>
                        <th className="py-3 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3EFF8]">
                      {legalPages.map((page, i) => (
                        <tr key={page.id}
                          className={`hover:bg-[#FAF8FD] transition group ${i % 2 === 0 ? 'bg-white' : 'bg-[#FDFCFF]'}`}
                        >
                          <td className="py-4 px-4">
                            <p className="font-serif font-extrabold text-sm text-[#1A1338] mb-0.5">{page.title}</p>
                            <p className="text-[10px] text-gray-400 font-mono mb-1.5">/{page.slug}</p>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => setEditingLegalPage(page)}
                                className="text-[11px] font-extrabold text-[#7147E8] hover:underline cursor-pointer">Edit</button>
                              <span className="text-gray-300">|</span>
                              <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer"
                                className="text-[11px] font-extrabold text-gray-500 hover:text-[#7147E8] hover:underline">View</a>
                            </div>
                          </td>
                          <td className="py-4 px-3 text-xs text-gray-500 font-semibold align-top pt-5">{page.lastUpdated}</td>
                          <td className="py-4 px-4 text-right align-top pt-5">
                            <span className="inline-block text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">● Published</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Legal Page Full Editor */}
          {activeTab === 'Legal Pages' && editingLegalPage && (
            <div className="space-y-0">
              {/* Editor Top Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#EAE3F2] shadow-2xs mb-5">
                <div className="flex items-center justify-between sm:justify-start gap-3">
                  <button onClick={() => setEditingLegalPage(null)}
                    className="flex items-center gap-1.5 text-xs font-extrabold text-[#7147E8] hover:underline cursor-pointer">
                    ← All Pages
                  </button>
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">● Published</span>
                </div>
                <div className="flex items-center gap-2">
                  <a href={`/${editingLegalPage.slug}`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-3.5 py-2 border border-[#EAE3F2] text-xs font-extrabold text-gray-600 rounded-xl hover:bg-gray-50 transition text-center">
                    Preview ↗
                  </a>
                  <button
                    onClick={() => {
                      const updated = legalPages.map(p => p.id === editingLegalPage.id ? editingLegalPage : p);
                      setLegalPages(updated);
                      localStorage.setItem('moodflip_legal_pages', JSON.stringify(updated));
                      setEditingLegalPage(null);
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2 bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white text-xs font-extrabold rounded-xl shadow-sm hover:opacity-90 transition cursor-pointer text-center"
                  >
                    💾 Update Page
                  </button>
                </div>
              </div>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5 items-start">
                {/* LEFT */}
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingLegalPage.title}
                    onChange={e => setEditingLegalPage({ ...editingLegalPage, title: e.target.value })}
                    className="w-full text-2xl sm:text-3xl font-serif font-extrabold text-[#1A1338] placeholder-gray-300 border-0 border-b-2 border-[#EAE3F2] focus:border-[#7147E8] focus:outline-none pb-3 bg-transparent transition"
                  />
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
                    <span>URL:</span>
                    <span className="font-mono text-[#7147E8]">moodflip.coach/{editingLegalPage.slug}</span>
                  </div>

                  {/* Rich Text Editor Component for Legal Page */}
                  <RichEditor
                    value={editingLegalPage.content}
                    onChange={val => setEditingLegalPage({ ...editingLegalPage, content: val })}
                    placeholder="Edit legal terms or privacy policy content..."
                    minHeight="450px"
                  />
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="space-y-4">
                  <div className="bg-white border border-[#EAE3F2] rounded-2xl overflow-hidden shadow-xs">
                    <div className="px-4 py-3 bg-[#FAF8FD] border-b border-[#EAE3F2]">
                      <h4 className="font-serif font-extrabold text-sm text-[#1A1338]">Page Attributes</h4>
                    </div>
                    <div className="p-4 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-600">Status</span>
                        <span className="font-extrabold text-emerald-700">Published</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-600">Visibility</span>
                        <span className="font-extrabold text-[#1A1338]">Public</span>
                      </div>
                      <div>
                        <label className="block font-extrabold text-[#1A1338] mb-1">Last Updated</label>
                        <input type="text" value={editingLegalPage.lastUpdated}
                          onChange={e => setEditingLegalPage({ ...editingLegalPage, lastUpdated: e.target.value })}
                          className="w-full border border-[#EAE3F2] rounded-xl px-3 py-2 font-mono text-xs bg-[#FAF8FD] focus:outline-none focus:border-[#7147E8]"
                        />
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <button
                          onClick={() => {
                            const updated = legalPages.map(p => p.id === editingLegalPage.id ? editingLegalPage : p);
                            setLegalPages(updated);
                            localStorage.setItem('moodflip_legal_pages', JSON.stringify(updated));
                            setEditingLegalPage(null);
                          }}
                          className="w-full py-2.5 bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white font-extrabold rounded-xl hover:opacity-90 transition cursor-pointer shadow-sm text-xs"
                        >
                          💾 Update Page
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFF8E7] border border-amber-200 rounded-2xl p-4">
                    <h4 className="font-extrabold text-xs text-amber-700 mb-2">⚠️ Note</h4>
                    <p className="text-[11px] text-amber-600 font-medium leading-relaxed">Changes to this page are saved immediately to localStorage and reflected on <strong className="font-extrabold">/{editingLegalPage.slug}</strong> when users visit.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW TAB 10: SETTINGS & DEVELOPER OPTIONS */}
          {activeTab === 'Settings' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-4 sm:p-8 shadow-2xs space-y-6">
              <div className="border-b border-gray-100 pb-5">
                <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338]">Platform System &amp; Developer Settings ⚙️</h2>
                <p className="text-xs md:text-sm text-[#68607F] font-semibold mt-1">Configure Add to Home Screen App Prompt, Cookie Consent Banner, Admin Login, Email SMTP, and Payment Gateways.</p>
              </div>

              {/* 1. MOBILE "ADD TO HOME SCREEN" / PWA APP PROMPT SETTINGS CARD */}
              <div className="bg-white border-2 border-[#7147E8]/30 rounded-2xl p-5 sm:p-7 shadow-md space-y-5 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7147E8] to-[#f59e0b] flex items-center justify-center text-2xl shrink-0 shadow-md text-white">
                      📱
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif font-extrabold text-lg text-[#1A1338]">
                          Mobile "Add to Home Screen" &amp; App Prompt
                        </h3>
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                          DEFAULT: OFF
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        Controls the floating "Install MoodFlip App / Add to Home Screen" popup and iOS installation guide modal for visitors.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => savePwaSettings({ ...pwaSettings, enabled: !pwaSettings.enabled })}
                      className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        pwaSettings.enabled ? 'bg-[#7147E8]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          pwaSettings.enabled ? 'translate-x-7' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className={`text-xs font-black px-3 py-1 rounded-xl ${pwaSettings.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {pwaSettings.enabled ? '🟢 ACTIVE (ON)' : '⚪ DISABLED (OFF)'}
                    </span>
                  </div>
                </div>

                {pwaSavedMsg && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 animate-in fade-in">
                    {pwaSavedMsg}
                  </div>
                )}

                {/* Status Notice */}
                <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
                  pwaSettings.enabled 
                    ? 'bg-purple-50/70 border-purple-200 text-purple-900' 
                    : 'bg-amber-50/70 border-amber-200 text-amber-900'
                }`}>
                  <span className="text-lg shrink-0">{pwaSettings.enabled ? '✨' : 'ℹ️'}</span>
                  <div>
                    <strong className="font-extrabold block mb-0.5">
                      {pwaSettings.enabled 
                        ? 'Add to Home Screen banner is currently ENABLED for website visitors.' 
                        : 'Add to Home Screen banner is currently OFF by default.'}
                    </strong>
                    <span>
                      {pwaSettings.enabled 
                        ? 'Visitors on mobile and desktop browsers will see the install banner after the configured delay.' 
                        : 'No install popup or floating banner will be shown to users. Toggle ON anytime above when you want to promote the app.'}
                    </span>
                  </div>
                </div>

                {/* Configuration Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Banner Title</label>
                    <input
                      type="text"
                      value={pwaSettings.bannerTitle}
                      onChange={(e) => setPwaSettings({ ...pwaSettings, bannerTitle: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-semibold text-xs focus:outline-none focus:border-[#7147E8]"
                      placeholder="Install MoodFlip App"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Action Button Text</label>
                    <input
                      type="text"
                      value={pwaSettings.buttonText}
                      onChange={(e) => setPwaSettings({ ...pwaSettings, buttonText: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-semibold text-xs focus:outline-none focus:border-[#7147E8]"
                      placeholder="Add to Home Screen"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-bold text-gray-700 mb-1">Banner Description / Pitch</label>
                    <input
                      type="text"
                      value={pwaSettings.bannerSubtitle}
                      onChange={(e) => setPwaSettings({ ...pwaSettings, bannerSubtitle: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-semibold text-xs focus:outline-none focus:border-[#7147E8]"
                      placeholder="Add MoodFlip to your Mobile Home Screen for instant 60-second mindset reset anywhere!"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Popup Delay (seconds after page load)</label>
                    <select
                      value={pwaSettings.showDelay}
                      onChange={(e) => setPwaSettings({ ...pwaSettings, showDelay: Number(e.target.value) })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-semibold text-xs focus:outline-none focus:border-[#7147E8]"
                    >
                      <option value={1000}>1 second</option>
                      <option value={2000}>2 seconds (Recommended)</option>
                      <option value={5000}>5 seconds</option>
                      <option value={10000}>10 seconds</option>
                    </select>
                  </div>
                </div>

                {/* Live Preview of PWA Prompt */}
                <div className="border border-dashed border-gray-300 rounded-2xl p-4 bg-[#FAF9FE]">
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-500 mb-2">
                    👁️ Banner Live Preview (How it looks on mobile/desktop)
                  </span>
                  <div className="max-w-md bg-[#170E3B] border border-white/20 text-white rounded-2xl p-3.5 shadow-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7147E8] to-[#f59e0b] flex items-center justify-center text-xl shrink-0 shadow-md">
                        📱
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif font-extrabold text-xs text-white">
                            {pwaSettings.bannerTitle || 'Install MoodFlip App'}
                          </h4>
                          <span className="text-white/60 text-xs font-bold">✕</span>
                        </div>
                        <p className="text-[11px] text-white/80 font-medium leading-tight mt-0.5 mb-2.5">
                          {pwaSettings.bannerSubtitle || 'Add MoodFlip to your Mobile Home Screen for instant 60-second mindset reset anywhere!'}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white py-1.5 px-3 rounded-lg text-[11px] font-black text-center shadow-xs">
                            📲 {pwaSettings.buttonText || 'Add to Home Screen'}
                          </div>
                          <span className="px-2 py-1 text-[11px] font-bold text-white/60">Later</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => savePwaSettings(pwaSettings)}
                    className="w-full sm:w-auto bg-[#7147E8] hover:bg-[#5f38d4] text-white px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition cursor-pointer text-center"
                  >
                    💾 Save PWA &amp; Add to Home Screen Settings
                  </button>
                </div>
              </div>

              {/* 2. COOKIE CONSENT & PRIVACY POLICY BANNER SETTINGS CARD */}
              <div className="bg-white border-2 border-amber-500/20 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                      🍪
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif font-extrabold text-lg text-[#1A1338]">
                          Cookie Consent &amp; Privacy Policy Banner
                        </h3>
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                          DEFAULT: OFF
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        Controls the privacy compliance cookie consent bar shown to website visitors.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => saveCookieSettings({ ...cookieSettings, enabled: !cookieSettings.enabled })}
                      className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        cookieSettings.enabled ? 'bg-[#7147E8]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          cookieSettings.enabled ? 'translate-x-7' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className={`text-xs font-black px-3 py-1 rounded-xl ${cookieSettings.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {cookieSettings.enabled ? '🟢 ACTIVE (ON)' : '⚪ DISABLED (OFF)'}
                    </span>
                  </div>
                </div>

                {cookieSavedMsg && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 animate-in fade-in">
                    {cookieSavedMsg}
                  </div>
                )}

                {/* Status Notice */}
                <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
                  cookieSettings.enabled 
                    ? 'bg-purple-50/70 border-purple-200 text-purple-900' 
                    : 'bg-amber-50/70 border-amber-200 text-amber-900'
                }`}>
                  <span className="text-lg shrink-0">{cookieSettings.enabled ? '✨' : 'ℹ️'}</span>
                  <div>
                    <strong className="font-extrabold block mb-0.5">
                      {cookieSettings.enabled 
                        ? 'Cookie Consent banner is currently ENABLED for website visitors.' 
                        : 'Cookie Consent banner is currently OFF by default.'}
                    </strong>
                    <span>
                      {cookieSettings.enabled 
                        ? 'Visitors will see the cookie banner on their first visit.' 
                        : 'No cookie consent popup will be shown to users. Toggle ON anytime above if you need cookie compliance.'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Banner Heading</label>
                    <input
                      type="text"
                      value={cookieSettings.bannerTitle}
                      onChange={(e) => setCookieSettings({ ...cookieSettings, bannerTitle: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-semibold text-xs focus:outline-none focus:border-[#7147E8]"
                      placeholder="We Value Your Privacy & Cookies"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Privacy Policy Link URL</label>
                    <input
                      type="text"
                      value={cookieSettings.privacyLink}
                      onChange={(e) => setCookieSettings({ ...cookieSettings, privacyLink: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-semibold text-xs focus:outline-none focus:border-[#7147E8]"
                      placeholder="/privacy"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-bold text-gray-700 mb-1">Consent Message Body</label>
                    <textarea
                      rows={2}
                      value={cookieSettings.bannerText}
                      onChange={(e) => setCookieSettings({ ...cookieSettings, bannerText: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-semibold text-xs focus:outline-none focus:border-[#7147E8]"
                      placeholder="MoodFlip uses essential cookies and analytics to enhance your self-reflection experience..."
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Accept Button Label</label>
                    <input
                      type="text"
                      value={cookieSettings.acceptButtonText}
                      onChange={(e) => setCookieSettings({ ...cookieSettings, acceptButtonText: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-semibold text-xs focus:outline-none focus:border-[#7147E8]"
                      placeholder="✓ Accept All Cookies"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Secondary Button Label</label>
                    <input
                      type="text"
                      value={cookieSettings.essentialButtonText}
                      onChange={(e) => setCookieSettings({ ...cookieSettings, essentialButtonText: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-semibold text-xs focus:outline-none focus:border-[#7147E8]"
                      placeholder="Essential Only"
                    />
                  </div>
                </div>

                {/* Live Preview of Cookie Banner */}
                <div className="border border-dashed border-gray-300 rounded-2xl p-4 bg-[#FAF9FE]">
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-500 mb-2">
                    👁️ Cookie Banner Live Preview
                  </span>
                  <div className="max-w-md bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-sm text-[#1A1338]">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl shrink-0">🍪</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-extrabold text-xs text-[#1A1338] mb-0.5">
                          {cookieSettings.bannerTitle || 'We Value Your Privacy & Cookies'}
                        </h4>
                        <p className="text-[11px] text-[#5B5278] leading-tight mb-2.5">
                          {cookieSettings.bannerText || 'MoodFlip uses essential cookies and analytics to enhance your self-reflection experience.'}{' '}
                          <span className="text-[#7147E8] font-bold underline">Privacy Policy</span>
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white py-1.5 px-3 rounded-lg text-[11px] font-black text-center shadow-xs">
                            {cookieSettings.acceptButtonText || '✓ Accept All Cookies'}
                          </div>
                          <div className="px-2.5 py-1.5 rounded-lg border border-[#EAE3F2] text-[11px] font-bold text-[#5B5278]">
                            {cookieSettings.essentialButtonText || 'Essential Only'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => saveCookieSettings(cookieSettings)}
                    className="w-full sm:w-auto bg-[#7147E8] hover:bg-[#5f38d4] text-white px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition cursor-pointer text-center"
                  >
                    💾 Save Cookie Consent Settings
                  </button>
                </div>
              </div>

              {/* 1. ADMIN LOGIN CREDENTIALS CARD */}
              <div className="bg-[#FAF8FD] border border-[#EAE3F2] rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-200/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl shrink-0">🔑</span>
                    <div>
                      <h3 className="font-serif font-extrabold text-base text-[#1A1338]">Admin Login Credentials Settings</h3>
                      <p className="text-xs text-gray-500 font-medium">Change the Admin Email and Admin Password required to log in at /login.</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-purple-100 text-[#7147E8] shrink-0 self-start sm:self-auto">
                    Active: {adminCreds.email}
                  </span>
                </div>

                {adminCredsMsg && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 animate-in fade-in">
                    {adminCredsMsg}
                  </div>
                )}

                <form onSubmit={saveAdminCreds} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Admin Email Address</label>
                    <input
                      type="email"
                      required
                      value={adminCreds.email}
                      onChange={(e) => setAdminCreds({ ...adminCreds, email: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl bg-[#FAF8FD] font-semibold text-xs focus:outline-none focus:border-[#7147E8]"
                      placeholder="admin@moodflip.coach"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Admin Password</label>
                    <input
                      type="text"
                      required
                      value={adminCreds.password}
                      onChange={(e) => setAdminCreds({ ...adminCreds, password: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl bg-[#FAF8FD] font-mono font-bold text-xs focus:outline-none focus:border-[#7147E8]"
                      placeholder="admin123"
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end pt-1">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#7147E8] hover:bg-[#5f38d4] text-white px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition cursor-pointer text-center"
                    >
                      💾 Update Admin Login Credentials
                    </button>
                  </div>
                </form>
              </div>

              {/* 2. EMAIL SMTP & GMAIL CONFIGURATION CARD */}
              <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">📧</span>
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#1A1338]">Email SMTP &amp; Gmail Developer Gateway</h3>
                      <p className="text-xs text-gray-500">Configure real-time transaction emails, welcome prompts &amp; PDF downloads via Gmail or custom SMTP.</p>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smtpSettings.enabled}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, enabled: e.target.checked })}
                      className="w-5 h-5 accent-[#7147E8]"
                    />
                    <span className={`text-xs font-extrabold px-2.5 py-1 rounded-md ${smtpSettings.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                      {smtpSettings.enabled ? 'ENABLED' : 'DISABLED'}
                    </span>
                  </label>
                </div>

                {smtpTestStatus && (
                  <div className={`p-3.5 rounded-xl text-xs font-bold ${
                    smtpTestStatus.type === 'testing' ? 'bg-amber-50 border border-amber-200 text-amber-800' :
                    smtpTestStatus.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'
                  }`}>
                    {smtpTestStatus.text}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Email Provider</label>
                    <select
                      value={smtpSettings.provider}
                      onChange={(e) => {
                        const prov = e.target.value;
                        if (prov === 'gmail') {
                          setSmtpSettings({ ...smtpSettings, provider: 'gmail', host: 'smtp.gmail.com', port: '587', security: 'TLS' });
                        } else {
                          setSmtpSettings({ ...smtpSettings, provider: 'custom' });
                        }
                      }}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-semibold"
                    >
                      <option value="gmail">Gmail SMTP (smtp.gmail.com)</option>
                      <option value="custom">Custom SMTP Server</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">SMTP Host</label>
                    <input
                      type="text"
                      value={smtpSettings.host}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, host: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-mono text-xs"
                      placeholder="smtp.gmail.com"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">SMTP Port</label>
                    <input
                      type="text"
                      value={smtpSettings.port}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, port: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-mono text-xs"
                      placeholder="587"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">SMTP Username / Gmail Address</label>
                    <input
                      type="email"
                      value={smtpSettings.username}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, username: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-semibold text-xs"
                      placeholder="support@moodflip.coach"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">SMTP App Password</label>
                    <input
                      type="password"
                      value={smtpSettings.password}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, password: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-mono text-xs"
                      placeholder="••••••••••••••••"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Security Protocol</label>
                    <select
                      value={smtpSettings.security}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, security: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-semibold"
                    >
                      <option value="TLS">TLS (Recommended - Port 587)</option>
                      <option value="SSL">SSL (Port 465)</option>
                      <option value="NONE">None</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Sender Display Name</label>
                    <input
                      type="text"
                      value={smtpSettings.senderName}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, senderName: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-semibold text-xs"
                      placeholder="MoodFlip Support Team"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Sender Email Address</label>
                    <input
                      type="email"
                      value={smtpSettings.senderEmail}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, senderEmail: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-semibold text-xs"
                      placeholder="support@moodflip.coach"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={testSmtpConnection}
                    className="px-4 py-2.5 rounded-xl bg-[#FAF8FD] border border-[#E3D9F8] text-[#7147E8] font-bold text-xs hover:bg-[#F0EBFA] transition cursor-pointer"
                  >
                    ⚡ Test SMTP Server Connection
                  </button>

                  <button
                    onClick={() => saveSmtpSettings(smtpSettings)}
                    className="bg-[#7147E8] hover:bg-[#5f38d4] text-white px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition cursor-pointer"
                  >
                    💾 Save Email SMTP Settings
                  </button>
                </div>
              </div>

              {/* 3. PAYMENT GATEWAY DEVELOPER CARD */}
              <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">💳</span>
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#1A1338]">Payment Gateways (Stripe &amp; PayPal API Keys)</h3>
                      <p className="text-xs text-gray-500">Configure Stripe and PayPal keys for checkout modal purchases.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Stripe Publishable Key</label>
                    <input
                      type="text"
                      value={paymentSettings.stripePubKey}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, stripePubKey: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-mono text-xs"
                      placeholder="pk_test_..."
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Stripe Secret Key</label>
                    <input
                      type="password"
                      value={paymentSettings.stripeSecretKey}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeSecretKey: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-mono text-xs"
                      placeholder="sk_test_..."
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">PayPal Client ID</label>
                    <input
                      type="text"
                      value={paymentSettings.paypalClientId}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalClientId: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-mono text-xs"
                      placeholder="A21AAH_..."
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">PayPal Mode</label>
                    <select
                      value={paymentSettings.paypalMode}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalMode: e.target.value })}
                      className="w-full border border-gray-200 p-2.5 rounded-xl bg-[#FAF8FD] font-semibold"
                    >
                      <option value="sandbox">Sandbox (Testing)</option>
                      <option value="live">Live (Production)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => savePaymentSettings(paymentSettings)}
                    className="bg-[#7147E8] hover:bg-[#5f38d4] text-white px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition cursor-pointer"
                  >
                    💾 Save Payment Gateway Settings
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL DIALOGS FOR QUICK ACTIONS */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#EAE3F2] shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-[#1A1338]">
                {activeModal === 'addMood' ? '➕ Add New Mood Page' : '🎁 Create New Plan'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 font-bold hover:text-black">✕</button>
            </div>
            {activeModal === 'addMood' ? (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Mood Title</label>
                  <input type="text" placeholder="e.g. Overwhelmed to Serene" className="w-full border p-2.5 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Mindset Action</label>
                  <input type="text" placeholder="e.g. 60-Second Breathing Reset" className="w-full border p-2.5 rounded-xl" />
                </div>
                <button onClick={() => { setActiveModal(null); }} className="w-full bg-[#7147E8] text-white py-2.5 rounded-xl font-bold">
                  Save &amp; Publish Mood Page
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Plan Title</label>
                  <input type="text" placeholder="e.g. 30-Day Transformation Plan" className="w-full border p-2.5 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Price ($)</label>
                  <input type="number" placeholder="29" className="w-full border p-2.5 rounded-xl" />
                </div>
                <button onClick={() => { setActiveModal(null); }} className="w-full bg-[#7147E8] text-white py-2.5 rounded-xl font-bold">
                  Publish Plan
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ✏️ EDIT USER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-[#EAE3F2] shadow-2xl space-y-4 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-[#1A1338]">✏️ Edit User Details</h3>
              <button onClick={() => setEditingUser(null)} className="text-gray-400 font-bold hover:text-gray-700 text-lg cursor-pointer">✕</button>
            </div>
            <form onSubmit={saveUserEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">User Full Name</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full border border-gray-200 p-3 rounded-xl bg-[#FAF8FD] font-semibold text-xs focus:outline-none focus:border-[#7147E8]"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full border border-gray-200 p-3 rounded-xl bg-[#FAF8FD] font-semibold text-xs focus:outline-none focus:border-[#7147E8]"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Account Status</label>
                <select
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                  className="w-full border border-gray-200 p-3 rounded-xl bg-[#FAF8FD] font-semibold text-xs"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#7147E8] text-white font-extrabold shadow-md hover:bg-[#5f38d4] transition cursor-pointer"
                >
                  Save User Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}