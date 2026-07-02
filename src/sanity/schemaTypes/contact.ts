import {defineField, defineType} from 'sanity'

export const contactType = defineType({
  name: 'contact',
  title: 'Contact Info',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address (Wyświetlany na stronie)',
      type: 'string',
    }),
    defineField({
      name: 'formRecipientEmail',
      title: 'Form Recipient Email (Email, na który trafią wiadomości z formularza - domyślnie główny Email)',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'text',
    }),
    defineField({
      name: 'description',
      title: 'Additional Information',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'mainImage',
      title: 'Contact Page Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageSize',
      title: 'Image Maximum Size (w pikselach np. 400)',
      type: 'number',
      description: 'Zostaw puste, aby obraz wypełnił całą przestrzeń.',
    }),
  ],
})
