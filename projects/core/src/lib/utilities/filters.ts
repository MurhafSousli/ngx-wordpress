import { from, of, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { WpPost, WpObjectFilter, WpPropertyFilter, WpTerm, WpUser, WpFilterRes } from '../interfaces';

/**
 * Filter WordPress model
 */
export function filterModel(obj: any, filters: WpObjectFilter): Observable<any> {
  // Loop over object filters
  return from(Object.keys(filters)).pipe(
    mergeMap((key: string) => filterProperty(key, obj, filters[key]))
  );
}

/**
 * Filter WordPress model property
 */
export function filterProperty(key: string, obj: any, filters: WpPropertyFilter): Observable<any> {
  // Loop over property filters
  return of({key: key, value: obj}).pipe(
    ...filters,
    map((res: WpFilterRes<any>) => {
      obj[key] = res.value;
      return obj;
    })
  );
}

/**
 * Flatten post property by setting it to its rendered property
 */
export const mapRendered = map(({key, value}: WpFilterRes<WpPost>): WpFilterRes<string> => {
  return {
    key,
    value: value[key].rendered
  };
});

/**
 * Remove links from text
 */
export const mapRemoveLinks = map(({key, value}: WpFilterRes<string>): WpFilterRes<string> => {
  return {
    key,
    value: value.replace(/<a\b[^>]*>(.*?)<\/a>/i, '')
  };
});

/**
 * Return post categories
 */
export const mapCategories = map(({key, value}: WpFilterRes<WpPost>): WpFilterRes<WpTerm[] | number[]> => {
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
export const mapTags = map(({key, value}: WpFilterRes<WpPost>): WpFilterRes<WpTerm[] | number[]> => {
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
export const mapAuthor = map(({key, value}: WpFilterRes<WpPost>): WpFilterRes<WpUser | number> => {
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
export const mapFeaturedMedia = map(({key, value}: WpFilterRes<WpPost>): WpFilterRes<any> => {
  return {
    key,
    value: (value.featured_media && value._embedded && value._embedded['wp:featuredmedia'][0])
      ? value._embedded['wp:featuredmedia'][0]
      : value.featured_media
  };
});
