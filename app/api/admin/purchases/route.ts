import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidAdminSession } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (!hasValidAdminSession(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const purchases = await prisma.purchase.findMany({
    orderBy: { createdAt: 'desc' },
    include: { profile: { select: { email: true, name: true } } },
  });
  return NextResponse.json({ purchases });
}

export async function POST(request: Request) {
  if (!hasValidAdminSession(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { purchaseId } = await request.json();
    const purchase = await prisma.purchase.findUnique({
      where: { id: String(purchaseId || '') },
      include: { profile: { select: { email: true } } },
    });
    if (!purchase?.pdfUrl) return NextResponse.json({ error: 'Purchase or download link not found.' }, { status: 404 });
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ error: 'Email delivery is not configured. Use the secure download link instead.' }, { status: 503 });

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'MoodFlip <deliveries@moodflip.coach>',
        to: [purchase.profile.email],
        subject: `Your MoodFlip ${purchase.productType === '30_DAY_PDF' ? '30-Day' : '7-Day'} report download`,
        html: `<div style="font-family:Arial,sans-serif;padding:24px;color:#1e1b4b"><h2>Your MoodFlip report is ready</h2><p>This is the requested replacement delivery link.</p><p><a href="${purchase.pdfUrl}" style="background:#7c54d1;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:700">Download your report</a></p><p style="font-size:12px;color:#64748b">MoodFlip is a self-reflection utility, not therapy or medical advice.</p></div>`,
      }),
    });
    if (!response.ok) return NextResponse.json({ error: 'Email provider rejected the resend.' }, { status: 502 });
    await prisma.purchase.update({ where: { id: purchase.id }, data: { status: 'COMPLETED_DELIVERED' } });
    return NextResponse.json({ resent: true });
  } catch (error) {
    console.error('Admin purchase resend failed:', error);
    return NextResponse.json({ error: 'Unable to resend this report.' }, { status: 500 });
  }
}
