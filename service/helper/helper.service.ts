import {Headers} from '@angular/http';

/*
 *    Common functions for WordPress service.
 */

export module WpHelper {

  /** default endpoints */
  export enum Endpoint {
    Posts = <any>'/wp-json/wp/v2/posts/',
    Users = <any>'/wp-json/wp/v2/users/',
    Categories = <any>'/wp-json/wp/v2/categories/',
    Tags = <any>'/wp-json/wp/v2/tags',
    Pages = <any>'/wp-json/wp/v2/pages/',
    Comments = <any>'/wp-json/wp/v2/comments/',
    Media = <any>'/wp-json/wp/v2/media/',
    Statuses = <any>'/wp-json/wp/v2/statuses/',
    Taxonomies = <any>'/wp-json/wp/v2/taxonomies/',
    Types = <any>'/wp-json/wp/v2/types/'
  }

  /** generateUrl: generate URL for argument parameters */
  export function generateUrl(baseUrl: string, endpoint: string, args?: any): string {
    let url = baseUrl + endpoint;
    if (args) {
      /** add args to actionUrl */
      url += '?' + serialize(args);
    }
    console.log('[WPService]: ' + url);
    return url;
  }

  /** get headers with authentication if `authKeys` is available */
  export function getHeaders(authKeys:string): Headers {
    let headers = new Headers();
    if (authKeys) {
      headers.append('Authorization', 'Basic ' + authKeys);
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    return headers;
  }

  export function encodeKeys(username: string, password: string): string {
    let decoded = btoa(username + ':' + password);
    let encoded = 'username=' + username + '&password=' + password;
    return encoded;
  }

  export function decodeKeys(encodedCred: string): string {
    let encoded = atob(encodedCred).split(':');
    let decoded = 'username=' + encoded[0] + '&password=' + encoded[1]
    return decoded;
  }

}

/** serialize: serialize wp query args object */
var serialize = function (obj, prefix?): string {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}
