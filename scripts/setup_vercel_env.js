/**
 * setup_vercel_env.js
 * Sets all required environment variables on Vercel for MoodFlip
 */

const https = require('https');

const VERCEL_TOKEN = process.env.VERCEL_TOKEN || '';
const PROJECT_ID = process.env.VERCEL_PROJECT_ID || 'prj_nYvg4RwliDTCCwP5Z8Q3lqtMHuCN';

// All env vars to set
const ENV_VARS = [
  {
    key: 'NEXT_PUBLIC_SUPABASE_URL',
    value: 'https://njrwtoezmazwjqnfizkg.supabase.co',
    type: 'plain',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qcnd0b2V6bWF6d2pxbmZpemtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NzYyNTQsImV4cCI6MjEwMzE1MjI1NH0.nhtqU_HovmasMXZCKfDmX9IEDY29Yd_cdJ7Cyl044vg',
    type: 'plain',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'SUPABASE_SERVICE_ROLE_KEY',
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qcnd0b2V6bWF6d2pxbmZpemtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzU3NjI1NCwiZXhwIjoyMTAzMTUyMjU0fQ.pAx6z8HfbdiFdzXDSGW6e_qlfhLxpJlvr9xsZo2sfFw',
    type: 'sensitive',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'SUPABASE_PROJECT_REF',
    value: 'njrwtoezmazwjqnfizkg',
    type: 'plain',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'CRON_SECRET',
    value: 'moodflip_cron_2026_secure_key_xyz',
    type: 'sensitive',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'NEXT_PUBLIC_SITE_URL',
    value: 'https://moodflip.coach',
    type: 'plain',
    target: ['production']
  },
  {
    key: 'ADMIN_EMAIL',
    value: 'joy@moodflip.coach',
    type: 'plain',
    target: ['production', 'preview', 'development']
  }
];

function apiRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'api.vercel.com',
      path,
      method,
      headers: {
        'Authorization': 'Bearer ' + VERCEL_TOKEN,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
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
    if (data) req.write(data);
    req.end();
  });
}

async function setEnvVar(envVar) {
  // First try to delete existing (to avoid conflicts)
  // Then create fresh
  const body = {
    key: envVar.key,
    value: envVar.value,
    type: envVar.type,
    target: envVar.target
  };

  const result = await apiRequest('POST', `/v10/projects/${PROJECT_ID}/env`, body);
  return result;
}

async function main() {
  console.log('🚀 Setting Vercel environment variables for MoodFlip...\n');
  console.log('📍 Project: moodflip (prj_nYvg4RwliDTCCwP5Z8Q3lqtMHuCN)\n');

  for (const envVar of ENV_VARS) {
    process.stdout.write(`Setting ${envVar.key}... `);
    try {
      const result = await setEnvVar(envVar);
      if (result.status === 200 || result.status === 201) {
        console.log('✅ Set');
      } else if (result.status === 409) {
        // Already exists — update it
        console.log('🔄 Already exists, updating...');
        // Get existing env var ID
        const existing = await apiRequest('GET', `/v9/projects/${PROJECT_ID}/env`);
        const found = existing.data.envs?.find(e => e.key === envVar.key);
        if (found) {
          const update = await apiRequest('PATCH', `/v10/projects/${PROJECT_ID}/env/${found.id}`, {
            value: envVar.value,
            type: envVar.type,
            target: envVar.target
          });
          console.log(update.status === 200 ? '   ✅ Updated' : `   ⚠️ Status ${update.status}`);
        }
      } else {
        console.log(`⚠️  Status ${result.status}: ${JSON.stringify(result.data).substring(0, 100)}`);
      }
    } catch(e) {
      console.log(`❌ Error: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 400));
  }

  console.log('\n============================');
  console.log('✅ Vercel environment variables set!');
  console.log('============================');
  console.log('\n📋 Variables configured:');
  ENV_VARS.forEach(v => console.log(`  ✅ ${v.key}`));
  console.log('\n⚠️  IMPORTANT: Redeploy Vercel project for changes to take effect!');
  console.log('Run: vercel --prod (or push to main branch on GitHub)');
}

main().catch(e => { console.error('❌ Fatal:', e.message); process.exit(1); });
