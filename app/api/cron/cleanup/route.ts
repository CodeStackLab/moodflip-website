import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

/**
 * POST /api/cron/cleanup
 * Automatically deletes inactive user profiles after 90 days of inactivity.
 * As per Business Specification §11: "inactive profiles and saved mood history
 * should be deleted after 90 days of inactivity."
 *
 * HOW TO SCHEDULE:
 * - Vercel: Add to vercel.json: { "crons": [{ "path": "/api/cron/cleanup", "schedule": "0 2 * * *" }] }
 * - Supabase: Use pg_cron extension to call this API daily at 2am
 *
 * SECURITY: Protect with CRON_SECRET environment variable in production.
 */
export async function POST(request: Request) {
  try {
    // Security check: only allow calls with correct cron secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;
    const cutoffDate = new Date(Date.now() - NINETY_DAYS_MS).toISOString();

    // ✅ CONNECTED TO SUPABASE — Real deletion query
    const supabaseAdmin = getSupabaseAdmin();
    const { data: deletedProfiles, error } = await supabaseAdmin
      .from('profiles')
      .delete()
      .lt('last_active_at', cutoffDate)
      .select('id, email');

    if (error) throw new Error(`Supabase error: ${error.message}`);

    const simulatedDeletedCount = deletedProfiles?.length ?? 0;
    console.log(`[cleanup] 90-day cleanup ran at ${new Date().toISOString()}. Cutoff date: ${cutoffDate}`);
    console.log(`[cleanup] Deleted ${simulatedDeletedCount} inactive profiles older than 90 days`);
    if (simulatedDeletedCount > 0) {
      console.log('[cleanup] Deleted profiles:', deletedProfiles?.map(p => p.email).join(', '));
    }

    return NextResponse.json({
      success: true,
      message: '90-day cleanup completed',
      cutoffDate,
      deletedCount: simulatedDeletedCount,
      ranAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('[cleanup] Error during 90-day cleanup:', err);
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
  }
}

/**
 * GET /api/cron/cleanup
 * Returns cleanup schedule info (for admin dashboard display)
 */
export async function GET() {
  return NextResponse.json({
    info: '90-day inactive profile cleanup endpoint',
    schedule: 'Daily at 2:00 AM UTC',
    rule: 'Deletes profiles with last_active_at older than 90 days',
    spec: 'Business Specification §11 - Privacy, Consent and Automatic Deletion'
  });
}
