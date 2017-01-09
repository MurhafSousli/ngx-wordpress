import { Observable } from "rxjs/Observable";
import { WpInterface } from "./wp.interface";
import { WpHttp } from "../helpers/wp-http.class";
import { EndpointService } from "./endpoint/endpoint.service";
import { ConfigService } from "./config/config.service";
import { AuthService } from "./authentication/auth.service";
export declare class WpService implements WpInterface {
    private _http;
    config: ConfigService;
    constructor(_http: WpHttp, config: ConfigService);
    /**
     * Discover WP API
     * @param url
     * @returns {any}
     */
    discover(url: string): Observable<any>;
    /**
     * Direct Link
     * @param url
     * @returns {any}
     */
    link(url: string): Observable<any>;
    /**
     * Collection Service
     * @returns {EndpointService}
     */
    collection(): EndpointService;
    /**
     * Model Service
     * @returns {EndpointService}
     */
    model(): EndpointService;
    /**
     * Authenticate Service
     * @returns {AuthService}
     */
    auth(): AuthService;
}
