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
  bg: string;
  border: string;
};

const moods: Mood[] = [
  {
    id: "sad",
    name: "Sad",
    emoji: "😢",
    family: "Low",
    bg: "bg-[#f5f3ff]",
    border: "border-[#ede9fe]",
    feelings: ["Down", "Empty", "Heartbroken", "Lonely", "Hopeless"],
    positive: "Peaceful & Supported",
    description: "Give yourself a small moment of kindness and space.",
    actions: ["Take 3 slow breaths. Inhale for 4 seconds, hold for 4, exhale for 6."],
  },
  {
    id: "hopeless",
    name: "Hopeless",
    emoji: "☁️",
    family: "Low",
    bg: "bg-[#f3f4f6]",
    border: "border-[#e5e7eb]",
    feelings: ["Helpless", "Discouraged", "Powerless", "Stuck"],
    positive: "Hopeful & Grounded",
    description: "Focus on one tiny thing that is still within your control.",
    actions: ["Name one thing you can influence today and take one tiny step."],
  },
  {
    id: "disappointed",
    name: "Disappointed",
    emoji: "💔",
    family: "Low",
    bg: "bg-[#fff1f2]",
    border: "border-[#ffe4e6]",
    feelings: ["Let Down", "Frustrated", "Hurt", "Discouraged"],
    positive: "Accepted & Renewed",
    description: "Allow the moment to be real without letting it define your next step.",
    actions: ["Take one breath and name what happened without judging yourself."],
  },
  {
    id: "lonely",
    name: "Lonely",
    emoji: "👤",
    family: "Lonely",
    bg: "bg-[#f0f9ff]",
    border: "border-[#e0f2fe]",
    feelings: ["Alone", "Isolated", "Unseen", "Left Out"],
    positive: "Connected & Cared For",
    description: "Create one small moment of connection.",
    actions: ["Send a simple 'thinking of you' message to someone you trust."],
  },
  {
    id: "tired",
    name: "Tired",
    emoji: "🔋",
    family: "Low",
    bg: "bg-[#f0fdf4]",
    border: "border-[#dcfce7]",
    feelings: ["Drained", "Exhausted", "Sleepy", "Burnt Out"],
    positive: "Rested & Restored",
    description: "Your next step can be gentle. You don't have to do everything.",
    actions: ["Close your eyes for 60 seconds and relax your shoulders."],
  },
  {
    id: "anxious",
    name: "Anxious",
    emoji: "🎯",
    family: "Anxious",
    bg: "bg-[#f0fdfa]",
    border: "border-[#ccfbf1]",
    feelings: ["Nervous", "Uneasy", "Worried", "Panicked", "Restless"],
    positive: "Calm & Clear",
    description: "Bring your attention back to what is happening right now.",
    actions: ["Take 3 deep breaths: inhale 4, hold 4, exhale 6."],
  },
  {
    id: "worried",
    name: "Worried",
    emoji: "🌧️",
    family: "Anxious",
    bg: "bg-[#f0f9ff]",
    border: "border-[#e0f2fe]",
    feelings: ["Concerned", "Uncertain", "Fearful", "Restless"],
    positive: "Steady & Reassured",
    description: "Separate what you can control from what you cannot.",
    actions: ["Write down one worry and one thing you can actually control."],
  },
  {
    id: "overwhelmed",
    name: "Overwhelmed",
    emoji: "🌀",
    family: "Overwhelmed",
    bg: "bg-[#f5f3ff]",
    border: "border-[#ede9fe]",
    feelings: ["Swamped", "Overloaded", "Stressed", "Pressured", "Stuck"],
    positive: "Organized & Clear",
    description: "You only need to handle the next small step.",
    actions: ["Write down everything on your mind, then circle just one item."],
  },
  {
    id: "stressed",
    name: "Stressed",
    emoji: "⚡",
    family: "Overwhelmed",
    bg: "bg-[#faf5ff]",
    border: "border-[#f3e8ff]",
    feelings: ["Tense", "Pressured", "Frustrated", "Overworked"],
    positive: "Relaxed & Balanced",
    description: "Slow your body down before asking your mind to solve things.",
    actions: ["Drop your shoulders and take five slow breaths."],
  },
  {
    id: "insecure",
    name: "Insecure",
    emoji: "🛡️",
    family: "Low",
    bg: "bg-[#fffbeb]",
    border: "border-[#fef3c7]",
    feelings: ["Uncertain", "Self-Doubting", "Unworthy", "Inadequate"],
    positive: "Confident & Grounded",
    description: "Your current feeling does not define your worth.",
    actions: ["Write down one thing you handled well recently."],
  },
  {
    id: "angry",
    name: "Angry",
    emoji: "😡",
    family: "Angry",
    bg: "bg-[#fef2f2]",
    border: "border-[#fee2e2]",
    feelings: ["Furious", "Irritated", "Resentful", "Frustrated", "Mad"],
    positive: "Calm & In Control",
    description: "Create a little space between the feeling and your next action.",
    actions: ["Take five slow breaths before responding to anyone."],
  },
  {
    id: "frustrated",
    name: "Frustrated",
    emoji: "✨",
    family: "Angry",
    bg: "bg-[#fff7ed]",
    border: "border-[#ffedd5]",
    feelings: ["Annoyed", "Blocked", "Impatient", "Irritated"],
    positive: "Patient & Focused",
    description: "Pause, reset, and choose what is actually within your control.",
    actions: ["Take three breaths before trying again."],
  },
  {
    id: "irritable",
    name: "Irritable",
    emoji: "😒",
    family: "Angry",
    bg: "bg-[#fefce8]",
    border: "border-[#fef08a]",
    feelings: ["Cranky", "Snappy", "Touchy", "Edgy"],
    positive: "Soft & Grounded",
    description: "Notice where your body is tight and let it go.",
    actions: ["Relax your jaw and drop your shoulders for 60 seconds."],
  },
  {
    id: "guilty",
    name: "Guilty",
    emoji: "😔",
    family: "Low",
    bg: "bg-[#f5f3ff]",
    border: "border-[#ede9fe]",
    feelings: ["Regretful", "Ashamed", "Responsible", "Remorseful"],
    positive: "Forgiving & Responsible",
    description: "Learn from what happened without carrying unnecessary shame.",
    actions: ["Name one lesson you can take from the situation."],
  },
  {
    id: "stuck",
    name: "Stuck",
    emoji: "🔒",
    family: "Overwhelmed",
    bg: "bg-[#f8fafc]",
    border: "border-[#f1f5f9]",
    feelings: ["Blocked", "Lost", "Uncertain", "Directionless"],
    positive: "Moving & Focused",
    description: "You don't need the entire path. Find the next step.",
    actions: ["Choose one action that takes less than two minutes."],
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
    if (selectedMood.actions.length > 1 && next === actionIndex) {
      next = (next + 1) % selectedMood.actions.length;
    }
    setActionIndex(next);
  };

  const saveCheckin = () => {
    setSaved(true);
  };

  return (
    <main className="min-h-screen bg-[#fdfcff] text-[#17152d]">
      <Header />

      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <AdBanner />

        <section className="grid gap-6 xl:grid-cols-[1.1fr_1.3fr_280px]">
          {/* LEFT */}
          <section className="rounded-[28px] border border-[#f0ebf8] bg-white p-5 shadow-[0_20px_60px_rgba(80,50,150,0.04)] sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#6842e8] to-[#9b55e8] text-sm font-bold text-white shadow-md shadow-purple-200">
                  1
                </span>

                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#6c4de6]">
                    Step 1
                  </p>
                  <h2 className="font-semibold text-[#1e1736]">
                    Choose your mood
                  </h2>
                </div>
              </div>

              <span className="rounded-full bg-[#f3efff] px-3.5 py-1.5 text-[13px] font-bold text-[#6944dc]">
                1 of 2
              </span>
            </div>

            <div className="mb-6 flex flex-wrap gap-2.5">
              {families.map((item) => (
                <button
                  key={item}
                  onClick={() => chooseFamily(item)}
                  className={`flex items-center gap-2 rounded-[14px] border px-4 py-2.5 text-sm font-bold transition-all ${
                    family === item
                      ? "border-[#7044e8] bg-gradient-to-r from-[#633ce0] to-[#9650e7] text-white shadow-lg shadow-purple-200"
                      : "border-[#e9e5ef] bg-white text-[#453e5e] hover:border-[#cdbdf0] hover:bg-[#faf8ff] hover:shadow-sm"
                  }`}
                >
                  {item === "All" && (
                    <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
                    </svg>
                  )}
                  {item === "Low" && <span className="opacity-90">😔</span>}
                  {item === "Anxious" && <span className="opacity-90">🌧️</span>}
                  {item === "Angry" && <span className="opacity-90">🔥</span>}
                  {item === "Overwhelmed" && <span className="opacity-90">〰️</span>}
                  {item === "Lonely" && <span className="opacity-90">👤</span>}
                  {item}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
              {visibleMoods.map((mood) => {
                const active = selectedMood?.id === mood.id;

                return (
                  <button
                    key={mood.id}
                    onClick={() => chooseMood(mood)}
                    className={`group flex flex-col items-center justify-center rounded-[20px] border p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                      active
                        ? "border-[#7651eb] shadow-md shadow-purple-100 ring-2 ring-purple-100 ring-offset-1"
                        : "border-[#f1ebf8] hover:border-[#e2d5f8]"
                    } ${mood.bg}`}
                  >
                    <span className="mb-3 text-[42px] leading-none transition-transform duration-300 group-hover:scale-110 drop-shadow-sm">
                      {mood.emoji}
                    </span>
                    <span className={`text-[13px] font-bold ${active ? 'text-[#4828a8]' : 'text-[#453e5e]'}`}>
                      {mood.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* STEP 2 */}
            <div className="my-8 border-t border-[#f0ebf8] pt-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#6842e8] to-[#9b55e8] text-sm font-bold text-white shadow-md shadow-purple-200">
                    2
                  </span>

                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#6c4de6]">
                      Step 2
                    </p>
                    <h2 className="font-semibold text-[#1e1736]">
                      Pick exact feeling
                    </h2>
                  </div>
                </div>

                <span className="rounded-full bg-[#f3efff] px-3.5 py-1.5 text-[13px] font-bold text-[#6944dc]">
                  2 of 2
                </span>
              </div>

              {!selectedMood ? (
                <div className="rounded-2xl border-2 border-dashed border-[#e6dff2] bg-[#fcfbff] px-5 py-8 text-center text-sm font-medium text-[#878099]">
                  👆 Select a mood above to see specific feelings
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {selectedMood.feelings.map((feeling) => (
                    <button
                      key={feeling}
                      onClick={() => {
                        setSelectedFeeling(feeling);
                        setFlipped(false);
                      }}
                      className={`rounded-[14px] border px-4 py-3 text-[13px] font-bold transition-all ${
                        selectedFeeling === feeling
                          ? "border-[#7145e5] bg-[#f0eaff] text-[#5b35c9] shadow-sm shadow-purple-100"
                          : "border-[#e9e5ef] bg-white text-[#453e5e] hover:border-[#cdbdf0] hover:bg-[#faf8ff] hover:shadow-sm"
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
              className="group relative w-full overflow-hidden rounded-[20px] bg-gradient-to-r from-[#6b3fe4] via-[#8545e8] to-[#b64fd3] px-6 py-4.5 text-base font-bold text-white shadow-xl shadow-purple-200/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-purple-300/50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-[17px] tracking-wide">
                ✨ FLIP MY MOOD 
              </span>

              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
            </button>

            <p className="mt-3 text-center text-[13px] font-medium text-[#928c9f]">
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
    <header className="sticky top-0 z-50 border-b border-[#f0ebf8] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="relative flex h-9 w-9 items-center justify-center">
            <span className="absolute bottom-0 left-0.5 h-6 w-6 rounded-full border-[5px] border-[#713ee2] border-t-transparent" />
            <span className="absolute left-0.5 top-0 h-2.5 w-2.5 rounded-full bg-[#f4a746]" />
            <span className="absolute right-0 top-1 h-2 w-2 rounded-full bg-[#d94fc5]" />
          </div>

          <span className="text-[22px] font-black tracking-tight text-[#1b152e]">
            mood<span className="text-[#7b45e7]">flip</span>
          </span>
        </div>

        <nav className="hidden items-center gap-8 text-[15px] font-semibold text-[#5a5270] lg:flex">
          {["Home", "About", "How It Works", "Mood Library", "Resources", "Contact"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className={`transition-colors py-1 ${
                  item === "Home" 
                    ? "text-[#623ce1] border-b-2 border-[#623ce1]" 
                    : "hover:text-[#623ce1]"
                }`}
              >
                {item}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden rounded-xl border border-[#e2daef] px-4 py-2.5 text-[14px] font-bold text-[#623ce1] transition-colors hover:bg-[#faf8ff] sm:flex sm:items-center sm:gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Login
          </button>

          <button className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#a23fcf] to-[#6541df] px-5 py-2.5 text-[14px] font-bold text-white shadow-lg shadow-purple-200/50 hover:shadow-xl transition-all">
            ✨ Get 7-Day Plan
          </button>
        </div>
      </div>
    </header>
  );
}

function AdBanner() {
  return (
    <div className="my-5 flex h-[90px] items-center justify-center rounded-[20px] border border-dashed border-[#dbd3ee] bg-[#faf9ff] text-sm font-medium text-[#87809a]">
      <div className="flex flex-col items-center gap-1">
        <span className="rounded bg-[#f0eaff] px-2 py-0.5 text-[10px] font-bold text-[#7a64bd] uppercase tracking-wide">
          Ad
        </span>
        Google AdSense Banner (728x90)
      </div>
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
    <section className="relative min-h-[650px] overflow-hidden rounded-[28px] border border-[#f0ebf8] bg-white p-6 shadow-[0_20px_70px_rgba(80,50,150,0.06)]">
      {/* SUNSET BACKGROUND SVG/CSS RECREATION */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffaf4] via-[#ffece3] to-[#f2d9fa]" />
        
        {/* Sun */}
        <div className="absolute left-1/2 top-[45%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-t from-[#ffeb85] to-[#ffe56b] opacity-90 blur-[1px] mix-blend-overlay" />
        <div className="absolute left-1/2 top-[45%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffea75] opacity-100 shadow-[0_0_80px_#ffeb85]" />
        
        {/* Back Hills */}
        <div className="absolute -left-10 bottom-[10%] h-[50%] w-[120%] rounded-[100%] bg-gradient-to-t from-[#dcb4e5] to-[#f4d9f6] opacity-60 blur-md" />
        
        {/* Decorative Silhouettes (Leaves) */}
        <svg className="absolute bottom-10 left-0 h-64 w-40 opacity-30 mix-blend-multiply" viewBox="0 0 100 200" fill="#b990cc"><path d="M0,200 C30,150 40,80 10,20 C50,40 60,100 0,200 Z" /><path d="M0,150 C20,120 30,70 10,40 C40,50 40,100 0,150 Z" /></svg>
        <svg className="absolute bottom-10 right-0 h-72 w-48 opacity-30 mix-blend-multiply" viewBox="0 0 100 200" fill="#b990cc"><path d="M100,200 C70,140 60,70 90,10 C50,30 40,90 100,200 Z" /><path d="M100,160 C80,120 70,60 90,20 C60,40 50,90 100,160 Z" /></svg>

        {/* Foreground Hills */}
        <div className="absolute -left-10 -bottom-20 h-[45%] w-[70%] rounded-[100%] bg-gradient-to-tr from-[#a37ed3] to-[#d4bcf0]" />
        <div className="absolute -right-10 -bottom-20 h-[45%] w-[70%] rounded-[100%] bg-gradient-to-tl from-[#9260cb] to-[#bfa0e8]" />
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <span className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-[13px] font-bold text-[#623ce1] shadow-sm backdrop-blur-md">
          {flipped && <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
          {flipped ? "Here's your positive flip" : "Your MoodFlip"}
        </span>

        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded-xl bg-white/70 px-4 py-2 text-[13px] font-bold text-[#4a4260] shadow-sm backdrop-blur-md transition hover:bg-white">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
            Save
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
            className="flex items-center gap-1.5 rounded-xl bg-white/70 px-4 py-2 text-[13px] font-bold text-[#4a4260] shadow-sm backdrop-blur-md transition hover:bg-white"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            Share
          </button>
        </div>
      </div>

      {!flipped ? (
        <div className="relative z-10 flex min-h-[520px] flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white/70 text-5xl shadow-[0_10px_40px_rgba(255,200,100,0.3)] backdrop-blur-md">
            ☀️
          </div>

          <h2 className="max-w-md font-serif text-[40px] leading-tight font-bold text-[#1a142c]">
            Take a small step towards a better you
          </h2>

          <p className="mt-4 max-w-md text-[15px] font-medium text-[#655d78]">
            Select your feeling on the left and tap{" "}
            <b className="text-[#453185]">FLIP MY MOOD</b> to reveal a positive direction and a
            practical 60-second action.
          </p>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center pt-[70px] text-center">
          <h2 className="font-serif text-[42px] font-bold text-[#141029] drop-shadow-sm">
            Towards {mood?.positive.split('&')[0]} &<br/>{mood?.positive.split('&')[1]}
          </h2>

          <p className="mt-2 max-w-md text-[16px] font-medium text-[#3b3252] drop-shadow-sm">
            You've got this. Small steps, big shifts.
          </p>

          <div className="mt-8 w-full max-w-[540px] rounded-[24px] bg-white p-6 text-left shadow-[0_20px_60px_rgba(50,30,90,0.08)] ring-1 ring-[#f0ebf8]">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-bold text-[#231a38]">
                <span className="text-[#facc15] text-lg">⭐</span> Your 60-Second Action
              </h3>

              <span className="flex items-center gap-1.5 rounded-full border border-[#f0ebf8] bg-white px-3 py-1.5 text-[12px] font-extrabold text-[#453860] shadow-sm">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                60s
              </span>
            </div>

            <div className="mt-5 flex items-center gap-5">
              <button className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7245e3] to-[#b34eda] text-white shadow-lg shadow-purple-200 transition hover:scale-105">
                <svg className="h-7 w-7 ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
              </button>

              <div className="flex-1">
                <p className="text-[17px] font-bold leading-tight text-[#1b152e]">
                  {action?.split('.')[0]}.
                </p>
                <p className="mt-1 text-[14px] font-medium text-[#6e6782]">
                  {action?.substring(action.indexOf('.') + 1).trim() || mood?.description}
                </p>
              </div>

              <div className="relative flex h-[72px] w-[72px] items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <path className="text-[#f0ebf8]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <path className="text-[#623ce1]" strokeLinecap="round" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-[20px] font-black leading-none text-[#1b152e]">60</span>
                  <span className="text-[7px] font-bold uppercase text-[#6e6782] tracking-wide mt-0.5">Seconds</span>
                </div>
              </div>
            </div>

            <hr className="my-5 border-[#f0ebf8]" />

            <div>
              <button className="flex w-full items-center gap-2 text-[13px] font-bold text-[#6a5e8c]">
                <svg className="w-4 h-4 text-[#9c8ec4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                Why this helps
              </button>
              <div className="mt-3 flex gap-3 text-[14px] font-medium text-[#6e6782]">
                <span className="text-[#a599ca] font-bold">+</span>
                <p>Deep breathing activates your body's natural calm response and helps reset your mind.</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex w-full max-w-[540px] gap-4">
            <button
              onClick={onTryAnother}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-[#e6dff2] bg-white/70 px-6 py-4 text-[15px] font-bold text-[#623ce1] backdrop-blur-md transition hover:bg-white"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
              Try Another
            </button>

            <button
              onClick={onSave}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#623ce1] px-6 py-4 text-[15px] font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-[#522bbb]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              {saved ? "Saved" : "Save to My Check-ins"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function MoreForYou() {
  return (
    <aside className="space-y-3.5">
      <h3 className="mb-4 px-1 text-[15px] font-extrabold text-[#1a142c] flex items-center gap-2">
        <span className="text-[#facc15] text-lg">⭐</span> More for You
      </h3>

      <PlanCard
        icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>}
        title="7-Day Plan"
        text="Build a better mindset starting today."
        button="View Plan →"
        bg="bg-[#f5f1ff]"
        iconColor="text-[#7245e3]"
      />

      <PlanCard
        icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>}
        title="30-Day Plan"
        text="Go deeper. Lasting change in 30 days."
        button="Coming Soon"
        bg="bg-[#f0f9ff]"
        iconColor="text-[#0284c7]"
      />

      <PlanCard
        icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>}
        title="Daily Reminders"
        text="Gentle nudges for your better days."
        button="Enable →"
        bg="bg-[#f0fdf4]"
        iconColor="text-[#16a34a]"
      />

      <PlanCard
        icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>}
        title="Track Progress"
        text="See how far you've come."
        button="View Profile →"
        bg="bg-[#fdf2f8]"
        iconColor="text-[#db2777]"
      />

      <div className="mt-6 rounded-[20px] border border-[#f0ebf8] bg-white p-5 shadow-sm">
        <div className="flex gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#f5f1ff] text-[#7245e3]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </span>

          <div>
            <p className="text-[13px] font-bold text-[#1a142c]">Your data is private</p>
            <p className="mt-1 text-[12px] font-medium leading-relaxed text-[#7a748c]">
              We use encryption & auto-delete your data after 90 days.
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
  bg,
  iconColor,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  button: string;
  bg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-[20px] border border-[#f0ebf8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex gap-4">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${bg} ${iconColor}`}>
          {icon}
        </span>

        <div>
          <h4 className="text-[14.px] font-bold text-[#1a142c]">{title}</h4>
          <p className="mt-1 text-[13px] font-medium leading-relaxed text-[#7a748c]">
            {text}
          </p>

          <button className={`mt-2 text-[12px] font-bold ${iconColor.replace('text-', 'text-')}`}>
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
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
      title: "Private & Secure",
      text: "Your data is encrypted and protected.",
    },
    {
      icon: <svg className="w-6 h-6 text-[#16a34a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>,
      title: "90-Day Auto Delete",
      text: "We automatically delete your data after 90 days.",
    },
    {
      icon: <span className="text-[24px]">❤️</span>,
      title: "Not Therapy",
      text: "MoodFlip is a self-reflection utility, not a medical service.",
    },
    {
      icon: <svg className="w-6 h-6 text-[#3b82f6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
      title: "You're Not Alone",
      text: "Millions use MoodFlip for small shifts, every day.",
    },
    {
      icon: <span className="text-[24px]">✨</span>,
      title: "Made with Care",
      text: "Simple tools for a better you, one step at a time.",
    },
  ];

  return (
    <section className="my-8 grid gap-4 rounded-[28px] border border-[#f0ebf8] bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item, i) => (
        <div
          key={item.title}
          className="flex items-center gap-4 rounded-2xl p-2"
        >
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${i === 1 ? 'bg-[#dcfce7]' : i === 3 ? 'bg-[#e0f2fe]' : 'bg-[#f5f1ff] text-[#7245e3]'}`}>
            {item.icon}
          </span>

          <div>
            <p className="text-[13px] font-bold text-[#1a142c]">{item.title}</p>
            <p className="mt-1 text-[11px] font-medium leading-relaxed text-[#7a748c]">
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
    <footer className="mt-8 rounded-t-[32px] bg-[#1a162b] px-8 py-10 text-white">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <div className="relative flex h-7 w-7 items-center justify-center">
              <span className="absolute bottom-0 left-0.5 h-5 w-5 rounded-full border-[4px] border-[#713ee2] border-t-transparent" />
              <span className="absolute left-0.5 top-0 h-2 w-2 rounded-full bg-[#f4a746]" />
              <span className="absolute right-0 top-1 h-1.5 w-1.5 rounded-full bg-[#d94fc5]" />
            </div>
            <span className="text-[22px] font-black tracking-tight">
              mood<span className="text-[#9a65ed]">flip</span>
            </span>
          </div>

          <p className="text-[14px] font-medium text-[#9b93b3]">
            A self-reflection utility for real life.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4 text-[14px] font-semibold text-[#c8c2d6]">
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">How It Works</a>
          <a href="#" className="hover:text-white transition">Mood Library</a>
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>

        <p className="text-[13px] font-medium text-[#9b93b3]">
          © 2026 MoodFlip.coach <span className="text-[#9a65ed]">💜</span>
        </p>
      </div>
    </footer>
  );
}