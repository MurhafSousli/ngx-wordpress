import { from, of, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Post, WpObjectFilter, WpPropertyFilter, WpTerm, WpUser } from '../interfaces';

export interface DataFilter<T> {
  key?: string;
  value: T;
}

export function filterModel(obj: any, filters: WpObjectFilter): Observable<any> {
  // Loop over object filters
  return from(Object.keys(filters)).pipe(
    mergeMap((key: string) => filterProperty(key, obj, filters[key]))
  );
}

export function filterProperty(key: string, obj: any, filters: WpPropertyFilter): Observable<any> {
  // Loop over property filters
  return of({key: key, value: obj}).pipe(
    ...filters,
    map((res: DataFilter<any>) => {
      obj[key] = res.value;
      return obj;
    })
  );
}

/**
 * Flatten post property by setting it to its rendered property
 */
export const mapRendered = map(({key, value}: DataFilter<Post>): DataFilter<string> => {
  return {
    key,
    value: value[key].rendered
  };
});

/**
 * Remove links from text
 */
export const mapRemoveLinks = map(({key, value}: DataFilter<string>): DataFilter<string> => {
  return {
    key,
    value: value.replace(/<a\b[^>]*>(.*?)<\/a>/i, '')
  };
});

/**
 * Return post categories
 */
export const mapCategories = map(({key, value}: DataFilter<Post>): DataFilter<WpTerm[] | number[]> => {
  return {
    key,
    value: (value._embedded && value._embedded['wp:term'])
      ? value._embedded['wp:term'][0]
      : value.categories
  };
});

/**
 * Return post tags
 */
export const mapTags = map(({key, value}: DataFilter<Post>): DataFilter<WpTerm[] | number[]> => {
  return {
    key,
    value: (value._embedded && value._embedded['wp:term'])
      ? value._embedded['wp:term'][1]
      : value.tags
  };
});

/**
 * Return post author
 */
export const mapAuthor = map(({key, value}: DataFilter<Post>): DataFilter<WpUser | number> => {
  return {
    key,
    value: value._embedded
      ? value._embedded.author[0]
      : value.author
  };
});

/**
 * Return post featured image
 */
export const mapFeaturedMedia = map(({key, value}: DataFilter<Post>): DataFilter<any> => {
  return {
    key,
    value: (value.featured_media && value._embedded && value._embedded['wp:featuredmedia'][0])
      ? value._embedded['wp:featuredmedia'][0]
      : value.featured_media
  };
});
