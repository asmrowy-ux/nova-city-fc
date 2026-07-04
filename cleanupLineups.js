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
  console.log('Fetching documents with lineups...');
  const docs = await client.fetch('*[_type in ["defaultLineup", "match"]]');

  for (const doc of docs) {
    let needsUpdate = false;
    const patch = client.patch(doc._id);

    const checkAndFixArray = (arr) => {
      if (!Array.isArray(arr)) return arr;
      return arr.filter(item => typeof item === 'object' && item !== null);
    };

    if (doc.lineupHome) {
      const fixedStarters = checkAndFixArray(doc.lineupHome.starters);
      const fixedBench = checkAndFixArray(doc.lineupHome.bench);
      
      if (
        (doc.lineupHome.starters && fixedStarters.length !== doc.lineupHome.starters.length) ||
        (doc.lineupHome.bench && fixedBench.length !== doc.lineupHome.bench.length)
      ) {
        needsUpdate = true;
        patch.set({ lineupHome: { starters: fixedStarters, bench: fixedBench } });
      }
    }

    if (doc.lineupAway) {
      const fixedStarters = checkAndFixArray(doc.lineupAway.starters);
      const fixedBench = checkAndFixArray(doc.lineupAway.bench);
      
      if (
        (doc.lineupAway.starters && fixedStarters.length !== doc.lineupAway.starters.length) ||
        (doc.lineupAway.bench && fixedBench.length !== doc.lineupAway.bench.length)
      ) {
        needsUpdate = true;
        patch.set({ lineupAway: { starters: fixedStarters, bench: fixedBench } });
      }
    }

    if (needsUpdate) {
      console.log(`Fixing doc: ${doc._id}`);
      await patch.commit();
    }
  }

  console.log('Cleanup complete.');
}

run().catch(console.error);
