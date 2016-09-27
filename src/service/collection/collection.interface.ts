import {Observable} from 'rxjs/Observable';
import {QueryArgs} from "../../classes/args.model";
import {Pagination} from "./collection.service";

export interface CollectionInterface {

  get(queryArgs?: QueryArgs): Observable<any>;
  more(): Observable<any>;
}

export interface CollectionResponse {
  data: any;
  pagination: Pagination;
}
