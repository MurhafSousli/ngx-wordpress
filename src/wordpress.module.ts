import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { NgModule, ModuleWithProviders, OpaqueToken } from '@angular/core';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';

/** Services */
import { WpService } from './service/wp.service';
import { ConfigService } from './service/config/config.service';
import { PhotonService } from './service/photon/photon.service';

/** directive */
import { CollectionDirective } from './directives/collection.directive';
import { ModelDirective } from './directives/model.directive';

/** helpers */
import { WpHttp } from './classes/wp-http.class';
import { WpPost } from './classes/wp-post.class';
import { WpUser } from './classes/wp-user.interface';
import { WpEndpoint } from './classes/wp-endpoints';
import { WpPagination } from './classes/wp-pagination.class';
import { CollectionResponse } from './service/collection/collection.interface';
import { ModelResponse } from './service/model/model.interface';

/** Provide ConfigService parameters providers */
export const URL = new OpaqueToken('url');
export const PHOTON = new OpaqueToken('photon');
export const DEBUG = new OpaqueToken('debug');

/** Initialize ConfigService with URL */
export function wpConfigFactory(url: string, photon: any, debug: boolean) {
  return new ConfigService(url, photon, debug);
}

/** Initialize WpHttp with ConfigService */
export function wpHttpFactory(backend: XHRBackend, defaultOptions: RequestOptions, config: ConfigService) {
  return new WpHttp(backend, defaultOptions, config);
}


@NgModule({
  declarations: [
    CollectionDirective,
    ModelDirective
  ],
  imports: [
    HttpModule
  ],
  exports: [
    CollectionDirective,
    ModelDirective
  ]
})
export class WordPressModule {

  static forRoot(url: string, photon?, debug?: boolean): ModuleWithProviders {

    return {
      ngModule: WordPressModule,
      providers: [
        { provide: URL, useValue: url },
        { provide: PHOTON, useValue: photon },
        { provide: DEBUG, useValue: debug },
        {
          provide: ConfigService,
          useFactory: wpConfigFactory,
          deps: [URL, PHOTON, DEBUG]
        },
        {
          provide: WpHttp,
          useFactory: wpHttpFactory,
          deps: [XHRBackend, RequestOptions, ConfigService]
        },
        WpService,
        PhotonService
      ]
    };
  }
}

export {
  WpService,
  CollectionDirective,
  ModelDirective,

  WpPost,
  WpUser,
  WpEndpoint,
  WpPagination,
  CollectionResponse,
  ModelResponse
}
