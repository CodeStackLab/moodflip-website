"use client";

import { useMemo, useState } from "react";

type MoodFamily =
  | "All"
  | "Low"
  | "Anxious"
  | "Angry"
  | "Overwhelmed"
  | "Lonely";

type Mood = {
  id: string;
  name: string;
  emoji: string;
  family: Exclude<MoodFamily, "All">;
  feelings: string[];
  positive: string;
  description: string;
  actions: string[];
};

const moods: Mood[] = [
  {
    id: "sad",
    name: "Sad",
    emoji: "😢",
    family: "Low",
    feelings: ["Down", "Empty", "Heartbroken", "Lonely", "Hopeless"],
    positive: "Peaceful & Supported",
    description: "Give yourself a small moment of kindness and space.",
    actions: [
      "Take 3 slow breaths. Inhale for 4 seconds, hold for 4, exhale for 6.",
      "Put one hand on your chest and take three gentle breaths.",
      "Drink a glass of water slowly and notice how it feels.",
      "Look outside for 60 seconds and notice three things you can see.",
      "Write down one thing you need right now.",
    ],
  },
  {
    id: "hopeless",
    name: "Hopeless",
    emoji: "☁️",
    family: "Low",
    feelings: ["Helpless", "Discouraged", "Powerless", "Stuck"],
    positive: "Hopeful & Grounded",
    description: "Focus on one tiny thing that is still within your control.",
    actions: [
      "Name one thing you can influence today and take one tiny step.",
      "Stand up, stretch your shoulders, and take five slow breaths.",
      "Write one small task you could finish in the next 10 minutes.",
      "Think of one person, place, or activity that usually gives you comfort.",
      "Put your phone down and take one quiet minute for yourself.",
    ],
  },
  {
    id: "disappointed",
    name: "Disappointed",
    emoji: "💔",
    family: "Low",
    feelings: ["Let Down", "Frustrated", "Hurt", "Discouraged"],
    positive: "Accepted & Renewed",
    description: "Allow the moment to be real without letting it define your next step.",
    actions: [
      "Take one breath and name what happened without judging yourself.",
      "Write one sentence about what you hoped would happen.",
      "Relax your jaw and shoulders for 60 seconds.",
      "Ask yourself what the smallest useful next step could be.",
      "Step away from the situation for one minute and reset.",
    ],
  },
  {
    id: "lonely",
    name: "Lonely",
    emoji: "👤",
    family: "Lonely",
    feelings: ["Alone", "Isolated", "Unseen", "Left Out"],
    positive: "Connected & Cared For",
    description: "Create one small moment of connection.",
    actions: [
      "Send a simple 'thinking of you' message to someone you trust.",
      "Think of one person who makes you feel understood.",
      "Step outside and notice the people and world around you.",
      "Write down one memory that makes you feel connected.",
      "Take three breaths and remind yourself that this feeling can change.",
    ],
  },
  {
    id: "tired",
    name: "Tired",
    emoji: "🔋",
    family: "Low",
    feelings: ["Drained", "Exhausted", "Sleepy", "Burnt Out"],
    positive: "Rested & Restored",
    description: "Your next step can be gentle. You don't have to do everything.",
    actions: [
      "Close your eyes for 60 seconds and relax your shoulders.",
      "Take three slow breaths and unclench your jaw.",
      "Drink some water and take a short screen break.",
      "Stretch your neck and shoulders gently for one minute.",
      "Choose one task to postpone so you can protect your energy.",
    ],
  },
  {
    id: "anxious",
    name: "Anxious",
    emoji: "🎯",
    family: "Anxious",
    feelings: ["Nervous", "Uneasy", "Worried", "Panicked", "Restless"],
    positive: "Calm & Clear",
    description: "Bring your attention back to what is happening right now.",
    actions: [
      "Take 3 deep breaths: inhale 4, hold 4, exhale 6.",
      "Name five things you can see around you.",
      "Place both feet on the floor and take five slow breaths.",
      "Relax your shoulders and slowly unclench your hands.",
      "Pick one thing you can control in this moment.",
    ],
  },
  {
    id: "worried",
    name: "Worried",
    emoji: "🌧️",
    family: "Anxious",
    feelings: ["Concerned", "Uncertain", "Fearful", "Restless"],
    positive: "Steady & Reassured",
    description: "Separate what you can control from what you cannot.",
    actions: [
      "Write down one worry and one thing you can actually control.",
      "Take five slow breaths while keeping both feet grounded.",
      "Look around and identify three things that are safe right now.",
      "Give yourself one minute without trying to solve anything.",
      "Choose one small action that would make today easier.",
    ],
  },
  {
    id: "overwhelmed",
    name: "Overwhelmed",
    emoji: "🌀",
    family: "Overwhelmed",
    feelings: ["Swamped", "Overloaded", "Stressed", "Pressured", "Stuck"],
    positive: "Organized & Clear",
    description: "You only need to handle the next small step.",
    actions: [
      "Write down everything on your mind, then circle just one item.",
      "Take three slow breaths before deciding what comes next.",
      "Clear one tiny area around you for 60 seconds.",
      "Choose the easiest unfinished task and start for one minute.",
      "Put your phone away and focus on one thing at a time.",
    ],
  },
  {
    id: "stressed",
    name: "Stressed",
    emoji: "⚡",
    family: "Overwhelmed",
    feelings: ["Tense", "Pressured", "Frustrated", "Overworked"],
    positive: "Relaxed & Balanced",
    description: "Slow your body down before asking your mind to solve things.",
    actions: [
      "Drop your shoulders and take five slow breaths.",
      "Stretch your hands, neck, and shoulders for one minute.",
      "Step away from your screen and look into the distance.",
      "Take one slow breath before opening your next task.",
      "Write down the one thing that matters most right now.",
    ],
  },
  {
    id: "angry",
    name: "Angry",
    emoji: "😡",
    family: "Angry",
    feelings: ["Furious", "Irritated", "Resentful", "Frustrated", "Mad"],
    positive: "Calm & In Control",
    description: "Create a little space between the feeling and your next action.",
    actions: [
      "Take five slow breaths before responding to anyone.",
      "Relax your hands and jaw for 60 seconds.",
      "Step away from the situation and walk slowly for one minute.",
      "Name what triggered the feeling without blaming yourself.",
      "Give yourself permission to pause before making a decision.",
    ],
  },
  {
    id: "frustrated",
    name: "Frustrated",
    emoji: "✨",
    family: "Angry",
    feelings: ["Annoyed", "Blocked", "Impatient", "Irritated"],
    positive: "Patient & Focused",
    description: "Pause, reset, and choose what is actually within your control.",
    actions: [
      "Take three breaths before trying again.",
      "Identify the smallest part of the problem you can solve.",
      "Stand up and shake out tension from your hands.",
      "Give yourself 60 seconds away from the problem.",
      "Replace 'I can't' with 'What's one thing I can try?'",
    ],
  },
  {
    id: "insecure",
    name: "Insecure",
    emoji: "🛡️",
    family: "Low",
    feelings: ["Uncertain", "Self-Doubting", "Unworthy", "Inadequate"],
    positive: "Confident & Grounded",
    description: "Your current feeling does not define your worth.",
    actions: [
      "Write down one thing you handled well recently.",
      "Take three breaths and relax your shoulders.",
      "Replace one harsh thought with a kinder statement.",
      "Think of one person who appreciates you as you are.",
      "Focus on one small thing you can do well today.",
    ],
  },
  {
    id: "guilty",
    name: "Guilty",
    emoji: "😔",
    family: "Low",
    feelings: ["Regretful", "Ashamed", "Responsible", "Remorseful"],
    positive: "Forgiving & Responsible",
    description: "Learn from what happened without carrying unnecessary shame.",
    actions: [
      "Name one lesson you can take from the situation.",
      "Take a breath and separate the action from your identity.",
      "If appropriate, write one sentence of apology you could share.",
      "Ask yourself what repair might look like.",
      "Give yourself one minute of compassionate self-talk.",
    ],
  },
  {
    id: "stuck",
    name: "Stuck",
    emoji: "🔒",
    family: "Overwhelmed",
    feelings: ["Blocked", "Lost", "Uncertain", "Directionless"],
    positive: "Moving & Focused",
    description: "You don't need the entire path. Find the next step.",
    actions: [
      "Choose one action that takes less than two minutes.",
      "Write down two possible next steps.",
      "Stand up and change your physical environment.",
      "Ask yourself: 'What would make this 1% easier?'",
      "Set a one-minute timer and simply begin.",
    ],
  },
];

