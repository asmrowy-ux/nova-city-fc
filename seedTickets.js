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

const tickets = [
  {
    title: 'Nova City vs FC Orzeł (Liga)',
    slug: 'nova-city-vs-fc-orzel',
    price: 35.00,
    category: 'normal',
    eventDate: new Date(Date.now() + 86400000 * 7).toISOString(),
    description: 'Bilet normalny na najbliższe spotkanie ligowe na naszym stadionie.',
    isAvailable: true,
  },
  {
    title: 'Nova City vs FC Orzeł (VIP)',
    slug: 'nova-city-vs-fc-orzel-vip',
    price: 150.00,
    category: 'vip',
    eventDate: new Date(Date.now() + 86400000 * 7).toISOString(),
    description: 'Bilet VIP. Wstęp do strefy cateringowej, najlepsze miejsca na trybunie centralnej.',
    isAvailable: true,
  },
  {
    title: 'Karnet Sezonowy 2024/2025',
    slug: 'karnet-sezonowy-2024-2025',
    price: 450.00,
    category: 'season',
    description: 'Karnet uprawniający do wstępu na wszystkie mecze domowe rundy jesiennej i wiosennej.',
    isAvailable: true,
  }
];

async function seedTickets() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("BRAK TOKENU!");
    process.exit(1);
  }

  console.log('Dodawanie biletów do systemu...');

  for (const t of tickets) {
    const doc = {
      _type: 'ticket',
      title: t.title,
      slug: {
        _type: 'slug',
        current: t.slug,
      },
      price: t.price,
      category: t.category,
      eventDate: t.eventDate,
      description: t.description,
      isAvailable: t.isAvailable,
    };

    try {
      const created = await client.create(doc);
      console.log(`Dodano bilet: ${created.title}`);
    } catch (err) {
      console.error(`Błąd podczas dodawania ${t.title}:`, err.message);
    }
  }

  console.log('Gotowe!');
}

seedTickets();
