import { isPlatformBrowser } from '@angular/common';
import { WpConfig } from '../interfaces';
import { mapAuthor, mapCategories, mapFeaturedMedia, mapRemoveLinks, mapRendered, mapTags } from './filters';

export const getDefaultWpConfig = (platform: Object): WpConfig => {
  return {
    restUrl: '/wp-json/wp/v2/',
    authUrl: '/wp-json/jwt-auth/v1/',
    filters: {
      posts: {
        title: [mapRendered],
        content: [mapRendered],
        excerpt: [mapRendered, mapRemoveLinks],
        categories: [mapCategories],
        tags: [mapTags],
        author: [mapAuthor],
        featured_media: [mapFeaturedMedia]
      }
    },
    jwtOptions: {
      tokenGetter: () => isPlatformBrowser(platform) ? localStorage.getItem('token') : null,
      tokenSetter: (token: string) => isPlatformBrowser(platform) ? localStorage.setItem('token', token) : null,
      tokenRemover: () => isPlatformBrowser(platform) ? localStorage.removeItem('token') : null
    }
  };
};

/**
 * Simple object check.
 */
function isObject(item): boolean {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) {
    return target;
  }
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, {[key]: {}});
        }
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {[key]: source[key]});
      }
    }
  }

  return mergeDeep(target, ...sources);
}

/**
 * Serialize WpCollection query
 */
export const serializeQuery = (obj: any, prefix?: string): string => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p) && obj[p]) {
      const k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
      str.push(typeof v === 'object' ?
        serializeQuery(v, k) :
        encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }
  return str.join('&');
};
