import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, from, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { WpAuthState, WpAuthToken } from './wp-auth.interface';
import { WpUser, WpConfig } from '../interfaces';
import { JwtService } from '../jwt';

export const defaultAuthState: WpAuthState = {
  user: null,
  loading: false,
  loggedIn: false,
  error: null
};

export class WpAuthRef {

  /**
   * Stream that emits WpAuth state
   */
  private _state = new BehaviorSubject<WpAuthState>({...defaultAuthState});
  state: Observable<any> = this._state.asObservable();

  /**
   * Stream that emits logged in state
   */
  loggedIn: Observable<boolean> = this._state.pipe(
    map((state: WpAuthState) => state.loggedIn),
    distinctUntilChanged()
  );

  /**
   * Stream that emits logged in user
   */
  user: Observable<WpUser> = this._state.pipe(
    map((state: WpAuthState) => state.user),
    distinctUntilChanged()
  );

  /**
   * Stream that emits loading state
   */
  loading: Observable<boolean> = this.state.pipe(
    map((state: WpAuthState) => state.loading),
    distinctUntilChanged()
  );

  /**
   * Stream that emits auth errors
   */
  error: Observable<Error> = this._state.pipe(
    map((state: WpAuthState) => state.error),
    distinctUntilChanged()
  );

  constructor(private config: WpConfig, private http: HttpClient, private errorEmitter: Subject<Error>, jwt: JwtService) {
    jwt.isTokenExpired().pipe(
      filter((isTokenExpired: boolean) => !isTokenExpired),
      switchMap(() => this.getLoggedInUser())
    ).subscribe();
  }

  /**
   * Sign in
   */
  signIn(username: string, password: string): Observable<WpAuthState> {
    this._updateState({
      loading: true,
      error: null
    });
    const url = this.config.baseUrl + this.config.authUrl;
    return this.http.post(url, {username, password}).pipe(
      switchMap((res: WpAuthToken) => this.storeToken(res.token)),
      switchMap(() => this.getLoggedInUser()),
      catchError((res: HttpErrorResponse) => this._onError(res.error))
    );
  }

  /**
   * Validate a JWT token
   */
  validateToken(): Observable<WpAuthState> {
    this._updateState({loading: true});
    const url = this.config.baseUrl + this.config.validateAuthUrl;
    return this.http.post(url, {}).pipe(
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
      map(() => this._updateState(defaultAuthState))
    );
  }

  /**
   * Sign in success
   */
  private _onSignInSuccess(user: WpUser) {
    return this._updateState({
      user: user,
      loading: false,
      loggedIn: true,
      error: null
    });
  }

  /**
   * Validate token success
   */
  private _onValidateTokenSuccess() {
    return this._updateState({
      loading: false,
      loggedIn: true,
      error: null
    });
  }

  /**
   * Error handling
   */
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

  /**
   * Store token in storage
   */
  private storeToken(token: string): Observable<any> {
    return of(this.config.jwtOptions.tokenSetter).pipe(
      switchMap((tokenSetter: Promise<void | null> | any) => (tokenSetter instanceof Promise)
        ? from(tokenSetter) : tokenSetter(token))
    );
  }

  /**
   * Remove token from storage
   */
  private removeToken(): Observable<any> {
    return of(this.config.jwtOptions.tokenRemover).pipe(
      switchMap((tokenRemover: Promise<void | null> | any) => (tokenRemover instanceof Promise)
        ? from(tokenRemover) : tokenRemover())
    );
  }

  /**
   * Update local state
   */
  private _updateState(state: WpAuthState): WpAuthState {
    this._state.next({...this._state.value, ...state});
    return this._state.value;
  }

}
