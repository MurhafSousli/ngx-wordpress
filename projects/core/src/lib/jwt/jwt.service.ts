import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { JwtConfig } from './jwt.interface';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  /**
   * Stream that emits JWT config
   */
  private _config = new BehaviorSubject<JwtConfig>({});
  config: Observable<JwtConfig> = this._config.asObservable();

  /**
   * Get the tokenGetter function from JWT config
   */
  get tokenGetter(): Observable<string | null> {
    const token = this._config.value.tokenGetter();
    return token
      ? (token instanceof Promise) ? from(token) : token
      : of(null);
  }

  /**
   * Set JWT config
   */
  setConfig(config: JwtConfig) {
    this._config.next({...this._config.value, ...config});
  }

  urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: {
        break;
      }
      case 2: {
        output += '==';
        break;
      }
      case 3: {
        output += '=';
        break;
      }
      default: {
        throw new Error('Illegal base64url string!');
      }
    }
    return this.b64DecodeUnicode(output);
  }

  private b64decode(str: string): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';

    str = String(str).replace(/=+$/, '');

    if (str.length % 4 === 1) {
      throw new Error('\'atob\' failed: The string to be decoded is not correctly encoded.');
    }

    for (let bc = 0, bs: any, buffer: any, idx = 0;
         (buffer = str.charAt(idx++));
         ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
           ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
           : 0
    ) {
      buffer = chars.indexOf(buffer);
    }
    return output;
  }

  private b64DecodeUnicode(str: any) {
    return decodeURIComponent(
      Array.prototype.map
        .call(this.b64decode(str), (c: any) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  }

  decodeToken(tokenValue?: string): Observable<any> {
    return of({}).pipe(
      switchMap(() => tokenValue ? of(tokenValue) : this.tokenGetter),
      map((token: string) => {
        if (token === null) {
          return null;
        }

        const parts = token.split('.');

        if (parts.length !== 3) {
          throw new Error('The inspected token doesn\'t appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.');
        }

        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
          throw new Error('Cannot decode the token.');
        }

        return JSON.parse(decoded);
      })
    );
  }

  getTokenExpirationDate(tokenValue?: string): Observable<Date | null> {
    return of({}).pipe(
      switchMap(() => tokenValue ? of(tokenValue) : this.tokenGetter),
      map((token: string) => {
        let decoded: any;
        decoded = this.decodeToken(token);

        if (!decoded.hasOwnProperty('exp')) {
          return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);

        return date;
      })
    );
  }

  isTokenExpired(tokenValue?: string, offsetSeconds?: number): Observable<boolean> {
    return of({}).pipe(
      switchMap(() => tokenValue ? of(tokenValue) : this.tokenGetter),
      map((token: string) => {
        if (token === null || token === '') {
          return true;
        }
        const date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;

        if (date === null) {
          return true;
        }
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
      })
    );
  }
}
