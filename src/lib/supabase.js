import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-supabase-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local fallback helper for seamlessly running offline or before Supabase key input
export const moodService = {
  async saveMoodLog(log) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('mood_logs')
          .insert([log])
          .select();
        if (error) throw error;
        return { data, isRemote: true };
      } catch (err) {
        console.warn('Supabase save error, falling back to local storage:', err);
      }
    }
    
    // Local storage fallback
    const existing = JSON.parse(localStorage.getItem('moodflip_logs') || '[]');
    const newLog = { ...log, id: Date.now().toString(), created_at: new Date().toISOString() };
    existing.unshift(newLog);
    localStorage.setItem('moodflip_logs', JSON.stringify(existing));
    return { data: [newLog], isRemote: false };
  },

  async getMoodLogs() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('mood_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(30);
        if (!error && data) return { data, isRemote: true };
      } catch (err) {
        console.warn('Supabase fetch error, falling back to local storage:', err);
      }
    }

    const logs = JSON.parse(localStorage.getItem('moodflip_logs') || '[]');
    return { data: logs, isRemote: false };
  }
};
