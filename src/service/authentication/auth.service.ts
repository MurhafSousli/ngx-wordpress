/**
 *  Authentication Service
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {AuthInterface} from "./auth.interface";
import {ConfigService, AuthType} from "../config/config.service";
import {WpEndpoint} from '../../helpers/wp-endpoints';
import {WpHttp} from "../../helpers/wp-http.class";

@Injectable()
export class AuthService implements AuthInterface {

  constructor(private _http: WpHttp, private _config: ConfigService) {

  }

  basic(username: string, password: string, remember?: boolean): Observable<any> {

    /** Encode user keys */
    let encodedCred = btoa(username + ':' + password);
    return this.login(encodedCred, AuthType.basic).map(
      (user)=> {
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
      return this.login(nonce, AuthType.cookies);
    }
  }

  private login(keys: string, type: AuthType): Observable<any> {

    this._config.setAuth(keys, type);

    return this._http.get(WpEndpoint.authentication).map(
      (res)=> {
        /** if login fail, send error message */
        if (res && res.message) {
          this._config.errors.next(res.message);
          return undefined;
        }
        else {
          this._config.setAuth(keys, type);
          return res.json().body;
        }
      });
  }

  logout() {
    this._config.setAuth(undefined, undefined);
  }

}



