import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
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
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube/Vimeo)',
      description: 'Optional video link. If provided, it can be displayed instead of or alongside the image.',
      type: 'url',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'relatedMatch',
      title: 'Related Match (optional)',
      description: 'Link this article to a specific match. A button will appear on the match details page.',
      type: 'reference',
      to: [{ type: 'match' }],
    }),
    defineField({
      name: 'showMatchLineup',
      title: 'Show Match Lineups',
      description: 'If checked, the lineups from the selected Related Match will be displayed at the bottom of the article.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      description: 'Add photos from the event. They will automatically appear as a gallery below the article.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
})
