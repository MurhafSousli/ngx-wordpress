import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { parse } from 'url';
import { JwtService } from './jwt.service';
import { JwtConfig } from './jwt.interface';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  tokenGetter: () => Promise<string | null> | Observable<string | null>;
  headerName: string;
  authScheme: string;
  whitelistedDomains: Array<string | RegExp>;
  blacklistedRoutes: Array<string | RegExp>;
  skipWhenExpired: boolean;

  constructor(private jwt: JwtService) {
    // Update options when the Jwt config is changed
    jwt.config.subscribe((config: JwtConfig) => {
      this.tokenGetter = config.tokenGetter;
      this.headerName = config.headerName || 'Authorization';
      this.authScheme = config.authScheme || config.authScheme === '' ? config.authScheme : 'Bearer ';
      this.whitelistedDomains = config.whitelistedDomains || [];
      this.blacklistedRoutes = config.blacklistedRoutes || [];
      this.skipWhenExpired = config.skipWhenExpired;
    });
  }

  isWhitelistedDomain(request: HttpRequest<any>): boolean {
    const requestUrl: any = parse(request.url, false, true);

    return (
      requestUrl.host === null ||
      this.whitelistedDomains.findIndex(
        domain =>
          typeof domain === 'string'
            ? domain === requestUrl.host
            : domain instanceof RegExp
            ? domain.test(requestUrl.host)
            : false
      ) > -1
    );
  }

  isBlacklistedRoute(request: HttpRequest<any>): boolean {
    const url = request.url;

    return (
      this.blacklistedRoutes.findIndex(
        route =>
          typeof route === 'string'
            ? route === url
            : route instanceof RegExp
            ? route.test(url)
            : false
      ) > -1
    );
  }

  handleInterception(token: string | null, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of({}).pipe(
      // allow the token to be sent if it is expired when skipWhenExpired is true
      switchMap(() => this.skipWhenExpired
        ? token
          ? this.jwt.isTokenExpired(token)
          : of(true)
        : of(false)
      ),
      switchMap((tokenIsExpired: boolean) => {
        if (token && tokenIsExpired && this.skipWhenExpired) {
          request = request.clone();
        } else if (token) {
          request = request.clone({
            setHeaders: {
              [this.headerName]: `${this.authScheme}${token}`
            }
          });
        }
        return next.handle(request);
      })
    );
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenGetter();
    return (!this.isWhitelistedDomain(request) || this.isBlacklistedRoute(request))
      ? next.handle(request)
      : (token instanceof Promise ? from(token) : token).pipe(
        mergeMap((asyncToken: string | null) => this.handleInterception(asyncToken, request, next))
      );
  }
}