const families: MoodFamily[] = [
  "All",
  "Low",
  "Anxious",
  "Angry",
  "Overwhelmed",
  "Lonely",
];

export default function Home() {
  const [family, setFamily] = useState<MoodFamily>("All");
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedFeeling, setSelectedFeeling] = useState("");
  const [actionIndex, setActionIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [saved, setSaved] = useState(false);

  const visibleMoods = useMemo(() => {
    if (family === "All") return moods;

    return moods.filter((mood) => mood.family === family);
  }, [family]);

  const chooseFamily = (newFamily: MoodFamily) => {
    setFamily(newFamily);
    setSelectedMood(null);
    setSelectedFeeling("");
    setFlipped(false);
    setSaved(false);
  };

  const chooseMood = (mood: Mood) => {
    setSelectedMood(mood);
    setSelectedFeeling("");
    setFlipped(false);
    setSaved(false);
    setActionIndex(0);
  };

  const flipMood = () => {
    if (!selectedMood || !selectedFeeling) return;

    setFlipped(true);

    const nextIndex =
      selectedMood.actions.length > 1
        ? Math.floor(Math.random() * selectedMood.actions.length)
        : 0;

    setActionIndex(nextIndex);
  };

  const tryAnother = () => {
    if (!selectedMood) return;

    let next = Math.floor(Math.random() * selectedMood.actions.length);

    if (
      selectedMood.actions.length > 1 &&
      next === actionIndex
    ) {
      next = (next + 1) % selectedMood.actions.length;
    }

    setActionIndex(next);
  };

  const saveCheckin = () => {
    setSaved(true);

    const checkin = {
      mood: selectedMood?.name,
      feeling: selectedFeeling,
      action: selectedMood?.actions[actionIndex],
      date: new Date().toISOString(),
    };

    localStorage.setItem(
      "moodflip-last-checkin",
      JSON.stringify(checkin)
    );
  };

  return (
    <main className="min-h-screen bg-[#faf9ff] text-[#17152d]">
      <Header />

      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <AdBanner />

        <section className="grid gap-5 xl:grid-cols-[1.25fr_1fr_240px]">
          {/* LEFT */}
          <section className="rounded-[28px] border border-[#ebe7f5] bg-white p-5 shadow-[0_20px_60px_rgba(55,35,100,0.08)] sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#6842e8] to-[#9b55e8] font-bold text-white">
                  1
                </span>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#6c4de6]">
                    Step 1
                  </p>

                  <h2 className="font-semibold">
                    Choose your mood
                  </h2>
                </div>
              </div>

              <span className="rounded-full bg-[#f3efff] px-4 py-2 text-sm font-semibold text-[#6944dc]">
                1 of 2
              </span>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
              {families.map((item) => (
                <button
                  key={item}
                  onClick={() => chooseFamily(item)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                    family === item
                      ? "border-[#7044e8] bg-gradient-to-r from-[#633ce0] to-[#9650e7] text-white shadow-lg shadow-purple-200"
                      : "border-[#e9e5ef] bg-white text-[#25213b] hover:border-[#ad93ee] hover:bg-[#f8f5ff]"
                  }`}
                >
                  {item === "All" && "▦ "}
                  {item === "Low" && "😔 "}
                  {item === "Anxious" && "🌧️ "}
                  {item === "Angry" && "🔥 "}
                  {item === "Overwhelmed" && "〰️ "}
                  {item === "Lonely" && "👤 "}
                  {item}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {visibleMoods.map((mood) => {
                const active = selectedMood?.id === mood.id;

                return (
                  <button
                    key={mood.id}
                    onClick={() => chooseMood(mood)}
                    className={`group rounded-2xl border p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                      active
                        ? "border-[#7651eb] bg-[#f4efff] shadow-md shadow-purple-100"
                        : "border-[#ece7f0] bg-gradient-to-b from-white to-[#fbfaff]"
                    }`}
                  >
                    <span className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f1ff] text-2xl transition group-hover:scale-110">
                      {mood.emoji}
                    </span>

                    <span className="block text-sm font-semibold">
                      {mood.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* STEP 2 */}
            <div className="my-7 border-t border-[#eeeaf3] pt-7">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#6842e8] to-[#9b55e8] font-bold text-white">
                    2
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#6c4de6]">
                      Step 2
                    </p>

                    <h2 className="font-semibold">
                      Pick exact feeling
                    </h2>
                  </div>
                </div>

                <span className="rounded-full bg-[#f3efff] px-4 py-2 text-sm font-semibold text-[#6944dc]">
                  2 of 2
                </span>
              </div>

              {!selectedMood ? (
                <div className="rounded-2xl border border-dashed border-[#cfc3ee] bg-[#fcfbff] px-5 py-8 text-center text-sm text-[#77718b]">
                  👆 Select a mood above to see specific feelings
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {selectedMood.feelings.map((feeling) => (
                    <button
                      key={feeling}
                      onClick={() => {
                        setSelectedFeeling(feeling);
                        setFlipped(false);
                      }}
                      className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                        selectedFeeling === feeling
                          ? "border-[#7145e5] bg-[#eee7ff] text-[#5b35c9]"
                          : "border-[#e9e5ef] bg-white hover:border-[#bca7f1]"
                      }`}
                    >
                      {feeling}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              disabled={!selectedMood || !selectedFeeling}
              onClick={flipMood}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#6237dc] via-[#8146e4] to-[#b64fd3] px-6 py-4 text-base font-bold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="relative z-10">
                ✨ FLIP MY MOOD →
              </span>

              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
            </button>

            <p className="mt-3 text-center text-xs text-[#817b91]">
              Get your positive flip & 60-second action
            </p>
          </section>

          {/* RESULT */}
          <PositiveResult
            mood={selectedMood}
            feeling={selectedFeeling}
            flipped={flipped}
            saved={saved}
            actionIndex={actionIndex}
            onTryAnother={tryAnother}
            onSave={saveCheckin}
          />

          {/* SIDEBAR */}
          <MoreForYou />
        </section>

        <TrustSection />

        <AdBanner />

        <Footer />
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#eeeaf4] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <span className="absolute bottom-0 left-1 h-7 w-7 rounded-full border-[6px] border-[#713ee2] border-t-transparent" />
            <span className="absolute left-1 top-0 h-3 w-3 rounded-full bg-[#f4a746]" />
            <span className="absolute right-0 top-1 h-2.5 w-2.5 rounded-full bg-[#d94fc5]" />
          </div>

          <span className="text-2xl font-black tracking-tight">
            mood<span className="text-[#7b45e7]">flip</span>
          </span>
        </div>

        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {["Home", "About", "How It Works", "Mood Library", "Resources", "Contact"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="transition hover:text-[#7043df]"
              >
                {item}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button className="hidden rounded-xl border border-[#a78bea] px-5 py-2.5 text-sm font-semibold text-[#673cdb] transition hover:bg-[#f7f3ff] sm:block">
            ♙ Login
          </button>

          <button className="rounded-xl bg-gradient-to-r from-[#a23fcf] to-[#6541df] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-200 sm:px-5">
            ✨ Get 7-Day Plan
          </button>
        </div>
      </div>
    </header>
  );
}

function AdBanner() {
  return (
    <div className="my-5 flex h-14 items-center justify-center rounded-xl border border-dashed border-[#d7c8f7] bg-[#faf8ff] text-sm text-[#706986]">
      <span className="mr-2 rounded border border-[#e2d9f5] px-2 py-0.5 text-[10px]">
        Ad
      </span>
      Google AdSense Banner (728x90)
    </div>
  );
}

type ResultProps = {
  mood: Mood | null;
  feeling: string;
  flipped: boolean;
  saved: boolean;
  actionIndex: number;
  onTryAnother: () => void;
  onSave: () => void;
};

function PositiveResult({
  mood,
  feeling,
  flipped,
  saved,
  actionIndex,
  onTryAnother,
  onSave,
}: ResultProps) {
  const action = mood?.actions[actionIndex];

  return (
    <section className="relative min-h-[650px] overflow-hidden rounded-[28px] border border-[#eadff2] bg-gradient-to-br from-[#fff7fb] via-[#fff4e9] to-[#eee9ff] p-6 shadow-[0_20px_70px_rgba(130,80,150,0.12)]">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#f9c7de]/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#bca9ff]/30 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">
        <span className="rounded-full border border-white/80 bg-white/75 px-4 py-2 text-xs font-semibold text-[#6944dc] shadow-sm">
          {flipped ? "✓ Here's your positive flip" : "Your MoodFlip"}
        </span>

        <div className="flex gap-2">
          <button className="rounded-lg bg-white/80 px-3 py-2 text-xs font-semibold shadow-sm hover:bg-white">
            ♡ Save
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "MoodFlip",
                  text: "I just flipped my mood on MoodFlip.",
                });
              }
            }}
            className="rounded-lg bg-white/80 px-3 py-2 text-xs font-semibold shadow-sm hover:bg-white"
          >
            ↗ Share
          </button>
        </div>
      </div>

      {!flipped ? (
        <div className="relative z-10 flex min-h-[520px] flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/75 text-5xl shadow-xl">
            ☀️
          </div>

          <h2 className="max-w-md font-serif text-4xl font-bold text-[#282044]">
            Take a small step towards a better you
          </h2>

          <p className="mt-4 max-w-md text-[#716a7f]">
            Select your feeling on the left and tap{" "}
            <b>FLIP MY MOOD</b> to reveal a positive direction and a
            practical 60-second action.
          </p>

          <div className="mt-8 rounded-2xl bg-white/70 px-6 py-4 text-left shadow-sm">
            <p className="text-sm font-bold text-[#4f3a8f]">
              How it works
            </p>
            <p className="mt-2 text-sm text-[#716a7f]">
              Choose your mood → Pick your feeling → Flip your mood
            </p>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center pt-10 text-center">
          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-white/80 text-5xl shadow-xl">
            🌅
          </div>

          <p className="text-sm font-medium text-[#7b6b83]">
            You selected:{" "}
            <span className="font-bold text-[#5b40b7]">
              {feeling}
            </span>
          </p>

          <h2 className="mt-3 font-serif text-4xl font-bold text-[#282044]">
            Towards {mood?.positive}
          </h2>

          <p className="mt-3 max-w-md text-[#716a7f]">
            {mood?.description}
          </p>

          <div className="mt-8 w-full max-w-xl rounded-[22px] border border-white/80 bg-white/85 p-5 text-left shadow-xl backdrop-blur">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#302749]">
                ✨ Your 60-Second Action
              </h3>

              <span className="rounded-full bg-[#f2edff] px-3 py-1 text-xs font-bold text-[#6841dc]">
                ◷ 60s
              </span>
            </div>

            <div className="mt-4 flex items-center gap-4 rounded-2xl bg-[#faf8ff] p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#663de1] to-[#a349df] text-xl text-white shadow-lg">
                ▶
              </div>

              <p className="text-base font-semibold leading-relaxed text-[#302749]">
                {action}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-sm font-bold text-[#4b3b6e]">
                ♡ Why this helps
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[#777084]">
                A short intentional pause can help you reconnect with the
                present moment and choose your next small step.
              </p>
            </div>
          </div>

          <div className="mt-5 flex w-full max-w-xl gap-3">
            <button
              onClick={onTryAnother}
              className="flex-1 rounded-xl border border-[#dcd2ed] bg-white px-5 py-3.5 text-sm font-bold text-[#6841d9] transition hover:bg-[#faf7ff]"
            >
              ↻ Try Another
            </button>

            <button
              onClick={onSave}
              className="flex-1 rounded-xl bg-gradient-to-r from-[#683be0] to-[#9648dd] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-200"
            >
              {saved ? "✓ Saved" : "♡ Save to My Check-ins"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function MoreForYou() {
  return (
    <aside className="space-y-3">
      <h3 className="mb-3 px-1 text-sm font-bold text-[#28223d]">
        ⭐ More for You
      </h3>

      <PlanCard
        icon="📅"
        title="7-Day Plan"
        text="Build a better mindset starting today."
        button="View Plan →"
      />

      <PlanCard
        icon="🗓️"
        title="30-Day Plan"
        text="Go deeper. Lasting change in 30 days."
        button="Coming Soon"
      />

      <PlanCard
        icon="🎁"
        title="Daily Reminders"
        text="Gentle nudges for your better days."
        button="Enable →"
      />

      <PlanCard
        icon="📈"
        title="Track Progress"
        text="See how far you've come."
        button="View Profile →"
      />

      <div className="rounded-2xl border border-[#eee8f5] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0eaff]">
            🔐
          </span>

          <div>
            <p className="text-xs font-bold">Your data is private</p>
            <p className="mt-1 text-[11px] text-[#777180]">
              Protected and automatically deleted after 90 days.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function PlanCard({
  icon,
  title,
  text,
  button,
}: {
  icon: string;
  title: string;
  text: string;
  button: string;
}) {
  return (
    <div className="rounded-2xl border border-[#eee8f5] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f2edff] text-xl">
          {icon}
        </span>

        <div>
          <h4 className="text-sm font-bold">{title}</h4>
          <p className="mt-1 text-xs leading-relaxed text-[#777180]">
            {text}
          </p>

          <button className="mt-2 text-xs font-bold text-[#6841d9]">
            {button}
          </button>
        </div>
      </div>
    </div>
  );
}

function TrustSection() {
  const items = [
    {
      icon: "🛡️",
      title: "Private & Secure",
      text: "Your data is protected.",
    },
    {
      icon: "✓",
      title: "90-Day Auto Delete",
      text: "Inactive data is automatically deleted.",
    },
    {
      icon: "❤️",
      title: "Not Therapy",
      text: "A self-reflection utility, not a medical service.",
    },
    {
      icon: "👥",
      title: "You're Not Alone",
      text: "Small shifts, every day.",
    },
    {
      icon: "✨",
      title: "Made with Care",
      text: "Simple tools for a better you.",
    },
  ];

  return (
    <section className="my-6 grid gap-3 rounded-3xl border border-[#eee8f5] bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-center gap-3 rounded-2xl p-2"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f4efff] text-xl">
            {item.icon}
          </span>

          <div>
            <p className="text-xs font-bold">{item.title}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-[#777180]">
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-6 rounded-t-[28px] bg-[#171437] px-6 py-8 text-white">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-2xl font-black">
            mood<span className="text-[#9a65ed]">flip</span>
          </div>

          <p className="mt-2 text-sm text-[#aaa5c0]">
            A self-reflection utility for real life.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#d0cce0]">
          <a href="#">About</a>
          <a href="#">How It Works</a>
          <a href="#">Mood Library</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>

        <p className="text-xs text-[#aaa5c0]">
          © 2026 MoodFlip.coach 💜
        </p>
      </div>
    </footer>
  );
}