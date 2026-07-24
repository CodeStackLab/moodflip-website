# 🚀 MoodFlip Project Setup & Deployment Guide

This document records the exact configuration, credentials, GitHub repository info, and automated deployment status for **MoodFlip**.

---

## 📌 Repository & Account Details

| Field | Value |
| :--- | :--- |
| **GitHub Account** | `joykonta1-dot` |
| **GitHub Repository** | [joykonta1-dot/moodflip-website](https://github.com/joykonta1-dot/moodflip-website) |
| **Repository Access** | Private |
| **Branch** | `main` |
| **Vercel Account** | `jroy66049-8476` / `akeelvercel` |
| **Vercel Live URL** | [https://moodflip-website.vercel.app](https://moodflip-website.vercel.app) |
| **Supabase Project Name** | `joykonta1-dot's Project` |
| **Supabase Project Ref** | `cacgdkjevkdkshjoapgo` |
| **Supabase URL** | `https://cacgdkjevkdkshjoapgo.supabase.co` |
| **Domain** | `moodflip.coach` (Namecheap) |

---

## 🔑 Automatically Injected Environment Variables

The following environment variables were automatically configured on Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=https://cacgdkjevkdkshjoapgo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_URL=https://cacgdkjevkdkshjoapgo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_PROJECT_REF=cacgdkjevkdkshjoapgo
```

---

## 🏗️ Technical Architecture

- **Framework**: Next.js 14/15 (App Router with Server Actions & Dynamic Pages)
- **Database & ORM**: Prisma ORM with Supabase PostgreSQL (`prisma/schema.prisma`)
- **Hosting Engine**: Vercel Native Serverless Engine
- **Styling & UI**: Custom Split-Screen Vanilla CSS (Dark Left Selection + Sunburst Right Target State)

---

## 🛠️ Local Commands Reference

```bash
# Start local development server
npm run dev

# Run TypeScript type check
npx tsc --noEmit

# Test production build
npm run build

# Push database schema to Supabase
npx prisma db push

# Push code updates to GitHub (triggers Vercel auto-deploy)
git add .
git commit -m "Update MoodFlip feature"
git push origin main
```
