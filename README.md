# MoodFlip — Self-Reflection & Mood Transformation Platform

MoodFlip is a modern, single-screen wellness web application designed to help users quickly identify difficult emotions through an intuitive 3-layer mood wheel and receive instant, actionable 60-second micro-actions and grounding exercises.

---

## 🌟 Core Features

- **Single-Screen 1-Page Utility:** Zero-scroll homepage layout on desktop, tablet, and mobile.
- **3-Layer Mood Wheel:**
  - **Layer 1:** 5 Main Mood Families (`Sad`, `Disgusted`, `Angry`, `Fearful`, `Bad`) with stylized cloud cards.
  - **Layer 2:** Secondary Feeling Branches.
  - **Layer 3:** Nuanced Feeling Tiles.
- **28 Counselor Pairings Database:** Live synchronization between `data/moods.ts` and the Admin Mood Library (`/admin?tab=Mood+Library`).
- **Free Use Flow:** 3–4 free flips directly on the homepage, transitioning smoothly to the full 60-Second Actions dashboard (`/profile?tab=60-Second+Actions`).
- **Profile & Progress:** `💾 SAVE MY PROFILE` button with a daily limit of max 3 saves per calendar day.
- **US$7.00 Paid 7-Day Mindset Plan:** Automated binary PDF generation (`jsPDF`) with re-download fallback in `Profile > Downloads`.
- **Private Admin Panel (`/admin`):** 15 tabs for Mood Library management, user statistics, 1-click CSV exports (`moodflip_users.csv`, `moodflip_leads.csv`), and Stripe payment settings.
- **Privacy & Compliance:** Exact privacy consent checkbox with 90-day inactive auto-deletion notice and a working **"Delete Account & History"** button.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** 18.x or 20.x+
- **Google Cloud SDK:** 581.0.0+ (for Google Docs automation)

### Installation
```bash
# Clone the repository
git clone https://github.com/CodeStackLab/moodflip-website.git
cd moodflip-website

# Install dependencies
npm install

# Run the local development server
npm run dev -- -p 3005
```

Open [http://localhost:3005](http://localhost:3005) in your browser.

---

## 📚 Project Documentation

- [`docs/GOOGLE_DOCS_GCLOUD_SETUP.md`](./docs/GOOGLE_DOCS_GCLOUD_SETUP.md) — Complete setup and workflow guide for Google Cloud CLI & Google Docs API background automation.
- [`MoodFlip_Defect_List_Response_Complete.md`](./MoodFlip_Defect_List_Response_Complete.md) — 48-item full defect list resolution and compliance report against Business Specification v3.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS & Pure CSS Modules
- **State Management & Storage:** LocalStorage & Context APIs
- **PDF Generation:** jsPDF
- **Cloud Automation:** Google Cloud SDK (`gcloud`), Google Drive & Docs REST APIs v3/v1
- **Icons & Graphics:** Custom SVG Watercolor Sunrise, Lucide Icons
