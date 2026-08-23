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
  featuredImage?: string;
};

export type LegalPage = {
  id: string;
  slug: string;
  title: string;
  lastUpdated: string;
  content: string;
};

export const defaultBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-flip-your-mood-in-60-seconds',
    title: 'How to Flip Your Mood in 60 Seconds',
    excerpt: 'Simple 60-second micro-actions that can help you shift how you feel — one small step at a time.',
    content: `<h2>The 60-Second Mood Shift</h2>
<p>MoodFlip is a self-reflection tool. It is <strong>not therapy</strong> and not medical advice. It offers simple 60-second actions designed to help you pause, reflect, and choose a calmer next step.</p>

<img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80" alt="Mindfulness Reflection" style="width:100%; border-radius:16px; margin:20px 0;" />

<h3>1. Pattern Interruption</h3>
<p>When you feel overwhelmed or sad, it can help to gently shift your attention. A simple action — like naming 3 things you can touch right now — gives your mind somewhere calm to go.</p>

<h3>2. Slow Breathing</h3>
<p>Box breathing (4 counts in, hold 4, out 4, hold 4) is a widely used technique to help you feel calmer. Try it for 60 seconds and notice how your body responds.</p>

<h3>3. Gratitude Grounding</h3>
<p>Naming one small thing you appreciate right now gently redirects your attention from worry to the present moment — a simple shift that many people find helpful.</p>

<blockquote style="border-left: 4px solid #7464AC; padding-left: 16px; font-style: italic; color: #5B5278; margin: 20px 0;">"Small, consistent actions build emotional resilience over time."</blockquote>

<h3>Try It Now</h3>
<ul>
  <li><strong>Step 1:</strong> Take 4 slow breaths (4 seconds in, hold 4, out 4, hold 4)</li>
  <li><strong>Step 2:</strong> Name 3 things you can physically feel right now</li>
  <li><strong>Step 3:</strong> Say one thing you appreciate about today</li>
</ul>
<p>That's it. 60 seconds. A small, gentle reset.</p>`,
    category: 'Self-Reflection Tips',
    author: 'MoodFlip Team',
    date: 'August 1, 2026',
    readTime: '4 min read',
    emoji: '⚡',
    published: true,
    coverColor: 'from-violet-500 to-purple-700',
    featuredImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '2',
    slug: 'understanding-emotional-triggers',
    title: 'Understanding Your Emotional Triggers',
    excerpt: 'Learn to identify what triggers negative emotions and build resilience before the spiral starts.',
    content: `<h2>Know Your Triggers, Master Your Reactions</h2>
<p>An emotional trigger is any stimulus — a word, tone, situation, or memory — that causes an automatic emotional response. Understanding your personal triggers is the first step to emotional mastery.</p>

<img src="https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=1200&q=80" alt="Emotional Trigger Journaling" style="width:100%; border-radius:16px; margin:20px 0;" />

<h3>Common Emotional Triggers</h3>
<ul>
  <li><strong>Criticism or rejection</strong> → Feelings of shame or unworthiness</li>
  <li><strong>Uncertainty or change</strong> → Anxiety and loss of control</li>
  <li><strong>Conflict</strong> → Anger, fear, or freeze response</li>
  <li><strong>Perceived abandonment</strong> → Deep loneliness or panic</li>
</ul>

<h3>The STOP Technique</h3>
<p>When you notice a strong emotional reaction:</p>
<ol>
  <li><strong>S</strong>top what you're doing</li>
  <li><strong>T</strong>ake a slow breath</li>
  <li><strong>O</strong>bserve what you're feeling without judgment</li>
  <li><strong>P</strong>roceed intentionally</li>
</ol>

<blockquote style="border-left: 4px solid #7464AC; padding-left: 16px; font-style: italic; color: #5B5278; margin: 20px 0;">"Between stimulus and response there is a space. In that space is our power to choose our response." — Viktor Frankl</blockquote>

<h3>Building a Trigger Journal</h3>
<p>Keep a simple log: <em>what happened → what I felt → what story I told myself</em>. Over 7 days, patterns emerge that give you enormous power over your own reactions.</p>`,
    category: 'Emotional Awareness',
    author: 'MoodFlip Team',
    date: 'July 25, 2026',
    readTime: '5 min read',
    emoji: '🧠',
    published: true,
    coverColor: 'from-blue-500 to-cyan-600',
    featuredImage: 'https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '3',
    slug: '7-day-mood-reset-guide',
    title: 'A Simple 7-Day Mood Reset Guide',
    excerpt: 'A practical week-by-week guide to building new emotional habits for everyday wellbeing.',
    content: `<h2>Your 7-Day Mood Reset</h2>
<p>This simple plan is designed to build new emotional habits — one small step at a time. No prior experience needed. This is a self-reflection guide, not a medical or therapeutic programme.</p>

<img src="https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=80" alt="Morning Reset Routine" style="width:100%; border-radius:16px; margin:20px 0;" />

<h3>Day 1: Awareness</h3>
<p>Notice every time you feel a strong emotion today. Don't judge it. Just notice it and name it (<em>"I feel anxious"</em>).</p>

<h3>Day 2: Breathing</h3>
<p>Practice box breathing for 5 minutes each morning. Set a phone alarm labeled "🌬️ Breath Reset."</p>

<h3>Day 3: Gratitude Activation</h3>
<p>Write 3 specific things you're grateful for (not generic — <em>specific</em>). Instead of "health," write "I could walk outside today and feel the sun."</p>

<h3>Day 4: Reframing</h3>
<p>Identify one negative thought today and reframe it. Change "I can't handle this" to "This is tough, but I am learning how to handle it."</p>

<h3>Day 5: Physical Shift</h3>
<p>Use movement to change your mood. A 10-minute walk, stretching, or dancing to one favorite song releases endorphins immediately.</p>

<h3>Day 6: Digital Detox</h3>
<p>Spend 2 hours without checking social media or news. Notice the mental space that opens up.</p>

<h3>Day 7: Integration</h3>
<p>Reflect on the week. Which action felt best? Make that your daily 60-second habit going forward.</p>`,
    category: 'Mindset Plans',
    author: 'MoodFlip Team',
    date: 'July 18, 2026',
    readTime: '6 min read',
    emoji: '📅',
    published: true,
    coverColor: 'from-emerald-500 to-teal-600',
    featuredImage: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '4',
    slug: 'calming-self-regulation-techniques',
    title: 'Simple Techniques to Help You Feel Calmer',
    excerpt: 'Practical, gentle self-regulation techniques to help you pause and feel more grounded in daily life.',
    content: `<h2>Practical Ways to Help Yourself Feel Calmer</h2>
<p>These are simple self-regulation techniques that many people find helpful when they feel overwhelmed, nervous, or tense. MoodFlip is a self-reflection tool — not a medical service. If you are struggling with anxiety, please speak to a qualified professional.</p>

<img src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80" alt="Calming Nature Meditation" style="width:100%; border-radius:16px; margin:20px 0;" />

<h3>1. The 5-4-3-2-1 Sensory Grounding Technique</h3>
<p>Look around you and identify:</p>
<ul>
  <li><strong>5 things</strong> you can see</li>
  <li><strong>4 things</strong> you can physically touch</li>
  <li><strong>3 things</strong> you can hear</li>
  <li><strong>2 things</strong> you can smell</li>
  <li><strong>1 thing</strong> you can taste</li>
</ul>

<h3>2. The Double Inhale and Long Exhale</h3>
<p>Take two quick inhales through the nose, then one long slow exhale through the mouth. Many people find this helps them feel calmer within a minute.</p>

<h3>3. Gentle Muscle Release</h3>
<p>Gently tense your shoulders, hands, and jaw for 5 seconds, then slowly release. Notice how the tension softens as you let go.</p>`,
    category: 'Calm & Grounding',
    author: 'MoodFlip Team',
    date: 'July 10, 2026',
    readTime: '5 min read',
    emoji: '🧘',
    published: true,
    coverColor: 'from-rose-500 to-pink-600',
    featuredImage: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '5',
    slug: 'why-small-mood-actions-help',
    title: 'Why Small Actions Can Help Shift Your Mood',
    excerpt: 'How simple 60-second mood actions can help you feel more present, calm, and in control — one small step at a time.',
    content: `<h2>Why Small Actions Help</h2>
<p>When emotions feel big, small actions can help you find your footing again. MoodFlip uses simple 60-second prompts to gently guide you back toward the feelings you want. This is a self-reflection tool, not a medical or psychological service.</p>

<img src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80" alt="Small Mood Shifts" style="width:100%; border-radius:16px; margin:20px 0;" />

<h3>Why Small Actions Work Better Than Big Plans</h3>
<p>When you're already feeling overwhelmed, a 60-second action is far easier to start than a 60-minute programme. Small, achievable actions build a sense of progress and calm — one moment at a time.</p>

<h3>What People Notice:</h3>
<ul>
  <li><strong>Less tension:</strong> Controlled breathing helps many people feel physically calmer.</li>
  <li><strong>Sense of progress:</strong> Completing a small task can restore a feeling of agency.</li>
  <li><strong>Grounded presence:</strong> Simple grounding exercises help bring attention back to right now.</li>
</ul>`,
    category: 'How MoodFlip Helps',
    author: 'MoodFlip Team',
    date: 'July 4, 2026',
    readTime: '6 min read',
    emoji: '🔬',
    published: true,
    coverColor: 'from-purple-600 to-indigo-800',
    featuredImage: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
  },

  {
    id: '6',
    slug: 'overcoming-burnout-micro-recovery-rituals',
    title: 'Overcoming Burnout with Daily Micro-Recovery Rituals',
    excerpt: 'How micro-breaks throughout your workday preserve mental battery and prevent exhaustion.',
    content: `<h2>Beating Workplace Burnout</h2>
<p>Burnout isn’t caused by working hard — it is caused by working without recovery. Incorporating micro-recovery periods protects your energy and focus.</p>

<img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80" alt="Workplace Rest and Recovery" style="width:100%; border-radius:16px; margin:20px 0;" />

<h3>3 Micro-Recovery Rituals</h3>
<ol>
  <li><strong>The 90/5 Rule:</strong> For every 90 minutes of focused work, step away from screens for 5 minutes.</li>
  <li><strong>Eye Rest (20-20-20):</strong> Every 20 minutes, look at an object 20 feet away for 20 seconds to relieve optic strain.</li>
  <li><strong>Postural Flip:</strong> Stand up, roll your shoulders back 3 times, and take a deep breath before opening your next email.</li>
</ol>`,
    category: 'Work & Energy',
    author: 'MoodFlip Team',
    date: 'June 28, 2026',
    readTime: '4 min read',
    emoji: '🔋',
    published: true,
    coverColor: 'from-amber-500 to-orange-600',
    featuredImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '7',
    slug: 'art-of-self-compassion-in-difficult-moments',
    title: 'The Art of Self-Compassion in Difficult Moments',
    excerpt: 'Stop harsh self-talk and treat yourself with the kindness you offer your closest friends.',
    content: `<h2>Radical Self-Compassion</h2>
<p>When things go wrong, our internal voice is often harsher than anyone else's. Dr. Kristin Neff’s research shows self-compassion boosts motivation far more than self-criticism.</p>

<img src="https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1200&q=80" alt="Self Compassion and Kindness" style="width:100%; border-radius:16px; margin:20px 0;" />

<h3>3 Components of Self-Compassion</h3>
<ul>
  <li><strong>Self-Kindness:</strong> Being understanding towards ourselves when we suffer or feel inadequate.</li>
  <li><strong>Common Humanity:</strong> Recognizing that suffering and personal failure are part of the shared human experience.</li>
  <li><strong>Mindfulness:</strong> Holding our painful thoughts and emotions in balanced awareness rather than over-identifying with them.</li>
</ul>`,
    category: 'Emotional Awareness',
    author: 'Sarah Jenkins',
    date: 'June 20, 2026',
    readTime: '5 min read',
    emoji: '💚',
    published: true,
    coverColor: 'from-teal-500 to-emerald-700',
    featuredImage: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '8',
    slug: 'how-journaling-rewires-your-emotional-brain',
    title: 'How 5-Minute Expressive Writing Rewires Your Brain',
    excerpt: 'Putting feelings into words lowers amygdala reactivity and creates psychological distance.',
    content: `<h2>The Power of Expressive Writing</h2>
<p>FMRIs reveal that naming your emotions ("affect labeling") immediately reduces activity in the amygdala, the brain's alarm system.</p>

<img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80" alt="Journaling and Writing" style="width:100%; border-radius:16px; margin:20px 0;" />

<h3>How to Practice 5-Minute Writing</h3>
<p>Set a timer for 5 minutes. Write without editing or worrying about grammar. Focus on:</p>

<ul>
  <li>What emotion is most present right now?</li>
  <li>What event or thought triggered this emotion?</li>
  <li>What support or action would feel good in this moment?</li>
</ul>`,
    category: 'Journaling & Habits',
    author: 'MoodFlip Team',
    date: 'June 12, 2026',
    readTime: '4 min read',
    emoji: '✍️',
    published: true,
    coverColor: 'from-cyan-600 to-blue-800',
    featuredImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '9',
    slug: 'building-resilience-against-daily-stressors',
    title: 'Building Unshakable Resilience Against Daily Stressors',
    excerpt: 'Transform stress into strength by reframing challenges as opportunities for growth.',
    content: `<h2>Transforming Daily Stress</h2>
<p>Resilience isn’t about never feeling stressed; it’s about how quickly you bounce back when stress hits.</p>

<img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" alt="Resilience and Strength" style="width:100%; border-radius:16px; margin:20px 0;" />

<h3>The Resilience Triad</h3>
<ol>
  <li><strong>Control:</strong> Focus only on what is within your direct control right now.</li>
  <li><strong>Challenge:</strong> View difficulties as problems to solve rather than threats to suffer.</li>
  <li><strong>Commitment:</strong> Stay committed to your personal values even when emotions fluctuate.</li>
</ol>`,
    category: 'Mindset Science',
    author: 'MoodFlip Team',
    date: 'June 05, 2026',
    readTime: '5 min read',
    emoji: '🛡️',
    published: true,
    coverColor: 'from-indigo-600 to-violet-900',
    featuredImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '10',
    slug: 'evening-shutdown-routine-for-better-sleep',
    title: 'The Ultimate 10-Minute Evening Mindset Shutdown',
    excerpt: 'Quiet a racing mind before bed and prepare your body for deep, restorative sleep.',
    content: `<h2>Sleep & Mental Reset</h2>
<p>Sleep is the foundation of emotional regulation. A simple 10-minute shutdown routine cues your brain that the workday is officially over.</p>

<img src="https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=1200&q=80" alt="Peaceful Night Sleep" style="width:100%; border-radius:16px; margin:20px 0;" />

<h3>Your Evening Shutdown Checklist</h3>
<ul>
  <li><strong>Brain Dump:</strong> Write down tomorrow’s top 3 tasks to clear working memory.</li>
  <li><strong>Digital Sunset:</strong> Turn off bright screens or activate warm night mode 30 minutes before sleep.</li>
  <li><strong>Body Scan:</strong> Lie down and consciously release tension from toes to forehead.</li>
</ul>`,
    category: 'Sleep & Wellbeing',
    author: 'MoodFlip Team',
    date: 'May 30, 2026',
    readTime: '4 min read',
    emoji: '🌙',
    published: true,
    coverColor: 'from-purple-700 to-indigo-950',
    featuredImage: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=1200&q=80',
  },
];

