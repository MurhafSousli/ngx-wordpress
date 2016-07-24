/*
 *  The following example demonstrates how to get a single post by id
 *  We set the QueryArgs embed to true, to display the post featured image using the function `post.featuredImageUrl($size)`
 */
import {Component} from '@angular/core';

import {WpModel, Post, QueryArgs} from "ng2-wp-api/ng2-wp-api";

@Component({
    providers: [WpModel],
    selector: 'test-model',
    template: `
        <div class="post">
            <div class="post-title"> {{post.title()}} </div>
            <div class="post-image">
                <img [src]="post.featuredImageUrl('large')"/>
            </div>
            <div class="post-content" [innerHtml]="post.content()">
            <ul class="post-categories">
                <li *ngFor="let cat of post.categories()"> {{cat.name}} </li>
            </ul>
        </div>
    `
})

export class TestModel {

    id: string;
    args: QueryArgs;
    post: Post;

    constructor(private service:WpModel) {

    }

    ngOnInit(){
        /** Assume we already have the post ID */
        this.id = 7;

        /** Set the query arguments, more info https://codex.wordpress.org/Class_Reference/WP_Query#Parameters */
        this.args = new QueryArgs();
        this.args._embed = true;
        this.fetchPost();
    }

    fetchPost() {
        this.service.Posts().get(this.id, this.args).subscribe(
            (res) => {
                this.post = new Post(res);
            },
            /** Handle request error */
            err => console.log(err)
        );
    }
}