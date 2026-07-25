# 💫 MoodFlip - Complete Project Architecture & Deployment Guide (Specification v2 Compliance)

> **AI AGENT & DEVELOPER INSTRUCTION**: Read this file first when modifying, extending, or maintaining MoodFlip. This document contains the complete system architecture, database models, deployment pipelines, credentials, hosting limits, SLA maintenance targets, and exact 1-click CLI deployment commands as required by Joy's **Business Specification v2 (21 July 2026)**.

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
git commit -m "Update feature or design per Specification v2"
git push origin main
npx vercel --token vcp_5sngAwXBDQIAOsCqblCkZNj6T2jeOBdgK5LkJVYPj8M9uJmX2H1DeFdo --prod --yes
```

> **Note**: Vercel team seat verification requires using the Vercel CLI with the token above (`--token vcp_5sng...`). Always run `npx vercel --token ... --prod --yes` to deploy live changes instantly to `https://moodflip.coach`.

---

## 🏗️ Technical Stack & Architecture Overview

```mermaid
flowchart TD
    subgraph Client Layer [Next.js App Router]
        A[5 Cloud Families & 3-Tier Selector] --> B[Flip My Mood Center Glow Button]
        B --> C[Rising Sun Target Mood & 60s Action Card]
        C --> D[SAVE MY PROFILE CTA Button]
        D --> E[2nd Visit Pop-up & 7-Checkin Offer Modal]
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
- **Design System**: Split-screen custom Vanilla CSS (`app/globals.css`) with 5 pastel cloud pills (**SAD**, **DISGUSTED**, **ANGRY**, **FEARFUL**, **BAD**), SVG feeling tiles, and rising sun target card.

---

## 📋 Business Specification v2 Requirements & Status

| Section | Business Requirement | Status | Implementation Details |
| :--- | :--- | :--- | :--- |
| **Section 6** | 5 Mood Clouds: SAD, DISGUSTED, ANGRY, FEARFUL, BAD | ✅ COMPLETE | Cloud SVG pills with bold uppercase labels in `lib/moodData.ts` & `MoodTool.tsx`. |
| **Section 6** | Clickable Choices Only (No free-text typing) | ✅ COMPLETE | 3-step structured visual picker (Cloud -> Card -> Nuance pill). |
| **Section 6** | Glowing "Flip My Mood" Center Button | ✅ COMPLETE | Pulsing 3D purple button in center of split screen canvas. |
| **Section 6** | Right Side Rising Sun Output | ✅ COMPLETE | Displays `"Your positive mood is: [Target Mood]"` + 60-second action box. |
| **Section 10** | "SAVE MY PROFILE" Button below 60s Action | ✅ COMPLETE | Positioned directly underneath the action card in `MoodTool.tsx`. |
| **Section 10** | 2nd Visit Automatic Profile Pop-up | ✅ COMPLETE | Automatically opens registration modal when `visitCount === 2`. |
| **Section 9 & 10** | 7-Checkin Special Offer Pop-up ($7 PDF) | ✅ COMPLETE | Triggers special offer popup when user reaches 7 check-ins. |
| **Section 10 & 11** | Privacy Consent & 90-Day Auto Deletion | ✅ COMPLETE | Standard consent text & `/api/cron/purge-inactive` cleanup route. |
| **Section 9** | Paid PDF Downloads ($7 & $19) | ✅ COMPLETE | Dynamic `pdf-lib` generation via `/api/pdf` + PayPal Checkout modal. |
| **Section 5 & 9** | SaaS Admin Dashboard (`/admin`) | ✅ COMPLETE | Master password (`admin123`), lead stats, and 1-Click CSV export. |
| **Section 3 & 13** | AdSense Top & Bottom Containers | ✅ COMPLETE | `AdSpace` containers configured on top and bottom of `app/page.tsx`. |
| **Section 16** | Remove Bin/Clear Selection Tile | ✅ COMPLETE | Removed trash icon tile per explicit Section 16 instructions. |

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
  primaryMood     String       // SAD, DISGUSTED, ANGRY, FEARFUL, BAD
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
