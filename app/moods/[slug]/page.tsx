import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ── #32: 30 SEO Mood Pages — Original, helpful content internally linked to the mood tool ──
const MOOD_PAGES: Record<string, {
  title: string;
  metaDesc: string;
  heading: string;
  intro: string;
  tips: string[];
  toolLink: string;
}> = {
  'feeling-sad': {
    title: 'Feeling Sad? A 60-Second Way to Shift Your Mood | MoodFlip',
    metaDesc: 'Feeling sad and not sure why? Try our free 60-second mood-shift technique to move from sadness toward calm and acceptance — no therapy required.',
    heading: 'Feeling Sad? Here\'s What You Can Do Right Now',
    intro: 'Sadness is a natural emotion, but it doesn\'t have to last all day. When you notice a heavy, low feeling settling in, a small intentional action can create a real shift. MoodFlip was built for exactly this moment.',
    tips: ['Name the feeling exactly — "I feel sad because…" — labelling helps reduce its intensity.', 'Do one physical thing: step outside, splash cold water on your face, or stretch your arms wide.', 'Use MoodFlip\'s free mood tool below to find your specific feeling and get a personalised 60-second action.'],
    toolLink: '/#hero-section',
  },
  'feeling-anxious': {
    title: 'Feeling Anxious? Try This 60-Second Calm Technique | MoodFlip',
    metaDesc: 'Anxiety can feel overwhelming. MoodFlip\'s free mood tool gives you a focused 60-second action to move from anxious to calm — instantly, no login needed.',
    heading: 'Feeling Anxious? One Minute Can Make a Real Difference',
    intro: 'Anxiety often shows up as racing thoughts, a tight chest, or a restless feeling you can\'t shake. The good news is that your nervous system can reset faster than you think — with the right micro-action.',
    tips: ['Try 4-7-8 breathing: inhale 4 counts, hold 7, exhale 8. Repeat 3 times.', 'Ground yourself: name 5 things you can see, 4 you can touch, 3 you can hear.', 'Select "Fearful" or "Bad" in MoodFlip below to find your exact anxious feeling and get a calming action.'],
    toolLink: '/#hero-section',
  },
  'feeling-angry': {
    title: 'Feeling Angry? Shift Your Mood in 60 Seconds | MoodFlip',
    metaDesc: 'Anger is energy — and it can be redirected. Use MoodFlip\'s free mood tool to move from anger to clarity with a simple 60-second self-reflection technique.',
    heading: 'Feeling Angry? Here\'s How to Redirect That Energy',
    intro: 'Anger is one of the most powerful emotions we experience. It signals that something feels wrong or unfair. Rather than suppressing it, MoodFlip helps you acknowledge it and guide it somewhere useful.',
    tips: ['Pause before reacting: count slowly to 10 while taking deep breaths.', 'Move your body: a brisk 60-second walk or 10 jumping jacks can reduce intensity.', 'Select "Angry" on MoodFlip below to identify your exact feeling and get a personalised redirect action.'],
    toolLink: '/#hero-section',
  },
  'feeling-overwhelmed': {
    title: 'Feeling Overwhelmed? Reset Your Mind in 60 Seconds | MoodFlip',
    metaDesc: 'Too much on your plate? MoodFlip helps you break through the overwhelm with one simple, focused 60-second mindset shift — free and no sign-up needed.',
    heading: 'Feeling Overwhelmed? Start With Just One Minute',
    intro: 'Overwhelm happens when our brain processes too many demands at once. The antidote isn\'t doing more — it\'s pausing, focusing on one thing, and letting the rest wait. MoodFlip gives you a structured way to do exactly that.',
    tips: ['Write down the 3 most urgent things and cross out everything else for the next hour.', 'Take one deliberate slow breath — exhale twice as long as you inhale.', 'Select "Bad" or "Fearful" on MoodFlip below and find your specific overwhelm feeling.'],
    toolLink: '/#hero-section',
  },
  'feeling-stressed': {
    title: 'Feeling Stressed? A 60-Second Stress Shift Technique | MoodFlip',
    metaDesc: 'Stress building up? MoodFlip\'s free tool gives you a focused 60-second action to move from stressed and tense to calm and centred — instantly.',
    heading: 'Feeling Stressed? Your Body Needs a Reset, Not More Willpower',
    intro: 'Stress is your body\'s response to pressure. When it builds up, willpower alone rarely helps. What works is a targeted physical or mental micro-action that interrupts the stress cycle.',
    tips: ['Roll your shoulders back and down — tension loves to hide there.', 'Drink a glass of water slowly, paying attention to the sensation.', 'Use MoodFlip below to pinpoint your stress type and get the right 60-second reset.'],
    toolLink: '/#hero-section',
  },
  'feeling-lonely': {
    title: 'Feeling Lonely? Small Shifts That Actually Help | MoodFlip',
    metaDesc: 'Loneliness is more common than you think. MoodFlip offers a free, judgment-free space to acknowledge your feeling and take one small step toward connection.',
    heading: 'Feeling Lonely? You\'re Not Alone in Feeling This Way',
    intro: 'Loneliness can strike even when you\'re surrounded by people. It\'s a signal that something about your sense of connection feels off. Acknowledging it — rather than avoiding it — is the first step.',
    tips: ['Reach out to one person today — even a short message counts.', 'Do something kind for yourself: make a warm drink, go for a walk, listen to music you love.', 'Use MoodFlip below to find a self-compassion action matched to your exact feeling.'],
    toolLink: '/#hero-section',
  },
  'feeling-frustrated': {
    title: 'Feeling Frustrated? A 60-Second Shift Technique | MoodFlip',
    metaDesc: 'Frustration is a signal, not a sentence. MoodFlip\'s free mood tool helps you acknowledge your frustration and redirect it with a quick, focused action.',
    heading: 'Feeling Frustrated? Redirect It in Under a Minute',
    intro: 'Frustration usually means something you care about isn\'t working the way you expected. It\'s a healthy signal — and it\'s one of the easiest emotions to redirect when you know how.',
    tips: ['Step away from the source of frustration for just 2 minutes.', 'Say out loud what\'s frustrating you — naming it reduces its grip.', 'Select "Angry" on MoodFlip to find the frustration-specific action that fits your situation.'],
    toolLink: '/#hero-section',
  },
  'feeling-hopeless': {
    title: 'Feeling Hopeless? A Gentle Way to Start Shifting | MoodFlip',
    metaDesc: 'Hopelessness can feel permanent, but it isn\'t. MoodFlip offers a gentle, free tool to help you take one small step toward a different feeling — no pressure.',
    heading: 'Feeling Hopeless? One Small Step Is All You Need Right Now',
    intro: 'Hopelessness is one of the heaviest feelings. It makes everything feel permanent and fixed. But feelings — even the heaviest ones — can shift. MoodFlip was built to help you take the smallest possible step toward that shift.',
    tips: ['Remind yourself: "This feeling is temporary — feelings always change."', 'Do one tiny thing that usually brings a small sense of satisfaction.', 'Use MoodFlip\'s Sad mood path below to find an action matched to your exact experience.'],
    toolLink: '/#hero-section',
  },
  'feeling-guilty': {
    title: 'Feeling Guilty? How to Process It and Move Forward | MoodFlip',
    metaDesc: 'Guilt can be useful — but dwelling in it isn\'t. MoodFlip helps you acknowledge guilt and take one constructive action to move through it.',
    heading: 'Feeling Guilty? Here\'s How to Process It Constructively',
    intro: 'Guilt is a signal that something you did conflicts with your values. Healthy guilt motivates repair — but excessive guilt keeps you stuck. The goal is to acknowledge it, act if you can, and release what you can\'t change.',
    tips: ['Ask yourself: "Is there one thing I can do to make this right?"', 'If yes, do it. If no, practise saying: "I made a mistake. I am still worthy of kindness."', 'Select "Disgusted" on MoodFlip — guilt is often found in this mood family.'],
    toolLink: '/#hero-section',
  },
  'feeling-lost': {
    title: 'Feeling Lost? Find Your Direction With One Small Action | MoodFlip',
    metaDesc: 'Feeling lost or directionless? MoodFlip\'s free mood tool helps you reconnect with yourself through a simple, focused 60-second reflection.',
    heading: 'Feeling Lost? Direction Starts With Noticing Where You Are',
    intro: 'Feeling lost doesn\'t mean you\'re broken — it means you\'ve outgrown your current direction or clarity hasn\'t arrived yet. The best next step isn\'t a life plan — it\'s one small, grounded action.',
    tips: ['Write down 3 things that feel genuinely true about you right now.', 'Ask yourself: "What would feel like a small step forward, just for today?"', 'Use MoodFlip below to identify your specific feeling and get a personalised action.'],
    toolLink: '/#hero-section',
  },
  'feeling-unmotivated': {
    title: 'Feeling Unmotivated? A 60-Second Way to Spark Energy | MoodFlip',
    metaDesc: 'Lost your motivation? MoodFlip gives you a free, targeted 60-second action to move from apathetic and flat to engaged and energised.',
    heading: 'Feeling Unmotivated? Motivation Follows Action — Not the Other Way Around',
    intro: 'Waiting to feel motivated before starting is one of the most common traps. The reality is that action creates motivation — not the reverse. MoodFlip helps you take the tiniest first action.',
    tips: ['Set a timer for 5 minutes and do just the very first step of something.', 'Change your physical environment: move to a different room, go outside briefly.', 'Select "Bad" on MoodFlip below — Unmotivated and Apathetic are in this mood family.'],
    toolLink: '/#hero-section',
  },
  'feeling-nervous': {
    title: 'Feeling Nervous? Calm Your Nerves in 60 Seconds | MoodFlip',
    metaDesc: 'Nerves before something important? MoodFlip helps you channel nervous energy into focused calm with a quick, effective 60-second technique.',
    heading: 'Feeling Nervous? Channel That Energy Into Focus',
    intro: 'Nervousness and excitement feel almost identical in the body. The difference is the story you tell yourself. MoodFlip helps you reframe your nervous energy into purposeful readiness.',
    tips: ['Try power posture: stand tall, shoulders back, chin level — for 60 seconds.', 'Remind yourself of a time you got through something difficult successfully.', 'Select "Fearful" on MoodFlip to find the right calming action for your specific type of nerves.'],
    toolLink: '/#hero-section',
  },
  'feeling-insecure': {
    title: 'Feeling Insecure? Build Confidence With One Small Step | MoodFlip',
    metaDesc: 'Insecurity affects everyone. MoodFlip\'s free mood tool helps you acknowledge your insecurity and take one confidence-building action right now.',
    heading: 'Feeling Insecure? You\'re More Capable Than You Think',
    intro: 'Insecurity often shows up when we compare our inside experience to other people\'s outside presentation. It\'s one of the most universal feelings — and one of the most responsive to a targeted self-compassion action.',
    tips: ['Write down 3 things you have successfully done in the past 7 days.', 'Say your own name and one genuine compliment about yourself out loud.', 'Use MoodFlip\'s "Fearful" or "Sad" mood path to find your insecurity-specific action.'],
    toolLink: '/#hero-section',
  },
  'feeling-disappointed': {
    title: 'Feeling Disappointed? How to Process It and Move On | MoodFlip',
    metaDesc: 'Disappointment stings — especially when you had high hopes. MoodFlip helps you process it and take one small step toward acceptance and forward momentum.',
    heading: 'Feeling Disappointed? Acknowledge It, Then Take One Step',
    intro: 'Disappointment is the gap between expectation and reality. It\'s one of the most honest emotions — it shows you what you genuinely cared about. MoodFlip helps you honour it and find a path forward.',
    tips: ['Let yourself feel it without immediately trying to fix it — 60 seconds of honest acknowledgement.', 'Ask: "What can I take from this experience?"', 'Select "Sad" on MoodFlip to find a disappointment-specific mood shift action.'],
    toolLink: '/#hero-section',
  },
  'feeling-empty': {
    title: 'Feeling Empty? Small Steps Back to Feeling Like Yourself | MoodFlip',
    metaDesc: 'Emotional emptiness is real. MoodFlip offers a gentle, free space to acknowledge what you\'re feeling and take one small step toward reconnecting with yourself.',
    heading: 'Feeling Empty? You Don\'t Need to Fix Everything — Just One Step',
    intro: 'Emotional emptiness can come after a period of stress, loss, or simply running on empty for too long. It doesn\'t mean something is permanently wrong — it\'s your mind asking for rest and reconnection.',
    tips: ['Do one thing purely for enjoyment today — no productivity attached.', 'Spend 10 minutes in nature or near a window with natural light.', 'Use MoodFlip\'s Sad mood family to find the right gentle action for your feeling.'],
    toolLink: '/#hero-section',
  },
  'feeling-tired': {
    title: 'Feeling Tired and Drained? A 60-Second Energy Reset | MoodFlip',
    metaDesc: 'Tired beyond just needing sleep? MoodFlip helps you identify whether it\'s physical, emotional, or mental tiredness and take the right restorative action.',
    heading: 'Feeling Tired? Identify What Kind — and Reset in 60 Seconds',
    intro: 'Tiredness isn\'t always about sleep. Emotional fatigue, decision exhaustion, and social drain are just as real — and each needs a different kind of rest. MoodFlip helps you identify and address your specific type.',
    tips: ['Ask: "Am I physically tired, emotionally drained, or mentally overloaded?"', 'For emotional or mental tiredness: do one thing that requires zero effort and gives pure pleasure.', 'Select "Bad" on MoodFlip to find tiredness and low-energy mood actions.'],
    toolLink: '/#hero-section',
  },
  'flip-your-mood': {
    title: 'Flip Your Mood in 60 Seconds | The MoodFlip Tool',
    metaDesc: 'The original mood-flip technique: select your current feeling, choose your target mood, and get one 60-second action. Free, instant, no login needed.',
    heading: 'Flip Your Mood — The 60-Second Mindset Shift Tool',
    intro: 'MoodFlip is a simple, free self-reflection tool built around one idea: you can move from any negative mood toward a more positive one with one small, well-chosen action. No therapy. No questionnaires. Just 60 seconds.',
    tips: ['Choose your current mood family (Sad, Angry, Fearful, Disgusted, Bad).', 'Select the specific feeling that matches what you\'re experiencing right now.', 'Press Flip Your Mood — and follow the 60-second action you receive.'],
    toolLink: '/#hero-section',
  },
  'mood-shift-technique': {
    title: 'The 60-Second Mood Shift Technique | MoodFlip',
    metaDesc: 'Learn how MoodFlip\'s mood shift technique works: 3-layer emotion selection, personalised 60-second actions, and action rotation for repeat visits.',
    heading: 'How the 60-Second Mood Shift Technique Works',
    intro: 'MoodFlip uses a structured emotion-wheel approach to help you identify exactly what you\'re feeling — and then match it to a specific, effective 60-second action that targets that precise emotional state.',
    tips: ['Step 1: Choose your main mood family from 5 options (Sad, Fearful, Angry, Disgusted, Bad).', 'Step 2: Pick the feeling card closest to your experience.', 'Step 3: Select the chip that matches most precisely, then flip your mood.'],
    toolLink: '/#hero-section',
  },
  'how-to-feel-better': {
    title: 'How to Feel Better Right Now — MoodFlip\'s 60-Second Method',
    metaDesc: 'Looking for a quick way to feel better? MoodFlip\'s free tool gives you a personalised 60-second action based on your exact current feeling — no login, no waiting.',
    heading: 'How to Feel Better Right Now — One Minute at a Time',
    intro: 'Searching for how to feel better is the first step — and you\'re already here. MoodFlip was built for exactly this moment: when you know something feels off and you want to do something about it right now.',
    tips: ['You don\'t need to know why you feel bad — just identify the closest feeling name.', 'One 60-second action won\'t solve everything, but it will create a small, real shift.', 'Use the mood tool below to get your personalised action immediately.'],
    toolLink: '/#hero-section',
  },
  '60-second-mood-reset': {
    title: '60-Second Mood Reset — Free Self-Reflection Tool | MoodFlip',
    metaDesc: 'Reset your mood in 60 seconds with MoodFlip\'s free emotion-wheel based tool. Select your feeling, get your action, feel the shift.',
    heading: 'The 60-Second Mood Reset — Fast, Free, and Surprisingly Effective',
    intro: 'A 60-second mood reset sounds almost too simple to work — but the science of micro-interventions shows that small, targeted actions can interrupt negative emotional cycles. MoodFlip makes it easy to do exactly that.',
    tips: ['The tool works because it\'s specific: your action is matched to your exact feeling, not a generic tip.', 'Action rotation means you\'ll get a different technique each visit — building a broader toolkit over time.', 'Try it now — select your mood below and reset in the next 60 seconds.'],
    toolLink: '/#hero-section',
  },
  'feeling-jealous': {
    title: 'Feeling Jealous? What It Means and What to Do | MoodFlip',
    metaDesc: 'Jealousy tells you what you want. MoodFlip helps you acknowledge it without shame and redirect that energy toward something constructive.',
    heading: 'Feeling Jealous? Use It as a Compass, Not a Weapon',
    intro: 'Jealousy is a messenger — it points to something you genuinely desire. The problem is when it turns inward as shame or outward as resentment. MoodFlip helps you hear the message without getting stuck in the feeling.',
    tips: ['Ask: "What does this jealousy tell me I actually want?"', 'Write it down without judgment.', 'Use MoodFlip\'s Disgusted or Angry mood path to find the right redirect action.'],
    toolLink: '/#hero-section',
  },
  'feeling-ashamed': {
    title: 'Feeling Ashamed? How to Break Free With Self-Compassion | MoodFlip',
    metaDesc: 'Shame can be paralysing. MoodFlip offers a gentle, non-judgmental space to acknowledge shame and take one small self-compassion action.',
    heading: 'Feeling Ashamed? Self-Compassion Is the Antidote',
    intro: 'Shame says "I am bad." Guilt says "I did something bad." The distinction matters enormously — and so does the approach. MoodFlip helps you identify shame without intensifying it, and find a compassionate next step.',
    tips: ['Imagine how you would speak to a close friend who felt this way — then say that to yourself.', 'Remind yourself: "I am more than my worst moments."', 'Select "Disgusted" on MoodFlip and choose the shame-adjacent feeling that fits.'],
    toolLink: '/#hero-section',
  },
  'feeling-bored': {
    title: 'Feeling Bored? Spark Curiosity and Energy in 60 Seconds | MoodFlip',
    metaDesc: 'Boredom is a signal that you need stimulation. MoodFlip\'s free tool helps you identify your specific type of boredom and take one energising action.',
    heading: 'Feeling Bored? Your Brain Is Asking for Something New',
    intro: 'Boredom isn\'t a personality flaw — it\'s your mind signalling that it needs engagement or novelty. MoodFlip helps you respond to that signal with one purposeful action rather than reaching for distraction.',
    tips: ['Learn one new small thing: look up something you\'ve always wondered about.', 'Change your environment — even moving to a different room can reset your mental state.', 'Select "Bad" on MoodFlip — Bored and Unfocused are in this mood family.'],
    toolLink: '/#hero-section',
  },
  'feeling-numb': {
    title: 'Feeling Numb? How to Gently Reconnect With Your Emotions | MoodFlip',
    metaDesc: 'Emotional numbness is your mind\'s protective response. MoodFlip offers a gentle way to start reconnecting — one small, safe action at a time.',
    heading: 'Feeling Numb? Reconnect Gently, at Your Own Pace',
    intro: 'Emotional numbness often follows an extended period of stress, loss, or simply too much for too long. It\'s a protective mechanism — and you can begin to move through it gradually without forcing anything.',
    tips: ['Start small: notice one physical sensation (a texture, a temperature, a smell).', 'Do something you used to enjoy — even if you can\'t feel it fully yet.', 'Select "Sad" or "Bad" on MoodFlip to find a gentle, grounding action for numbness.'],
    toolLink: '/#hero-section',
  },
  'feeling-irritated': {
    title: 'Feeling Irritated? De-escalate in 60 Seconds | MoodFlip',
    metaDesc: 'Irritation building up? MoodFlip helps you identify the source and take one targeted action to de-escalate before it becomes something bigger.',
    heading: 'Feeling Irritated? Small Irritations Deserve Small Responses',
    intro: 'Irritation is often a signal that a need isn\'t being met — for space, for rest, for respect, or for a moment of quiet. MoodFlip helps you identify what\'s underneath the irritation and respond to it directly.',
    tips: ['Ask: "What need do I have right now that isn\'t being met?"', 'Take 60 seconds away from the source of irritation before responding.', 'Select "Angry" on MoodFlip — Irritated and Annoyed are in this mood family.'],
    toolLink: '/#hero-section',
  },
  'feeling-rejected': {
    title: 'Feeling Rejected? How to Process It and Recover | MoodFlip',
    metaDesc: 'Rejection hurts — but it doesn\'t define you. MoodFlip helps you process the feeling and take one self-affirming action to rebuild your sense of worth.',
    heading: 'Feeling Rejected? Your Worth Is Not Determined by Others\' Choices',
    intro: 'Rejection activates some of the same neural pathways as physical pain — which is why it hurts so much. MoodFlip helps you acknowledge the pain honestly and then redirect your focus toward your own inherent value.',
    tips: ['Acknowledge the feeling: "I feel hurt and rejected right now. That\'s valid."', 'Remind yourself of 3 relationships or areas of life where you do feel accepted.', 'Select "Sad" on MoodFlip and choose Rejected as your specific feeling.'],
    toolLink: '/#hero-section',
  },
  'feeling-confused': {
    title: 'Feeling Confused? Clarity Often Comes With One Small Step | MoodFlip',
    metaDesc: 'Confusion and mental fog can be overwhelming. MoodFlip helps you cut through the noise with one focused action to bring more clarity.',
    heading: 'Feeling Confused? Clarity Rarely Arrives All at Once',
    intro: 'Mental confusion is often a sign that you\'re trying to process too many things at once. The antidote isn\'t more thinking — it\'s deliberate simplification and one small, grounding action.',
    tips: ['Write your confusion down: "I am confused about… because…" — externalising helps.', 'Identify the single most important question you need an answer to.', 'Select "Bad" or "Fearful" on MoodFlip — confused and overwhelmed feelings live here.'],
    toolLink: '/#hero-section',
  },
  'feeling-restless': {
    title: 'Feeling Restless? Channel That Energy in 60 Seconds | MoodFlip',
    metaDesc: 'Restlessness is energy looking for a direction. MoodFlip helps you channel it purposefully with a targeted 60-second action instead of letting it spiral.',
    heading: 'Feeling Restless? Channel the Energy, Don\'t Fight It',
    intro: 'Restlessness is potential energy in search of an outlet. Fighting it rarely works — but redirecting it purposefully does. MoodFlip helps you find the right channel for your specific restless feeling.',
    tips: ['Move your body first: 30 seconds of movement (jumping jacks, a brisk walk) can reset the feeling.', 'Give the restless energy a task: write a list, clean one surface, reorganise one drawer.', 'Select "Bad" on MoodFlip — Restless and Pressured are in this mood family.'],
    toolLink: '/#hero-section',
  },
  'feeling-fearful': {
    title: 'Feeling Fearful? Ground Yourself in 60 Seconds | MoodFlip',
    metaDesc: 'Fear can feel overwhelming and all-consuming. MoodFlip\'s free tool helps you identify your specific fear type and take one grounding action to restore calm.',
    heading: 'Feeling Fearful? Ground Yourself First — Then Act',
    intro: 'Fear activates your body\'s stress response — and that\'s actually useful when the danger is real. But when fear is about something uncertain or future-based, your body needs a grounding signal to calm the alarm.',
    tips: ['Plant both feet firmly on the floor and take three deep, slow breaths.', 'Name your fear specifically: vague fears are more powerful than named ones.', 'Select "Fearful" on MoodFlip to find your exact fear type and the right calming action.'],
    toolLink: '/#hero-section',
  },
};

