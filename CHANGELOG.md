#Changelog

##2.1.2
    
###Bugs:

 - Fixes `WpHttp`: used to return `Observable.empty()` instead of `Observable.throw(err)`.
    
###Improvements:

 - ModelResponse interface for `WpService.Model()` responses.
 - Errors can be caught from the response for both `CollectionResponse` and `ModelResponse` with `res.error`

###Breaking Changes: 

 - WpService.Model():  model response is now wrapped in ModelResponse object. 
 
    **Before:** 
    ```javascript
    WpService.Model.(...).subscribe((res) => {
        this.data = res.data;
    }
    ```
    **After:** 
    ```
    WpService.Model.(...).subscribe((res: ModelResponse) => {
        if(res.error){
            console.log(res.error);
        }
        else{
            this.data = res.data;
        }
    });
    ```

##2.1.0

Use `WpService.config` instead of `WpConfig` to keep all usages in one service.
    
###Bugs:
    
- Basic Authentication: Fixes request and return observable instead of void

    `WpService.auth().basic(username,password).subscribe(...)`

    
###Features:

- WpService.Collection(): Added `next()` and `prev()` functions

  - `collectionService = wpService.collection().posts().get.subscribe(...)` Get collection
  - `collectionService.more().subscrube(...)` Combine current page with next page collection
  - `collectionService.next().subscrube(...)` Get next page collection
  - `collectionService.prev().subscrube(...)` Get prev page collection

- WpCollectionComponent: Added `next()` and `prev()` functions
    
- Discovery endpoint: Discover if a url has WP API install.
`WpService.discover(url).subscribe(...)`

- Cookies Authentication:
`WpService.auth().cookies().subscribe(...)`

###Breaking Changes:

All helper classes has been prefixed with `Wp`
- `Post` is now `WpPost`
- `User` is now `WpUser`
- `QueryArgs` is now `WpQueryArgs`
- `WpHelper.endpoint` is now `WpEndpoint`
- `WpHelper` is deprecated.
- `authentication` notifier is deprecated from `WpConfig`.

##2.0.1

No changes.
- added keywords to `package.json`

##2.0.0

The service has been rewritten from scratch

##1.2.9

###BREAKING CHANGES: 

* **Before**:
    ```
    import {Collection} from 'ng2-wp-api/ng2-wp-api';
    ```
* **After**:
    ```
    import {Collection} from 'ng2-wp-api';
    ```


##1.2.7

###Bug Fixes: 

* Collection response headers: fix property name for `X-WP-Total` and `X-Wp-Totalpages`