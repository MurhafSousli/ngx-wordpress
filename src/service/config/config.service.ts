/** ConfigService: WP Service Configuration class
 *
 *  `ConfigService` must be singleton in the app
 *  minimum settings required: baseUrl = WordPress absolute url
 *
 *  Streams Errors and Loading states
 * */

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {ConfigInterface} from './config.interface';
import {User} from "../../classes/user.model";

@Injectable()
export class ConfigService implements ConfigInterface {

    private _authKeys: string;
    private _timeOut: number;
    private _retryWhen:number;

    /** Current user token (encrypted) */
    get authKeys(): string{
        return this._authKeys;
    }
    set authKeys(encondedKeys: string){
        this._authKeys = encondedKeys;
    }

    /** timeout default 3s */
    get retryWhen():number{
        return this._retryWhen || 3000;
    }
    set retryWhen(delay: number){
        this._retryWhen = delay;
    }

    /** timeout default 6s */
    get timeOut():number {
        return this._timeOut || 6000;
    }
    set timeOut(delay: number){
        this._timeOut = delay;
    }

    /** WP base URL */
    public baseUrl: string;

    /** Subscribe to `loading` to get notified when the service is busy. */
    public loading: BehaviorSubject<boolean>;

    /** Subscribe to `logs` to get notified whenever an error occurs. */
    public errors: BehaviorSubject<any>;

    /** Subscribe to `authUser` to get notified whenever the user logs in. */
    public authUser: BehaviorSubject<User>;

    constructor() {
        this.loading = new BehaviorSubject<boolean>(false);
        this.errors = new BehaviorSubject<any>(null);
        this.authUser = new BehaviorSubject<User>(null);
    }

}


/** TODO: discus if we should add retryDelay and on which errors should it stop */
/** retryDelay in ms default 1000ms */
// get retryDelay():number{
//     return this._retryDelay || 1000;
// }

/** TODO:  Subscribe to `authenticated` to get notified whenever the user logs in. */
// public authenticated: BehaviorSubject<boolean>;

/**  TODO: Basic Authentication
 * http://portfolio.murhafsousli.com/wp-json/wp/v2/users/me
 // public loginBasic = (username: string, password: string) => {
    //     let encryptedKeys = WpHelper.encodeKeys(username, password);
    //     localStorage.setItem('authKeys', encryptedKeys);
    // }
/**  TODO: Cookie authentication */
// public loginCookie = () => {
//     /**
//      * Check http://v2.wp-api.org/guide/authentication/
//      */
//     let nonce = window['wpApiSettings'] || undefined;
//     if(nonce){
//         this.authenticated.next(true);
//     }
//     else{
//         /** if cookies are empty, redirect to login page */
//         window.location.replace(this.baseUrl + '/wp-admin');
//         return false;
//     }
// }
/**  TODO: JWT authentication */
// public loginJWT = (username: string, password: string) => {
//
// }
/**  TODO: OAuth authentication */
// public loginCookie = (username: string, password: string) => {
//
// }

/** TODO: logout    */

 // public logout = () => {
 //        if (this.authenticated.getValue()) {
//            localStorage.removeItem('authKeys');
//            this.authenticated.next(false);
//        }
//    }


/** Those function are used within the library
 *
 * TODO: extend Http, with WpHttp
 */
// public getOptions = (): any => {
//     return {headers: WpHelper.getHeaders(this.authKeys)};
// }
// public generateUrl = (endpoint: string, args?: any): string => {
//     return WpHelper.generateUrl(this.baseUrl, endpoint, args);
// }
