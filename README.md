# 💫 MoodFlip - Self-Help Utility Website

A modern, responsive self-help web utility featuring an interactive CBT Mood Flipper, 4-7-8 Breathing Guide, Web Audio Ambient Soundscapes, and Cloud Reflection Logging connected to **Supabase** & **Vercel Auto-Deployment**.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Vite + Vanilla HTML5/CSS3 (Glassmorphism & Neon Glow design system) + JavaScript
- **Backend / Database**: Supabase (PostgreSQL + REST client)
- **Deployment**: Vercel (CI/CD connected to GitHub)
- **Audio Engine**: Web Audio API (Synthesized rain, ocean waves, and 432Hz harmonic tone)

---

## 🚀 Quick Start (Local Development)

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Local Environment Variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 🗄️ Supabase SQL Database Setup

In your [Supabase Dashboard](https://supabase.com/dashboard) > SQL Editor, run the following SQL script to create the `mood_logs` table:

```sql
-- Create mood_logs table
CREATE TABLE IF NOT EXISTS public.mood_logs (
    id BIGSERIAL PRIMARY KEY,
    mood TEXT,
    action_target TEXT,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.mood_logs ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts & reads for demonstration
CREATE POLICY "Allow public read access" ON public.mood_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.mood_logs FOR INSERT WITH CHECK (true);
```

---

## 🔄 Setting Up GitHub + Vercel Auto-Deployment

### Step 1: Initialize Git and Push to GitHub
Run the following commands in your project terminal:

```bash
# Initialize local repository
git init

# Add files & commit
git add .
git commit -m "Initial commit: MoodFlip app with Supabase"

# Rename branch to main
git branch -M main

# Link your GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Connect Repository to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Click **Import Repository** next to your `YOUR_REPO_NAME` repository.
3. Framework Preset will automatically be detected as **Vite**.

### Step 3: Add Environment Variables in Vercel
Before clicking Deploy, expand **Environment Variables** in Vercel:
- Key: `VITE_SUPABASE_URL` | Value: `https://your-project.supabase.co`
- Key: `VITE_SUPABASE_ANON_KEY` | Value: `your-supabase-anon-key`

Click **Deploy**!

---

## ✨ Automated Continuous Deployment (CI/CD)

Whenever you edit code locally, simply run:
```bash
git add .
git commit -m "Updated feature"
git push
```
**Vercel will automatically trigger a new deployment**, build your app, and update the live URL instantly without any manual intervention!
