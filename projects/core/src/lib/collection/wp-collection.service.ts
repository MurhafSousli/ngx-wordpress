import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { serializeQuery } from '../utilities';
import { WpCollectionState, WpQuery } from './wp-collection.interface';

@Injectable({
  providedIn: 'root'
})
export class WpCollectionService {

  constructor(private http: HttpClient) {
  }

  /**
   * Fetch data from wp api
   */
  get(endpoint: string, query: WpQuery): Observable<WpCollectionState> {
    const url = endpoint + '?' + serializeQuery(query);
    return this.http.get(url, {observe: 'response'}).pipe(
      map((res: HttpResponse<any>) => this._onPaginate(res, query.page))
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
