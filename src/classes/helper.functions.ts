export module Helper {

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
}
