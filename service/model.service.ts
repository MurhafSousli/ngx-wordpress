import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";

import {WpConfig} from "./config.service";
import {WpHelper} from "./helper.service";

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

  public getSingle = (id):Observable<any>  => {
    return this.http.get(this.actionUrl + id, {headers: WpHelper.getHeaders(this.config)}).map(res => res.json());
  }

  public add = (body):Observable<any>  => {
    return this.http.post(this.actionUrl, body, {headers: WpHelper.getHeaders(this.config)}).map(res =>  res.json());
  }

  public update = (id:number, body):Observable<any>  => {
    return this.http.put(this.actionUrl + id, body, {headers: WpHelper.getHeaders(this.config)}).map(res => res.json());
  }

  public delete = (id:number):Observable<any>  => {
    return this.http.delete(this.actionUrl + id + "?force=true", {headers: WpHelper.getHeaders(this.config)});
  }

}

