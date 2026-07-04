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

async function seedLineup() {
  try {
    // 1. Create Default Lineup
    console.log("Creating default lineup...");
    const defaultLineup = await client.createOrReplace({
      _id: 'defaultLineup',
      _type: 'defaultLineup',
      title: 'Domyślny Skład (Wicher)',
      formation: '4-3-3',
      lineupHome: {
        starters: [
          { _key: '1', _type: 'customPlayer', customName: '1 - Jan Kowalski' },
          { _key: '2', _type: 'customPlayer', customName: '2 - Piotr Nowak' },
          { _key: '3', _type: 'customPlayer', customName: '3 - Adam Wiśniewski' },
          { _key: '4', _type: 'customPlayer', customName: '4 - Tomasz Wójcik' },
          { _key: '5', _type: 'customPlayer', customName: '5 - Michał Kamiński' },
          { _key: '6', _type: 'customPlayer', customName: '6 - Andrzej Kowalczyk' },
          { _key: '7', _type: 'customPlayer', customName: '7 - Krzysztof Zieliński' },
          { _key: '8', _type: 'customPlayer', customName: '8 - Marek Szymański' },
          { _key: '9', _type: 'customPlayer', customName: '9 - Robert Lewandowski' },
          { _key: '10', _type: 'customPlayer', customName: '10 - Łukasz Woźniak' },
          { _key: '11', _type: 'customPlayer', customName: '11 - Maciej Kozłowski' }
        ],
        bench: [
          { _key: '12', _type: 'customPlayer', customName: '12 - Jakub Dąbrowski' },
          { _key: '15', _type: 'customPlayer', customName: '15 - Kacper Kaczmarek' },
          { _key: '21', _type: 'customPlayer', customName: '21 - Patryk Mazur' }
        ]
      }
    });
    console.log("Default lineup created:", defaultLineup._id);

    // 2. Fetch first upcoming match
    const upcomingMatch = await client.fetch(`*[_type == "match" && status == "upcoming"] | order(date asc)[0]`);
    if (upcomingMatch) {
      console.log("Updating first upcoming match:", upcomingMatch.opponent);
      await client
        .patch(upcomingMatch._id)
        .set({
          useDefaultHomeLineup: true,
          awayFormation: '4-4-2',
          lineupAway: {
            starters: [
              { _key: '1a', _type: 'customPlayer', customName: '1 - Rywal Bramkarz' },
              { _key: '2a', _type: 'customPlayer', customName: '2 - Rywal Obrońca 1' },
              { _key: '3a', _type: 'customPlayer', customName: '3 - Rywal Obrońca 2' },
              { _key: '4a', _type: 'customPlayer', customName: '4 - Rywal Obrońca 3' },
              { _key: '5a', _type: 'customPlayer', customName: '5 - Rywal Obrońca 4' },
              { _key: '6a', _type: 'customPlayer', customName: '6 - Rywal Pomocnik 1' },
              { _key: '7a', _type: 'customPlayer', customName: '7 - Rywal Pomocnik 2' },
              { _key: '8a', _type: 'customPlayer', customName: '8 - Rywal Pomocnik 3' },
              { _key: '9a', _type: 'customPlayer', customName: '9 - Rywal Pomocnik 4' },
              { _key: '10a', _type: 'customPlayer', customName: '10 - Rywal Napastnik 1' },
              { _key: '11a', _type: 'customPlayer', customName: '11 - Rywal Napastnik 2' }
            ]
          }
        })
        .commit();
      console.log("Upcoming match updated!");
    } else {
      console.log("No upcoming matches found.");
    }
    
  } catch (err) {
    console.error("Error seeding lineup:", err);
  }
}

seedLineup();
