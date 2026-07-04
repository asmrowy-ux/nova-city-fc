import {defineField, defineType} from 'sanity'

export const lineupPlayerType = defineType({
  name: 'lineupPlayer',
  title: 'Zawodnik w Składzie',
  type: 'object',
  fields: [
    defineField({
      name: 'player',
      title: 'Zawodnik z bazy',
      type: 'reference',
      to: [{ type: 'player' }],
      description: 'Wybierz zawodnika z bazy (priorytet)'
    }),
    defineField({
      name: 'customName',
      title: 'Zastępcza nazwa',
      type: 'string',
      description: 'Wpisz ręcznie jeśli zawodnika nie ma w bazie (np. drużyna przeciwna)'
    }),
    defineField({
      name: 'position',
      title: 'Pozycja na boisku',
      type: 'string',
      options: {
        list: [
          { title: 'Bramkarz (GK)', value: 'GK' },
          { title: 'Środkowy Obrońca (CB)', value: 'CB' },
          { title: 'Lewy Obrońca (LB)', value: 'LB' },
          { title: 'Prawy Obrońca (RB)', value: 'RB' },
          { title: 'Wahadłowy Lewy (LWB)', value: 'LWB' },
          { title: 'Wahadłowy Prawy (RWB)', value: 'RWB' },
          { title: 'Defensywny Pomocnik (CDM)', value: 'CDM' },
          { title: 'Środkowy Pomocnik (CM)', value: 'CM' },
          { title: 'Ofensywny Pomocnik (CAM)', value: 'CAM' },
          { title: 'Lewy Pomocnik (LM)', value: 'LM' },
          { title: 'Prawy Pomocnik (RM)', value: 'RM' },
          { title: 'Lewoskrzydłowy (LW)', value: 'LW' },
          { title: 'Prawoskrzydłowy (RW)', value: 'RW' },
          { title: 'Środkowy Napastnik (CF/ST)', value: 'ST' },
        ]
      }
    })
  ],
  preview: {
    select: {
      dbName: 'player.name',
      customName: 'customName',
      position: 'position'
    },
    prepare(selection) {
      const { dbName, customName, position } = selection
      const name = dbName || customName || 'Nie wybrano zawodnika'
      return {
        title: name,
        subtitle: position ? `Pozycja: ${position}` : 'Brak przypisanej pozycji'
      }
    }
  }
})
