import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HttpModule, RequestOptions, XHRBackend} from "@angular/http";

/** Services */
import {WpService} from "./service/wp.service";
import {ConfigService} from "./service/config/config.service";

/** components */
import {WpCollectionComponent} from './components/collection.component';
import {WpModelComponent} from './components/model.component';

/** helpers */
import {WpHttp} from './helpers/wp-http.class';
import {WpQueryArgs} from './helpers/wp-query.class';
import {WpPost} from './helpers/wp-post.class';
import {WpUser} from './helpers/wp-user.interface';
import {WpEndpoint} from './helpers/wp-endpoints';
import {WpPagination} from './service/collection/collection.service';
import {CollectionResponse} from './service/collection/collection.interface';
import {ModelResponse} from './service/Model/Model.interface';


@NgModule({
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
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, wpConfig: ConfigService) =>
        new WpHttp(backend, defaultOptions, wpConfig),
      deps: [XHRBackend, RequestOptions, ConfigService]

    }
  ],
  exports: [
    WpCollectionComponent,
    WpModelComponent
  ]
})
export class WordPressModule {
}

export {
  WpService,
  WpCollectionComponent,
  WpModelComponent,

  WpQueryArgs,
  WpPost,
  WpUser,
  WpEndpoint,
  WpPagination,
  CollectionResponse,
  ModelResponse
}
