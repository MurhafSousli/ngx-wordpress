import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { WP_CONFIG, WpConfig } from './interfaces';
import { WordPress } from './wordpress.service';
import { JwtModule } from './jwt';
import { CachingInterceptor, RequestCache, RequestCacheWithMap } from './cache';

@NgModule({
  imports: [
    HttpClientModule,
    JwtModule.forRoot()
  ]
})
export class WordPressModule {
  // Activate the module once imported
  constructor(wp: WordPress) {}

  static forRoot(config?: WpConfig): ModuleWithProviders {
    return {
      ngModule: WordPressModule,
      providers: [
        { provide: WP_CONFIG, useValue: config },
        { provide: RequestCache, useClass: RequestCacheWithMap },
        { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
      ]
    };
  }
}
