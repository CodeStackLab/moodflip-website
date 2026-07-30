import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/serverAuth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const user = await getAuthenticatedUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const profile = await prisma.userProfile.findUnique({
    where: { email: user.email },
    select: {
      purchases: {
        where: { status: { startsWith: 'COMPLETED' } },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          productType: true,
          pdfUrl: true,
          status: true,
          createdAt: true,
        },
      },
    },
  });

  return NextResponse.json({ purchases: profile?.purchases || [] });
}