export const defaultLegalPages: LegalPage[] = [
  {
    id: 'terms',
    slug: 'terms',
    title: 'Terms of Service',
    lastUpdated: 'May 15, 2026',
    content: `<h2>1. Acceptance of Terms</h2>
<p>By accessing or using MoodFlip ("Service"), operated at moodflip.coach, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>

<h2>2. Nature of Service (Not Medical Advice)</h2>
<p>MoodFlip is a self-reflection and emotional awareness utility. <strong>MoodFlip is NOT a medical, therapeutic, or healthcare provider.</strong> Content, micro-actions, and assessments provided through MoodFlip are for educational and self-reflection purposes only and do not constitute professional diagnosis or treatment.</p>

<h2>3. User Accounts & Privacy</h2>
<p>You are responsible for maintaining the confidentiality of your account credentials. All personal data is handled according to our Privacy Policy.</p>

<h2>4. Modifications</h2>
<p>We reserve the right to modify or discontinue any part of the Service at any time with or without notice.</p>`,
  },
  {
    id: 'privacy',
    slug: 'privacy',
    title: 'Privacy Policy',
    lastUpdated: 'May 15, 2026',
    content: `<h2>1. Data We Collect</h2>
<p>MoodFlip prioritizes your privacy. We collect minimal information necessary to deliver self-reflection tools:</p>
<ul>
  <li>Account info (email and display name)</li>
  <li>Check-in logs and selected mood categories</li>
  <li>Anonymous usage telemetry</li>
</ul>

<h2>2. How We Use Data</h2>
<p>Your data is strictly used to display your personal insights and 7-day progress logs. We do <strong>never sell your personal data</strong> to third parties.</p>

<h2>3. Storage & Security</h2>
<p>All user entries are encrypted at rest and in transit using modern SSL/TLS standards.</p>`,
  },
  {
    id: 'disclaimer',
    slug: 'disclaimer',
    title: 'Medical & General Disclaimer',
    lastUpdated: 'May 15, 2026',
    content: `<h2>Important Medical Disclaimer</h2>
<p>MoodFlip is designed solely as a self-reflection tool. It is <strong>NOT a replacement for mental health treatment, therapy, or emergency medical care</strong>.</p>
<p>If you are experiencing severe depression, suicidal thoughts, or a mental health crisis, please immediately contact emergency services or a crisis helpline:</p>
<ul>
  <li><strong>US National Crisis Helpline:</strong> Call or text 988</li>
  <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
  <li><strong>International Emergency:</strong> Contact your local emergency hospital</li>
</ul>`,
  },
  {
    id: 'refund',
    slug: 'refund',
    title: 'Refund & Cancellation Policy',
    lastUpdated: 'May 15, 2026',
    content: `<h2>30-Day Money-Back Guarantee</h2>
<p>We want you to feel completely satisfied with your MoodFlip experience. We offer a <strong>100% 30-day money-back guarantee</strong> for all 7-Day & 30-Day Premium Plans.</p>

<h2>How to Request a Refund</h2>
<p>To request a full refund, simply contact our support team at <strong>support@moodflip.coach</strong> within 30 days of purchase with your order email or transaction receipt. Refunds are processed back to your original payment method within 3-5 business days.</p>`,
  },
];
