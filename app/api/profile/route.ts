import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || '').trim().toLowerCase();
    const name = String(body.name || '').trim() || null;
    const visitCount = Math.max(1, Number(body.visitCount) || 1);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    const profile = await prisma.userProfile.upsert({
      where: { email },
      create: { email, name, visitCount, lastActiveAt: new Date() },
      update: {
        name,
        visitCount: { set: visitCount },
        lastActiveAt: new Date(),
      },
      select: { id: true, email: true, name: true, visitCount: true },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Profile save failed:', error);
    return NextResponse.json({ error: 'Profile service is temporarily unavailable.' }, { status: 503 });
  }
}
