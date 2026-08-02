import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidAdminSession } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!hasValidAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const checkins = await prisma.userCheckin.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        profile: {
          select: { email: true }
        }
      }
    });

    return NextResponse.json({ checkins });
  } catch (error) {
    console.error('Admin checkins load failed:', error);
    return NextResponse.json({ error: 'Unable to load check-ins.' }, { status: 503 });
  }
}
