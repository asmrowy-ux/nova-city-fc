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
  const defaultLineup = await client.fetch(`*[_type == "defaultLineup"][0]{
    formation,
    lineupHome {
      starters[] {
        _type == 'reference' => @->{name, number},
        _type == 'customPlayer' => {"customName": customName}
      }
    }
  }`);
  console.log('Default Lineup result:', JSON.stringify(defaultLineup, null, 2));

  const match = await client.fetch(`*[_type == "match" && _id == "71BmP9XvVYj0zDwQUMWan0"][0]{
    useDefaultHomeLineup,
    lineupHome,
    lineupAway
  }`);
  console.log('Match result:', JSON.stringify(match, null, 2));
}

run().catch(console.error);
