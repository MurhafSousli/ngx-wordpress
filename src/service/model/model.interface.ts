import {Observable} from 'rxjs/Observable';
import {WpQueryArgs} from "../../helpers/wp-query.class";

export interface ModelInterface {

    get(id: number, args?: WpQueryArgs): Observable<any>;
    add(body: any): Observable<any>;
    update(id: number, body: any): Observable<any>;
    delete(id: number): Observable<any>;
}

export interface ModelResponse {
  data: any;
  error: any;
}
