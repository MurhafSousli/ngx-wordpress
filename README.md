<p align="center">
  <img height="200px" width="200px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ngx-wordpress/1b8cec0a0412eb098545fdb3df5e85d824e4408b/assets/logo.svg">
  <h1 align="center">Angular WordPress Module</h1>
</p>

This library is designed to make it easy for your Angular application to request specific resources from a WordPress install.

[![npm](https://img.shields.io/npm/v/ngx-wordpress.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-wordpress)
[![Build Status](https://travis-ci.org/MurhafSousli/ngx-wordpress.svg?branch=master)](https://travis-ci.org/MurhafSousli/ngx-wordpress)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

**[Wiki Documentation](https://github.com/MurhafSousli/ngx-wordpress/wiki)**

## Installation

 - NPM `npm i -S @ngx-wordpress/core`
 - YARN `yarn add @ngx-wordpress/core`

```ts
import { WordPressModule } from '@ngx-wordpress/core';

@NgModule({
  // ..
  imports: [
    WordPressModule.forRoot({
      baseUrl: 'https://my-wordpress-site.com'
    })
  ]
})
export class AppModule {}
```

## Decorators

 - `@WpCollection()` For lists and pagination
 - `@WpModel()` For CRUD operations
 - `@WpAuth()` For authentication
 - `@WpError()` For error handling
  
 
### WP Collection

Whenever you want to get a list of somethings (posts, categories, tags, users ...etc), use the `@WpCollection()` decorator.

It provides  

#### WP Collection Example

```ts
import { Component } from '@angular/core';
import { WpCollection, WpCollectionRef } from '@ngx-wordpress/core';

@Component({
  selector: 'app-collection-page',
  template: `
     <div *ngIf="posts.state | async; let state">
    
        <span *ngIf="state.error" class="error">{{state.error.message}}</span>
      
        <span *ngIf="state.loading" class="spinner">Loading...</span>
        
        <div *ngIf="state.data" class="post">
          <div class="post-title">{{state.data.title}}</div>
          <div class="post-content" [innerHTML]="state.data.content"></div>
        </div>
    </div>
  `,
})
export class CollectionPageComponent {

  @WpCollection('posts') posts: WpCollectionRef;

  getPosts() {
    this.posts.get({search: this.searchKey}).subscribe()
    // this.posts.more().subscribe()
    // this.posts.next().subscribe()
    // this.posts.prev().subscribe();
  }
}
```

### WP Collection API

| Name                       | Description                                                            |
| -------------------------- | ---------------------------------------------------------------------- |
| **state**                  | *Stream that emits collection state*                                   |
| **data**                   | *Stream that emits collection data array*                              |
| **pagination**             | *Stream that emits collection pagination state*                        |
| **loading**                | *Stream that emits collection loading state*                           |
| **error**                  | *Stream that emits when an error occurs*                               |
| **get(query?)**            | *Get a collection of objects*                                          |
| **more()**                 | *Get the collection of the next page combined with the existing one*   |
| **next()**                 | *Get the collection of the next page*                                  | 
| **prev()**                 | *Get the collection of the previous page*                              |
| **destroy()**              | *Closes the state stream and un-subscribers all its subscriptions*     |


#### WP Collection Example

```ts
import { Component } from '@angular/core';
import { WpModel, WpModelRef } from '@ngx-wordpress/core';

@Component({
  selector: 'app-single-post-page',
  template: `
    <div *ngIf="posts.state | async; let state">
    
        <span *ngIf="state.error" class="error">{{state.error.message}}</span>
      
        <span *ngIf="state.loading" class="spinner">Loading...</span>
        
        <div *ngIf="state.data" class="post">
          <div class="post-title">{{state.data.title}}</div>
          <div class="post-content" [innerHTML]="state.data.content"></div>
        </div>
    </div>
  `,
})
export class SinglePostPageComponent {

  @WpModel('posts') wpModel: WpModelRef;

  getPost() {
    this.wpModel.get().subscribe();
  }
}
```

### WP Model API

| Name                       | Description                                                            |
| -------------------------- | ---------------------------------------------------------------------- |
| **state**                  | *Stream that emits collection state*                                   |
| **data**                   | *Stream that emits collection data array*                              |
| **loading**                | *Stream that emits collection loading state*                           |
| **error**                  | *Stream that emits when an error occurs*                               |
| **get(id)**                | *Get a single object by id*                                            |
| **create(body)**           | *Create an object*                                                     |
| **update(id, body)**       | *Update an existing object by id*                                      | 
| **delete(id)**             | *Delete an existing object by id*                                      |
| **destroy()**              | *Closes the state stream and un-subscribers all its subscriptions*     |

### WP Config API

| Name                   | Default                  | Description                                               |
| ---------------------- |------------------------- | --------------------------------------------------------- |
| **baseUrl**            | null                     | *WordPress base URL*                                      |
| **restUrl**            | `/wp-json/wp/v2/`        | *Rest API URL*                                            |
| **authUrl**            | `/wp-json/jwt-auth/v1/`  | *Rest API URL*                                            |
| **postFilters**        | DefaultFilters           | *Functions that filter post properties*                   |
| **getToken**           | Function                 | *Get token from the storage function*                     | 
| **setToken**           | Function                 | *Set token from the storage function*                     |
| **removeToken**        | Function                 | *Remove token from the storage function*                  |

## Authentication
  
**Requirements:**
  
  - **Install [JSON Basic Authentication](https://github.com/WP-API/Basic-Auth) in your WordPress site.**
   *You have to download and upload it manually to your WordPress site.*
  - **Install [JWT Authentication for WP-API](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) in your WordPress site.**
   *Available at the plugins store*
  - **Install [WP REST User](https://wordpress.org/support/plugin/wp-rest-user) if you want to enable user registration.**
   *Available at the plugins store*

Set the JWT token functions `setToken()` and `removeToken()` for the storage

```ts
import { WordPressModule } from '@ngx-wordpress/core';

// The function that stores the token into the storage
export function setToken(token: string) {
  localStorage.setItem('token', token);
}

// The function that removes the token from the storage
export function removeToken() {
  localStorage.removeItem('token');
}

@NgModule({
  // ..
  imports: [
    WordPressModule.forRoot({
      baseUrl: 'https://my-wordpress-site.com',
      setToken: setToken,
      removeToken: removeToken
    })
  ]
})
export class AppModule {}
```

For Ionic use:

```ts
// The function that stores the token into the storage
export function setToken(token: string) {
  localStorage.setItem('token', token);
}

// The function that removes the token from the storage
export function removeToken() {
  localStorage.removeItem('token');
}
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';

export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    }
  }
}

// ...

@NgModule({
  // ...
  imports: [
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    })
  ]
})
```

More info about the JWT Module can be found on [@auth0/angular-jwt](https://github.com/auth0/angular2-jwt) page

## Author

 **[Murhaf Sousli](http://murhafsousli.com)**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)

## More plugins

  - ☄ [Progress bar](https://github.com/MurhafSousli/ngx-progressbar) for requests 
  - ☂ [Sharebuttons](https://github.com/MurhafSousli/ngx-sharebuttons) for posts 
  - 💬 [Disqus](https://github.com/MurhafSousli/ngx-disqus) for Disqus comment system
  - 🖼 [Gallery (lightbox)](https://github.com/MurhafSousli/ngx-gallery) for lightbox galleries
