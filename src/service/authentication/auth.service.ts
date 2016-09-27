/**
 *  Authentication Service
 *  Basic Authenction
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {IAuthenticate} from "./auth.interface";
import {ConfigService} from "../config/config.service";
import {WpHttp} from "../../classes/wp.http";
import {WpHelper} from "../../classes/wp.helper";
import {User} from "../../classes/user.model";

@Injectable()
export class AuthService implements IAuthenticate {

    constructor(private _http: WpHttp, private _wpConfig: ConfigService) {

    }

    public logout = (): void=> {
        this._wpConfig.authUser.next(null);
    }

    public basic = (username: string, password: string, remember?: boolean): void => {

        /** Encode user keys */
        let encodedCred = btoa(username + ':' + password);

        this.login(encodedCred).subscribe(
            (user: User)=> {
                /** send authUser */
                this._wpConfig.authUser.next(user);
                /** store keys for the current session */
                this._wpConfig.authKeys = encodedCred;
                /** store key in localStorage */
                if (remember) {
                    localStorage.setItem('authKeys', encodedCred);
                } else {
                    localStorage.removeItem('authKeys');
                }
            });
    }

    private login(encodedKeys: string): Observable<any> {
        return this._http.post(WpHelper.endpoint.basicAuth, encodedKeys);
    }

}