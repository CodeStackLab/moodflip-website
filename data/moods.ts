export type MoodCategory = 'All' | 'Low' | 'Anxious' | 'Angry' | 'Overwhelmed' | 'Lonely';

export type CounselorPromptItem = {
  serial: number;
  id: string;
  name: string;
  emoji: string;
  category: MoodCategory;
  bgColor: string;
  textColor: string;
  feelings: string[];
  target: string;
  actionTitle: string;
  actionDesc: string;
  whyHelps: string;
  actions: string[];
  reframeQuote: string;
  column1Notes?: string;
  iconUrl?: string;
};

export const COUNSELOR_MOODS: CounselorPromptItem[] = [
  {
    serial: 1,
    id: 'scared',
    name: 'Scared',
    emoji: '😨',
    category: 'Anxious',
    bgColor: '#FEF3C7',
    textColor: '#D97706',
    feelings: ['Fearful', 'Terrified', 'Panicked', 'Uneasy'],
    target: 'Safe / Peaceful',
    actionTitle: 'Ground Your Feet & Name 5 Things',
    actionDesc: 'Put both feet on the floor. Look around and name 5 things you can see. Say: "Right now, I am safe."',
    whyHelps: 'Physical grounding shifts your focus from perceived threat to current physical reality.',
    actions: [
      'Put both feet flat on the floor.',
      'Look around your room and name 5 distinct things you can see.',
      'Say out loud or silently: "Right now, I am safe."'
    ],
    reframeQuote: 'Right now, I am safe.',
    column1Notes: 'I would remove the word "enough"'
  },
  {
    serial: 2,
    id: 'anxious',
    name: 'Anxious',
    emoji: '🌀',
    category: 'Anxious',
    bgColor: '#E0F2FE',
    textColor: '#0284C7',
    feelings: ['Nervous', 'Uneasy', 'Worried', 'Restless', 'On edge'],
    target: 'Peaceful',
    actionTitle: 'Box Breathing Reset',
    actionDesc: 'Breathe in for 4 and out for 6. Repeat 6 times. Make the exhale longer than the inhale.',
    whyHelps: 'Box breathing regulates your autonomic nervous system and slows down rapid heart rate.',
    actions: [
      'Breathe in through your nose for 4 seconds.',
      'Hold your breath calmly for 4 seconds.',
      'Exhale slowly through your mouth for 4 seconds.',
      'Hold empty for 4 seconds. Repeat 4 times.'
    ],
    reframeQuote: 'Slow, square breaths restore steady calm to your mind.',
    column1Notes: 'Maybe look into box breathing, https://www.healthline.com/health/box-breathing#getting-started'
  },
  {
    serial: 3,
    id: 'insecure',
    name: 'Insecure',
    emoji: '🛡️',
    category: 'Anxious',
    bgColor: '#FFF7EB',
    textColor: '#D97706',
    feelings: ['Doubtful', 'Exposed', 'Uncertain', 'Inadequate'],
    target: 'Confident',
    actionTitle: 'Posture Shift & Past Victories',
    actionDesc: 'Sit or stand taller. Name 3 things you have handled before, even if they were hard.',
    whyHelps: 'Upright posture combined with evidence of past resilience lowers stress hormones.',
    actions: [
      'Sit or stand tall, rolling your shoulders back gently.',
      'Name 3 hard things you successfully navigated in your past.',
      'Remind yourself: "My capability is proven by my history."'
    ],
    reframeQuote: 'I have handled hard things before, and I can handle this.',
    column1Notes: ''
  },
  {
    serial: 4,
    id: 'weak',
    name: 'Weak',
    emoji: '🥀',
    category: 'Low',
    bgColor: '#F3F4F6',
    textColor: '#4B5563',
    feelings: ['Powerless', 'Fragile', 'Helpless', 'Exhausted'],
    target: 'Powerful',
    actionTitle: 'Firm Grounding & Micro-Control',
    actionDesc: 'Place your feet firmly into the ground/floor and ask: "What is one tiny thing I can control in the next 10 minutes?"',
    whyHelps: 'Refocusing on tiny actionable choices restores feeling of personal agency.',
    actions: [
      'Place your feet firmly into the ground/floor.',
      'Ask: "What is one tiny thing I can control in the next 10 minutes?"',
      'Focus all your energy on taking just that one tiny action.'
    ],
    reframeQuote: 'Place your feet firmly into the ground/floor.',
    column1Notes: 'Maybe "Place your feet firmly into the ground/floor…."'
  },
  {
    serial: 5,
    id: 'rejected',
    name: 'Rejected',
    emoji: '💔',
    category: 'Lonely',
    bgColor: '#FFF0F3',
    textColor: '#E11D48',
    feelings: ['Let down', 'Unwanted', 'Excluded', 'Hurt'],
    target: 'Accepted',
    actionTitle: 'Heart Touch & Self-Worth',
    actionDesc: 'Place one hand on your chest. Say: "One person’s response is not my worth."',
    whyHelps: 'Self-directed touch releases oxytocin and soothes emotional sting.',
    actions: [
      'Place one hand gently over the center of your chest.',
      'Take 3 steady, soothing breaths.',
      'Say silently: "One person’s response is not my worth."'
    ],
    reframeQuote: 'One person’s response is not my worth.',
    column1Notes: ''
  },
  {
    serial: 6,
    id: 'threatened',
    name: 'Threatened',
    emoji: '⚠️',
    category: 'Anxious',
    bgColor: '#FEF2F2',
    textColor: '#DC2626',
    feelings: ['Vulnerable', 'Unsafe', 'Guarded', 'On defense'],
    target: 'Safe / Trusting',
    actionTitle: 'Body Release & Safe Presence',
    actionDesc: 'Relax your jaw and shoulders. Say: "It is safe for me to be here."',
    whyHelps: 'Releasing jaw and shoulder muscular tension signals safety to the amygdala.',
    actions: [
      'Relax your jaw and drop your shoulders away from your ears.',
      'Feel the solid support of the surface beneath you.',
      'Say softly: "It is safe for me to be here."'
    ],
    reframeQuote: 'It is safe for me to be here.',
    column1Notes: 'The words "danger" and "threatened" can be seen related to violence, domestic violence and similar. Consider words like "It is safe for me to be here" - think about it'
  },
  {
    serial: 7,
    id: 'let-down',
    name: 'Let down',
    emoji: '🌧️',
    category: 'Low',
    bgColor: '#EEF2FF',
    textColor: '#4F46E5',
    feelings: ['Disappointed', 'Discouraged', 'Unseen', 'Sad'],
    target: 'Hopeful',
    actionTitle: 'Acknowledge & Open Next Door',
    actionDesc: 'Say: "This disappointed me, but it does not close every door." Name one next option.',
    whyHelps: 'Validating emotion without fixing creates mental room for new possibilities.',
    actions: [
      'Acknowledge the disappointment without judging yourself.',
      'Say: "This disappointed me, but it does not close every door."',
      'Name one next option or path open to you right now.'
    ],
    reframeQuote: 'This disappointed me, but it does not close every door.',
    column1Notes: ''
  },
  {
    serial: 8,
    id: 'humiliated',
    name: 'Humiliated',
    emoji: '😳',
    category: 'Low',
    bgColor: '#FDF2F8',
    textColor: '#DB2777',
    feelings: ['Embarrassed', 'Ashamed', 'Exposed', 'Small'],
    target: 'Respected',
    actionTitle: 'Upright Self-Acceptance',
    actionDesc: 'Sit upright. Say: "Right here, right now, I completely love and respect/accept myself."',
    whyHelps: 'Self-acceptance acts as a buffer against external judgment.',
    actions: [
      'Sit upright with dignity and lift your chin gently.',
      'Take a deep, cleansing breath.',
      'Say: "Right here, right now, I completely love and respect/accept myself."'
    ],
    reframeQuote: 'Right here, right now, I completely love and respect/accept myself.',
    column1Notes: 'Maybe "Right here, right now, I completely love and respect/accept myself"'
  },
  {
    serial: 9,
    id: 'bitter',
    name: 'Bitter',
    emoji: '🍋',
    category: 'Angry',
    bgColor: '#FFFBEB',
    textColor: '#D97706',
    feelings: ['Resentful', 'Grudging', 'Sour', 'Hurt'],
    target: 'Free',
    actionTitle: 'Release the Heavy Burden',
    actionDesc: 'Ask: "What am I tired of carrying?" Imagine putting that burden down for 60 seconds.',
    whyHelps: 'Visualizing setting down emotional weight relieves physiological tension.',
    actions: [
      'Ask: "What am I tired of carrying?"',
      'Imagine physically putting that burden down for 60 seconds.',
      'Breathe freely without the weight.'
    ],
    reframeQuote: 'What am I tired of carrying? Putting that burden down.',
    column1Notes: ''
  },
  {
    serial: 10,
    id: 'angry',
    name: 'Angry',
    emoji: '😡',
    category: 'Angry',
    bgColor: '#FFF0F0',
    textColor: '#DC2626',
    feelings: ['Furious', 'Mad', 'Irritated', 'Fuming'],
    target: 'Powerful',
    actionTitle: 'Wall Pushes for Energy Release',
    actionDesc: 'Do 10 slow wall pushes. Channel the heat into strength, not explosion.',
    whyHelps: 'Isometric wall pushes safely discharge adrenaline and physical anger energy.',
    actions: [
      'Place both palms flat against a solid wall.',
      'Do 10 slow, firm wall pushes engaging your arms and core.',
      'Channel the heat into strength, not explosion.'
    ],
    reframeQuote: 'Channel the heat into strength, not explosion.',
    column1Notes: 'Maybe "Angry"'
  },
  {
    serial: 11,
    id: 'aggressive',
    name: 'Aggressive',
    emoji: '🔥',
    category: 'Angry',
    bgColor: '#FEF2F2',
    textColor: '#991B1B',
    feelings: ['Combative', 'Hostile', 'Fierce', 'Attacking'],
    target: 'Peaceful / Powerful',
    actionTitle: 'Step Back & Open Hands',
    actionDesc: 'Step back physically if possible. Unclench your hands. Take a deep breath and say "I am strong just the way I am".',
    whyHelps: 'Unclenching hands signals non-aggression directly to the motor cortex.',
    actions: [
      'Step back physically if possible.',
      'Unclench your hands and open your palms.',
      'Take a deep breath and say: "I am strong just the way I am."'
    ],
    reframeQuote: 'Take a deep breath and say "I am strong just the way I am."',
    column1Notes: '"Take a deep breathe and say "I am strong just the way I am"'
  },
  {
    serial: 12,
    id: 'frustrated',
    name: 'Frustrated',
    emoji: '💥',
    category: 'Angry',
    bgColor: '#FFF4EB',
    textColor: '#EA580C',
    feelings: ['Blocked', 'Annoyed', 'Impatient', 'Stuck'],
    target: 'Capable / Confident',
    actionTitle: 'The Single Smallest Step',
    actionDesc: 'Ask: "What is the next smallest step?" Do only that step, not the whole problem.',
    whyHelps: 'Deconstructing a roadblock into 1 tiny step restores momentum.',
    actions: [
      'Ask: "What is the next smallest step?"',
      'Do only that step, ignoring the rest of the problem for now.',
      'Acknowledge your progress on that single step.'
    ],
    reframeQuote: 'What is the next smallest step? Do only that step.',
    column1Notes: ''
  },
  {
    serial: 13,
    id: 'distant',
    name: 'Distant',
    emoji: '🌌',
    category: 'Lonely',
    bgColor: '#F0F9FF',
    textColor: '#0369A1',
    feelings: ['Detached', 'Disconnected', 'Withdrawn', 'Isolated'],
    target: 'Connected / Accepted',
    actionTitle: 'No-Performance Reachout',
    actionDesc: 'Send one simple message or think of one person you do not have to perform for.',
    whyHelps: 'Connection without the burden of performance repairs social fatigue.',
    actions: [
      'Send one simple message to someone you trust.',
      'Or think of one person you do not have to perform for.',
      'Notice the quiet comfort of being authentic.'
    ],
    reframeQuote: 'Send one simple message or think of one person you do not have to perform for.',
    column1Notes: ''
  },
  {
    serial: 14,
    id: 'critical',
    name: 'Critical',
    emoji: '🔍',
    category: 'Overwhelmed',
    bgColor: '#F5F3FF',
    textColor: '#6D28D9',
    feelings: ['Judgmental', 'Fault-finding', 'Harsh', 'Perfectionist'],
    target: 'Curious',
    actionTitle: 'Curiosity Perspective Shift',
    actionDesc: 'Replace "What is wrong with this?" with "What am I not seeing?"',
    whyHelps: 'Curiosity activates problem-solving circuits instead of judgment circuits.',
    actions: [
      'Catch the judgment in your mind.',
      'Replace "What is wrong with this?" with "What am I not seeing?"',
      'Look at the situation with fresh curiosity.'
    ],
    reframeQuote: 'Replace "What is wrong with this?" with "What am I not seeing?"',
    column1Notes: '"what am I not seeing?"'
  },
  {
    serial: 15,
    id: 'disapproving',
    name: 'Disapproving',
    emoji: '🤨',
    category: 'Angry',
    bgColor: '#FFFBEB',
    textColor: '#B45309',
    feelings: ['Displeased', 'Critical', 'Unaccepting', 'Resistant'],
    target: 'Understanding / Curious',
    actionTitle: 'Understand Without Agreeing',
    actionDesc: 'Say: "I do not have to agree to understand." Find one possible reason behind the behaviour.',
    whyHelps: 'Discoupling empathy from agreement lowers defensive mental guard.',
    actions: [
      'Say to yourself: "I do not have to agree to understand."',
      'Find one possible reason behind the behavior.',
      'Let your mind soften around the need to control.'
    ],
    reframeQuote: 'I do not have to agree to understand.',
    column1Notes: ''
  },
  {
    serial: 16,
    id: 'uncomfortable',
    name: 'Uncomfortable',
    emoji: '😣',
    category: 'Overwhelmed',
    bgColor: '#F1F5F9',
    textColor: '#334155',
    feelings: ['Uneasy', 'Awkward', 'Tense', 'Restless'],
    target: 'Peaceful',
    actionTitle: 'Body Sensation Scan',
    actionDesc: 'Scan your body. Name the exact sensation: tight chest, hot face, heavy stomach.',
    whyHelps: 'Objective naming of sensations removes panic from physical discomfort.',
    actions: [
      'Scan your body from top to bottom.',
      'Name the exact sensation: tight chest, hot face, or heavy stomach.',
      'Breathe gently into that space for 60 seconds.'
    ],
    reframeQuote: 'Scan your body and name the exact physical sensation.',
    column1Notes: ''
  },
  {
    serial: 17,
    id: 'awful',
    name: 'Awful',
    emoji: '🌑',
    category: 'Low',
    bgColor: '#F3F4F6',
    textColor: '#1F2937',
    feelings: ['Terrible', 'Miserable', 'Dreadful', 'Heavy'],
    target: 'Hopeful',
    actionTitle: 'Temporary Moment Anchor',
    actionDesc: 'Say: "This is temporary, not my whole life." Look for one thing still okay right now.',
    whyHelps: 'Recognizing impermanence prevents temporary feeling from seeming endless.',
    actions: [
      'Say: "This is temporary, not my whole life."',
      'Look for one small thing that is still okay right now.',
      'Rest in the knowledge that moments change.'
    ],
    reframeQuote: 'This is temporary, not my whole life.',
    column1Notes: '"This is temporary,…."'
  },
  {
    serial: 18,
    id: 'repelled',
    name: 'Repelled',
    emoji: '🛑',
    category: 'Overwhelmed',
    bgColor: '#FEE2E2',
    textColor: '#991B1B',
    feelings: ['Disgusted', 'Averse', 'Pushed away', 'Overwhelmed'],
    target: 'Free / Boundaried',
    actionTitle: 'Physical Space & Boundary',
    actionDesc: 'Take one step back or lean back. Say: "My no is allowed."',
    whyHelps: 'Physical distance reinforces internal autonomy and personal boundaries.',
    actions: [
      'Take one step back or lean back in your seat.',
      'Place your hand over your solar plexus.',
      'Say clearly to yourself: "My no is allowed."'
    ],
    reframeQuote: 'My no is allowed.',
    column1Notes: ''
  },
  {
    serial: 19,
    id: 'hurt',
    name: 'Hurt',
    emoji: '🩹',
    category: 'Low',
    bgColor: '#FFF0F3',
    textColor: '#BE123C',
    feelings: ['Pained', 'Wounded', 'Grieving', 'Heartbroken'],
    target: 'Cared for / Valued',
    actionTitle: 'Hand on Hurt & Self-Value',
    actionDesc: 'Put your hand where you feel the hurt. Say: "This matters because I matter."',
    whyHelps: 'Self-directed care validates personal pain without shame.',
    actions: [
      'Put your hand gentle where you feel the hurt.',
      'Take a slow, compassionate breath.',
      'Say: "This matters because I matter."'
    ],
    reframeQuote: 'This matters because I matter.',
    column1Notes: ''
  },
  {
    serial: 20,
    id: 'depressed',
    name: 'Depressed',
    emoji: '🕯️',
    category: 'Low',
    bgColor: '#EEF2FF',
    textColor: '#3730A3',
    feelings: ['Down', 'Empty', 'Descreet', 'Heavy', 'Unmotivated'],
    target: 'Hopeful',
    actionTitle: 'Listen to Music & Tiny Movement',
    actionDesc: 'Open curtains, drink water, or step outside for 60 seconds. Tiny movement first.',
    whyHelps: 'Micro-movements and music gently stimulate dopamine release without overwhelming.',
    actions: [
      'Turn on comforting music or favorite song.',
      'Open window curtains, drink water, or step outside for 60 seconds.',
      'Focus on just tiny movement first.'
    ],
    reframeQuote: 'Listen to music. Open curtains, drink water, or step outside. Tiny movement first.',
    column1Notes: '"listen to music"'
  },
  {
    serial: 21,
    id: 'guilty',
    name: 'Guilty',
    emoji: '🥺',
    category: 'Low',
    bgColor: '#F3E8FF',
    textColor: '#7E22CE',
    feelings: ['Regretful', 'Ashamed', 'Remorseful', 'Faulty'],
    target: 'Responsible / Proud',
    actionTitle: 'Honest Repair Selection',
    actionDesc: 'Ask: "Is there one repair I can make?" If yes, choose one small honest action.',
    whyHelps: 'Focusing on constructive repair shifts mind from shame to responsibility.',
    actions: [
      'Ask: "Is there one repair I can make?"',
      'If yes, choose one small honest action to take today.',
      'If no, practice releasing past mistakes.'
    ],
    reframeQuote: 'Is there one repair I can make? Choose one small honest action.',
    column1Notes: ''
  },
  {
    serial: 22,
    id: 'despair',
    name: 'Despair',
    emoji: '⚓',
    category: 'Low',
    bgColor: '#F1F5F9',
    textColor: '#0F172A',
    feelings: ['Hopeless', 'Lost', 'Gloom', 'Defeated'],
    target: 'Hopeful',
    actionTitle: 'Survival Anchor & The Next Minute',
    actionDesc: 'Name one thing that helped you survive a previous hard time. Repeat: "I only need the next minute."',
    whyHelps: 'Narrowing timeline to the next 60 seconds reduces unbearable future worry.',
    actions: [
      'Name one thing that helped you survive a previous hard time.',
      'Repeat to yourself: "I only need the next minute."',
      'Breathe through just this 60 seconds.'
    ],
    reframeQuote: 'I only need the next minute.',
    column1Notes: ''
  },
  {
    serial: 23,
    id: 'vulnerable',
    name: 'Vulnerable',
    emoji: '🌱',
    category: 'Anxious',
    bgColor: '#ECFDF5',
    textColor: '#047857',
    feelings: ['Exposed', 'Unprotected', 'Sensitive', 'Raw'],
    target: 'Trusting',
    actionTitle: 'Safe Boundary & Reassurance',
    actionDesc: 'Say: "Vulnerable does not mean unsafe." Choose one safe boundary or one safe person.',
    whyHelps: 'Framing vulnerability as courage builds self-trust.',
    actions: [
      'Say: "Vulnerable does not mean unsafe."',
      'Choose one safe boundary or connect with one safe person.',
      'Breathe easily knowing your boundaries protect you.'
    ],
    reframeQuote: 'Vulnerable does not mean unsafe.',
    column1Notes: ''
  },
  {
    serial: 24,
    id: 'lonely',
    name: 'Lonely',
    emoji: '👤',
    category: 'Lonely',
    bgColor: '#EFF6FF',
    textColor: '#1D4ED8',
    feelings: ['Alone', 'Isolated', 'Unseen', 'Missing connection'],
    target: 'Connected / Accepted',
    actionTitle: 'Low-Pressure Warm Text',
    actionDesc: 'Send a low-pressure message: "Thinking of you. Hope you’re okay." No big explanation needed.',
    whyHelps: 'Reaching out gently removes performance pressure while signaling warmth.',
    actions: [
      'Send a low-pressure message: "Thinking of you. Hope you’re okay."',
      'No big explanation or effort needed.',
      'Feel good about taking a step toward warmth.'
    ],
    reframeQuote: 'Thinking of you. Hope you’re okay.',
    column1Notes: ''
  },
  {
    serial: 25,
    id: 'tired',
    name: 'Tired',
    emoji: '🔋',
    category: 'Low',
    bgColor: '#ECFDF5',
    textColor: '#059669',
    feelings: ['Drained', 'Exhausted', 'Sleepy', 'Burnt Out'],
    target: 'Rested / Peaceful',
    actionTitle: '60-Second Complete Rest',
    actionDesc: 'Close your eyes for 60 seconds. Drop your shoulders. Ask: "What can wait?"',
    whyHelps: 'Closing eyes shuts down 80% of sensory intake, allowing immediate rest.',
    actions: [
      'Close your eyes completely for 60 seconds.',
      'Drop your shoulders down.',
      'Ask: "What can wait?"'
    ],
    reframeQuote: 'Close your eyes for 60 seconds. Drop your shoulders. Ask: "What can wait?"',
    column1Notes: ''
  },
  {
    serial: 26,
    id: 'stressed',
    name: 'Stressed',
    emoji: '⚡',
    category: 'Overwhelmed',
    bgColor: '#FDF2F8',
    textColor: '#BE185D',
    feelings: ['Tense', 'Pressured', 'Frustrated', 'Overworked'],
    target: 'Calm / Powerful',
    actionTitle: 'Write 3 Stressors & Choose 1 Action',
    actionDesc: 'Write the 3 things stressing you. Circle only the one you can act on today.',
    whyHelps: 'Writing down stressors offloads working memory and clarifies single focus.',
    actions: [
      'Write 3 things that are stressful at the moment.',
      'Choose one thing you can do today.',
      'Put your focus on executing that single item.'
    ],
    reframeQuote: 'Write 3 things that are stressful at the moment, choose one thing you can do today.',
    column1Notes: '"Write 3 things that is stressful at the moment, Choose one thing, you can do today"'
  },
  {
    serial: 27,
    id: 'busy',
    name: 'Busy',
    emoji: '⏳',
    category: 'Overwhelmed',
    bgColor: '#FEF3C7',
    textColor: '#B45309',
    feelings: ['Rushed', 'Hurried', 'Frantic', 'Overcommitted'],
    target: 'Content / In control',
    actionTitle: 'Pause, Delete, or Delay 1 Task',
    actionDesc: 'Say: "Busy is not the same as productive." Pick one task to pause, delete or delay.',
    whyHelps: 'Intentionally choosing to delay one task creates immediate cognitive breathing room.',
    actions: [
      'Say to yourself: "Busy is not the same as productive."',
      'Pick one non-essential task.',
      'Choose to pause, delete, or delay it.'
    ],
    reframeQuote: 'Busy is not the same as productive.',
    column1Notes: ''
  },
  {
    serial: 28,
    id: 'bored',
    name: 'Bored',
    emoji: '🥱',
    category: 'Low',
    bgColor: '#F3F4F6',
    textColor: '#374151',
    feelings: ['Uninterested', 'Dull', 'Restless', 'Stagnant'],
    target: 'Curious / Interested',
    actionTitle: '5% Curiosity Shift',
    actionDesc: 'Ask: "What would make this 5% more interesting?" Change location, music, order, or method.',
    whyHelps: 'A 5% tweak lowers friction and rekindles intrinsic interest.',
    actions: [
      'Ask: "What would make this 5% more interesting?"',
      'Change your location, music, order, or method.',
      'Notice the subtle shift in focus.'
    ],
    reframeQuote: 'What would make this 5% more interesting? Change location, music, order, or method.',
    column1Notes: ''
  }
];

// For backward compatibility
export const MOODS = COUNSELOR_MOODS;
