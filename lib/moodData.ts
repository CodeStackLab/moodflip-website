export interface MoodAction {
  id: string;
  targetMood: string;
  actions: string[];
}

export interface FeelingDetail {
  id: string;
  name: string;
  icon: string;
  targetMood: string;
  actions: string[];
}

export interface MoodSubCategory {
  id: string;
  name: string;
  icon: string;
  feelings: FeelingDetail[];
}

export interface MoodFamily {
  id: string;
  name: string;
  cloudColor: string;
  subCategories: MoodSubCategory[];
}

// 28 Bad Mood / Good Mood Pairings with 10 rotating actions per mood
export const MOOD_DATA: MoodFamily[] = [
  {
    id: 'sad',
    name: 'SAD',
    cloudColor: '#60a5fa',
    subCategories: [
      {
        id: 'lonely',
        name: 'Lonely',
        icon: '🌧️',
        feelings: [
          {
            id: 'isolated',
            name: 'Isolated',
            icon: '🏝️',
            targetMood: 'Connected & Supported 🤝',
            actions: [
              'Send a 1-sentence text to a friend or relative: "Thinking of you today!"',
              'Place a warm hand over your heart, close your eyes, and feel your heartbeat for 60 seconds.',
              'Step outside or look out a window and name 3 things in nature that connect us all.',
              'Listen to 1 minute of comforting ambient ocean waves to feel grounded.',
              'Write down the name of 1 person who has shown you kindness in the past.',
              'Pour yourself a warm cup of tea or water and savor each slow sip.',
              'Remind yourself out loud: "I am worthy of love, connection, and belonging."',
              'Do a quick 60-second gentle shoulder roll and stretch.',
              'Look in the mirror and offer yourself a genuine, compassionate smile.',
              'Write a quick gratitude note to yourself for surviving hard days.'
            ]
          },
          {
            id: 'abandoned',
            name: 'Abandoned',
            icon: '🍂',
            targetMood: 'Self-Assured & Safe 🛡️',
            actions: [
              'Wrap a soft blanket around your shoulders and take 5 slow deep breaths.',
              'Say out loud: "I am here for myself right now. I will not abandon me."',
              'Drink a full glass of cold water mindfully.',
              'Unclench your jaw and gently massage your temples for 60 seconds.',
              'Name 3 solid objects near you that provide safety and physical support.',
              'Trace the outline of your hand on a piece of paper to ground your senses.',
              'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.',
              'Write down 1 thing you appreciate about your own strength.',
              'Put your feet flat on the floor and feel the solid ground holding you up.',
              'Listen to a calming 432Hz ambient frequency for 1 minute.'
            ]
          }
        ]
      },
      {
        id: 'vulnerable',
        name: 'Vulnerable',
        icon: '🕊️',
        feelings: [
          {
            id: 'fragile',
            name: 'Fragile',
            icon: '🕯️',
            targetMood: 'Resilient & Protected 🧱',
            actions: [
              'Cross your arms across your chest in a gentle self-hug for 60 seconds.',
              'Write down: "Sensitivity is my strength, not my weakness."',
              'Focus your eyes on a single calming object in the room for 1 minute.',
              'Take 3 deep, slow abdominal breaths.',
              'Smile gently to signal safety to your nervous system.',
              'Softly touch your fingertips together and count from 1 to 10 slowly.',
              'Remind yourself: "This feeling is a wave; it will pass naturally."',
              'Listen to soothing rain audio for 60 seconds.',
              'Write 1 boundary you will set today to protect your energy.',
              'Rest your head back against a pillow and relax your forehead muscles.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'disgusted',
    name: 'DISGUSTED',
    cloudColor: '#a7f3d0',
    subCategories: [
      {
        id: 'disapproved',
        name: 'Disapproved',
        icon: '👎',
        feelings: [
          {
            id: 'judgmental',
            name: 'Judgmental',
            icon: '⚖️',
            targetMood: 'Accepting & Open-Minded 🌿',
            actions: [
              'Take a deep breath and whisper: "I choose peace over judgment."',
              'Flex and release your hands 5 times to release tension.',
              'Name 1 positive trait about yourself or the situation.',
              'Imagine placing the negative thought into a leaf floating down a river.',
              'Drink a refreshing glass of lemon water.',
              'Roll your neck gently from side to side 3 times.',
              'Smile gently and let your shoulders drop down away from your ears.',
              'Write down 1 thing you are letting go of right now.',
              'Focus on your breath rising and falling in your chest.',
              'Remind yourself: "Everyone is on their own unique journey."'
            ]
          }
        ]
      },
      {
        id: 'repelled',
        name: 'Repelled',
        icon: '🚫',
        feelings: [
          {
            id: 'revolted',
            name: 'Revolted',
            icon: '🌊',
            targetMood: 'Cleansed & Refreshed 🧼',
            actions: [
              'Wash your hands with warm water and sweet-scented soap mindfully.',
              'Take 3 deep cleansing exhales out through your mouth.',
              'Step into a clean, well-lit room or open a fresh window.',
              'Wipe down your desktop or phone screen for a fresh start.',
              'Inhale fresh air deeply for 4 seconds and exhale fully.',
              'Visualize washing away all negative energy with clear spring water.',
              'Change your physical sitting position or stretch upward.',
              'Drink a sip of fresh cold water.',
              'Repeat: "I clear my space and protect my inner peace."',
              'Look at a bright image of nature or green trees.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'angry',
    name: 'ANGRY',
    cloudColor: '#f87171',
    subCategories: [
      {
        id: 'mad',
        name: 'Mad',
        icon: '🔥',
        feelings: [
          {
            id: 'furious',
            name: 'Furious',
            icon: '💥',
            targetMood: 'Calm & In Control ⚓',
            actions: [
              'Tense all your muscles tightly for 5 seconds, then release completely.',
              'Take 4 fast exhales through your mouth like blowing out candles.',
              'Walk briskly around the room for 60 seconds to release adrenaline.',
              'Hold an ice cube in your hand or splash cold water on your face.',
              'Write down the source of anger on a piece of paper and fold it away.',
              'Count backward from 20 to 1 slowly.',
              'Press your palms firmly together for 10 seconds, then relax.',
              'Say out loud: "I control my actions even when I feel angry."',
              'Listen to 1 minute of calming rain noise.',
              'Inhale deeply and imagine cooling blue light filling your body.'
            ]
          },
          {
            id: 'frustrated',
            name: 'Frustrated',
            icon: '⚡',
            targetMood: 'Patient & Clear-Minded 💡',
            actions: [
              'Step back from your screen or task and take 3 deep belly breaths.',
              'Say: "One step at a time. I don\'t need to solve everything right now."',
              'Stretch your arms high above your head and reach for the ceiling.',
              'Identify the single smallest action you can take next.',
              'Drink a full glass of water slowly.',
              'Write down what is within your control vs outside your control.',
              'Close your eyes and count 5 slow breaths.',
              'Shake out your hands and fingers vigorously for 10 seconds.',
              'Remind yourself: "Frustration is proof that I care, but peace is my priority."',
              'Look out the window at the distant horizon for 60 seconds.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'fearful',
    name: 'FEARFUL',
    cloudColor: '#c084fc',
    subCategories: [
      {
        id: 'anxious',
        name: 'Anxious',
        icon: '🌀',
        feelings: [
          {
            id: 'overwhelmed',
            name: 'Overwhelmed',
            icon: '🌊',
            targetMood: 'Grounded & Organized 🧩',
            actions: [
              'Practice 5-4-3-2-1 grounding: Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.',
              'Write down only the TOP 1 priority for today and hide the rest.',
              'Do the 4-7-8 breathing exercise for 60 seconds.',
              'Drop your shoulders and place your hands flat on your thighs.',
              'Say out loud: "I am safe in this room right now."',
              'Place a cold damp towel on your wrist or neck.',
              'Listen to 1 minute of soothing ocean soundscape.',
              'Unclench your teeth and let your tongue rest on the floor of your mouth.',
              'Stretch your legs out and point and flex your toes.',
              'Say: "I do not have to finish everything today."'
            ]
          },
          {
            id: 'scared',
            name: 'Scared',
            icon: '👁️',
            targetMood: 'Brave & Protected 🏰',
            actions: [
              'Place both feet firmly on the floor and feel the ground.',
              'Wrap your arms around your ribs and breathe deeply.',
              'Repeat 3 times: "I am stronger than my fear."',
              'Look around the room and name 3 things that are blue.',
              'Inhale deeply through your nose and exhale with a long sigh.',
              'Drink a sip of warm or cold water.',
              'Hold a familiar comforting object in your hands.',
              'Smile gently to activate positive neural pathways.',
              'Recall 1 hard situation you successfully navigated in the past.',
              'Listen to a 432Hz ambient relaxing chord.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bad',
    name: 'BAD',
    cloudColor: '#fbbf24',
    subCategories: [
      {
        id: 'bored',
        name: 'Bored',
        icon: '💤',
        feelings: [
          {
            id: 'apathetic',
            name: 'Apathetic',
            icon: '🌫️',
            targetMood: 'Curious & Energized ⚡',
            actions: [
              'Do 10 jumping jacks or stretch upward enthusiastically.',
              'Drink a glass of cold lemon water to wake up your senses.',
              'Write down 1 exciting goal you want to achieve this month.',
              'Listen to an upbeat audio tone for 60 seconds.',
              'Step outside and take 5 crisp deep breaths of fresh air.',
              'Change your immediate seating or lighting environment.',
              'Wash your face with cool refreshing water.',
              'Name 1 new thing you want to learn about today.',
              'Smile widely for 15 seconds to boost endorphins.',
              'Do 5 slow deep breaths while stretching your wrist and arms.'
            ]
          }
        ]
      },
      {
        id: 'stuck',
        name: 'Stuck',
        icon: '🔒',
        feelings: [
          {
            id: 'trapped',
            name: 'Trapped',
            icon: '🚪',
            targetMood: 'Free & Action-Oriented 🚀',
            actions: [
              'Open a window or door and look into the open sky.',
              'Take 1 tiny physical action (e.g. clean 1 pen off your desk).',
              'Stand up and swing your arms gently back and forth for 60 seconds.',
              'Say: "I always have choices, even small ones."',
              'Write down 3 alternative paths you could take next.',
              'Take 3 deep, expansive inhales expanding your ribcage.',
              'Roll your ankles and stretch your feet.',
              'Drink a glass of water to refresh your focus.',
              'Remind yourself: "Stuck is a feeling, not a permanent fact."',
              'Listen to 1 minute of calming rain sounds.'
            ]
          }
        ]
      }
    ]
  }
];

export function getActionForFeeling(feelingId: string, visitedCount: number = 0): { targetMood: string; actionText: string } {
  for (const family of MOOD_DATA) {
    for (const sub of family.subCategories) {
      for (const feeling of sub.feelings) {
        if (feeling.id === feelingId || feeling.name.toLowerCase() === feelingId.toLowerCase()) {
          const actionIndex = visitedCount % feeling.actions.length;
          return {
            targetMood: feeling.targetMood,
            actionText: feeling.actions[actionIndex]
          };
        }
      }
    }
  }

  // Default fallback pairing
  return {
    targetMood: 'Peaceful & Grounded 🧘',
    actionText: 'Take 3 slow deep breaths: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.'
  };
}
