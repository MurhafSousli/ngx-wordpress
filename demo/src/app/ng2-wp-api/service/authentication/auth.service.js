import { Injectable } from "@angular/core";
import { ConfigService, AuthType } from "../config/config.service";
import { WpEndpoint } from '../../helpers/wp-endpoints';
import { WpHttp } from "../../helpers/wp-http.class";
export var AuthService = (function () {
    function AuthService(_http, _config) {
        this._http = _http;
        this._config = _config;
    }
    AuthService.prototype.basic = function (username, password, remember) {
        /** Encode user keys */
        var encodedCred = btoa(username + ':' + password);
        return this.login(encodedCred, AuthType.basic).map(function (user) {
            if (user) {
                /** if login success, store key in localStorage */
                if (remember) {
                    localStorage.setItem('authKeys', encodedCred);
                }
                else {
                    localStorage.removeItem('authKeys');
                }
                return user;
            }
        });
    };
    AuthService.prototype.cookies = function () {
        var nonce = window['wpApiSettings'].nonce || undefined;
        if (nonce) {
            return this.login(nonce, AuthType.cookies);
        }
    };
    AuthService.prototype.login = function (keys, type) {
        var _this = this;
        this._config.setAuth(keys, type);
        return this._http.get(WpEndpoint.authentication).map(function (res) {
            /** if login fail, send error message */
            if (res && res.message) {
                _this._config.errors.next(res.message);
                return undefined;
            }
            else {
                _this._config.setAuth(keys, type);
                return res.json().body;
            }
        });
    };
    AuthService.prototype.logout = function () {
        this._config.setAuth(undefined, undefined);
    };
    AuthService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthService.ctorParameters = [
        { type: WpHttp, },
        { type: ConfigService, },
    ];
    return AuthService;
}());
//# sourceMappingURL=auth.service.js.map