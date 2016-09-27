import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {WpHttp} from '../../classes/wp.http';
import {ModelInterface} from './model.interface';
import {QueryArgs} from "../../classes/args.model";
/**
 * WpModel Service: Get/Add/Update/Delete single from WP API
 */
@Injectable()
export class ModelService implements ModelInterface {

  /** Request Parameters  */
  private queryArgs: QueryArgs;
  private _id: number;
  private _body: any;

  constructor(private http: WpHttp, private endpoint: string) {
    this.queryArgs = new QueryArgs({});
  }

  /**
   *
   * @param id
   * @param args
   * @returns {Observable<Response>}
   */
  public get = (id?: number, args?: QueryArgs): Observable<any> => {
    let reqId = (id) ? id : this._id;
    let reqArgs = (args) ? args : this.queryArgs;
    return this.http.get(this.endpoint + reqId, reqArgs).map(res => res.json());
  };
  /**
   *
   * @param body
   * @returns {Observable<Response>}
   */
  public add = (body?: any): Observable<any> => {
    let reqBody = (body) ? body : this._body;
    return this.http.post(this.endpoint, reqBody).map(res => res.json());
  };
  /**
   *
   * @param id
   * @param body
   * @returns {Observable<Response>}
   */
  public update = (id?: number, body?: any): Observable<any> => {
    let reqId = (id) ? id : this._id;
    let reqBody = (body) ? body : this._body;
    return this.http.put(this.endpoint + reqId, reqBody).map(res => res.json());
  };
  /**
   *
   * @param id
   * @returns {Observable<Response>}
   */
  public delete = (id?: number): Observable<any> => {
    let reqId = (id) ? id : this._id;
    return this.http.delete(this.endpoint + reqId + "?force=true").map(res => res.json());
  };

  /**
   *
   * @param body
   * @returns {ModelService}
   */

  public body = (body: any): ModelService => {
    this._body = body;
    return this;
  };

  /**
   *
   * @param id
   * @returns {ModelService}
   */
  public id = (id: number): ModelService => {
    this._id = id;
    return this;
  }
}

