import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function main() {
  try {
    const tableData = {
      _id: 'seed-league-table-new',
      _type: 'leagueTable',
      seasonName: 'Sezon 2026/2027',
      competition: 'Ekstraklasa',
      autoCalculate: true,
      teams: [
        { _key: 't1', teamName: 'Wicher Gdynia' },
        { _key: 't2', teamName: 'Gryf Słupsk' },
        { _key: 't3', teamName: 'Bałtyk Gdynia' },
        { _key: 't4', teamName: 'Kaszebe' },
        { _key: 't5', teamName: 'Stoczniowiec' },
        { _key: 't6', teamName: 'Portowiec' }
      ]
    };
    const res = await client.createOrReplace(tableData);
    console.log('League table created successfully:', res._id);
  } catch (err) {
    console.error('Error creating table:', err);
  }
}
main();
