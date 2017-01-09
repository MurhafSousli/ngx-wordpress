import {Injectable} from '@angular/core';
import {Http, RequestOptions, RequestOptionsArgs, ConnectionBackend} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {ConfigService} from "../service/config/config.service";
import {WpQueryArgs} from "./wp-query.class";

@Injectable()
export class WpHttp extends Http {

  constructor(backend: ConnectionBackend,
              defaultOptions: RequestOptions,
              private _wpConfig: ConfigService) {
    super(backend, defaultOptions);
  }

  direct(url: string): Observable<any> {

    this.onStart();
    return super.get(url, this.getOptions())
      .timeout(this._wpConfig.timeOut)
      .catch((err) => this.onError(err))
      .finally(() => this.onComplete());
  }

  get(endpoint: any, args?: WpQueryArgs): Observable<any> {

    this.onStart();
    return super.get(this.getUrl(endpoint, args), this.getOptions())
      .timeout(this._wpConfig.timeOut)
      .catch((err) => this.onError(err))
      .finally(() => this.onComplete())
  }

  post(endpoint: any, body: any): Observable<any> {

    this.onStart();
    return super.post(this.getUrl(endpoint), body, this.getOptions())
      .timeout(this._wpConfig.timeOut)
      .catch((err) => this.onError(err))
      .finally(() => this.onComplete());
  }

  put(endpoint: any, body: any): Observable<any> {

    this.onStart();
    return super.put(this.getUrl(endpoint), body, this.getOptions())
      .timeout(this._wpConfig.timeOut)
      .catch((err) => this.onError(err))
      .finally(() => this.onComplete());
  }

  delete(endpoint: any): Observable<any> {

    this.onStart();
    return super.delete(this.getUrl(endpoint), this.getOptions())
      .timeout(this._wpConfig.timeOut)
      .catch((err) => this.onError(err))
      .finally(() => this.onComplete());
  }

  /** Before the request  */
  private onStart() {
    /** set loading to true */
    this._wpConfig.loading.next(true);
  }

  /** Handle errors */
  private onError(err): Observable<any> {
    /** emits and return errors */
    this._wpConfig.errors.next(err);
    return Observable.throw(err);
  }

  /** Request completed */
  private onComplete() {
    /** set loading to false */
    this._wpConfig.loading.next(false);
  }

  /** Get authKeys in headers for all requests */
  private getOptions = (): RequestOptionsArgs => {
    return {headers: this._wpConfig.getAuth()};
  };

  /** Serialize url endpoint and queryArgs */
  private getUrl = (endpoint: string, args?: any): string => {
    let url = this._wpConfig.baseUrl + endpoint;
    if (args) {
      /** add args to url */
      url += '?' + serialize(args);
    }
    return url;
  };

}

let serialize = (obj, prefix?): string => {
  let str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p) && obj[p]) {
      let k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
      encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
};

