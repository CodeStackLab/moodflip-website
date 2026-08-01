# 💫 MoodFlip - Complete Project Architecture & Deployment Guide (Specification v2 Compliance)

> **AI AGENT & DEVELOPER INSTRUCTION**: Read this file first when modifying, extending, or maintaining MoodFlip. This document contains the complete system architecture, database models, deployment pipelines, credentials, hosting limits, SLA maintenance targets, custom domain DNS records, Maintenance Mode preview instructions, and exact 1-click CLI deployment commands as required by Joy's **Business Specification v2 (21 July 2026)**.

---

## 🔑 Services, Domains & Credential Reference

| Service | Key / Token Type | Value / URL |
| :--- | :--- | :--- |
| **Custom Domain** | Primary Production Domain | [https://moodflip.coach](https://moodflip.coach) |
| **Custom Subdomain** | WWW Production Subdomain | [https://www.moodflip.coach](https://www.moodflip.coach) |
| **Vercel Web URL** | Production Web App (Fallback) | [https://moodflip-website.vercel.app](https://moodflip-website.vercel.app) |
| **GitHub Repo** | Source Repository | [https://github.com/joykonta1-dot/moodflip-website](https://github.com/joykonta1-dot/moodflip-website) |
| **Vercel deployment access** | Production deployment | Use the owner-controlled Vercel account or an ephemeral token; never store tokens in source files. |
| **Admin Control Center** | Server-protected owner access | Configure `ADMIN_PASSWORD` and `CRON_SECRET`; never place either value in source files. |
| **Maintenance / Preview Key** | Retired | The production site is public; temporary maintenance mode should be controlled by a server-only environment flag. |
| **Supabase DB** | Project Reference ID | `cacgdkjevkdkshjoapgo` |
| **Supabase DB** | PostgreSQL Connection | `postgresql://postgres.[ref]:[pass]@aws-0-us-east-1.pooler.supabase.com:6543/postgres` |

---

## 🌐 Namecheap Custom Domain DNS Setup

To point the custom domain `moodflip.coach` to Vercel, the following DNS records are configured in **Namecheap Advanced DNS**:

| Record Type | Host / Name | Value / Target | TTL | Status |
| :--- | :--- | :--- | :--- | :--- |
| **A Record** | `@` | **`76.76.21.21`** | Automatic / 30 min | ✅ Verified & Active |
| **CNAME Record** | `www` | **`cname.vercel-dns.com`** | Automatic / 30 min | ✅ Verified & Active |

> **Note**: Delete any old URL Redirect or Default Parking records in Namecheap Advanced DNS so they do not interfere with the Vercel `A` & `CNAME` records or SSL cert validation.

---

## 🚧 Maintenance Mode & Owner Preview Access

MoodFlip includes an automatic **Under Construction / Maintenance Guard** (`components/MaintenanceGuard.tsx`):

1. **Public Visitors**: See a clean **"Website Under Construction"** notice explaining that MoodFlip is currently being upgraded.
2. **Owner / Developer Access**:
   - Public production mode is currently enabled.
   - Admin access uses a secure, HTTP-only session cookie created after server-side password verification.
3. **Session Persistence**: Unlocking saves `localStorage.setItem('moodflip_owner_unlocked', 'true')` so you can test the full site seamlessly on your device.

---

## 🚀 1-Click Deployment Commands (FOR AI AGENT & DEVELOPERS)

> ⚠️ **IMPORTANT**: GitHub credentials are NOT stored locally. `git push` will hang/fail. Use **Vercel CLI directly** as the primary deployment method below.

Whenever making changes, use the automated verified production command:

```bash
npm run deploy:production
```

This command runs TypeScript verification and a full production build first. Vercel deployment starts only if both checks pass. It does not store a Vercel token in the repository.

The equivalent manual steps are:

### Step 1: Verify TypeScript (0 errors required)
```bash
npx tsc --noEmit
```

### Step 2: Deploy Directly to Vercel Production (PRIMARY METHOD)
```bash
npx vercel --prod --yes
```

This deploys instantly to **https://moodflip.coach** in ~2 minutes.

> **Why Vercel CLI?** Vercel is connected to GitHub (`joykonta1-dot/moodflip-website`, branch: `main`) — but Windows Credential Manager does not store a local GitHub HTTPS token. Vercel CLI token deployment guarantees fast 1-click updates.

---

## 🏗️ Technical Stack & Architecture Overview

```mermaid
flowchart TD
    subgraph Client Layer [Next.js App Router]
        A[5 Cloud Families & 3-Tier Selector] --> B[Change My Mood Arrow Button]
        B --> C[Rising Sun Target Mood & 60s Action Card]
        C --> D[SAVE MY PROFILE CTA Button]
        D --> E[2nd Visit Pop-up & 7-Checkin Offer Modal]
        F[MaintenanceGuard Under Construction] --> A
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

    subgraph CI/CD Production Pipeline [Vercel CLI]
        M[Local Changes] --> N[npx tsc --noEmit]
        N --> O[npx vercel --token ... --prod --yes]
        O --> P[Live Domain: moodflip.coach]
    end
```

- **Framework**: Next.js 14 App Router (TypeScript + React Server Components)
- **Database & ORM**: Prisma ORM (`prisma/schema.prisma`) connected to Supabase PostgreSQL (`cacgdkjevkdkshjoapgo`)
- **Payment Gateway**: Stripe Checkout for the eligible $7 7-Day Report. The $19 30-Day product is implemented as Phase 2 infrastructure and remains hidden/disabled until activation.
- **Deployment**: Vercel Serverless Production Platform (`https://moodflip.coach`)
- **Design System**: Responsive single-canvas layout (`app/globals.css`) matching exact Fraunces serif mockup.

---

## 📋 Business Specification v2 Requirements & Status

| Section | Business Requirement | Status | Implementation Details |
| :--- | :--- | :--- | :--- |
| **Section 6** | 5 Mood Clouds: SAD, FEARFUL, ANGRY, DISGUSTED, STRESSED | ✅ COMPLETE | Mood cloud pills with CSS bump pseudo-elements in `components/MoodTool.tsx`. |
| **Section 6** | Clickable Choices Only (No free-text typing) | ✅ COMPLETE | 3-step visual picker (Cloud -> Card -> Arrow trigger). |
| **Section 6** | "Change My Mood" Arrow Pentagon Button | ✅ COMPLETE | Custom clip-path arrow button in center column. |
| **Section 6** | Right Side Rising Sun Output | ✅ COMPLETE | Displays `"Your mood has changed to: [Target Mood]"` + 60-second action box. |
| **Section 10** | "SAVE MY PROFILE" Button below 60s Action | ✅ COMPLETE | Positioned directly underneath the action card in `MoodTool.tsx`. |
| **Section 10** | 2nd Visit Automatic Profile Pop-up | ✅ COMPLETE | Automatically opens registration modal when `visitCount === 2`. |
| **Section 9 & 10** | 7-Checkin Special Offer Pop-up ($7 PDF) | ✅ COMPLETE | Triggers special offer popup when user reaches 7 check-ins. |
| **Section 10 & 11** | Privacy Consent & 90-Day Auto Deletion | ✅ COMPLETE | Standard consent text & `/api/cron/purge-inactive` cleanup route. |
| **Section 9** | Paid PDF Downloads ($7 & $19) | ✅ COMPLETE | Dynamic `pdf-lib` generation via `/api/pdf` + PayPal Checkout modal. |
| **Section 5 & 9** | SaaS Admin Dashboard (`/admin`) | ✅ COMPLETE | Server-side password verification, HTTP-only admin session, lead stats, and CSV export. |
| **Section 14** | Public launch mode | ✅ COMPLETE | `MaintenanceGuard.tsx` currently renders the public production site. |

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
  primaryMood     String       // SAD, DISGUSTED, ANGRY, FEARFUL, STRESSED
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

## 📊 Hosting Capacity Estimates & Upgrade Plan (Section 14 & 20)

| Infrastructure Layer | Free Tier Limit | Expected User Capacity | Recommended Upgrade Path | Upgrade Monthly Cost |
| :--- | :--- | :--- | :--- | :--- |
| **Vercel Frontend** | 100GB Bandwidth / 100,000 Serverless Invocations | ~100,000 monthly visitors | **Vercel Pro Plan** | US$20 / month |
| **Supabase PostgreSQL** | 500MB Database Storage / 50,000 Active Users | ~50,000 active user profiles | **Supabase Pro Plan** | US$25 / month |

---

## 🛠️ Maintenance SLA & Support Agreement (Section 18 & 21)

- **Included Support**: 1 Year Free Website Support & Maintenance included.
- **Optional Post-Year Maintenance**: US$50 / month (only charged in months where maintenance/updates are requested; no fixed monthly commitment).
- **High-Priority Live Issue SLA** (Site inaccessible, payment down): **Fixed within 1 working day (24 hours)**.
- **Low-Priority Issue SLA** (Minor visual tweak, text update): **Fixed within 2 to 5 working days**.
