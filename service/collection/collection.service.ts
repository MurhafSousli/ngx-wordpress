import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";

import {WpState} from "../state/state.service";

/*
 * WpCollection Service: Get collection from WP API
 */

@Injectable()
export class WpCollection {

  private service;

  constructor(private http: Http, private state: WpState) { }

  Endpoint(endpoint: string): Collection {
    if (!this.service) {
      this.service = new Collection(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Posts(): Collection {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/posts/';
      this.service = new Collection(this.http, this.state, endpoint);
    }
    return this.service;
  }
  Users(): Collection {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/users/';
      this.service = new Collection(this.http, this.state, endpoint);
    }
    return this.service;
  }
  Categories(): Collection {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/categories/';
      this.service = new Collection(this.http, this.state, endpoint);
    }
    return this.service;
  }
  Pages(): Collection {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/pages/';
      this.service = new Collection(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Tags(): Collection {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/tags/';
      this.service = new Collection(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Comments(): Collection {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/comments/';
      this.service = new Collection(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Media(): Collection {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/media/';
      this.service = new Collection(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Taxonomies(): Collection {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/taxonomies/';
      this.service = new Collection(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Statuses(): Collection {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/statuses/';
      this.service = new Collection(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Types(): Collection {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/types/'
      this.service = new Collection(this.http, this.state, endpoint);
    }
    return this.service;
  }
}

export class Collection {

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

  public get = (args?: any): Observable<Response> => {
    this.args = args;
    return this.fetch();
  }

  /*
   * more() : get the next page if available
   */

  public more = (): Observable<Response> => {
    if (this.hasMore()) {
      /** increment currentPage then set page argument */
      this.args.page = ++this.currentPage;
      return this.fetch();
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

  private fetch = (): Observable<Response> => {

    return this.http.get(this.state.generateUrl(this.endpoint, this.args), this.state.getOptions()).map(
      res => {
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
