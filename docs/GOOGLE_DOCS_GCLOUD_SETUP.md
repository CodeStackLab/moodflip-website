# Google Cloud CLI & Google Docs API Automation Guide

> 📌 **Master Reference Document:** See [`docs/GOOGLE_INTEGRATION_MASTER_CONFIG.md`](file:///c:/Users/mohda/Documents/moodflip-website/docs/GOOGLE_INTEGRATION_MASTER_CONFIG.md) for full details covering Google Drive, Google Sheets, and Google Docs live API setup.

This guide explains how the Google Cloud SDK (`gcloud`) and Google Docs / Sheets / Drive API automation is configured for this project.

---

## 1. Prerequisites Installed

1. **Google Cloud SDK 581.0.0+** installed on the local system.
2. **Authenticated Account:** `bloggerakeel@gmail.com`
3. **Google Cloud Project:** `gen-lang-client-0686345674` (Project # `401965824795`)
4. **Enabled APIs on Google Cloud:**
   - `drive.googleapis.com` (Google Drive API)
   - `docs.googleapis.com` (Google Docs API)

---

## 2. Authentication & Credentials Setup

Authentication uses **Application Default Credentials (ADC)** with an OAuth 2.0 Desktop Client.

### Files:
- **Client Secret File:** `client_secret_401965824795-jsnrdrf0ou4q7m486i7ef1kvng1ra59h.apps.googleusercontent.com.json` (stored locally, excluded from git via `.gitignore`).
- **Generated ADC Credentials:** Stored by `gcloud` in `%APPDATA%\gcloud\application_default_credentials.json`.

### Re-Authenticating (if token ever expires in the future):
Run this single command in PowerShell:
```powershell
gcloud auth application-default login --client-id-file="C:\Users\mohda\Documents\moodflip-website\client_secret_401965824795-jsnrdrf0ou4q7m486i7ef1kvng1ra59h.apps.googleusercontent.com.json" --scopes="https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/drive,https://www.googleapis.com/auth/documents"
```
*When the browser opens, select your Google account (`bloggerakeel@gmail.com`), click **Advanced ➔ Go to ... (unsafe)**, and check all permission boxes to allow access.*

---

## 3. How to Obtain the Live Access Token

In PowerShell or Node.js scripts:
```powershell
$token = gcloud auth application-default print-access-token
```
In Node.js:
```javascript
const { execSync } = require('child_process');
const token = execSync('powershell -Command "$env:Path = [System.Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' + [System.Environment]::GetEnvironmentVariable(\'Path\',\'User\'); gcloud auth application-default print-access-token"')
  .toString().trim();
```

---

## 4. Key Automation Scripts in Project

All automated Google Docs scripts are stored in the `/scripts` directory:

| Script | Purpose | Command to Run |
|---|---|---|
| [`scripts/post_doc_comments.js`](file:///c:/Users/mohda/Documents/moodflip-website/scripts/post_doc_comments.js) | Posts new top-level resolution comments for defect items to the Google Doc. | `node scripts/post_doc_comments.js` |
| [`scripts/post_replies_fixed.js`](file:///c:/Users/mohda/Documents/moodflip-website/scripts/post_replies_fixed.js) | Posts professional replies to existing comment threads in the Google Doc. | `node scripts/post_replies_fixed.js` |
| [`scripts/append_doc_resolution.js`](file:///c:/Users/mohda/Documents/moodflip-website/scripts/append_doc_resolution.js) | Appends the full item-by-item resolution report directly into the Google Doc body. | `node scripts/append_doc_resolution.js` |
| [`scripts/cleanup_drive_docs.js`](file:///c:/Users/mohda/Documents/moodflip-website/scripts/cleanup_drive_docs.js) | Safely trashes unused Google Docs while keeping the 2 MoodFlip project files. | `node scripts/cleanup_drive_docs.js` |

---

## 5. Active Google Docs Reference IDs

- **MoodFlip Defect List:**
  - **Doc Name:** `MoodFlip_Defect_List_vs_Business_Spec_14AUG26 (1)`
  - **Doc ID:** `1BHU_upu1sMrHS0X06Hd_vNG1-giAtY8OUAA46M-5uYU`
  - **Link:** [https://docs.google.com/document/d/1BHU_upu1sMrHS0X06Hd_vNG1-giAtY8OUAA46M-5uYU/edit?tab=t.0](https://docs.google.com/document/d/1BHU_upu1sMrHS0X06Hd_vNG1-giAtY8OUAA46M-5uYU/edit?tab=t.0)

- **Color Codes Reference:**
  - **Doc Name:** `Colour_Codes_ChatGPT (1)`
  - **Doc ID:** `1r1rUCnaYjxmiXAD0I2G9Yl468yLsPtFuUuOPhHY14dc`

---

## 6. How the AI Uses This Tomorrow

Whenever you want the AI assistant to inspect or update any Google Doc:
1. Provide the Google Doc link or Document ID.
2. The AI uses the local `gcloud` token to make REST API calls to `https://docs.googleapis.com/v1/documents/{documentId}` or `https://www.googleapis.com/drive/v3/files/{fileId}/comments`.
3. The AI reads content, edits text, or adds comments completely in the background without needing a visible browser session.
