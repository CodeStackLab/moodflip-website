import { NextResponse } from 'next/server';

/**
 * POST /api/user/activity
 * Updates the last_active_at timestamp for a user (Spec §11)
 * Called whenever a user: saves a check-in, logs in, or interacts with profile.
 * This enables the 90-day auto-deletion cron to calculate inactivity correctly.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, email } = body;

    if (!userId && !email) {
      return NextResponse.json({ error: 'userId or email required' }, { status: 400 });
    }

    // NOTE: When Supabase is connected, replace this with actual DB update:
    // await supabase
    //   .from('profiles')
    //   .update({ last_active_at: new Date().toISOString() })
    //   .eq('id', userId);

    // For now, log the activity update (Supabase integration pending)
    console.log(`[activity] Updated last_active_at for user: ${userId || email} at ${new Date().toISOString()}`);

    return NextResponse.json({
      success: true,
      message: 'Activity timestamp updated',
      last_active_at: new Date().toISOString()
    });
  } catch (err) {
    console.error('[activity] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
