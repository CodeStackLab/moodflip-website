**BUSINESS SPECIFICATION**

**MoodFlip \- Self-Help Utility Website**

Prepared by Joy | Working specification for developer quote, build scope, launch plan, and content requirements.

21 July 2026 / v2

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# **CONTENTS**

1\. Project Overview	2

2\. Business Objective and Target Users	2

3\. Product Scope and Launch Strategy	2

4\. Domain, Brand and Positioning	3

5\. Website Pages and User Flow	3

6\. Mood Selection Design	3

7\. Mood Pairings and Action Content	4

8\. Rotating 60-Second Actions	4

9\. Paid Products and Monetisation	4

10\. User Profiles, Email Capture and Data Storage	6

11\. Privacy, Consent and Automatic Deletion	6

12\. SEO, Google Setup and Traffic Growth	6

13\. AdSense	7

14\. Technical Architecture and Hosting	7

15\. Security, Performance and Reliability	7

16\. Design Direction and Animation	8

17\. Ownership, Handover and Intellectual Property	8

18\. Maintenance and Future Updates	8

19\. Developer Offer Review and Required Clarifications	9

20\. Migration	10

21\. Test Mode / Maintenance	10

22\. Live Launch / Handover	10

# **1\. Project Overview**

MoodFlip is a simple self-reflection utility website. Users choose a negative mood from fixed visual options and receive a positive direction plus a short, practical 60-second action. The website is not therapy, not mental health treatment, and not medical advice.

* Core concept: negative mood \-\> positive target state \-\> 60-second action.  
* Primary use case: a user wants a quick, gentle emotional shift without typing free text or reading long content.  
* The first version should be useful, fast, mobile-friendly and able to support future paid downloads.

# **2\. Business Objective and Target Users**

The business objective is to create a utility site that can generate traffic, collect email leads with consent, sell personalised 7-day and 30-day MoodFlip downloads, and also display Google AdSense ads.

| Target user | Need | MoodFlip response |
| :---- | :---- | :---- |
| General adult visitor | Quick support when feeling low, angry, anxious, lonely or stuck. | Clickable mood choice and one 60-second action. |
| Returning visitor | Variety and repeat usefulness. | Rotating actions so the same mood does not always show the same action. |
| Profile user | Save check-ins and receive personalised downloads/offers. | Email-based profile and saved mood/action history. |
| Paid user | A structured short plan. | 7-day paid PDF at launch or early phase; 30-day paid PDF later. |

When someone visits the site for the 2nd time the site needs to offer creating a profile, in a pop-up window. 

# **3\. Product Scope and Launch Strategy**

The preferred strategy is a practical staged launch, while ensuring the technical structure supports the full future product from the beginning.

| Phase | Included | Timing / purpose |
| :---- | :---- | :---- |
| **Phase 1** \- Free website launch | Free MoodFlip tool,  28 mood pairings, 10 rotating actions per mood,  core pages,  SEO mood pages,  Google setup,  Option to save profile and/or provide e-mail address. Provide test environment. | Launch the free MoodFlip website.  Test the core functions in test environment. Submit the site to Google Search Console, submit the XML sitemap, and request Google indexing for the main pages. |
| **Phase 1** \- 7-day paid download | Profile/email capture,  saved mood check-ins,  paid 7-day PDF generation,  payment gateway,  automatic PDF delivery. | Early monetisation and email/list building. |
| **Phase 2** \- 30-day paid download | 30-day mood check-ins,  30-day PDF/download product,  30+ actions per mood support. AdSense activated | 2 months after launch or earlier if traffic/sales justify it. |

Important build requirement: even if Phase 2 is launched later, the database/content structure must be ready for at least 30 actions per mood and 30-day paid downloads without rebuilding the website.

The site needs to be designed well to have space for AdSense ads. My suggestion is to put them on the top and on the bottom. 

# **4\. Domain, Brand and Positioning**

Domain chosen: **moodflip.coach** on NameCheap. 

