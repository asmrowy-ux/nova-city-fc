import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const players = [
  // Drużyna Kobiet
  { name: 'Ewa Pajor', number: 9, position: 'Napastnik', team: 'women', bio: 'Niezwykle bramkostrzelna napastniczka, gwiazda drużyny.' },
  { name: 'Katarzyna Kiedrzynek', number: 1, position: 'Bramkarz', team: 'women', bio: 'Pewny punkt między słupkami, wieloletnia reprezentantka.' },
  { name: 'Paulina Dudek', number: 4, position: 'Obrońca', team: 'women', bio: 'Szefowa defensywy, świetnie wyprowadza piłkę.' },
  { name: 'Ewelina Kamczyk', number: 10, position: 'Pomocnik', team: 'women', bio: 'Kreatywna zawodniczka z doskonałym uderzeniem z dystansu.' },
  { name: 'Martyna Wiankowska', number: 7, position: 'Pomocnik', team: 'women', bio: 'Bardzo szybka skrzydłowa.' },
  
  // Akademia
  { name: 'Kacper Kozłowski', number: 21, position: 'Pomocnik', team: 'academy', bio: 'Największy talent akademii. Pomocnik z wizją gry.' },
  { name: 'Oskar Szymański', number: 33, position: 'Obrońca', team: 'academy', bio: 'Nowoczesny boczny obrońca, świetnie grający w ofensywie.' },
  { name: 'Igor Błaszkiewicz', number: 45, position: 'Bramkarz', team: 'academy', bio: 'Młody bramkarz o niesamowitym refleksie.' },
  { name: 'Marcel Piątek', number: 99, position: 'Napastnik', team: 'academy', bio: 'Instynkt snajpera, strzela bramki z każdej pozycji.' },
  { name: 'Wiktor Karbownik', number: 18, position: 'Pomocnik', team: 'academy', bio: 'Zacięty defensywny pomocnik, silny w odbiorze.' }
];

async function seedExtraPlayers() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("BRAK TOKENU!");
    process.exit(1);
  }

  console.log('Dodawanie zawodniczek i zawodników akademii do bazy...');

  for (const player of players) {
    const doc = {
      _type: 'player',
      name: player.name,
      number: player.number,
      position: player.position,
      team: player.team,
      bio: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              marks: [],
              text: player.bio,
            },
          ],
        },
      ],
    };

    try {
      const created = await client.create(doc);
      console.log(`Dodano: ${created.name} (${created.team})`);
    } catch (err) {
      console.error(`Błąd podczas dodawania ${player.name}:`, err.message);
    }
  }

  console.log('Gotowe!');
}

seedExtraPlayers();
