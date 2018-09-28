import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WpCollectionState } from './wp-collection.interface';

@Injectable({
  providedIn: 'root'
})
export class WpCollectionClient {

  constructor(private http: HttpClient) {
  }

  /**
   * Fetch data from wp api
   */
  get(endpoint, args): Observable<WpCollectionState> {
    const url = endpoint + '?' + serialize(args);
    return this.http.get(url, {observe: 'response'}).pipe(
      map((res: HttpResponse<any>) => this._onPaginate(res, args.page))
    );
  }

  /**
   * Get pagination data from response headers
   */
  private _onPaginate(res: HttpResponse<any>, currentPage: number): WpCollectionState {

    /** convert headers props keys to lower case keys */
    const headers: any = res.headers.keys().reduce((c, k) => (c[k.toLowerCase()] = res.headers.get(k), c), {});

    const totalPages = +headers['x-wp-totalpages'];
    const totalObjects = +headers['x-wp-total'];
    return {
      data: res.body,
      pagination: {
        currentPage,
        totalPages,
        totalObjects,
        hasPrev: currentPage > 1,
        hasMore: currentPage < totalPages
      }
    };
  }
}

/** Serialize query arguments */
export const serialize = (obj, prefix?): string => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p) && obj[p]) {
      const k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
      str.push(typeof v === 'object' ?
        serialize(v, k) :
        encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }
  return str.join('&');
};
