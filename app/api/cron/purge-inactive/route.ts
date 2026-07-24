import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    // Delete profiles and checkins inactive for > 90 days
    const deletedProfiles = await prisma.userProfile.deleteMany({
      where: {
        lastActiveAt: {
          lt: ninetyDaysAgo
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: `Automatic 90-day cleanup completed. ${deletedProfiles.count} inactive profiles purged.`,
      purgedCount: deletedProfiles.count
    });
  } catch (error) {
    console.error('Purge error:', error);
    return NextResponse.json({ success: false, error: 'Database purge error' }, { status: 500 });
  }
}
