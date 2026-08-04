// lib/blogData.ts — Default blog posts & shared types

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  emoji: string;
  published: boolean;
  coverColor: string;
};

export const defaultBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-flip-your-mood-in-60-seconds',
    title: 'How to Flip Your Mood in 60 Seconds',
    excerpt: 'Science-backed micro-actions that rewire your emotional state — no therapy required.',
    content: `## The 60-Second Mindset Reset

Research in cognitive neuroscience shows that the brain can begin shifting emotional state within *60 seconds* of a targeted intervention. Here's how MoodFlip's micro-action system works:

### 1. Pattern Interruption
When you feel anxious or sad, your brain locks into a predictable loop. A micro-action — like naming 3 things you can touch right now — *interrupts* that loop at the neural level.

### 2. Somatic Breathing
Box breathing (4-4-4-4) activates the parasympathetic nervous system, reducing cortisol within 60 seconds and signaling calm to every cell in your body.

### 3. Gratitude Grounding
Naming one thing you are grateful for right now redirects the prefrontal cortex away from threat-detection mode into appreciation mode — a fundamentally different neurological state.

### Try It Now
1. Take 4 slow breaths (4 seconds in, hold 4, out 4, hold 4)
2. Name 3 things you can physically feel right now
3. Say one thing you appreciate about today

That's it. 60 seconds. Your emotional state has already shifted.`,
    category: 'Mindset Science',
    author: 'MoodFlip Team',
    date: 'August 1, 2026',
    readTime: '4 min read',
    emoji: '⚡',
    published: true,
    coverColor: 'from-violet-500 to-purple-700',
  },
  {
    id: '2',
    slug: 'understanding-emotional-triggers',
    title: 'Understanding Your Emotional Triggers',
    excerpt: 'Learn to identify what triggers negative emotions and build resilience before the spiral starts.',
    content: `## Know Your Triggers, Master Your Reactions

An emotional trigger is any stimulus — a word, tone, situation, or memory — that causes an automatic emotional response. Understanding your personal triggers is the first step to emotional mastery.

### Common Emotional Triggers
- **Criticism or rejection** → Feelings of shame or unworthiness
- **Uncertainty or change** → Anxiety and loss of control
- **Conflict** → Anger, fear, or freeze response
- **Perceived abandonment** → Deep loneliness or panic

### The STOP Technique
When you notice a strong emotional reaction:

1. **S**top what you're doing
2. **T**ake a slow breath
3. **O**bserve what you're feeling without judgment
4. **P**roceed intentionally

### Building a Trigger Journal
Keep a simple log: *what happened → what I felt → what story I told myself*. Over 7 days, patterns emerge that give you enormous power over your own reactions.`,
    category: 'Emotional Awareness',
    author: 'MoodFlip Team',
    date: 'July 25, 2026',
    readTime: '5 min read',
    emoji: '🧠',
    published: true,
    coverColor: 'from-blue-500 to-cyan-600',
  },
  {
    id: '3',
    slug: '7-day-mindset-reset-guide',
    title: 'The Complete 7-Day Mindset Reset Guide',
    excerpt: 'A structured week-by-week guide to rewiring your thought patterns for lasting emotional wellbeing.',
    content: `## Your 7-Day Mindset Transformation

This structured plan is designed to build new neural pathways — one day at a time. No prior experience needed.

### Day 1: Awareness
Notice every time you feel a strong emotion today. Don't judge it. Just notice it and name it ("I feel anxious").

### Day 2: Breathing
Practice box breathing for 5 minutes each morning. Set a phone alarm labeled "🌬️ Breath Reset."

### Day 3: Gratitude Activation
Write 3 specific things you're grateful for (not generic — *specific*). Instead of "health," write "I could walk outside today and feel the sun."

### Day 4: Cognitive Reframe
Pick one negative thought from yesterday. Ask: *"What else could be true about this situation?"* Write at least 3 alternative perspectives.

### Day 5: Body Check-in
Three times today, scan your body from head to toe. Where do you feel tension? Breathe into that spot consciously.

### Day 6: Connection
Reach out to one person you care about. A simple message: "Hey, thinking of you." Notice how giving shifts your state.

### Day 7: Integration
Review your week. What changed? What's one habit you want to keep? Commit to it in writing.`,
    category: 'Mindset Plans',
    author: 'MoodFlip Team',
    date: 'July 18, 2026',
    readTime: '6 min read',
    emoji: '📅',
    published: true,
    coverColor: 'from-emerald-500 to-teal-600',
  },
  {
    id: '4',
    slug: 'anxiety-relief-without-medication',
    title: 'Anxiety Relief Techniques That Actually Work',
    excerpt: 'Evidence-based, medication-free strategies for managing anxiety in daily life.',
    content: `## Natural Anxiety Relief That Works

Anxiety affects over 284 million people worldwide. While professional help is always recommended for clinical anxiety, these evidence-based techniques can significantly reduce everyday anxiety.

### Progressive Muscle Relaxation (PMR)
Tense each muscle group for 5 seconds, then release. Start from your feet and work upward. This teaches your nervous system the contrast between tension and relaxation.

### 5-4-3-2-1 Grounding
Name: 5 things you see, 4 things you can touch, 3 things you hear, 2 things you smell, 1 thing you taste. This returns your nervous system to the present moment.

### Cold Water Technique
Splash cold water on your face or hold ice cubes. This triggers the mammalian dive reflex, immediately reducing heart rate.

### Expressive Writing
Write about your anxiety for 15 minutes without stopping. Research shows this reduces amygdala activation and gives the prefrontal cortex control back.

*Note: This content is for educational purposes only. Please consult a mental health professional for clinical anxiety.*`,
    category: 'Anxiety & Stress',
    author: 'MoodFlip Team',
    date: 'July 10, 2026',
    readTime: '5 min read',
    emoji: '🫀',
    published: true,
    coverColor: 'from-rose-500 to-pink-600',
  },
];

