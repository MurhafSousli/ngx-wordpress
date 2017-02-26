import {Injectable, Optional} from '@angular/core';
import {Headers} from "@angular/http";

import {ConfigInterface} from './config.interface';

@Injectable()
export class ConfigService implements ConfigInterface {

  baseUrl: string;
  debug: boolean;
  private authType: string;
  private authKeys: string;

  constructor(@Optional() baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /** Get authentication key for HTTP Headers {cookies | basic auth} */
  getAuth(): Headers {
    if (this.authKeys) {
      if (this.authKeys.toLowerCase() === 'cookies') {
        return cookiesHeaders(this.authKeys);
      }
      if (this.authKeys.toLowerCase() === 'basic') {
        return basicHeaders(this.authKeys);
      }
    }
    return undefined;
  }

  setAuth(keys: string, type: string) {
    this.authKeys = keys;
    this.authType = type;
  }

}

function basicHeaders(keys: string): Headers {
  let headers = new Headers();
  if (keys) {
    headers.append('Authorization', 'Basic ' + keys);
  }
  return headers;
}

function cookiesHeaders(keys: string): Headers {
  let headers = new Headers();
  if (keys) {
    headers.append('X-WP-Nonce', keys);
  }
  return headers;
}

