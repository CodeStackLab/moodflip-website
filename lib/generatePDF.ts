import jsPDF from 'jspdf';
import { COVER_IMAGE_BASE64, BRAND_GIRL_BASE64, BRAND_LOGO_ICON_BASE64 } from './coverImage';

// ════════════════════════════════════════════════════════════════════
// MOODFLIP ULTIMATE BRANDED PDF ENGINE (jsPDF Powered)
// * Official Site Logo & Vector Marks Throughout
// * Full-Bleed Cover Artwork & Official Girl Illustration (about-girl.png)
// * 100% Exact Match to Website UI/UX Design System
// * Ultra-Transparent (4% Opacity) Copyright Watermark
// * Prominent Back-Cover Branding Section with Site Badges & Domain
// ════════════════════════════════════════════════════════════════════

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

// ── BRANDING & LOGO FUNCTIONS ──────────────────────────────────────────

function drawBrandLogoIcon(doc: jsPDF, x: number, y: number, size: number = 22) {
  try {
    if (BRAND_LOGO_ICON_BASE64) {
      doc.addImage(BRAND_LOGO_ICON_BASE64, 'PNG', x, y, size, size);
      return;
    }
  } catch (e) {}

  // Exact site header logo vector mark fallback
  const s = size / 22;
  doc.setFillColor(255, 159, 141);
  doc.ellipse(x + 11 * s, y + 14 * s, 11 * s, 7 * s, 'F');
  
  doc.setFillColor(255, 255, 255);
  doc.ellipse(x + 11 * s, y + 13 * s, 7 * s, 4 * s, 'F');

  doc.setFillColor(255, 173, 100);
  doc.circle(x + 4 * s, y + 4 * s, 3 * s, 'F');
  doc.circle(x + 18 * s, y + 4 * s, 3 * s, 'F');
}

function drawBrandHeaderLogo(doc: jsPDF, x: number, y: number, scale: number = 1) {
  drawBrandLogoIcon(doc, x, y, 22 * scale);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14 * scale);
  doc.setTextColor(21, 24, 59); // #15183B
  doc.text('mood', x + 26 * scale, y + 16 * scale);

  doc.setTextColor(113, 71, 232); // #7464AC
  doc.text('flip', x + 62 * scale, y + 16 * scale);
}

function drawWatermark(doc: jsPDF) {
  try {
    const gstate = new (doc as any).GState({ opacity: 0.04 });
    doc.setGState(gstate);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(40);
    doc.setTextColor(113, 71, 232); // #7464AC
    doc.text('MOODFLIP  *  OFFICIAL WORKBOOK', 306, 396, {
      align: 'center',
      angle: 35,
    });

    const resetState = new (doc as any).GState({ opacity: 1.0 });
    doc.setGState(resetState);
  } catch (e) {
    // Fallback if GState not supported
  }
}

function drawHeader(doc: jsPDF, title: string, subtitle?: string) {
  // Header Bar: Midnight Indigo Bar (#15183B)
  doc.setFillColor(21, 24, 59);
  doc.rect(0, 0, 612, 38, 'F');

  // Header Brand Logo
  drawBrandLogoIcon(doc, 36, 8, 22);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('mood', 64, 23);

  doc.setTextColor(212, 171, 255); // #D4ABFF
  doc.text('flip', 95, 23);

  if (subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(212, 171, 255);
    doc.text(esc(subtitle), 572, 23, { align: 'right' });
  }
}

