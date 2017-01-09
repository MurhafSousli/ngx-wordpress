import { EndpointInterface } from "../endpoint/endpoint.interface";
import { WpHttp } from "../../helpers/wp-http.class";
export declare class EndpointService implements EndpointInterface {
    private _http;
    private _type;
    constructor(_http: WpHttp, _type: string);
    /**
     * Switch service type (any)
     * @param endpoint
     * @returns {any}
     */
    private swithcer(endpoint);
    endpoint: (endpoint: string) => any;
    posts: () => any;
    users: () => any;
    categories: () => any;
    pages: () => any;
    tags: () => any;
    comments: () => any;
    media: () => any;
    taxonomies: () => any;
    statuses: () => any;
    types: () => any;
}
