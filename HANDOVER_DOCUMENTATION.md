# 💫 MoodFlip — Client Handover & Administration Guide

Welcome to **MoodFlip** (`moodflip.coach`). This document provides comprehensive instructions on how to manage, maintain, scale, and redeploy your self-help utility website.

---

## 📋 Table of Contents
1. [Overview & Tech Stack](#1-overview--tech-stack)
2. [How to Add/Edit Moods and 60-Second Actions](#2-how-to-addedit-moods-and-60-second-actions)
3. [How to Access Admin Dashboard & Export Users to CSV](#3-how-to-access-admin-dashboard--export-users-to-csv)
4. [How to Rotate Stripe Keys & Environment Secrets](#4-how-to-rotate-stripe-keys--environment-secrets)
5. [How to Redeploy Live to Vercel](#5-how-to-redeploy-live-to-vercel)
6. [Security & Graceful Fallbacks](#6-security--graceful-fallbacks)

---

## 1. Overview & Tech Stack

- **Domain:** `https://moodflip.coach` (DNS pointed to Vercel via Namecheap `A` & `CNAME` records)
- **Frontend Framework:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Database:** Supabase (PostgreSQL 15 via Prisma ORM)
- **Payments:** Stripe Checkout & Webhook automation
- **Hosting:** Vercel (Hobby Tier, serverless / edge-first setup)

---

## 2. How to Add/Edit Moods and 60-Second Actions

All mood families, specific feeling sub-tiles, positive target states, and 60-second actions are stored in plain TypeScript arrays in:
📍 [`lib/moodData.ts`](file:///c:/Users/admin/Documents/MoodFlip%20-%20Self-Help%20Utility%20Website/lib/moodData.ts)

### Data Model Structure:
```typescript
{
  id: 'sad',
  name: 'SAD',
  cloudColor: '#93c5fd',
  subCategories: [
    {
      id: 'lonely',
      name: 'Lonely',
      iconName: 'Lonely',
      feelings: [
        {
          id: 'isolated',
          name: 'Isolated',
          targetMood: 'Connected & Supported',
          actions: [
            'Breathe in for 4, breathe out for 6...',
            'Place a warm hand over your heart...',
            // Add up to 30+ actions per feeling here without a code rebuild!
          ]
        }
      ]
    }
  ]
}
```

- **Adding a new action:** Simply append a new string inside the `actions: [...]` array of any feeling.
- **Rotation:** The system automatically rotates through the array index for visitors so actions do not repeat consecutively.

---

## 3. How to Access Admin Dashboard & Export Users to CSV

1. Open your browser and navigate to **`https://moodflip.coach/admin`**
2. Enter the private password configured in the server-only `ADMIN_PASSWORD` environment variable.
3. **Features available:**
   - Real-time count of total users, active paid purchases, and total check-ins.
   - Search/filter users by name or email.
   - **Export CSV:** Click **"📥 Export CSV / Excel"** to instantly download a spreadsheet containing all registered users, emails, visit counts, check-in history, purchase statuses, and registration timestamps.

---

## 4. How to Rotate Stripe Keys & Environment Secrets

All credentials and API keys are stored safely as server-side environment variables on **Vercel** and never committed to source code.

### To rotate Stripe Keys:
1. Log into your [Stripe Dashboard](https://dashboard.stripe.com/).
2. Go to **Developers $\rightarrow$ API keys**.
3. Generate a new **Publishable key** (`pk_live_...`) and **Secret key** (`sk_live_...`).
4. Go to [Vercel Dashboard](https://vercel.com/) $\rightarrow$ Select project `moodflip-website` $\rightarrow$ **Settings $\rightarrow$ Environment Variables**.
5. Update:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET` (from Stripe Webhooks tab pointing to `https://moodflip.coach/api/stripe/webhook`)
6. Trigger a redeploy on Vercel.

---

## 5. How to Redeploy Live to Vercel

Whenever code updates or environment variables are modified, deploy instantly using Vercel CLI:

### Step 1: Verify TypeScript compilation
```bash
npx tsc --noEmit
```

### Step 2: Deploy to Production
```bash
npx vercel --prod --yes
```

Deployment completes in ~2 minutes and goes live on `moodflip.coach`.

---

## 6. Security & Graceful Fallbacks

- **Database / Backend Outage Resilience:** The core free interactive tool (`/`) runs edge-first with local fallback logic. If Supabase or Stripe experiences an outage, visitors can still select moods and view 60-second actions seamlessly.
- **Data Privacy & 90-Day Auto Purge:** An automated daily cron job (`/api/cron/purge-inactive`) hard-deletes any user profile that has remained inactive for over 90 days.
- **Non-Therapy Disclaimer:** All pages explicitly display that MoodFlip is a self-help reflection utility, not therapy, medical advice, or crisis support.

---
*© 2026 MoodFlip. All rights reserved.*
