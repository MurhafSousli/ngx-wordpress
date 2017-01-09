import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {WpHttp} from '../../helpers/wp-http.class';
import {ModelInterface} from './model.interface';
import {WpQueryArgs} from "../../helpers/wp-query.class";
/**
 * WpModel Service: Get/Add/Update/Delete single from WP API
 */
@Injectable()
export class ModelService implements ModelInterface {

  /** Request Parameters  */
  private WpQueryArgs: WpQueryArgs;
  private _id: number;
  private _body: any;

  constructor(private http: WpHttp, private endpoint: string) {
    this.WpQueryArgs = new WpQueryArgs({});
  }

  /**
   * get
   * @param id
   * @param args
   * @returns {Observable<Response>}
   */
  get = (id?: number, args?: WpQueryArgs): Observable<any> => {
    let reqId = (id) ? id : this._id;
    let reqArgs = (args) ? args : this.WpQueryArgs;
    return this.http.get(this.endpoint + reqId, reqArgs)
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
  add = (body?: any): Observable<any> => {
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
  update = (id?: number, body?: any): Observable<any> => {
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
  delete = (id?: number): Observable<any> => {
    let reqId = (id) ? id : this._id;
    return this.http.delete(this.endpoint + reqId + "?force=true")
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

  body = (body: any): ModelService => {
    this._body = body;
    return this;
  };

  /**
   * Set the id
   * @param id
   * @returns {ModelService}
   */
  id = (id: number): ModelService => {
    this._id = id;
    return this;
  }
}

