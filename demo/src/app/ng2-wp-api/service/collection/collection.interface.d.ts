import { Observable } from 'rxjs/Observable';
import { WpQueryArgs } from "../../helpers/wp-query.class";
import { WpPagination } from "./collection.service";
export interface CollectionInterface {
    get(args?: WpQueryArgs): Observable<any>;
    more(): Observable<any>;
    next(): Observable<any>;
    prev(): Observable<any>;
}
export interface CollectionResponse {
    data: any;
    pagination: WpPagination;
    error: any;
}
