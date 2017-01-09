import { Observable } from "rxjs/Observable";
import { AuthInterface } from "./auth.interface";
import { ConfigService } from "../config/config.service";
import { WpHttp } from "../../helpers/wp-http.class";
export declare class AuthService implements AuthInterface {
    private _http;
    private _config;
    constructor(_http: WpHttp, _config: ConfigService);
    basic(username: string, password: string, remember?: boolean): Observable<any>;
    cookies(): Observable<any>;
    private login(keys, type);
    logout(): void;
}
