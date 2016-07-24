/*
 * In the following example, we fetch a collection of posts from WP API, the template displays the posts and a "Load more" button to load the next available page.
 * we also set the QueryArgs for the request to get embedded posts and filter the results to 6 posts per page
 */
import {Component} from '@angular/core';

import {WpCollection, QueryArgs} from 'ng2-wp-api/ng2-wp-api';

@Component({
    providers: [WpCollection],
    selector: 'test-collection',
    template: `
        <ul class="list">
            <li class="post-item" *ngFor="let post of posts"></li>
                <div class="post-title"> {{post.title()}} </div>
                 <div class="post-image">
                    <img [src]="post.featuredImageUrl('small')"/>
                </div>
                <div class="post-excerpt" [innerHtml]="post.excerpt()">
            <li>
        </ul>
        <p>Page: {{service.currentPage}} / {{service.totalPages}} </p><span> - Total Posts: {{service.totalObjects}}</span>
        <button *ngIf="service.hasMore()" (click)="fetchMore()"> Load more</button>
    `
})

export class TestCollection {

    args: QueryArgs;
    posts;

    constructor(private service:WpCollection) {

    }

    ngOnInit(){

        /** Filtering Collections, more info https://codex.wordpress.org/Class_Reference/WP_Query#Parameters */
        this.args = new QueryArgs();

        /** Get 6 posts in each page */
        this.args.per_page = 6; 
        this.args._embed = true;
        this.fetchPosts();
    }

    fetchPosts() {
        this.service.Posts().get(this.args).subscribe(
            (res) => {
                this.posts = res;
            },
            err => {
                /** handle errors */
                console.log(err)
            }
        );
    }

    fetchMore() {
        this.service.Posts().more().subscribe(
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