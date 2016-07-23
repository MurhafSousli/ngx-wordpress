import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {WpHelper} from '../helper/helper.service';

/*
 * WpConfig: a service to get and set WP properties
 * Use in app component to set the API base address
 * inject the service in app bootstrap
 */

@Injectable()
export class WpState {

    private baseUrl: string;
    private authKeys: string;

    constructor() {
    }

    getBaseUrl = () => {
        return this.baseUrl;
    }
    setBaseUrl = (url: string) => {
        this.baseUrl = url;
    }

    setAuthKeys = (username: string, password: string): void => {
        this.authKeys = WpHelper.encodeKeys(username, password);
    }
    getAuthKeys = (): string => {
        return this.authKeys;
    }

    getOptions = (): any => {
        return { headers: WpHelper.getHeaders(this.authKeys) };
    }
    generateUrl = (endpoint: string, args?: any): string => {
        return WpHelper.generateUrl(this.baseUrl, endpoint, args);
    }

}
