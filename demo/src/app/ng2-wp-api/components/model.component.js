import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { WpService } from '../service/wp.service';
export var WpModelComponent = (function () {
    function WpModelComponent(wpService) {
        this.wpService = wpService;
        /** Output for the response */
        this.response = new EventEmitter();
    }
    Object.defineProperty(WpModelComponent.prototype, "endpoint", {
        /** Inputs for api endpoint, query arguments and model id */
        set: function (endpoint) {
            /** Set model endpoint */
            this.model = this.wpService.model().endpoint(endpoint);
        },
        enumerable: true,
        configurable: true
    });
    /** Detects if args has changed to fetch again. */
    WpModelComponent.prototype.ngOnChanges = function (changes) {
        var chng = changes['id'];
        if (chng) {
            var prevId = chng.previousValue;
            var newId = chng.currentValue;
            if (prevId != newId)
                this.get(newId, this.args);
        }
    };
    /** Get a model of endpoint type by id */
    WpModelComponent.prototype.get = function (id, args) {
        var _this = this;
        this.model.get(id, args).subscribe(function (res) { return _this.response.emit(res); });
    };
    WpModelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wp-model',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "<ng-content></ng-content>"
                },] },
    ];
    /** @nocollapse */
    WpModelComponent.ctorParameters = [
        { type: WpService, },
    ];
    WpModelComponent.propDecorators = {
        'endpoint': [{ type: Input },],
        'id': [{ type: Input },],
        'args': [{ type: Input },],
        'response': [{ type: Output },],
    };
    return WpModelComponent;
}());
//# sourceMappingURL=model.component.js.map