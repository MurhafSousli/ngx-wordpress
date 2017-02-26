/**
 *  Authentication Service
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthInterface } from './auth.interface';
import { WpEndpoint } from '../../classes/wp-endpoints';
import { WpHttp } from '../../classes/wp-http.class';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService implements AuthInterface {

  constructor(private http: WpHttp, private config: ConfigService) {

  }

  basic(username: string, password: string, remember?: boolean): Observable<any> {

    /** Encode user keys */
    let encodedCred = btoa(username + ':' + password);
    return this.login(encodedCred, 'basic').map(
      (user) => {
        if (user) {
          /** if login success, store key in localStorage */
          if (remember) {
            localStorage.setItem('authKeys', encodedCred);
          }
          else {
            localStorage.removeItem('authKeys');
          }
          return user;
        }
      });
  }

  cookies(): Observable<any> {

    let nonce = window['wpApiSettings'].nonce || undefined;
    if (nonce) {
      return this.login(nonce, 'cookies');
    }
  }

  private login(keys: string, type: string): Observable<any> {

    return this.http.get(WpEndpoint.authentication).map(
      (res) => {
        /** if login fail, send error message */
        if (res && res.message) {
          return Observable.throw(res.messag);
        }
        this.config.setAuth(keys, type);
        return res.json().body;
      });
  }

  logout() {
    this.config.setAuth(undefined, undefined);
  }

}
