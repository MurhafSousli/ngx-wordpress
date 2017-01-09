import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WpHttp } from '../../helpers/wp-http.class';
import { WpQueryArgs } from "../../helpers/wp-query.class";
/**
 * WpModel Service: Get/Add/Update/Delete single from WP API
 */
export var ModelService = (function () {
    function ModelService(http, endpoint) {
        var _this = this;
        this.http = http;
        this.endpoint = endpoint;
        /**
         * get
         * @param id
         * @param args
         * @returns {Observable<Response>}
         */
        this.get = function (id, args) {
            var reqId = (id) ? id : _this._id;
            var reqArgs = (args) ? args : _this.WpQueryArgs;
            return _this.http.get(_this.endpoint + reqId, reqArgs)
                .map(function (res) {
                return { data: res.json() };
            })
                .catch(function (err) {
                return Observable.of({ error: err });
            });
        };
        /**
         * Add a "model" to wordpress
         * @param body
         * @returns {Observable<Response>}
         */
        this.add = function (body) {
            var reqBody = (body) ? body : _this._body;
            return _this.http.post(_this.endpoint, reqBody)
                .map(function (res) {
                return { data: res.json() };
            })
                .catch(function (err) {
                return Observable.of({ error: err });
            });
        };
        /**
         * Update a "model" to wordpress
         * @param id
         * @param body
         * @returns {Observable<Response>}
         */
        this.update = function (id, body) {
            var reqId = (id) ? id : _this._id;
            var reqBody = (body) ? body : _this._body;
            return _this.http.put(_this.endpoint + reqId, reqBody)
                .map(function (res) {
                return { data: res.json() };
            })
                .catch(function (err) {
                return Observable.of({ error: err });
            });
        };
        /**
         * Delete "model" from wordpress
         * @param id
         * @returns {Observable<Response>}
         */
        this.delete = function (id) {
            var reqId = (id) ? id : _this._id;
            return _this.http.delete(_this.endpoint + reqId + "?force=true")
                .map(function (res) {
                return { data: res.json() };
            })
                .catch(function (err) {
                return Observable.of({ error: err });
            });
        };
        /**
         * Set the body
         * @param body
         * @returns {ModelService}
         */
        this.body = function (body) {
            _this._body = body;
            return _this;
        };
        /**
         * Set the id
         * @param id
         * @returns {ModelService}
         */
        this.id = function (id) {
            _this._id = id;
            return _this;
        };
        this.WpQueryArgs = new WpQueryArgs({});
    }
    ModelService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ModelService.ctorParameters = [
        { type: WpHttp, },
        null,
    ];
    return ModelService;
}());
//# sourceMappingURL=model.service.js.map