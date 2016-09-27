#Changelog

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