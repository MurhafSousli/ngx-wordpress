import {Component} from '@angular/core';
import {Model, WpHelper, Post} from 'ng2-wp-api/ng2-wp-api';

@Component({
  selector: 'test-model',
  template: `
    <model [endpoint]="endpoint" [id]="id" (response)="pageData($event)">
      <single [data]="response"></single>
    </model>
  `,
  directives: [Single, Model]
})
export class TestModel {

  endpoint = WpHelper.Endpoint.Pages;
  id;
  response;

  ngOnInit() {
    /** get page where id = 123 */
    this.id = 123;
  }

  pageData(event) {
    if (event.error) {
      /** handle model request error */
      console.log(event.error);
    }
    else {
      this.response = new Post(event.object);
    }
  }
}

/** Optional component to use Post class */ 

import {Post} from 'ng2-wp-api/ng2-wp-api';

@Component({
  selector: 'single',
  template: `
    <div class="post">
      <div class="post-title"> {{response.title()}} </div>
      <div class="post-image">
        <img [src]="response.featuredImageUrl('large')"/>
      </div>
      <div class="post-content" [innerHtml]="response.content()">
      <ul class="post-categories">
        <li *ngFor="let cat of response.categories()"> {{cat.name}} </li>
      </ul>
    </div>
  `,
})
export class Single {

  @Input() data;
  post: response;

  ngOnInit() {
    /* Create Post class from the `@Input data`. */
    this.response = new Post(this.data);
  }
}

