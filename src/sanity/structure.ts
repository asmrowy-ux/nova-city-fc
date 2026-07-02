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
      S.documentTypeListItem('post').title('📰 News Articles'),
      S.documentTypeListItem('match').title('⚽ Matches & Results'),
      S.documentTypeListItem('leagueTable').title('📊 League Table'),
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
        .title('👥 First Team Roster')
        .child(
          S.documentList()
            .title('First Team Roster')
            .filter('_type == "player" && (isLegend != true)')
        ),
      S.documentTypeListItem('staff').title('🏋️ Coaching Staff'),
      S.divider(),
      S.documentTypeListItem('sponsor').title('🤝 Sponsors & Partners'),
    ])
