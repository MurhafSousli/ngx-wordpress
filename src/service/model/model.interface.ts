import {Observable} from 'rxjs/Observable';
import {QueryArgs} from "../../classes/args.model";

export interface ModelInterface {

    get(id: number, args?: QueryArgs): Observable<any>;
    add(body: any): Observable<any>;
    update(id: number, body: any): Observable<any>;
    delete(id: number): Observable<any>;
}
