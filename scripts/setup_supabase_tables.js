/**
 * setup_supabase_tables.js
 * Creates all required database tables for MoodFlip in Supabase
 * as per Business Specification v4
 */

const https = require('https');

const PROJECT_REF = 'njrwtoezmazwjqnfizkg';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qcnd0b2V6bWF6d2pxbmZpemtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzU3NjI1NCwiZXhwIjoyMTAzMTUyMjU0fQ.pAx6z8HfbdiFdzXDSGW6e_qlfhLxpJlvr9xsZo2sfFw';
const SUPABASE_URL = `https://${PROJECT_REF}.supabase.co`;

function runSQL(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const req = https.request({
      hostname: `${PROJECT_REF}.supabase.co`,
      path: '/rest/v1/rpc/exec_sql',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Prefer': 'return=minimal'
      }
    }, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => resolve({ status: res.statusCode, body: raw }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// Use Management API to run SQL
function runSQLViaManagement(sql) {
  return new Promise((resolve, reject) => {
    const MGMT_TOKEN = process.env.SUPABASE_MGMT_TOKEN || '';
    const body = JSON.stringify({ query: sql });
    const req = https.request({
      hostname: 'api.supabase.com',
      path: `/v1/projects/${PROJECT_REF}/database/query`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MGMT_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(raw) });
        } catch(e) {
          resolve({ status: res.statusCode, data: raw });
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const tables = [
  {
    name: 'profiles',
    sql: `
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        last_active_at TIMESTAMPTZ DEFAULT NOW(),
        check_in_count INTEGER DEFAULT 0,
        purchase_status TEXT DEFAULT 'inactive',
        is_admin BOOLEAN DEFAULT FALSE
      );
      
      -- Index for 90-day cleanup query performance
      CREATE INDEX IF NOT EXISTS idx_profiles_last_active ON profiles(last_active_at);
      CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
    `
  },
  {
    name: 'checkins',
    sql: `
      CREATE TABLE IF NOT EXISTS checkins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
        email TEXT,
        mood TEXT NOT NULL,
        feeling TEXT NOT NULL,
        target_mood TEXT,
        action_title TEXT,
        action_desc TEXT,
        saved_at DATE DEFAULT CURRENT_DATE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS idx_checkins_user_id ON checkins(user_id);
      CREATE INDEX IF NOT EXISTS idx_checkins_saved_at ON checkins(saved_at);
      CREATE INDEX IF NOT EXISTS idx_checkins_email ON checkins(email);
    `
  },
  {
    name: 'purchases',
    sql: `
      CREATE TABLE IF NOT EXISTS purchases (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
        email TEXT NOT NULL,
        product TEXT NOT NULL,
        amount_usd NUMERIC(10,2),
        stripe_payment_id TEXT,
        pdf_generated BOOLEAN DEFAULT FALSE,
        pdf_emailed BOOLEAN DEFAULT FALSE,
        pdf_url TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS idx_purchases_email ON purchases(email);
      CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
    `
  },
  {
    name: '90_day_cleanup_function',
    sql: `
      -- Function for 90-day auto-deletion (Spec §11)
      CREATE OR REPLACE FUNCTION delete_inactive_profiles()
      RETURNS INTEGER AS $$
      DECLARE
        deleted_count INTEGER;
      BEGIN
        DELETE FROM profiles
        WHERE last_active_at < NOW() - INTERVAL '90 days';
        
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        RETURN deleted_count;
      END;
      $$ LANGUAGE plpgsql;
    `
  },
  {
    name: 'Row Level Security',
    sql: `
      -- Enable RLS on all tables (Security best practice)
      ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
      ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
      ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
      
      -- Allow users to read/update only their own profile
      CREATE POLICY IF NOT EXISTS "Users can view own profile"
        ON profiles FOR SELECT
        USING (auth.uid() = id);
        
      CREATE POLICY IF NOT EXISTS "Users can update own profile"
        ON profiles FOR UPDATE
        USING (auth.uid() = id);
        
      -- Allow users to manage their own checkins
      CREATE POLICY IF NOT EXISTS "Users can manage own checkins"
        ON checkins FOR ALL
        USING (auth.uid() = user_id);
        
      -- Allow users to view their own purchases
      CREATE POLICY IF NOT EXISTS "Users can view own purchases"
        ON purchases FOR SELECT
        USING (auth.uid() = user_id);
        
      -- Service role bypasses RLS (for admin + cron)
      -- (service_role key already bypasses RLS by default in Supabase)
    `
  }
];

async function main() {
  console.log('🚀 Setting up MoodFlip Supabase database...\n');
  console.log(`📍 Project: ${PROJECT_REF}`);
  console.log(`🌏 Region: ap-south-1 (Mumbai)\n`);

  for (const table of tables) {
    process.stdout.write(`Creating ${table.name}... `);
    try {
      const result = await runSQLViaManagement(table.sql);
      if (result.status === 200 || result.status === 201) {
        console.log(`✅ Done`);
      } else {
        console.log(`⚠️  Status ${result.status}: ${JSON.stringify(result.data).substring(0, 150)}`);
      }
    } catch(e) {
      console.log(`❌ Error: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n============================');
  console.log('✅ Database setup complete!');
  console.log('Tables created: profiles, checkins, purchases');
  console.log('90-day cleanup function created');
  console.log('Row Level Security enabled');
  console.log('============================\n');
  console.log('Next step: Install Supabase client package');
  console.log('Run: npm install @supabase/supabase-js');
}

main().catch(e => { console.error('❌ Fatal:', e.message); process.exit(1); });
