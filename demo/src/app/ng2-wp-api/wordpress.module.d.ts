import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { RequestOptions, XHRBackend } from "@angular/http";
/** Services */
import { WpService } from "./service/wp.service";
import { ConfigService } from "./service/config/config.service";
/** components */
import { WpCollectionComponent } from './components/collection.component';
import { WpModelComponent } from './components/model.component';
/** helpers */
import { WpHttp } from './helpers/wp-http.class';
import { WpQueryArgs } from './helpers/wp-query.class';
import { WpPost } from './helpers/wp-post.class';
import { WpUser } from './helpers/wp-user.interface';
import { WpEndpoint } from './helpers/wp-endpoints';
import { WpPagination } from './service/collection/collection.service';
import { CollectionResponse } from './service/collection/collection.interface';
import { ModelResponse } from './service/Model/Model.interface';
/** Make AOT compiler happy */
export declare function wpHttpFactory(backend: XHRBackend, defaultOptions: RequestOptions, wpConfig: ConfigService): WpHttp;
export declare class WordPressModule {
}
export { WpService, WpCollectionComponent, WpModelComponent, WpQueryArgs, WpPost, WpUser, WpEndpoint, WpPagination, CollectionResponse, ModelResponse };
