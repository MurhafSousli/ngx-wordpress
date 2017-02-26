[![npm](https://img.shields.io/npm/v/ng2-wp-api.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng2-wp-api) [![Build Status](https://travis-ci.org/MurhafSousli/ng2-wp-api.svg?branch=master)](https://travis-ci.org/MurhafSousli/ng2-wp-api) [![npm](https://img.shields.io/npm/dt/ng2-wp-api.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng2-wp-api)

<p align="center">
  <img height="300px" width="300px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ng2-wp-api/1b8cec0a0412eb098545fdb3df5e85d824e4408b/assets/logo.svg">
  <h1 align="center">Angular WordPress Module</h1>
</p>

This library is designed to make it easy for your Angular application to request specific resources from a WordPress install.


## Table of Contents
 
 - [Live example that uses ng2-wp-api](https://ontrava.com)
 - [Features](#features)
 - [Requirments](#requirments)
 - [Installation](#installation)
 - [Usage](#usage)
    - [WP Directives](#directives)
        - [Collection Directive](#collectionDir)
        - [Model Directive](#modelDir)
    - [WP Service](#service)
        - [Getting a Collection](#collectionSrv)
        - [Getting a Model](#modelSrv)
        - [Add/Update/Delete Operations](#cud)
        - [Authentication](#authentication)
 - [Embedded Responses](#embedding)       
 - [Hints](#hints)    
 - [Issues](#issues)    
 - [Author](#author) 
 - [License](#license)  

 
<a name="features"/>
## Features

[](#features)This library is very flexible and easy to use, you will find everything you need included out of the box:
- [x] WordPress Directives
- [x] WordPress Service
- [x] Authentication
   - [x] Basic Authentication
   - [x] Cookies Authentication

<a name="requirments"/>
## Requirments

**Wordpress** installation.

<a name="installation"/>
## Installation

Install it with npm

`npm install ng2-wp-api --save`
 

<a name="usage"/>
## Usage

Import **ShareButtonsModule** in your module

```ts
import { WordPressModule } from 'ng2-wp-api';

@NgModule({
imports: [
    WordPressModule.forRoot('https://example.com')
  ]
})

```
    
<a name="directives"/>
## Using the directives

`[wpCollection]` to specify which endpoint you want to request the resources e.g. `WpEndpoint.posts`, `WpEndpoint.pages`, `WpEndpoint.categories` ..etc

`[wpArgs]` to specify the arguments of the requests e.g. `{ _embed: true, per_page: 4}`. for more info, check [WordPress Query parameters](https://codex.wordpress.org/Class_Reference/WP_Query#Parameters)

`(wpResponse)` Get the result of your query, which looks like this `$event {data, pagination, error}`

`(wpLoading)` Is helpfull to display loading icon, `$event: boolean`

To get full control on the directive, use the `@ViewChild()

<a name="collectionDir">
**For collection:**

```ts
<div class="feed" [wpCollection]="postsEndpoint" [wpArgs]="postsArgs" (wpResponse)="posts = $event.data">
    <ul>
      <li *ngFor="let post of posts">{{post.title.rendered}}</li>
    </ul>
</div>
```
See collection usage in depth [Collection Gist](https://gist.github.com/MurhafSousli/063e4a374ddf0f7fb87ece5e463c9071)


 - Get a single post by Slug
```ts
<div class="single-post" [wpCollection]="endpoint" [wpArgs]="{slug: 'hello-world'}" (wpResponse)="single = $event.data[0]">
  <h1 [innerHtml]="single?.title?.rendered"></h1>
</div>
```

<a name="modelDir">
**For model:**

 - Get a single post by ID
```ts
<div class="single-post" [wpModel]="endpoint" [wpId]="29043" (wpResponse)="single = $event.data">
  <h1 [innerHtml]="single?.title?.rendered"></h1>
</div>
```

***

<a name="service"/>
## Using the service


<a name="collectionSrv">
**For collection:**

A basic example of getting 6 embedded posts:
  
```ts
/** Posts Response */
posts;
/** Posts Endpoint */
endpoint = WpEndpoint.posts;
/** Posts Args */
args = new {
    per_page: 6,
    _embed: true
};

this.wpService.collection()
  .endpoint(endpoint)       //or posts()
  .get(args)
  .subscribe((res: CollectionResponse) => {
    if(res.error){
      console.log(res.error);
    }
    else{
      this.posts = res.data;
      this.pagination = res.pagination;
    }
  });
```
See [WpService Collection gist](https://gist.github.com/MurhafSousli/6c3f2fd0bf1b9a7b45e7c74d30f40137)

<a name="modelSrv">
**For model:**

```ts
/** Post Response */
post;
/** Post Endpoint */
endpoint = WpEndpoint.posts;

this.wpService.model()
  .endpoint(endpoint)     //or posts() or pages() or users() ..etc
  .get(id)
  .subscribe((res: ModelResponse) => {
    if(res.error){
      console.log(res.error);
    }
    else{
      this.post = res.data;
    }
  });
```

See [WpService Model gist](https://gist.github.com/MurhafSousli/a21a52093779c2b7355f5dc5d45a484c)

***

<a name="cud"/>
## Add/Update/Delete

```ts
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
   
   Install and activate [Basic-Auth Plugin](https://github.com/WP-API/Basic-Auth)
   
```ts
 this.wpService.auth().basic('username', 'password').subscribe(
  (loggedInUser: WpUser)=> {
    console.log(loggedInUser);
  });
```

 - Cookies Authentication:
```ts
 this.wpService.auth().cookies().subscribe(
  (loggedInUser: WpUser)=> {
    console.log(loggedInUser);
  });
```

## WpService Summary

**Default Endpoints** are : `posts`, `pages`, `users`, `categories`, `tags`, `taxonomies`, `statuses`, `comments`, `media`     

```
    WpService
    ├── config 
    |    ├── baseUrl                       ** WordPress baseURL
    |    ├── debug                         ** if enabled, Logs request URL to the console 
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


<a name="embedding"/>
## Embedded Responses

Usually when displaying a post, you want to display post's featured image, categories, tags, author and comments.
The normal post response contains only the Id references which you will have to request each one of them individually.

Embedded responses are very useful to reduce the amount of http requets. you will get all the information you need in one response.

Embedding is triggered by setting the `_embed=true` in args, check [Linking and Embedding](http://v2.wp-api.org/reference/links.html)

And now `WpPost` class will be useful to access the following properties:

```
post                        **  the original object
get(properyName)            **  get any property by its name
id()                        **  post id                  
title()                     **  post title
content()                   **  post content
excerpt()                   **  post excerpt without the (read more) link
date()                      **  post date
type()                      **  post type 
categories()                **  post categories array  
tags()                      **  post tags array
author()                    **  post author object (WpUser)
featuredMedia()             **  check if post has featured image
featuredImageUrl(size)      **  get featured image by size, ("full", large", "medium") or 
                                any other valid size you have in your WP
```

<a name="hints"/>
## Hints

 - Use `WpEndpoint` to get the default endpoints and their addresses.
 - `WpService.collection.posts().get(...)` is a equal to `WpService.Collection.endpoint(WpEndpoint.posts).get(...)`
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


