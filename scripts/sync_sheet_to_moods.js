/**
 * sync_sheet_to_moods.js
 * SYNCS Google Sheets live data -> data/moods.ts
 * - Uses Pairings sheet for action descriptions
 * - Uses Rotating Actions sheet for actions[] array (rotation)
 * - Preserves all existing emoji, category, bgColor, textColor from moods.ts
 */
const fs = require("fs");

// Load data saved from live Google Sheets
const raw  = JSON.parse(fs.readFileSync("scripts/pairings_live.json","utf8"));
const raws = JSON.parse(fs.readFileSync("scripts/rotating_live.json","utf8"));

// Fix PowerShell ConvertTo-Json array format
const normalize = arr => arr.map(r => Array.isArray(r) ? r : (r.value ? r.value : Object.values(r)));
const pairings = normalize(raw);
const rotating  = normalize(raws);

// Skip headers, filter empty rows
const pRows = pairings.slice(1).filter(r => r && r[0] && r[1] && !r[0].toString().startsWith("Serial"));
const rRows = rotating.slice(1).filter(r => r && r[0] && r[4]);

// Build rotating actions map: serial (int) -> [action1, action2, ...]
const actionsMap = {};
rRows.forEach(r => {
  const serial = parseInt(r[0]);
  if (!isNaN(serial)) {
    if (!actionsMap[serial]) actionsMap[serial] = [];
    actionsMap[serial].push(r[4]);
  }
});

console.log("Pairings loaded:", pRows.length);
console.log("Action groups:", Object.keys(actionsMap).length);

