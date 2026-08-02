import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hasValidAdminSession } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return fetchUsers(request);
}

export async function POST(request: Request) {
  return fetchUsers(request);
}

async function fetchUsers(request: Request) {
  if (!hasValidAdminSession(request)) {
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
