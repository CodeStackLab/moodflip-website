import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || '').trim().toLowerCase();
    const requiredFields = ['primaryMood', 'subFeeling', 'specificFeeling', 'targetMood', 'actionShown'] as const;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid profile email is required.' }, { status: 400 });
    }

    for (const field of requiredFields) {
      if (!String(body[field] || '').trim()) {
        return NextResponse.json({ error: `Missing ${field}.` }, { status: 400 });
      }
    }

    const profile = await prisma.userProfile.upsert({
      where: { email },
      create: { email, lastActiveAt: new Date() },
      update: { lastActiveAt: new Date() },
      select: { id: true },
    });

    await prisma.userCheckin.create({
      data: {
        profileId: profile.id,
        primaryMood: String(body.primaryMood),
        subFeeling: String(body.subFeeling),
        specificFeeling: String(body.specificFeeling),
        targetMood: String(body.targetMood),
        actionShown: String(body.actionShown),
      },
    });

    const checkinCount = await prisma.userCheckin.count({ where: { profileId: profile.id } });
    return NextResponse.json({ saved: true, checkinCount, showSevenDayOffer: checkinCount >= 7 });
  } catch (error) {
    console.error('Check-in save failed:', error);
    return NextResponse.json({ error: 'Check-in service is temporarily unavailable.' }, { status: 503 });
  }
}
