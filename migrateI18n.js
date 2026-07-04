import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function migrate() {
  const types = [
    'post', 'match', 'player', 'siteSettings', 'leagueTable', 
    'defaultLineup', 'sponsor', 'clubArticle', 'clubHistory', 
    'contact', 'customPage', 'jobOffer', 'legalPage', 
    'product', 'stadium', 'staff', 'ticket'
  ];

  const docs = await client.fetch(`*[_type in $types && !defined(language)]`, { types });
  console.log(`Found ${docs.length} documents without language field.`);

  let i = 0;
  for (const doc of docs) {
    await client.patch(doc._id).set({ language: 'pl' }).commit();
    i++;
    console.log(`Migrated ${i}/${docs.length} - ${doc._id} (${doc._type})`);
  }
  
  console.log('Migration complete.');
}

migrate().catch(console.error);
