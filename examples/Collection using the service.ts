/*
 * In this example, we display a collection of posts, pagination and a button to load the next page.
 * we also set the QueryArgs for the request to get embedded posts and filter the results to 6 posts per page
 * 
 * get pagination properties from `wpCollection.service`
 */
import { Component, OnInit } from '@angular/core';
import {QueryArgs, WpHelper, WpService, CollectionService, CollectionResponse} from 'ng2-wp-api/dist';

@Component({
  selector: 'test-collection',
  template: `
    <div class="test">
        <div *ngFor="let post of posts" class="item">
            <h3>
            {{post.title.rendered}}
            </h3>
        </div>
    </div>
    
    <pre>{{pagination | json}}</pre>
  `
})
export class SiderComponent implements OnInit {

  endpoint = WpHelper.endpoint.posts;
  args;

  posts;
  pagination;

  collection: CollectionService;

  constructor(private wpService: WpService) {
  }

  ngOnInit() {
    this.get();
  }

  get(){
    this.args = new QueryArgs({
      per_page: 4
    });
    this.collection = this.wpService.collection().posts();
    // or this.collection = this.wpService.collection().endpoint(WpHelper.endpoint.posts);
    this.collection.get(this.args).subscribe((res: CollectionResponse) => {
        this.pagination = res.pagination;
        this.posts = res.data;
    });
  }

  getMore() {
    this.collection.more().subscribe((res: CollectionResponse) => {
        this.posts = res.data;
    });

  }

}


/* Optional component that uses Post class which wraps the post response making it easy to access.
 * NOTE: The embed in QueryArgs must be set to true in order to get Post class to work.
 */
import {Post} from 'ng2-wp-api';

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