import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { WpService } from '../service/wp.service';
import { WpQueryArgs } from "../helpers/wp-query.class";
export var WpCollectionComponent = (function () {
    function WpCollectionComponent(wpService) {
        var _this = this;
        this.wpService = wpService;
        /** Output for the response */
        this.response = new EventEmitter(true);
        /** Get collection of items */
        this.get = function (args) {
            _this.collection.get(args).subscribe(function (res) { return _this.response.emit(res); });
        };
        /** Get more collection (concat current with next page) */
        this.more = function () {
            _this.collection.more().subscribe(function (res) { return _this.response.emit(res); });
        };
        /** Get next collection (next page) */
        this.next = function () {
            _this.collection.next().subscribe(function (res) { return _this.response.emit(res); });
        };
        /** Get previous collection (prev page) */
        this.prev = function () {
            _this.collection.prev().subscribe(function (res) { return _this.response.emit(res); });
        };
        this.args = new WpQueryArgs({});
    }
    Object.defineProperty(WpCollectionComponent.prototype, "endpoint", {
        set: function (endpoint) {
            /** Set collection endpoint */
            this.collection = this.wpService.collection().endpoint(endpoint);
        },
        enumerable: true,
        configurable: true
    });
    /** Detects if args has changed to fetch again. */
    WpCollectionComponent.prototype.ngOnChanges = function (changes) {
        var chng = changes['args'];
        if (chng) {
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
            if (cur !== prev)
                this.get(chng.currentValue);
        }
    };
    WpCollectionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wp-collection',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "<ng-content></ng-content>"
                },] },
    ];
    /** @nocollapse */
    WpCollectionComponent.ctorParameters = [
        { type: WpService, },
    ];
    WpCollectionComponent.propDecorators = {
        'endpoint': [{ type: Input },],
        'args': [{ type: Input },],
        'response': [{ type: Output },],
    };
    return WpCollectionComponent;
}());
//# sourceMappingURL=collection.component.js.map