import { Injectable } from '@angular/core';
import { Headers } from "@angular/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export var ConfigService = (function () {
    function ConfigService() {
        /** request timeout */
        this.timeOut = 5000;
        this.loading = new BehaviorSubject(false);
        this.errors = new BehaviorSubject(null);
    }
    ConfigService.prototype.getAuth = function () {
        switch (this._authType) {
            case AuthType.basic:
                return basicHeaders(this._authKeys);
            case AuthType.cookies:
                return cookiesHeaders(this._authKeys);
            default:
                return undefined;
        }
    };
    ConfigService.prototype.setAuth = function (keys, type) {
        this._authKeys = keys;
        this._authType = type;
    };
    ConfigService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ConfigService.ctorParameters = [];
    return ConfigService;
}());
export var AuthType;
(function (AuthType) {
    AuthType[AuthType["basic"] = 0] = "basic";
    AuthType[AuthType["cookies"] = 1] = "cookies";
})(AuthType || (AuthType = {}));
function basicHeaders(keys) {
    var headers = new Headers();
    if (keys) {
        headers.append('Authorization', 'Basic ' + keys);
    }
    return headers;
}
function cookiesHeaders(keys) {
    var headers = new Headers();
    if (keys) {
        headers.append('X-WP-Nonce', keys);
    }
    return headers;
}
//# sourceMappingURL=config.service.js.map