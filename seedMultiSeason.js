import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@sanity/client';
import { v4 as uuidv4 } from 'uuid';

const client = createClient({
  projectId: '3kzdw0qu',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

const TEAMS = [
  { name: 'Wicher', short: 'WIC' },
  { name: 'Górnik Zabrze', short: 'GÓR' },
  { name: 'Legia Warszawa', short: 'LEG' },
  { name: 'Lech Poznań', short: 'LPO' },
  { name: 'Raków Częstochowa', short: 'RAK' },
  { name: 'Pogoń Szczecin', short: 'POG' }
];

const SEASONS = [
  { name: 'Sezon 2023/2024', historical: true },
  { name: 'Sezon 2024/2025', historical: true },
  { name: 'Sezon 2025/2026', historical: true },
  { name: 'Sezon 2026/2027', historical: false, startMonth: 8 } // September 0-indexed is 8
];

async function seed() {
  console.log('Deleting all existing matches and tables...');
  const existingDocs = await client.fetch(`*[_type in ["match", "leagueTable"]][]._id`);
  for (const id of existingDocs) {
    await client.delete(id);
    console.log(`Deleted: ${id}`);
  }

  for (const season of SEASONS) {
    console.log(`\nCreating ${season.name}...`);
    
    // Create League Table
    const tableTeams = TEAMS.map(t => ({
      _key: uuidv4(),
      teamName: t.name,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0
    }));

    const tableDoc = {
      _type: 'leagueTable',
      seasonName: season.name,
      competition: 'Ekstraklasa',
      autoCalculate: true,
      teams: tableTeams
    };

    await client.create(tableDoc);
    console.log(`Created table for ${season.name}`);

    // Create Matches
    if (season.historical) {
      // Generate 5 random historical matches for this season
      const year = parseInt(season.name.split(' ')[1].split('/')[0]);
      
      for (let i = 0; i < 5; i++) {
        const opponent = TEAMS[Math.floor(Math.random() * TEAMS.length)];
        if (opponent.name === 'Wicher') continue;

        const date = new Date(year, 8 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 28) + 1, 18, 0); // Random date between Sep and April
        
        await client.create({
          _type: 'match',
          opponent: opponent.name,
          opponentShort: opponent.short,
          competition: 'Ekstraklasa',
          season: season.name,
          date: date.toISOString(),
          isHome: Math.random() > 0.5,
          status: 'finished',
          homeScore: Math.floor(Math.random() * 4),
          awayScore: Math.floor(Math.random() * 4)
        });
      }
      console.log(`Created 5 historical matches for ${season.name}`);
    } else {
      // Upcoming 2026/2027 season
      const year = 2026;
      let date = new Date(year, season.startMonth, 5, 18, 0); // Sept 5th, 2026

      for (let i = 1; i < TEAMS.length; i++) {
        const opponent = TEAMS[i];
        
        await client.create({
          _type: 'match',
          opponent: opponent.name,
          opponentShort: opponent.short,
          competition: 'Ekstraklasa',
          season: season.name,
          date: date.toISOString(),
          isHome: i % 2 === 0,
          status: 'upcoming'
        });

        // Next match next week
        date.setDate(date.getDate() + 7);
      }
      console.log(`Created ${TEAMS.length - 1} upcoming matches for ${season.name}`);
    }
  }

  console.log('\nSeeding Complete!');
}

seed().catch(console.error);