const ALL_SLUGS = Object.keys(MOOD_PAGES);

export async function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = MOOD_PAGES[slug];
  if (!page) return { title: 'MoodFlip | Mood Tool' };
  return {
    title: page.title,
    description: page.metaDesc,
    openGraph: {
      title: page.title,
      description: page.metaDesc,
      url: `https://moodflip.coach/moods/${slug}`,
    },
  };
}

export default async function MoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = MOOD_PAGES[slug];
  if (!page) notFound();

  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh', background: '#FAF7FD', padding: '60px 20px 80px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" style={{ marginBottom: 24 }}>
            <Link href="/" style={{ color: '#7464AC', fontSize: 14, textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#C4BADB', margin: '0 8px', fontSize: 14 }}>›</span>
            <span style={{ color: '#9C8CC4', fontSize: 14 }}>Mood Guide</span>
          </nav>

          {/* Heading */}
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#3D2D5E', lineHeight: 1.25, marginBottom: 20, fontFamily: 'Fraunces, serif' }}>
            {page.heading}
          </h1>

          {/* Intro */}
          <p style={{ fontSize: 17, color: '#5A4A7A', lineHeight: 1.75, marginBottom: 32 }}>
            {page.intro}
          </p>

          {/* Tips */}
          <div style={{ background: '#F2EBF9', borderRadius: 16, padding: '24px 28px', marginBottom: 36 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#3D2D5E', marginBottom: 16 }}>What You Can Try Right Now</h2>
            <ol style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {page.tips.map((tip, i) => (
                <li key={i} style={{ fontSize: 15, color: '#5A4A7A', lineHeight: 1.65 }}>{tip}</li>
              ))}
            </ol>
          </div>

          {/* CTA back to the tool */}
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <p style={{ fontSize: 15, color: '#9C8CC4', marginBottom: 16 }}>Ready to flip your mood right now?</p>
            <a
              href={page.toolLink}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #7464AC 0%, #9C6FBF 100%)',
                color: '#fff',
                borderRadius: 16,
                padding: '14px 36px',
                fontSize: 16,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 18px rgba(116,100,172,0.25)',
              }}
            >
              Try the Free Mood Tool →
            </a>
          </div>

          {/* Internal links to other mood pages */}
          <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #E4DAD7' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#7464AC', marginBottom: 16 }}>Explore Other Feelings</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {ALL_SLUGS.filter(s => s !== slug).slice(0, 10).map(s => (
                <Link
                  key={s}
                  href={`/moods/${s}`}
                  style={{
                    fontSize: 13, color: '#7464AC', textDecoration: 'none',
                    background: '#F2EBF9', borderRadius: 20, padding: '6px 14px',
                    border: '1px solid #DDD5EA', fontWeight: 500,
                  }}
                >
                  {s.replace('feeling-', '').replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
