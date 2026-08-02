# Supabase Configuration & Management Guide

## Supabase Token Configuration
Your Supabase Management token has been configured for automated database and project administration.

### Environment Variable Usage
To run Supabase CLI commands using your token:

```powershell
$env:SUPABASE_ACCESS_TOKEN="<YOUR_SUPABASE_TOKEN>"
```

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
