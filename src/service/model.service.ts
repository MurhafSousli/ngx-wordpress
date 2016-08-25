import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";

import {WpState} from "./state.service";

/*
 * WpModel Service: Get/Add/Update/Delete single from WP API
 */

@Injectable()
export class WpModel {

  public service:any;

  constructor(private http:Http, private state:WpState) {
  }

  public Endpoint = (endpoint:string):ModelService=> {
    if (!this.service) {
      this.service = new ModelService(this.http, this.state, endpoint);
    }
    return this.service;
  }

  public Posts = ():ModelService => {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/posts/';
      this.service = new ModelService(this.http, this.state, endpoint);
    }
    return this.service;
  }
  public Users = ():ModelService=> {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/users/';
      this.service = new ModelService(this.http, this.state, endpoint);
    }
    return this.service;
  }
  public Categories = ():ModelService => {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/categories/';
      this.service = new ModelService(this.http, this.state, endpoint);
    }
    return this.service;
  }
  public Pages = ():ModelService=> {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/pages/';
      this.service = new ModelService(this.http, this.state, endpoint);
    }
    return this.service;
  }

  public Tags = ():ModelService=> {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/tags/';
      this.service = new ModelService(this.http, this.state, endpoint);
    }
    return this.service;
  }

  public Comments = ():ModelService=> {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/comments/';
      this.service = new ModelService(this.http, this.state, endpoint);
    }
    return this.service;
  }

  public Media = ():ModelService=> {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/media/';
      this.service = new ModelService(this.http, this.state, endpoint);
    }
    return this.service;
  }

  public Taxonomies = ():ModelService => {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/taxonomies/';
      this.service = new ModelService(this.http, this.state, endpoint);
    }
    return this.service;
  }

  public Statuses = ():ModelService=> {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/statuses/';
      this.service = new ModelService(this.http, this.state, endpoint);
    }
    return this.service;
  }

  public Types = ():ModelService=> {
    if (!this.service) {
      let endpoint = '/wp-json/wp/v2/types/'
      this.service = new ModelService(this.http, this.state, endpoint);
    }
    return this.service;
  }

}

export class ModelService {

  constructor(private http:Http,
              private state:WpState,
              private endpoint:string) {
  }

  public get = (id, args?):Observable<any> => {

    return this.http.get(
      this.state.generateUrl(this.endpoint + id, args),
      this.state.getOptions()).map(res => res.json());
  }

  public add = (body):Observable<any> => {

    return this.http.post(
      this.state.generateUrl(this.endpoint),
      body,
      this.state.getOptions()).map(res => res.json());
  }

  public update = (id, body):Observable<any> => {

    return this.http.put(
      this.state.generateUrl(this.endpoint + id),
      body,
      this.state.getOptions()).map(res => res.json());
  }

  public delete = (id):Observable<any> => {

    return this.http.delete(
      this.state.generateUrl(this.endpoint + id + "?force=true"),
      this.state.getOptions()).map(res => res.json());
  }

}

