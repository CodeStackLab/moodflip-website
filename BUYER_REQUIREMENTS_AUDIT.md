# MoodFlip Buyer Requirements Audit

Source priority used for this audit:

1. `MoodFlip_Business_Specification_v3_with_response.docx.md`
2. `MoodFlip_Business_Specification_v3.docx.md`
3. `MoodFlip_Response_to_Open_Items.docx.md`
4. Earlier specifications and `Joyk_aus.md` for history and clarification

## Implemented and verified in source

| Buyer requirement | Implementation evidence |
| --- | --- |
| Free tap-only tool without an account | Mood picker is client-side and remains usable if account/payment services fail. |
| Three-layer visual flow | Five family clouds → second-layer category → exact third-layer feeling → explicit “Flip My Mood” action. |
| Content scale | 40 exact mood/target pairings are loaded; every feeling has 10 rotating actions. Data arrays accept 30+ actions without schema changes. |
| Rotation | Per-feeling browser index rotates actions for anonymous visitors; saved action history is retained for profile users. |
| 7-day qualification | Server counts distinct calendar days, allows no more than three saved check-ins per day, and requires seven days before Stripe checkout. |
| Paid report | 7-day PDF supports up to 21 check-ins, includes a non-medical pattern summary, and de-duplicates actions within the report. |
| Phase 2 readiness | Database, checkout and PDF generator support 30 days, up to 90 check-ins and 30+ actions. Public purchase remains labelled Phase 2/coming soon until activation. |
| Optional profile | Second-visit invitation, voluntary consent, login/register/profile pages and saved progress are implemented. |
| Privacy | Minimal fields, inactivity timestamp and protected daily 90-day purge endpoint are implemented. |
| Payment recovery | Purchases are recorded before delivery. Profile download links and admin download/resend controls are implemented. |
| Admin | Server-protected session, user/search/status views, real users CSV, real check-ins CSV and paid-report recovery are implemented. |
| Contact protection | Honeypot, validation, length limits, per-IP rate limit and server-side email delivery are implemented. |
| SEO | 28 original mood-guide URLs, unique metadata, Article schema, internal links, WebApplication schema and XML sitemap are implemented. |
| AdSense readiness | Top/bottom placements exist but render only after approval and valid owner configuration. No affiliate content is displayed. |
| Analytics events | Mood use, profile creation, checkout start, purchase return and PDF download events are instrumented. |
| Responsive design | Desktop/tablet/mobile breakpoints, touch targets, overflow handling, focus visibility and reduced-motion support are implemented. |
| Reliability/security | HTTPS deployment, security headers, server-side authentication, Stripe webhook verification, no-store API responses and non-exposed server secrets are implemented. |
| Ownership/handover | Source repository, Vercel project, Supabase project, environment-variable template, deployment command and setup documentation are present. |

## Owner-controlled launch checks

These items cannot be completed with source code alone and must be present in the owner-controlled production services:

- Supabase database and Auth configuration
- `DATABASE_URL`, `ADMIN_PASSWORD` and `CRON_SECRET`
- Joy-owned Stripe live keys and signed webhook endpoint
- Resend API key, verified sender domain and owner contact address
- Google Analytics measurement ID
- Google Search Console ownership verification, sitemap submission and indexing requests
- Google AdSense approval, publisher ID and real ad-unit IDs
- Joy’s Owner role for GitHub, Vercel and Supabase at handover
- Manual Supabase CSV export at handover; ongoing automatic backups require a suitable paid backup plan

No secret values belong in Git, this audit, screenshots or client-facing documents.

## Verification commands

```bash
npm run verify
npm run deploy:production
```

The deployment command stops automatically if TypeScript or the production build fails.
