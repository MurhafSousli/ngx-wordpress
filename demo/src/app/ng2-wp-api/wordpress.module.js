import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule, RequestOptions, XHRBackend } from "@angular/http";
import { WpService } from "./service/wp.service";
import { ConfigService } from "./service/config/config.service";
import { WpCollectionComponent } from './components/collection.component';
import { WpModelComponent } from './components/model.component';
import { WpHttp } from './helpers/wp-http.class';
import { WpQueryArgs } from './helpers/wp-query.class';
import { WpPost } from './helpers/wp-post.class';
import { WpEndpoint } from './helpers/wp-endpoints';
import { WpPagination } from './service/collection/collection.service';
/** Make AOT compiler happy */
export function wpHttpFactory(backend, defaultOptions, wpConfig) {
    return new WpHttp(backend, defaultOptions, wpConfig);
}
export var WordPressModule = (function () {
    function WordPressModule() {
    }
    WordPressModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        WpCollectionComponent,
                        WpModelComponent
                    ],
                    imports: [
                        CommonModule,
                        HttpModule
                    ],
                    providers: [
                        WpService,
                        ConfigService,
                        {
                            provide: WpHttp,
                            useFactory: wpHttpFactory,
                            deps: [XHRBackend, RequestOptions, ConfigService]
                        }
                    ],
                    exports: [
                        WpCollectionComponent,
                        WpModelComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    WordPressModule.ctorParameters = [];
    return WordPressModule;
}());
export { WpService, WpCollectionComponent, WpModelComponent, WpQueryArgs, WpPost, WpEndpoint, WpPagination };
//# sourceMappingURL=wordpress.module.js.map