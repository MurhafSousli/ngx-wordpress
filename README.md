# Angular2 WordPress API Service

[![npm version](https://badge.fury.io/js/ng2-wp-api.svg)](https://badge.fury.io/js/ng2-wp-api)

[![Build Status](https://travis-ci.org/MurhafSousli/ng2-wp-api.svg?branch=master)](https://travis-ci.org/MurhafSousli/ng2-wp-api)

![Alt text](/assets/logo.png?raw=true "Optional Title")

## Purpose

This library is designed to make it easy for your Angular2 application to request specific resources from a WordPress install. it returns the API server's response to your application as an `Observable<Response>` object.

## Getting Started



## Requirments

Wordpress site and WP API v2 plugin activated.

## Installing

Install with npm

`npm install ng2-wp-api --save`

## Usage

### Configuration

First of all, we will set our WordPress configuration using the service `WpConfig`

`WpConfig` will hold the target address, we will only set it once in the root component.

`WpConfig.baseUrl = 'YourWordPressBaseUrl' `


Inject `WORDPRESS_PROVIDERS` in the root component provider or directly in bootstrap.

#### Setup WordPress Configuration Example:

app.component.ts:
```
import {WORDPRESS_PROVIDERS, WpConfig} from "ng2-wp-api/ng2-wp-api";

@Component({
  selector: 'app',
  providers:[WORDPRESS_PROVIDERS],
  ...
})

export class App {

    constructor(wpConfig: WpConfig){
        wpConfig.baseUrl = " http://example.com";
    }
}
```

### 2 - Use the service in your component

Now after the baseUrl is sat in WpConfig, we can use the services `WpModel`, `WpCollection` in any component

#### Getting Single Example

```
import {WpModel, WpHelper, Post, QueryArgs} from "ng2-wp-api/ng2-wp-api";

@Component({
    providers: [WpModel],
    selector: 'test-single',
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

export class TestSingle {

    id: string;
    args: QueryArgs;
    post: Post;

    constructor(private service:WpModel) {

    }

    ngOnInit(){
        /** Choose the service the endpoint you are interested in */
        this.service.setEndpoint(WpHelper.Endpoint.Posts);

        /** Assume we already have the post ID */
        this.id = 7;

        /** Set the query arguments, more info https://codex.wordpress.org/Class_Reference/WP_Query#Parameters */
        this.args = new QueryArgs();
        this.args._embed = true;
        this.fetchPost();
    }

    fetchPost() {
        this.service.get(this.id, this.args).subscribe(
            (res) => {
                this.post = new Post(res);
            },
            /** Handle request error */
            err => console.log(err)
        );
    }
}
```

#### Getting Collection Example

```
import {WpCollection, WpHelper, QueryArgs} from 'ng2-wp-api/ng2-wp-api';

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

export class TestSingle {

    args: QueryArgs;
    posts;

    constructor(private service:WpCollection) {

    }

    ngOnInit(){
        /** Choose the service the endpoint you are interested in */
        this.service.setEndpoint(WpHelper.Endpoint.Posts);

        /** Filtering Collections, more info https://codex.wordpress.org/Class_Reference/WP_Query#Parameters */
        this.args = new QueryArgs();

        /** Get 6 posts in each page */
        this.args.per_page = 6; 
        this.args._embed = true;
        this.fetchPosts();
    }

    fetchPosts() {
        this.service.get(this.args).subscribe(
            (res) => {
                this.posts = res;
            },
            err => console.log(err)
        );
    }

    fetchMore() {
        this.service.more().subscribe(
            res => {
                this.posts = this.posts.concat(res);
            },
            err => console.log(err)
        );
    }
}
```


To use Add/Update/Delete functions, encode and store user credentials in `WpConfig.authKeys` using the `encodeKeys()` function in `WpHelper`.
This will add the user credentials to the headers of any request.

```
import {WORDPRESS_PROVIDERS, WpConfig, WpHelper} from "ng2-wp-api/ng2-wp-api";

@Component({
  selector: 'app',
  providers:[WORDPRESS_PROVIDERS],
  ...
})

export class App {

    constructor(wpConfig: WpConfig, wpHelper: WpHelper){
        wpConfig.baseUrl = " http://example.com";
        wpConfig.authKeys = wpHelper.encodeKeys("username", "password");
    }
}
```

##Issues

If you identify any errors in this service, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ng2-wp-api/issues). I am excited to see what the community thinks of this project, andIwe would love your input!

##License

[MIT](/License)


