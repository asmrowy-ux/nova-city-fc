import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './post'
import { matchType } from './match'
import { playerType } from './player'
import { staffType } from './staff'
import { sponsorType } from './sponsor'
import { leagueTableType } from './leagueTable'
import { siteSettingsType } from './siteSettings'
import { clubHistoryType } from './clubHistory'
import { clubArticleType } from './clubArticle'
import { stadiumType } from './stadium'
import { contactType } from './contact'
import { jobOfferType } from './jobOffer'
import { legalPageType } from './legalPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    postType,
    matchType,
    playerType,
    staffType,
    sponsorType,
    leagueTableType,
    siteSettingsType,
    clubHistoryType,
    clubArticleType,
    stadiumType,
    contactType,
    jobOfferType,
    legalPageType,
  ],
}
