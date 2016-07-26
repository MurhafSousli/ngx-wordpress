import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import * as Rx from 'rxjs/Rx';

import {WpState} from "../state/state.service";

/*
 * WpCollection Service: Get collection from WP API
 * 
 * In this class each function represent default endpoint and returns the CollectionService.
 * 
 */

@Injectable()
export class WpCollection {

  public service;

  constructor(private http: Http, private state: WpState) { }

  Endpoint(endpoint: string): CollectionService {
    if (!this.service) {
      this.service = new CollectionService(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Posts(): CollectionService {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/posts/';
      this.service = new CollectionService(this.http, this.state, endpoint);
    }
    return this.service;
  }
  Users(): CollectionService {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/users/';
      this.service = new CollectionService(this.http, this.state, endpoint);
    }
    return this.service;
  }
  Categories(): CollectionService {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/categories/';
      this.service = new CollectionService(this.http, this.state, endpoint);
    }
    return this.service;
  }
  Pages(): CollectionService {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/pages/';
      this.service = new CollectionService(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Tags(): CollectionService {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/tags/';
      this.service = new CollectionService(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Comments(): CollectionService {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/comments/';
      this.service = new CollectionService(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Media(): CollectionService {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/media/';
      this.service = new CollectionService(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Taxonomies(): CollectionService {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/taxonomies/';
      this.service = new CollectionService(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Statuses(): CollectionService {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/statuses/';
      this.service = new CollectionService(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Types(): CollectionService {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/types/'
      this.service = new CollectionService(this.http, this.state, endpoint);
    }
    return this.service;
  }
}

export class CollectionService {

  /** collection pagination properties */
  public currentPage: number = 1;
  public totalPages: number = 1;
  public totalObjects: number = 0;

  /** WP query args */
  private args: any;

  constructor(
    private http: Http,
    private state: WpState,
    private endpoint: string) {
  }

  /*
   * get() : get collection
   */

  public get = (args?: any): Observable<any> => {
    this.args = args;
    return this.fetch();
  }

  /*
   * more() : get the next page if available
   */

  public more = (): Observable<any> => {
    if (this.hasMore()) {
      /** increment currentPage then set page argument */
      this.args.page = ++this.currentPage;
      return this.fetch();
    }
    else {
      return Rx.Observable.empty();
    }
  }

  /*
   *  hasMore() : check if the next page available
   */

  public hasMore = (): boolean => {
    return this.currentPage < this.totalPages;
  }

  /*
   * fetch() : request the final url
   */

  private fetch = (): Observable<any> => {
    return this.http.get(this.state.generateUrl(this.endpoint, this.args), this.state.getOptions()).map(
      (res) => {
        /** set totalObject and totalPages from response's headers */
        this.totalObjects = +res.headers.get('X-WP-Total');
        this.totalPages = +res.headers.get('X-WP-TotalPages');
        return res.json();
      }
    );
  }

}

/*
 * PS: Handle request errors from "subscribe" function
 */
