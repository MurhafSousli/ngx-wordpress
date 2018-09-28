import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, from, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import { WpAuthState, WpAuthToken } from './wp-auth.interface';
import { WpUser, WpConfig } from '../interfaces';
import { JwtHelperService } from '../jwt';

const defaultState: WpAuthState = {
  user: null,
  loading: false,
  loggedIn: false,
  error: null
};

export class WpAuthRef {

  private _state = new BehaviorSubject<WpAuthState>(defaultState);
  state: Observable<any> = this._state.asObservable();

  loggedIn: Observable<boolean> = this._state.pipe(
    map((state: WpAuthState) => state.loggedIn),
    distinctUntilChanged()
  );

  user: Observable<WpUser> = this._state.pipe(
    map((state: WpAuthState) => state.user),
    distinctUntilChanged()
  );

  error: Observable<Error> = this._state.pipe(
    map((state: WpAuthState) => state.error),
    distinctUntilChanged()
  );

  loading: Observable<boolean> = this.state.pipe(
    map((state: WpAuthState) => state.loading),
    distinctUntilChanged()
  );

  constructor(private config: WpConfig, private http: HttpClient, private errorEmitter: Subject<Error>, jwt: JwtHelperService) {
    if (!jwt.isTokenExpired()) {
      this.getLoggedInUser().subscribe();
    }
  }

  /**
   * Sign in
   */
  signIn(username: string, password: string): Observable<WpAuthState> {
    this._updateState({loading: true});
    const tokenUrl = this.config.baseUrl + this.config.authUrl + 'token';
    return this.http.post(tokenUrl, {username, password}).pipe(
      switchMap((res: WpAuthToken) => this._onCreateTokenSuccess(res.token)),
      switchMap(() => this.getLoggedInUser()),
      catchError((res: HttpErrorResponse) => this._onError(res.error))
    );
  }

  /**
   * Validate a JWT token
   */
  validateToken(): Observable<WpAuthState> {
    this._updateState({loading: true});
    const tokenUrl = this.config.baseUrl + this.config.authUrl + 'token/validate';
    return this.http.post(tokenUrl, {}).pipe(
      map(() => this._onValidateTokenSuccess()),
      catchError((res: HttpErrorResponse) => this._onError(res.error))
    );
  }

  /**
   * Get the logged in user
   */
  getLoggedInUser(): Observable<WpAuthState> {
    this._updateState({loading: true});
    return this.http.get(this.config.baseUrl + this.config.restUrl + 'users/me').pipe(
      map((user: WpUser) => this._onSignInSuccess(user)),
      catchError((res: HttpErrorResponse) => this._onError(res.error))
    );
  }

  /**
   * Sign out
   */
  signOut(): Observable<WpAuthState> {
    return this.removeToken().pipe(
      map(() => this._updateState(defaultState))
    );
  }

  private _onCreateTokenSuccess(token: string): Observable<WpAuthState> {
    return this.storeToken(token).pipe(
      map(() => this._updateState({error: null}))
    );
  }

  private _onSignInSuccess(user: WpUser) {
    return this._updateState({
      user: user,
      loading: false,
      loggedIn: true,
      error: null
    });
  }

  private _onValidateTokenSuccess() {
    return this._updateState({
      loading: false,
      loggedIn: true,
      error: null
    });
  }

  private _onError(err: Error): Observable<WpAuthState> {
    return this.removeToken().pipe(
      map(() => {
        const state = this._updateState({
          user: null,
          loading: false,
          loggedIn: false,
          error: err
        });
        this.errorEmitter.next(err);
        return state;
      })
    );
  }

  private storeToken(token: string): Observable<any> {
    return of(this.config.jwtOptions.tokenSetter).pipe(
      switchMap((tokenSetter: Promise<void> | Function) => (tokenSetter instanceof Promise)
        ? from(tokenSetter) : of({}).pipe(tap(() => tokenSetter(token))))
    );
  }

  private removeToken(): Observable<any> {
    return of(this.config.jwtOptions.tokenRemover).pipe(
      switchMap((tokenRemover: Promise<void> | Function) => (tokenRemover instanceof Promise)
        ? from(tokenRemover) : of({}).pipe(tap(() => tokenRemover())))
    );
  }

  private _updateState(state: WpAuthState): WpAuthState {
    this._state.next({...this._state.value, ...state});
    return this._state.value;
  }

}
