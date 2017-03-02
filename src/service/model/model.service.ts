import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { WpHttp } from '../../classes/wp-http.class';
import { ModelInterface, ModelResponse } from './model.interface';
/**
 * WpModel Service: Get/Add/Update/Delete single from WP API
 */
@Injectable()
export class ModelService implements ModelInterface {

  constructor(private http: WpHttp, private endpoint: string) {
  }
  /**
   * get
   * @param id
   * @param args
   * @returns {Observable<Response>}
   */
  get(id: number, args?): Observable<ModelResponse> {

    return this.http.get(this.endpoint + id, args)
      .map(res => {
        return { data: res.json() };
      })
      .catch(err => Observable.of({ error: err }));
  };
  /**
   * Add a "model" to wordpress
   * @param body
   * @returns {Observable<Response>}
   */
  add(body?: any): Observable<ModelResponse> {

    return this.http.post(this.endpoint, body)
      .map(res => {
        return { data: res.json() };
      })
      .catch(err => Observable.of({ error: err }));
  };
  /**
   * Update a "model" to wordpress
   * @param id
   * @param body
   * @returns {Observable<Response>}
   */
  update(id: number, body?): Observable<ModelResponse> {

    return this.http.put(this.endpoint + id, body)
      .map(res => {
        return { data: res.json() };
      })
      .catch(err => Observable.of({ error: err }));
  };
  /**
   * Delete "model" from wordpress
   * @param id
   * @returns {Observable<Response>}
   */
  delete(id): Observable<ModelResponse> {

    return this.http.delete(this.endpoint + id + '?force=true')
      .map(res => Observable.of({ data: res.json() }))
      .catch(err => Observable.of({ error: err }));
  };

}
