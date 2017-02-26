import { Injectable, Optional } from '@angular/core';
import { Headers } from '@angular/http';

import { ConfigInterface } from './config.interface';
import { Helper } from '../../classes/helper.functions';

@Injectable()
export class ConfigService implements ConfigInterface {

  baseUrl: string;
  debug: boolean;
  private authType: string;
  private authKeys: string;

  constructor( @Optional() baseUrl: string) {
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
    return undefined;
  }

  setAuth(keys: string, type: string) {
    this.authKeys = keys;
    this.authType = type;
  }

}


