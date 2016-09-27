import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HttpModule, RequestOptions, XHRBackend} from "@angular/http";

/** Services */
import {CollectionService} from './service/collection/collection.service';
import {ModelService} from './service/model/model.service';
import {ConfigService} from './service/config/config.service';
import {WpService} from "./service/wp.service";
import {EndpointService} from './service/endpoint/endpoint.service';

/** components */
import {WpCollection} from './components/collection.component';
import {WpModel} from './components/model.component';

/** classes */
import {WpHttp} from "./classes/wp.http";
import {QueryArgs} from './classes/args.model';
import {Post} from './classes/post.model';
import {User} from './classes/user.model';
import {WpHelper} from './classes/wp.helper';

/** interfaces */
import {CollectionResponse} from './service/collection/collection.interface';


@NgModule({
  declarations: [
    WpCollection,
    WpModel
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
    WpCollection,
    WpModel
  ]
})
export class WordPressModule {
}

export * from './service/config/config.service';
export * from "./service/wp.service";

export {
  CollectionService,
  ModelService,
  ConfigService,
  WpService,
  EndpointService,
  WpCollection,
  WpModel,

  QueryArgs,
  Post,
  User,
  WpHelper,

  CollectionResponse
}