// Hardcoded metadata table — preserves all original emoji, category, color, feelings, whyHelps
// This is the single source of truth for display metadata (Google Sheets only has action text)
const meta = {
  1:  { id:"scared",       emoji:"😨", category:"Anxious",     bgColor:"#FEF3C7", textColor:"#D97706", actionTitle:"Ground Your Feet & Name 5 Things",    whyHelps:"Physical grounding shifts your focus from perceived threat to current physical reality.",         feelings:["Fearful","Terrified","Panicked","Uneasy"] },
  2:  { id:"anxious",      emoji:"🌀", category:"Anxious",     bgColor:"#E0F2FE", textColor:"#0284C7", actionTitle:"Box Breathing Reset",                   whyHelps:"Box breathing regulates your autonomic nervous system and slows down rapid heart rate.",          feelings:["Nervous","Uneasy","Worried","Restless","On edge"] },
  3:  { id:"insecure",     emoji:"🛡️", category:"Anxious",     bgColor:"#FFF7EB", textColor:"#D97706", actionTitle:"Posture Shift & Past Victories",         whyHelps:"Upright posture combined with evidence of past resilience lowers stress hormones.",              feelings:["Doubtful","Exposed","Uncertain","Inadequate"] },
  4:  { id:"weak",         emoji:"🥀", category:"Low",         bgColor:"#F3F4F6", textColor:"#4B5563", actionTitle:"Firm Grounding & Micro-Control",          whyHelps:"Refocusing on tiny actionable choices restores feeling of personal agency.",                    feelings:["Powerless","Fragile","Helpless","Exhausted"] },
  5:  { id:"rejected",     emoji:"💔", category:"Lonely",      bgColor:"#FFF0F3", textColor:"#E11D48", actionTitle:"Heart Touch & Self-Worth",               whyHelps:"Self-directed touch releases oxytocin and soothes emotional sting.",                           feelings:["Let down","Unwanted","Excluded","Hurt"] },
  6:  { id:"threatened",   emoji:"⚠️", category:"Anxious",     bgColor:"#FEF2F2", textColor:"#DC2626", actionTitle:"Body Release & Safe Presence",           whyHelps:"Releasing jaw and shoulder muscular tension signals safety to the amygdala.",                   feelings:["Vulnerable","Unsafe","Guarded","On defense"] },
  7:  { id:"let-down",     emoji:"🌧️", category:"Low",         bgColor:"#EEF2FF", textColor:"#4F46E5", actionTitle:"Acknowledge & Open Next Door",           whyHelps:"Validating emotion without fixing creates mental room for new possibilities.",                  feelings:["Disappointed","Discouraged","Unseen","Sad"] },
  8:  { id:"humiliated",   emoji:"😳", category:"Low",         bgColor:"#FDF2F8", textColor:"#DB2777", actionTitle:"Upright Self-Acceptance",                 whyHelps:"Self-acceptance acts as a buffer against external judgment.",                                   feelings:["Embarrassed","Ashamed","Exposed","Small"] },
  9:  { id:"bitter",       emoji:"🍋", category:"Angry",       bgColor:"#FFFBEB", textColor:"#D97706", actionTitle:"Release the Heavy Burden",               whyHelps:"Visualizing setting down emotional weight relieves physiological tension.",                      feelings:["Resentful","Grudging","Sour","Hurt"] },
  10: { id:"angry",        emoji:"😡", category:"Angry",       bgColor:"#FFF0F0", textColor:"#DC2626", actionTitle:"Wall Pushes for Energy Release",          whyHelps:"Isometric wall pushes safely discharge adrenaline and physical anger energy.",                  feelings:["Furious","Mad","Irritated","Fuming"] },
  11: { id:"aggressive",   emoji:"🔥", category:"Angry",       bgColor:"#FEF2F2", textColor:"#991B1B", actionTitle:"Step Back & Open Hands",                 whyHelps:"Unclenching hands signals non-aggression directly to the motor cortex.",                       feelings:["Combative","Hostile","Fierce","Attacking"] },
  12: { id:"frustrated",   emoji:"💥", category:"Angry",       bgColor:"#FFF4EB", textColor:"#EA580C", actionTitle:"The Single Smallest Step",               whyHelps:"Deconstructing a roadblock into 1 tiny step restores momentum.",                               feelings:["Blocked","Annoyed","Impatient","Stuck"] },
  13: { id:"distant",      emoji:"🌌", category:"Lonely",      bgColor:"#F0F9FF", textColor:"#0369A1", actionTitle:"No-Performance Reachout",                 whyHelps:"Connection without the burden of performance repairs social fatigue.",                          feelings:["Detached","Disconnected","Withdrawn","Isolated"] },
  14: { id:"critical",     emoji:"🔍", category:"Overwhelmed", bgColor:"#F5F3FF", textColor:"#6D28D9", actionTitle:"Curiosity Perspective Shift",             whyHelps:"Curiosity activates problem-solving circuits instead of judgment circuits.",                    feelings:["Judgmental","Fault-finding","Harsh","Perfectionist"] },
  15: { id:"disapproving", emoji:"🤨", category:"Angry",       bgColor:"#FFFBEB", textColor:"#B45309", actionTitle:"Understand Without Agreeing",             whyHelps:"Decoupling empathy from agreement lowers defensive mental guard.",                             feelings:["Displeased","Critical","Unaccepting","Resistant"] },
  16: { id:"uncomfortable",emoji:"😣", category:"Overwhelmed", bgColor:"#F1F5F9", textColor:"#334155", actionTitle:"Body Sensation Scan",                    whyHelps:"Objective naming of sensations removes panic from physical discomfort.",                        feelings:["Uneasy","Awkward","Tense","Restless"] },
  17: { id:"awful",        emoji:"🌑", category:"Low",         bgColor:"#F3F4F6", textColor:"#1F2937", actionTitle:"Temporary Moment Anchor",                 whyHelps:"Recognizing impermanence prevents temporary feeling from seeming endless.",                    feelings:["Terrible","Miserable","Dreadful","Heavy"] },
  18: { id:"repelled",     emoji:"🛑", category:"Overwhelmed", bgColor:"#FEE2E2", textColor:"#991B1B", actionTitle:"Physical Space & Boundary",              whyHelps:"Physical distance reinforces internal autonomy and personal boundaries.",                       feelings:["Disgusted","Averse","Pushed away","Overwhelmed"] },
  19: { id:"hurt",         emoji:"🩹", category:"Low",         bgColor:"#FFF0F3", textColor:"#BE123C", actionTitle:"Hand on Hurt & Self-Value",              whyHelps:"Self-directed care validates personal pain without shame.",                                     feelings:["Pained","Wounded","Grieving","Heartbroken"] },
  20: { id:"depressed",    emoji:"🕯️", category:"Low",         bgColor:"#EEF2FF", textColor:"#3730A3", actionTitle:"Listen to Music & Tiny Movement",        whyHelps:"Micro-movements and music gently stimulate dopamine release without overwhelming.",            feelings:["Down","Empty","Heavy","Unmotivated"] },
  21: { id:"guilty",       emoji:"🥺", category:"Low",         bgColor:"#F3E8FF", textColor:"#7E22CE", actionTitle:"Honest Repair Selection",                 whyHelps:"Focusing on constructive repair shifts mind from shame to responsibility.",                    feelings:["Regretful","Ashamed","Remorseful","Faulty"] },
  22: { id:"despair",      emoji:"⚓", category:"Low",         bgColor:"#F1F5F9", textColor:"#0F172A", actionTitle:"Survival Anchor & The Next Minute",      whyHelps:"Narrowing timeline to the next 60 seconds reduces unbearable future worry.",                   feelings:["Hopeless","Lost","Gloom","Defeated"] },
  23: { id:"vulnerable",   emoji:"🌱", category:"Anxious",     bgColor:"#ECFDF5", textColor:"#047857", actionTitle:"Safe Boundary & Reassurance",            whyHelps:"Framing vulnerability as courage builds self-trust.",                                           feelings:["Exposed","Unprotected","Sensitive","Raw"] },
  24: { id:"lonely",       emoji:"👤", category:"Lonely",      bgColor:"#EFF6FF", textColor:"#1D4ED8", actionTitle:"Low-Pressure Warm Text",                 whyHelps:"Reaching out gently removes performance pressure while signaling warmth.",                     feelings:["Alone","Isolated","Unseen","Missing connection"] },
  25: { id:"tired",        emoji:"🔋", category:"Low",         bgColor:"#ECFDF5", textColor:"#059669", actionTitle:"60-Second Complete Rest",                 whyHelps:"Closing eyes shuts down 80% of sensory intake, allowing immediate rest.",                     feelings:["Drained","Exhausted","Sleepy","Burnt Out"] },
  26: { id:"stressed",     emoji:"⚡", category:"Overwhelmed", bgColor:"#FDF2F8", textColor:"#BE185D", actionTitle:"Write 3 Stressors & Choose 1 Action",   whyHelps:"Writing down stressors offloads working memory and clarifies single focus.",                   feelings:["Tense","Pressured","Frustrated","Overworked"] },
  27: { id:"busy",         emoji:"⏳", category:"Overwhelmed", bgColor:"#FEF3C7", textColor:"#B45309", actionTitle:"Pause, Delete, or Delay 1 Task",         whyHelps:"Intentionally choosing to delay one task creates immediate cognitive breathing room.",          feelings:["Rushed","Hurried","Frantic","Overcommitted"] },
  28: { id:"bored",        emoji:"🥱", category:"Low",         bgColor:"#F3F4F6", textColor:"#374151", actionTitle:"5% Curiosity Shift",                     whyHelps:"A 5% tweak lowers friction and rekindles intrinsic interest.",                                 feelings:["Uninterested","Dull","Restless","Stagnant"] },
};
console.log("Metadata hardcoded for serials:", Object.keys(meta).length);

