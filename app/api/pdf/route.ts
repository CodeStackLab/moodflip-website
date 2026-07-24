import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email') || 'Valued User';
    const planType = searchParams.get('type') || '7_DAY_PDF'; // 7_DAY_PDF or 30_DAY_PDF

    const pdfDoc = await PDFDocument.create();
    const is30Day = planType === '30_DAY_PDF';
    const totalDays = is30Day ? 30 : 7;

    const page = pdfDoc.addPage([600, is30Day ? 1200 : 800]);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Title Header
    page.drawText(`MoodFlip - Personalised ${totalDays}-Day Mindset Plan`, {
      x: 50,
      y: is30Day ? 1130 : 730,
      size: 20,
      font,
      color: rgb(0.39, 0.4, 0.95),
    });

    page.drawText(`Prepared for: ${userEmail} | Product: ${is30Day ? '30-Day Master Plan ($19)' : '7-Day Plan ($7)'}`, {
      x: 50,
      y: is30Day ? 1100 : 700,
      size: 11,
      font: fontRegular,
      color: rgb(0.3, 0.3, 0.3),
    });

    const sampleActions = [
      'Take 3 deep breaths (4-7-8 method) and list 1 safe anchor.',
      'Write down only your top 1 priority and ignore all minor tasks.',
      'Place a warm hand over your heart for 60 seconds.',
      'Drink a glass of cold water and step into 2 minutes of sunlight.',
      'Tense and release your hand muscles 5 times slowly.',
      'Listen to 1 minute of gentle ocean waves.',
      'Acknowledge your progress over the past days with a genuine smile.',
    ];

    let currentY = is30Day ? 1040 : 640;
    const renderCount = is30Day ? 15 : 7; // Render structured plan days

    for (let i = 1; i <= renderCount; i++) {
      const action = sampleActions[(i - 1) % sampleActions.length];
      page.drawText(`Day ${i}: Mindset Shift & Micro-Action`, { x: 50, y: currentY, size: 12, font, color: rgb(0.1, 0.1, 0.1) });
      page.drawText(`Action: ${action}`, { x: 50, y: currentY - 16, size: 9.5, font: fontRegular, color: rgb(0.4, 0.4, 0.4) });
      currentY -= 50;
    }

    page.drawText('© 2026 MoodFlip (moodflip.coach). Not medical advice or therapy.', {
      x: 50,
      y: 35,
      size: 9,
      font: fontRegular,
      color: rgb(0.6, 0.6, 0.6),
    });

    const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes.buffer as ArrayBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="MoodFlip_${totalDays}Day_Plan.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF error:', error);
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 });
  }
}
