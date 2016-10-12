/*
 *  This example demonstrates how to get a single post by id
 */
import {Component} from '@angular/core';

import {WpModel, WpPost, WpQueryArgs} from "ng2-wp-api";

@Component({
    selector: 'test-model',
    template: `
        <h1>{{post.title()}}</h1>
    `
})

export class TestModel {

    post;

    constructor(private wpService: WpService) {

    }

    ngOnInit(){

        let args = new WpQueryArgs({
            _embed: true
        });

        this.wpService.model().posts().get(1395, args)
        .subscribe((res)=>{
            if(res.error){
                console.log(res.error);
            }
            else{
                this.post = new WpPost(res.data);
            }
        });
    }

}