import { createClient } from '@supabase/supabase-js';

export type AuthenticatedUser = {
  id: string;
  email: string;
};

export async function getAuthenticatedUser(request: Request): Promise<AuthenticatedUser | null> {
  const authorization = request.headers.get('authorization') || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : '';
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!token || !url || !anonKey) return null;

  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase.auth.getUser(token);
  const email = data.user?.email?.trim().toLowerCase();
  if (error || !data.user || !email) return null;

  return { id: data.user.id, email };
}