function drawFooter(doc: jsPDF, page: number, total: number, label: string) {
  // Soft Lilac Footer Bar (#FEF9F5 with #E4DAD7 top border line)
  doc.setFillColor(250, 248, 253);
  doc.rect(0, 758, 612, 34, 'F');

  doc.setFillColor(234, 227, 242);
  doc.rect(0, 758, 612, 1, 'F');

  drawBrandLogoIcon(doc, 36, 764, 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(21, 24, 59);
  doc.text('mood', 60, 778);

  doc.setTextColor(113, 71, 232);
  doc.text('flip', 86, 778);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(104, 96, 127);
  doc.text(`*  ${esc(label)}  *  moodflip.app`, 140, 778);
  doc.text(`Page ${page} of ${total}`, 572, 778, { align: 'right' });
}

// ── PROMINENT BACK COVER BRANDING PAGE ──────────────────────────────────
function drawBackCoverPage(doc: jsPDF, bookTitle: string, totalPages: number) {
  doc.addPage();
  doc.setFillColor(21, 24, 59); // Midnight Indigo (#15183B)
  doc.rect(0, 0, 612, 792, 'F');

  // Top Accent Gradient Bar
  doc.setFillColor(113, 71, 232); // #7464AC
  doc.rect(0, 0, 612, 180, 'F');

  // Brand Logo Mark Header
  drawBrandLogoIcon(doc, 246, 35, 48);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(255, 255, 255);
  doc.text('mood', 220, 115);
  doc.setTextColor(212, 171, 255);
  doc.text('flip', 306, 115);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(230, 220, 255);
  doc.text('Self-reflection utility for real life', 306, 142, { align: 'center' });

  // Official Girl Illustration in Center Box
  try {
    if (BRAND_GIRL_BASE64) {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(216, 195, 180, 180, 90, 90, 'F');
      doc.setDrawColor(212, 171, 255);
      doc.setLineWidth(2);
      doc.roundedRect(216, 195, 180, 180, 90, 90, 'S');

      doc.addImage(BRAND_GIRL_BASE64, 'PNG', 226, 205, 160, 160);
    }
  } catch (e) {}

  // Core Value Proposition Box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('Shift Your Mood, Instantly & Meaningfully.', 306, 410, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(200, 190, 230);
  doc.text('Simple daily check-ins, personalized 60-second micro-actions,', 306, 434, { align: 'center' });
  doc.text('and gentle guidance to help you find calm when feeling low, anxious, or overwhelmed.', 306, 452, { align: 'center' });

  // 4 Site UI Badges (2x2 Grid)
  const badges = [
    '100% Private & Free',
    '60-Second Micro-Actions',
    'Gentle Guidance',
    '7 Days of Calm & Progress'
  ];

  badges.forEach((bText, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const bx = col === 0 ? 60 : 316;
    const by = 482 + row * 46;

    doc.setFillColor(34, 39, 85);
    doc.roundedRect(bx, by, 236, 36, 18, 18, 'F');
    doc.setDrawColor(113, 71, 232);
    doc.setLineWidth(1);
    doc.roundedRect(bx, by, 236, 36, 18, 18, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(212, 171, 255);
    doc.text(bText, bx + 118, by + 22, { align: 'center' });
  });

  // Call-To-Action Card
  doc.setFillColor(113, 71, 232);
  doc.roundedRect(60, 588, 492, 95, 12, 12, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Continue Your Journey on MoodFlip', 306, 616, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(230, 220, 255);
  doc.text('Visit moodflip.app anytime for instant daily mood check-ins & reflections.', 306, 638, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('https://moodflip.app', 306, 664, { align: 'center' });

  // Copyright & Medical Disclaimer Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(150, 140, 180);
  doc.text('MoodFlip is a self-reflection utility for everyday emotional awareness. It is not therapy or medical advice.', 306, 715, { align: 'center' });
  doc.text('© 2026 MoodFlip. All rights reserved. Built with care for your mindset.', 306, 732, { align: 'center' });

  drawFooter(doc, totalPages, totalPages, bookTitle);
}

// ════════════════════════════════════════════════════════════════════
// BOOK 1: 7-Day Mindset Guide (14 Pages)
// ════════════════════════════════════════════════════════════════════
function buildBook1(doc: jsPDF, userName: string) {
  const user = userName || 'Valued Member';
  const total = 14;

  // ── Cover Page (Page 1) ──
  try {
    doc.addImage(COVER_IMAGE_BASE64, 'JPEG', 0, 0, 612, 792);
  } catch (e) {
    doc.setFillColor(21, 24, 59);
    doc.rect(0, 0, 612, 792, 'F');
  }

  // Cover Card Overlay
  try {
    doc.setGState(new (doc as any).GState({ opacity: 0.92 }));
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(40, 555, 532, 180, 12, 12, 'F');
    doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
  } catch (e) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(40, 555, 532, 180, 12, 12, 'F');
  }

  doc.setDrawColor(212, 171, 255);
  doc.setLineWidth(1.5);
  doc.roundedRect(40, 555, 532, 180, 12, 12, 'S');

  // Title on Cover Card
  drawBrandHeaderLogo(doc, 60, 570, 0.9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(21);
  doc.setTextColor(21, 24, 59);
  doc.text('7-Day Mindset Guide & Workbook', 60, 615);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(113, 71, 232);
  doc.text('Your complete step-by-step emotional reset companion', 60, 634);

  doc.setFillColor(234, 227, 242);
  doc.rect(60, 644, 492, 1, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(104, 96, 127);
  doc.text('THIS GUIDE BELONGS TO:', 60, 664);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13.5);
  doc.setTextColor(21, 24, 59);
  doc.text(esc(user), 60, 684);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(104, 96, 127);
  doc.text('Start Date: ____________________', 350, 684);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(113, 71, 232);
  doc.text('* Self-reflection utility for real life * Not medical advice', 60, 718);

  // ── Page 2: Welcome Page with Girl Illustration ──
  doc.addPage();
  drawHeader(doc, 'moodflip | 7-Day Mindset Guide');
  drawWatermark(doc);

  doc.setFillColor(113, 71, 232);
  doc.roundedRect(40, 48, 532, 42, 8, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('Welcome to Your 7-Day Journey', 56, 74);

  // Embed Girl Illustration on Welcome Page
  try {
    if (BRAND_GIRL_BASE64) {
      doc.addImage(BRAND_GIRL_BASE64, 'PNG', 430, 105, 130, 130);
    }
  } catch (e) {}

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(26, 19, 56);
  const wWidth = BRAND_GIRL_BASE64 ? 370 : 500;
  doc.text(doc.splitTextToSize('This guide helps you build a sustainable daily mindset practice through small, proven 60-second actions.', wWidth), 40, 115);
  doc.text(doc.splitTextToSize('You do not need to be perfect. You only need to show up each day with curiosity and gentleness.', wWidth), 40, 150);

  doc.setFillColor(234, 227, 242);
  doc.rect(40, 242, 532, 1, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(21, 24, 59);
  doc.text('How to Use This Guide', 40, 264);

  const stepsP2 = [
    { n: '01', t: 'Daily Check-In', d: 'Each morning, identify your starting mood and the positive direction you want to move toward.', y: 280 },
    { n: '02', t: '60-Second Action', d: 'Perform the recommended micro-action. It takes just 60 seconds and is evidence-informed.', y: 350 },
    { n: '03', t: 'Record and Reflect', d: 'Write down your before and after. Notice what shifted, even slightly.', y: 420 },
    { n: '04', t: 'End-of-Day Review', d: 'Use the evening reflection prompts to close your day with intention.', y: 490 },
  ];

  stepsP2.forEach((s) => {
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, s.y, 532, 58, 8, 8, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, s.y, 532, 58, 8, 8, 'S');

    doc.setFillColor(113, 71, 232);
    doc.roundedRect(40, s.y, 42, 58, 8, 8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(255, 255, 255);
    doc.text(s.n, 51, s.y + 35);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(21, 24, 59);
    doc.text(s.t, 95, s.y + 24);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(104, 96, 127);
    doc.text(doc.splitTextToSize(s.d, 460), 95, s.y + 40);
  });

  // Notice box
  doc.setFillColor(250, 248, 253);
  doc.roundedRect(40, 565, 532, 175, 8, 8, 'F');
  doc.setDrawColor(234, 227, 242);
  doc.roundedRect(40, 565, 532, 175, 8, 8, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(113, 71, 232);
  doc.text('A Note on Wellbeing & Self-Care', 56, 590);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(104, 96, 127);
  const noticeLines = [
    'MoodFlip is a self-reflection utility designed to support everyday emotional awareness.',
    'It is not therapy or medical advice. If you are struggling with intense distress, please reach out to a licensed professional.',
    'Emergency / Crisis Help: Please contact your local helpline or emergency services immediately.'
  ];
  noticeLines.forEach((line, idx) => {
    doc.text(line, 56, 615 + idx * 22);
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
    drawWatermark(doc);

    doc.setFillColor(21, 24, 59);
    doc.roundedRect(40, 48, 532, 38, 8, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(255, 255, 255);
    doc.text(`DAY ${di + 1}: ${esc(day.t)}`, 56, 72);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(104, 96, 127);
    doc.text(esc(day.sub), 40, 102);

    doc.setFillColor(234, 227, 242);
    doc.rect(40, 112, 532, 1, 'F');

    // Morning Box
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, 124, 532, 65, 8, 8, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, 124, 532, 65, 8, 8, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(113, 71, 232);
    doc.text('MORNING INTENTION', 52, 142);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(26, 19, 56);
    doc.text(esc(day.m), 52, 160);
    doc.setTextColor(180, 170, 200);
    doc.text('__________________________________________________________________________', 52, 178);

    // 60-Sec Action Box
    doc.setFillColor(113, 71, 232);
    doc.roundedRect(40, 200, 532, 85, 8, 8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(212, 171, 255);
    doc.text("TODAY'S 60-SECOND ACTION", 56, 220);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(doc.splitTextToSize(esc(day.a), 500), 56, 240);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(230, 220, 255);
    doc.text('[  ] I completed this 60-second action today', 56, 273);

    // Before & After Side-by-Side
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, 298, 255, 95, 8, 8, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, 298, 255, 95, 8, 8, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(113, 71, 232);
    doc.text('BEFORE: How I felt', 52, 318);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(180, 170, 200);
    doc.text('_________________________________', 52, 345);
    doc.text('_________________________________', 52, 372);

    doc.setFillColor(244, 239, 252);
    doc.roundedRect(317, 298, 255, 95, 8, 8, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(317, 298, 255, 95, 8, 8, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(16, 185, 129); // Emerald
    doc.text('AFTER: What shifted', 329, 318);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(180, 170, 200);
    doc.text('_________________________________', 329, 345);
    doc.text('_________________________________', 329, 372);

    // My Reflection Box
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, 406, 532, 115, 8, 8, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, 406, 532, 115, 8, 8, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(21, 24, 59);
    doc.text('MY REFLECTION: What I want to remember from today', 56, 428);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(180, 170, 200);
    doc.text('____________________________________________________________________________', 56, 452);
    doc.text('____________________________________________________________________________', 56, 476);
    doc.text('____________________________________________________________________________', 56, 500);

    // Evening Prompt Box
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, 532, 532, 90, 8, 8, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, 532, 532, 90, 8, 8, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(113, 71, 232);
    doc.text('EVENING PROMPT', 56, 552);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(26, 19, 56);
    doc.text(esc(day.e), 56, 570);
    doc.setTextColor(180, 170, 200);
    doc.text('____________________________________________________________________________', 56, 596);

    // Rating Scale
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, 634, 532, 85, 8, 8, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, 634, 532, 85, 8, 8, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(21, 24, 59);
    doc.text('MOOD RATING: 1 = Very low | 5 = Neutral | 10 = Great', 56, 656);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(113, 71, 232);
    doc.text('1    2    3    4    5    6    7    8    9    10', 56, 694);

    drawFooter(doc, pageNum, total, '7-Day Mindset Guide');
  });

  // ── Page 10: 7-Day Summary ──
  doc.addPage();
  drawHeader(doc, 'moodflip | 7-Day Mindset Guide');
  drawWatermark(doc);

  doc.setFillColor(21, 24, 59);
  doc.roundedRect(40, 48, 532, 40, 8, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('7-Day Reflection Summary', 56, 74);

  const summaryPrompts = [
    { l: 'Patterns I noticed in my moods this week', y: 104 },
    { l: 'The 60-second actions that felt most effective', y: 204 },
    { l: 'The biggest insight I gained about myself', y: 304 },
    { l: 'My intention for the next 7 days', y: 404 }
  ];

  summaryPrompts.forEach(({ l, y }) => {
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, y, 532, 85, 8, 8, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, y, 532, 85, 8, 8, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(113, 71, 232);
    doc.text(esc(l), 52, y + 22);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(180, 170, 200);
    doc.text('__________________________________________________________________________', 52, y + 45);
    doc.text('__________________________________________________________________________', 52, y + 68);
  });

  // 7-Day Log Grid
  doc.setFillColor(113, 71, 232);
  doc.roundedRect(40, 510, 532, 115, 8, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('7-Day Mood Rating Tracker Log', 56, 534);

  for (let i = 0; i < 7; i++) {
    const x = 48 + i * 74;
    doc.setFillColor(21, 24, 59);
    doc.roundedRect(x, 546, 66, 62, 6, 6, 'F');
    doc.setDrawColor(212, 171, 255);
    doc.roundedRect(x, 546, 66, 62, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(212, 171, 255);
    doc.text(`Day ${i + 1}`, x + 16, 566);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(200, 190, 230);
    doc.text('___/10', x + 14, 591);
  }

  drawFooter(doc, 10, total, '7-Day Mindset Guide');

  // ── Page 11: Mood Flip Pairings ──
  doc.addPage();
  drawHeader(doc, 'moodflip | 7-Day Mindset Guide');
  drawWatermark(doc);

  doc.setFillColor(21, 24, 59);
  doc.roundedRect(40, 48, 532, 40, 8, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('Quick Reference: Mood Flip Pairings', 56, 74);

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
    const y = 104 + row * 63;

    doc.setFillColor(244, 239, 252);
    doc.roundedRect(x, y, 256, 53, 6, 6, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(x, y, 256, 53, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(236, 72, 153);
    doc.text(bad, x + 12, y + 22);

    doc.setTextColor(113, 71, 232);
    doc.text('->', x + 110, y + 22);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(16, 185, 129);
    doc.text(good, x + 135, y + 22);
  });

  drawFooter(doc, 11, total, '7-Day Mindset Guide');

  // ── Page 12: Commitment Page ──
  doc.addPage();
  drawHeader(doc, 'moodflip | My 7-Day Commitment');
  drawWatermark(doc);

  doc.setFillColor(113, 71, 232);
  doc.roundedRect(40, 48, 532, 45, 8, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('MY 7-DAY MINDSET COMMITMENT', 130, 76);

  doc.setFillColor(244, 239, 252);
  doc.roundedRect(40, 115, 532, 225, 8, 8, 'F');
  doc.setDrawColor(234, 227, 242);
  doc.roundedRect(40, 115, 532, 225, 8, 8, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(113, 71, 232);
  doc.text('I Commit to:', 60, 145);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(26, 19, 56);
  doc.text('* Checking in with my mood honestly each morning', 60, 172);
  doc.text('* Completing the 60-second action even on hard days', 60, 194);
  doc.text('* Treating myself with patience and curiosity', 60, 216);
  doc.text('* Noticing small shifts, not demanding perfection', 60, 238);
  doc.text('* Using MoodFlip as a daily mindset companion', 60, 260);
  doc.text('Signed: ______________________________ Date: __________________', 60, 305);

  drawFooter(doc, 12, total, '7-Day Mindset Guide');

  // ── Page 13: Bonus Breathing Reference ──
  doc.addPage();
  drawHeader(doc, 'moodflip | Bonus: Breathing Library');
  drawWatermark(doc);

  doc.setFillColor(21, 24, 59);
  doc.roundedRect(40, 48, 532, 40, 8, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('Breathing Technique Reference Library', 56, 74);

  const breathe = [
    { n: 'Box Breathing 4-4-4-4', s: 'Inhale 4 counts - Hold 4 counts - Exhale 4 counts - Hold 4 counts', u: 'Best for: Anxiety, stress, performance pressure' },
    { n: '4-7-8 Relaxing Breath', s: 'Inhale 4 counts - Hold 7 counts - Exhale slowly 8 counts', u: 'Best for: Sleep difficulty, racing thoughts, anger' },
    { n: 'Extended Exhale 4-6', s: 'Inhale 4 counts - Exhale slowly 6 counts. Repeat 6 times.', u: 'Best for: Anxiety, panic, emotional overwhelm' },
    { n: '5-5-5 Triangle Breath', s: 'Inhale 5 counts - Hold 5 counts - Exhale 5 counts', u: 'Best for: Focus, grounding, pre-presentation nerves' },
    { n: 'Physiological Sigh', s: 'Double inhale through nose short then long, then long exhale through mouth', u: 'Best for: Instant stress relief, panic, overwhelm' }
  ];

  breathe.forEach((b, i) => {
    const y = 104 + i * 116;
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, y, 532, 98, 8, 8, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, y, 532, 98, 8, 8, 'S');

    doc.setFillColor(113, 71, 232);
    doc.rect(40, y, 6, 98, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(21, 24, 59);
    doc.text(esc(b.n), 56, y + 25);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(104, 96, 127);
    doc.text(esc(b.s), 56, y + 48);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(113, 71, 232);
    doc.text(esc(b.u), 56, y + 74);
  });

  drawFooter(doc, 13, total, '7-Day Mindset Guide');

  // ── Page 14: Prominent Back Cover Branding Page ──
  drawBackCoverPage(doc, '7-Day Mindset Guide', total);
}

// ════════════════════════════════════════════════════════════════════
// BOOK 2: 60-Second Micro-Actions Cheat Sheet (8 Pages)
// ════════════════════════════════════════════════════════════════════
function buildBook2(doc: jsPDF, userName: string) {
  const user = userName || 'Valued Member';
  const total = 8;

  try {
    doc.addImage(COVER_IMAGE_BASE64, 'JPEG', 0, 0, 612, 792);
  } catch (e) {
    doc.setFillColor(8, 50, 32);
    doc.rect(0, 0, 612, 792, 'F');
  }

  try {
    doc.setGState(new (doc as any).GState({ opacity: 0.92 }));
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(40, 555, 532, 180, 12, 12, 'F');
    doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
  } catch (e) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(40, 555, 532, 180, 12, 12, 'F');
  }

  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(1.5);
  doc.roundedRect(40, 555, 532, 180, 12, 12, 'S');

  drawBrandHeaderLogo(doc, 60, 570, 0.9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(21);
  doc.setTextColor(8, 50, 32);
  doc.text('60-Second Micro-Actions Cheat Sheet', 60, 615);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(16, 185, 129);
  doc.text('Printable pocket guide for fast emotional resets', 60, 634);

  doc.setFillColor(234, 227, 242);
  doc.rect(60, 644, 492, 1, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(104, 96, 127);
  doc.text('THIS GUIDE BELONGS TO:', 60, 664);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13.5);
  doc.setTextColor(8, 50, 32);
  doc.text(esc(user), 60, 684);

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
    drawWatermark(doc);

    const pageCats = cats.slice(pg * 2, pg * 2 + 2);
    pageCats.forEach((cat, ci) => {
      const base = ci === 0 ? 50 : 380;

      doc.setFillColor(16, 185, 129);
      doc.roundedRect(40, base, 532, 34, 6, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.text(cat.n, 56, base + 22);

      cat.acts.forEach((act, ai) => {
        const ay = base + 45 + ai * 52;
        doc.setFillColor(244, 239, 252);
        doc.roundedRect(40, ay, 532, 45, 6, 6, 'F');
        doc.setDrawColor(234, 227, 242);
        doc.roundedRect(40, ay, 532, 45, 6, 6, 'S');

        doc.setFillColor(16, 185, 129);
        doc.rect(40, ay, 6, 45, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(16, 185, 129);
        doc.text(`0${ai + 1}`, 56, ay + 26);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(26, 19, 56);
        doc.text(doc.splitTextToSize(esc(act), 460), 80, ay + 26);
      });
    });

    drawFooter(doc, pg + 2, total, '60-Second Micro-Actions');
  }

  // Pocket Card Page (Page 5)
  doc.addPage();
  drawHeader(doc, 'moodflip | PRINT AND FOLD POCKET CARD');
  drawWatermark(doc);

  doc.setFillColor(21, 24, 59);
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
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, y, 532, 60, 6, 6, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, y, 532, 60, 6, 6, 'S');

    doc.setFillColor(113, 71, 232);
    doc.roundedRect(40, y, 90, 60, 6, 6, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(m, 52, y + 35);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(26, 19, 56);
    doc.text(doc.splitTextToSize(esc(a), 410), 145, y + 35);
  });

  drawFooter(doc, 5, total, '60-Second Micro-Actions');

  // Page 6 & 7 Personal Action Log
  doc.addPage();
  drawHeader(doc, 'moodflip | My Personal Action Log');
  drawWatermark(doc);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(21, 24, 59);
  doc.text('My Top 5 Actions That Work for Me', 60, 70);

  for (let i = 0; i < 5; i++) {
    const y = 95 + i * 125;
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, y, 532, 105, 6, 6, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, y, 532, 105, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(113, 71, 232);
    doc.text(`Action #${i + 1}`, 56, y + 25);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(104, 96, 127);
    doc.text('My mood when I used it: _____________________________________________', 56, y + 50);
    doc.text('The action I took: ____________________________________________________', 56, y + 75);
  }
  drawFooter(doc, 6, total, '60-Second Micro-Actions');

  doc.addPage();
  drawHeader(doc, 'moodflip | Action Reflection');
  drawWatermark(doc);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(21, 24, 59);
  doc.text('Weekly Micro-Action Reflection', 60, 70);

  for (let i = 0; i < 3; i++) {
    const y = 95 + i * 200;
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, y, 532, 180, 6, 6, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, y, 532, 180, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(113, 71, 232);
    doc.text(`Reflection Note #${i + 1}`, 56, y + 30);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(104, 96, 127);
    doc.text('__________________________________________________________________________', 56, y + 70);
    doc.text('__________________________________________________________________________', 56, y + 110);
    doc.text('__________________________________________________________________________', 56, y + 150);
  }
  drawFooter(doc, 7, total, '60-Second Micro-Actions');

  // Page 8 Prominent Back Cover
  drawBackCoverPage(doc, '60-Second Micro-Actions', total);
}

// ════════════════════════════════════════════════════════════════════
// BOOK 3: Daily Reflection Printable Journal (12 Pages)
// ════════════════════════════════════════════════════════════════════
function buildBook3(doc: jsPDF, userName: string) {
  const user = userName || 'Valued Member';
  const total = 12;

  try {
    doc.addImage(COVER_IMAGE_BASE64, 'JPEG', 0, 0, 612, 792);
  } catch (e) {
    doc.setFillColor(29, 18, 68);
    doc.rect(0, 0, 612, 792, 'F');
  }

  try {
    doc.setGState(new (doc as any).GState({ opacity: 0.92 }));
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(40, 555, 532, 180, 12, 12, 'F');
    doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
  } catch (e) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(40, 555, 532, 180, 12, 12, 'F');
  }

  doc.setDrawColor(212, 171, 255);
  doc.setLineWidth(1.5);
  doc.roundedRect(40, 555, 532, 180, 12, 12, 'S');

  drawBrandHeaderLogo(doc, 60, 570, 0.9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(21);
  doc.setTextColor(21, 24, 59);
  doc.text('Daily Reflection Printable Journal', 60, 615);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(113, 71, 232);
  doc.text('Your 7-day guided mindset & emotional reflection companion', 60, 634);

  doc.setFillColor(234, 227, 242);
  doc.rect(60, 644, 492, 1, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(104, 96, 127);
  doc.text('THIS JOURNAL BELONGS TO:', 60, 664);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13.5);
  doc.setTextColor(21, 24, 59);
  doc.text(esc(user), 60, 684);

  // Pages 2-3 Welcome & Intention
  doc.addPage();
  drawHeader(doc, 'moodflip | Daily Reflection Journal');
  drawWatermark(doc);

  doc.setFillColor(113, 71, 232);
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
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, s.y, 532, 65, 6, 6, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, s.y, 532, 65, 6, 6, 'S');

    doc.setFillColor(113, 71, 232);
    doc.roundedRect(40, s.y, 42, 65, 6, 6, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(255, 255, 255);
    doc.text(s.n, 55, s.y + 38);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(21, 24, 59);
    doc.text(s.t, 95, s.y + 24);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(104, 96, 127);
    doc.text(doc.splitTextToSize(s.d, 460), 95, s.y + 42);
  });

  drawFooter(doc, 2, total, 'Daily Reflection Journal');

  // Pages 4-10: 7 Daily Reflection Pages
  for (let d = 1; d <= 7; d++) {
    doc.addPage();
    drawHeader(doc, 'moodflip | Daily Reflection Journal', `DAY ${d} OF 7`);
    drawWatermark(doc);

    doc.setFillColor(113, 71, 232);
    doc.roundedRect(40, 50, 532, 38, 6, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(`Daily Reflection: Day ${d}`, 56, 75);

    // Section 1 Check In
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, 100, 532, 100, 6, 6, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, 100, 532, 100, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(113, 71, 232);
    doc.text('1. YOUR MOODFLIP CHECK-IN', 52, 122);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(26, 19, 56);
    doc.text('Selected mood / feeling: ___________________________', 52, 150);
    doc.text('Positive target direction: __________________________', 52, 178);

    // Section 2 Approved Action
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, 215, 532, 110, 6, 6, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, 215, 532, 110, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(113, 71, 232);
    doc.text('2. APPROVED 60-SECOND ACTION', 52, 237);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(26, 19, 56);
    doc.text('Write the action exactly as shown on MoodFlip:', 52, 260);
    doc.text('____________________________________________________________________________', 52, 285);
    doc.text('____________________________________________________________________________', 52, 310);

    // Section 3 Before & After
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, 340, 255, 110, 6, 6, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, 340, 255, 110, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(113, 71, 232);
    doc.text('Before the action', 50, 362);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('What did you notice?', 50, 382);
    doc.text('________________________________', 50, 410);
    doc.text('________________________________', 50, 430);

    doc.setFillColor(244, 239, 252);
    doc.roundedRect(317, 340, 255, 110, 6, 6, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(317, 340, 255, 110, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(16, 185, 129);
    doc.text('After the action', 327, 362);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('What changed?', 327, 382);
    doc.text('________________________________', 327, 410);
    doc.text('________________________________', 327, 430);

    // Section 4 Reflection
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, 465, 532, 160, 6, 6, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, 465, 532, 160, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(21, 24, 59);
    doc.text('MY REFLECTION: Anything I want to remember from today', 52, 490);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(104, 96, 127);
    doc.text('____________________________________________________________________________', 52, 520);
    doc.text('____________________________________________________________________________', 52, 550);
    doc.text('____________________________________________________________________________', 52, 580);
    doc.text('____________________________________________________________________________', 52, 610);

    drawFooter(doc, 3 + d, total, 'Daily Reflection Journal');
  }

  // Page 11 End of Week Review
  doc.addPage();
  drawHeader(doc, 'moodflip | Daily Reflection Journal', '7 DAYS COMPLETE');
  drawWatermark(doc);

  doc.setFillColor(113, 71, 232);
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
    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, y, 532, 120, 6, 6, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, y, 532, 120, 6, 6, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(113, 71, 232);
    doc.text(esc(l), 52, y + 25);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(104, 96, 127);
    doc.text('__________________________________________________________________________', 52, y + 55);
    doc.text('__________________________________________________________________________', 52, y + 85);
  });

  drawFooter(doc, 11, total, 'Daily Reflection Journal');

  // Page 12 Prominent Back Cover Branding Page
  drawBackCoverPage(doc, 'Daily Reflection Journal', total);
}

// ════════════════════════════════════════════════════════════════════
// BOOK 4: 30-Day Emotional Resilience E-Book (16 Pages)
// ════════════════════════════════════════════════════════════════════
function buildBook4(doc: jsPDF, userName: string) {
  const user = userName || 'Valued Member';
  const total = 16;

  try {
    doc.addImage(COVER_IMAGE_BASE64, 'JPEG', 0, 0, 612, 792);
  } catch (e) {
    doc.setFillColor(12, 18, 44);
    doc.rect(0, 0, 612, 792, 'F');
  }

  try {
    doc.setGState(new (doc as any).GState({ opacity: 0.92 }));
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(40, 555, 532, 180, 12, 12, 'F');
    doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
  } catch (e) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(40, 555, 532, 180, 12, 12, 'F');
  }

  doc.setDrawColor(247, 159, 32);
  doc.setLineWidth(1.5);
  doc.roundedRect(40, 555, 532, 180, 12, 12, 'S');

  drawBrandHeaderLogo(doc, 60, 570, 0.9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(21);
  doc.setTextColor(21, 24, 59);
  doc.text('30-Day Emotional Resilience E-Book', 60, 615);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(247, 159, 32);
  doc.text('Comprehensive guide to long-term emotional mastery', 60, 634);

  doc.setFillColor(234, 227, 242);
  doc.rect(60, 644, 492, 1, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(104, 96, 127);
  doc.text('THIS E-BOOK BELONGS TO:', 60, 664);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13.5);
  doc.setTextColor(21, 24, 59);
  doc.text(esc(user), 60, 684);

  // Pages 2-15 Content
  for (let p = 2; p <= 15; p++) {
    doc.addPage();
    drawHeader(doc, 'moodflip | 30-Day Resilience E-Book');
    drawWatermark(doc);

    doc.setFillColor(21, 24, 59);
    doc.roundedRect(40, 50, 532, 40, 6, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text(`Resilience Module - Section ${p - 1}`, 56, 76);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(104, 96, 127);
    doc.text('Build lasting emotional mastery through daily structured reflection and evidence-informed actions.', 40, 115);

    doc.setFillColor(244, 239, 252);
    doc.roundedRect(40, 140, 532, 580, 8, 8, 'F');
    doc.setDrawColor(234, 227, 242);
    doc.roundedRect(40, 140, 532, 580, 8, 8, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(21, 24, 59);
    doc.text(`Day ${p - 1} Mindset Exercise & Somatic Action`, 60, 175);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(104, 96, 127);
    doc.text('____________________________________________________________________________', 60, 220);
    doc.text('____________________________________________________________________________', 60, 260);
    doc.text('____________________________________________________________________________', 60, 300);
    doc.text('____________________________________________________________________________', 60, 340);
    doc.text('____________________________________________________________________________', 60, 380);

    drawFooter(doc, p, total, '30-Day Resilience E-Book');
  }

  // Page 16 Prominent Back Cover Page
  drawBackCoverPage(doc, '30-Day Resilience E-Book', total);
}

// ════════════════════════════════════════════════════════════════════
// BOOK 5: Completed Plan Certificate PDF (2 Pages)
// ════════════════════════════════════════════════════════════════════
function buildBook5(doc: jsPDF, planType: string, userName: string) {
  const user = userName || 'Valued Member';
  const totalDays = planType.includes('30') ? 30 : 7;
  const title = totalDays === 30 ? '30-Day Resilience Completion Certificate' : '7-Day Mindset Completion Certificate';

  // Page 1 Certificate
  doc.setFillColor(21, 24, 59);
  doc.rect(0, 0, 612, 792, 'F');

  doc.setFillColor(113, 71, 232);
  doc.rect(0, 0, 612, 380, 'F');

  doc.setFillColor(212, 171, 255);
  doc.rect(0, 376, 612, 4, 'F');

  drawBrandHeaderLogo(doc, 50, 40, 1.4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(212, 171, 255);
  doc.text('MOODFLIP OFFICIAL CERTIFICATE', 50, 95);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(34);
  doc.setTextColor(255, 255, 255);
  doc.text('CERTIFICATE OF COMPLETION', 50, 140);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(230, 220, 250);
  doc.text('This is proudly presented to:', 50, 180);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(212, 171, 255);
  doc.text(esc(user), 50, 225);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(`For successfully completing all ${totalDays} days of the MoodFlip ${totalDays === 30 ? '30-Day Transformation Plan' : '7-Day Mindset Journey'}.`, 50, 265);

  doc.setFillColor(34, 39, 85);
  doc.roundedRect(40, 420, 532, 220, 8, 8, 'F');
  doc.setDrawColor(212, 171, 255);
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

  // Page 2 Prominent Back Cover Page
  drawBackCoverPage(doc, title, 2);
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
