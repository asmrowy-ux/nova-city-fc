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

const products = [
  {
    name: 'Koszulka Meczowa Domowa 24/25',
    slug: 'koszulka-meczowa-domowa-24-25',
    price: 249.99,
    category: 'clothing',
    description: 'Oryginalna koszulka meczowa na sezon 2024/2025. Technologia oddychająca, materiał premium.',
    inStock: true,
  },
  {
    name: 'Koszulka Meczowa Wyjazdowa 24/25',
    slug: 'koszulka-meczowa-wyjazdowa-24-25',
    price: 249.99,
    category: 'clothing',
    description: 'Oficjalna koszulka wyjazdowa. Czysta biel z akcentami klubowymi.',
    inStock: true,
  },
  {
    name: 'Szalik Kibica "Nova City"',
    slug: 'szalik-kibica-nova-city',
    price: 49.99,
    category: 'accessories',
    description: 'Klasyczny szalik tkany, idealny na chłodne dni meczowe na stadionie.',
    inStock: true,
  },
  {
    name: 'Kubek Klubowy',
    slug: 'kubek-klubowy',
    price: 29.99,
    category: 'souvenirs',
    description: 'Ceramiczny kubek o pojemności 330ml z herbem klubu.',
    inStock: true,
  },
  {
    name: 'Czapka z daszkiem',
    slug: 'czapka-z-daszkiem',
    price: 79.99,
    category: 'clothing',
    description: 'Czapka typu snapback z wyhaftowanym logo.',
    inStock: true,
  },
  {
    name: 'Worek sportowy',
    slug: 'worek-sportowy',
    price: 39.99,
    category: 'accessories',
    description: 'Lekki worek na plecy, idealny na trening i na siłownię.',
    inStock: false,
  }
];

async function seedShop() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("BRAK TOKENU!");
    process.exit(1);
  }

  console.log('Dodawanie produktów do sklepu...');

  for (const prod of products) {
    const doc = {
      _type: 'product',
      name: prod.name,
      slug: {
        _type: 'slug',
        current: prod.slug,
      },
      price: prod.price,
      category: prod.category,
      description: prod.description,
      inStock: prod.inStock,
    };

    try {
      const created = await client.create(doc);
      console.log(`Dodano: ${created.name}`);
    } catch (err) {
      console.error(`Błąd podczas dodawania ${prod.name}:`, err.message);
    }
  }

  console.log('Gotowe!');
}

seedShop();
