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
  // Bramkarze
  { name: 'Kamil Kowalski', number: 1, position: 'Bramkarz', bio: 'Doświadczony bramkarz z doskonałym refleksem. Kapitan drużyny.' },
  { name: 'Jakub Nowak', number: 12, position: 'Bramkarz', bio: 'Młody talent, świetnie grający na przedpolu.' },
  { name: 'Michał Wiśniewski', number: 22, position: 'Bramkarz', bio: 'Trzeci bramkarz, niezastąpiony w rzutach karnych.' },
  // Obrońcy
  { name: 'Piotr Wójcik', number: 4, position: 'Obrońca', bio: 'Środkowy obrońca, filar naszej defensywy. Króluje w powietrzu.' },
  { name: 'Tomasz Kamiński', number: 5, position: 'Obrońca', bio: 'Lewy obrońca o niesamowitej szybkości i inklinacjach ofensywnych.' },
  { name: 'Mateusz Lewandowski', number: 2, position: 'Obrońca', bio: 'Prawy obrońca. Nieustępliwy, trudny do przejścia jeden na jeden.' },
  { name: 'Jan Zieliński', number: 3, position: 'Obrońca', bio: 'Doświadczony stoper z świetnym czytaniem gry.' },
  { name: 'Krzysztof Szymański', number: 15, position: 'Obrońca', bio: 'Wszechstronny defensor, może grać na obu bokach.' },
  { name: 'Adrian Woźniak', number: 18, position: 'Obrońca', bio: 'Wysoki stoper, bardzo groźny przy stałych fragmentach w ataku.' },
  { name: 'Patryk Dąbrowski', number: 21, position: 'Obrońca', bio: 'Młodzieżowiec, który przebojem wdarł się do pierwszego składu.' },
  // Pomocnicy
  { name: 'Marcin Kozłowski', number: 6, position: 'Pomocnik', bio: 'Defensywny pomocnik, tzw. "przecinak". Zatrzymuje ataki rywali.' },
  { name: 'Bartosz Jankowski', number: 8, position: 'Pomocnik', bio: 'Kreatywny środkowy pomocnik z genialnym przeglądem pola.' },
  { name: 'Maciej Mazur', number: 10, position: 'Pomocnik', bio: 'Ofensywny pomocnik, główny kreator akcji bramkowych naszej drużyny.' },
  { name: 'Kamil Wojciechowski', number: 7, position: 'Pomocnik', bio: 'Prawoskrzydłowy z niesamowitym dryblingiem i dośrodkowaniem.' },
  { name: 'Dawid Kwiatkowski', number: 11, position: 'Pomocnik', bio: 'Lewoskrzydłowy, bardzo szybki i schodzący do środka z piłką.' },
  { name: 'Łukasz Krawczyk', number: 16, position: 'Pomocnik', bio: 'Płuca drużyny. Pomocnik box-to-box z żelazną kondycją.' },
  { name: 'Artur Kaczmarek', number: 19, position: 'Pomocnik', bio: 'Zmiennik w środku pola, potrafi uspokoić grę w trudnych momentach.' },
  // Napastnicy
  { name: 'Robert Piotrowski', number: 9, position: 'Napastnik', bio: 'Klasyczna dziewiątka. Król strzelców poprzedniego sezonu.' },
  { name: 'Mikołaj Grabowski', number: 14, position: 'Napastnik', bio: 'Drugi napastnik, świetnie odnajdujący wolne przestrzenie.' },
  { name: 'Szymon Zając', number: 17, position: 'Napastnik', bio: 'Szybki napastnik, idealny na grę z kontrataku.' },
  { name: 'Daniel Pawłowski', number: 20, position: 'Napastnik', bio: 'Młody wilk w ataku, strzelec wielu ważnych bramek po wejściu z ławki.' },
  { name: 'Damian Michalski', number: 23, position: 'Napastnik', bio: 'Silny fizycznie napastnik, potrafiący utrzymać się przy piłce.' },
];

async function seedPlayers() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("BRAK TOKENU! Zdobądź token w Sanity Dashboard (API -> Tokens) i dodaj SANITY_API_TOKEN do pliku .env.local");
    process.exit(1);
  }

  console.log('Dodawanie zawodników do bazy...');

  for (const player of players) {
    const doc = {
      _type: 'player',
      name: player.name,
      number: player.number,
      position: player.position,
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
      console.log(`Dodano: ${created.name} (numer ${created.number})`);
    } catch (err) {
      console.error(`Błąd podczas dodawania ${player.name}:`, err.message);
    }
  }

  console.log('Gotowe! Dodano 22 zawodników.');
}

seedPlayers();
