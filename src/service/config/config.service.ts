import {Injectable} from '@angular/core';
import {Headers} from "@angular/http";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {ConfigInterface} from './config.interface';

@Injectable()
export class ConfigService implements ConfigInterface {

  /** base URL */
  baseUrl: string;
  /** request timeout */
  timeOut: number = 5000;

  /** Subscribe to `loading` to get notified when the service is busy. */
  loading: BehaviorSubject<boolean>;

  /** Subscribe to `logs` to get notified whenever an error occurs. */
  errors: BehaviorSubject<any>;

  private _authType: AuthType;
  private _authKeys: string;

  constructor() {
    this.loading = new BehaviorSubject<boolean>(false);
    this.errors = new BehaviorSubject<any>(null);
  }

  getAuth(): Headers {
    switch (this._authType) {
      case AuthType.basic:
        return basicHeaders(this._authKeys);
      case AuthType.cookies:
        return cookiesHeaders(this._authKeys);
      default:
        return undefined;
    }
  }

  setAuth(keys: string, type: AuthType){
    this._authKeys = keys;
    this._authType = type;
  }

}


export enum AuthType{
  basic,
  cookies
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

