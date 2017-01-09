import { Headers } from "@angular/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConfigInterface } from './config.interface';
export declare class ConfigService implements ConfigInterface {
    /** base URL */
    baseUrl: string;
    /** request timeout */
    timeOut: number;
    /** Subscribe to `loading` to get notified when the service is busy. */
    loading: BehaviorSubject<boolean>;
    /** Subscribe to `logs` to get notified whenever an error occurs. */
    errors: BehaviorSubject<any>;
    private _authType;
    private _authKeys;
    constructor();
    getAuth(): Headers;
    setAuth(keys: string, type: AuthType): void;
}
export declare enum AuthType {
    basic = 0,
    cookies = 1,
}