# **5\. Website Pages and User Flow**

The developer quote includes the core pages required. These should be considered mandatory.	

| Page | Requirement |
| :---- | :---- |
| Homepage / Mood Tool | Clickable mood family cards, exact feeling tiles, positive target mood and rotating 60-second action. |
| About | Explain MoodFlip as a self-reflection utility site. Clearly state not therapy, not medical advice and not for emergencies/crisis support. |
| Contact | Basic contact page or form with spam protection. |
| Privacy Policy | Explain profile data, mood/action storage, purchase history and automatic 90-day deletion. |
| SEO mood pages | 20-30 original mood pages for search traffic, internally linked to the tool. |
| Profile / Login / Saved Check-ins area | Optional user profile area for saving MoodFlip check-ins, selected moods/dates, actions shown and purchase status. |
| Paid PDF checkout / delivery flow | Secure checkout flow for the US$7 7-day PDF, with automatic PDF generation, download and email delivery after successful payment. |
| Private Admin Dashboard | Secure admin area for Joy to view registered user emails, saved moods/check-ins, purchase status, and export user/email data to CSV/Excel. No complex email campaign system required at launch. |

# **6\. Mood Selection Design**

Users should not type their mood. The mood selection must use clickable choices only. This avoids spelling, slang, translation and interpretation errors.

* Step 1: user chooses a broad mood family card. The feeling appears in a cloud. Use one of these sad face looking clouds as animation; 

