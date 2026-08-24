# Supabase Configuration & Management Guide

## Supabase Token Configuration
Your Supabase Management token has been configured for automated database and project administration.

### Environment Variable Usage
To run Supabase CLI commands using your token:

```powershell
$env:SUPABASE_ACCESS_TOKEN="<YOUR_SUPABASE_TOKEN>"
```

---

## 📦 Backup Plan (Business Specification §14)

> **Spec requirement**: "Since Supabase Free does not include automatic backups, please explain the backup plan while we are on the Free plan."

### ⚠️ Important: Supabase Free Tier Has No Automatic Backups

Supabase Free tier does NOT include automatic database backups. Here is the full backup plan:

### Option 1: Manual Export via Supabase Dashboard (Free)
1. Go to your Supabase project → **Settings** → **Database**
2. Click **Download backup** — this exports a full SQL dump
3. **Recommended**: Do this manually at least once per week until upgrading to Pro
4. Save the `.sql` file securely (local + Google Drive/Dropbox)

### Option 2: Admin Dashboard CSV Export (Built-In)
- The MoodFlip Admin Dashboard (`/admin`) has a **"Export to CSV"** button
- This exports all registered users, emails, moods/check-ins, and purchase status
- Use this regularly to back up user data independently of Supabase

### Option 3: Upgrade to Supabase Pro ($25/month)
- Supabase Pro includes **automatic 7-day rolling backups**
- Upgrade when: user count grows, payment processing starts, or Joy requests it
- **No upgrade without Joy's prior approval** (per Spec §14)
- Upgrade path: Supabase Dashboard → Settings → Billing → Upgrade Plan

### Option 4: pg_dump via CLI (Advanced)
```powershell
# Get connection string from Supabase Dashboard → Settings → Database
pg_dump "postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres" > backup_$(Get-Date -Format 'yyyy-MM-dd').sql
```

---

## 🗑️ 90-Day Automatic Profile Deletion (Business Specification §11)

> **Spec requirement**: "Enable automatic 90-day deletion of inactive profiles."

### Implementation
- API route created: `app/api/cron/cleanup/route.ts`
- Deletes profiles where `last_active_at` is older than 90 days
- `last_active_at` is updated via `app/api/user/activity/route.ts` on every check-in/login

### How to Schedule (Pick One)

**Option A: Vercel Cron (Recommended)**
Add to `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 2 * * *"
    }
  ]
}
```

**Option B: Supabase pg_cron**
```sql
-- Run in Supabase SQL Editor
SELECT cron.schedule(
  '90-day-cleanup',
  '0 2 * * *',
  $$DELETE FROM profiles WHERE last_active_at < NOW() - INTERVAL '90 days'$$
);
```

---

### Useful Supabase CLI Commands

1. **List Supabase Projects:**
   ```powershell
   npx supabase projects list
   ```

2. **Reset Database & Delete All Tables (Prisma):**
   ```powershell
   npx prisma migrate reset --force
   ```

3. **Delete Supabase Project:**
   ```powershell
   npx supabase projects delete <project-ref>
   ```
