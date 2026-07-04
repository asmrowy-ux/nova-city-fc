import {defineField, defineType} from 'sanity'

export const defaultLineupType = defineType({
  name: 'defaultLineup',
  title: 'Default Lineup',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Domyślny Skład (Wicher)',
      readOnly: true,
    }),
    defineField({
      name: 'formation',
      title: 'Formation',
      type: 'string',
      options: {
        list: [
          {title: '4-4-2', value: '4-4-2'},
          {title: '4-3-3', value: '4-3-3'},
          {title: '4-2-3-1', value: '4-2-3-1'},
          {title: '3-5-2', value: '3-5-2'},
          {title: '3-4-3', value: '3-4-3'},
          {title: '5-3-2', value: '5-3-2'},
          {title: 'Tylko Lista (Brak boiska)', value: 'list'},
        ],
      },
      initialValue: '4-4-2',
    }),
    defineField({
      name: 'lineupHome',
      title: 'Domyślna Jedenastka i Rezerwa',
      type: 'object',
      fields: [
        { 
          name: 'starters', 
          title: 'Starting XI (Wymagane 11 jeśli formacja to boisko)', 
          type: 'array', 
          of: [{ type: 'lineupPlayer' }], 
          description: 'Dodaj zawodnika i wybierz mu pozycję na boisku.' 
        },
        { 
          name: 'bench', 
          title: 'Bench (Rezerwowi)', 
          type: 'array', 
          of: [{ type: 'lineupPlayer' }]
        },
      ],
    }),
  ],
})
