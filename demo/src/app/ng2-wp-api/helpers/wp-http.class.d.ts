import { Http, RequestOptions, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from "../service/config/config.service";
import { WpQueryArgs } from "./wp-query.class";
export declare class WpHttp extends Http {
    private _wpConfig;
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, _wpConfig: ConfigService);
    direct(url: string): Observable<any>;
    get(endpoint: any, args?: WpQueryArgs): Observable<any>;
    post(endpoint: any, body: any): Observable<any>;
    put(endpoint: any, body: any): Observable<any>;
    delete(endpoint: any): Observable<any>;
    /** Before the request  */
    private onStart();
    /** Handle errors */
    private onError(err);
    /** Request completed */
    private onComplete();
    /** Get authKeys in headers for all requests */
    private getOptions;
    /** Serialize url endpoint and queryArgs */
    private getUrl;
}
