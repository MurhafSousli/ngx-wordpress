# Angular2 WordPress API Service

[![npm version](https://badge.fury.io/js/ng2-wp-api.svg)](https://badge.fury.io/js/ng2-wp-api) [![Build Status](https://travis-ci.org/MurhafSousli/ng2-wp-api.svg?branch=master)](https://travis-ci.org/MurhafSousli/ng2-wp-api)

![Alt text](/assets/logo.png?raw=true "Optional Title")

## Purpose

This library is designed to make it easy for your Angular2 application to request specific resources from a WordPress install. it returns the API server's response to your application as an `Observable<Response>` object.

## Requirments

Wordpress site and WP API v2 plugin activated.

## Installing

Install it with npm

`npm install ng2-wp-api --save`

## Usage

### Configuration

First of all, we must set our WordPress configuration using the class (service) `WpConfig` which holds the target address, set it only once within the root component.

`WpConfig.baseUrl = 'YourWordPressBaseUrl' `

Inject `WORDPRESS_PROVIDERS` in the root component provider or directly in bootstrap, because we only want one global instance of `WpConfig`.

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
        wpConfig.baseUrl = "http://example.com";
    }
}
```

### Using the service in your component

Now the `baseUrl` is set in `WpConfig`, we can use the services `WpModel`, `WpCollection` in any component, However contrary to what we did with `WpConfig`, Every component uses WordPress service (`WpModel` and `WpCollection`) must has its own instance of the service, therefore we must inject the service within the component provider.

We have to tell the service which endpoint we want to use before requesting the data, you can set the endpoint using `service.SetEndpoint()` and pass it as a string or using `WpHelper.Endpoint` 

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

## Authentication

To use Add/Update/Delete functions, user must be authenticated. Encode and store the user credentials using `WpConfig.setAuthKeys`.
This will add the user credentials to the headers of any request.

```
import {WORDPRESS_PROVIDERS, WpConfig} from "ng2-wp-api/ng2-wp-api";

@Component({
  selector: 'app',
  providers:[WORDPRESS_PROVIDERS],
  ...
})

export class App {

    constructor(wpConfig: WpConfig){
        wpConfig.baseUrl = "http://example.com";
        wpConfig.setAuthKeys("username", "password");
    }
}
```

##Issues

If you identify any errors in this service, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ng2-wp-api/issues). I am excited to see what the community thinks of this project, andIwe would love your input!

##License

[MIT](/License)


