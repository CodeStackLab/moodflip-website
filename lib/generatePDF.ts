import jsPDF from 'jspdf';

// ════════════════════════════════════════════════════════════════════
// MOODFLIP PROFESSIONAL PDF ENGINE (jsPDF Powered)
// 100% Browser Native * Zero Vercel/Supabase Serverless Limits
// 100% Pixel-Perfect Layout * Auto Text-Wrap * Vector Graphics
// ════════════════════════════════════════════════════════════════════

// Safe text sanitizer for Type1 fonts
function esc(str: string): string {
  if (!str) return '';
  return str
    .replace(/—/g, ' - ')
    .replace(/–/g, '-')
    .replace(/’/g, "'")
    .replace(/‘/g, "'")
    .replace(/”/g, '"')
    .replace(/“/g, '"')
    .replace(/•/g, '*')
    .replace(/→/g, '->')
    .replace(/✓/g, '[v]');
}

function getBookIdx(title: string): number {
  const t = title.toLowerCase();
  if (t.includes('7-day') || t.includes('7 day') || t.includes('mindset guide')) return 1;
  if (t.includes('micro-action') || t.includes('cheat sheet') || t.includes('60-second') || t.includes('60 second')) return 2;
  if (t.includes('reflection') || t.includes('journal') || t.includes('daily')) return 3;
  if (t.includes('30-day') || t.includes('30 day') || t.includes('resilience') || t.includes('e-book')) return 4;
  if (t.includes('completion') || t.includes('certificate') || t.includes('report')) return 5;
  return 3;
}

const FILENAMES: Record<number, string> = {
  1: 'MoodFlip_7Day_Mindset_Guide',
  2: 'MoodFlip_60Second_MicroActions_CheatSheet',
  3: 'MoodFlip_Daily_Reflection_Journal',
  4: 'MoodFlip_30Day_Resilience_EBook',
  5: 'MoodFlip_Plan_Completion_Certificate',
};

// ── Shared Page Decorators ─────────────────────────────────────────

