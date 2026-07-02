import {defineField, defineType} from 'sanity'

export const ticketType = defineType({
  name: 'ticket',
  title: 'Ticket',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Ticket Title',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'np. Nova City vs FC Orzeł',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (PLN)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'category',
      title: 'Ticket Category',
      type: 'string',
      options: {
        list: [
          {title: 'Normalny', value: 'normal'},
          {title: 'Ulgowy', value: 'discount'},
          {title: 'VIP', value: 'vip'},
          {title: 'Karnet', value: 'season'},
        ],
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date (Optional)',
      type: 'datetime',
    }),
    defineField({
      name: 'image',
      title: 'Ticket/Match Graphic',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'isAvailable',
      title: 'Available for Purchase?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} PLN` : 'No price',
        media,
      }
    }
  }
})
