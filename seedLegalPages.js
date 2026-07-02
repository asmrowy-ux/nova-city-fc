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

const pages = [
  {
    title: 'Polityka prywatności',
    slug: 'privacy',
    text: 'To jest przykładowa polityka prywatności. Przejdź do Sanity Studio (Strony Prawne), aby ją edytować i dodać swoje rzeczywiste zapisy o RODO, przetwarzaniu danych i inspektorze ochrony danych.',
  },
  {
    title: 'Regulamin',
    slug: 'terms',
    text: 'To jest przykładowy regulamin serwisu. Przejdź do Sanity Studio (Strony Prawne), aby go edytować i dodać warunki świadczenia usług, zakupu biletów czy korzystania z forum.',
  },
  {
    title: 'Polityka Cookies',
    slug: 'cookies',
    text: 'To jest przykładowa polityka cookies. Przejdź do Sanity Studio (Strony Prawne), aby opisać, jakie ciasteczka zbiera Twoja strona (np. niezbędne, analityczne, marketingowe).',
  }
];

async function seedLegalPages() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("BRAK TOKENU!");
    process.exit(1);
  }

  console.log('Dodawanie stron prawnych...');

  for (const page of pages) {
    const doc = {
      _type: 'legalPage',
      title: page.title,
      slug: {
        _type: 'slug',
        current: page.slug,
      },
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              marks: [],
              text: page.text,
            },
          ],
        },
      ],
    };

    try {
      const created = await client.create(doc);
      console.log(`Dodano: ${created.title}`);
    } catch (err) {
      console.error(`Błąd podczas dodawania ${page.title}:`, err.message);
    }
  }

  console.log('Gotowe!');
}

seedLegalPages();
