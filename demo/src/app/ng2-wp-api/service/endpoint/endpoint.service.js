import { Injectable } from '@angular/core';
import { CollectionService } from "../collection/collection.service";
import { ModelService } from "../model/model.service";
import { WpHttp } from "../../helpers/wp-http.class";
import { WpEndpoint } from "../../helpers/wp-endpoints";
export var EndpointService = (function () {
    function EndpointService(_http, _type) {
        var _this = this;
        this._http = _http;
        this._type = _type;
        this.endpoint = function (endpoint) {
            return _this.swithcer(endpoint);
        };
        this.posts = function () {
            var endpoint = WpEndpoint.posts;
            return _this.swithcer(endpoint);
        };
        this.users = function () {
            var endpoint = WpEndpoint.users;
            return _this.swithcer(endpoint);
        };
        this.categories = function () {
            var endpoint = WpEndpoint.categories;
            return _this.swithcer(endpoint);
        };
        this.pages = function () {
            var endpoint = WpEndpoint.pages;
            return _this.swithcer(endpoint);
        };
        this.tags = function () {
            var endpoint = WpEndpoint.tags;
            return _this.swithcer(endpoint);
        };
        this.comments = function () {
            var endpoint = WpEndpoint.comments;
            return _this.swithcer(endpoint);
        };
        this.media = function () {
            var endpoint = WpEndpoint.media;
            return _this.swithcer(endpoint);
        };
        this.taxonomies = function () {
            var endpoint = WpEndpoint.taxonomies;
            return _this.swithcer(endpoint);
        };
        this.statuses = function () {
            var endpoint = WpEndpoint.statuses;
            return _this.swithcer(endpoint);
        };
        this.types = function () {
            var endpoint = WpEndpoint.types;
            return _this.swithcer(endpoint);
        };
    }
    /**
     * Switch service type (any)
     * @param endpoint
     * @returns {any}
     */
    EndpointService.prototype.swithcer = function (endpoint) {
        if (this._type === 'collection') {
            return new CollectionService(this._http, endpoint);
        }
        return new ModelService(this._http, endpoint);
    };
    EndpointService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    EndpointService.ctorParameters = [
        { type: WpHttp, },
        null,
    ];
    return EndpointService;
}());
//# sourceMappingURL=endpoint.service.js.map