import { createClient } from 'next-sanity'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: false,
})

const defaultMenu = [
  {
    _key: 'menu-news',
    _type: 'menuItem',
    title: 'Aktualności',
    link: '/news'
  },
  {
    _key: 'menu-teams',
    _type: 'menuDropdown',
    title: 'Drużyny',
    items: [
      { _key: 'team-1', _type: 'menuItem', title: 'Pierwsza Drużyna', link: '/team' },
      { _key: 'team-2', _type: 'menuItem', title: 'Drużyna Kobiet', link: '/women' },
      { _key: 'team-3', _type: 'menuItem', title: 'Akademia', link: '/academy' }
    ]
  },
  {
    _key: 'menu-club',
    _type: 'menuDropdown',
    title: 'Klub',
    items: [
      { _key: 'club-1', _type: 'menuItem', title: 'Historia Klubu', link: '/history' },
      { _key: 'club-2', _type: 'menuItem', title: 'Hall of Fame', link: '/hall-of-fame' },
      { _key: 'club-3', _type: 'menuItem', title: 'Sztab Trenerski', link: '/staff' },
      { _key: 'club-4', _type: 'menuItem', title: 'Tabela Ligi', link: '/table' },
      { _key: 'club-5', _type: 'menuItem', title: 'Mecze i Wyniki', link: '/matches' }
    ]
  },
  {
    _key: 'menu-careers',
    _type: 'menuItem',
    title: 'Kariera',
    link: '/careers'
  },
  {
    _key: 'menu-contact',
    _type: 'menuItem',
    title: 'Kontakt',
    link: '/contact'
  },
  {
    _key: 'menu-shop',
    _type: 'menuItem',
    title: 'Sklep',
    link: '/shop'
  }
]

async function seed() {
  try {
    console.log('Patching siteSettings with default menu...')
    await client
      .patch('siteSettings')
      .set({ mainMenu: defaultMenu })
      .commit()
    console.log('Menu seeded successfully!')
  } catch (error) {
    console.error('Failed to seed menu:', error)
  }
}

seed()
