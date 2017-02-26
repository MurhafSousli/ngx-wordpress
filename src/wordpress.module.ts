import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';

/** Services */
import { WpService } from './service/wp.service';
import { ConfigService } from './service/config/config.service';

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

/** Make AOT compiler happy */
function wpHttpFactory(backend: XHRBackend, defaultOptions: RequestOptions, wpConfig: ConfigService) {
  return new WpHttp(backend, defaultOptions, wpConfig);
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
  static forRoot(url: string): ModuleWithProviders {

    return {
      ngModule: WordPressModule,
      providers: [
        WpService,
        { provide: ConfigService, useValue: new ConfigService(url) },
        {
          provide: WpHttp,
          useFactory: wpHttpFactory,
          deps: [XHRBackend, RequestOptions, ConfigService]
        }
      ]
    };
  }

}

export {
  WpService,
  ConfigService,
  CollectionDirective,
  ModelDirective,

  WpPost,
  WpUser,
  WpEndpoint,
  WpPagination,
  CollectionResponse,
  ModelResponse
}
