# Angular2 WordPress API Service [![npm](https://img.shields.io/npm/v/ng2-wp-api.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng2-wp-api) [![Build Status](https://travis-ci.org/MurhafSousli/ng2-wp-api.svg?branch=master)](https://travis-ci.org/MurhafSousli/ng2-wp-api) [![npm](https://img.shields.io/npm/dt/ng2-wp-api.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng2-wp-api)

![alt tag](/assets/cover.png?raw=true)

This library is designed to make it easy for your Angular2 application to request specific resources from a WordPress install.

## Requirments

**Wordpress** installation and **WP API v2** plugin activated.

## Installation

Install it with npm

`npm install ng2-wp-api --save`
 

## Table of Contents
 
 - [Features](#features)
 - [Abstract](#abstract)  
 - [Usage](#usage)
    - [Initialization](#initialization)
    - [Services](#services)
        - [Getting Collections](#collectionSrv)
        - [Getting Models](#modelSrv)
        - [Direct Link](#direct)
        - [Add/Update/Delete Operations](#cud)
    - [Components](#components)
        - [Collection Component](#collectionCmp)
        - [Model Component](#modelCmp)
 - [Authentication](#authentication)
 - [Hints](#hints)    
 - [Issues](#issues)    
 - [Author](#author) 
 - [License](#license)  

<a name="features"/>
## Features

[](#features)This library is very flexible and easy to use, you will find everything you need included out of the box:
- [x] WordPress Service
   * Get collection of posts `wpService.collection().posts().get(args?).subscribe(...)`
   * Get single post by ID `wpService.model().posts.get(id,args?).subscribe(...)`
- [x] WordPress Components (an alternative to the service)
   * `<wp-model [endpoint]='endpoint' [id]='id' (response)='wpResponse(event)'></wp-model>`
   * `<wp-collection [endpoint]='endpoint' [args]='args' (response)='wpResponse(event)'></wp-collection>`
- [x] Direct link `wpService.link(url).subscribe(...)`
- [x] Aysnc http calls, runs in the background (no UI blocking).
- [x] Useful classes to access several models and properties.
- [x] Timeout for http calls (ms) `wpConfig.timeout = 6000;` default: 6s 
- [x] Error Notifier `wpConfig.errors.subscribe(...)`
- [x] Loading Notifier `wpConfig.loading.subscribe(...)`
- [x] Authentication Notifier `wpConfig.authUser.subscribe(...)`
- [ ] Authentication
   - [x] Basic Authentication. `wpService.auth().basic(username,password)`
   - [ ] Cookie Authentication (if your app works internally in a wordpress theme).
   - [ ] JWT Authentication (requires [JWT plugin](https://github.com/Tmeister/wp-api-jwt-auth)).
   - [ ] OAuth Authentication (requires [OAuth Plugin](https://github.com/WP-API/OAuth1)).
  

<a name="abstract"/>
## Abstract


#### Services:

 - `WpService`    Service to get a collection/model of the wanted endpoint.
 - `WpConfig`     Service to initialize and configure the library (e.g. wordpress base url).

 ---
 
#### Components:

 - `<wp-collection>`      Inputs: args, endpoint - Output: collection response.
 - `<wp-model>`           Inputs: id, args, endpoint - Output: model response.

 ---

#### Helper Classes:  

 - `Post`            Useful class for posts and pages (e.g. functions for accessing embedded posts).
 - `User`            Interface for user response.
 - `QueryArgs`       Class for creating query arguments
 - `WpHelper`        Contains the default endpoints addresses.

 ---

**Default Endpoints** are : `posts`, `pages`, `users`, `categories`, `tags`, `taxonomies`, `statuses`, `comments`, `media`     

```
    WpService
    ├── link(url): Observable
    ├── collection()
    |    ├── endpoint(ep)
    |        ├── get(args?): Observable
    |        ├── more(): Observable
    ├── model()
    |    ├── endpoint($ep)
    |        ├──  get(id, args?): Observable
    |        ├──  add(body): Observable
    |        ├──  update(id, body): Observable
    |        ├──  delete(id): Observable
    ├── auth()
    |    ├── basic(username, password): void;
    |    ├── logout(): void;
    

    WpConfig
    ├── baseUrl: string
    ├── authKeys: string (encrypted)
```


<a name="usage"/>
## Usage

Add `WordPressModule` to **NgModule** `imports` array.

```javascript
import { WordPressModule } from 'ng2-wp-api';

@NgModule({
imports: [
    WordPressModule
  ]
})
```

<a name="initialization"/>
### Initialization

Set your WordPress base url in the root component

```javascript
constructor(wpConfig: WpConfig){

    wpConfig.baseUrl = "http://localhost/wordpress";
    
    /** Optional observables */
    
    //catch loading state (useful for spinner)
    wpConfig.loading.subscribe(...);
    //catch any errors occurs in all requests
    wpConfig.errors.subscribe(...);
    //catch authenticated user once login is successful
    wpConfig.authUser.subscribe(...);
}
```
See [Initializing example](/examples/Initilizing WP Service.ts).

After initializing, you can either consume the library as a service, or as a component.

***

<a name="service"/>
## Using the service

Import `WpService` and inject it in your component constructor

```javascript
import {WpService} from "ng2-wp-api";

@Component({...})
export class testComponent {
    constructor(private wpService: WpService) {

    }
}
```

<a name="collectionSrv">
**For collection:**

A basic example of fetching 6 embedded posts:
  
```javascript
var endpoint = WpHelper.endpoint.posts;

var args = new QueryArgs({
    perPage: 6,
    embed: true
});

this.wpService.collection()
  .endpoint(endpoint)       //or .posts()
  .get(args)
  .subscribe((res: CollectionResponse) => {
      this.data = res.data;
      this.pagination = res.pagination;
  });
```
See [WpService Collection example](/examples/Collection using the service.ts)

<a name="modelSrv">
**For model:**

```javascript
var endpoint = WpHelper.endpoint.posts;

this.wpService.model()
    .endpoint(endpoint)     //posts() or pages() or users() ..etc
    .get(id)
    .subscribe((res) => {
        this.data = res;
    });
```

See [WpService Model example](/examples/Model using the service.ts)

***
    
<a name="component"/>
## Using the components

<a name="collectionCmp">
**For collection:**

```html
<wp-collection [args]="args" [endpoint]="endpoint" (response)="wpResponse($event)">
<!-- Your Template Goes Here -->
</wp-collection>
``` 
WpCollection component gets a new response automatically when the input `[args]` value has set/changed.

See [Collection Component example](/examples/Collection using the component.ts)

> **NOTE**: Make sure `enableProdMode()` is called to avoid `onChanges` error.

<a name="modelCmp">
**For model:**
  
```html
<wp-model [id]="id" [endpoint]="endpoint" (response)="wpResponse($event)">
<!-- Your Template Goes Here -->
<wp-model>
```

WpModel component gets a new response automatically when the input `[id]` value has set/changed.

See [Model Component example](/examples/Model using the component.ts)

***

<a name="cud"/>
## Add/Update/Delete

```javascript
//add new post
wpService.model().posts().add(body);

//update page by id
wpService.model().pages().update(pageId, body);

//delete user by id
wpService.model().users().delete(userId);
```

<a name="issues"/>
## Issues

If you identify any errors in the library, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ng2-wp-api/issues). I am excited to see what the community thinks of this project, and I would love your input!

<a name="hints"/>
## Hints

 - Use `WpHelper.endpoint` to get the default endpoints and their addresses.
 - Use `wpService.collection.posts().get(...)` instead of `WpService.Collection.endpoint(WpHelper.endpoint.posts)`
 - Use `QueryArgs` class to specify your request argument.
 - Use `Post` class when the response is embedded, it has useful functions for accessing embedded posts.
 - `Post` class works for posts, pages and custom post types.
 - Use `User` interface if the response is user.
 - If you struggle with specifing your query arguments, check [WordPress Query parameters](https://codex.wordpress.org/Class_Reference/WP_Query#Parameters) to get a better idea.

<a name="author"/>
## Author

 **Murhaf Sousli**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)

<a name="license"/>
## License

[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)


