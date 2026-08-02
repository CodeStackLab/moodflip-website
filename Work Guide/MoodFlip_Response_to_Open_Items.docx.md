# **MoodFlip – Response to Open Items**

*Prepared for Joy's review — replies to all items flagged in the Business Specification review (v1 & v2).*

## **1\. Hosting, Monitoring & Reliability**

| Open Item | Response / Confirmation |
| :---- | :---- |
| **Hosting capacity estimate** | Project runs on Vercel (Hobby/free plan) \+ Supabase (Free plan). Vercel free tier gives \~100 GB bandwidth and up to \~100K–1M function calls per month; Supabase free tier gives 500 MB database, 50,000 monthly active users, and 5 GB bandwidth. This comfortably covers MoodFlip at launch and through early growth. |
| **Monitoring guidance** | Uptime and errors are tracked through the Vercel and Supabase dashboards (build/runtime logs, DB usage, bandwidth usage). These will be checked periodically and Joy will be informed if usage approaches free-tier limits. |
| **Upgrade path** | If traffic/usage nears the free-tier limits, the project will move to Vercel Pro and/or Supabase Pro. Nothing will be upgraded — and no cost incurred — without Joy's prior approval. |
| **Expected costs** | No hosting cost currently — both Vercel and Supabase are on their free plans. If/when an upgrade is needed later, a separate quote (Vercel Pro ≈ $20/month, Supabase Pro ≈ $25/month) will be shared for approval before anything is charged. |
| **Graceful handling of paid/profile service issues** | If a paid (PDF/payment) or profile-related service is temporarily unavailable, the app will show a clear retry/error message to the user instead of failing silently, and the action can be retried once the service is back. |

*Note: Vercel's free Hobby plan is intended for non-commercial use. Since MoodFlip processes payments (paid PDF reports), this should be reviewed — it may be worth confirming with Joy whether to move the payment-related part to Vercel Pro to stay compliant, even though the rest of the app can remain on the free tier.*

## **2\. Capacity Planning**

| Open Item | Response / Confirmation |
| :---- | :---- |
| **Capacity planning** | Free-tier limits: Vercel — 100 GB bandwidth/month; Supabase — 500 MB database \+ 50,000 monthly active users \+ 5 GB bandwidth/month. The app will be monitored as user numbers grow, and migration to paid tiers will be prepared in advance so there's no disruption if the free limits are approached. |

## **3\. Ownership & Support SLA**

| Open Item | Response / Confirmation |
| :---- | :---- |
| **Full ownership after payment** | Confirmed — after final payment, Joy will have full ownership of the source code, design, written content, mood/action database & content, and all commercial rights. |
| **Maintenance price** | No additional cost — maintenance is included. |
| **Faster live-bug SLA (24 hrs high priority / 48 hrs low priority)** | Confirmed possible, and included at no extra cost — high-priority live bugs will be fixed within 24 hours, low-priority issues within 48 hours. |

## **4\. Feature & Cost Checklist**

| Open Item | Response / Confirmation |
| :---- | :---- |
| **Bug fixes** | Included after launch at no additional cost, as part of the free maintenance included above. |
| **Adding more actions (+25 per mood)** | To be confirmed — exact cost for adding 25 more actions per mood will be shared separately once scoped. |
| **30-day PDF launch** | To be confirmed — cost/timeframe if this is not part of the initial launch will be shared separately. |
| **Search Console issues** | To be confirmed — whether ongoing monitoring/fixing of indexing or technical SEO errors is included or a separate add-on. |
| **AdSense integration later** | To be confirmed — whether adding AdSense code later is included or a separate task. |
| **Hosting upgrades** | No cost while on free tier. If/when Vercel Pro or Supabase Pro is needed, cost will be Vercel Pro ≈ $20/month and/or Supabase Pro ≈ $25/month — shared as a separate quote, not part of the initial project cost, and only actioned with Joy's approval. |

## **5\. Product Confirmations**

| Open Item | Response / Confirmation |
| :---- | :---- |
| **30-day readiness (mood tracking \+ PDF reports)** | Confirmed — database is being built future-ready to support 30-day mood tracking and PDF report generation. |
| **10 rotating actions per mood at launch** | Confirmed — 10 rotating actions per mood at launch, using local storage. Launch content itself (the actual action text/data) still needs to be supplied or loaded by Joy/content owner. |
| **30+ actions per mood support later** | Confirmed — the system will support expanding to 30+ actions per mood in a future update. |
| **Automatic 90-day inactive profile deletion** | Confirmed — inactive profiles will be automatically deleted after 90 days. |
| **Automatic paid PDF delivery after payment** | Confirmed — PDF report will be automatically delivered to the user right after successful payment. |

*Items marked "To be confirmed" need a specific number/timeframe before this goes back to Joy — happy to fill these in once decided.*