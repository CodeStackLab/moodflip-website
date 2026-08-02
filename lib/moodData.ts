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
            id: 'lonely',
            name: 'Lonely',
            iconName: 'Lonely',
            targetMood: 'Peaceful',
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
            targetMood: 'Secure',
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
            targetMood: 'Hopeful',
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
            targetMood: 'Valued',
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
          },
          {
            id: 'hurt',
            name: 'Hurt',
            iconName: 'Hurt',
            targetMood: 'Healed',
            actions: [
              'Place a hand over your chest and offer yourself deep self-compassion.',
              'Inhale warmth and exhale painful memories for 60 seconds.',
              'Remind yourself: "Pain is valid, but healing is my innate power."',
              'Drink a soothing glass of warm tea or water.',
              'Drop your shoulders and release physical tightness in your torso.',
              'Write a single sentence about what you are ready to let go of.',
              'Close your eyes and picture warm golden light filling your chest.',
              'Take 5 slow deep breaths while softening your facial muscles.',
              'Gently massage your own hands for 60 seconds as an act of self-care.',
              'Say aloud: "I give myself permission to heal at my own pace."'
            ]
          },
          {
            id: 'grief',
            name: 'Grieving',
            iconName: 'Hurt',
            targetMood: 'Comforted',
            actions: [
              'Wrap your arms around your shoulders for a warm 60-second embrace.',
              'Breathe in soft peace and acknowledge your tender heart.',
              'Say quietly: "It is okay to rest and let myself feel comforted."',
              'Look at a peaceful sky or nature image for 1 minute.',
              'Light a candle or focus on a soft comforting glow.',
              'Drink a warm cup of herbal tea slowly and mindfully.',
              'Write down the name of someone whose memory brings you warmth.',
              'Place your feet flat on the floor and feel the solid earth beneath you.',
              'Allow your tears to flow for 60 seconds without judgment or resistance.',
              'Remind yourself: "Grief is love with nowhere to go. It is sacred."'
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
            targetMood: 'Unburdened',
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
            targetMood: 'Replenished',
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
            id: 'anxious',
            name: 'Anxious',
            iconName: 'Overwhelmed',
            targetMood: 'Calm',
            actions: [
              'Inhale for 4 seconds, hold for 7 seconds, exhale slowly for 8 seconds.',
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
          },
          {
            id: 'overwhelmed',
            name: 'Overwhelmed',
            iconName: 'Overwhelmed',
            targetMood: 'Clear',
            actions: [
              'Close your eyes, drop your shoulders, and take 3 slow belly breaths.',
              'Write down the top 3 tasks cluttering your mind, then pick just ONE to start.',
              'Clear off everything on your desk except what you are currently holding.',
              'Inhale deeply through your nose and exhale out loud with a sigh of relief.',
              'Set a timer for 60 seconds and do nothing but watch your chest rise and fall.',
              'Say out loud: "I do not have to solve everything today. I only need to do this moment."',
              'Unclench your jaw and tongue completely.',
              'Drink a full glass of cool water without rushing.',
              'Place your palm over your forehead and gently exhale tension.',
              'Step into another room or look out a window for 1 minute.'
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
            targetMood: 'Protected',
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
          },
          {
            id: 'insecure',
            name: 'Insecure',
            iconName: 'Ashamed',
            targetMood: 'Confident',
            actions: [
              'Stand tall with your chin level and shoulders pulled back for 60 seconds.',
              'State 1 fact about your strengths that nobody can take away from you.',
              'Place your hand over your solar plexus and take 3 deep, steadying breaths.',
              'Replace a self-doubting thought with: "I am learning, growing, and capable."',
              'Look straight ahead and take 3 slow, deep inhales of courage.',
              'Write down one compliment someone gave you recently.',
              'Remember that everyone makes mistakes and perfection is not required.',
              'Put your hand on your heart and feel your own internal power.',
              'Unclench your hands and extend your fingers wide.',
              'Say aloud: "I trust myself to handle whatever comes next."'
            ]
          },
          {
            id: 'nervous',
            name: 'Nervous',
            iconName: 'Overwhelmed',
            targetMood: 'Composed',
            actions: [
              'Take 4 quick inhales followed by 1 long, slow exhale.',
              'Shake out both hands as if flicking water off your fingertips.',
              'Squeeze your toes tightly into the floor for 5 seconds, then release.',
              'Whisper to yourself: "Nervousness is just energy waiting to be channeled."',
              'Drink 3 slow sips of room-temperature water.',
              'Focus your gaze on a single stationary object for 30 seconds.',
              'Place your right hand over your left arm and give it a reassuring press.',
              'Breathe in for 4 counts, hold for 4, exhale for 4.',
              'Remind yourself of past times you succeeded when feeling nervous.',
              'Soften your eyes and relax the space between your eyebrows.'
            ]
          },
          {
            id: 'frozen',
            name: 'Frozen',
            iconName: 'Empty',
            targetMood: 'Active',
            actions: [
              'Wiggle your toes 10 times to send movement signals back to your brain.',
              'Rotate your ankles in slow circles 5 times each.',
              'Clap your hands together gently 3 times.',
              'Take a deep breath and make a tiny physical movement (like lifting an arm).',
              'Hum a low note for 10 seconds to stimulate the vagus nerve.',
              'Look left, then right, slowly observing your physical safety.',
              'Reach out and touch a textured surface near you.',
              'Say out loud: "I am unfreezing step by step."',
              'Take 3 sharp inhales through the nose and exhale forcefully.',
              'Stand up or shift your torso to break the physical stillness.'
            ]
          },
          {
            id: 'panicked',
            name: 'Panicked',
            iconName: 'Overwhelmed',
            targetMood: 'Grounded',
            actions: [
              'Focus on 5 deep, slow belly breaths right now.',
              'Splash cold water on your wrists to lower your heart rate.',
              'Say quietly: "I am completely safe in this room right now."',
              'Press your feet firmly into the floor and feel solid ground.',
              'Hold a comforting object in your hands for 60 seconds.',
              'Look around and name 3 things that are completely still and stable.',
              'Count backwards from 10 very slowly while breathing steadily.',
              'Unclench your jaw and let your tongue drop away from the roof of your mouth.',
              'Place one hand on your belly and one on your chest and feel them rise.',
              'Repeat quietly: "This panic will pass. It always does. I am safe."'
            ]
          },
          {
            id: 'helpless',
            name: 'Helpless',
            iconName: 'Abandoned',
            targetMood: 'Empowered',
            actions: [
              'State 1 small choice you have control over right now.',
              'Stand up tall and push your shoulders back.',
              'Inhale courage for 4 counts, exhale helplessness.',
              'Say out loud: "I have power over my immediate actions."',
              'Take 1 tiny physical step forward.',
              'Write down one problem and then write the very next micro-step to address it.',
              'Drink a full glass of cold water deliberately and mindfully.',
              'Do 5 slow shoulder rolls backwards to open your chest space.',
              'Remind yourself: "I have survived 100% of my difficult days so far."',
              'Stretch your arms overhead for 30 seconds to activate your body.'
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
            targetMood: 'Tranquil',
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
          },
          {
            id: 'annoyed',
            name: 'Annoyed',
            iconName: 'Rejected',
            targetMood: 'Patient',
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
      },
      {
        id: 'frustrated',
        name: 'Frustrated',
        iconName: 'Rejected',
        feelings: [
          {
            id: 'frustrated',
            name: 'Frustrated',
            iconName: 'Rejected',
            targetMood: 'Calm',
            actions: [
              'Step back from what you are working on for 60 seconds.',
              'Take 3 deep exhales with a loud, relaxing audible sigh.',
              'Roll your neck slowly from side to side 4 times.',
              'Acknowledge: "Frustration is proof that I care about doing well."',
              'Change your physical position or stand up to reset your state.',
              'Focus on 1 tiny component you can resolve right now.',
              'Press your feet firmly into the floor and feel grounded.',
              'Unclench your hands and rest palms face up on your thighs.',
              'Take a 60-second drink break with cold water.',
              'Whisper: "I pause now so I can return with fresh clarity."'
            ]
          },
          {
            id: 'resentful',
            name: 'Resentful',
            iconName: 'Hurt',
            targetMood: 'Liberated',
            actions: [
              'Write the bitter thought on paper, then rip it up completely.',
              'Place your palm on your chest and say: "I release holding this weight."',
              'Take 4 deep breaths, exhaling resentment on each breath out.',
              'Focus your energy back on your own well-being and growth.',
              'Remind yourself: "Holding anger harms me more than anyone else."',
              'Stretch your shoulders and open your chest to release bitterness.',
              'Drink a full glass of cold water to refresh your body.',
              'Say out loud: "I reclaim my energy for positivity today."',
              'Close your eyes and picture letting go of heavy mental baggage.',
              'Wish yourself peace and inner freedom right now.'
            ]
          },
          {
            id: 'irritated',
            name: 'Irritated',
            iconName: 'Hurt',
            targetMood: 'Tranquil',
            actions: [
              'Drop your shoulders 2 inches down away from your ears.',
              'Close your eyes and listen to 30 seconds of quiet room ambience.',
              'Breathe in soft peace, exhale sharp irritation.',
              'Take a slow sip of water and feel it cool your internal temperature.',
              'Smooth out your forehead and relax your facial muscles.',
              'Say softly: "This disturbance will pass quickly."',
              'Step away from noise or loud sounds for 60 seconds.',
              'Place your hands on your ribs and feel 3 deep side-breaths.',
              'Gently massage the back of your neck with your fingers.',
              'Refocus your mind on a pleasant memory or calming scene.'
            ]
          },
          {
            id: 'betrayed',
            name: 'Betrayed',
            iconName: 'Abandoned',
            targetMood: 'Resilient',
            actions: [
              'Place both hands firmly over your heart space.',
              'Say aloud: "I trust myself and my own inner strength."',
              'Inhale deeply for 4 counts, hold for 4, exhale for 6.',
              'Remind yourself: "Others actions reflect them, not my worth."',
              'Wrap your arms around your shoulders for a grounding self-hug.',
              'Feel the solid ground underneath your feet supporting you.',
              'Drink a soothing glass of warm water.',
              'Focus on 1 person in your life who has always been trustworthy.',
              'Release physical tightness in your stomach with a deep belly breath.',
              'Declare: "I stand strong and honour my own integrity."'
            ]
          },
          {
            id: 'furious',
            name: 'Furious',
            iconName: 'Hurt',
            targetMood: 'Calm & Centered',
            actions: [
              'Exhale a strong, releasing breath and unbind your fists.',
              'Place your hands on a sturdy surface and ground your weight.',
              'Say quietly: "I choose peace over fury right now."',
              'Drink a cool glass of water to refresh your body.',
              'Count down from 10 to 1 slowly.',
              'Clench both fists for 5 seconds and then release completely.',
              'Walk away from the situation for 60 seconds before responding.',
              'Splash cold water on your wrists and back of neck.',
              'Press your palms firmly together at chest height for 10 seconds.',
              'Inhale for 4 counts, hold for 4 counts, exhale for 8 counts.'
            ]
          },
          {
            id: 'hostile',
            name: 'Hostile',
            iconName: 'Hurt',
            targetMood: 'Peaceful',
            actions: [
              'Step back physically and drop your jaw and shoulders.',
              'Take 3 deep breaths, exhaling all sharp tension.',
              'Say softly: "I protect my inner tranquility."',
              'Unclench your chest and open your posture.',
              'Focus on a peaceful, quiet visual in your mind.',
              'Drink a cool glass of water slowly and deliberately.',
              'Loosen your grip on whatever you are holding.',
              'Look out a window at the sky for 30 seconds.',
              'Remind yourself: "I choose my response. I am not my reaction."',
              'Do 5 slow deep inhales through your nose and slow exhales through your mouth.'
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
            targetMood: 'Cleansed',
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
          },
          {
            id: 'detestable',
            name: 'Detestable',
            iconName: 'Hurt',
            targetMood: 'Refreshed',
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
          },
          {
            id: 'repelled',
            name: 'Repelled',
            iconName: 'Guilty',
            targetMood: 'Renewed',
            actions: [
              'Step away physically from whatever is causing repulsion.',
              'Breathe deeply through your nose while smelling a pleasant scent.',
              'Splash cool water over your wrists and forehead.',
              'Say: "I choose what I allow into my mental and physical space."',
              'Straighten your back and look up toward light.',
              'Drink a full glass of clear, clean water.',
              'Take 3 deep purging exhales.',
              'Place a hand on your stomach and breathe stability into your core.',
              'Focus on a clean, serene visual image in your mind.',
              'Shake out your arms and shoulders to reset physical boundaries.'
            ]
          },
          {
            id: 'disapproved',
            name: 'Disapproved',
            iconName: 'Rejected',
            targetMood: 'Accepted',
            actions: [
              'Place a hand on your heart and offer yourself complete acceptance.',
              'Inhale clarity and exhale external judgment.',
              'Say: "I approve of myself and honour my own standards."',
              'Stretch your arms wide to open your upper back.',
              'Drink a fresh glass of water mindfully.',
              'Write down 2 values you hold that no one can take from you.',
              'Stand tall and take 3 power breaths with your chest open.',
              'Remind yourself: "I do not need everyone to approve of me to thrive."',
              'Look at yourself in a mirror and give one genuine self-compliment.',
              'Shake out your hands as if releasing the weight of others opinions.'
            ]
          },
          {
            id: 'awful',
            name: 'Awful',
            iconName: 'Ashamed',
            targetMood: 'Purified',
            actions: [
              'Wash your face with cold water for an instant reset.',
              'Breathe in clean air and let go of unpleasant impressions.',
              'Say out loud: "I am fresh, clean, and renewed right now."',
              'Step out into fresh air for 60 seconds.',
              'Smooth out your hands and exhale deeply.',
              'Open a window and breathe 5 deep fresh breaths.',
              'Drink a full glass of cool lemon water to cleanse your system.',
              'Stretch your entire spine by reaching both arms high above your head.',
              'Close your eyes and visualize a warm shower washing away all negativity.',
              'Say firmly: "I reclaim my sense of ease and wellbeing right now."'
            ]
          },
          {
            id: 'revolted',
            name: 'Revolted',
            iconName: 'Empty',
            targetMood: 'Cleansed',
            actions: [
              'Take 3 sharp inhales of clean fresh air.',
              'Wipe off your hands and splash cold water.',
              'Focus on a clean, soothing natural landscape.',
              'Say: "I cleanse my energy and step into light."',
              'Drink a cool glass of water.',
              'Step away from the source of revulsion immediately.',
              'Inhale a pleasant smell like citrus or mint to reset your senses.',
              'Roll your shoulders back and breathe in clean calm air.',
              'Visualize a bright white light clearing all unpleasant energy.',
              'Declare: "I choose what enters my space and I choose purity."'
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
            id: 'embarrassed',
            name: 'Embarrassed',
            iconName: 'Ashamed',
            targetMood: 'Graceful',
            actions: [
              'Remind yourself: "Everyone has awkward moments; this will be forgotten soon."',
              'Place a cool hand over your warm cheeks or neck.',
              'Take 3 slow, deep abdominal breaths to calm your nervous system.',
              'Smile gently at the awkwardness and let out a light laugh.',
              'Say out loud: "I am human, and it is okay to be imperfect."',
              'Focus on your breathing for 60 seconds without replaying the moment.',
              'Unclench your toes and drop your shoulders.',
              'Drink a cold glass of water to lower physical warmth.',
              'Remember 1 thing you did today that went really well.',
              'Focus your attention on the task in front of you right now.'
            ]
          },
          {
            id: 'avoidant',
            name: 'Avoidant',
            iconName: 'Empty',
            targetMood: 'Engaged',
            actions: [
              'Commit to engaging for just 60 seconds without pressure.',
              'Take 3 grounding deep breaths in through nose, out through mouth.',
              'Break down the avoided item into the tiny step 1.',
              'Say to yourself: "Action reduces discomfort; I take 1 small step now."',
              'Stand up and stretch your arms high overhead.',
              'Drink a sip of fresh water.',
              'Count down 5-4-3-2-1 and take the first micro-action.',
              'Place your feet flat on the floor and feel your stability.',
              'Acknowledge your hesitation gently without judging yourself.',
              'Focus on how good it will feel when this task is completed.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'stressed',
    name: 'STRESSED',
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
            targetMood: 'Relaxed',
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
          },
          {
            id: 'rushed',
            name: 'Rushed',
            iconName: 'Overwhelmed',
            targetMood: 'Present',
            actions: [
              'Slow down your movements deliberately for 60 seconds.',
              'Take 3 deep, slow inhales and double the length of your exhales.',
              'Say aloud: "I have enough time for what truly matters right now."',
              'Place your hand over your belly and feel it rise and fall steadily.',
              'Unclench your fingers and open your palms.',
              'Take 5 slow, deliberate steps while feeling your feet connect with the ground.',
              'Pause what you are carrying and set it down for 30 seconds.',
              'Relax your eyes and soften your focus.',
              'Drink 3 slow sips of water.',
              'Remind yourself that rushing creates mistakes, calm creates efficiency.'
            ]
          }
        ]
      },
      {
        id: 'exhausted',
        name: 'Exhausted',
        iconName: 'Empty',
        feelings: [
          {
            id: 'exhausted',
            name: 'Exhausted',
            iconName: 'Empty',
            targetMood: 'Rested',
            actions: [
              'Close your eyes and rest your head on your desk or back of chair for 60 seconds.',
              'Take 3 gentle, soft breaths without forcing your lung capacity.',
              'Drink a full glass of room-temperature water to hydrate your cells.',
              'Place a warm compress or palms over your tired eyes.',
              'Tell yourself: "Resting is productive work for my nervous system."',
              'Dim your screen brightness or close electronic screens for 1 minute.',
              'Gently massage your earlobes for 30 seconds.',
              'Inhale soothing calm, exhale all heaviness.',
              'Stretch your legs out long and relax your calf muscles.',
              'Allow yourself to do nothing for 60 seconds guilt-free.'
            ]
          },
          {
            id: 'burned-out',
            name: 'Burned Out',
            iconName: 'Empty',
            targetMood: 'Rejuvenated',
            actions: [
              'Step away completely from your desk or work area for 60 seconds.',
              'Say out loud: "I give myself permission to set healthy boundaries today."',
              'Place your palm on your chest and listen to your natural breath.',
              'Look at greenery, a plant, or out the window at the sky.',
              'Drink cold water slowly and feel it refresh your body.',
              'Roll your shoulders and drop all physical responsibility for 1 minute.',
              'Inhale deeply for 4, hold for 4, release for 6.',
              'Write down 1 obligation you can say NO to today.',
              'Remind yourself: "I cannot pour from an empty cup."',
              'Give your mind 60 seconds of silent sanctuary.'
            ]
          },
          {
            id: 'restless',
            name: 'Restless',
            iconName: 'Overwhelmed',
            targetMood: 'Centered',
            actions: [
              'Do 10 slow arm raises up to the ceiling and back down.',
              'Press your palms together tightly for 10 seconds, then let go.',
              'Walk around your room while counting 20 deliberate steps.',
              'Focus on 3 slow, deep abdominal breaths to anchor your core.',
              'Place a weighted object or book on your lap for grounding physical feedback.',
              'Exhale out loud with a soft whistle sound.',
              'Shake out your leg muscles 5 times each.',
              'Say out loud: "I settle my mind and anchor my body here."',
              'Drink a glass of cold water to ground your attention.',
              'Focus on the texture of a surface under your fingers.'
            ]
          },
          {
            id: 'frazzled',
            name: 'Frazzled',
            iconName: 'Overwhelmed',
            targetMood: 'Serene',
            actions: [
              'Take 3 deep, slow abdominal breaths right now.',
              'Unclench your teeth and drop your shoulders.',
              'Say out loud: "I un-frazzle my mind step by step."',
              'Drink a slow glass of cold water.',
              'Focus on 1 calm object in your room.',
              'Close your eyes and count 10 slow breaths in complete silence.',
              'Splash cool water on your wrists to calm your nervous system.',
              'Step outside or open a window for 60 seconds of fresh air.',
              'Sit down quietly, uncross your legs, and relax your whole body.',
              'Whisper: "I am slowing down. I am reclaiming my calm now."'
            ]
          },
          {
            id: 'swamped',
            name: 'Swamped',
            iconName: 'Overwhelmed',
            targetMood: 'Organized',
            actions: [
              'Pick just 1 tiny task to focus on for the next 60 seconds.',
              'Close 5 open tabs on your screen to clear visual clutter.',
              'Take a deep breath and exhale out all confusion.',
              'Say: "I do not have to finish everything right now."',
              'Drink a sip of cold water and stretch.',
              'Write a brain dump of every task in your head, then star the single most urgent one.',
              'Set a 5-minute focus timer and work on only one thing until it rings.',
              'Clear your desk of everything except what you are currently working on.',
              'Remind yourself: "A ship in harbor is safe, but progress requires movement."',
              'Take 3 slow calming breaths and say: "I will take this one step at a time."'
            ]
          },
          {
            id: 'overburdened',
            name: 'Overburdened',
            iconName: 'Overwhelmed',
            targetMood: 'Lightened',
            actions: [
              'Roll your shoulders 5 times to drop physical weight.',
              'Inhale lightness and exhale heavy obligations.',
              'Say: "I release what is not mine to carry today."',
              'Place your hands flat on your thighs and breathe deeply.',
              'Give yourself permission to take a 60-second break.',
              'Write down 1 thing on your to-do list you can cancel or postpone.',
              'Ask for help with just 1 task today — it is a strength not a weakness.',
              'Take 5 deep slow breaths while imagining your shoulders becoming lighter.',
              'Drink a full glass of water and do a gentle seated forward fold.',
              'Repeat: "I am enough. I do enough. I have enough. Right now."'
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
        if (
          feeling.id.toLowerCase() === feelingId.toLowerCase() ||
          feeling.name.toLowerCase() === feelingId.toLowerCase() ||
          sub.id.toLowerCase() === feelingId.toLowerCase()
        ) {
          const actionIndex = Math.abs(visitedCount) % feeling.actions.length;
          return {
            targetMood: feeling.targetMood,
            actionText: feeling.actions[actionIndex]
          };
        }
      }
    }
  }

  return {
    targetMood: 'Peaceful & Grounded',
    actionText: 'Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.'
  };
}
