var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { Http, RequestOptions, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from "../service/config/config.service";
export var WpHttp = (function (_super) {
    __extends(WpHttp, _super);
    function WpHttp(backend, defaultOptions, _wpConfig) {
        var _this = this;
        _super.call(this, backend, defaultOptions);
        this._wpConfig = _wpConfig;
        /** Get authKeys in headers for all requests */
        this.getOptions = function () {
            return { headers: _this._wpConfig.getAuth() };
        };
        /** Serialize url endpoint and queryArgs */
        this.getUrl = function (endpoint, args) {
            var url = _this._wpConfig.baseUrl + endpoint;
            if (args) {
                /** add args to url */
                url += '?' + serialize(args);
            }
            return url;
        };
    }
    WpHttp.prototype.direct = function (url) {
        var _this = this;
        this.onStart();
        return _super.prototype.get.call(this, url, this.getOptions())
            .timeout(this._wpConfig.timeOut)
            .catch(function (err) { return _this.onError(err); })
            .finally(function () { return _this.onComplete(); });
    };
    WpHttp.prototype.get = function (endpoint, args) {
        var _this = this;
        this.onStart();
        return _super.prototype.get.call(this, this.getUrl(endpoint, args), this.getOptions())
            .timeout(this._wpConfig.timeOut)
            .catch(function (err) { return _this.onError(err); })
            .finally(function () { return _this.onComplete(); });
    };
    WpHttp.prototype.post = function (endpoint, body) {
        var _this = this;
        this.onStart();
        return _super.prototype.post.call(this, this.getUrl(endpoint), body, this.getOptions())
            .timeout(this._wpConfig.timeOut)
            .catch(function (err) { return _this.onError(err); })
            .finally(function () { return _this.onComplete(); });
    };
    WpHttp.prototype.put = function (endpoint, body) {
        var _this = this;
        this.onStart();
        return _super.prototype.put.call(this, this.getUrl(endpoint), body, this.getOptions())
            .timeout(this._wpConfig.timeOut)
            .catch(function (err) { return _this.onError(err); })
            .finally(function () { return _this.onComplete(); });
    };
    WpHttp.prototype.delete = function (endpoint) {
        var _this = this;
        this.onStart();
        return _super.prototype.delete.call(this, this.getUrl(endpoint), this.getOptions())
            .timeout(this._wpConfig.timeOut)
            .catch(function (err) { return _this.onError(err); })
            .finally(function () { return _this.onComplete(); });
    };
    /** Before the request  */
    WpHttp.prototype.onStart = function () {
        /** set loading to true */
        this._wpConfig.loading.next(true);
    };
    /** Handle errors */
    WpHttp.prototype.onError = function (err) {
        /** emits and return errors */
        this._wpConfig.errors.next(err);
        return Observable.throw(err);
    };
    /** Request completed */
    WpHttp.prototype.onComplete = function () {
        /** set loading to false */
        this._wpConfig.loading.next(false);
    };
    WpHttp.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WpHttp.ctorParameters = [
        { type: ConnectionBackend, },
        { type: RequestOptions, },
        { type: ConfigService, },
    ];
    return WpHttp;
}(Http));
var serialize = function (obj, prefix) {
    var str = [];
    for (var p in obj) {
        if (obj.hasOwnProperty(p) && obj[p]) {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push(typeof v == "object" ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
};
//# sourceMappingURL=wp-http.class.js.map