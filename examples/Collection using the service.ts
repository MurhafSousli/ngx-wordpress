/*
 * In this example, we display a collection of posts, pagination and a button to load the next page.
 * we also set the QueryArgs for the request to get embedded posts and filter the results to 6 posts per page
 * 
 * get pagination properties from `wpCollection.service`
 */
import {Component} from '@angular/core';

import {WpCollection, QueryArgs} from 'ng2-wp-api/ng2-wp-api';

@Component({
    providers: [WpCollection],
    selector: 'test-collection',
    template: `
        <div class="collection">
            <item *ngFor="let post of posts" [data]="post"></item>
        </div>
        
        <div class="pagination">    
            <p>Page: {{wpCollection.service.currentPage}} / {{wpCollection.service.totalPages}} </p><span> - Total Posts: {{wpCollection.service.totalObjects}}</span>
            <button *ngIf="wpCollection.service.hasMore()" (click)="morePosts()"> Load more</button>
        </div>
    `
})

export class TestCollection {

    args: QueryArgs;
    posts;

    constructor(private wpCollection: WpCollection) {

    }

    ngOnInit() {

        /** Filtering Collections, more info https://codex.wordpress.org/Class_Reference/WP_Query#Parameters */
        this.args = new QueryArgs();

        /** Get 6 posts in each page */
        this.args.per_page = 6;
        this.args._embed = true;
        this.fetchPosts();
    }

    fetchPosts() {
        /*
         * for custom endpoint:  
         * use `wpCollection.Endpoint('/wp-json/wp/v2/projects/').get(this.args)...` 
         */
        this.wpCollection.Posts().get(this.args).subscribe(
            (res) => {
                this.posts = res;
            },
            err => {
                /** handle errors */
                console.log(err)
            }
        );
    }

    morePosts() {
        this.wpCollection.Posts().more().subscribe(
            res => {
                this.posts = this.posts.concat(res);
            },
            err => {
                /** handle errors */
                console.log(err)
            }
        );
    }
}

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