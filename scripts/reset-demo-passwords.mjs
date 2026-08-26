import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { createClient } from '@supabase/supabase-js';

const targetUsers = [
  { email: 'admin@demo.com', id: '766d9529-f67f-406a-81ff-b081ecf6dd59' },
  { email: 'applicant@demo.com', id: '3cf34bbb-fd7d-4d55-b491-3465a03c964d' },
  { email: 'customer@demo.com', id: '1951901e-4e97-4f01-b777-d7089c859548' },
  { email: 'officer@demo.com', id: '4e0cfe16-9f2a-41a4-b6a6-f7c2043a5e2c' },
  { email: 'worker@demo.com', id: 'a1099dd1-1eed-45fd-8b0b-8b216421eb73' },
];

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function readRequiredEnv() {
  const envPath = resolve(process.cwd(), '.env');
  let contents;

  try {
    contents = readFileSync(envPath, 'utf8');
  } catch {
    throw new Error('Missing local .env file. No Auth users were changed.');
  }

  const values = new Map();
  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    const value = rawValue.replace(/^(["'])(.*)\1$/, '$2');
    values.set(key, value);
  }

  const url = values.get('SUPABASE_URL');
  const serviceRoleKey = values.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceRoleKey) {
    throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing. No Auth users were changed.');
  }

  return { url, serviceRoleKey };
}

async function main() {
  if (targetUsers.some(({ id }) => !uuidPattern.test(id))) {
    throw new Error('One or more configured Auth user IDs are invalid UUIDs.');
  }

  for (const { email, id } of targetUsers) console.log(`${email} | ${id}`);

  const readline = createInterface({ input, output });
  const confirmation = await readline.question('Type YES to reset all five passwords: ');
  readline.close();
  if (confirmation.trim() !== 'YES') {
    console.log('Confirmation not received. No passwords were changed.');
    return;
  }

  const { url, serviceRoleKey } = readRequiredEnv();
  const supabase = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  for (const { email, id } of targetUsers) {
    const { error } = await supabase.auth.admin.updateUserById(id, {
      password: 'password123',
      email_confirm: true,
    });
    if (error) throw new Error(`Failed to update ${email}: ${error.message}`);
    console.log(`UPDATED ${email}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
