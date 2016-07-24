/*
 * In the following example, we will get posts using Collection component
 * Inputs: 
 * - [endpoint]: this example will display posts, so `WpHelper.Endpoint.Posts` will be used.
 * - [args]: show 4 posts per page and embed is set to true.
 * 
 * Output:
 * - (response): fire event once the response is received.
 * 
 * functions:
 *  fetch($args):Observable<any>
 *  more():Observable<any>
 *  hasMore():boolean
 */

import {Component, ViewChild} from '@angular/core';
import {Collection, WpHelper, QueryArgs} from 'ng2-wp-api/ng2-wp-api';

@Component({
  selector: 'test-collection',
  template: `
    <collection [args]="args" [endpoint]="endpoint" (response)="postsData($event)">
        <item *ngFor="let post of response.objects" [data]="post"></item>
    </collection>

    <div class="pagination">    
        <p>Page: {{response.currentPage}} / {{response.totalPages}} </p><span> - Total Posts: {{response.totalObjects}}</span>
        <button *ngIf="collection.hasMore()" (click)="fetchMore()"> Load more</button>
    </div>
  `,
  directives: [Collection]
})

export class TestCollection {

    /** set the endpoint of collection */
  endpoint = WpHelper.Endpoint.Posts;
  args:QueryArgs;

  response;

  /** reference for Collection, so we can use its functions */
  @ViewChild(Collection) collection:Collection;

  ngOnInit() {
    /** initializing query arguments */
    let args = new QueryArgs();
    args._embed = true;
    args.per_page = 4;
    this.args = args;
  }

  /** collection output */
  postsData(event) {
    if (event.error) {
      /** handle collection request error */
      console.log(event.error);
    }
    else {
      this.response = event;
    }
  }

  /** get more posts */
  morePosts(){
      this.collection.more();
  }
}


/* 
* you may have noticed that we didn't call collection.fetch($args)
* because the collection component gets the posts automatically when the `@Input args` value changes.
* 
* but we definitly need to call `collection.more()` to get more Posts.
* 
* Some might be interested to check if the service has more collection to get, use `hasMore()`
*/


/* This is optional if you want to make use of Post class.
 * Create a view component for post item.
 * Create Post class from the `@Input data`.
 */
import {Post} from 'ng2-wp-api/ng2-wp-api';

@Component({
  selector: 'item',
  template: `
    <div class="post-title"> {{post.title()}} </div>
        <div class="post-image">
            <img [src]="post.featuredImageUrl('small')"/>
        </div>
    <div class="post-excerpt" [innerHtml]="post.excerpt()">
  `,
  directives: [Collection]
})

export class Item {

  @Input() data;
  post: Post;

  ngOnInit() {
    this.post = new Post(this.data);
  }
}

