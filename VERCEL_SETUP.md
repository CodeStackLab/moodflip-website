# Vercel Configuration & Setup Guide

## Vercel Token Configuration
Your Vercel token has been configured for local automation and deployment management.

### Environment Variable Usage
To run Vercel CLI commands in PowerShell using your token:

```powershell
$env:VERCEL_TOKEN="<YOUR_VERCEL_TOKEN>"
```

### Useful Vercel CLI Commands

1. **List Projects & Deployments:**
   ```powershell
   npx vercel ls --token <YOUR_VERCEL_TOKEN>
   ```

2. **Remove Project Deployments (Clean Vercel):**
   ```powershell
   npx vercel remove moodflip-website --yes --token <YOUR_VERCEL_TOKEN>
   ```

3. **Deploy Project Fresh:**
   ```powershell
   npx vercel --prod --token <YOUR_VERCEL_TOKEN>
   ```
