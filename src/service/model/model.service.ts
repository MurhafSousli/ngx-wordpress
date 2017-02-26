import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {WpHttp} from '../../classes/wp-http.class';
import {ModelInterface, ModelResponse} from './model.interface';
/**
 * WpModel Service: Get/Add/Update/Delete single from WP API
 */
@Injectable()
export class ModelService implements ModelInterface {

  /** Request Parameters  */
  private args;
  private _id: number;
  private _body: any;

  constructor(private http: WpHttp, private endpoint: string) {
    this.args = {};
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
        return { data: res.json() }
      })
      .catch(err=> {
          return Observable.of({error: err})
      });
  };
  /**
   * Add a "model" to wordpress
   * @param body
   * @returns {Observable<Response>}
   */
  add(body?: any): Observable<ModelResponse>{
    let reqBody = (body) ? body : this._body;
    return this.http.post(this.endpoint, reqBody)
      .map(res => {
        return { data: res.json() }
      })
      .catch(err=> {
          return Observable.of({error: err})
      });
  };
  /**
   * Update a "model" to wordpress
   * @param id
   * @param body
   * @returns {Observable<Response>}
   */
  update(id?: number, body?): Observable<ModelResponse>{
    let reqId = (id) ? id : this._id;
    let reqBody = (body) ? body : this._body;
    return this.http.put(this.endpoint + reqId, reqBody)
      .map(res => {
        return { data: res.json() }
      })
      .catch(err=> {
          return Observable.of({error: err})
      });
  };
  /**
   * Delete "model" from wordpress
   * @param id
   * @returns {Observable<Response>}
   */
  delete(id): Observable<ModelResponse> {
    return this.http.delete(this.endpoint + id + "?force=true")
      .map(res => {
        return { data: res.json() }
      })
      .catch(err=> {
          return Observable.of({error: err})
      });
  };

  /**
   * Set the body
   * @param body
   * @returns {ModelService}
   */

  body(body: any): ModelService {
    this._body = body;
    return this;
  };

  /**
   * Set the id
   * @param id
   * @returns {ModelService}
   */
  id(id: number): ModelService {
    this._id = id;
    return this;
  }
}