// Escape string for use inside double-quoted TS string
const esc = s => (s || "")
  .replace(/\r?\n/g, " ")
  .replace(/\\/g, "\\\\")
  .replace(/[\u2018\u2019\u02BC]/g, "'")       // curly single quotes -> straight
  .replace(/[\u201C\u201D\u201E\u201F]/g, '"') // curly double quotes -> straight
  .replace(/"/g, '\\"');                        // escape all double quotes LAST

// Build updated moods.ts content
let output = `export type MoodCategory = 'All' | 'Low' | 'Anxious' | 'Angry' | 'Overwhelmed' | 'Lonely';

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
`;

pRows.forEach((row, idx) => {
  const serial = parseInt(row[0]);
  const name = row[1] || "";
  const target = row[2] || "";
  const defaultAction = row[3] || "";
  const col1Notes = (row[4] || "").replace(/^APPLIED - /, "").replace(/^APPLIED$/, "");
  
  // Get preserved meta
  const m = meta[serial] || {};
  const id = m.id || name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g,"");
  const emoji = m.emoji || "😌";
  const category = m.category || "Low";
  const bgColor = m.bgColor || "#F3F4F6";
  const textColor = m.textColor || "#374151";
  const feelings = m.feelings && m.feelings.length ? m.feelings : ["Unsettled", "Heavy", "Tense", "Drained"];
  const whyHelps = m.whyHelps || "This exercise helps ground you in the present moment.";
  const actionTitle = m.actionTitle || (name + " Reset");
  
  // Get rotating actions from sheet - these are the proper rotation array
  const rotatingActions = actionsMap[serial] || [defaultAction];
  
  // Use first rotating action as primary (should match default after fixes)
  // Build actions[] from the rotating actions (first 4 for display, all for rotation)
  const displayActions = rotatingActions.slice(0, 4);
  const reframeQuote = defaultAction.length > 10 ? defaultAction.split(".")[0] + "." : defaultAction;
  
  output += `  {
    // Serial ${serial} — synced from Google Sheets (Pairings + Rotating Actions)
    serial: ${serial},
    id: "${esc(id)}",
    name: "${esc(name)}",
    emoji: "${esc(emoji)}",
    category: "${esc(category)}",
    bgColor: "${esc(bgColor)}",
    textColor: "${esc(textColor)}",
    feelings: [${feelings.map(f => '"' + esc(f) + '"').join(", ")}],
    target: "${esc(target)}",
    actionTitle: "${esc(actionTitle)}",
    actionDesc: "${esc(defaultAction)}",
    whyHelps: "${esc(whyHelps)}",
    actions: [
${rotatingActions.map(a => '      "' + esc(a) + '"').join(",\n")}
    ],
    reframeQuote: "${esc(reframeQuote)}",
    column1Notes: "${esc(col1Notes)}"
  },
`;

});

output += `];

// For backward compatibility
export const MOODS = COUNSELOR_MOODS;
`;

// Write updated moods.ts
fs.writeFileSync("data/moods.ts", output, "utf8");
console.log("\nSUCCESS: data/moods.ts updated with", pRows.length, "moods");
console.log("Each mood now has", Object.keys(actionsMap).length, "serial groups with rotating actions");
console.log("\nSample - Serial 1 (Scared):");
console.log("  Default action:", pRows[0][3]);
console.log("  Rotating actions count:", actionsMap[1] ? actionsMap[1].length : 0);
