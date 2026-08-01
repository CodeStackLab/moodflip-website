import { NextResponse } from 'next/server';
import { PDFDocument, PDFPage, PDFFont, rgb, StandardFonts } from 'pdf-lib';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { MOOD_DATA } from '@/lib/moodData';

export const dynamic = 'force-dynamic';

type Checkin = {
  primaryMood: string;
  specificFeeling: string;
  targetMood: string;
  actionShown: string;
  createdAt: Date;
};

function wrapText(text: string, maxCharacters = 84) {
  const words = text.replace(/\s+/g, ' ').trim().split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxCharacters && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawWrapped(page: PDFPage, font: PDFFont, text: string, x: number, y: number, size: number, color = rgb(0.25, 0.25, 0.3)) {
  const lines = wrapText(text);
  lines.forEach((line, index) => {
    page.drawText(line, { x, y: y - index * (size + 3), size, font, color });
  });
  return y - lines.length * (size + 3);
}

export async function GET(request: Request) {
  try {
    const sessionId = new URL(request.url).searchParams.get('session_id') || '';
    if (!sessionId || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'A valid paid download link is required.' }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment has not been confirmed.' }, { status: 402 });
    }

    const email = (session.customer_details?.email || session.customer_email || session.metadata?.email || '')
      .trim()
      .toLowerCase();
    const planType = session.metadata?.planType === '30_DAY_PDF' ? '30_DAY_PDF' : '7_DAY_PDF';
    const totalDays = planType === '30_DAY_PDF' ? 30 : 7;
    const maximumEntries = planType === '30_DAY_PDF' ? 90 : 21;
    if (!email) return NextResponse.json({ error: 'Purchase email not found.' }, { status: 404 });

    const profile = await prisma.userProfile.findUnique({
      where: { email },
      select: { id: true, name: true },
    });
    if (!profile) return NextResponse.json({ error: 'Profile not found.' }, { status: 404 });

    const checkins: Checkin[] = await prisma.userCheckin.findMany({
      where: { profileId: profile.id },
      orderBy: { createdAt: 'asc' },
      take: maximumEntries,
      select: {
        primaryMood: true,
        specificFeeling: true,
        targetMood: true,
        actionShown: true,
        createdAt: true,
      },
    });
    if (!checkins.length) {
      return NextResponse.json({ error: 'No saved check-ins were found for this report.' }, { status: 404 });
    }

    const allFeelings = MOOD_DATA.flatMap(family => family.subCategories.flatMap(category => category.feelings));
    const allActions = allFeelings.flatMap(feeling => feeling.actions);
    const usedActions = new Set<string>();
    const reportCheckins = checkins.map(item => {
      const matchingFeeling = allFeelings.find(feeling => feeling.id === item.specificFeeling);
      const candidates = [item.actionShown, ...(matchingFeeling?.actions || []), ...allActions];
      const uniqueAction = candidates.find(action => !usedActions.has(action)) || item.actionShown;
      usedActions.add(uniqueAction);
      return { ...item, actionShown: uniqueAction };
    });

    const moodCounts = reportCheckins.reduce<Record<string, number>>((counts, item) => {
      const key = item.specificFeeling || item.primaryMood;
      counts[key] = (counts[key] || 0) + 1;
      return counts;
    }, {});
    const mostFrequentMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'your selected moods';
    const distinctDays = new Set(reportCheckins.map((item) => item.createdAt.toISOString().slice(0, 10))).size;

    const pdf = await PDFDocument.create();
    const regular = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    let page = pdf.addPage([612, 792]);
    let y = 735;

    const addPage = () => {
      page = pdf.addPage([612, 792]);
      y = 745;
      page.drawText('MoodFlip personalised report', { x: 46, y: 764, size: 9, font: bold, color: rgb(0.45, 0.33, 0.72) });
    };
    const ensureSpace = (needed: number) => {
      if (y < needed) addPage();
    };

    page.drawText(`MoodFlip ${totalDays}-Day Personalised Report`, {
      x: 46, y, size: 23, font: bold, color: rgb(0.39, 0.27, 0.73),
    });
    y -= 32;
    page.drawText(`Prepared for ${profile.name || email}  |  ${reportCheckins.length} check-ins across ${distinctDays} calendar days`, {
      x: 46, y, size: 10, font: regular, color: rgb(0.35, 0.35, 0.42),
    });
    y -= 34;

    page.drawRectangle({ x: 46, y: y - 72, width: 520, height: 82, color: rgb(0.96, 0.94, 0.99) });
    page.drawText('Gentle pattern summary', { x: 62, y: y - 12, size: 12, font: bold, color: rgb(0.39, 0.27, 0.73) });
    y = drawWrapped(
      page,
      regular,
      `Across these check-ins, “${mostFrequentMood}” appeared most often. This is a simple descriptive pattern, not a diagnosis. Consider which situations, times, or supports helped your target moods feel more reachable.`,
      62,
      y - 31,
      9.5,
    ) - 30;

    reportCheckins.forEach((item, index) => {
      ensureSpace(145);
      const timestamp = item.createdAt.toLocaleString('en-AU', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Australia/Sydney',
      });
      page.drawText(`${index + 1}. ${timestamp}`, { x: 46, y, size: 10.5, font: bold, color: rgb(0.16, 0.13, 0.23) });
      y -= 17;
      y = drawWrapped(page, regular, `Selected mood: ${item.primaryMood} / ${item.specificFeeling}`, 58, y, 9.5);
      y = drawWrapped(page, regular, `Positive target: ${item.targetMood}`, 58, y - 3, 9.5, rgb(0.1, 0.45, 0.32));
      y = drawWrapped(page, regular, `60-second action: ${item.actionShown}`, 58, y - 3, 9.5);
      y -= 17;
      page.drawLine({ start: { x: 46, y }, end: { x: 566, y }, thickness: 0.6, color: rgb(0.88, 0.85, 0.92) });
      y -= 18;
    });

    ensureSpace(75);
    y = drawWrapped(
      page,
      regular,
      'MoodFlip is a self-reflection utility for everyday wellbeing. It is not therapy, medical advice, diagnosis, or crisis support.',
      46,
      y,
      8.5,
      rgb(0.42, 0.42, 0.48),
    );
    page.drawText('© 2026 MoodFlip. All rights reserved.', { x: 46, y: y - 8, size: 8.5, font: regular, color: rgb(0.5, 0.5, 0.55) });

    const bytes = await pdf.save();
    return new Response(bytes.buffer as ArrayBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="MoodFlip_${totalDays}-Day_Report.pdf"`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch (error) {
    console.error('PDF generation failed:', error);
    return NextResponse.json({ error: 'The paid report could not be generated. Your purchase remains recorded; please retry from your profile.' }, { status: 500 });
  }
}
