import { Headers } from '@angular/http';

export module Helper {

    export const domain = (url: string) => {
        let matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        return matches && matches[1];
    };

    /** Serialize query arguments */
    export const serialize = (obj, prefix?): string => {
        let str = [];
        for (let p in obj) {
            if (obj.hasOwnProperty(p) && obj[p]) {
                let k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
                str.push(typeof v === 'object' ?
                    serialize(v, k) :
                    encodeURIComponent(k) + '=' + encodeURIComponent(v));
            }
        }
        return str.join('&');
    };

    export const basicHeaders = (keys: string): Headers => {
        let headers = new Headers();
        if (keys) {
            headers.append('Authorization', 'Basic ' + keys);
        }
        return headers;
    };

    export const cookiesHeaders = (keys: string): Headers => {
        let headers = new Headers();
        if (keys) {
            headers.append('X-WP-Nonce', keys);
        }
        return headers;
    };
}
