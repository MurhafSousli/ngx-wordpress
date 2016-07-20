import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

/*
 * WpConfig: a service to get and set WP properties
 * Use in app component to set the API base address
 * inject the service in app bootstrap
 */

@Injectable()
export class WpConfig{

    public baseUrl: string;
    public authKeys: string;

    constructor() {
    }
}