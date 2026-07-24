import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  const suppliedPassword = request.headers.get('x-admin-password');

  if (!configuredPassword || suppliedPassword !== configuredPassword) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const users = await prisma.userProfile.findMany({
      orderBy: { lastActiveAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        visitCount: true,
        isPaid: true,
        lastActiveAt: true,
        _count: { select: { checkins: true, purchases: true } },
      },
    });

    return NextResponse.json({
      users: users.map(({ _count, ...user }) => ({
        ...user,
        checkinsCount: _count.checkins,
        purchasesCount: _count.purchases,
      })),
    });
  } catch (error) {
    console.error('Admin user load failed:', error);
    return NextResponse.json({ error: 'Unable to load users.' }, { status: 503 });
  }
}
