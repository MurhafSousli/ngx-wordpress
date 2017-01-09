import { Observable } from 'rxjs/Observable';
import { WpHttp } from '../../helpers/wp-http.class';
import { ModelInterface } from './model.interface';
import { WpQueryArgs } from "../../helpers/wp-query.class";
/**
 * WpModel Service: Get/Add/Update/Delete single from WP API
 */
export declare class ModelService implements ModelInterface {
    private http;
    private endpoint;
    /** Request Parameters  */
    private WpQueryArgs;
    private _id;
    private _body;
    constructor(http: WpHttp, endpoint: string);
    /**
     * get
     * @param id
     * @param args
     * @returns {Observable<Response>}
     */
    get: (id?: number, args?: WpQueryArgs) => Observable<any>;
    /**
     * Add a "model" to wordpress
     * @param body
     * @returns {Observable<Response>}
     */
    add: (body?: any) => Observable<any>;
    /**
     * Update a "model" to wordpress
     * @param id
     * @param body
     * @returns {Observable<Response>}
     */
    update: (id?: number, body?: any) => Observable<any>;
    /**
     * Delete "model" from wordpress
     * @param id
     * @returns {Observable<Response>}
     */
    delete: (id?: number) => Observable<any>;
    /**
     * Set the body
     * @param body
     * @returns {ModelService}
     */
    body: (body: any) => ModelService;
    /**
     * Set the id
     * @param id
     * @returns {ModelService}
     */
    id: (id: number) => ModelService;
}
