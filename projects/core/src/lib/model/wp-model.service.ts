import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { WpModelState } from './wp-model.interface';
import { WpModelClient } from './wp-model.client';
import { WpPost, WpConfig } from '../interfaces';

const DefaultState: WpModelState = {
  data: null,
  loading: false,
  error: null
};

export class WpModelRef {

  private _url = '';
  // Stream that emits WpModel state
  private _state = new BehaviorSubject<WpModelState>(DefaultState);
  state = this._state.asObservable();

  /**
   * Stream that emits WpModel loading state
   */
  get loading(): Observable<boolean> {
    return this.state.pipe(
      map((state: WpModelState) => state.loading),
      distinctUntilChanged()
    );
  }

  /**
   * Stream that emits WpModel data
   */
  get data(): Observable<any> {
    return this.state.pipe(
      map((state: WpModelState) => state.data),
      filter(error => !!error),
      distinctUntilChanged()
    );
  }

  /**
   * Stream that emits WpModel errors
   */
  get error(): Observable<Error> {
    return this.state.pipe(
      map((state: WpModelState) => state.error),
      filter(error => !!error),
      distinctUntilChanged()
    );
  }

  constructor(private model: WpModelClient,
              private config: WpConfig,
              private endpoint: string,
              private errorEmitter: Subject<Error>) {
    this._url = config.baseUrl + config.restUrl + endpoint;
  }

  /**
   * Get model item by id
   */
  get(id: number | string): Observable<WpModelState> {
    this._updateState({loading: true});

    return this.model.get(this._url, id).pipe(
      map((res: WpModelState) => this._onSuccess(res)),
      catchError((err: Error) => this._onError(err))
    );
  }

  /**
   * Create new item
   */
  create(body: any): Observable<WpModelState> {
    this._updateState({loading: true});

    return this.model.create(this._url, body).pipe(
      map((res: WpModelState) => this._onSuccess(res)),
      catchError((err: Error) => this._onError(err))
    );
  }

  /**
   * Update existing item by id
   */
  update(id: number | string, body?): Observable<WpModelState> {
    this._updateState({loading: true});

    return this.model.update(this._url, id, body).pipe(
      map((res: WpModelState) => this._onSuccess(res)),
      catchError((err: Error) => this._onError(err))
    );
  }

  /**
   * Delete existing item by id
   */
  delete(id: number | string): Observable<WpModelState> {
    this._updateState({loading: true});

    return this.model.delete(this._url, id).pipe(
      map((res: WpModelState) => this._onSuccess(res)),
      catchError((err: Error) => this._onError(err))
    );
  }

  /**
   * Destroy state
   */
  destroy() {
    this._state.complete();
  }

  /**
   * Data fetch error
   */
  private _onError(err): Observable<WpModelState> {
    const state = this._updateState({
      loading: false,
      error: err
    });
    this.errorEmitter.next(err);
    return of(state);
  }

  /**
   * Data fetch success
   */
  private _onSuccess(res: any): WpModelState {
    const state = this._updateState({
      data: this.endpoint === 'posts' ? new WpPost(res, this.config.postFilters) : res,
      loading: false,
      error: null
    });
    return state;
  }

  /**
   * Update local state
   */
  private _updateState(state: WpModelState): WpModelState {
    this._state.next({...this._state.value, ...state});
    return this._state.value;
  }

}
