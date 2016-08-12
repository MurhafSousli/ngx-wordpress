# Angular2 WordPress API Service
[![npm](https://img.shields.io/npm/v/ng2-wp-api.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng2-wp-api) [![Build Status](https://travis-ci.org/MurhafSousli/ng2-wp-api.svg?branch=master)](https://travis-ci.org/MurhafSousli/ng2-wp-api) 
[![npm](https://img.shields.io/npm/dt/ng2-wp-api.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng2-wp-api)

![Alt text](/assets/logo.png?raw=true "Optional Title")

This library is designed to make it easy for your Angular2 application to request specific resources from a WordPress install. it returns the API server's response to your application as an `Observable<any>` object.

# Requirments

**Wordpress** installation and **WP API v2** plugin activated.

# Installing

Install it with npm

`npm install ng2-wp-api --save`

# Table of Contents
 
 - [Abstract](#abstract)  
 - [Usage](#usage)
    - [Initialization](#Initialization)
    - [Getting Collection](#collection)
        - [Method 1: using component](#collectionCmp) 
        - [Method 2: using service](#collectionSrv)
    - [Getting Model](#model)
        - [Method 1: using component](#modelCmp)
        - [Method 2: using service](#modelSrv)
 - [Authentication](#authentication)    
 - [Issues](#issues)   
 - [License](#license)   


<a name="abstract"/>
# Abstract

You can either use the components or services to get the data from WordPress api.

### Components:

 - `Collection`      Inputs: args, endpoint - Output: collection response.
 - `Model`           Inputs: id, args, endpoint - Output: model response.

### Services:    

 - `WpCollection`    Service to get a collection of objects (posts).
 - `WpModel`         Service to get/add/update/delete a single object (post) by id.
 - `WpState`         Class to configure the library (e.g. wordpress base url).

### Helper Classes:  

 - `Post`            Class for Post/Page contains helper functions (e.g. functions for accessing embedded properties).
 - `User`            Interface for User response.
 - `QueryArgs`       Class for creating query arguments
 - `WpHelper`        Get endpoint address.

:

       

**Default Endpoints** are : `Posts`, `Pages`, `Users`, `Categories`, `Tags`, `Taxonomies`, `Statuses`, `Comments`, `Media`     

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

    WpHelper 
     ├── Endpoint: enum

```

<a name="usage"/>
# Usage

After installing the library, set your WordPress base address

<a name="Initialization"/>
## Initialization

To initialize the library's configuration

1 - import `WpState` class in your root component, then set the `baseUrl` to your WordPress host address

2 - Inject `WORDPRESS_PROVIDERS` in the root component provider or directly in bootstrap.


in App component (root):
```
@Component({
    selector: 'app',
    providers:[WORDPRESS_PROVIDERS],
    ...
})
export class App {
    constructor(wpState: WpState){
        wpState.setBaseUrl("http://yourWordPressSite.com");
    }
}
```
[Initilizing the library - full example](/examples/Initilizing WP Service.ts)

`WpState` *is a global service where other services can acquire information.*

Now the library is initialized, the services `WpModel` and `WpCollection` are ready to use in any component.

<a name="collection"/>
## Getting a collection of posts

<a name="collectionCmp"/>
### **METHOD 1:** Using `Collection` component

```
<collection [args]="args" [endpoint]="endpoint" (response)="postsData($event)">
    <!-- your custom view -->
    <div class="post" *ngFor="let post of response.objects">
        <h1>{{post.title}}</h1>
        <p [innerHtml]="post.content"></p>
    </div>
</collection>
<div class="pagination">    
    <p>Page: {{response.currentPage}} / {{response.totalPages}} </p><span> - Total Posts: {{response.totalObjects}}</span>
</div>
```

**Optional** Create item component for each post item

```
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

  post: Post;
  @Input()
  set data(data: any) {
    this.post = new Post(data);
  }
}
```
in parent component
```
<collection [args]="args" [endpoint]="endpoint" (response)="postsData($event)">
    <item *ngFor="let post of response.objects" [data]="post"></item>
</collection>
```

[Getting collection using the component - full example](/examples/Collection using the component.ts)

<a name="collectionSrv"/>
### **METHOD 2:** Using `Collection` Service

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

    ngOnInit(){
        /** page id */
        this.id = 123;
        /** page args */
        this.args = new QueryArgs({
            _embed: true
        });
        this.fetchPost();
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
Note that contrary to what we did with `WpState`, Any component uses one of these services must has its own instance of the service, so we must inject the service within each component.

[Getting collection using the service - full example](/examples/Collection using the service.ts)

<a name="model"/>
## Getting a single post by ID

<a name="modelCmp"/>
### **METHOD 1:** Using `Model` component

```
<model [endpoint]="endpoint" [id]="id" (response)="pageData($event)">
    <div class="post>
        <div class="post-title"> {{response.title()}} </div>
        <div class="post-image">
            <img [src]="response.featuredImageUrl('large')"/>
        </div>
        <div class="post-content" [innerHtml]="response.content()">
        <ul class="post-categories">
            <li *ngFor="let cat of response.categories()"> {{cat.name}} </li>
        </ul>
    <div>
</model>
```
It's recommended to create view component to display the post

```
import {Post} from 'ng2-wp-api/ng2-wp-api';

@Component({
  selector: 'single',
  template: `
    <div class="post">
      <div class="post-title"> {{response.title()}} </div>
      <div class="post-image">
        <img [src]="response.featuredImageUrl('large')"/>
      </div>
      <div class="post-content" [innerHtml]="response.content()">
      <ul class="post-categories">
        <li *ngFor="let cat of response.categories()"> {{cat.name}} </li>
      </ul>
    </div>
  `,
})
export class Single {

  post: Post;
  @Input()
  set data(data: any) {
    this.post = new Post(data);
  }
}
```
in parent component
```
<model [endpoint]="endpoint" [id]="id" (response)="pageData($event)">
    <single [data]="response"></single>
</model>
```

[Getting model using the component - full example](/examples/Model using the component.ts)

<a name="modelSrv"/>
### **METHOD 2:** Using `WpModel` service

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

    constructor(private wpModel:WpModel) {

    }

    ngOnInit() {
        /** page id */
        this.id = 123;
        /** page args */
        this.args = new QueryArgs({
        _embed: true
        });
        this.fetchPost();
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
```
[Getting model using the service - full example](/examples/Model using the service.ts)

*PS: when embed is set to true, you will get featured image, categories, tags and author with the response.*

<a name="authentication"/>
# Authentication

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
[Initilizing the library - full example](/examples/Initilizing WP Service.ts)

<a name="issues"/>
# Issues


The library is still in beta, if you identify any errors in this service, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ng2-wp-api/issues). I am excited to see what the community thinks of this project, and I would love your input!

# Author

 **Murhaf Sousli**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)

<a name="license"/>
# License

[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)


