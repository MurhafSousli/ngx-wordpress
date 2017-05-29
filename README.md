<p align="center">
  <img height="200px" width="200px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ngx-wordpress/1b8cec0a0412eb098545fdb3df5e85d824e4408b/assets/logo.svg">
  <h1 align="center">Angular WordPress Module</h1>
</p>

This library is designed to make it easy for your Angular application to request specific resources from a WordPress install.

- 🔌 **WordPress Rest API** `WordPressModule.forRoot(WordPressDomain)`

- 🏰 **WordPress RX Service**

   - Get post `wpService.collection().posts().get(postQueryArgs).subscribe(res => posts = res.data)`
   - Add new post `wpService.collection().posts().add(newPost).subscribe(res => newPost = res.data )`
   - Get post by Id `wpService.model().posts().get(postId).subscribe(res => post = res.data)`
   - Update page `wpService.model().pages().add(pageId, page).subscribe(res => page = res.data )`
   - Delete post `wpService.model().posts().delete(postId).subscribe(res => res)`

- 🤹‍ **Wordpress Directives**

```html
<!--   Get collection of posts   -->
 
<ul [wpCollection]="'posts'" [wpArgs]="postQueryArgs" (wpResponse)="posts = $event">
  <li *ngFor="let post of res.data"> {{ post.title.rendered }} </li>
</ul>
    
<!--   Get post by ID   -->

<div [wpModel]="'pages'" [wpId]="123" [wpResponse]="res = $event"> {{res?.data.title.rendered}} </div>
```
- 🚦 **Authentication**

  - 🗝 Basic authentication `wpService.auth().basic(username, password, remember?)`   
  - 🍪 Cookies authentication `wpService.auth().cookies()`
  
- 🍦 **Helper functions to access data in post responses** ✔
- ⚡ **Photon CDN**
 
- 🛠 **Blog assests**:

  - ☄ [Progress bar](https://github.com/MurhafSousli/ngx-progressbar) for requests 
  - ☂ [Sharebuttons](https://github.com/MurhafSousli/ngx-sharebuttons) for posts 
  - 💬 [Disqus](https://github.com/MurhafSousli/ngx-disqus) for comments 
  - 🖼 [Modal (lightbox)](https://github.com/MurhafSousli/ng-gallery) for post images 
___

[![npm](https://img.shields.io/npm/v/ngx-wordpress.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-wordpress)
[![Build Status](https://travis-ci.org/MurhafSousli/ngx-wordpress.svg?branch=master)](https://travis-ci.org/MurhafSousli/ngx-wordpress)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

**[Wiki Documentation](https://github.com/MurhafSousli/ngx-wordpress/wiki)**

## Author

 **[Murhaf Sousli](http://murhafsousli.com)**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)



