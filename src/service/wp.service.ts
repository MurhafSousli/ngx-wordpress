/** WpService: the entry service
 *
 *  This service is the gateway to Collection/Model/Direct links services
 *  by @MurhafSousli
 */

import { Injectable } from '@angular/core';

import { WpInterface } from './wp.interface';
import { WpHttp } from '../classes/wp-http.class';
import { EndpointService } from './endpoint/endpoint.service';
import { AuthService } from './authentication/auth.service';
import { ConfigService } from './config/config.service';

@Injectable()
export class WpService implements WpInterface {

  constructor(private http: WpHttp, public config: ConfigService) {
  }
  /**
   * Collection Service
   * @returns {EndpointService}
   */
  collection(): EndpointService {
    return new EndpointService(this.http, 'collection');
  }
  /**
   * Model Service
   * @returns {EndpointService}
   */
  model(): EndpointService {
    return new EndpointService(this.http, 'model');
  }
  /**
   * Authenticate Service
   * @returns {AuthService}
   */
  auth(): AuthService {
    return new AuthService(this.http, this.config);
  }
}
