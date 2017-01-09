/** Collection Service: request a collection of objects
 * (Posts, Pages, Comments, Media, Custom Endpoint ... etc)
 * */
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { WpQueryArgs } from "../../helpers/wp-query.class";
import { WpHttp } from "../../helpers/wp-http.class";
export var CollectionService = (function () {
    function CollectionService(http, endpoint) {
        var _this = this;
        this.http = http;
        this.endpoint = endpoint;
        this._items = [];
        /**
         * Get the collection
         * @param args
         * @returns {Observable<Response>}
         */
        this.get = function (args) {
            /** reset pagination */
            _this._pagination = new WpPagination();
            if (args) {
                _this._args = args;
                /** if args.page is provided set the pagination currenPage */
                if (args.page) {
                    _this._pagination.currentPage = args.page;
                }
            }
            return _this.fetch().map(function (res) {
                if (res.error) {
                    return res;
                }
                _this._items = res;
                return {
                    data: _this._items,
                    pagination: _this._pagination
                };
            });
        };
        /**
         * Get next page of the collection combined with current collection
         * @returns {any}
         */
        this.more = function () {
            if (_this._pagination && _this._pagination.hasMore) {
                /** increment currentPage then set page argument */
                _this._args.page = ++_this._pagination.currentPage;
                return _this.fetch().map(function (res) {
                    if (res.error) {
                        return res;
                    }
                    _this._items = _this._items.concat(res);
                    return {
                        data: _this._items,
                        pagination: _this._pagination
                    };
                });
            }
            else {
                return Observable.of(null);
            }
        };
        /**
         * Get next page of the collection
         * @returns {any}
         */
        this.next = function () {
            if (_this._pagination && _this._pagination.hasMore) {
                /** increment currentPage then set page argument */
                _this._args.page = ++_this._pagination.currentPage;
                return _this.fetch().map(function (res) {
                    if (res.error) {
                        return res;
                    }
                    _this._items = res;
                    return {
                        data: _this._items,
                        pagination: _this._pagination
                    };
                });
            }
            else {
                return Observable.of(null);
            }
        };
        /**
         * Get prev page of the collection
         * @returns {any}
         */
        this.prev = function () {
            if (_this._pagination && _this._pagination.hasPrev) {
                /** decrement currentPage then set page argument */
                _this._args.page = --_this._pagination.currentPage;
                return _this.fetch().map(function (res) {
                    if (res.error) {
                        return res;
                    }
                    _this._items = res;
                    return {
                        data: _this._items,
                        pagination: _this._pagination
                    };
                });
            }
            else {
                return Observable.of(null);
            }
        };
        /**
         * Fires the final request
         * @returns {Observable<any>}
         */
        this.fetch = function () {
            return _this.http.get(_this.endpoint, _this._args).map(function (res) {
                /** Set pagination  */
                _this.setPagination(res.headers);
                return res.json();
            }).catch(function (err) {
                /** return errors in form of res.error */
                return Observable.of({ error: err });
            });
        };
        /**
         * Set the pagination from collection response headers
         * @param headers
         * @returns {Pagination}
         */
        this.setPagination = function (headers) {
            /** Fix issue of different property names in response headers */
            _this._pagination.totalPages =
                +headers.get('X-WP-TotalPages') || +headers.get('X-Wp-TotalPages') || +headers.get('X-Wp-Totalpages') || 0;
            _this._pagination.totalObjects =
                +headers.get('X-WP-Total') || +headers.get('X-Wp-Total') || 0;
            _this._pagination.links = headers.get('Link');
            return _this._pagination;
        };
        this._args = new WpQueryArgs({});
    }
    CollectionService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CollectionService.ctorParameters = [
        { type: WpHttp, },
        null,
    ];
    return CollectionService;
}());
/**
 * Pagination class holds the current collection response pagination and links
 */
export var WpPagination = (function () {
    /** Pagination holds the navigation data and links provided from WP API response header*/
    function WpPagination(currentPage, totalPages, totalObjects, links) {
        if (currentPage === void 0) { currentPage = 1; }
        if (totalPages === void 0) { totalPages = 0; }
        if (totalObjects === void 0) { totalObjects = 0; }
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalObjects = totalObjects;
        this.links = links;
    }
    Object.defineProperty(WpPagination.prototype, "hasMore", {
        get: function () {
            return this.currentPage < this.totalPages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WpPagination.prototype, "hasPrev", {
        get: function () {
            return this.currentPage > 1;
        },
        enumerable: true,
        configurable: true
    });
    return WpPagination;
}());
//# sourceMappingURL=collection.service.js.map