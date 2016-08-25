import {Injectable} from '@angular/core';

import {WpHelper} from './helper.service';

/*
 * WpConfig: a service to get and set WP properties
 * Use in app component to set the API base address
 * inject the service in app bootstrap
 */

@Injectable()
export class WpState {

  private baseUrl:string;
  private authKeys:string;

  constructor() {
  }

  /** functions to use in components */
  public getBaseUrl = ():string => {
    return this.baseUrl;
  }
  public setBaseUrl = (url:string):void => {
    this.baseUrl = url;
  }

  public setAuthKeys = (username:string, password:string):void => {
    this.authKeys = WpHelper.encodeKeys(username, password);
  }
  public getAuthKeys = ():string => {
    return this.authKeys;
  }

  /** Those function are used within the library */
  public getOptions = ():any => {
    return {headers: WpHelper.getHeaders(this.authKeys)};
  }
  public generateUrl = (endpoint:string, args?:any):string => {
    return WpHelper.generateUrl(this.baseUrl, endpoint, args);
  }

}
