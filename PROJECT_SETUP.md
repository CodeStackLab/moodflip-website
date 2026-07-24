# 🚀 MoodFlip Project Setup & Deployment Guide

This document records the exact configuration, credentials, GitHub repository info, and automated deployment scripts for **MoodFlip**.

---

## 📌 Repository & Account Details

| Field | Value |
| :--- | :--- |
| **GitHub Account** | `joykonta1-dot` |
| **GitHub Repository** | [joykonta1-dot/moodflip-website](https://github.com/joykonta1-dot/moodflip-website) |
| **Repository Access** | Private |
| **Branch** | `main` |
| **GitHub Personal Token** | `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` |
| **Domain** | `moodflip.coach` (Namecheap) |

---

## 🏗️ Technical Stack

- **Framework**: Next.js 14/15 (App Router with Server Actions & Dynamic Pages)
- **Database & ORM**: Prisma ORM with Supabase PostgreSQL (`prisma/schema.prisma`)
- **Hosting Engine**: Vercel Native Serverless Engine
- **Styling & UI**: Custom Split-Screen Vanilla CSS (Dark Left Selection + Sunburst Right Target State)

---

## ⚡ Automatic Vercel Deployment Setup

Once the Vercel Access Token is provided, our automated deployment script will execute:

1. **Link Project**: Connect `joykonta1-dot/moodflip-website` repository to Vercel via Vercel REST API (`/v9/projects`).
2. **Inject Environment Variables**: Automatically set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `DATABASE_URL`
3. **Trigger Production Deployment**: Auto-deploy live to Vercel CDN.

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

# Push code updates to GitHub
git add .
git commit -m "Update MoodFlip feature"
git push origin main
```
