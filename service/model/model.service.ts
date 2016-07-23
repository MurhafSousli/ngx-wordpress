import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";

import {WpState} from "../state/state.service";

/*
 * WpModel Service: Get/Add/Update/Delete single from WP API
 */

@Injectable()
export class WpModel {

  private service;

  constructor(private http: Http, private state: WpState) { }

  Endpoint(endpoint: string) {
    if (!this.service) {
      this.service = new Model(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Posts(): Model {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/posts/';
      this.service = new Model(this.http, this.state, endpoint);
    }
    return this.service;
  }
  Users(): Model {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/users/';
      this.service = new Model(this.http, this.state, endpoint);
    }
    return this.service;
  }
  Categories(): Model {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/categories/';
      this.service = new Model(this.http, this.state, endpoint);
    }
    return this.service;
  }
  Pages(): Model {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/pages/';
      this.service = new Model(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Tags(): Model {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/tags/';
      this.service = new Model(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Comments(): Model {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/comments/';
      this.service = new Model(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Media(): Model {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/media/';
      this.service = new Model(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Taxonomies(): Model {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/taxonomies/';
      this.service = new Model(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Statuses(): Model {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/statuses/';
      this.service = new Model(this.http, this.state, endpoint);
    }
    return this.service;
  }

  Types(): Model {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/types/'
      this.service = new Model(this.http, this.state, endpoint);
    }
    return this.service;
  }

}

export class Model {

  constructor(
    private http: Http,
    private state: WpState, 
    private endpoint: string) {
  }

  public get = (id, args?): Observable<Response> => {

    return this.http.get(
      this.state.generateUrl(this.endpoint + id, args),
      this.state.getOptions()).map(res => res.json());
  }

  public add = (body): Observable<Response> => {

    return this.http.post(
      this.state.generateUrl(this.endpoint),
      body,
      this.state.getOptions()).map(res => res.json());
  }

  public update = (id, body): Observable<Response> => {

    return this.http.put(
      this.state.generateUrl(this.endpoint + id),
      body,
      this.state.getOptions()).map(res => res.json());
  }

  public delete = (id): Observable<Response> => {

    return this.http.delete(
      this.state.generateUrl(this.endpoint + id + "?force=true"),
      this.state.getOptions()).map(res => res.json());
  }

}

