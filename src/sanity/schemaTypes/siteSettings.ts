import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nazwa Klubu',
      type: 'string',
      description: 'Główna nazwa klubu wyświetlana na stronie (np. Nova City FC)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo Klubu',
      type: 'image',
      description: 'Główne logo klubu w formacie PNG lub SVG',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoSize',
      title: 'Wysokość Logo (w pikselach)',
      type: 'number',
      description: 'Zalecana wartość to między 40 a 120. Domyślnie 48.',
      initialValue: 48,
      validation: (Rule) => Rule.min(20).max(200),
    }),
    defineField({
      name: 'mainMenu',
      title: 'Główne Menu (Nawigacja)',
      type: 'array',
      description: 'Zbuduj pasek nawigacyjny. Możesz dodawać pojedyncze linki lub rozwijane listy (dropdown).',
      of: [
        {type: 'menuItem'},
        {type: 'menuDropdown'}
      ]
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Icon shown in the browser tab (should be square).',
    }),
    defineField({
      name: 'footerDescription',
      title: 'Opis w stopce',
      type: 'text',
      description: 'Krótki opis klubu widoczny w lewej części stopki.',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Tekst Praw Autorskich (Copyright)',
      type: 'string',
      description: 'Tekst wyświetlany na samym dole stopki. Zostaw puste, aby użyć domyślnego.',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Tło sekcji głównej (Hero)',
      type: 'image',
      description: 'Główne zdjęcie w tle na samej górze strony. Jeśli puste, użyte zostanie domyślne.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroTitle',
      title: 'Tytuł w sekcji głównej (Hero)',
      type: 'string',
      description: 'Wielki napis na samej górze strony. Jeśli zostawisz puste, zostanie użyta "Nazwa Klubu".',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Opis w sekcji głównej (Hero)',
      type: 'text',
      description: 'Tekst widoczny pod nazwą klubu na samej górze strony. Zostaw puste, by użyć domyślnego.',
    }),
    defineField({
      name: 'syncHeroWithFooter',
      title: 'Użyj opisu ze stopki w sekcji głównej',
      type: 'boolean',
      description: 'Zaznacz, aby tekst w sekcji głównej pobierał się z pola "Opis w stopce", zastępując własny opis.',
      initialValue: false,
    }),
    defineField({
      name: 'decorationsEnabled',
      title: 'Pokaż Motywy Dekoracyjne',
      type: 'boolean',
      description: 'Zaznacz, aby wyświetlać dodatkowe akcenty graficzne (ukośne linie, ramki KLUB) w całym serwisie.',
      initialValue: true,
    }),
    defineField({
      name: 'decorationsColor',
      title: 'Kolor Motywów Dekoracyjnych',
      type: 'string',
      description: 'Podaj kolor w formacie HEX (np. #FFB800). Jeśli puste, użyty zostanie domyślny złoty.',
      initialValue: '#FBBF24',
      validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        name: 'hex color',
        invert: false,
      }),
    }),
    defineField({
      name: 'primaryColor',
      title: 'Główny Kolor Akcentu (Primary)',
      type: 'string',
      description: 'Główny kolor używany dla nazwy klubu, obramowań, przycisków, i ikon. Format HEX (np. #d4af37)',
      initialValue: '#d4af37',
      validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: 'hex color', invert: false }),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Główny Kolor Tła (Background)',
      type: 'string',
      description: 'Główny kolor tła dla całej strony. Format HEX (np. #0a0a0a dla ciemnego motywu)',
      initialValue: '#0a0a0a',
      validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: 'hex color', invert: false }),
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Tło Pomocnicze (Secondary)',
      type: 'string',
      description: 'Tło dla kart (np. Aktualności), elementów menu, czy nagłówków. Format HEX (np. #121212)',
      initialValue: '#121212',
      validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: 'hex color', invert: false }),
    }),
    defineField({
      name: 'foregroundColor',
      title: 'Kolor Tekstu (Foreground)',
      type: 'string',
      description: 'Główny kolor tekstu na stronie. Format HEX (np. #ffffff)',
      initialValue: '#ffffff',
      validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: 'hex color', invert: false }),
    }),
  ],
})
