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
    name: 'SAD',
    cloudColor: '#93c5fd',
    subCategories: [
      {
        id: 'lonely',
        name: 'Lonely',
        iconName: 'Lonely',
        feelings: [
          {
            id: 'isolated',
            name: 'Isolated',
            iconName: 'Lonely',
            targetMood: 'Connected & Supported',
            actions: [
              'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.',
              'Place a warm hand over your heart, close your eyes, and feel your heartbeat for 60 seconds.',
              'Send a 1-sentence text to a friend or relative: "Thinking of you today!"',
              'Step outside or look out a window and name 3 things in nature that connect us all.',
              'Hug a pillow or wrap a blanket around your shoulders and feel instant physical warmth.',
              'Write down the name of 1 person who has shown you kindness in the past.',
              'Place both feet firmly on the ground and feel the earth supporting you right now.',
              'Drink a warm cup of water or tea mindfully, paying attention to each gentle sip.',
              'Listen to 60 seconds of gentle instrumental acoustic music.',
              'Remind yourself out loud: "I am worthy of love and connection, even in quiet moments."'
            ]
          },
          {
            id: 'abandoned',
            name: 'Abandoned',
            iconName: 'Abandoned',
            targetMood: 'Secure & Valued',
            actions: [
              'Wrap a soft blanket around yourself and ground your feet into the floor.',
              'Repeat 3 times: "I am safe in this body and I anchor myself right now."',
              'Drink a cold sip of water and notice the calming sensation in your throat.',
              'Reach out to someone or write down a favorite memory with a true friend.',
              'Place your hands flat against a desk or table and feel its solid stability.',
              'Inhale deeply for 4 seconds, hold for 4 seconds, and release all tension.',
              'Look at your reflection in a mirror and whisper: "I will never abandon myself."',
              'Close your eyes and visualize a warm, safe sanctuary filled with soft light.',
              'Stretch your arms wide to open your heart space for 60 seconds.',
              'Acknowledge your pain gently without judging yourself for feeling vulnerable.'
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
            id: 'disappointed',
            name: 'Disappointed',
            iconName: 'Hurt',
            targetMood: 'Hopeful & Relieved',
            actions: [
              'Give yourself a gentle embrace for 60 seconds and acknowledge your feelings without judgment.',
              'Drink a soothing glass of warm water or tea mindfully.',
              'Whisper to yourself: "I am allowed to feel hurt, and I am also allowed to heal."',
              'Inhale deeply and imagine releasing the sting of painful words with your exhale.',
              'Write down what hurt you on a piece of paper, fold it, and set it aside.',
              'Place your palm on your chest and say: "This setback does not define my future."',
              'Do a slow shoulder roll 5 times to let go of physical burden.',
              'Take 3 deep abdominal breaths, blowing out the air through soft lips.',
              'Look at a green plant or flower to remind yourself of natural resilience.',
              'Focus on 1 small thing going well in your life right now.'
            ]
          },
          {
            id: 'rejected',
            name: 'Rejected',
            iconName: 'Rejected',
            targetMood: 'Valued & Accepted',
            actions: [
              'Remind yourself out loud: "My worth is not defined by others\' approval."',
              'Write down 3 personal qualities that make you a caring friend or partner.',
              'Place your hand over your chest and take 5 slow, comforting deep breaths.',
              'Focus on 1 person or place where you feel completely safe and appreciated.',
              'Stand tall, open your posture, and take a confident deep breath.',
              'Remind yourself: "Rejection is often just redirection toward what is truly for me."',
              'Give yourself credit for putting yourself out there with courage.',
              'Gently massage your temples and forehead for 60 seconds.',
              'Smile softly to yourself in a mirror for 30 seconds to stimulate soothing endorphins.',
              'Say aloud: "I accept and honor myself exactly as I am right now."'
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
            id: 'guilty',
            name: 'Guilty',
            iconName: 'Guilty',
            targetMood: 'Unburdened & Forgiven',
            actions: [
              'Say out loud: "I made a mistake, but I am not a mistake."',
              'Place your palm on your forehead, drop your shoulders, and take 3 deep breaths.',
              'Write down 1 thing you learned from this experience.',
              'Remind yourself: "Growth happens when we extend compassion to our past selves."',
              'Inhale deeply for 4 seconds, hold for 4, and exhale out all heaviness.',
              'Identify 1 constructive action you can take to make amends, or forgive yourself.',
              'Write down your guilt on paper, then safely tear it into tiny pieces.',
              'Repeat: "I release what I cannot change and choose to move forward with grace."',
              'Place your hands on your heart and offer yourself unconditional forgiveness.',
              'Visualize washing away shame under a warm, refreshing waterfall.'
            ]
          }
        ]
      },
      {
        id: 'depressed',
        name: 'Depressed',
        iconName: 'Empty',
        feelings: [
          {
            id: 'empty',
            name: 'Empty',
            iconName: 'Empty',
            targetMood: 'Replenished & Alive',
            actions: [
              'Hold a warm mug or cup in both hands and feel its gentle warmth.',
              'Look at a vibrant plant or green leaves for 60 seconds.',
              'Do a quick gentle stretch, reaching your hands up to the sky.',
              'Listen to 1 minute of calming ambient rain or nature soundscape.',
              'Splash cool water on your face to awaken your senses.',
              'Light a scented candle or smell a fresh citrus fruit.',
              'Place your hand over your stomach and feel 5 gentle breaths move your belly.',
              'Step into sunlight or bright light for 60 seconds.',
              'Wiggle your toes and fingertips to reconnect with your physical body.',
              'Tell yourself: "This feeling is temporary. Energy and light will return."'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'disgusted',
    name: 'DISGUSTED',
    cloudColor: '#6ee7b7',
    subCategories: [
      {
        id: 'repelled',
        name: 'Repelled',
        iconName: 'Guilty',
        feelings: [
          {
            id: 'hesitant',
            name: 'Hesitant',
            iconName: 'Guilty',
            targetMood: 'Cleansed & Clear',
            actions: [
              'Wash your hands mindfully with fragrant warm soap for 60 seconds.',
              'Open a window and take 3 deep inhales of fresh outdoor air.',
              'Change your sitting posture and look up at the bright sky.',
              'Drink a crisp glass of cold lemon water to refresh your system.',
              'Step away from unpleasant surroundings or digital screens for 1 minute.',
              'Wipe off your desk or phone screen for a clean, fresh start.',
              'Take 4 deep breaths, imagining exhaling toxic thoughts out of your body.',
              'Shake out your limbs as if shaking off unpleasant dust.',
              'Roll your neck gently from side to side to release stiffness.',
              'Declare firmly: "I clear my space and choose uplifting thoughts."'
            ]
          }
        ]
      },
      {
        id: 'awful',
        name: 'Awful',
        iconName: 'Hurt',
        feelings: [
          {
            id: 'detestable',
            name: 'Detestable',
            iconName: 'Hurt',
            targetMood: 'Refreshed & Purified',
            actions: [
              'Rinse your mouth with cold water and freshen your face.',
              'Breathe in deeply through your nose and exhale a loud sigh through your mouth.',
              'Stretch your spine tall and drop your shoulders away from your ears.',
              'Light a lavender or mint incense or essential oil.',
              'Look at a clean, beautiful artwork or photo for 60 seconds.',
              'Take 3 slow deep breaths while focusing on clean white light.',
              'Wipe your hands with a damp cloth to feel renewed.',
              'Say out loud: "I step away from negativity into purity and ease."',
              'Smooth out your clothes and ground your stance.',
              'Smile gently to reset your neural pathways.'
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
        id: 'furious',
        name: 'Furious',
        iconName: 'Hurt',
        feelings: [
          {
            id: 'enraged',
            name: 'Enraged',
            iconName: 'Hurt',
            targetMood: 'Peaceful & Cool',
            actions: [
              'Clench your fists tightly for 5 seconds, then let go completely.',
              'Exhale strongly through your mouth like blowing out birthday candles.',
              'Splash cool water over your face and neck for instant relief.',
              'Press your palms together firmly at chest height for 10 seconds, then release.',
              'Pace back and forth for 60 seconds to discharge surplus tension.',
              'Squeeze a stress ball or cushion firmly for 15 seconds.',
              'Count backward from 20 to 1 slowly while breathing steadily.',
              'Say quietly: "I am in control of my reaction and I choose peace."',
              'Place a cold ice cube in your palm and focus on the cold sensation.',
              'Unclench your teeth and drop your tongue away from the roof of your mouth.'
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
            id: 'annoyed',
            name: 'Annoyed',
            iconName: 'Rejected',
            targetMood: 'Patient & Focused',
            actions: [
              'Shake out your hands and arms for 15 seconds to release physical tension.',
              'Say: "One step at a time. I don\'t have to fix everything today."',
              'Take a 60-second walk around the room or hallway.',
              'Take 3 slow, deep abdominal breaths, relaxing your stomach muscle.',
              'Write down the 1 thing annoying you, then cross it out firmly.',
              'Pause what you are doing and close your eyes for 30 seconds of quiet stillness.',
              'Stretch your arms overhead and lengthen your ribs.',
              'Remind yourself: "Patience with myself creates space for solutions."',
              'Drink 5 slow gulps of fresh cold water.',
              'Look out a window toward the horizon to widen your perspective.'
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
        iconName: 'Overwhelmed',
        feelings: [
          {
            id: 'overwhelmed',
            name: 'Overwhelmed',
            iconName: 'Overwhelmed',
            targetMood: 'Calm & Safe',
            actions: [
              'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.',
              'Press both feet firmly into the floor and feel the earth supporting you.',
              'Place a cold wet cloth on your wrist or back of your neck.',
              'Remind yourself: "Anxiety is an ocean wave. It will peak and wash away."',
              'Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.',
              'Write down only the single next step you need to take right now.',
              'Close your eyes and count 10 slow, rhythmic deep breaths.',
              'Step away from screens and stretch your back and arms for 60 seconds.',
              'Place a hand on your heart and hand on your belly, breathing slowly.',
              'Whisper: "Right now, in this exact moment, I am safe and secure."'
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
            id: 'terrified',
            name: 'Terrified',
            iconName: 'Abandoned',
            targetMood: 'Protected & Bold',
            actions: [
              'Hug your elbows tightly and take 3 deep belly breaths.',
              'Look around the room and list 3 solid, immovable objects.',
              'Say out loud: "I am safe right here and right now."',
              'Ground yourself by pushing your knuckles gently against your thighs.',
              'Breathe in calm courage, breathe out fear and uncertainty.',
              'Recall a time when you overcame a tough challenge bravely.',
              'Hold a familiar comfort object or warm cup in your hands.',
              'Turn on a bright light or open curtains to illuminate your space.',
              'Repeat 3 times: "My mind is calm, my heart is steady, I am safe."',
              'Focus entirely on the rhythmic sound of your breathing for 60 seconds.'
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
        id: 'busy',
        name: 'Busy',
        iconName: 'Overwhelmed',
        feelings: [
          {
            id: 'pressured',
            name: 'Pressured',
            iconName: 'Overwhelmed',
            targetMood: 'Relaxed & Unburdened',
            actions: [
              'Roll your shoulders back 5 times and let your posture soften.',
              'Close your eyes and visualize a quiet, serene beach setting.',
              'Drink a full glass of cold water mindfully.',
              'Put your phone on silent for 60 seconds of complete quiet.',
              'Take 3 deep, slow breaths and relax your jaw muscle completely.',
              'Tell yourself: "It is okay to pause. Resting makes me stronger."',
              'Unclench your hands and rest them softly on your lap.',
              'Inhale peace for 4 seconds, exhale pressure for 6 seconds.',
              'Look away from all work tasks and focus on a pleasant memory.',
              'Remind yourself: "My productivity does not define my worth as a person."'
            ]
          }
        ]
      },
      {
        id: 'bored',
        name: 'Bored',
        iconName: 'Empty',
        feelings: [
          {
            id: 'apathetic',
            name: 'Apathetic',
            iconName: 'Empty',
            targetMood: 'Energized & Inspired',
            actions: [
              'Do 10 jumping jacks or stretch your arms high above your head.',
              'Drink a cold glass of lemon water to stimulate your taste senses.',
              'Listen to 60 seconds of an upbeat song that makes you smile.',
              'Step outside into fresh air and take 3 deep revitalizing breaths.',
              'Write down 1 creative idea or fun activity you want to try this week.',
              'Do a 60-second quick desk tidy to clear your focus.',
              'Change your sitting position or switch rooms for a fresh perspective.',
              'Look up a inspiring quote or uplifting story online.',
              'Give your hands and feet a vigorous shake to boost blood circulation.',
              'Smile broadly for 20 seconds to kickstart positive brain chemistry.'
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
