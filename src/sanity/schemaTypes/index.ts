import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './post'
import { matchType } from './match'
import { sponsorType } from './sponsor'
import { playerType } from './player'
import { staffType } from './staff'
import { jobOfferType } from './jobOffer'
import { clubHistoryType } from './clubHistory'
import { clubArticleType } from './clubArticle'
import { leagueTableType } from './leagueTable'
import { siteSettingsType } from './siteSettings'
import { contactType } from './contact'
import { stadiumType } from './stadium'
import { legalPageType } from './legalPage'
import { productType } from './product'
import { ticketType } from './ticket'
import { customPageType } from './customPage'
import { menuItemType } from './menuItem'
import { menuDropdownType } from './menuDropdown'
import { defaultLineupType } from './defaultLineup'
import { lineupPlayerType } from './lineupPlayer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    menuItemType,
    menuDropdownType,
    customPageType,
    postType,
    matchType, 
    sponsorType, 
    playerType,
    staffType,
    jobOfferType,
    clubHistoryType,
    clubArticleType,
    leagueTableType,
    siteSettingsType,
    contactType,
    stadiumType,
    legalPageType,
    productType,
    ticketType,
    defaultLineupType,
    lineupPlayerType,
  ],
}
