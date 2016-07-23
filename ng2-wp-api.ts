import 'rxjs/add/operator/map';

export * from './service';
export * from './models';

import {WpCollection, WpModel, WpState} from './service';
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
     * 
     */
  //WpModel,
  //WpCollection,
  WpState
];