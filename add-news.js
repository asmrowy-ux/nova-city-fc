const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function main() {
  const doc = {
    _type: 'post',
    language: 'pl',
    title: 'HIT Transferowy: Carlos "El Mago" Silva dołącza do Nova City FC!',
    slug: {
      _type: 'slug',
      current: 'hit-transferowy-carlos-el-mago-silva-dolacza-do-nova-city-fc'
    },
    publishedAt: new Date().toISOString(),
    excerpt: 'Zarząd klubu z nieskrywaną radością ogłasza podpisanie 3-letniego kontraktu z jednym z najbardziej pożądanych pomocników w Europie!',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            marks: [],
            text: 'Zarząd klubu Nova City FC oficjalnie potwierdza pozyskanie 24-letniego hiszpańskiego pomocnika, Carlosa Silvy! Ten spektakularny transfer to jasny sygnał dla rywali – w tym sezonie celujemy w mistrzostwo.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _type: 'span',
            marks: [],
            text: '"Jestem niesamowicie podekscytowany możliwością gry dla tak ambitnego klubu. Wizja trenera i zarządu idealnie pokrywa się z moimi celami" - powiedział Carlos na konferencji prasowej.'
          }
        ]
      }
    ]
  };

  try {
    const result = await client.create(doc);
    console.log(`Pomyślnie dodano aktualność o ID: ${result._id}`);
  } catch (err) {
    console.error('Błąd podczas dodawania:', err);
  }
}

main();
