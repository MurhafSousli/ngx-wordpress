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
  /** Photon registered query argyments */
  photonArgs = {};

  private authType: string;
  private authKeys: string;

  constructor( @Optional() baseUrl: string, @Optional() photonOptions: any, @Optional() debug: boolean) {

    if (!baseUrl) {
      throw new Error(`[WordPressModule]: Please enter your WordPress base URL e.g.[WordPressModule.forRoot('http:example.com')]`);
    }
    else {
      /** Set WordPress baseUrl and Domain */
      this.domain = Helper.domain(baseUrl);
      this.baseUrl = baseUrl;
      /** Debug mode */
      if (debug) {
        console.log('[WordPressModule]: debugging mode.');
        this.debug = debug;
      }
      /** Register Photon options */
      if (this.photonArgs) {
        photonOptions.map((option) => {
          this.photonArgs[option.key] = Helper.serialize(option.value);
        });
        if (this.debug) {
          console.log('[WordPressModule]: Photon has been set.');
        }
      }
    }
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


}
