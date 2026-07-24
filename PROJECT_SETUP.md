# 💫 MoodFlip - Complete Project Architecture & Deployment Guide

> **AI AGENT INSTRUCTION**: Read this file first when modifying or extending MoodFlip. This document contains the complete system architecture, database models, deployment pipelines, credentials, and exact CLI deployment commands.

---

## 🔑 Services, Domains & Credential Reference

| Service | Key / Token Type | Value / URL |
| :--- | :--- | :--- |
| **Custom Domain** | Primary Production Domain | [https://moodflip.coach](https://moodflip.coach) |
| **Vercel Web URL** | Production Web App | [https://moodflip-website.vercel.app](https://moodflip-website.vercel.app) |
| **GitHub Repo** | Source Repository | [https://github.com/joykonta1-dot/moodflip-website](https://github.com/joykonta1-dot/moodflip-website) |
| **Vercel CLI Token** | Production Deploy Token | `vcp_5sngAwXBDQIAOsCqblCkZNj6T2jeOBdgK5LkJVYPj8M9uJmX2H1DeFdo` |
| **Admin Control Center** | Master Access Password | Password: `admin123` (URL: `/admin`) |
| **Supabase DB** | Project Reference ID | `cacgdkjevkdkshjoapgo` |
| **Supabase DB** | PostgreSQL Connection | `postgresql://postgres.[ref]:[pass]@aws-0-us-east-1.pooler.supabase.com:6543/postgres` |

---

## 🚀 1-Click Deployment Commands (FOR AI AGENT & DEVELOPERS)

Whenever making changes, follow these exact 2 steps to verify and deploy live:

### Step 1: Verify TypeScript & Build
```bash
npx tsc --noEmit
```

### Step 2: Push to GitHub & Deploy Directly to Vercel Production
```bash
git add .
git commit -m "Update feature or design"
git push origin main
npx vercel --token vcp_5sngAwXBDQIAOsCqblCkZNj6T2jeOBdgK5LkJVYPj8M9uJmX2H1DeFdo --prod --yes
```

> **Note**: Vercel team seat verification requires using the Vercel CLI with the token above (`--token vcp_5sng...`). Always run `npx vercel --token ... --prod --yes` to deploy live changes instantly to `https://moodflip.coach`.

---

## 🏗️ Technical Stack & Architecture Overview

```mermaid
flowchart TD
    subgraph Client Layer [Next.js App Router]
        A[3-Tier Mood Selector & Cloud Animation] --> B[Flip My Mood Button]
        B --> C[Uplifting Sun Target State & 60s Action]
        D[Registration & User Profile Page /login & /profile] --> E[LocalStorage + Supabase Sync]
        F[SEO Mood Pages /mood/slug] --> A
    end

    subgraph Serverless Backend [Next.js API Routes]
        G[Save Check-in API /api/checkins] --> H[Prisma ORM Client]
        I[7-Day & 30-Day PDF Generator API /api/pdf] --> H
        J[Admin SaaS Dashboard /admin & CSV Export] --> H
        K[90-Day Auto Purge Cron /api/cron/purge-inactive] --> H
    end

    subgraph Database Layer [Supabase PostgreSQL]
        H --> L[(Supabase Database: cacgdkjevkdkshjoapgo)]
    end

    subgraph CI/CD Production Pipeline [Vercel & GitHub]
        M[git push origin main] --> N[GitHub Repo: joykonta1-dot/moodflip-website]
        N --> O[Vercel CLI Direct Deploy via Token]
        O --> P[Live Domain: moodflip.coach]
    end
```

- **Framework**: Next.js 14 App Router (TypeScript + React Server Components)
- **Database & ORM**: Prisma ORM (`prisma/schema.prisma`) connected to Supabase PostgreSQL (`cacgdkjevkdkshjoapgo`)
- **Payment Gateway**: PayPal Express Checkout gateway modal for $7 (7-Day Plan) & $19 (30-Day Master Plan)
- **Deployment**: Vercel Serverless Production Platform (`https://moodflip.coach`)
- **Design System**: Split-screen custom Vanilla CSS (`app/globals.css`) with 5 pastel cloud pills (**Sad**, **Disgusted**, **Angry**, **Fearful**, **Bad**), SVG feeling tiles, and rising sun target card.

---

## 🗄️ Database Schema & Prisma Models

Location: `prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model UserProfile {
  id           String        @id @default(uuid())
  email        String        @unique
  name         String?
  visitCount   Int           @default(1)
  isPaid       Boolean       @default(false)
  lastActiveAt DateTime      @default(now())
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  checkins     UserCheckin[]
  purchases    Purchase[]

  @@map("user_profiles")
}

model UserCheckin {
  id              String       @id @default(uuid())
  profileId       String?
  profile         UserProfile? @relation(fields: [profileId], references: [id], onDelete: Cascade)
  primaryMood     String       // Sad, Disgusted, Angry, Fearful, Bad
  subFeeling      String       // Layer 2
  specificFeeling String       // Layer 3
  targetMood      String       // Positive target state
  actionShown     String       // 60-second action prompt
  createdAt       DateTime     @default(now())

  @@map("user_checkins")
}

model ActionPrompt {
  id              String   @id @default(uuid())
  primaryMood     String
  specificFeeling String
  targetMood      String
  actionText      String
  createdAt       DateTime @default(now())

  @@map("action_prompts")
}

model Purchase {
  id          String      @id @default(uuid())
  profileId   String
  profile     UserProfile @relation(fields: [profileId], references: [id], onDelete: Cascade)
  amount      Float       @default(7.00)
  status      String      @default("COMPLETED")
  productType String      @default("7_DAY_PDF")
  pdfUrl      String?
  createdAt   DateTime    @default(now())

  @@map("purchases")
}
```

---

## 📋 Key Pages & User Flow Map

1. **Homepage (`/`)**:
   - Hero header with rainbow gradient tagline *"Flip Your Mood"*.
   - Centered non-medical disclaimer banner (`🛡️ Notice: MoodFlip is a self-reflection utility...`).
   - 3-step interactive selector (**Step 1**: Current Mood Cloud, **Step 2**: Sub-feeling SVG Tile, **Step 3**: Specific Nuance Pill).
   - Multi-color pulse CTA button (**Flip My Mood**).
   - Rising sun output card with Playfair target title (e.g. `Peaceful`) and white 60-second action box with timer badge `⏱️ 60-SEC ACTION`.
   - Paid PDF plans section ($7 and $19 plans with PayPal checkout).
   - SEO Mood Guides grid.
   - Clean 3-column footer.

2. **Dedicated User Registration & Sign-in (`/login`)**:
   - Step 1: Name & Email capture with mandatory consent checkbox.
   - Step 2: Password setup with show/hide password toggle (👁️).
   - Direct link from header CTA button.

3. **User Dashboard (`/profile`)**:
   - Displays user's saved mood check-in history with date timestamps & 60-second actions.
   - Instant re-download buttons for 7-Day ($7) and 30-Day ($19) PDF plans.
   - One-click profile sign-out.

4. **SaaS Admin Control Center (`/admin`)**:
   - Master Password protected (`admin123`).
   - Real-time stats row: Total Registered Users, Active Paid Purchases, Total Check-ins, 90-Day Auto Purge Status.
   - Search bar & filterable leads table with status badges (`🟢 ACTIVE PAID` / `⚪ FREE LEAD`).
   - 1-Click CSV/Excel data export button.

5. **Programmatic SEO Pages (`/mood/[slug]`)**:
   - Custom landing pages for high-volume search queries (e.g., `/mood/anxious-at-night`, `/mood/overwhelmed-work`).

---

## 🛠️ Key Files Index

- [app/page.tsx](file:///c:/Users/admin/Documents/MoodFlip%20-%20Self-Help%20Utility%20Website/app/page.tsx): Main landing page.
- [app/globals.css](file:///c:/Users/admin/Documents/MoodFlip%20-%20Self-Help%20Utility%20Website/app/globals.css): Core design system, CSS variables, hero, cards, and mobile styles.
- [components/MoodTool.tsx](file:///c:/Users/admin/Documents/MoodFlip%20-%20Self-Help%20Utility%20Website/components/MoodTool.tsx): 3-tier mood selector & sunburst output.
- [components/Header.tsx](file:///c:/Users/admin/Documents/MoodFlip%20-%20Self-Help%20Utility%20Website/components/Header.tsx): Sticky glass header with user profile / login CTA.
- [components/Footer.tsx](file:///c:/Users/admin/Documents/MoodFlip%20-%20Self-Help%20Utility%20Website/components/Footer.tsx): 3-column footer with disclaimer box.
- [components/PayPalModal.tsx](file:///c:/Users/admin/Documents/MoodFlip%20-%20Self-Help%20Utility%20Website/components/PayPalModal.tsx): PayPal Express Checkout modal.
- [components/PaidPlansSection.tsx](file:///c:/Users/admin/Documents/MoodFlip%20-%20Self-Help%20Utility%20Website/components/PaidPlansSection.tsx): Paid PDF plan selection & checkout handler.
- [app/login/page.tsx](file:///c:/Users/admin/Documents/MoodFlip%20-%20Self-Help%20Utility%20Website/app/login/page.tsx): Dedicated user registration & login page.
- [app/profile/page.tsx](file:///c:/Users/admin/Documents/MoodFlip%20-%20Self-Help%20Utility%20Website/app/profile/page.tsx): Dedicated user profile & check-in history dashboard.
- [app/admin/page.tsx](file:///c:/Users/admin/Documents/MoodFlip%20-%20Self-Help%20Utility%20Website/app/admin/page.tsx): Admin SaaS Control Center & CSV exporter.
- [app/api/pdf/route.ts](file:///c:/Users/admin/Documents/MoodFlip%20-%20Self-Help%20Utility%20Website/app/api/pdf/route.ts): Dynamic PDF document builder.
- [app/api/cron/purge-inactive/route.ts](file:///c:/Users/admin/Documents/MoodFlip%20-%20Self-Help%20Utility%20Website/app/api/cron/purge-inactive/route.ts): 90-day inactive user database cleanup cron.
- [lib/moodData.ts](file:///c:/Users/admin/Documents/MoodFlip%20-%20Self-Help%20Utility%20Website/lib/moodData.ts): Complete 28 mood pairings dataset & 10 rotating actions.