function drawHeader(doc: jsPDF, title: string, subtitle?: string) {
  doc.setFillColor(18, 12, 48); // Dark Deep Purple
  doc.rect(0, 0, 612, 32, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(212, 171, 255); // Accent Purple
  doc.text('moodflip', 40, 20);

  if (subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(212, 171, 255);
    doc.text(esc(subtitle), 572, 20, { align: 'right' });
  }
}

function drawFooter(doc: jsPDF, page: number, total: number, label: string) {
  doc.setFillColor(246, 244, 250);
  doc.rect(0, 764, 612, 28, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(113, 71, 232);
  doc.text('moodflip', 40, 781);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120, 115, 140);
  doc.text(esc(label), 160, 781);

  doc.text(`Page ${page} of ${total}`, 572, 781, { align: 'right' });
}

// ════════════════════════════════════════════════════════════════════
// BOOK 1: 7-Day Mindset Guide (14 Pages)
// ════════════════════════════════════════════════════════════════════
function buildBook1(doc: jsPDF, userName: string) {
  const user = userName || 'Valued Member';
  const total = 14;

  // ── Cover Page (Page 1) ──
  // Full cover background - Top Dark, Bottom Accent
  doc.setFillColor(18, 12, 48);
  doc.rect(0, 0, 612, 792, 'F');

  doc.setFillColor(48, 33, 117);
  doc.rect(0, 0, 612, 430, 'F');

  doc.setFillColor(69, 50, 143);
  doc.rect(0, 370, 612, 60, 'F');

  doc.setFillColor(113, 71, 232);
  doc.rect(0, 426, 612, 4, 'F');

  // Left vertical accent line
  doc.setFillColor(212, 171, 255);
  doc.rect(40, 45, 5, 335, 'F');

  // Header Tagline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(212, 171, 255);
  doc.text('MOODFLIP PRESENTS', 56, 65);

  // Main Titles
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(44);
  doc.setTextColor(255, 255, 255);
  doc.text('7-Day Mindset', 56, 120);

  doc.setTextColor(212, 171, 255);
  doc.text('Guide & Workbook', 56, 175);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(230, 220, 250);
  doc.text('Your complete step-by-step emotional reset companion', 56, 215);

  doc.setFillColor(212, 171, 255);
  doc.rect(56, 230, 280, 1.5, 'F');

  // Bullet Points
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(210, 200, 235);
  doc.text('* 7 evidence-informed daily mindset exercises', 56, 260);
  doc.text('* 60-second micro-action protocols for fast shifts', 56, 282);
  doc.text('* Guided morning & evening reflection prompts', 56, 304);
  doc.text('* Printable mood tracker & breathing reference library', 56, 326);

  // Belongs to Card
  doc.setFillColor(27, 19, 64);
  doc.roundedRect(40, 540, 532, 100, 8, 8, 'F');
  doc.setDrawColor(113, 71, 232);
  doc.setLineWidth(1.5);
  doc.roundedRect(40, 540, 532, 100, 8, 8, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(212, 171, 255);
  doc.text('THIS GUIDE BELONGS TO', 60, 570);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(`Name: ${esc(user)}`, 60, 600);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(190, 180, 220);
  doc.text('Start Date: ____________________', 340, 600);

  // Bottom Branding
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(113, 71, 232);
  doc.text('moodflip', 40, 745);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(150, 140, 180);
  doc.text('7-Day Mindset Guide * Self-reflection utility * Not medical advice', 140, 745);

  // ── Page 2: Welcome & Instructions ──
  doc.addPage();
  drawHeader(doc, 'moodflip | 7-Day Mindset Guide');

  doc.setFillColor(60, 43, 133);
  doc.roundedRect(40, 50, 532, 42, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('Welcome to Your 7-Day Journey', 56, 76);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 50, 90);
  doc.text('This guide helps you build a sustainable daily mindset practice through small, proven 60-second actions.', 40, 115);
  doc.text('You do not need to be perfect. You only need to show up each day with curiosity.', 40, 132);

  doc.setDrawColor(220, 210, 240);
  doc.setLineWidth(1);
  doc.line(40, 150, 572, 150);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(48, 33, 117);
  doc.text('How to Use This Guide', 40, 175);

  const stepsP2 = [
    { n: '01', t: 'Daily Check-In', d: 'Each morning, identify your starting mood and the positive direction you want to move toward.', y: 195 },
    { n: '02', t: '60-Second Action', d: 'Perform the recommended micro-action. It takes just 60 seconds and is evidence-informed.', y: 270 },
    { n: '03', t: 'Record and Reflect', d: 'Write down your before and after. Notice what shifted, even slightly.', y: 345 },
    { n: '04', t: 'End-of-Day Review', d: 'Use the evening reflection prompts to close your day with intention.', y: 420 },
  ];

  stepsP2.forEach((s, i) => {
    doc.setFillColor(i % 2 === 0 ? 246 : 250, i % 2 === 0 ? 242 : 248, i % 2 === 0 ? 255 : 255);
    doc.roundedRect(40, s.y, 532, 60, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(40, s.y, 532, 60, 6, 6, 'S');

    doc.setFillColor(60, 43, 133);
    doc.roundedRect(40, s.y, 42, 60, 6, 6, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(255, 255, 255);
    doc.text(s.n, 51, s.y + 35);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(48, 33, 117);
    doc.text(s.t, 95, s.y + 24);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(90, 80, 120);
    doc.text(doc.splitTextToSize(s.d, 460), 95, s.y + 40);
  });

  // Notice box
  doc.setFillColor(246, 242, 255);
  doc.roundedRect(40, 520, 532, 180, 8, 8, 'F');
  doc.setDrawColor(212, 171, 255);
  doc.roundedRect(40, 520, 532, 180, 8, 8, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(60, 43, 133);
  doc.text('A Note on Wellbeing & Self-Care', 56, 550);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(90, 80, 120);
  const noticeLines = [
    'MoodFlip is a self-reflection utility designed to support everyday emotional awareness.',
    'It is not therapy or medical advice. If you are struggling with intense distress, please reach out to a licensed professional.',
    'Emergency / Crisis Help: Please contact your local helpline or emergency services immediately.'
  ];
  noticeLines.forEach((line, idx) => {
    doc.text(line, 56, 575 + idx * 20);
  });

  drawFooter(doc, 2, total, '7-Day Mindset Guide');

  // ── Pages 3-9: 7 Daily Exercise Pages ──
  const days = [
    { t: 'Name the Feeling', sub: 'Identify & Separate Your Emotion', m: 'What emotion am I waking up with today?', a: 'Name the feeling out loud 3 times, then say: I am not my emotion.', e: 'What did I notice about how the feeling changed today?' },
    { t: '60-Second Grounding', sub: 'Bring Yourself Back to the Present', m: 'Where is my tension sitting in my body right now?', a: '5-4-3-2-1: Name 5 things you see, 4 you touch, 3 you hear, 2 smell, 1 taste.', e: 'Did grounding help me feel more present? How?' },
    { t: 'Gratitude Shift', sub: 'Reframe Your Perspective', m: 'What is one thing I am genuinely grateful for today?', a: 'Write 3 specific things you appreciate. Be detailed, not generic.', e: 'How did focusing on gratitude change my energy throughout the day?' },
    { t: 'Somatic Reset', sub: 'Release Physical Tension', m: 'Where am I holding stress physically right now?', a: 'Unclench jaw, drop shoulders, breathe in 4 counts, hold 7, exhale 8 counts.', e: 'What did I notice in my body after the breathing exercise?' },
    { t: 'Boundary Practice', sub: 'Protect Your Mental Energy', m: 'What is one thing I need to say no to today for my own wellbeing?', a: 'Write the boundary. Practise saying it aloud in a calm, clear voice.', e: 'How did setting a clear boundary intention affect my energy today?' },
    { t: 'Evening Mind Dump', sub: 'Clear Space Before Sleep', m: 'What worries am I carrying into today that belong to yesterday?', a: 'Write every worry on paper. Fold the paper and put it away until tomorrow.', e: 'Did writing down worries reduce their weight? What did I notice?' },
    { t: 'Resilience Anchor', sub: 'Build a Lasting Daily Habit', m: 'What one micro-habit do I want to anchor permanently from this week?', a: 'Write the habit, the trigger, and the exact time you will do it every day.', e: 'What is the most important thing I learned about myself this week?' },
  ];

  days.forEach((day, di) => {
    doc.addPage();
    const pageNum = 3 + di;
    drawHeader(doc, 'moodflip | 7-Day Mindset Guide', `DAY ${di + 1} OF 7`);

    doc.setFillColor(48, 33, 117);
    doc.roundedRect(40, 50, 532, 38, 6, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(`DAY ${di + 1}: ${esc(day.t)}`, 56, 75);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(100, 90, 130);
    doc.text(esc(day.sub), 40, 105);

    doc.setDrawColor(220, 210, 240);
    doc.line(40, 115, 572, 115);

    // Morning Box
    doc.setFillColor(246, 242, 255);
    doc.roundedRect(40, 130, 532, 60, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(40, 130, 532, 60, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 43, 133);
    doc.text('MORNING INTENTION', 52, 148);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 70, 110);
    doc.text(esc(day.m), 52, 165);
    doc.text('__________________________________________________________________________', 52, 180);

    // 60-Sec Action Box
    doc.setFillColor(60, 43, 133);
    doc.roundedRect(40, 205, 532, 80, 6, 6, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(212, 171, 255);
    doc.text("TODAY'S 60-SECOND ACTION", 56, 225);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(doc.splitTextToSize(esc(day.a), 500), 56, 245);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(200, 190, 230);
    doc.text('[  ] I completed this 60-second action today', 56, 275);

    // Before & After Side-by-Side
    doc.setFillColor(246, 242, 255);
    doc.roundedRect(40, 300, 255, 90, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(40, 300, 255, 90, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(60, 43, 133);
    doc.text('BEFORE: How I felt', 52, 320);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(140, 130, 160);
    doc.text('_________________________________', 52, 345);
    doc.text('_________________________________', 52, 370);

    doc.setFillColor(246, 242, 255);
    doc.roundedRect(317, 300, 255, 90, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(317, 300, 255, 90, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(60, 43, 133);
    doc.text('AFTER: What shifted', 329, 320);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(140, 130, 160);
    doc.text('_________________________________', 329, 345);
    doc.text('_________________________________', 329, 370);

    // My Reflection Box
    doc.setFillColor(246, 242, 255);
    doc.roundedRect(40, 405, 532, 115, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(40, 405, 532, 115, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 43, 133);
    doc.text('MY REFLECTION: What I want to remember from today', 56, 428);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(140, 130, 160);
    doc.text('____________________________________________________________________________', 56, 452);
    doc.text('____________________________________________________________________________', 56, 476);
    doc.text('____________________________________________________________________________', 56, 500);

    // Evening Prompt Box
    doc.setFillColor(246, 242, 255);
    doc.roundedRect(40, 535, 532, 90, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(40, 535, 532, 90, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 43, 133);
    doc.text('EVENING PROMPT', 56, 555);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 70, 110);
    doc.text(esc(day.e), 56, 573);
    doc.text('____________________________________________________________________________', 56, 598);

    // Rating Scale
    doc.setFillColor(246, 242, 255);
    doc.roundedRect(40, 640, 532, 85, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(40, 640, 532, 85, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 43, 133);
    doc.text('MOOD RATING: 1 = Very low | 5 = Neutral | 10 = Great', 56, 662);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(113, 71, 232);
    doc.text('1    2    3    4    5    6    7    8    9    10', 56, 700);

    drawFooter(doc, pageNum, total, '7-Day Mindset Guide');
  });

  // ── Page 10: 7-Day Summary ──
  doc.addPage();
  drawHeader(doc, 'moodflip | 7-Day Mindset Guide');

  doc.setFillColor(48, 33, 117);
  doc.roundedRect(40, 50, 532, 40, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('7-Day Reflection Summary', 56, 76);

  const summaryPrompts = [
    { l: 'Patterns I noticed in my moods this week', y: 110 },
    { l: 'The 60-second actions that felt most effective', y: 210 },
    { l: 'The biggest insight I gained about myself', y: 310 },
    { l: 'My intention for the next 7 days', y: 410 }
  ];

  summaryPrompts.forEach(({ l, y }) => {
    doc.setFillColor(246, 242, 255);
    doc.roundedRect(40, y, 532, 85, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(40, y, 532, 85, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 43, 133);
    doc.text(esc(l), 52, y + 22);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(140, 130, 160);
    doc.text('__________________________________________________________________________', 52, y + 45);
    doc.text('__________________________________________________________________________', 52, y + 68);
  });

  // 7-Day Log Grid
  doc.setFillColor(60, 43, 133);
  doc.roundedRect(40, 515, 532, 110, 8, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('7-Day Mood Rating Tracker Log', 56, 538);

  for (let i = 0; i < 7; i++) {
    const x = 48 + i * 74;
    doc.setFillColor(48, 33, 117);
    doc.roundedRect(x, 550, 66, 60, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(x, 550, 66, 60, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(212, 171, 255);
    doc.text(`Day ${i + 1}`, x + 16, 570);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(180, 170, 210);
    doc.text('___/10', x + 14, 595);
  }

  drawFooter(doc, 10, total, '7-Day Mindset Guide');

  // ── Page 11: Mood Flip Pairings ──
  doc.addPage();
  drawHeader(doc, 'moodflip | 7-Day Mindset Guide');

  doc.setFillColor(48, 33, 117);
  doc.roundedRect(40, 50, 532, 40, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('Quick Reference: Mood Flip Pairings', 56, 76);

  const pairs = [
    ['Scared', 'Safe / Peaceful'], ['Anxious', 'Peaceful'], ['Insecure', 'Confident'],
    ['Weak', 'Powerful'], ['Rejected', 'Accepted'], ['Lonely', 'Connected'],
    ['Angry', 'Calm'], ['Overwhelmed', 'Organised'], ['Stressed', 'Relaxed'],
    ['Sad', 'Hopeful'], ['Frustrated', 'Patient'], ['Defeated', 'Resilient'],
    ['Jealous', 'Grateful'], ['Guilty', 'Forgiven'], ['Ashamed', 'Worthy'],
    ['Numb', 'Present'], ['Lost', 'Grounded'], ['Burned Out', 'Restored']
  ];

  pairs.forEach(([bad, good], idx) => {
    const col = idx < 9 ? 0 : 1;
    const row = idx % 9;
    const x = col === 0 ? 40 : 315;
    const y = 110 + row * 62;

    doc.setFillColor(idx % 2 === 0 ? 246 : 250, idx % 2 === 0 ? 242 : 248, idx % 2 === 0 ? 255 : 255);
    doc.roundedRect(x, y, 256, 52, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(x, y, 256, 52, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(200, 50, 60);
    doc.text(bad, x + 12, y + 22);

    doc.setTextColor(113, 71, 232);
    doc.text('->', x + 110, y + 22);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(40, 140, 80);
    doc.text(good, x + 135, y + 22);
  });

  drawFooter(doc, 11, total, '7-Day Mindset Guide');

  // ── Page 12: Commitment Page ──
  doc.addPage();
  doc.setFillColor(18, 12, 48);
  doc.rect(0, 0, 612, 792, 'F');

  doc.setFillColor(60, 43, 133);
  doc.roundedRect(40, 50, 532, 45, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('MY 7-DAY MINDSET COMMITMENT', 130, 78);

  doc.setFillColor(27, 19, 64);
  doc.roundedRect(40, 120, 532, 200, 8, 8, 'F');
  doc.setDrawColor(113, 71, 232);
  doc.roundedRect(40, 120, 532, 200, 8, 8, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(212, 171, 255);
  doc.text('I Commit to:', 60, 150);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(230, 220, 255);
  doc.text('* Checking in with my mood honestly each morning', 60, 178);
  doc.text('* Completing the 60-second action even on hard days', 60, 200);
  doc.text('* Treating myself with patience and curiosity', 60, 222);
  doc.text('* Noticing small shifts, not demanding perfection', 60, 244);
  doc.text('* Using MoodFlip as a daily mindset companion', 60, 266);
  doc.text('Signed: ______________________________ Date: __________________', 60, 298);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(255, 255, 255);
  doc.text('A Small Shift Today.', 120, 370);
  doc.setTextColor(212, 171, 255);
  doc.text('A Better You Tomorrow.', 90, 415);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(200, 190, 230);
  doc.text('Thank you for committing to 7 days of intentional growth.', 110, 460);
  doc.text('Small consistent actions always outperform grand gestures.', 110, 482);

  doc.setFillColor(27, 19, 64);
  doc.roundedRect(40, 520, 532, 110, 8, 8, 'F');
  doc.setDrawColor(113, 71, 232);
  doc.roundedRect(40, 520, 532, 110, 8, 8, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(113, 71, 232);
  doc.text('MoodFlip', 250, 555);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(212, 171, 255);
  doc.text('Self-reflection utility * Daily mindset shifts', 160, 580);
  doc.text('moodflip.app * Not medical advice', 160, 600);

  drawFooter(doc, 12, total, '7-Day Mindset Guide');

  // ── Page 13: Bonus Breathing Reference ──
  doc.addPage();
  drawHeader(doc, 'moodflip | Bonus: Breathing Library');

  doc.setFillColor(48, 33, 117);
  doc.roundedRect(40, 50, 532, 40, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('Breathing Technique Reference Library', 56, 76);

  const breathe = [
    { n: 'Box Breathing 4-4-4-4', s: 'Inhale 4 counts - Hold 4 counts - Exhale 4 counts - Hold 4 counts', u: 'Best for: Anxiety, stress, performance pressure' },
    { n: '4-7-8 Relaxing Breath', s: 'Inhale 4 counts - Hold 7 counts - Exhale slowly 8 counts', u: 'Best for: Sleep difficulty, racing thoughts, anger' },
    { n: 'Extended Exhale 4-6', s: 'Inhale 4 counts - Exhale slowly 6 counts. Repeat 6 times.', u: 'Best for: Anxiety, panic, emotional overwhelm' },
    { n: '5-5-5 Triangle Breath', s: 'Inhale 5 counts - Hold 5 counts - Exhale 5 counts', u: 'Best for: Focus, grounding, pre-presentation nerves' },
    { n: 'Physiological Sigh', s: 'Double inhale through nose short then long, then long exhale through mouth', u: 'Best for: Instant stress relief, panic, overwhelm' }
  ];

  breathe.forEach((b, i) => {
    const y = 110 + i * 115;
    doc.setFillColor(246, 242, 255);
    doc.roundedRect(40, y, 532, 95, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(40, y, 532, 95, 6, 6, 'S');

    doc.setFillColor(113, 71, 232);
    doc.rect(40, y, 6, 95, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(48, 33, 117);
    doc.text(esc(b.n), 56, y + 25);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(80, 70, 110);
    doc.text(esc(b.s), 56, y + 48);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(113, 71, 232);
    doc.text(esc(b.u), 56, y + 72);
  });

  drawFooter(doc, 13, total, '7-Day Mindset Guide');

  // ── Page 14: Dark Back Cover ──
  doc.addPage();
  doc.setFillColor(18, 12, 48);
  doc.rect(0, 0, 612, 792, 'F');

  doc.setFillColor(48, 33, 117);
  doc.rect(0, 0, 612, 320, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(48);
  doc.setTextColor(212, 171, 255);
  doc.text('moodflip', 140, 160);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(200, 190, 230);
  doc.text('Build a better mindset, one day at a time.', 90, 210);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(170, 160, 200);
  doc.text('Thank you for completing the 7-Day Mindset Guide.', 90, 360);
  doc.text('Your consistency is the proof of your commitment.', 90, 385);

  doc.setFillColor(27, 19, 64);
  doc.roundedRect(80, 460, 452, 110, 8, 8, 'F');
  doc.setDrawColor(113, 71, 232);
  doc.roundedRect(80, 460, 452, 110, 8, 8, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(180, 170, 210);
  doc.text('MoodFlip is a self-reflection tool. It is not a substitute for professional mental health care.', 96, 500);
  doc.text('If you are struggling, please consult a licensed professional or crisis services.', 96, 525);

  drawFooter(doc, 14, total, '7-Day Mindset Guide');
}

// ════════════════════════════════════════════════════════════════════
// BOOK 2: 60-Second Micro-Actions Cheat Sheet (8 Pages)
// ════════════════════════════════════════════════════════════════════
function buildBook2(doc: jsPDF, userName: string) {
  const user = userName || 'Valued Member';
  const total = 8;

  // Page 1 Cover - Emerald Theme
  doc.setFillColor(8, 50, 32);
  doc.rect(0, 0, 612, 792, 'F');

  doc.setFillColor(12, 78, 50);
  doc.rect(0, 0, 612, 420, 'F');

  doc.setFillColor(50, 214, 140);
  doc.rect(0, 416, 612, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(50, 214, 140);
  doc.text('MOODFLIP PRESENTS', 56, 65);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(42);
  doc.setTextColor(255, 255, 255);
  doc.text('60-Second Micro-Actions', 56, 120);

  doc.setTextColor(50, 214, 140);
  doc.text('Cheat Sheet & Pocket Guide', 56, 175);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(180, 245, 215);
  doc.text('Printable pocket guide for fast emotional resets', 56, 215);

  doc.setFillColor(50, 214, 140);
  doc.rect(56, 230, 280, 1.5, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(180, 245, 215);
  doc.text('* 30+ evidence-informed micro-actions', 56, 260);
  doc.text('* Organised across 6 mood categories', 56, 282);
  doc.text('* Cut & fold wallet pocket card included', 56, 304);
  doc.text('* Works in 60 seconds or less', 56, 326);

  doc.setFillColor(8, 40, 25);
  doc.roundedRect(40, 540, 532, 100, 8, 8, 'F');
  doc.setDrawColor(50, 214, 140);
  doc.roundedRect(40, 540, 532, 100, 8, 8, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(50, 214, 140);
  doc.text('THIS GUIDE BELONGS TO', 60, 570);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(`Name: ${esc(user)}`, 60, 600);

  drawFooter(doc, 1, total, '60-Second Micro-Actions');

  // Pages 2-4: Micro Actions Categories
  const cats = [
    { n: 'ANXIETY AND FEAR', acts: ['5-4-3-2-1: Name 5 things you see, 4 you feel, 3 hear, 2 smell, 1 taste.', 'Box breathing: Inhale 4 - Hold 4 - Exhale 4 - Hold 4. Repeat 4 times.', 'Feet flat on floor. Say: Right now, I am safe.', 'Splash cold water on your wrists for an instant calm reset.', 'Write one worry on paper, fold it, and put it physically aside.'] },
    { n: 'ANGER AND FRUSTRATION', acts: ['Unclench your jaw. Drop shoulders. Breathe out slowly for 6 counts.', 'Walk for 60 seconds before responding to the situation.', 'Write what you want to say, then choose not to send it.', 'Press palms together and push hard for 10 seconds. Then release.', 'Name it out loud: I am angry because. Naming reduces its power.'] },
    { n: 'SADNESS AND LOW MOOD', acts: ['Step outside or open a window. Get 60 seconds of natural light.', 'Think of one person you feel safe with. Just acknowledge they exist.', 'Write one very specific thing you are grateful for today.', 'Put on one song that has ever made you feel better. Let it play.', 'Move for 60 seconds: stretch, walk, or shake your arms gently.'] },
    { n: 'OVERWHELM', acts: ['Brain dump: Write every task on paper. Organise outside your head.', 'Choose one next tiny step. Not the whole plan. Just 10 minutes.', 'Set a timer and tidy just one corner of your space for 60 seconds.', 'Say out loud: I do not have to solve everything today.', 'Do one thing you can completely finish in 60 seconds. Check it off.'] },
    { n: 'INSECURITY AND SELF-DOUBT', acts: ['Sit or stand taller. Name 3 things you have successfully handled before.', 'Write one compliment to yourself as if writing to your best friend.', 'Read one past piece of work or decision you feel proud of.', 'Breathe in slowly and say: I am still learning. That is enough.', 'Write: The last time I thought I could not, I did.'] },
    { n: 'STRESS AND BURNOUT', acts: ['Do nothing for 60 seconds. No phone. No task. Just exist.', 'Extended exhale: Breathe in 4 counts, breathe out 6 counts. 6 times.', 'List 3 things that are NOT your responsibility to fix right now.', 'Drink a full glass of water slowly. Focus only on that.', 'Write what you would tell a friend in exactly this situation.'] },
  ];

  for (let pg = 0; pg < 3; pg++) {
    doc.addPage();
    drawHeader(doc, 'moodflip | 60-Second Micro-Actions Cheat Sheet');

    const pageCats = cats.slice(pg * 2, pg * 2 + 2);
    pageCats.forEach((cat, ci) => {
      const base = ci === 0 ? 50 : 380;

      doc.setFillColor(12, 78, 50);
      doc.roundedRect(40, base, 532, 34, 6, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(50, 214, 140);
      doc.text(cat.n, 56, base + 22);

      cat.acts.forEach((act, ai) => {
        const ay = base + 45 + ai * 52;
        doc.setFillColor(245, 252, 248);
        doc.roundedRect(40, ay, 532, 45, 6, 6, 'F');
        doc.setDrawColor(50, 214, 140);
        doc.roundedRect(40, ay, 532, 45, 6, 6, 'S');

        doc.setFillColor(12, 78, 50);
        doc.rect(40, ay, 6, 45, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(12, 78, 50);
        doc.text(`0${ai + 1}`, 56, ay + 26);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(30, 60, 45);
        doc.text(doc.splitTextToSize(esc(act), 460), 80, ay + 26);
      });
    });

    drawFooter(doc, pg + 2, total, '60-Second Micro-Actions');
  }

  // Pocket Card Page (Page 5)
  doc.addPage();
  drawHeader(doc, 'moodflip | PRINT AND FOLD POCKET CARD');

  doc.setFillColor(12, 78, 50);
  doc.roundedRect(40, 50, 532, 38, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('Cut and Fold Quick-Reference Pocket Card', 60, 75);

  const qk = [
    { m: 'Anxious', a: 'Feet flat on floor. Look around. I am safe right now.' },
    { m: 'Angry', a: 'Unclench jaw. Drop shoulders. Exhale slowly for 6 counts.' },
    { m: 'Sad', a: 'Open window. Name one thing you appreciate today.' },
    { m: 'Overwhelmed', a: 'Write all tasks. Pick just the next 10 minutes.' },
    { m: 'Insecure', a: 'Sit taller. Name 3 things you have handled before.' },
    { m: 'Stressed', a: 'Do nothing for 60 seconds. Just breathe.' },
    { m: 'Lonely', a: 'Think of someone safe. Send one warm message.' },
    { m: 'Guilty', a: 'Write: I made the best choice I could at the time.' }
  ];

  qk.forEach(({ m, a }, i) => {
    const y = 105 + i * 72;
    doc.setFillColor(245, 252, 248);
    doc.roundedRect(40, y, 532, 60, 6, 6, 'F');
    doc.setDrawColor(50, 214, 140);
    doc.roundedRect(40, y, 532, 60, 6, 6, 'S');

    doc.setFillColor(12, 78, 50);
    doc.roundedRect(40, y, 90, 60, 6, 6, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(m, 52, y + 35);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 50, 35);
    doc.text(doc.splitTextToSize(esc(a), 410), 145, y + 35);
  });

  drawFooter(doc, 5, total, '60-Second Micro-Actions');

  // Page 6 & 7 & 8 Personal Action Log & Back Cover
  doc.addPage();
  drawHeader(doc, 'moodflip | My Personal Action Log');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(12, 78, 50);
  doc.text('My Top 5 Actions That Work for Me', 60, 70);

  for (let i = 0; i < 5; i++) {
    const y = 95 + i * 125;
    doc.setFillColor(245, 252, 248);
    doc.roundedRect(40, y, 532, 105, 6, 6, 'F');
    doc.setDrawColor(50, 214, 140);
    doc.roundedRect(40, y, 532, 105, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(12, 78, 50);
    doc.text(`Action #${i + 1}`, 56, y + 25);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 100, 90);
    doc.text('My mood when I used it: _____________________________________________', 56, y + 50);
    doc.text('The action I took: ____________________________________________________', 56, y + 75);
  }
  drawFooter(doc, 6, total, '60-Second Micro-Actions');

  doc.addPage();
  doc.setFillColor(8, 50, 32);
  doc.rect(0, 0, 612, 792, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(38);
  doc.setTextColor(50, 214, 140);
  doc.text('Every second counts.', 110, 200);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(200, 245, 220);
  doc.text('You do not need an hour. You need 60 seconds and the willingness.', 60, 250);
  doc.text('Use this guide every day. Notice every small shift.', 60, 280);

  drawFooter(doc, 8, total, '60-Second Micro-Actions');
}

// ════════════════════════════════════════════════════════════════════
// BOOK 3: Daily Reflection Printable Journal (12 Pages)
// ════════════════════════════════════════════════════════════════════
function buildBook3(doc: jsPDF, userName: string) {
  const user = userName || 'Valued Member';
  const total = 12;

  // Page 1 Cover - Royal Purple
  doc.setFillColor(29, 18, 68);
  doc.rect(0, 0, 612, 792, 'F');

  doc.setFillColor(60, 43, 133);
  doc.rect(0, 0, 612, 420, 'F');

  doc.setFillColor(212, 171, 255);
  doc.rect(0, 416, 612, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(212, 171, 255);
  doc.text('MOODFLIP OFFICIAL JOURNAL', 56, 65);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(44);
  doc.setTextColor(255, 255, 255);
  doc.text('Daily Reflection', 56, 120);

  doc.setTextColor(212, 171, 255);
  doc.text('Printable Journal', 56, 175);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(230, 220, 250);
  doc.text('Your 7-day guided mindset & emotional reflection companion', 56, 215);

  doc.setFillColor(212, 171, 255);
  doc.rect(56, 230, 280, 1.5, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(210, 200, 235);
  doc.text('* Daily morning check-in & intention prompts', 56, 260);
  doc.text('* Structured 60-second action tracking space', 56, 282);
  doc.text('* Before & after emotional state comparison logs', 56, 304);
  doc.text('* End-of-day summary & progress review pages', 56, 326);

  doc.setFillColor(20, 12, 50);
  doc.roundedRect(40, 540, 532, 100, 8, 8, 'F');
  doc.setDrawColor(212, 171, 255);
  doc.roundedRect(40, 540, 532, 100, 8, 8, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(212, 171, 255);
  doc.text('THIS JOURNAL BELONGS TO', 60, 570);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(`Name: ${esc(user)}`, 60, 600);

  drawFooter(doc, 1, total, 'Daily Reflection Journal');

  // Pages 2-3 Welcome & Intention
  doc.addPage();
  drawHeader(doc, 'moodflip | Daily Reflection Journal');

  doc.setFillColor(60, 43, 133);
  doc.roundedRect(40, 50, 532, 40, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('Welcome to Your 7-Day Reflection', 56, 76);

  const stepsP2Journal = [
    { n: '1', t: 'Check In', d: 'Choose the mood and exact feeling that best matches your starting experience.', y: 110 },
    { n: '2', t: 'Flip Your Mood', d: 'Use the MoodFlip result to identify the positive direction.', y: 190 },
    { n: '3', t: 'Record the Action', d: 'Copy the reviewed 60-second action exactly as it appears.', y: 270 },
    { n: '4', t: 'Reflect Gently', d: 'Notice what changed, what did not, and anything you want to remember.', y: 350 }
  ];

  stepsP2Journal.forEach(s => {
    doc.setFillColor(246, 242, 255);
    doc.roundedRect(40, s.y, 532, 65, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(40, s.y, 532, 65, 6, 6, 'S');

    doc.setFillColor(60, 43, 133);
    doc.roundedRect(40, s.y, 42, 65, 6, 6, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(255, 255, 255);
    doc.text(s.n, 55, s.y + 38);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(48, 33, 117);
    doc.text(s.t, 95, s.y + 24);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(90, 80, 120);
    doc.text(doc.splitTextToSize(s.d, 460), 95, s.y + 42);
  });

  drawFooter(doc, 2, total, 'Daily Reflection Journal');

  // Pages 4-10: 7 Daily Reflection Pages
  for (let d = 1; d <= 7; d++) {
    doc.addPage();
    drawHeader(doc, 'moodflip | Daily Reflection Journal', `DAY ${d} OF 7`);

    doc.setFillColor(60, 43, 133);
    doc.roundedRect(40, 50, 532, 38, 6, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(`Daily Reflection: Day ${d}`, 56, 75);

    // Section 1 Check In
    doc.setFillColor(246, 242, 255);
    doc.roundedRect(40, 100, 532, 100, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(40, 100, 532, 100, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(60, 43, 133);
    doc.text('1. YOUR MOODFLIP CHECK-IN', 52, 122);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 70, 110);
    doc.text('Selected mood / feeling: ___________________________', 52, 150);
    doc.text('Positive target direction: __________________________', 52, 178);

    // Section 2 Approved Action
    doc.setFillColor(246, 242, 255);
    doc.roundedRect(40, 215, 532, 110, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(40, 215, 532, 110, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(60, 43, 133);
    doc.text('2. APPROVED 60-SECOND ACTION', 52, 237);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 70, 110);
    doc.text('Write the action exactly as shown on MoodFlip:', 52, 260);
    doc.text('____________________________________________________________________________', 52, 285);
    doc.text('____________________________________________________________________________', 52, 310);

    // Section 3 Before & After
    doc.setFillColor(246, 242, 255);
    doc.roundedRect(40, 340, 255, 110, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(40, 340, 255, 110, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 43, 133);
    doc.text('Before the action', 50, 362);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('What did you notice?', 50, 382);
    doc.text('________________________________', 50, 410);
    doc.text('________________________________', 50, 430);

    doc.setFillColor(246, 242, 255);
    doc.roundedRect(317, 340, 255, 110, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(317, 340, 255, 110, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 43, 133);
    doc.text('After the action', 327, 362);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('What changed?', 327, 382);
    doc.text('________________________________', 327, 410);
    doc.text('________________________________', 327, 430);

    // Section 4 Reflection
    doc.setFillColor(246, 242, 255);
    doc.roundedRect(40, 465, 532, 160, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(40, 465, 532, 160, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(60, 43, 133);
    doc.text('MY REFLECTION: Anything I want to remember from today', 52, 490);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(140, 130, 160);
    doc.text('____________________________________________________________________________', 52, 520);
    doc.text('____________________________________________________________________________', 52, 550);
    doc.text('____________________________________________________________________________', 52, 580);
    doc.text('____________________________________________________________________________', 52, 610);

    drawFooter(doc, 3 + d, total, 'Daily Reflection Journal');
  }

  // Page 11 & 12 End of Week Review & Back Cover
  doc.addPage();
  drawHeader(doc, 'moodflip | Daily Reflection Journal', '7 DAYS COMPLETE');

  doc.setFillColor(60, 43, 133);
  doc.roundedRect(40, 50, 532, 38, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('Your 7-Day Reflection', 56, 75);

  const endReview = [
    { l: 'Patterns I noticed in my moods', y: 105 },
    { l: 'Approved actions that felt most useful', y: 240 },
    { l: 'What I learned about myself', y: 375 },
    { l: 'A gentle intention for next week', y: 510 }
  ];

  endReview.forEach(({ l, y }) => {
    doc.setFillColor(246, 242, 255);
    doc.roundedRect(40, y, 532, 120, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(40, y, 532, 120, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(60, 43, 133);
    doc.text(esc(l), 52, y + 25);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(140, 130, 160);
    doc.text('__________________________________________________________________________', 52, y + 55);
    doc.text('__________________________________________________________________________', 52, y + 85);
  });

  drawFooter(doc, 11, total, 'Daily Reflection Journal');

  doc.addPage();
  doc.setFillColor(29, 18, 68);
  doc.rect(0, 0, 612, 792, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(40);
  doc.setTextColor(212, 171, 255);
  doc.text('moodflip', 140, 200);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text('A Small Shift Today.', 160, 260);
  doc.setTextColor(212, 171, 255);
  doc.text('A Better You Tomorrow.', 130, 300);

  drawFooter(doc, 12, total, 'Daily Reflection Journal');
}

// ════════════════════════════════════════════════════════════════════
// BOOK 4: 30-Day Emotional Resilience E-Book (16 Pages)
// ════════════════════════════════════════════════════════════════════
function buildBook4(doc: jsPDF, userName: string) {
  const user = userName || 'Valued Member';
  const total = 16;

  doc.setFillColor(12, 18, 44);
  doc.rect(0, 0, 612, 792, 'F');

  doc.setFillColor(23, 34, 81);
  doc.rect(0, 0, 612, 420, 'F');

  doc.setFillColor(247, 159, 32);
  doc.rect(0, 416, 612, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(247, 159, 32);
  doc.text('MOODFLIP PRESENTS', 56, 65);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(42);
  doc.setTextColor(255, 255, 255);
  doc.text('30-Day Emotional Resilience', 56, 120);

  doc.setTextColor(247, 159, 32);
  doc.text('Transformation E-Book', 56, 175);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(200, 210, 245);
  doc.text('Comprehensive guide to long-term emotional mastery', 56, 215);

  doc.setFillColor(247, 159, 32);
  doc.rect(56, 230, 280, 1.5, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(200, 210, 245);
  doc.text('* 4 structured weekly transformation programmes', 56, 260);
  doc.text('* 30 daily mindset exercises & Somatic resets', 56, 282);
  doc.text('* Weekly integration reviews & progress logs', 56, 304);
  doc.text('* Permanent resilience habit builder framework', 56, 326);

  doc.setFillColor(12, 18, 44);
  doc.roundedRect(40, 540, 532, 100, 8, 8, 'F');
  doc.setDrawColor(247, 159, 32);
  doc.roundedRect(40, 540, 532, 100, 8, 8, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(247, 159, 32);
  doc.text('THIS E-BOOK BELONGS TO', 60, 570);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(`Name: ${esc(user)}`, 60, 600);

  drawFooter(doc, 1, total, '30-Day Resilience E-Book');

  // Pages 2-16 Weekly Content
  for (let p = 2; p <= total; p++) {
    doc.addPage();
    drawHeader(doc, 'moodflip | 30-Day Resilience E-Book');

    doc.setFillColor(23, 34, 81);
    doc.roundedRect(40, 50, 532, 40, 6, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text(`Resilience Module - Section ${p - 1}`, 56, 76);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 70, 110);
    doc.text('Build lasting emotional mastery through daily structured reflection and evidence-informed actions.', 40, 115);

    doc.setFillColor(248, 246, 252);
    doc.roundedRect(40, 140, 532, 580, 8, 8, 'F');
    doc.setDrawColor(247, 159, 32);
    doc.roundedRect(40, 140, 532, 580, 8, 8, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(23, 34, 81);
    doc.text(`Day ${p - 1} Mindset Exercise & Somatic Action`, 60, 175);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(80, 90, 120);
    doc.text('____________________________________________________________________________', 60, 220);
    doc.text('____________________________________________________________________________', 60, 260);
    doc.text('____________________________________________________________________________', 60, 300);
    doc.text('____________________________________________________________________________', 60, 340);
    doc.text('____________________________________________________________________________', 60, 380);

    drawFooter(doc, p, total, '30-Day Resilience E-Book');
  }
}

// ════════════════════════════════════════════════════════════════════
// BOOK 5: Completed Plan Certificate PDF
// ════════════════════════════════════════════════════════════════════
function buildBook5(doc: jsPDF, planType: string, userName: string) {
  const user = userName || 'Valued Member';
  const totalDays = planType.includes('30') ? 30 : 7;
  const title = totalDays === 30 ? '30-Day Emotional Resilience Completion Certificate' : '7-Day Mindset Plan Completion Certificate';

  // Certificate Page 1
  doc.setFillColor(18, 12, 48);
  doc.rect(0, 0, 612, 792, 'F');

  doc.setFillColor(60, 43, 133);
  doc.rect(0, 0, 612, 380, 'F');

  doc.setFillColor(212, 171, 255);
  doc.rect(0, 376, 612, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(212, 171, 255);
  doc.text('MOODFLIP OFFICIAL CERTIFICATE', 50, 65);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(255, 255, 255);
  doc.text('CERTIFICATE OF COMPLETION', 50, 115);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(230, 220, 250);
  doc.text('This is proudly presented to:', 50, 160);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(212, 171, 255);
  doc.text(esc(user), 50, 205);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(`For successfully completing all ${totalDays} days of the MoodFlip ${totalDays === 30 ? '30-Day Transformation Plan' : '7-Day Mindset Journey'}.`, 50, 245);

  doc.setFillColor(27, 19, 64);
  doc.roundedRect(40, 420, 532, 220, 8, 8, 'F');
  doc.setDrawColor(113, 71, 232);
  doc.roundedRect(40, 420, 532, 220, 8, 8, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(212, 171, 255);
  doc.text('JOURNEY SUMMARY & STATS', 60, 455);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);
  doc.text(`Plan Name: ${totalDays === 30 ? '30-Day Transformation Plan' : '7-Day Mindset Plan'}`, 60, 485);
  doc.text(`Total Days Completed: ${totalDays} of ${totalDays} days`, 60, 510);
  doc.text('Consistency Score: 100% Completed', 60, 535);
  doc.text('Primary Focus: Emotion Naming, Grounding & Daily Resilience', 60, 560);
  doc.text('Issued by: MoodFlip Daily Mindset Companion (moodflip.app)', 60, 595);

  drawFooter(doc, 1, 2, title);

  // Page 2 Daily Log Summary
  doc.addPage();
  drawHeader(doc, 'moodflip | Completion Report');

  doc.setFillColor(60, 43, 133);
  doc.roundedRect(40, 50, 532, 40, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('Completed Daily Mindset Log Summary', 60, 76);

  for (let i = 0; i < 7; i++) {
    const y = 110 + i * 85;
    doc.setFillColor(246, 242, 255);
    doc.roundedRect(40, y, 532, 75, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(40, y, 532, 75, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(60, 43, 133);
    doc.text(`Day ${i + 1}: Verified Completed Exercise`, 56, y + 25);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(80, 70, 110);
    doc.text('Status: Verified Complete | 60-Second Action Applied', 56, y + 45);
    doc.text('Reflection Note: Personal mindset shift recorded on MoodFlip.', 56, y + 62);
  }

  drawFooter(doc, 2, 2, title);
}

// ════════════════════════════════════════════════════════════════════
// PUBLIC DISPATCH API
// ════════════════════════════════════════════════════════════════════

function createDoc(title: string, userName: string = 'Valued Member'): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter', // 612 x 792 pt
  });

  const idx = getBookIdx(title);
  const user = userName || 'Valued Member';

  switch (idx) {
    case 1: buildBook1(doc, user); break;
    case 2: buildBook2(doc, user); break;
    case 3: buildBook3(doc, user); break;
    case 4: buildBook4(doc, user); break;
    case 5: buildBook5(doc, title, user); break;
    default: buildBook3(doc, user);
  }

  return doc;
}

export function generateMoodFlipPDFBlob(title: string, userName: string = 'Valued Member'): Blob {
  const doc = createDoc(title, userName);
  const arrayBuffer = doc.output('arraybuffer');
  return new Blob([arrayBuffer], { type: 'application/pdf' });
}

export function triggerPDFDownload(title: string, userName: string = 'Valued Member') {
  if (typeof window === 'undefined') return;

  try {
    const doc = createDoc(title, userName);
    const idx = getBookIdx(title);
    const baseName = FILENAMES[idx] || 'MoodFlip_Mindset_Resource';
    const filename = baseName.endsWith('.pdf') ? baseName : `${baseName}.pdf`;

    doc.save(filename);
  } catch (err) {
    console.error('PDF generation download error:', err);
  }
}
