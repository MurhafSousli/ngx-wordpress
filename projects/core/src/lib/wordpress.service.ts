import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { WpAuthRef } from './auth';
import { WpModelRef } from './model';
import { WpQuery, WpCollectionRef } from './collection';
import { getDefaultWpConfig, mergeDeep } from './utilities';
// Avoid circular dependency error by NOT using barrel imports.
import { JwtService } from './jwt/jwt.service';
import { WpModelService } from './model/wp-model.service';
import { WpCollectionService } from './collection/wp-collection.service';
import { WP_CONFIG, WpConfig } from './interfaces/wp-config.interface';

@Injectable({
  providedIn: 'root'
})
export class WordPress {

  /**
   * Global access WP in decorators
   */
  static wp: WordPress = undefined;

  /**
   * Auth service
   */
  auth: WpAuthRef;

  /**
   * Stream that emits WP errors
   */
  private _errorEmitter = new Subject<Error>();
  error = this._errorEmitter.asObservable();

  /**
   * WP global config
   */
  private _config: WpConfig = getDefaultWpConfig(this.platform);
  get config(): WpConfig {
    return this._config;
  }

  constructor(private http: HttpClient,
              private modelHttp: WpModelService,
              private collectionHttp: WpCollectionService,
              @Inject(PLATFORM_ID) private platform: Object,
              @Inject(WP_CONFIG) config: WpConfig,
              private jwt: JwtService
  ) {
    // Make WordPress available for decorators
    WordPress.wp = this;

    if (!config.baseUrl) {
      throw new Error(`[WordPressModule]: Please set the baseUrl`);
    }
    // Set WordPress config
    this.setConfig(config);

    // Set JwtModule Config
    this.setJwtConfig();

    // Initialize auth service
    this.auth = new WpAuthRef(this.config, http, this._errorEmitter, jwt);
  }

  /**
   * Create a WpCollectionRef for lists and pagination
   */
  collection(endpoint: string, query?: WpQuery): WpCollectionRef {
    return new WpCollectionRef(this.collectionHttp, this.config, endpoint, this._errorEmitter, query);
  }

  /**
   * Create a WpModelRef for CRUD operation
   */
  model(endpoint: string): WpModelRef {
    return new WpModelRef(this.modelHttp, this.config, endpoint, this._errorEmitter);
  }

  /**
   * Set WordPress config
   */
  setConfig(config: WpConfig) {
    this._config = mergeDeep(this.config, config);
  }

  /**
   * Set JWT config
   */
  private setJwtConfig() {
    // Get the domain by removing the 'http://' from baseUrl
    const domain = this.config.baseUrl.replace(/(^\w+:|^)\/\//, '');
    this.jwt.setConfig({
      tokenGetter: this.config.jwtOptions.tokenGetter,
      headerName: this.config.jwtOptions.headerName,
      authScheme: this.config.jwtOptions.authScheme,
      skipWhenExpired: this.config.jwtOptions.skipWhenExpired,
      whitelistedDomains: [domain],
      blacklistedRoutes: [domain + this.config.authUrl]
    });
  }
}
