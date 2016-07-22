import 'rxjs/add/operator/map';

export * from './service/collection.service';
export * from './service/model.service';
export * from './service/helper.service';
export * from './service/config.service';

export * from './models/args.model';
export * from './models/post.model';
export * from './models/user.model';

import {WpCollection} from './service/collection.service';
import {WpModel} from './service/model.service';
import {WpConfig} from './service/config.service';
/**
 * Collection of wordpress services providers.
 */
export const WORDPRESS_PROVIDERS:any[] = [

    /** It's not recommended to inject WpCollection provider on bootstrap,
     *  because each instant of the service holds its pagination variables,
     *  and it will make conflict if you use in more than one component at the same time.
     * 
     * I recommended to inject WpModel and WpCollection services in their components,
     * and WpConfig in the root component or on bootstrap
     */
  //WpModel,
  //WpCollection,
  WpConfig
];