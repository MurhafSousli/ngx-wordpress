import { Injectable } from '@angular/core';

import { EndpointInterface } from './endpoint.interface';
import { CollectionService } from '../collection/collection.service';
import { ModelService } from '../model/model.service';
import { WpHttp } from '../../classes/wp-http.class';

@Injectable()
export class EndpointService implements EndpointInterface {

  endpoints = {
    posts: '/wp-json/wp/v2/posts/',
    revisions: '/wp-json/wp/v2/revisions/',
    users: '/wp-json/wp/v2/users/',
    categories: '/wp-json/wp/v2/categories/',
    tags: '/wp-json/wp/v2/tags',
    pages: '/wp-json/wp/v2/pages/',
    comments: '/wp-json/wp/v2/comments/',
    media: '/wp-json/wp/v2/media/',
    statuses: '/wp-json/wp/v2/statuses/',
    taxonomies: '/wp-json/wp/v2/taxonomies/',
    types: '/wp-json/wp/v2/types/'
  };

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

  /** Get the endpoint address */
  endpoint(endpoint: string) {
    return this.switcher(this.endpoints[endpoint] || endpoint);
  }

  posts() {
    return this.switcher(this.endpoints.posts);
  }

  users() {
    return this.switcher(this.endpoints.users);
  }

  categories() {
    return this.switcher(this.endpoints.categories);
  }

  pages() {
    return this.switcher(this.endpoints.pages);
  }

  tags() {
    return this.switcher(this.endpoints.tags);
  }

  comments() {
    return this.switcher(this.endpoints.comments);
  }

  media() {
    return this.switcher(this.endpoints.media);
  }

  taxonomies() {
    return this.switcher(this.endpoints.taxonomies);
  }

  statuses() {
    return this.switcher(this.endpoints.statuses);
  };

  types() {
    return this.switcher(this.endpoints.types);
  }
}