[https://www.magnific.com/free-vector/cartoon-style-cloud-collection\_15694444.htm](https://www.magnific.com/free-vector/cartoon-style-cloud-collection_15694444.htm)   
The 5 main bad feelings are; Sad / Disgusted / Angry / Fearful / Bad. Write the feeling into the cloud using capital, bold letters. 

* Step 2: After the user chose a 1st layer bad feeling, the 2nd layer appears underneath, displaying the 2nd layer of feelings from the mood wheel; [https://feelingswheel.app/](https://feelingswheel.app/) . These are displayed like cards, showing a small drawing and the feeling\`s name.   
* Step 3: When the user clicks on a feeling from the 2nd layer, a 3rd layer appears showing more feelings. The user chooses one feeling from these.   
* Step 4: User clicks on a \`**Flip My Mood**\` button which is in the middle of the screen. The button should be large, highly visible, and attention-catching, using a soft glow, pulse, or subtle animation rather than harsh flashing. The user has to click on it.   
* Step 5: The site displays the selected negative moods on the left side of the screen, positive target mood and one 60-second action on the right side of the screen. On the right side in a Sun background there\`s a writing; 

Your positive mood is:  
Peaceful (this is an example, display the appropriate mood)

# **7\. Mood Pairings and Action Content**

The current working content file contains 28 bad mood / good mood pairings, with 10 rotating actions per mood. The site should show a 60-second action.

| Requirement | Status |
| :---- | :---- |
| 28 bad mood / good mood pairings | Required at launch. |
| 10 rotating 60-second actions per mood | Required at launch. |
| 30 actions per mood support | Required in the structure/database for Phase 2, 2 months after launch. |

# **8\. Rotating 60-Second Actions**

Repeat visitors should not always see the same action for the same mood. The site should rotate among available actions.

* At launch: each mood should have 10 available actions.  
* Future-ready: each mood should support 30 or more actions without rebuilding the site.  
* Suggested simple implementation: store the last action shown per mood in the visitor browser/local storage or user profile, then show a different or next action next time.  
* For profile users, action history may be stored with the user record so paid downloads can avoid repeats.  
* For paid 7-day and 30-day downloads, the PDF should not repeat the same action within that paid plan.

# **9\. Paid Products and Monetisation**

| Product / monetisation method | Requirement |
| :---- | :---- |
| Free tool | Available without profile creation. |
| US$7 seven-day PDF/download | Personalised 7-day MoodFlip plan based on saved moods/check-ins. Automatic payment and delivery in e-mail. JK\>\> After the user has saved check-ins across 7 calendar days, show an offer for the US$7 paid 7-day PDF/download. Users may save a maximum of 3 check-ins per calendar day toward the report. The 7-day PDF may include up to 21 saved check-ins. |
| US$19 thirty-day PDF/download | Later product with 30-day tracking/check-ins and no repeated actions within the plan. |
| Sales prompts / paid offers | **Sales prompts / paid 7-day report offer**After the user saves their first MoodFlip check-in, show a friendly message explaining that they can build a personalised 7-Day MoodFlip Report. Users may save a maximum of **3 MoodFlip check-ins per calendar day** toward their report. They may continue using the free MoodFlip tool more than 3 times per day, but only 3 saved check-ins per day count toward the paid report. From the **2nd saved calendar day onward**, show a daily reminder/popup explaining that the user is building a personalised 7-Day MoodFlip Report, available for **US$7** once the 7-day requirement is complete. This reminder should appear no more than once per day. The 7-day PDF becomes available after the user has saved check-ins across **7 calendar days**. The 7-day PDF may include up to **21 saved check-ins**. Once the 7-day requirement is reached, show the final purchase prompt for the **US$7 paid 7-day PDF/download**.  |
| AdSense | Site should be AdSense-ready, but approval and ranking cannot be guaranteed. |
| Email offers | Please include a **simple admin dashboard** where I can securely log in and; view registered users names,  their email addresses,  saved moods/check-ins,  purchase status (active when they bought the PDF already, inactive when they haven\`t yet), and  export users/emails to CSV.  I do not need a complex email campaign system at launch. |
| Affiliate links | Not required at launch. Earlier correspondence mentioned affiliate integration, but current requirement is to focus on MoodFlip’s own paid products and avoid third-party affiliate links. |
| Sales popups / paid offers | After 72 saved mood/check-in entries, show an offer for the US$7 paid 7-day PDF/download. Later, the same structure should support a 30-day offer when the 30-day product is introduced. |

# **10\. User Profiles, Email Capture and Data Storage**

Creating a profile is optional. The free basic tool must work without a profile. A profile is used for saving check-ins, creating personalized downloads and making future offers. 

A button needs to appear right under the 60 sec action; SAVE MY PROFILE. 

We need to keep track/store the user\`s login date and site visit number. The site should track anonymous repeat visits using browser storage/cookies where appropriate. When a visitor returns for the second time, show a pop-up inviting them to create a profile. When the visit number reaches 2 (meaning they visit the site for the 2nd time) the site pops up a pop-up window asking if the user wanted to create a profile which allows them to save the action prompts. Approved short consent wording:

*By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history so we can create and offer personalized downloads.*

The system should use the saved check-in count to trigger the 7-day paid PDF offer and should be ready to trigger a 30-day offer later when the 30-day product is added.

Profile data fields; 

- email,   
- selected moods and dates,   
- actions shown,   
- purchase status,   
- last activity date,   
- and check-in count.

Enable automatic 90-day deletion of inactive profiles. Every profile which has been inactive for at least 90 days will be automatically deleted. 

# **11\. Privacy, Consent and Automatic Deletion**

* Users must be told they can use the basic MoodFlip tool without creating a profile.  
* Profile creation must be voluntary and connected to saving check-ins and receiving personalised downloads/offers.  
* Automatic deletion requirement: inactive profiles and saved mood history should be deleted after 90 days of inactivity.  
* No complex manual user deletion dashboard is required at launch.  
* Developer should implement last\_active\_at or equivalent so inactivity can be calculated.

The privacy policy should be written carefully because selected moods are personal and wellbeing-related. The website should avoid collecting unnecessary data beyond the fields listed above.

# **12\. SEO, Google Setup and Traffic Growth**

The quote includes a strong SEO foundation. This should be treated as required, but no ranking guarantee should be accepted or expected.

| SEO item | Requirement |
| :---- | :---- |
| 20-30 SEO mood pages | Original, helpful pages targeting specific mood searches and linking back to the tool. |
| Metadata | Unique title and meta description for key pages. |
| Schema markup | Appropriate structured data where useful and safe. |
| Internal linking | Related mood pages and tool pages connected clearly. |
| XML sitemap | Created and submitted. |
| Google Search Console | Set up and connected to the domain. |
| Google Analytics | Set up to track usage, conversions and pages. |
| Indexing submission | Initial indexing request submitted after launch. |

# **13\. AdSense** 

* Developer should prepare the site for a future AdSense application.  
* AdSense approval is not guaranteed and should not be promised.  
* Ads should appear in Phase 2; the primary early monetisation should be email/profile capture and paid downloads.   
* The site should be designed with ad spaces from the beginning, my suggestion is on the top and on the bottom. AdSense ads should only be activated after the site is approved and ready.

# **14\. Technical Architecture and Hosting**

The developer proposed free platforms: Vercel for frontend, Render for backend/server logic, and Supabase for database/user data. This can work for launch, but the build should avoid unnecessary complexity where possible.

Technical confirmations:

* Updated offer/correspondence confirms a scalable Supabase \+ Vercel architecture. Render should only be used if genuinely needed; the free MoodFlip tool should not depend on a sleeping backend service.  
* Stripe payment gateway integration was confirmed in the Fiverr correspondence unless Joy later chooses another gateway.  
* Automatic PDF generation, download, and email delivery after successful payment were confirmed in the Fiverr correspondence.  
* Developer should provide;   
- hosting capacity estimates,   
- monitoring guidance,   
- upgrade path,   
- expected costs,   
- and graceful handling if paid/profile services experience issues.

| Platform | Proposed use | Requirement / concern |
| :---- | :---- | :---- |
| Vercel | Frontend / website hosting. | Good for static and fast public pages. Free tool should remain available even if backend has an issue. |
| Render | Backend / server logic. | Free tier may sleep or be slower. Avoid relying on it for critical payment/PDF user experience if possible. |
| Supabase | Database / users / saved moods. | Store only required profile, mood/action, purchase and activity data. Support 90-day deletion. **Supabase Free does not include automatic backups** This is important. Supabase Free includes the 500 MB database, 50,000 monthly active users, 5 GB egress, 1 GB storage and 500,000 Edge Function invocations, but its pricing table says automatic backups are **not included** on Free. Supabase Pro is US$25/month and includes 7-day backups.  Add: Since Supabase Free does not include automatic backups, please explain the backup plan while we are on the Free plan. At minimum, please provide a manual database/content export at launch and explain how Joy can export/backup mood data and user records.  |
| Namecheap domain | Domain registration. | Domain owned by Joy and connected to hosting. |
| Payment gateway | Paid PDF payment. | Must be confirmed: Stripe or other. Automatic delivery after payment required. |

# **15\. Security, Performance and Reliability**

| Area | Requirement |
| :---- | :---- |
| HTTPS/SSL | Required for the whole site. |
| Spam protection | Required for contact/profile forms. |
| Secure configuration | No exposed API keys. Environment variables handled securely. |
| User data security | Secure Supabase/Render setup and minimal data storage. |
| Core Web Vitals | Fast mobile performance and image optimisation. |
| Reliability | Free tool should still work even if profile/payment/PDF backend has an issue. |
| Capacity planning | Developer should explain free hosting limits and upgrade path when traffic grows. |
| Test environment | Required before public launch. |

# **16\. Design Direction, and  Animation and Popup Messages**

The design direction is based on the approved homepage mockup concept.

* Left side: strong black/dark background with readable mood selection tiles and family cards.  
* Right side: soft, uplifting sun/rising light design with calming pastel colours. This section is liked and should be preserved.  
* Mood family cards and specific feeling tiles should be visual, mobile-friendly and not overwhelming.  
* Remove bin/clear-selection feature from the main design.  
* Include lightweight animation, such as result card fade/slide/flip after clicking the mood change button.  
* Design must be clean, modern, professional and emotionally supportive.  
* The site must be optimized for mobile phones, tablets and desktop computers as well. 

Popup Messages displayed by the website;

### **1\. After first saved check-in**

**Your first MoodFlip check-in is saved.**  
You can save up to 3 check-ins per day. After 7 days, you’ll be able to download your personalised 7-Day MoodFlip Report.

### **2\. From the 2nd saved calendar day onward — once per day**

**You’re building your 7-Day MoodFlip Report.**  
Save up to 3 check-ins per day. Your personalised report will be available after 7 days for **US$7**.

### **3\. Progress message after saving a check-in**

**Saved.**  
Today’s check-ins: **\[1/3\]**  
7-Day Report progress: **Day \[X\] of 7**

### **4\. Daily save limit reached**

**You’ve saved today’s 3 check-ins.**  
You can still use the free MoodFlip tool. You can save more check-ins tomorrow.

### **5\. 7-day report ready**

**Your 7-Day MoodFlip Report is ready.**  
Download your personalised report with your saved moods, positive moods, 60-second actions, and mood pattern summary.  
**Download for US$7**

### **6\. Payment successful**

**Payment successful.**  
Your MoodFlip Report is ready to download. A copy has also been emailed to you.

### **7\. Payment successful but PDF/email issue**

**Payment received.**  
Your report is being prepared. If it does not arrive, you can download it from your profile or contact support.

### **8\. Profile invitation on 2nd site visit**

**Save your MoodFlip check-ins?**  
Create a free profile to save your moods, actions, and progress toward your 7-Day MoodFlip Report.

### **9\. Consent checkbox wording**

By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history so we can create and offer personalised downloads.

# **17\. Ownership, Handover and Intellectual Property**

* Joy must own the domain separately from the developer.  
* Developer must confirm full ownership of source code, design, written content, mood/action database/content and commercial rights after payment.  
* Developer must provide full source code, files, deployment details, documentation and account/access handover.  
* Developer should not reuse, resell, copy or publish the project or use it in a portfolio without permission.  
* Website should include copyright notice, e.g. © 2026 MoodFlip. All rights reserved.  
* Future brand protection may include trade mark registration if the project proves viable.

**17.1. Vercel Ownership Transfer** 

Yes, Vercel can transfer projects/ownership, but it usually works through teams/projects and roles. Vercel says a team owner can transfer ownership by adding another user with the Owner role, and Vercel also has project transfer options between teams.

After transfer Joy must confirm:

- you are Owner, not just “Member”;  
- the MoodFlip project is inside your own Vercel account/team;  
- DiditalWorkify is removed or reduced to temporary collaborator;

\- environment variables/settings are visible or documented.

**17.2. Supabase Ownership Transfer**

Supabase can transfer projects and organisation ownership, but it is not just “send to Gmail and one click” in every case. Supabase’s docs say project transfers happen between organisations, and ownership transfer involves inviting/promoting the other user as Owner before the old owner leaves.

Joy needs;

- her own Supabase account;  
- Joy  becomes Owner of the organisation/project;  
- the database, auth, storage, scheduled deletion job, API settings and billing/settings are all under your control;

\- DigitalWorkify remains only as a temporary support user if Joy allows it.

**17.3. Source Code Ownership Transfer**

If you use GitHub/GitLab, Joy also needs ownership of that repository,

# **18\. Maintenance and Future Updates**

Maintenance confirmation:

* Digital Workify confirmed 1 year of free website maintenance and support after launch.  
* He stated maintenance requests are usually completed within 48 hours, but in some cases may take up to 1 week. Joy is asking for more responsive live support, fixing high priority live bugs within 24 hrs, low priority live issues within 48 hrs – pls confirm possibility and price.   
* After the first free year, there is no fixed monthly commitment. Maintenance is optional and charged only in months when Joy needs updates/fixes/support, at US$50 for that month.

| Maintenance item | Clarify with developer |
| :---- | :---- |
| Monthly maintenance cost | Exact price after launch. US50 when needed. |
| Bug fixes | Whether included after launch and for how long. |
| Adding more actions | Cost to add 25 more actions per mood later. |
| 30-day PDF launch | Cost and timeframe if not included now. |
| Search Console issues | Whether he will monitor/fix indexing or technical SEO errors. |
| AdSense integration later | Whether adding AdSense code is included or separate. |
| Hosting upgrades | Cost to migrate/upgrade if free tiers become insufficient. |

# **19\. Developer Offer Review and Required Clarifications**

Accepted order:

* Accepted MoodFlip offer: A$395.69 including Fiverr service fees, 18 days delivery, accepted/paid on Fiverr on Jul 19\.  
* Digital Workify stated that he noted the requested updates and would incorporate the changes into the build, including mood tiles, 90-day cleanup, Stripe, PDF delivery and hosting details.  
* The technical details for payment gateway, hosting limits and related setup should be confirmed in the first couple of days of development.

Requirements below included;

| Included in quote | Status |
| :---- | :---- |
| Custom responsive MoodFlip site and core pages | Included. |
| 20-30 SEO mood pages and strong SEO foundation | Included. |
| Google Search Console, Analytics, sitemap and indexing submission | Included. |
| Mobile/tablet/desktop optimization and lightweight animations | Included. |
| Security best practices and staging environment | Included. |
| Source code, documentation and deployment handover | Included. |
| User registration, email capture, 7-day tracking, paid PDF, payment gateway and secure storage | Included. |
| 30-day readiness. Future-ready database for 30-day mood tracking and PDF reports. | Included.  |
| 10 rotating actions per mood at launch using local storage; launch content still needs to be supplied/loaded. | Included.  |
| 30+ actions per mood support later | Included.  |
| Automatic 90-day inactive profile deletion | Included.   |
| Automatic paid PDF delivery after payment | Included. |
| Maintenance price | 1 year free support; after that, US$50 only for any month when maintenance is needed, with no fixed monthly commitment. |

JK\>\> The Stripe/payment account must be owned by Joy. Payment API keys should be connected securely through environment variables. No customer payments should go through DigitalWorkify’s account.

JK\>\> Rule:

Users can use the free MoodFlip tool as often as they like, but profile users can save a maximum of **3 check-ins per calendar day** toward their paid report.

That results:

| Product | Rule | Maximum saved entries |
| ----- | ----- | ----- |
| 7-day PDF | up to 3 saved check-ins per day for 7 days | **21 entries** |
| 30-day PDF | up to 3 saved check-ins per day for 30 days | **90 entries** |

The 7-day PDF should be based on **7 calendar days**, not simply 7 saved entries.

Profile users may save a maximum of **3 MoodFlip check-ins per calendar day** toward their report. These can represent morning, afternoon and evening check-ins.

Users may still use the free MoodFlip tool more than 3 times per day, but only the first 3 saved check-ins per day should count toward the paid 7-day or 30-day report.

The 7-day paid PDF should include up to **21 saved check-ins**: selected moods, dates/times, positive target moods, actions shown, and a simple non-medical mood pattern summary.

The 30-day paid PDF should later support up to **90 saved check-ins**.

If a user tries to save more than 3 check-ins in one day, show a friendly message:  
“You’ve saved your 3 MoodFlip check-ins for today. You can still use the free tool, and you can save more check-ins tomorrow.”

# **20\. Migration** 

Digital Workify, check how much traffic the free hosting backend can take. The site needs to be prepared for migration when the user number is close to reaching maximum. 

* Developer correspondence says hosting guidance, monitoring and upgrade recommendations are included. This should include approximate user/traffic thresholds, which service would be upgraded first, and the expected first paid upgrade cost.  
* A separate future hosting upgrade quote for Vercel Pro/Supabase Pro was requested and should not be included in the initial project cost unless Joy approves it later.

# **21\. Test Mode / Maintenance**

Fixing bugs during Test Mode needs to be done within 2 working days. 

The live website\`s maintenance requires high priority bug fixing (like the website is not accessible, the payment gateway is not working etc.) within 1 working day, for low priority bug fixing more days are acceptable but they need to be less than 5 working day. 

# **22\. Live Launch / Handover**

The development is considered finished and ready to launch when all reported bugs are corrected. 

Digital Workify provides all files of the website to Joy, including;

- source code,   
- deployment access,   
- database access,   
- admin login,   
- documentation,   
- instructions for future updates.

# **MoodFlip – Response to Open Items**

*Prepared for Joy's review — replies to all items flagged in the Business Specification review (v1 & v2).*

## **1\. Hosting, Monitoring & Reliability**

| Open Item | Response / Confirmation |
| :---- | :---- |
| **Hosting capacity estimate** | Project runs on Vercel (Hobby/free plan) \+ Supabase (Free plan). Vercel free tier gives \~100 GB bandwidth and up to \~100K–1M function calls per month; Supabase free tier gives 500 MB database, 50,000 monthly active users, and 5 GB bandwidth. This comfortably covers MoodFlip at launch and through early growth. |
| **Monitoring guidance** | Uptime and errors are tracked through the Vercel and Supabase dashboards (build/runtime logs, DB usage, bandwidth usage). These will be checked periodically and Joy will be informed if usage approaches free-tier limits. JK\>\> Please confirm the monitoring schedule. I suggest: weekly checks during the first month after launch, then monthly checks while the site is stable, plus immediate checking if there is a payment, PDF delivery, profile, or website-access issue. |
| **Upgrade path** | If traffic/usage nears the free-tier limits, the project will move to Vercel Pro and/or Supabase Pro. Nothing will be upgraded — and no cost incurred — without Joy's prior approval. |
| **Expected costs** | No hosting cost currently — both Vercel and Supabase are on their free plans. If/when an upgrade is needed later, a separate quote (Vercel Pro ≈ $20/month, Supabase Pro ≈ $25/month) will be shared for approval before anything is charged. JK\>\> Would there be any costs involved on your side, DigitalWorkify? JK\>\> ChatGPT warns me; \`One important point: because MoodFlip is intended to sell paid PDFs, **Vercel Hobby may not be the right long-term plan for a commercial site**. It may be okay for testing/staging, but once MoodFlip is actively selling, Vercel Pro is probably the cleaner option.\` \- at launch, for the first month I suggest to go with the Hobby plan.  |
| **Graceful handling of paid/profile service issues** | If a paid (PDF/payment) or profile-related service is temporarily unavailable, the app will show a clear retry/error message to the user instead of failing silently, and the action can be retried once the service is back. JK\>\> Payment succeeds but PDF fails / If payment succeeds but PDF generation or email delivery fails, the purchase must still be recorded. The user must not lose access to the paid product. There should be a way to regenerate/resend the PDF or provide a secure download link from the admin side. |

*Note: Vercel's free Hobby plan is intended for non-commercial use. Since MoodFlip processes payments (paid PDF reports), this should be reviewed — it may be worth confirming with Joy whether to move the payment-related part to Vercel Pro to stay compliant, even though the rest of the app can remain on the free tier.  JK\>\> See above.*

## **2\. Capacity Planning**

| Open Item | Response / Confirmation |
| :---- | :---- |
| **Capacity planning** | Free-tier limits: Vercel — 100 GB bandwidth/month; Supabase — 500 MB database \+ 50,000 monthly active users \+ 5 GB bandwidth/month. The app will be monitored as user numbers grow, and migration to paid tiers will be prepared in advance so there's no disruption if the free limits are approached. |

## **3\. Ownership & Support SLA**

| Open Item | Response / Confirmation |
| :---- | :---- |
| **Full ownership after payment** | Confirmed — after final payment, Joy will have full ownership of the source code, design, written content, mood/action database & content, and all commercial rights. JK\>\> What final payment do you mean? I already paid for the development.  |
| **Maintenance price** | No additional cost — maintenance is included. |
| **Faster live-bug SLA (24 hrs high priority / 48 hrs low priority)** | Confirmed possible, and included at no extra cost — high-priority live bugs will be fixed within 24 hours, low-priority issues within 48 hours. JK\>\> Awesome\! Thank you very much\! |

## **4\. Feature & Cost Checklist**

| Open Item | Response / Confirmation |
| :---- | :---- |
| **Bug fixes** | Included after launch at no additional cost, as part of the free maintenance included above. |
| **Adding more actions (+25 per mood)** | To be confirmed — exact cost for adding 25 more actions per mood will be shared separately once scoped.  JK\>\> Adding more actions means technical loading/importing of content supplied by Joy. |
| **30-day PDF launch** | To be confirmed — cost/timeframe if this is not part of the initial launch will be shared separately. JK\>\> Your accepted quote says “future-ready database for 30-day mood tracking and PDF reports” and “mood system supporting up to 30 actions per mood.”  / Please confirm exactly what this means. Is the current paid order only building the structure for a future 30-day product, or are you also building the full 30-day PDF product now so it can simply be activated later? If activating the 30-day paid PDF later will cost extra, please tell me the estimated fixed price and timeframe now. |
| **Search Console issues** | To be confirmed — whether ongoing monitoring/fixing of indexing or technical SEO errors is included or a separate add-on. JK\>\> **Google Search Console after launch:** Initial Search Console setup, sitemap submission and indexing request are included. DigitalWorkify should confirm whether checking and fixing post-launch Search Console errors during the first year is included in the free support, or only handled when specifically requested. |
| **AdSense integration later** | To be confirmed — whether adding AdSense code later is included or a separate task. JK\>\> **AdSense:** DitialWorkify will prepare the site to be AdSense-ready at launch, including suitable structure, required pages, original content, and space for ads. AdSense approval is not guaranteed. After Google approves the site, developer should confirm whether adding the AdSense code is included under the 1-year free support or treated as a separate update. |
| **Hosting upgrades** | No cost while on free tier. If/when Vercel Pro or Supabase Pro is needed, cost will be Vercel Pro ≈ $20/month and/or Supabase Pro ≈ $25/month — shared as a separate quote, not part of the initial project cost, and only actioned with Joy's approval. |
| **Google Analytics conversion tracking** | Google Analytics should track important conversion events:  mood tool use,  profile creation,  7 saved check-ins,  paid PDF checkout started,  paid PDF purchase completed,  and PDF delivery/download. |

## **5\. Product Confirmations**

| Open Item | Response / Confirmation |
| :---- | :---- |
| **30-day readiness (mood tracking \+ PDF reports)** | Confirmed — database is being built future-ready to support 30-day mood tracking and PDF report generation. JK\>\> Please provide an estimated fixed price and timeframe to activate the 30-day paid PDF product later, assuming the website/database is already built future-ready. |
| **10 rotating actions per mood at launch** | Confirmed — 10 rotating actions per mood at launch, using local storage. Launch content itself (the actual action text/data) still needs to be supplied or loaded by Joy/content owner. |
| **30+ actions per mood support later** | Confirmed — the system will support expanding to 30+ actions per mood in a future update. |
| **Automatic 90-day inactive profile deletion** | Confirmed — inactive profiles will be automatically deleted after 90 days. |
| **Automatic paid PDF delivery after payment** | Confirmed — PDF report will be automatically delivered to the user right after successful payment. |
| **Admin dashboard resend/download function** | Admin dashboard should show paid PDF purchases and include a way to confirm payment status and resend/re-download a user’s paid PDF if needed. |

*Items marked "To be confirmed" need a specific number/timeframe before this goes back to Joy — happy to fill these in once decided.*

