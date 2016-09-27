/*
 *  This example demonstrates how to get a single post by id
 */
import {Component} from '@angular/core';

import {WpModel, Post, QueryArgs} from "ng2-wp-api";

@Component({
    selector: 'test-model',
    template: `
        <h1>{{post?.title?.rendered}}</h1>
    `
})

export class TestModel {

    post: Post;

    constructor(private wpService: WpService) {

    }

    ngOnInit(){

        let args = new QueryArgs({
            _embed: true
        });

        this.wpService.model().posts().get(1395, args)
        .subscribe((res)=>{
            this.post = res;
        });
    }

}