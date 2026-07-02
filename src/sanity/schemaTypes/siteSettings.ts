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
  ],
})
