# Angular2 WordPress API Service

[![npm version](https://badge.fury.io/js/ng2-wp-api.svg)](https://badge.fury.io/js/ng2-wp-api) [![Build Status](https://travis-ci.org/MurhafSousli/ng2-wp-api.svg?branch=master)](https://travis-ci.org/MurhafSousli/ng2-wp-api)

![Alt text](/assets/logo.png?raw=true "Optional Title")

## Purpose

This library is designed to make it easy for your Angular2 application to request specific resources from a WordPress install. it returns the API server's response to your application as an `Observable<any>` object.

## Requirments

Wordpress site and WP API v2 plugin activated.

## Installing

Install it with npm

`npm install ng2-wp-api --save`

## Table of Contents
 
 - [Abstract](#abstract)  
 - [Usage](#usage)
    - [Initilizing](#initializing)
    - [Getting Collection](#collection)
        - [Getting Collection using component](#collectionCmp) 
        - [Getting Collection using service](#collectionSrv)
    - [Getting Model](#model)
        - [Getting Model using component](#modelCmp)
        - [Getting Model using service](#modelSrv)
 - [Authentication](#authentication)    
 - [Issues](#issues)   
 - [License](#license)   


<a name="abstract"/>
## Abstract

The library offers:

    Components:
     - `Collection`      Component to consume WpCollection service.
     - `Model`           Component to consume WpModel service.

    Services:    
     - `WpCollection`    Service to get a collection of endpoint type.
     - `WpModel`         Service to get a single object of endpoint type by id.
     - `WpState`         Global service to get and set library's configurations e.g. base address and user credentials.

    Classes:  
     - `Post`            Class for Post/Page contains helper functions (e.g. functions for accessing embedded properties).
     - `User`            Interface for User response.
     - `QueryArgs`       Class for creating query arguments

```
    WpCollection
     ├── currentPage: number
     ├── totalPages: number
     ├── totalObjects: number
     |
     ├── get(args: any): Observable<any>
     ├── more(): Observable<any>
     ├── hasMore(): boolean

    WpModel
     ├── get(id: number, args?: any): Observable<any>
     ├── add(body): Observable<any>
     ├── update(id: number, body): Observable<any>
     ├── delete(id: number): Observable<any>

    WpState
     ├── getBaseUrl(): string
     ├── setBaseUrl(url: string): void
     ├── getAuthKeys(): string
     ├── setAuthKeys(username: string, password: string): void

```

**Default Endpoints** are : `Posts`, `Pages`, `Users`, `Categories`, `Tags`, `Taxonomies`, `Statuses`, `Comments`, `Media`

<a name="usage"/>
## Usage

<a name="initializing"/>
### Initialization

First of all, we must initialize the library's configuration in `WpState` service, set the `baseUrl` to the wordpress host address (must be done within the root component).

Inject `WORDPRESS_PROVIDERS` in the root component provider or directly in bootstrap, because we only want one global instance of `WpState`.


in App component (root):
```
@Component({
    selector: 'app',
    providers:[WORDPRESS_PROVIDERS],
    ...
})
export class App {
    constructor(wpState: WpState){
        wpState.setBaseUrl("http://yourWordPressDomain.com");
    }
}
```
[Initilizing the library example](/examples/Initilizing WP Service.ts)


Now the library is initialized, the services `WpModel` and `WpCollection` are ready to use in any component.

<a name="collection"/>
### Getting a collection of posts

<a name="collectionCmp"/>
**METHOD 1:** The component way

```
import {Collection, WpHelper, QueryArgs} from 'ng2-wp-api/ng2-wp-api';

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
  directives: [Collection]
})

export class TestCollection {

    /** set the endpoint of collection */
  endpoint = WpHelper.Endpoint.Posts;
  args:QueryArgs;

  response;

  /** reference for Collection, so we can use its functions */
  @ViewChild(Collection) collection:Collection;

  /** collection output */
  postsData(event) {
    if (event.error) {
      /** handle collection request error */
      console.log(event.error);
    }
    else {
      this.response = event;
    }
  }

  /** get more posts */
  morePosts(){
      this.collection.more();
  }
}
```
[Getting collection using the component - full example](/examples/Getting Collection.ts)

<a name="collectionSrv"/>
**METHOD 2:** The service way

```
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

    fetchPosts() {
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
```
Note that contrary to what we did with `WpState`, Every component uses one of these services must has its own instance of the service, so we must inject the service within each component.

[Getting collection using the service - full example](/examples/Collection using the service.ts)

<a name="model"/>
### Getting a single post by ID

<a name="modelCmp"/>
**METHOD 1:** The component way

```
import {Model, WpHelper, Post} from 'ng2-wp-api/ng2-wp-api';

@Component({
  selector: 'test-model',
  template: `
    <model [endpoint]="endpoint" [id]="id" (response)="pageData($event)">
      <div class="post-title"> {{response.title()}} </div>
      <div class="post-image">
          <img [src]="response.featuredImageUrl('large')"/>
      </div>
      <div class="post-content" [innerHtml]="response.content()">
      <ul class="post-categories">
          <li *ngFor="let cat of response.categories()"> {{cat.name}} </li>
      </ul>
    </model>
  `,
  directives: [Model]
})
export class TestModel {

  endpoint = WpHelper.Endpoint.Pages;
  id;
  response;

  ngOnInit() {
    /** get page where id = 123 */
    this.id = 123;
  }

  pageData(event) {
    if (event.error) {
      /** handle model request error */
      console.log(event.error);
    }
    else {
      this.response = new Post(event.object);
    }
  }
}
```

[Getting model by id - full example](/examples/Model using the component.ts)

<a name="modelSrv"/>
**METHOD 2:** The service way

```
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
        this.id = 123;
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
```
[Getting model by id - full example](/examples/Model using the service.ts)

*PS: when embed is set to true, you will get featured image, categories, tags and author with the response.*

<a name="authentication"/>
## Authentication

In order to use Add/Update/Delete functions, user must be authenticated. use `WpState.setAuthKeys($username, $password)` to store user credentials.

```
@Component({
    selector: 'app',
    providers:[WORDPRESS_PROVIDERS],
    ...
})
export class App {
    constructor(wpState: WpState){
        wpState.setBaseUrl("http://yourWordPressDomain.com");
        wpState.setAuthKeys("yourUsername", "yourPassword");
    }
}
```
[Initilizing the library example](/examples/Initilizing WP Service.ts)

<a name="issues"/>
## Issues

If you identify any errors in this service, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ng2-wp-api/issues). I am excited to see what the community thinks of this project, and I would love your input!

<a name="license"/>
## License

[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)


