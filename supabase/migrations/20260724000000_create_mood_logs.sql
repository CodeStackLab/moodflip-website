-- Automatic initial migration for MoodFlip project

CREATE TABLE IF NOT EXISTS public.mood_logs (
    id BIGSERIAL PRIMARY KEY,
    mood TEXT,
    action_target TEXT,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.mood_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read & insert for demonstration
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access' AND tablename = 'mood_logs'
    ) THEN
        CREATE POLICY "Allow public read access" ON public.mood_logs FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert access' AND tablename = 'mood_logs'
    ) THEN
        CREATE POLICY "Allow public insert access" ON public.mood_logs FOR INSERT WITH CHECK (true);
    END IF;
END $$;
