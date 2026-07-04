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

async function seedMatches() {
  console.log('Fetching existing matches to delete...');
  const existing = await client.fetch('*[_type == "match"]');
  for (const match of existing) {
    await client.delete(match._id);
    console.log('Deleted match:', match._id);
  }

  console.log('Seeding new realistic matches...');
  const matches = [
    {
      _type: 'match',
      opponent: 'FC Kudowa Zdrój',
      opponentShort: 'KDZ',
      isHome: true,
      date: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
      competition: 'LIGA AMATOROW SZCZEGOLNEJ TROSKI',
      status: 'upcoming'
    },
    {
      _type: 'match',
      opponent: 'Orzeł Warszawa',
      opponentShort: 'ORZ',
      isHome: false,
      date: new Date(Date.now() + 86400000 * 10).toISOString(), // 10 days from now
      competition: 'Puchar Regionalny',
      status: 'upcoming'
    },
    {
      _type: 'match',
      opponent: 'Górnik Zabrze',
      opponentShort: 'GÓR',
      isHome: true,
      date: new Date(Date.now() - 86400000 * 4).toISOString(), // 4 days ago
      competition: 'Mecz Towarzyski',
      status: 'finished',
      homeScore: 2,
      awayScore: 1
    },
    {
      _type: 'match',
      opponent: 'Legia Warszawa',
      opponentShort: 'LEG',
      isHome: false,
      date: new Date(Date.now() - 86400000 * 12).toISOString(), // 12 days ago
      competition: 'Mecz Towarzyski',
      status: 'finished',
      homeScore: 3,
      awayScore: 3
    }
  ];

  for (const match of matches) {
    const res = await client.create(match);
    console.log('Created match:', res._id);
  }
  
  console.log('Done!');
}

seedMatches().catch(console.error);
