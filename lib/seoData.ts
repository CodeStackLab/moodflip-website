export interface SEOPageContent {
  title: string;
  subtitle: string;
  content: string;
  targetState: string;
  action: string;
  relatedSlugs: string[];
}

export const SEO_PAGES: Record<string, SEOPageContent> = {
  'anxious-at-night': {
    title: 'How to Flip Feeling Anxious at Night',
    subtitle: 'Practical 60-second micro-step to calm night-time anxiety and racing thoughts.',
    content: 'Night-time anxiety often strikes when the body slows down but the mind continues racing. When lying in bed, your nervous system can mistake quiet stillness for uncertainty.',
    targetState: 'Calm & Peaceful Sleep 🌙',
    action: 'Place one hand on your chest and one on your belly. Breathe in for 4 seconds, hold for 7 seconds, and exhale slowly for 8 seconds.',
    relatedSlugs: ['how-to-stop-feeling-anxious', 'scared-uncertainty', 'feeling-restless']
  },
  'overwhelmed-work': {
    title: 'Overcoming Workplace & Workload Overwhelm',
    subtitle: 'Clear mental clutter instantly with a single 60-second focus anchor.',
    content: 'Overwhelm happens when you view all tasks as equally urgent and massive. Shifting out of overwhelm requires micro-scaffolding.',
    targetState: 'Organized & Focused 🎯',
    action: 'Write down only the single next physical step you need to take. Hide all other to-do lists for the next 20 minutes.',
    relatedSlugs: ['feeling-burned-out', 'feeling-pressured', 'feeling-rushed']
  },
  'feeling-lonely': {
    title: 'Navigating Feelings of Loneliness & Isolation',
    subtitle: 'Gentle self-compassion tools when feeling disconnected.',
    content: 'Loneliness is a universal human signal for connection. Acknowledge your feeling without self-judgment.',
    targetState: 'Connected & Supported 🤝',
    action: 'Send a quick 1-sentence message to someone you appreciate, or place a warm hand over your heart for 60 seconds.',
    relatedSlugs: ['feeling-abandoned', 'rejected-by-friend', 'feeling-empty']
  },
  'frustrated-angry': {
    title: 'Releasing Frustration & Anger Safely',
    subtitle: 'Channel intense emotional energy into calm clarity.',
    content: 'Frustration is proof that something matters to you. When anger flares, physical tension needs a safe release valve.',
    targetState: 'Calm & In Control ⚓',
    action: 'Tense all your muscles tightly for 5 seconds, then release completely with a deep exhale.',
    relatedSlugs: ['feeling-annoyed', 'feeling-resentful', 'feeling-irritated']
  },
  'low-energy-stuck': {
    title: 'Flipping Low Energy & Emotional Fatigue',
    subtitle: 'Recharge your mental battery with low-friction micro-movement.',
    content: 'When energy is depleted, pushing hard causes burnout. A gentle shift in physical state re-engages motivation.',
    targetState: 'Recharged & Vitalized ⚡',
    action: 'Drink a glass of cold water and step outside or open a window to take 5 deep breaths of fresh air.',
    relatedSlugs: ['feeling-empty', 'feeling-burned-out', 'feeling-avoidant']
  },
  'scared-uncertainty': {
    title: 'Coping with Fear of the Unknown',
    subtitle: 'Ground yourself when facing uncertainty or major decisions.',
    content: 'Uncertainty triggers the brain\'s threat detection center. Grounding brings your awareness back to physical safety.',
    targetState: 'Brave & Grounded 🏰',
    action: 'Name 5 things you can see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste.',
    relatedSlugs: ['anxious-at-night', 'feeling-terrified', 'feeling-insecure']
  },
  'feeling-guilty': {
    title: 'How to Stop Feeling Guilty About Past Mistakes',
    subtitle: 'Release unnecessary self-blame with compassionate 60-second anchors.',
    content: 'Guilt can weigh heavily when we confuse making a mistake with being a bad person. Self-forgiveness opens the door to growth.',
    targetState: 'Unburdened & Forgiven 🕊️',
    action: 'Say out loud: "I made a mistake, but I am not a mistake. I choose to move forward with grace."',
    relatedSlugs: ['feeling-ashamed', 'feeling-embarrassed', 'feeling-disappointed']
  },
  'feeling-ashamed': {
    title: 'Overcoming Shame and Building Self-Compassion',
    subtitle: 'Step into self-acceptance when feeling exposed or unworthy.',
    content: 'Shame urges us to hide. Counteracting shame requires bringing gentle self-kindness into the present moment.',
    targetState: 'Secure & Accepted 💖',
    action: 'Place your palm over your heart and repeat 3 times: "I am worthy of love and acceptance exactly as I am."',
    relatedSlugs: ['feeling-guilty', 'feeling-insecure', 'feeling-embarrassed']
  },
  'rejected-by-friend': {
    title: 'What to Do When You Feel Rejected by a Friend',
    subtitle: 'Reclaim your self-worth after social or personal rejection.',
    content: 'Rejection activates the same neural pathways as physical discomfort. Re-anchoring your self-worth restores inner peace.',
    targetState: 'Valued & Steady 🌟',
    action: 'Write down 3 personal qualities that make you a caring, resilient person.',
    relatedSlugs: ['feeling-lonely', 'feeling-abandoned', 'feeling-betrayed']
  },
  'feeling-burned-out': {
    title: 'Recovering from Burnout & Emotional Exhaustion',
    subtitle: 'Gentle reset strategies when your battery is completely drained.',
    content: 'Burnout happens when chronic demands outpace emotional recovery. Setting firm boundaries protects your vitality.',
    targetState: 'Rejuvenated & Protected 🌿',
    action: 'Step away from all screens, close your eyes, and take 60 seconds of silent sanctuary.',
    relatedSlugs: ['overwhelmed-work', 'low-energy-stuck', 'feeling-pressured']
  },
  'feeling-restless': {
    title: 'Calming Restless Energy and Agitation',
    subtitle: 'Channel nervous bodily energy into centered physical grounding.',
    content: 'Restlessness indicates excess nervous system arousal looking for an outlet. Micro-movements help discharge agitation.',
    targetState: 'Centered & Still 🧘',
    action: 'Do 10 slow arm raises overhead, focusing completely on the rhythm of your breath.',
    relatedSlugs: ['anxious-at-night', 'feeling-rushed', 'how-to-stop-feeling-anxious']
  },
  'feeling-rushed': {
    title: 'Slowing Down When You Feel Rushed & Pressed for Time',
    subtitle: 'Shift out of panic mode with intentional micro-pauses.',
    content: 'Feeling rushed creates artificial urgency and cognitive friction. Intentionally slowing down restores efficiency.',
    targetState: 'Unrushed & Present ⏳',
    action: 'Take 3 slow inhales and double the length of your exhales while unclenching your fingers.',
    relatedSlugs: ['overwhelmed-work', 'feeling-pressured', 'feeling-restless']
  },
  'feeling-empty': {
    title: 'Replenishing When You Feel Emotionally Empty',
    subtitle: 'Nurture yourself when feeling drained, hollow, or numb.',
    content: 'Emotional emptiness is a sign that your mind and body need gentle nourishment without pressure.',
    targetState: 'Replenished & Alive 🌱',
    action: 'Hold a warm mug or cup in both hands, feeling its gentle warmth for 60 seconds.',
    relatedSlugs: ['low-energy-stuck', 'feeling-burned-out', 'feeling-lonely']
  },
  'feeling-insecure': {
    title: 'Overcoming Insecurity & Imposter Feelings',
    subtitle: 'Build quiet inner confidence when self-doubt creeps in.',
    content: 'Insecurity often magnifies perceived flaws while ignoring your proven strengths. Grounding in facts restores balance.',
    targetState: 'Confident & Steady 🛡️',
    action: 'Stand tall with chin level, pull shoulders back, and state 1 solid strength you possess.',
    relatedSlugs: ['feeling-ashamed', 'scared-uncertainty', 'rejected-by-friend']
  },
  'feeling-terrified': {
    title: 'Grounding Yourself When Terrified or Panicked',
    subtitle: 'Immediate sensory grounding for intense panic or fear spikes.',
    content: 'When terror grips your mind, physical sensory grounding brings your nervous system back into real-time safety.',
    targetState: 'Protected & Bold 🏰',
    action: 'Push your feet firmly into the ground, hug your elbows tightly, and whisper: "I am safe right now."',
    relatedSlugs: ['scared-uncertainty', 'anxious-at-night', 'how-to-stop-feeling-anxious']
  },
  'feeling-annoyed': {
    title: 'Managing Daily Irritations and Annoyance',
    subtitle: 'Prevent small daily annoyances from ruining your mood.',
    content: 'Annoyance is minor frustration accumulating. A quick physical reset dissipates irritation before it escalates.',
    targetState: 'Patient & Easeful 🍃',
    action: 'Shake out your hands and arms for 15 seconds, then say: "One step at a time."',
    relatedSlugs: ['frustrated-angry', 'feeling-irritated', 'feeling-resentful']
  },
  'feeling-resentful': {
    title: 'Letting Go of Resentment & Bitterness',
    subtitle: 'Free your mind from carrying heavy emotional grudges.',
    content: 'Resentment burns precious mental energy. Releasing bitterness is an act of self-care for your own peace.',
    targetState: 'Liberated & Unbound 🕊️',
    action: 'Place your palm on your chest, inhale deeply, and say: "I reclaim my energy for my own well-being."',
    relatedSlugs: ['frustrated-angry', 'feeling-betrayed', 'feeling-annoyed']
  },
  'feeling-irritated': {
    title: 'Soothing Sensory & Emotional Irritation',
    subtitle: 'Cool down internal heat when sensory overload triggers agitation.',
    content: 'Sensory and emotional irritation creates physical tightness. Softening physical tension cools mental irritation.',
    targetState: 'Tranquil & Softened ❄️',
    action: 'Drop your shoulders 2 inches down away from your ears and take 3 slow side-breaths.',
    relatedSlugs: ['feeling-annoyed', 'frustrated-angry', 'feeling-burned-out']
  },
  'feeling-betrayed': {
    title: 'Healing After Feeling Betrayed or Let Down',
    subtitle: 'Re-anchor trust in yourself when someone breaches your confidence.',
    content: 'Betrayal shakes your sense of security. Turning inward to honor your integrity restores self-reliance.',
    targetState: 'Resilient & Self-Grounded ⚓',
    action: 'Place both hands over your heart and say aloud: "I trust myself and my own inner strength."',
    relatedSlugs: ['rejected-by-friend', 'feeling-resentful', 'feeling-lonely']
  },
  'feeling-hesitant': {
    title: 'Overcoming Hesitation & Second-Guessing',
    subtitle: 'Clear mental ambivalence and take confident micro-actions.',
    content: 'Hesitation stems from trying to guarantee outcomes before taking action. Micro-steps build momentum.',
    targetState: 'Cleansed & Clear 🎯',
    action: 'Take 3 deep breaths, change your posture, and declare: "I clear my space and choose clarity."',
    relatedSlugs: ['scared-uncertainty', 'feeling-avoidant', 'feeling-insecure']
  },
  'feeling-detestable': {
    title: 'Reframing Self-Loathing into Self-Renewal',
    subtitle: 'Cleanse self-critical thoughts with refreshing physical resets.',
    content: 'Harsh inner criticism distorts reality. A physical refresh resets neural pathways toward self-acceptance.',
    targetState: 'Refreshed & Purified 🧼',
    action: 'Rinse your mouth and face with cold water, then stretch your spine tall while exhaling deeply.',
    relatedSlugs: ['feeling-ashamed', 'feeling-guilty', 'feeling-embarrassed']
  },
  'feeling-repelled': {
    title: 'Clearing Mental & Physical Disgust',
    subtitle: 'Step away from toxic inputs and cleanse your mental space.',
    content: 'Disgust is a protective boundary signal. Physical cleansing reinforces emotional boundaries.',
    targetState: 'Renewed & Protected 🌈',
    action: 'Step away from unpleasant surroundings and take 3 deep inhales of fresh outdoor air.',
    relatedSlugs: ['feeling-hesitant', 'feeling-detestable', 'feeling-irritated']
  },
  'feeling-embarrassed': {
    title: 'Bouncing Back from Embarrassing Moments',
    subtitle: 'Lighten awkwardness and recover your poise gracefully.',
    content: 'Embarrassment makes us feel spotlighted. Remembering that everyone experiences awkwardness diffuses tension.',
    targetState: 'Graceful & Unbothered 🌸',
    action: 'Place a cool hand on your warm cheek, smile gently, and say: "I am human, and it is okay to be imperfect."',
    relatedSlugs: ['feeling-ashamed', 'feeling-guilty', 'feeling-insecure']
  },
  'feeling-avoidant': {
    title: 'Breaking Through Procrastination & Avoidance',
    subtitle: 'Low-friction steps to overcome task avoidance and paralysis.',
    content: 'Avoidance is emotional regulation, not laziness. Reducing friction to 60 seconds unlocks action.',
    targetState: 'Engaged & Willing 🚀',
    action: 'Count down 5-4-3-2-1 out loud and commit to engaging for just 60 seconds without pressure.',
    relatedSlugs: ['overwhelmed-work', 'feeling-hesitant', 'low-energy-stuck']
  },
  'feeling-pressured': {
    title: 'Easing High-Pressure Demands & Expectations',
    subtitle: 'Release external expectations and anchor in personal calm.',
    content: 'Pressure accumulates when we internalize external demands as urgent emergencies.',
    targetState: 'Relaxed & Unburdened 🎈',
    action: 'Roll your shoulders back 5 times, close your eyes, and inhale peace for 4 counts, exhale pressure for 6.',
    relatedSlugs: ['overwhelmed-work', 'feeling-rushed', 'feeling-burned-out']
  },
  'feeling-abandoned': {
    title: 'Finding Anchors When Feeling Abandoned',
    subtitle: 'Self-soothing techniques when feeling left behind or forsaken.',
    content: 'Feeling abandoned triggers core safety anxieties. Physical self-anchoring recreates internal safety.',
    targetState: 'Secure & Valued ⚓',
    action: 'Wrap a soft blanket around yourself, ground your feet into the floor, and whisper: "I am safe in this body."',
    relatedSlugs: ['feeling-lonely', 'rejected-by-friend', 'feeling-empty']
  },
  'feeling-disappointed': {
    title: 'Processing Disappointment with Hope',
    subtitle: 'Soothe the sting of unmet expectations and restore optimism.',
    content: 'Disappointment is the gap between expectation and reality. Honoring the pain allows hope to return naturally.',
    targetState: 'Hopeful & Relieved 🌅',
    action: 'Give yourself a gentle embrace for 60 seconds and say: "I am allowed to feel hurt, and I am allowed to heal."',
    relatedSlugs: ['feeling-guilty', 'rejected-by-friend', 'low-energy-stuck']
  },
  'how-to-stop-feeling-anxious': {
    title: 'Step-by-Step Guide: How to Stop Feeling Anxious Instantly',
    subtitle: 'Proven 60-second micro-resets to calm an overactive nervous system.',
    content: 'Anxiety is an involuntary nervous system response. Physical grounding tools slow down heart rate and restore cognitive clarity.',
    targetState: 'Calm & In Control 🧘‍♀️',
    action: 'Inhale through your nose for 4 seconds, hold for 7 seconds, and exhale slowly through pursed lips for 8 seconds.',
    relatedSlugs: ['anxious-at-night', 'scared-uncertainty', 'feeling-restless']
  }
};
