import { Observable } from "rxjs/Observable";
import { WpQueryArgs } from "../../helpers/wp-query.class";
import { WpHttp } from "../../helpers/wp-http.class";
import { CollectionInterface } from "./collection.interface";
export declare class CollectionService implements CollectionInterface {
    private http;
    private endpoint;
    /** Request Parameter  */
    private _args;
    /** Collection Pagination Properties */
    private _pagination;
    private _items;
    constructor(http: WpHttp, endpoint: string);
    /**
     * Get the collection
     * @param args
     * @returns {Observable<Response>}
     */
    get: (args?: WpQueryArgs) => Observable<any>;
    /**
     * Get next page of the collection combined with current collection
     * @returns {any}
     */
    more: () => Observable<any>;
    /**
     * Get next page of the collection
     * @returns {any}
     */
    next: () => Observable<any>;
    /**
     * Get prev page of the collection
     * @returns {any}
     */
    prev: () => Observable<any>;
    /**
     * Fires the final request
     * @returns {Observable<any>}
     */
    private fetch;
    /**
     * Set the pagination from collection response headers
     * @param headers
     * @returns {Pagination}
     */
    private setPagination;
}
/**
 * Pagination class holds the current collection response pagination and links
 */
export declare class WpPagination {
    currentPage: number;
    totalPages: number;
    totalObjects: number;
    links: any;
    /** Pagination holds the navigation data and links provided from WP API response header*/
    constructor(currentPage?: number, totalPages?: number, totalObjects?: number, links?: any);
    readonly hasMore: boolean;
    readonly hasPrev: boolean;
}
