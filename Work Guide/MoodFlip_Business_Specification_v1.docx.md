**BUSINESS SPECIFICATION**

**MoodFlip \- Self-Help Utility Website**

Prepared by Joy | Working specification for developer quote, build scope, launch plan, and content requirements

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# **CONTENTS** {#contents}

[CONTENTS	1](#contents)

[1\. Project Overview	2](#1.-project-overview)

[2\. Business Objective and Target Users	2](#2.-business-objective-and-target-users)

[3\. Product Scope and Launch Strategy	2](#3.-product-scope-and-launch-strategy)

[4\. Domain, Brand and Positioning	3](#4.-domain,-brand-and-positioning)

[5\. Website Pages and User Flow	3](#5.-website-pages-and-user-flow)

[6\. Mood Selection Design	3](#6.-mood-selection-design)

[7\. Mood Pairings and Action Content	4](#7.-mood-pairings-and-action-content)

[8\. Rotating 60-Second Actions	4](#8.-rotating-60-second-actions)

[9\. Paid Products and Monetisation	4](#9.-paid-products-and-monetisation)

[10\. User Profiles, Email Capture and Data Storage	5](#10.-user-profiles,-email-capture-and-data-storage)

[11\. Privacy, Consent and Automatic Deletion	5](#11.-privacy,-consent-and-automatic-deletion)

[12\. SEO, Google Setup and Traffic Growth	5](#12.-seo,-google-setup-and-traffic-growth)

[13\. AdSense	6](#13.-adsense)

[14\. Technical Architecture and Hosting	6](#14.-technical-architecture-and-hosting)

[15\. Security, Performance and Reliability	6](#15.-security,-performance-and-reliability)

[16\. Design Direction and Animation	6](#16.-design-direction-and-animation)

[17\. Ownership, Handover and Intellectual Property	7](#17.-ownership,-handover-and-intellectual-property)

[18\. Maintenance and Future Updates	7](#18.-maintenance-and-future-updates)

[19\. Developer Offer Review and Required Clarifications	7](#19.-developer-offer-review-and-required-clarifications)

[20\. Migration	8](#20.-migration)

[21\. Test Mode / Maintenance	8](#21.-test-mode-/-maintenance)

[22\. Live Launch / Handover	8](#22.-live-launch-/-handover)

# **1\. Project Overview** {#1.-project-overview}

MoodFlip is a simple self-reflection utility website. Users choose a negative mood from fixed visual options and receive a positive direction plus a short, practical 60-second action. The website is not therapy, not mental health treatment, and not medical advice.

* Core concept: negative mood \-\> positive target state \-\> 60-second action.  
* Primary use case: a user wants a quick, gentle emotional shift without typing free text or reading long content.  
* The first version should be useful, fast, mobile-friendly and able to support future paid downloads.

# **2\. Business Objective and Target Users** {#2.-business-objective-and-target-users}

The business objective is to create a utility site that can generate traffic, collect email leads with consent, sell personalised 7-day and 30-day MoodFlip downloads, and also display Google AdSense ads.

| Target user | Need | MoodFlip response |
| :---- | :---- | :---- |
| General adult visitor | Quick support when feeling low, angry, anxious, lonely or stuck. | Clickable mood choice and one 60-second action. |
| Returning visitor | Variety and repeat usefulness. | Rotating actions so the same mood does not always show the same action. |
| Profile user | Save check-ins and receive personalised downloads/offers. | Email-based profile and saved mood/action history. |
| Paid user | A structured short plan. | 7-day paid PDF at launch or early phase; 30-day paid PDF later. |

When someone visits the site for the 2nd time the site needs to offer creating a profile, in a pop-up window. 

# **3\. Product Scope and Launch Strategy** {#3.-product-scope-and-launch-strategy}

The preferred strategy is a practical staged launch, while ensuring the technical structure supports the full future product from the beginning.

| Phase | Included | Timing / purpose |
| :---- | :---- | :---- |
| **Phase 1** \- Free website launch | Free MoodFlip tool,  28 mood pairings, 10 rotating actions per mood,  core pages,  SEO mood pages,  Google setup,  Option to save profile and/or provide e-mail address. Provide test environment. | Launch the free MoodFlip website.  Test the core functions in test environment. Submit the site to Google Search Console, submit the XML sitemap, and request Google indexing for the main pages. |
| **Phase 1** \- 7-day paid download | Profile/email capture,  saved mood check-ins,  paid 7-day PDF generation,  payment gateway,  automatic PDF delivery. | Early monetisation and email/list building. |
| **Phase 2** \- 30-day paid download | 30-day mood check-ins,  30-day PDF/download product,  30+ actions per mood support. AdSense activated | 2 months after launch or earlier if traffic/sales justify it. |

Important build requirement: even if Phase 2 is launched later, the database/content structure must be ready for at least 30 actions per mood and 30-day paid downloads without rebuilding the website.

The site needs to be designed well to have space for AdSense ads. My suggestion is to put them on the top and on the bottom. 

# **4\. Domain, Brand and Positioning** {#4.-domain,-brand-and-positioning}

Domain chosen: **moodflip.coach** on NameCheap. 

# **5\. Website Pages and User Flow** {#5.-website-pages-and-user-flow}

The developer quote includes the core pages required. These should be considered mandatory.	

| Page | Requirement |
| :---- | :---- |
| Homepage / Mood Tool | Clickable mood family cards, exact feeling tiles, positive target mood and rotating 60-second action. |
| About | Explain MoodFlip as a self-reflection utility site. Clearly state not therapy, not medical advice and not for emergencies/crisis support. |
| Contact | Basic contact page or form with spam protection. |
| Privacy Policy | Explain profile data, mood/action storage, purchase history and automatic 90-day deletion. |
| SEO mood pages | 20-30 original mood pages for search traffic, internally linked to the tool. |

# **6\. Mood Selection Design** {#6.-mood-selection-design}

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

# **7\. Mood Pairings and Action Content** {#7.-mood-pairings-and-action-content}

The current working content file contains 28 bad mood / good mood pairings, with 10 rotating actions per mood. The site should show a 60-second action.

| Requirement | Status |
| :---- | :---- |
| 28 bad mood / good mood pairings | Required at launch. |
| 10 rotating 60-second actions per mood | Required at launch. |
| 30 actions per mood support | Required in the structure/database for Phase 2, 2 months after launch. |

# **8\. Rotating 60-Second Actions** {#8.-rotating-60-second-actions}

Repeat visitors should not always see the same action for the same mood. The site should rotate among available actions.

* At launch: each mood should have 10 available actions.  
* Future-ready: each mood should support 30 or more actions without rebuilding the site.  
* Suggested simple implementation: store the last action shown per mood in the visitor browser/local storage or user profile, then show a different or next action next time.  
* For profile users, action history may be stored with the user record so paid downloads can avoid repeats.  
* For paid 7-day and 30-day downloads, the PDF should not repeat the same action within that paid plan.

# **9\. Paid Products and Monetisation** {#9.-paid-products-and-monetisation}

| Product / monetisation method | Requirement |
| :---- | :---- |
| Free tool | Available without profile creation. |
| US$7 seven-day PDF/download | Personalised 7-day MoodFlip plan based on saved moods/check-ins. Automatic payment and delivery in e-mail. |
| US$19 thirty-day PDF/download | Later product with 30-day tracking/check-ins and no repeated actions within the plan. |
| AdSense | Site should be AdSense-ready, but approval and ranking cannot be guaranteed. |
| Email offers | Please include a **simple admin dashboard** where I can securely log in and; view registered users names,  their email addresses,  saved moods/check-ins,  purchase status (active when they bought the PDF already, inactive when they haven\`t yet), and  export users/emails to CSV.  I do not need a complex email campaign system at launch. |

# **10\. User Profiles, Email Capture and Data Storage** {#10.-user-profiles,-email-capture-and-data-storage}

Creating a profile is optional. The free basic tool must work without a profile. A profile is used for saving check-ins, creating personalised downloads and making future offers. 

A button needs to appear right under the 60 sec action; SAVE MY PROFILE. 

We need to keep track/store the user\`s login date and site visit number. The site should track anonymous repeat visits using browser storage/cookies where appropriate. When a visitor returns for the second time, show a pop-up inviting them to create a profile.When the visit number reaches 2 (meaning they visit the site for the 2nd time) the site pops up a pop-up window asking if the user wanted to create a profile which allows them to save the action prompts. Approved short consent wording:

*By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history so we can create and offer personalized downloads.*

Enable automatic 90-day deletion of inactive profiles. Every profile which has been inactive for at least 90 days will be automatically deleted. 

# **11\. Privacy, Consent and Automatic Deletion** {#11.-privacy,-consent-and-automatic-deletion}

* Users must be told they can use the basic MoodFlip tool without creating a profile.  
* Profile creation must be voluntary and connected to saving check-ins and receiving personalised downloads/offers.  
* Automatic deletion requirement: inactive profiles and saved mood history should be deleted after 90 days of inactivity.  
* No complex manual user deletion dashboard is required at launch.  
* Developer should implement last\_active\_at or equivalent so inactivity can be calculated.

The privacy policy should be written carefully because selected moods are personal and wellbeing-related. The website should avoid collecting unnecessary data beyond the fields listed above.

# **12\. SEO, Google Setup and Traffic Growth** {#12.-seo,-google-setup-and-traffic-growth}

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

# **13\. AdSense**  {#13.-adsense}

* Developer should prepare the site for a future AdSense application.  
* AdSense approval is not guaranteed and should not be promised.  
* Ads should appear in Phase 2; the primary early monetisation should be email/profile capture and paid downloads.   
* The site should be designed with ad spaces from the beginning, my suggestion is on the top and on the bottom. AdSense ads should only be activated after the site is approved and ready.

# **14\. Technical Architecture and Hosting** {#14.-technical-architecture-and-hosting}

The developer proposed free platforms: Vercel for frontend, Render for backend/server logic, and Supabase for database/user data. This can work for launch, but the build should avoid unnecessary complexity where possible.

| Platform | Proposed use | Requirement / concern |
| :---- | :---- | :---- |
| Vercel | Frontend / website hosting. | Good for static and fast public pages. Free tool should remain available even if backend has an issue. |
| Render | Backend / server logic. | Free tier may sleep or be slower. Avoid relying on it for critical payment/PDF user experience if possible. |
| Supabase | Database / users / saved moods. | Store only required profile, mood/action, purchase and activity data. Support 90-day deletion. |
| Namecheap domain | Domain registration. | Domain owned by Joy and connected to hosting. |
| Payment gateway | Paid PDF payment. | Must be confirmed: Stripe or other. Automatic delivery after payment required. |

# **15\. Security, Performance and Reliability** {#15.-security,-performance-and-reliability}

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

# **16\. Design Direction and Animation** {#16.-design-direction-and-animation}

The design direction is based on the approved homepage mockup concept.

* Left side: strong black/dark background with readable mood selection tiles and family cards.  
* Right side: soft, uplifting sun/rising light design with calming pastel colours. This section is liked and should be preserved.  
* Mood family cards and specific feeling tiles should be visual, mobile-friendly and not overwhelming.  
* Remove bin/clear-selection feature from the main design.  
* Include lightweight animation, such as result card fade/slide/flip after clicking the mood change button.  
* Design must be clean, modern, professional and emotionally supportive.  
* The site must be optimized for mobile phones, tablets and desktop computers as well. 

# **17\. Ownership, Handover and Intellectual Property** {#17.-ownership,-handover-and-intellectual-property}

* Joy must own the domain separately from the developer.  
* Developer must confirm full ownership of source code, design, written content, mood/action database/content and commercial rights after payment.  
* Developer must provide full source code, files, deployment details, documentation and account/access handover.  
* Developer should not reuse, resell, copy or publish the project or use it in a portfolio without permission.  
* Website should include copyright notice, e.g. © 2026 MoodFlip. All rights reserved.  
* Future brand protection may include trade mark registration if the project proves viable.

# **18\. Maintenance and Future Updates** {#18.-maintenance-and-future-updates}

Maintenance pricing is not yet clear and should be confirmed before acceptance.

| Maintenance item | Clarify with developer |
| :---- | :---- |
| Monthly maintenance cost | Exact price after launch. |
| Bug fixes | Whether included after launch and for how long. |
| Adding more actions | Cost to add 20 more actions per mood later. |
| 30-day PDF launch | Cost and timeframe if not included now. |
| Search Console issues | Whether he will monitor/fix indexing or technical SEO errors. |
| AdSense integration later | Whether adding AdSense code is included or separate. |
| Hosting upgrades | Cost to migrate/upgrade if free tiers become insufficient. |

# **19\. Developer Offer Review and Required Clarifications** {#19.-developer-offer-review-and-required-clarifications}

Requirements below included;

| Included in quote | Status |
| :---- | :---- |
| Custom responsive MoodFlip site and core pages | Included. |
| 20-30 SEO mood pages and strong SEO foundation | Included. |
| Google Search Console, Analytics, sitemap and indexing submission | Included. |
| Mobile/tablet/desktop optimisation and lightweight animations | Included. |
| Security best practices and staging environment | Included. |
| Source code, documentation and deployment handover | Included. |
| User registration, email capture, 7-day tracking, paid PDF, payment gateway and secure storage | Included according to offer, but confirm because it is labelled optional premium upgrade. |
| 30-day readiness | Not explicit \- add in writing. |
| 10 rotating actions per mood at launch | Not explicit \- add in writing. |
| 30+ actions per mood support later | Not explicit \- add in writing. |
| Automatic 90-day inactive profile deletion | Not explicit \- add in writing. |
| Automatic paid PDF delivery after payment | Not explicit \- add in writing. |
| Maintenance price | Missing \- ask before accepting. |

# **20\. Migration**  {#20.-migration}

Digital Workify, check how much traffic the free hosting backend can take. The site needs to be prepared for migration when the user number is close to reaching maximum. 

# **21\. Test Mode / Maintenance** {#21.-test-mode-/-maintenance}

Fixing bugs during Test Mode needs to be done within 2 working days. 

The live website\`s maintenance requires high priority bug fixing (like the website is not accessible, the payment gateway is not working etc.) within 1 working day, for low priority bug fixing more days are acceptable but they need to be less than 5 working day. 

# **22\. Live Launch / Handover** {#22.-live-launch-/-handover}

The development is considered finished and ready to launch when all reported bugs are corrected. 

Digital Workify provides all files of the website to Joy, including;

- source code,   
- deployment access,   
- database access,   
- admin login,   
- documentation,   
- instructions for future updates.