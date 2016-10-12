/** Collection Service: request a collection of objects
 * (Posts, Pages, Comments, Media, Custom Endpoint ... etc)
 * */

import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {WpQueryArgs} from "../../helpers/wp-query.class";
import {WpHttp} from "../../helpers/wp-http.class";
import {CollectionInterface} from "./collection.interface";
import {Headers} from '@angular/http';

@Injectable()
export class CollectionService implements CollectionInterface {

  /** Request Parameter  */
  private _args: WpQueryArgs;

  /** Collection Pagination Properties */
  private _pagination: WpPagination;
  private _items = [];

  constructor(private http: WpHttp, private endpoint: string) {
    this._args = new WpQueryArgs({});
  }

  /**
   * Get the collection
   * @param args
   * @returns {Observable<Response>}
   */
  public get = (args?: WpQueryArgs): Observable<any> => {
    /** reset pagination */
    this._pagination = new WpPagination();
    if (args) {
      this._args = args;
      /** if args.page is provided set the pagination currenPage */
      if (args.page) {
        this._pagination.currentPage = args.page;
      }
    }
    return this.fetch().map((res)=> {

      if(res.error){
        return res.error;
      }

      this._items = res;
      return {
        data: this._items,
        pagination: this._pagination
      };
    });
  };

  /**
   * Get next page of the collection combined with current collection
   * @returns {any}
   */
  public more = (): Observable<any> => {
    if (this._pagination && this._pagination.hasMore) {
      /** increment currentPage then set page argument */
      this._args.page = ++this._pagination.currentPage;
      return this.fetch().map((res)=> {
      
        if(res.error){
          return res.error;
        }

        this._items = this._items.concat(res);
        return {
          data: this._items,
          pagination: this._pagination
        };
      });
    }
    else {
      return Observable.empty();
    }
  };

  /**
   * Get next page of the collection
   * @returns {any}
   */
  public next = (): Observable<any> => {
    if (this._pagination && this._pagination.hasMore) {
      /** increment currentPage then set page argument */
      this._args.page = ++this._pagination.currentPage;
      return this.fetch().map((res)=> {

        if(res.error){
          return res.error;
        }

        this._items = res;
        return {
          data: this._items,
          pagination: this._pagination
        };
      });
    }
    else {
      return Observable.empty();
    }
  };

  /**
   * Get prev page of the collection
   * @returns {any}
   */
  public prev = (): Observable<any> => {
    if (this._pagination && this._pagination.hasPrev) {
      /** decrement currentPage then set page argument */
      this._args.page = --this._pagination.currentPage;
      return this.fetch().map((res)=> {

        if(res.error){
          return res.error;
        }

        this._items = res;
        return {
          data: this._items,
          pagination: this._pagination
        };
      });
    }
    else {
      return Observable.empty();
    }
  };

  /**
   * Fires the final request
   * @returns {Observable<any>}
   */
  private fetch = (): Observable<any> => {

    return this.http.get(this.endpoint, this._args).map(
      (res) => {
        /** Set pagination  */
        this.setPagination(res.headers);
        return res.json();
      }
    ).catch((err) => {
      /** return errors in form of res.error */
      return Observable.of({error: err});
    });
  };

  /**
   * Set the pagination from collection response headers
   * @param headers
   * @returns {Pagination}
   */
  private setPagination = (headers: Headers): WpPagination => {

    /** Fix issue of different property names in response headers */
    this._pagination.totalPages =
      +headers.get('X-WP-TotalPages') || +headers.get('X-Wp-TotalPages') || +headers.get('X-Wp-Totalpages') || 0;

    this._pagination.totalObjects =
      +headers.get('X-WP-Total') || +headers.get('X-Wp-Total') || 0;

    this._pagination.links = headers.get('Link');

    return this._pagination;
  }

}

/**
 * Pagination class holds the current collection response pagination and links
 */
export class WpPagination {
  /** Pagination holds the navigation data and links provided from WP API response header*/
  constructor(public currentPage: number = 1,
              public totalPages: number = 0,
              public totalObjects: number = 0,
              public links?: any) {

  }

  get hasMore(): boolean {
    return this.currentPage < this.totalPages;
  }
  get hasPrev(): boolean{
    return this.currentPage > 1;
  }
}
