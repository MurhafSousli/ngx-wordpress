/** WpService: the entry service
 *
 *  This service is the gateway to Collection/Model/Direct links services
 *  by @MurhafSousli
 */
import { Injectable } from '@angular/core';
import { WpHttp } from "../helpers/wp-http.class";
import { EndpointService } from "./endpoint/endpoint.service";
import { ConfigService } from "./config/config.service";
import { AuthService } from "./authentication/auth.service";
import { WpEndpoint } from '../helpers/wp-endpoints';
export var WpService = (function () {
    function WpService(_http, config) {
        this._http = _http;
        this.config = config;
    }
    /**
     * Discover WP API
     * @param url
     * @returns {any}
     */
    WpService.prototype.discover = function (url) {
        var _this = this;
        return this._http.direct(url + WpEndpoint.discover).map(function (res) {
            if (res) {
                /** discovery success */
                _this.config.baseUrl = url;
                return res.json();
            }
        });
    };
    /**
     * Direct Link
     * @param url
     * @returns {any}
     */
    WpService.prototype.link = function (url) {
        return this._http.direct(url).map(function (res) { return res.json(); });
    };
    /**
     * Collection Service
     * @returns {EndpointService}
     */
    WpService.prototype.collection = function () {
        return new EndpointService(this._http, 'collection');
    };
    /**
     * Model Service
     * @returns {EndpointService}
     */
    WpService.prototype.model = function () {
        return new EndpointService(this._http, 'model');
    };
    /**
     * Authenticate Service
     * @returns {AuthService}
     */
    WpService.prototype.auth = function () {
        return new AuthService(this._http, this.config);
    };
    WpService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WpService.ctorParameters = [
        { type: WpHttp, },
        { type: ConfigService, },
    ];
    return WpService;
}());
//# sourceMappingURL=wp.service.js.map