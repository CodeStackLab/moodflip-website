export interface FeelingDetail {
  id: string;
  name: string;
  iconName: string;
  targetMood: string;
  actions: string[];
}

export interface MoodSubCategory {
  id: string;
  name: string;
  iconName: string;
  feelings: FeelingDetail[];
}

export interface MoodFamily {
  id: string;
  name: string;
  cloudColor: string;
  subCategories: MoodSubCategory[];
}

export const MOOD_DATA: MoodFamily[] = [
  {
    id: 'sad',
    name: 'Sad',
    cloudColor: '#93c5fd',
    subCategories: [
      {
        id: 'lonely',
        name: 'Lonely',
        iconName: 'Lonely',
        feelings: [
          {
            id: 'lonely_feeling',
            name: 'Lonely',
            iconName: 'Lonely',
            targetMood: 'Peaceful',
            actions: [
              'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.',
              'Place a warm hand over your heart, close your eyes, and feel your heartbeat for 60 seconds.',
              'Send a 1-sentence text to a friend or relative: "Thinking of you today!"',
              'Step outside or look out a window and name 3 things in nature that connect us all.'
            ]
          }
        ]
      },
      {
        id: 'rejected',
        name: 'Rejected',
        iconName: 'Rejected',
        feelings: [
          {
            id: 'rejected_feeling',
            name: 'Rejected',
            iconName: 'Rejected',
            targetMood: 'Valued & Accepted',
            actions: [
              'Remind yourself out loud: "My worth is not defined by others\' approval."',
              'Write down 3 personal qualities that make you a caring friend or partner.',
              'Place your hand over your chest and take 5 slow, comforting deep breaths.',
              'Focus on 1 person or place where you feel completely safe and appreciated.'
            ]
          }
        ]
      },
      {
        id: 'hurt',
        name: 'Hurt',
        iconName: 'Hurt',
        feelings: [
          {
            id: 'hurt_feeling',
            name: 'Hurt',
            iconName: 'Hurt',
            targetMood: 'Healed & Comforted',
            actions: [
              'Give yourself a gentle embrace for 60 seconds and acknowledge your feelings without judgment.',
              'Drink a soothing glass of warm water or tea mindfully.',
              'Whisper to yourself: "I am allowed to feel hurt, and I am also allowed to heal."',
              'Inhale deeply and imagine releasing the sting of painful words with your exhale.'
            ]
          }
        ]
      },
      {
        id: 'ashamed',
        name: 'Ashamed',
        iconName: 'Ashamed',
        feelings: [
          {
            id: 'ashamed_feeling',
            name: 'Ashamed',
            iconName: 'Ashamed',
            targetMood: 'Self-Forgiving',
            actions: [
              'Say out loud: "I made a mistake, but I am not a mistake."',
              'Place your palm on your forehead, drop your shoulders, and take 3 deep breaths.',
              'Write down 1 thing you learned from this experience.',
              'Remind yourself: "Growth happens when we extend compassion to our past selves."'
            ]
          }
        ]
      },
      {
        id: 'guilty',
        name: 'Guilty',
        iconName: 'Guilty',
        feelings: [
          {
            id: 'guilty_feeling',
            name: 'Guilty',
            iconName: 'Guilty',
            targetMood: 'Unburdened',
            actions: [
              'Identify 1 constructive action you can take to make amends, or forgive yourself.',
              'Inhale deeply for 4 seconds, hold for 4, and exhale out all heaviness.',
              'Write down your feeling on paper, then safely tear it into tiny pieces.',
              'Repeat: "I release what I cannot change and choose to move forward with grace."'
            ]
          }
        ]
      },
      {
        id: 'empty',
        name: 'Empty',
        iconName: 'Empty',
        feelings: [
          {
            id: 'empty_feeling',
            name: 'Empty',
            iconName: 'Empty',
            targetMood: 'Replenished',
            actions: [
              'Hold a warm mug or cup in both hands and feel its gentle warmth.',
              'Look at a vibrant plant or green leaves for 60 seconds.',
              'Do a quick gentle stretch, reaching your hands up to the sky.',
              'Listen to 1 minute of calming ambient rain or nature soundscape.'
            ]
          }
        ]
      },
      {
        id: 'overwhelmed',
        name: 'Overwhelmed',
        iconName: 'Overwhelmed',
        feelings: [
          {
            id: 'overwhelmed_feeling',
            name: 'Overwhelmed',
            iconName: 'Overwhelmed',
            targetMood: 'Calm & Grounded',
            actions: [
              'Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.',
              'Write down only the single next step you need to take right now.',
              'Close your eyes and count 10 slow, rhythmic deep breaths.',
              'Step away from screens and stretch your back and arms for 60 seconds.'
            ]
          }
        ]
      },
      {
        id: 'abandoned',
        name: 'Abandoned',
        iconName: 'Abandoned',
        feelings: [
          {
            id: 'abandoned_feeling',
            name: 'Abandoned',
            iconName: 'Abandoned',
            targetMood: 'Secure & Supported',
            actions: [
              'Wrap a soft blanket around yourself and ground your feet into the floor.',
              'Repeat 3 times: "I am safe in this body and I anchor myself right now."',
              'Drink a cold sip of water and notice the sensation in your throat.',
              'Reach out to someone who brings calm into your life.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'fearful',
    name: 'Fearful',
    cloudColor: '#c084fc',
    subCategories: [
      {
        id: 'anxious',
        name: 'Anxious',
        iconName: 'Overwhelmed',
        feelings: [
          {
            id: 'anxious_feeling',
            name: 'Anxious',
            iconName: 'Overwhelmed',
            targetMood: 'Calm & Safe',
            actions: [
              'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.',
              'Press both feet firmly into the floor and feel the earth supporting you.',
              'Place a cold wet cloth on your wrist or back of your neck.',
              'Remind yourself: "Anxiety is an ocean wave. It will peak and wash away."'
            ]
          }
        ]
      },
      {
        id: 'scared',
        name: 'Scared',
        iconName: 'Abandoned',
        feelings: [
          {
            id: 'scared_feeling',
            name: 'Scared',
            iconName: 'Abandoned',
            targetMood: 'Protected & Bold',
            actions: [
              'Hug your elbows tightly and take 3 deep belly breaths.',
              'Look around the room and list 3 solid, immovable objects.',
              'Say out loud: "I am safe right here and right now."'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'angry',
    name: 'Angry',
    cloudColor: '#f87171',
    subCategories: [
      {
        id: 'furious',
        name: 'Furious',
        iconName: 'Hurt',
        feelings: [
          {
            id: 'furious_feeling',
            name: 'Furious',
            iconName: 'Hurt',
            targetMood: 'Peaceful & Cool',
            actions: [
              'Clench your fists tightly for 5 seconds, then let go completely.',
              'Exhale strongly through your mouth like blowing out candles.',
              'Splash cool water over your face and neck.'
            ]
          }
        ]
      },
      {
        id: 'frustrated',
        name: 'Frustrated',
        iconName: 'Rejected',
        feelings: [
          {
            id: 'frustrated_feeling',
            name: 'Frustrated',
            iconName: 'Rejected',
            targetMood: 'Patient & Focused',
            actions: [
              'Shake out your hands and arms for 15 seconds to release physical tension.',
              'Say: "One step at a time. I don\'t have to fix everything today."',
              'Take a 60-second walk around the room.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'disgusted',
    name: 'Disgusted',
    cloudColor: '#6ee7b7',
    subCategories: [
      {
        id: 'repelled',
        name: 'Repelled',
        iconName: 'Guilty',
        feelings: [
          {
            id: 'repelled_feeling',
            name: 'Repelled',
            iconName: 'Guilty',
            targetMood: 'Cleansed & Clear',
            actions: [
              'Wash your hands mindfully with fragrant warm soap.',
              'Open a window and take 3 deep inhales of fresh outdoor air.',
              'Change your sitting posture and look up at the sky.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'stressed',
    name: 'Stressed',
    cloudColor: '#fbbf24',
    subCategories: [
      {
        id: 'pressured',
        name: 'Pressured',
        iconName: 'Overwhelmed',
        feelings: [
          {
            id: 'pressured_feeling',
            name: 'Pressured',
            iconName: 'Overwhelmed',
            targetMood: 'Relaxed & Unburdened',
            actions: [
              'Roll your shoulders back 5 times and let your posture soften.',
              'Close your eyes and visualize a quiet, serene beach setting.',
              'Drink a full glass of cold water mindfully.'
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
        if (feeling.id === feelingId || feeling.name.toLowerCase() === feelingId.toLowerCase() || sub.id === feelingId) {
          const actionIndex = visitedCount % feeling.actions.length;
          return {
            targetMood: feeling.targetMood,
            actionText: feeling.actions[actionIndex]
          };
        }
      }
    }
  }

  return {
    targetMood: 'Peaceful',
    actionText: 'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.'
  };
}
