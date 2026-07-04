import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3kzdw0qu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  schema,
  plugins: [
    structureTool({structure}),
    documentInternationalization({
      supportedLanguages: [
        {id: 'pl', title: 'Polski'},
        {id: 'en', title: 'English'}
      ],
      schemaTypes: [
        'post', 'match', 'player', 'siteSettings', 'leagueTable', 
        'defaultLineup', 'clubArticle', 'clubHistory', 
        'contact', 'customPage', 'jobOffer', 'legalPage', 
        'product', 'stadium', 'staff', 'ticket'
      ]
    })
  ],
})
