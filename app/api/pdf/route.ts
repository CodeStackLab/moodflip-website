import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email') || 'Valued User';

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Title
    page.drawText('MoodFlip - Personalised 7-Day Mindset Plan', {
      x: 50,
      y: 730,
      size: 20,
      font,
      color: rgb(0.39, 0.4, 0.95),
    });

    page.drawText(`Prepared for: ${userEmail}`, {
      x: 50,
      y: 700,
      size: 12,
      font: fontRegular,
      color: rgb(0.3, 0.3, 0.3),
    });

    const days = [
      { day: 'Day 1', mood: 'Calm & Grounded', action: 'Take 3 deep breaths (4-7-8 method) and list 1 safe anchor.' },
      { day: 'Day 2', mood: 'Focused & Clear', action: 'Write down only your top 1 priority and ignore all minor tasks.' },
      { day: 'Day 3', mood: 'Self-Compassionate', action: 'Place a warm hand over your heart for 60 seconds.' },
      { day: 'Day 4', mood: 'Vitalized & Recharged', action: 'Drink a glass of cold water and step into 2 minutes of sunlight.' },
      { day: 'Day 5', mood: 'Resilient & Strong', action: 'Tense and release your hand muscles 5 times slowly.' },
      { day: 'Day 6', mood: 'Accepting & Peaceful', action: 'Listen to 1 minute of gentle ocean waves.' },
      { day: 'Day 7', mood: 'Empowered & Ready', action: 'Acknowledge your progress over the past week with a smile.' },
    ];

    let currentY = 640;
    days.forEach((d) => {
      page.drawText(`${d.day}: ${d.mood}`, { x: 50, y: currentY, size: 13, font, color: rgb(0.1, 0.1, 0.1) });
      page.drawText(`Action: ${d.action}`, { x: 50, y: currentY - 18, size: 10, font: fontRegular, color: rgb(0.4, 0.4, 0.4) });
      currentY -= 55;
    });

    page.drawText('© 2026 MoodFlip (moodflip.coach). Not medical advice or therapy.', {
      x: 50,
      y: 40,
      size: 9,
      font: fontRegular,
      color: rgb(0.6, 0.6, 0.6),
    });

    const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes.buffer as ArrayBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="MoodFlip_7Day_Plan.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF error:', error);
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 });
  }
}
