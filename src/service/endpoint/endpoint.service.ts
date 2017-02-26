import { Injectable } from '@angular/core';

import { EndpointInterface } from './endpoint.interface';
import { CollectionService } from '../collection/collection.service';
import { ModelService } from '../model/model.service';
import { WpHttp } from '../../classes/wp-http.class';
import { WpEndpoint } from '../../classes/wp-endpoints';

@Injectable()
export class EndpointService implements EndpointInterface {

  constructor(private http: WpHttp, private type: string) {
  }

  /**
   * Switch service type (any)
   * @param endpoint {string}
   * @returns {ModelService | CollectionService}
   */
  private switcher(endpoint: string): ModelService | CollectionService {
    if (this.type === 'collection') {
      return new CollectionService(this.http, endpoint);
    }
    return new ModelService(this.http, endpoint);
  }

  endpoint(endpoint: string) {
    return this.switcher(endpoint);
  }

  posts() {
    return this.switcher(WpEndpoint.posts);
  }

  users() {
    return this.switcher(WpEndpoint.users);
  }

  categories() {
    return this.switcher(WpEndpoint.categories);
  }

  pages() {
    return this.switcher(WpEndpoint.pages);
  }

  tags() {
    return this.switcher(WpEndpoint.tags);
  }

  comments() {
    return this.switcher(WpEndpoint.comments);
  }

  media() {
    return this.switcher(WpEndpoint.media);
  }

  taxonomies() {
    return this.switcher(WpEndpoint.taxonomies);
  }

  statuses() {
    return this.switcher(WpEndpoint.statuses);
  };

  types() {
    return this.switcher(WpEndpoint.types);
  }
}
