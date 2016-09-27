/*
 *    Common functions for WordPress service.
 */

import {Headers} from "@angular/http";
import {Endpoint} from "./endpoint.model";

export module WpHelper {   

    /** default endpoints */
    export const endpoint:Endpoint = {
        posts: '/wp-json/wp/v2/posts/',
        users: '/wp-json/wp/v2/users/',
        categories: '/wp-json/wp/v2/categories/',
        tags: '/wp-json/wp/v2/tags',
        pages: '/wp-json/wp/v2/pages/',
        comments: '/wp-json/wp/v2/comments/',
        media: '/wp-json/wp/v2/media/',
        statuses: '/wp-json/wp/v2/statuses/',
        taxonomies: '/wp-json/wp/v2/taxonomies/',
        types: '/wp-json/wp/v2/types/',
        basicAuth: '/wp-json/wp/v2/users/me',
    };

    /** get headers with authentication if `authKeys` is available */
    export var authHeaders = (authKeys: string): Headers => {
        let headers = new Headers();
        if (authKeys) {
            headers.append('Authorization', 'Basic ' + authKeys);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
        }
        return headers;
    };

    /** serialize: serialize wp query args object */
    export var serialize = (obj, prefix?): string => {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p) && obj[p]) {
                var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                str.push(typeof v == "object" ?
                    serialize(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    };
}


