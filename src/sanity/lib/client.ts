import {createClient} from 'next-sanity'
import {apiVersion, dataset, projectId, useCdn} from '../env'
import {getLocale} from 'next-intl/server'

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
})

export const client = {
  ...sanityClient,
  fetch: async <R = any>(query: string, params: any = {}, options: any = {}): Promise<R> => {
    let locale = 'pl';
    try {
      locale = await getLocale();
    } catch(e) {
      // Fallback
    }
    
    const i18nTypes = ['post', 'match', 'player', 'siteSettings', 'leagueTable', 'defaultLineup', 'clubArticle', 'clubHistory', 'contact', 'customPage', 'jobOffer', 'legalPage', 'product', 'stadium', 'staff', 'ticket'];
    
    let modifiedQuery = query;
    for (const type of i18nTypes) {
      const regex = new RegExp(`\\*\\[_type\\s*==\\s*["']${type}["']([^\\]]*)\\]`, 'g');
      modifiedQuery = modifiedQuery.replace(regex, (match, rest) => {
        if (rest.includes('language')) return match;
        return `*[_type == "${type}" && language == $__locale${rest}]`;
      });
    }

    let result = await sanityClient.fetch(modifiedQuery, { ...params, __locale: locale }, options);

    const isEmpty = result === null || result === undefined || (Array.isArray(result) && result.length === 0);

    if (locale !== 'pl' && (isEmpty || query.includes('"siteSettings"'))) {
      let fallbackQuery = query;
      for (const type of i18nTypes) {
        const regex = new RegExp(`\\*\\[_type\\s*==\\s*["']${type}["']([^\\]]*)\\]`, 'g');
        fallbackQuery = fallbackQuery.replace(regex, (match, rest) => {
          if (rest.includes('language')) return match;
          return `*[_type == "${type}" && language == 'pl'${rest}]`;
        });
      }
      const plResult = await sanityClient.fetch(fallbackQuery, params, options);

      const mergeIgnoringNulls = (target: any, source: any): any => {
        if (target === null || target === undefined) return source;
        if (source === null || source === undefined) return target;
        if (Array.isArray(target) && Array.isArray(source)) {
          return target.length > 0 ? target : source;
        }
        if (typeof target === 'object' && typeof source === 'object') {
          const merged = { ...source };
          for (const key in target) {
            if (target[key] !== null && target[key] !== undefined) {
              if (typeof target[key] === 'object' && !Array.isArray(target[key])) {
                merged[key] = mergeIgnoringNulls(target[key], source[key]);
              } else {
                merged[key] = target[key];
              }
            }
          }
          return merged;
        }
        return target;
      };

      result = mergeIgnoringNulls(result, plResult);
    }

    return result;
  }
}
