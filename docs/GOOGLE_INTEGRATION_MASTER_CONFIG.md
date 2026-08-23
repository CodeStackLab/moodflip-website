# 🌐 MoodFlip Google Drive, Sheets & Docs Integration Master Config

**Last Updated:** August 23, 2026  
**Project:** MoodFlip Website  
**Status:** ✅ Fully Configured & Verified Live

---

## 📌 Quick Summary / Fast Resume (Kal Aate Hi Kya Karna Hai)

Jab bhi kal ya aage session start ho, AI assistant ko bas ye file ka reference dena ya kehna:
> *"Google sheets / docs integration se continue karo (Reference: docs/GOOGLE_INTEGRATION_MASTER_CONFIG.md)"*

AI assistant automatically ye token get karega aur live read/write/comment/sync start kar dega:
```powershell
$token = (gcloud auth application-default print-access-token 2>&1).Trim()
```

---

## 🔐 1. Authentication & Credentials Configuration

- **Developer / Owner Account:** `bloggerakeel@gmail.com`
- **Google Cloud Project ID:** `gen-lang-client-0686345674`
- **Project Number:** `401965824795`
- **Client Secret File:** `c:\Users\mohda\Documents\moodflip-website\client_secret_401965824795-jsnrdrf0ou4q7m486i7ef1kvng1ra59h.apps.googleusercontent.com.json`
- **Application Default Credentials (ADC) Path:** `%APPDATA%\gcloud\application_default_credentials.json`

### Enabled APIs on Google Cloud Console:
1. `drive.googleapis.com` (Google Drive API)
2. `sheets.googleapis.com` (Google Sheets API v4)
3. `docs.googleapis.com` (Google Docs API v1)

### Re-Authentication Command (Only if Token Expires in Future):
```powershell
gcloud auth application-default login --client-id-file="c:\Users\mohda\Documents\moodflip-website\client_secret_401965824795-jsnrdrf0ou4q7m486i7ef1kvng1ra59h.apps.googleusercontent.com.json" --scopes="https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/drive,https://www.googleapis.com/auth/spreadsheets,https://www.googleapis.com/auth/documents"
```
*(Browser me **Advanced ➔ Go to MoodFlip (unsafe)** select karke all permissions allow karni hoti hain).*

---

## 📊 2. Active Google Sheets (Live Data Source)

- **Main Native Google Sheet Name:** `Buyer Mood pairings copy` (converted to native Sheet)
- **Spreadsheet ID:** `1BKkG6VF8VbhOe7P1aR75yBCm_iTaZDEXpn7JvMRdTeM`
- **Live URL:** [https://docs.google.com/spreadsheets/d/1BKkG6VF8VbhOe7P1aR75yBCm_iTaZDEXpn7JvMRdTeM/edit?gid=59679314#gid=59679314](https://docs.google.com/spreadsheets/d/1BKkG6VF8VbhOe7P1aR75yBCm_iTaZDEXpn7JvMRdTeM/edit?gid=59679314#gid=59679314)

### Sheets Tabs Structure:
1. **`Pairings` (Range: `Pairings!A1:E50`)**:
   - `Column A`: Serial (1 to 28)
   - `Column B`: Bad Mood (e.g. Scared, Anxious, Insecure...)
   - `Column C`: Good Mood Target (e.g. Safe / Peaceful, Peaceful...)
   - `Column D`: Default 60-Second Action
   - `Column E / Column1`: Reviewer Notes & Change Comments
2. **`Rotating Actions` (Range: `Rotating Actions!A1:E300`)**:
   - Total 280 rows (10 rotating actions per Serial 1–28).

---

## 📝 3. Active Google Docs (Defects & References)

- **1. Defect List Document:**
  - **Doc Name:** `MoodFlip_Defect_List_vs_Business_Spec_14AUG26 (1)`
  - **Doc ID:** `1BHU_upu1sMrHS0X06Hd_vNG1-giAtY8OUAA46M-5uYU`
  - **Live URL:** [https://docs.google.com/document/d/1BHU_upu1sMrHS0X06Hd_vNG1-giAtY8OUAA46M-5uYU/edit?tab=t.0](https://docs.google.com/document/d/1BHU_upu1sMrHS0X06Hd_vNG1-giAtY8OUAA46M-5uYU/edit?tab=t.0)
- **2. Color Codes Document:**
  - **Doc Name:** `Colour_Codes_ChatGPT (1)`
  - **Doc ID:** `1r1rUCnaYjxmiXAD0I2G9Yl468yLsPtFuUuOPhHY14dc`

---

## ⚙️ 4. Automation Scripts in Project

| File Path | Description / Purpose | Command |
|---|---|---|
| [`scripts/sync_sheet_to_moods.js`](file:///c:/Users/mohda/Documents/moodflip-website/scripts/sync_sheet_to_moods.js) | Google Sheet data se `data/moods.ts` me 28 moods + 280 rotating actions sync karta hai. | `node scripts/sync_sheet_to_moods.js` |
| [`scripts/fix_sheet_live.js`](file:///c:/Users/mohda/Documents/moodflip-website/scripts/fix_sheet_live.js) | Google Sheet me live cells update & buyer-facing cell notes inject karta hai. | `node scripts/fix_sheet_live.js` |
| [`scripts/post_doc_comments.js`](file:///c:/Users/mohda/Documents/moodflip-website/scripts/post_doc_comments.js) | Google Doc par top-level resolution comments post karta hai. | `node scripts/post_doc_comments.js` |
| [`scripts/post_replies_fixed.js`](file:///c:/Users/mohda/Documents/moodflip-website/scripts/post_replies_fixed.js) | Google Doc ke existing comment threads par replies post karta hai. | `node scripts/post_replies_fixed.js` |
| [`scripts/append_doc_resolution.js`](file:///c:/Users/mohda/Documents/moodflip-website/scripts/append_doc_resolution.js) | Google Doc ke body me item-by-item resolution report append karta hai. | `node scripts/append_doc_resolution.js` |

---

## 🚀 5. How to Fetch Fresh Sheet Data & Apply to Local Website (1-Click Workflow)

Agar Google Sheet me koi bhi naya content ya action add ya change kiya jaye, to bas ye do steps run karne hain:

```powershell
# Step 1: Fetch fresh live data from Google Sheets API
$token = (gcloud auth application-default print-access-token 2>&1).Trim()
$id = "1BKkG6VF8VbhOe7P1aR75yBCm_iTaZDEXpn7JvMRdTeM"
$rp = Invoke-WebRequest -Uri "https://sheets.googleapis.com/v4/spreadsheets/$id/values/Pairings!A1:E50" -Headers @{Authorization="Bearer $token"} -UseBasicParsing
$ra = Invoke-WebRequest -Uri "https://sheets.googleapis.com/v4/spreadsheets/$id/values/Rotating%20Actions!A1:E300" -Headers @{Authorization="Bearer $token"} -UseBasicParsing
($rp.Content | ConvertFrom-Json).values | ConvertTo-Json -Depth 5 | Set-Content "scripts\pairings_live.json" -Encoding UTF8
($ra.Content | ConvertFrom-Json).values | ConvertTo-Json -Depth 5 | Set-Content "scripts\rotating_live.json" -Encoding UTF8

# Step 2: Sync to moods.ts and build
node scripts/fix_rotating_json.js
node scripts/sync_sheet_to_moods.js
npm run build
```

Sab kuch automatically update ho jayega!
