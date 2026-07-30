import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/serverAuth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const email = user.email;
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

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

    const result = await prisma.$transaction(async (tx) => {
      const todayCount = await tx.userCheckin.count({
        where: {
          profileId: profile.id,
          createdAt: { gte: startOfToday, lt: startOfTomorrow },
        },
      });
      if (todayCount >= 3) return { limitReached: true, todayCount };

      await tx.userCheckin.create({
        data: {
          profileId: profile.id,
          primaryMood: String(body.primaryMood).slice(0, 80),
          subFeeling: String(body.subFeeling).slice(0, 80),
          specificFeeling: String(body.specificFeeling).slice(0, 80),
          targetMood: String(body.targetMood).slice(0, 120),
          actionShown: String(body.actionShown).slice(0, 800),
        },
      });
      return { limitReached: false, todayCount: todayCount + 1 };
    });

    if (result.limitReached) {
      return NextResponse.json({
        error: 'You have saved your 3 MoodFlip check-ins for today. You can still use the free tool, and you can save more check-ins tomorrow.',
        limitReached: true,
        todayCount: result.todayCount,
      }, { status: 409 });
    }

    const checkinCount = await prisma.userCheckin.count({ where: { profileId: profile.id } });
    const savedDays = await prisma.$queryRaw<Array<{ days: bigint }>>`
      SELECT COUNT(DISTINCT DATE("createdAt"))::bigint AS days
      FROM "user_checkins"
      WHERE "profileId" = ${profile.id}
    `;
    const calendarDays = Number(savedDays[0]?.days || 0);
    return NextResponse.json({
      saved: true,
      checkinCount,
      todayCount: result.todayCount,
      calendarDays,
      showSevenDayOffer: calendarDays >= 7,
    });
  } catch (error) {
    console.error('Check-in save failed:', error);
    return NextResponse.json({ error: 'Check-in service is temporarily unavailable.' }, { status: 503 });
  }
}
