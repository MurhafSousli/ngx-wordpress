import 'rxjs/add/operator/map';

export * from './service/collection.service';
export * from './service/model.service';
export * from './service/helper.service';
export * from './service/state.service';

export * from './classes/args.model';
export * from './classes/post.model';
export * from './classes/user.model';

export * from './components/collection.component';
export * from './components/model.component';

import {WpState} from './service/state.service';
/**
 * Collection of wordpress services providers.
 */
export const WORDPRESS_PROVIDERS:any[] = [
  WpState
];