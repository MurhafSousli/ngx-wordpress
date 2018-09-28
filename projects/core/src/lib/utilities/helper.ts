import { isPlatformBrowser } from '@angular/common';
import { Post } from '../interfaces';

export const getDefaultWpConfig = (platform: Object) => {
  return {
    restUrl: '/wp-json/wp/v2/',
    authUrl: '/wp-json/jwt-auth/v1/',
    postFilters: {
      title: mapRendered,
      content: mapRendered,
      excerpt: mapRendered,
      categories: mapCategories,
      tags: mapTags,
      author: mapAuthor,
      featuredMedia: mapFeaturedMedia
    },
    jwtOptions: {
      tokenGetter: () => isPlatformBrowser(platform) ? localStorage.getItem('token') : null,
      tokenSetter: (token: string) => isPlatformBrowser(platform) ? localStorage.setItem('token', token) : null,
      tokenRemover: () => isPlatformBrowser(platform) ? localStorage.removeItem('token') : null
    }
  };
};

export const mapRendered = (post: Post, key: string) => post[key].rendered;
// .replace(/<a\b[^>]*>(.*?)<\/a>/i, '')

export const mapCategories = (post: Post) => (post._embedded && post._embedded['wp:term'])
  ? post._embedded['wp:term'][0]
  : post.categories;

export const mapTags = (post: Post) => (post._embedded && post._embedded['wp:term'])
  ? post._embedded['wp:term'][1]
  : post.tags;

export const mapAuthor = (post: Post) => post._embedded
  ? post._embedded.author
  : post.author;

export const mapFeaturedMedia = (post: Post) => (post.featured_media && post._embedded && post._embedded['wp:featuredmedia'][0])
  ? post._embedded['wp:featuredmedia'][0]
  : post.featured_media;


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
