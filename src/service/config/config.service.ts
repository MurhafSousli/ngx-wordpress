import { Injectable, Optional } from '@angular/core';
import { Headers } from '@angular/http';

import { ConfigInterface } from './config.interface';
import { Helper } from '../../classes/helper.functions';

@Injectable()
export class ConfigService implements ConfigInterface {

  /** BaseUrl text e.g 'https://example.com */
  baseUrl: string;
  /** Domain text e.g 'example.com' (useful for photon feature) */
  domain: string;
  /** Log all http requests to console */
  debug: boolean;
  /** Photon registered queries */
  photonQueries = {};

  private authType: string;
  private authKeys: string;

  constructor(@Optional() baseUrl: string) {
    this.domain = Helper.domain(baseUrl);
    this.baseUrl = baseUrl;
  }

  /** Get authentication key for HTTP Headers {cookies | basic auth} */
  getAuth(): Headers {
    if (this.authKeys) {
      if (this.authKeys.toLowerCase() === 'cookies') {
        return Helper.cookiesHeaders(this.authKeys);
      }
      if (this.authKeys.toLowerCase() === 'basic') {
        return Helper.basicHeaders(this.authKeys);
      }
    }
  }

  setAuth(keys: string, type: string) {
    this.authKeys = keys;
    this.authType = type;
  }
  
  /** Register Photon queries */
  setPhotonQuery(queryName: string, queryArgs){
    this.photonQueries[queryName] = Helper.serialize(queryArgs);
  }

}


