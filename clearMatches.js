import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3kzdw0qu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
});

async function clear() {
  console.log('Deleting all matches...');
  const matches = await client.fetch('*[_type == "match"]');
  for (const m of matches) {
    await client.delete(m._id);
    console.log('Deleted:', m._id);
  }
  console.log('Done!');
}
clear();
