import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const deletedProfiles = await prisma.userProfile.deleteMany({
      where: {
        lastActiveAt: {
          lt: ninetyDaysAgo
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: `Successfully purged inactive profiles older than 90 days.`,
      purgedCount: deletedProfiles.count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Purge error:', error);
    return NextResponse.json({ error: 'Failed to purge inactive profiles' }, { status: 500 });
  }
}