export type LegalPage = {
  id: string;
  title: string;
  slug: string;
  content: string;
  lastUpdated: string;
};

export const defaultLegalPages: LegalPage[] = [
  {
    id: 'terms',
    title: 'Terms of Service',
    slug: 'terms',
    lastUpdated: 'August 1, 2026',
    content: `## Terms of Service

Welcome to MoodFlip. By using our website and services, you agree to these terms.

### 1. Use of Service
MoodFlip is provided for personal self-reflection and emotional wellness purposes only. You agree not to misuse the platform, reverse-engineer our proprietary mood-flipping tools, or use our content for commercial purposes without written permission.

### 2. User Accounts
When you create an account, you are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. You must notify us immediately of any unauthorized use.

### 3. Intellectual Property
All design assets, typography, icons, mood-flip exercises, action texts, and written content are protected by copyright and intellectual property laws. Reproduction without permission is prohibited.

### 4. Disclaimer of Medical Advice
MoodFlip is a mindset utility tool and is **not** a substitute for professional mental health care, therapy, or medical advice. Always consult a qualified mental health professional for clinical concerns.

### 5. Limitation of Liability
To the fullest extent permitted by law, MoodFlip shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.

### 6. Changes to Terms
We may update these terms periodically. Continued use of MoodFlip after changes constitutes your acceptance of the new terms.

### Contact
For questions about these terms, email: **legal@moodflip.coach**`,
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    slug: 'privacy',
    lastUpdated: 'August 1, 2026',
    content: `## Privacy Policy

At MoodFlip, we respect your privacy. We store as little data as possible and operate with transparency.

### 1. Data We Collect
- **Account data**: Email address and encrypted password (when you register)
- **Usage data**: Anonymous page view counts for analytics
- **Check-in data**: Your mood check-ins, stored locally in your browser

### 2. How We Use Data
- To provide and improve MoodFlip services
- To send you email reminders (only if you opt in)
- To analyze aggregate usage patterns (anonymized)

### 3. Data Storage & Security
Your interactive check-ins are stored locally in your browser by default. Optional account sign-ups store only your email address and encrypted check-in preferences on our secure servers.

### 4. 90-Day Automatic Cleanup
Any account data or check-in records left inactive for 90 consecutive days are automatically purged from our systems.

### 5. Third-Party Services
We may use trusted third-party services (e.g., Stripe for payments, Google Analytics for traffic analysis). Each has its own privacy policy.

### 6. Your Rights
You have the right to access, correct, or delete your personal data at any time via your Profile → Privacy & Data settings.

### 7. Contact
For privacy concerns, email: **privacy@moodflip.coach**`,
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer',
    slug: 'disclaimer',
    lastUpdated: 'August 1, 2026',
    content: `## Disclaimer

### Not Medical Advice
The content provided on MoodFlip — including all mood-flip exercises, 60-second actions, mindset plans, blog posts, and resources — is for **educational and self-improvement purposes only**.

MoodFlip is **not** a medical service, therapy platform, or licensed mental health provider. Nothing on this site should be interpreted as professional psychological, psychiatric, or medical advice.

### Consult a Professional
If you are experiencing severe depression, anxiety, thoughts of self-harm, or any mental health crisis, please contact a qualified mental health professional or emergency services immediately.

**Crisis Resources:**
- **National Crisis Line (US):** 988
- **Crisis Text Line:** Text HOME to 741741
- **International Association for Suicide Prevention:** https://www.iasp.info/resources/Crisis_Centres/

### Accuracy of Information
While we strive to provide accurate, science-backed content, MoodFlip makes no representations or warranties about the completeness or accuracy of any information provided.

### Affiliate & Advertising Disclosure
MoodFlip may display Google AdSense advertisements or affiliate links. These help support our free tools. We only partner with services we believe add value to our users.

### Contact
For questions: **support@moodflip.coach**`,
  },
];
