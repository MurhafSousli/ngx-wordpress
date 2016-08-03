/*
 *  This example demonstrates how to get a single post by id
 *  We set the QueryArgs embed to true then create Post class 
 *  from the response to get its functions e.g. `post.featuredImageUrl($size)`
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

    constructor(private wpModel:WpModel) {

    }

    ngOnInit(){
        /** post id */
        this.id = 7;

        /** post args, more info https://codex.wordpress.org/Class_Reference/WP_Query#Parameters */
        this.args = new QueryArgs({
            _embed: true
        });
    }

    fetchPost() {
        /*
         * for custom endpoint:  
         * use `wpModel.Endpoint('/wp-json/wp/v2/books/').get(this.args)...` 
         */
        this.wpModel.Posts().get(this.id, this.args).subscribe(
            (res) => {
                this.post = new Post(res);
            },
            /** Handle request error */
            err => console.log(err)
        );
    }
}