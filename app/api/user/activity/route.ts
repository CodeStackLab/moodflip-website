import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

/**
 * POST /api/user/activity
 * 1. Updates or inserts profile with last_active_at timestamp (Spec §11)
 * 2. Saves check-in entry to 'checkins' table in Supabase
 * 3. Enables the 90-day auto-deletion cron to calculate inactivity correctly.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, email, checkin } = body;

    const userEmail = email || (userId ? `${userId}@guest.moodflip` : null);

    const supabaseAdmin = getSupabaseAdmin();

    // 1. Update or upsert user profile in Supabase
    if (userEmail) {
      try {
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('id, check_in_count')
          .eq('email', userEmail)
          .maybeSingle();

        if (profile) {
          await supabaseAdmin
            .from('profiles')
            .update({
              last_active_at: new Date().toISOString(),
              check_in_count: (profile.check_in_count || 0) + 1,
            })
            .eq('id', profile.id);
        } else {
          await supabaseAdmin
            .from('profiles')
            .insert({
              email: userEmail,
              last_active_at: new Date().toISOString(),
              check_in_count: 1,
            });
        }
      } catch (err) {
        console.warn('[activity] Supabase profile upsert note:', err);
      }
    }

    // 2. Save check-in record to 'checkins' table if provided
    if (checkin) {
      try {
        await supabaseAdmin
          .from('checkins')
          .insert({
            email: userEmail || 'anonymous@moodflip.coach',
            mood: checkin.mood || 'Sad',
            feeling: checkin.feeling || 'Feeling',
            target_mood: checkin.target_mood || '',
            action_title: checkin.action_title || '',
            action_desc: checkin.action_desc || '',
            saved_at: checkin.saved_at || new Date().toISOString().split('T')[0],
          });
      } catch (err) {
        console.warn('[activity] Supabase checkin insert note:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Check-in and activity saved successfully',
      last_active_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[activity] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
