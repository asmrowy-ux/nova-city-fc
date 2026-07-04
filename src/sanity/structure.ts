import type {StructureResolver} from 'sanity/structure'
import { Manual } from './components/Manual'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Nova City FC Content')
    .items([
      S.listItem()
        .title('📖 Instrukcja Obsługi')
        .child(
          S.component(Manual).title('Instrukcja Obsługi')
        ),
      S.divider(),
      S.documentTypeListItem('customPage').title('📄 Własne Podstrony (Custom Pages)'),
      S.divider(),
      S.listItem()
        .title('⚙️ Ustawienia Główne (Site Settings)')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('📞 Kontakt i Siedziba')
        .child(
          S.document()
            .schemaType('contact')
            .documentId('contact')
        ),
      S.listItem()
        .title('🏟️ Stadion')
        .child(
          S.document()
            .schemaType('stadium')
            .documentId('stadium')
        ),
      S.divider(),
      S.documentTypeListItem('post').title('📰 Aktualności (News)'),
      S.divider(),
      S.listItem()
        .title('⚽ Klub (Rozgrywki i Skład)')
        .child(
          S.list()
            .title('Klub')
            .items([
              S.documentTypeListItem('match').title('Mecze & Wyniki'),
              S.listItem()
                .title('📋 Domyślny Skład')
                .child(
                  S.document()
                    .schemaType('defaultLineup')
                    .documentId('defaultLineup')
                ),
              S.documentTypeListItem('leagueTable').title('Tabela Ligowa'),
              S.documentTypeListItem('player').title('Wszyscy Zawodnicy (Baza)'),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('🏛️ Club History')
        .child(
          S.document()
            .schemaType('clubHistory')
            .documentId('clubHistory')
        ),
      S.listItem()
        .title('⭐ Hall of Fame')
        .child(
          S.documentList()
            .title('Hall of Fame')
            .filter('_type == "player" && isLegend == true')
        ),
      S.divider(),
      S.listItem()
        .title('👥 Pierwsza Drużyna (Skład)')
        .child(
          S.documentList()
            .title('Pierwsza Drużyna')
            .filter('_type == "player" && team == "first" && (isLegend != true)')
        ),
      S.listItem()
        .title('🎓 Akademia (Skład)')
        .child(
          S.documentList()
            .title('Akademia')
            .filter('_type == "player" && team == "academy"')
        ),
      S.documentTypeListItem('staff').title('🏋️ Sztab Szkoleniowy i Medyczny'),
      S.listItem()
        .title('👔 Zarząd (Board)')
        .child(
          S.documentList()
            .title('Członkowie Zarządu')
            .filter('_type == "staff" && department == "board"')
        ),
      S.divider(),
      S.documentTypeListItem('sponsor').title('🤝 Sponsors & Partners'),
      S.documentTypeListItem('legalPage').title('⚖️ Strony Prawne'),
      S.divider(),
      S.documentTypeListItem('product').title('🛒 Sklep (Produkty)'),
      S.documentTypeListItem('ticket').title('🎟️ Bilety'),
    ])
