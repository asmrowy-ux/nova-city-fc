import {defineField, defineType} from 'sanity'

export const leagueTableType = defineType({
  name: 'leagueTable',
  title: 'League Table',
  type: 'document',
  fields: [
    defineField({
      name: 'seasonName',
      title: 'Season Name (e.g. 2025/2026)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'competition',
      title: 'Competition Name',
      type: 'string',
      initialValue: 'Ekstraklasa',
    }),
    defineField({
      name: 'autoCalculate',
      title: 'Obliczaj Automatycznie z Meczów',
      type: 'boolean',
      description: 'Zaznacz aby system sam liczył punkty/bramki na podst. zakończonych meczów dla Nova City. Wyłącz aby użyć liczb podanych ręcznie poniżej.',
      initialValue: true,
    }),
    defineField({
      name: 'teams',
      title: 'Teams',
      description: 'Dodaj drużyny w lidze. Kolejność będzie nadpisana jeśli włączone jest automatyczne liczenie. Nowa drużyna wpisana tu od razu pojawi się w systemie z 0 punktami.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'teamEntry',
          title: 'Team',
          fields: [
            { name: 'teamName', title: 'Team Name', type: 'string', validation: (rule: any) => rule.required() },
            { name: 'logo', title: 'Team Logo', type: 'image', options: { hotspot: true } },
            { name: 'played', title: 'P (Played)', type: 'number', initialValue: 0 },
            { name: 'won', title: 'W (Won)', type: 'number', initialValue: 0 },
            { name: 'drawn', title: 'D (Drawn)', type: 'number', initialValue: 0 },
            { name: 'lost', title: 'L (Lost)', type: 'number', initialValue: 0 },
            { name: 'goalsFor', title: 'GF (Goals For)', type: 'number', initialValue: 0 },
            { name: 'goalsAgainst', title: 'GA (Goals Against)', type: 'number', initialValue: 0 },
            { name: 'points', title: 'Pts (Points)', type: 'number', initialValue: 0 },
          ],
          preview: {
            select: {
              teamName: 'teamName',
              points: 'points',
              played: 'played',
            },
            prepare(selection: Record<string, any>) {
              const { teamName, points, played } = selection;
              return {
                title: teamName as string,
                subtitle: `${points || 0} pkt | ${played || 0} meczy`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'seasonName',
      subtitle: 'competition',
    },
  },
})
