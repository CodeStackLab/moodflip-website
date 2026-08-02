'use client';

import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseAuthConfigured = Boolean(url && anonKey);

export const supabaseBrowser = isSupabaseAuthConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export async function getAccessToken() {
  if (!supabaseBrowser) return null;
  const { data } = await supabaseBrowser.auth.getSession();
  return data.session?.access_token || null;
}
