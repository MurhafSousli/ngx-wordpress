import {Injectable} from '@angular/core';
import {Http, RequestOptions, RequestOptionsArgs, ConnectionBackend} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {ConfigService} from "../service/config/config.service";
import {WpHelper} from "../classes/wp.helper";
import {QueryArgs} from "./args.model";

@Injectable()
export class WpHttp extends Http {

    constructor(backend: ConnectionBackend,
                defaultOptions: RequestOptions,
                private _wpConfig: ConfigService) {
        super(backend, defaultOptions);
    }

    direct(url: string): Observable<any> {
        this.onStart();
        return super.get(url, this.getOptions())

            // .retryWhen(this._wpConfig.retryWhen.toString())
            .timeout(this._wpConfig.timeOut, new Error('delay exceeded'))
            .catch((err) => {
                return this.onError(err);
            })
            .finally(() => {
                this._wpConfig.loading.next(false);
            });
    }

    get(endpoint: any, args?: QueryArgs): Observable<any> {

        this.onStart();
        return super.get(this.getUrl(endpoint, args), this.getOptions())

        //.retry(error => error.delay(this.wpConfig.retryDelay))
            .timeout(this._wpConfig.timeOut, new Error('delay exceeded'))
            .catch((err) => {
                return this.onError(err);
            })
            .finally(() => {
                this._wpConfig.loading.next(false);
            });
    }

    post(endpoint: any, body: any): Observable<any> {

        this.onStart();
        return super.post(this.getUrl(endpoint), body, this.getOptions())
        //.retryWhen(error => error.delay(this.wpConfig.retryDelay))
            .timeout(this._wpConfig.timeOut, new Error('delay exceeded'))
            .catch((err) => {
                return this.onError(err);
            })
            .finally(() => {
                this.onComplete();
            });
    }

    put(endpoint: any, body: any): Observable<any> {

        this.onStart();
        return super.put(this.getUrl(endpoint), body, this.getOptions())
        //  .retryWhen(error => error.delay(this.wpConfig.retryDelay))
            .timeout(this._wpConfig.timeOut, new Error('delay exceeded'))
            .catch((err) => {
                return this.onError(err);
            })
            .finally(() => {
                this.onComplete();
            });
    }

    delete(endpoint: any): Observable<any> {

        this.onStart();
        return super.delete(this.getUrl(endpoint), this.getOptions())
        //  .retryWhen(error => error.delay(this.wpConfig.retryDelay))
            .timeout(this._wpConfig.timeOut, new Error('delay exceeded'))
            .catch((err) => {
                return this.onError(err);
            })
            .finally(() => {
                this.onComplete();
            });
    }

    /** Before the request  */
    private onStart() {
        /** set loading to true */
        this._wpConfig.loading.next(true);
    }

    /** Handle errors */
    private onError(err): Observable<any> {
        /** Stream errors in wpConfig */
        if (!(err.status === 400 || err.status === 422)) {
            this._wpConfig.errors.next(err);
        }
        return Observable.throw(err);
    }
    /** Request completed */
    private onComplete() {
        /** set loading to false */
        this._wpConfig.loading.next(false);
    }

    /** Get authKeys in headers for all requests */
    private getOptions = (): RequestOptionsArgs => {
        return {headers: WpHelper.authHeaders(this._wpConfig.authKeys)};
    }

    /** Serialize url endpoint and queryArgs */
    private getUrl = (endpoint: string, args?: any): string => {
        let url = this._wpConfig.baseUrl + endpoint;
        if (args) {
            /** add args to url */
            url += '?' + WpHelper.serialize(args);
        }
        return url;
    }
}

