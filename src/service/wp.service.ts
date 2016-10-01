/** WpService: the entry service
 *
 *  This service is the gateway to Collection/Model services, as well as direct links
 *  by @MurhafSousli
 */

import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

import {WpInterface} from "./wp.interface";
import {WpHttp} from "../helpers/wp-http.class";
import {EndpointService} from "./endpoint/endpoint.service";
import {ConfigService} from "./config/config.service";
import {AuthService} from "./authentication/auth.service";
import {WpEndpoint} from '../helpers/wp-endpoints';

@Injectable()
export class WpService implements WpInterface {

  constructor(private _http: WpHttp, public config: ConfigService) {

  }

  /**
   * Discover WP API
   * @param url
   * @returns {any}
   */
  discover(url: string): Observable<any> {
    return this._http.direct(url + WpEndpoint.discover).map((res)=> {
      if (res) {
        /** discovery success */
        this.config.baseUrl = url;
        return res.json();
      }
    });
  }
  /**
   * Direct Link
   * @param url
   * @returns {any}
   */
  link(url: string): Observable<any> {
    return this._http.direct(url).map((res)=> {
      return res.json();
    });
  }
  /**
   * Collection Service
   * @returns {EndpointService}
   */
  collection(): EndpointService {
    return new EndpointService(this._http, 'collection');
  }
  /**
   * Model Service
   * @returns {EndpointService}
   */
  model(): EndpointService {
    return new EndpointService(this._http, 'model');
  }
  /**
   * Authenticate Service
   * @returns {AuthService}
   */
  auth(): AuthService{
    return new AuthService(this._http, this.config);
  }
}
