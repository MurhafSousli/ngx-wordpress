import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";

import {WpConfig} from "./config.service";
import {WpHelper} from "./helper.service";

/*
 * WpModel Service: Get/Add/Update/Delete single from WP API
 */

@Injectable()
export class WpModel {

  /** The final request URL */
  private actionUrl:string;

  constructor(private http:Http, private config:WpConfig) {
  }

  /** must be set before making a request */
  public setEndpoint(endpoint:string) {
    this.actionUrl = this.config.baseUrl + endpoint;
  }

  public get = (id:number):Observable<Response>  => {
    let h = WpHelper.getHeaders(this.config);
    return this.http.get(this.actionUrl + id, {headers: h}).map(res => res.json());
  }

  public add = (body):Observable<Response>  => {
    let h = WpHelper.getHeaders(this.config);
    return this.http.post(this.actionUrl, body, {headers: h}).map(res =>  res.json());
  }

  public update = (id:number, body):Observable<Response>  => {
    let h = WpHelper.getHeaders(this.config);
    return this.http.put(this.actionUrl + id, body, {headers: h}).map(res => res.json());
  }

  public delete = (id:number):Observable<Response>  => {
    let h = WpHelper.getHeaders(this.config);
    return this.http.delete(this.actionUrl + id + "?force=true", {headers: h});
  }

}

