/** WpService: the entry service
 *
 *  This service is the gateway to Collection/Model services, as well as direct links
 *  by @MurhafSousli
 */

import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {WpInterface} from "./wp.interface";
import {WpHttp} from "../classes/wp.http";
import {EndpointService} from "./endpoint/endpoint.service";
import {ConfigService} from "./config/config.service";
import {AuthService} from "./authentication/auth.service";

@Injectable()
export class WpService implements WpInterface{

    constructor(private _http: WpHttp, private _wpConfig: ConfigService) {
    }

    /**
     * Get Direct Link
     * @param url
     * @returns {Observable<Response>}
     */
    public link = (url: string): Observable<any> => {
        return this._http.direct(url).map((res)=>res.json());
    };
    /**
     * Get Collection Service
     * @returns {EndpointService}
     */
    public collection = (): EndpointService => {
        return new EndpointService(this._http, 'collection');
    };
    /**
     * Get Model Service
     * @returns {EndpointService}
     */
    public model = (): EndpointService => {
        return new EndpointService(this._http, 'model');
    };

    public auth = (): AuthService => {
        return new AuthService(this._http,this._wpConfig);
    };
}
