import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-01-01'
});

async function run() {
  const matches = await client.fetch('*[_type == "match"]{ _id, opponent, date, season, status, useDefaultHomeLineup, lineupHome, lineupAway }');
  const tables = await client.fetch('*[_type == "leagueTable"]{ seasonName }');
  console.log('Matches:', JSON.stringify(matches, null, 2));
  console.log('Tables:', JSON.stringify(tables, null, 2));
}

run().catch(console.error);
