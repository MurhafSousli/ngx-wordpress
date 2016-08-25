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

import {Component, ViewChild, Input} from '@angular/core';
import {Collection, WpHelper, QueryArgs} from 'ng2-wp-api';

@Component({
  selector: 'test-collection',
  template: `
    <collection [args]="args" [endpoint]="endpoint" (response)="postsData($event)">
        <item *ngFor="let post of response.objects" [data]="post"></item>
    </collection>

    <div class="pagination">    
        <p>Page: {{response.currentPage}} / {{response.totalPages}} </p><span> - Total Posts: {{response.totalObjects}}</span>
        <button *ngIf="collection.hasMore()" (click)="morePosts()"> Load more</button>
    </div>
  `,
  directives: [Collection, Item]
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
     this.args = new QueryArgs({
        _embed: true,
        per_page: 4
      }
    );
  }

   /** Handle response */
  postsData(event) {
    if (event.error) {
      //console.log("[Blog]: " + event.error);
      // this.router.navigate(['/404']);
    }
    else {
      this.response = event;

      /** if response is empty
      if (!event.objects.length) {

      }
       */
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
* Use `collection.more()` to get more Posts.
* 
* Some might be interested to check if the service has more collection to get, use `hasMore()`
*/


/** Optional component to use Post class */ 

import {Post} from 'ng2-wp-api';

@Component({
  selector: 'item',
  template: `
    <div class="post">
      <div class="post-title"> {{response.title()}} </div>
        <div class="post-image">
          <img [src]="response.featuredImageUrl('small')"/>
        </div>
      <div class="post-excerpt" [innerHtml]="response.excerpt()">
    </div>
  `,
})

export class Item {
  post: Post;
  @Input()
  set data(data: any) {
     /* Create Post class for the view `. */
    this.post = new Post(data);
  }
}

