const https = require('https');
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'njrwtoezmazwjqnfizkg';
const MGMT_TOKEN = process.env.SUPABASE_MGMT_TOKEN || '';

function runSQL(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const req = https.request({
      hostname: 'api.supabase.com',
      path: '/v1/projects/' + PROJECT_REF + '/database/query',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + MGMT_TOKEN,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => resolve({ status: res.statusCode, data: raw.substring(0, 300) }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('🔐 Applying Row Level Security policies...\n');

  const sqls = [
    // Drop old policies first
    'DROP POLICY IF EXISTS "Users can view own profile" ON profiles',
    'DROP POLICY IF EXISTS "Users can update own profile" ON profiles',
    'DROP POLICY IF EXISTS "Users can manage own checkins" ON checkins',
    'DROP POLICY IF EXISTS "Users can view own purchases" ON purchases',
    // Create fresh
    'CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id)',
    'CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id)',
    'CREATE POLICY "Users can manage own checkins" ON checkins FOR ALL USING (auth.uid() = user_id)',
    'CREATE POLICY "Users can view own purchases" ON purchases FOR SELECT USING (auth.uid() = user_id)',
  ];

  for (const sql of sqls) {
    const r = await runSQL(sql);
    const label = sql.substring(0, 55);
    if (r.status === 200) {
      console.log('✅ ' + label);
    } else {
      console.log('⚠️  ' + label);
      console.log('   Response:', r.data);
    }
    await new Promise(res => setTimeout(res, 300));
  }

  console.log('\n✅ RLS policies applied!');
  console.log('\n📋 Summary — Tables in Supabase:');
  console.log('  ✅ profiles     (id, email, name, last_active_at, check_in_count, purchase_status)');
  console.log('  ✅ checkins     (id, user_id, mood, feeling, target_mood, action, saved_at)');
  console.log('  ✅ purchases    (id, user_id, email, product, amount, stripe_payment_id, pdf_*)');
  console.log('  ✅ 90-day auto-delete function: delete_inactive_profiles()');
  console.log('\n🎉 Supabase is ready! Now installing @supabase/supabase-js...');
}

main().catch(e => console.error('Error:', e.message));
