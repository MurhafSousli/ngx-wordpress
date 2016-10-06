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
        - [Authentication](#authentication)
    - [Components](#components)
        - [Collection Component](#collectionCmp)
        - [Model Component](#modelCmp)
 - [Embedded Responses](#embedding)       
 - [Hints](#hints)    
 - [Issues](#issues)    
 - [Author](#author) 
 - [License](#license)  

<a name="features"/>
## Features

[](#features)This library is very flexible and easy to use, you will find everything you need included out of the box:
- [x] WordPress Service
- [x] WordPress Components (an alternative to the service)
- [x] Direct link
- [x] Async http calls, runs in the background (no UI blocking)
- [x] Useful classes to access several models and their properties
- [x] Timeout for Http requests
- [x] Error Notifier
- [x] Loading Notifier
- [x] Discovery
- [x] Authentication
   - [x] Basic Authentication
   - [x] Cookies Authentication
  

<a name="abstract"/>
## Abstract


#### Services:

 - `WpService`    One service for all operations (Access/Authenticate/Configure).

 ---
 
#### Components:

 - `<wp-collection>`      Inputs: args, endpoint - Output: collection response.
 - `<wp-model>`           Inputs: id, args, endpoint - Output: model response.

 ---

#### Helper Classes:  

 - `WpPost`            Useful class for posts and pages (contains functions for accessing embedded posts).
 - `WpUser`            Interface for user response.
 - `WpQueryArgs`       Class for creating query arguments for collection/model.
 - `WpEndpoint`        List of default endpoints and their addresses.

 ---

**Default Endpoints** are : `posts`, `pages`, `users`, `categories`, `tags`, `taxonomies`, `statuses`, `comments`, `media`     

```
    WpService
    ├── config 
    |    ├── baseUrl                       ** Set WordPress URL
    |    ├── timeOut                       ** Http requests timeout
    |    ├── loading                       ** Listener for requests loading state
    |    ├── errors                        ** Listener for requests errors
    |
    ├── discover(url)                      ** Discover if a URL has a valid API
    |
    ├── link(url)                          ** Http Getter with the benefits of loading and errors observables.
    |                                         Useful for getting data from external resources
    |
    ├── collection()
    |    ├── endpoint(ep)
    |        ├── get(args?)                ** Get Collection of endpoint type.
    |        ├── more()                    ** Get Next page collection combined with any previous ones.
    |        ├── next()                    ** Get Next page collection.
    |        ├── prev()                    ** Get Prev page collection.
    |
    ├── model()
    |    ├── endpoint(ep)
    |        ├──  get(id, args?)           ** Get Model by Id.
    |        ├──  add(body)                ** Add Model to WP.
    |        ├──  update(id, body)         ** Update Model by Id.
    |        ├──  delete(id)               ** Delete Model by Id.
    |
    ├── auth()
    |    ├── basic(username, password)     ** Basic authentication, returns loggedInUser.
    |    ├── cookies()                     ** Cookies authentication, returns loggedInUser.
    |    ├── logout()                      ** Removes authentication info from all requests.
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
constructor(wpService: WpService){
}

ngOnInit(){
   wpService.config.baseUrl = "http://localhost/wordpress";
   
   /** Optional */
   //catch loading state (useful for spinner)
   wpService.config.loading.subscribe(...);
   //catch any errors occurs in all requests
   wpService.config.errors.subscribe(...); 
}
```
See [Initializing example](/examples/Initilizing WP Service.ts).

After initializing, you can either consume the library as a service, or as a component.

***

<a name="service"/>
## Using the service

Import `WpService` in component constructor
Import `WpEndpoint` to get the desired endpoint address

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
import {WpService,WpEndpoint,WpQueryArgs,CollectionResponse} from "ng2-wp-api";
.
.
var endpoint = WpEndpoint.posts;

var args = new WpQueryArgs({
    perPage: 6,
    embed: true
});

this.wpService.collection()
  .endpoint(endpoint)       //or posts()
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
var endpoint = WpEndpoint.posts;

this.wpService.model()
    .endpoint(endpoint)     //or posts() or pages() or users() ..etc
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

<a name="direct"/>
## Direct Link

If you want to do a `GET` request for any URL, Use `WpService.link(url).subscribe(...)` to get the advantage of error and loading notifiers. 

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

***

<a name="authentication"/>
## Authentication

 - Basic Authentication:
```javascript
 this.wpService.auth().basic('username', 'password').subscribe(
  (loggedInUser: WpUser)=> {
    console.log(loggedInUser);
  });
```

 - Cookies Authentication:
```javascript
 this.wpService.auth().cookies().subscribe(
  (loggedInUser: WpUser)=> {
    console.log(loggedInUser);
  });
```

<a name="embedding"/>
## Embedded Responses

Usually when displaying a post, you want to display post's featured image, categories, tags, author and comments, the normal post response contains only the Id references which you will have to request each one of them individually.

Embedded responses are very useful to reduce the amount of http requets. you will get all the information you need in one response.

Embedding is triggered by setting the `_embed=true` in WpQueryArgs, check [Linking and Embedding](http://v2.wp-api.org/reference/links.html)

And now `WpPost` class will be useful to access the following properties:

```
post                        **  the original object
id()                        **  post id                  
title()                     **  post title
content()                   **  post content
excerpt()                   **  post excerpt without the (read more) link
date()                      **  post date
type()                      **  post type 
categories()                **  post categories array  
tags()                      **  post tags array
author()                    **  post author object (WpUser)
featuredMedia()             **  to check if a post has a featured image
featuredImageUrl(size)      **  to get featured image by the size, ("full", large", "medium") or 
                                any other valid size you have in your WP
```
other properties can be accessed from the original `post` object.

```
   var wpPost = new WpPost(originalPost);
   wpPost.post.propertyName
```
where `wpPost.post` = `originalPost`, See [WpPost class source code](src/helpers/wp-post.class)


<a name="hints"/>
## Hints

 - Use `WpEndpoint` to get the default endpoints and their addresses.
 - `WpService.collection.posts().get(...)` is a shortcut of `WpService.Collection.endpoint(WpEndpoint.posts)`
 - Use `WpQueryArgs` class to specify your request argument.
 - Use `WpPost` class when the response is embedded, it has useful functions for accessing embedded posts.
 - `WpPost` class works for posts, pages and custom post types.
 - Use `WpUser` interface for user response.
 - If you struggle with specifying your query arguments, check [WordPress Query parameters](https://codex.wordpress.org/Class_Reference/WP_Query#Parameters) to get a better idea.

<a name="issues"/>
## Issues

If you identify any errors in the library, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ng2-wp-api/issues). I am excited to see what the community thinks of this project, and I would love your input!

<a name="author"/>
## Author

 **[Murhaf Sousli](http://murhafsousli.com)**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)

<a name="license"/>
## License

[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)


