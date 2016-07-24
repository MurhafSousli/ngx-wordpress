import {Component} from '@angular/core';
import {Model, WpHelper, Post} from 'ng2-wp-api/ng2-wp-api';

@Component({
  selector: 'test-model',
  template: `
    <model [endpoint]="endpoint" [id]="id" (response)="pageData($event)">
      <div class="post-title"> {{response.title()}} </div>
      <div class="post-image">
          <img [src]="response.featuredImageUrl('large')"/>
      </div>
      <div class="post-content" [innerHtml]="response.content()">
      <ul class="post-categories">
          <li *ngFor="let cat of response.categories()"> {{cat.name}} </li>
      </ul>
    </model>
  `,
  directives: [Model]
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