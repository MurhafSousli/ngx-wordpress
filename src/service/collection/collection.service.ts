/** Collection Service: request a collection of objects
 * (Posts, Pages, Comments, Media, Custom Endpoint ... etc)
 * */

import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { WpHttp } from '../../classes/wp-http.class';
import { CollectionInterface, CollectionResponse } from './collection.interface';
import { WpPagination } from '../../classes/wp-pagination.class';

@Injectable()
export class CollectionService implements CollectionInterface {

  /** Request Parameter  */
  args;

  /** Collection Pagination Properties */
  pagination: WpPagination;
  items = [];

  constructor(private http: WpHttp, private endpoint: string) {
    this.args = {};
  }

  /**
   * Get the collection
   * @param args
   * @returns {Observable<Any>}
   */
  get(args?): Observable<CollectionResponse> {
    /** reset pagination */
    this.pagination = new WpPagination();
    if (args) {
      this.args = args;
      /** if args.page is provided set the pagination currenPage */
      if (args.page) {
        this.pagination.currentPage = args.page;
      }
    }
    return this.fetch().map((res) => {

      if (res.error) {
        return res;
      }

      this.items = res;
      return {
        data: this.items,
        pagination: this.pagination
      };
    });
  };

  /**
   * Get next page of the collection combined with current collection
   * @returns {any}
   */
  more(): Observable<CollectionResponse> {
    if (this.pagination && this.pagination.hasMore) {
      /** increment currentPage then set page argument */
      this.args.page = ++this.pagination.currentPage;
      return this.fetch().map((res) => {

        if (res.error) {
          return res;
        }

        this.items = this.items.concat(res);
        return {
          data: this.items,
          pagination: this.pagination
        };
      });
    }
    else {
      return Observable.of(null);
    }
  };

  /**
   * Get next page of the collection
   * @returns {any}
   */
  next(): Observable<CollectionResponse> {
    if (this.pagination && this.pagination.hasMore) {
      /** increment currentPage then set page argument */
      this.args.page = ++this.pagination.currentPage;
      return this.fetch().map((res) => {

        if (res.error) {
          return res;
        }

        this.items = res;
        return {
          data: this.items,
          pagination: this.pagination
        };
      });
    }
    else {
      return Observable.of(null);
    }
  };

  /**
   * Get prev page of the collection
   * @returns {any}
   */
  prev(): Observable<CollectionResponse> {
    if (this.pagination && this.pagination.hasPrev) {
      /** decrement currentPage then set page argument */
      this.args.page = --this.pagination.currentPage;
      return this.fetch().map((res) => {

        if (res.error) {
          return res;
        }

        this.items = res;
        return {
          data: this.items,
          pagination: this.pagination
        };
      });
    }
    else {
      return Observable.of(null);
    }
  };

  /**
   * Fires the final request
   * @returns {Observable<any>}
   */
  private fetch(): Observable<any> {

    return this.http.get(this.endpoint, this.args).map(
      (res) => {
        /** Set pagination  */
        this.setPagination(res.headers);
        return res.json();
      }
    ).catch((err) => {
      /** return errors in form of res.error */
      return Observable.of({ error: err });
    });
  };

  /**
   * Set the pagination from collection response headers
   * @param headers
   * @returns {Pagination}
   */
  private setPagination = (headers: Headers): WpPagination => {

    /** Fix issue of different property names in response headers */
    this.pagination.totalPages =
      +headers.get('x-wp-totalpages') || +headers.get('X-WP-TotalPages') || +headers.get('X-Wp-TotalPages')
       || +headers.get('X-Wp-Totalpages') || 0;

    this.pagination.totalObjects =
      +headers.get('x-wp-total') || +headers.get('X-WP-Total') || +headers.get('X-Wp-Total') || 0;

    this.pagination.links = headers.get('Link') || headers.get('link');

    return this.pagination;
  }

}
