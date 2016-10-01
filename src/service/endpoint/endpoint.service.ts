import {Injectable} from '@angular/core';

import {EndpointInterface} from "../endpoint/endpoint.interface";
import {CollectionService} from "../collection/collection.service";
import {ModelService} from "../model/model.service";
import {WpHttp} from "../../helpers/wp-http.class";
import {WpEndpoint} from "../../helpers/wp-endpoints";

@Injectable()
export class EndpointService implements EndpointInterface {

    constructor(private _http: WpHttp, private _type: string) {

    }

    /**
     * Switch service type (any)
     * @param endpoint
     * @returns {any}
     */
    private swithcer(endpoint:any): any{
        if(this._type === 'collection'){
            return new CollectionService(this._http, endpoint);
        }
        return new ModelService(this._http, endpoint);
    }

    public endpoint = (endpoint: string): any => {
        return this.swithcer(endpoint);
    };

    public posts = ():  any => {
        let endpoint = WpEndpoint.posts;
        return this.swithcer(endpoint);
    };
    public users = ():  any=> {
        let endpoint = WpEndpoint.users;
        return this.swithcer(endpoint);
    };
    public categories = ():  any => {
        let endpoint = WpEndpoint.categories;
        return this.swithcer(endpoint);
    };
    public pages = ():  any=> {
        let endpoint = WpEndpoint.pages;
        return this.swithcer(endpoint);
    };

    public tags = ():  any=> {
        let endpoint = WpEndpoint.tags;
        return this.swithcer(endpoint);
    };

    public comments = ():  any=> {
        let endpoint = WpEndpoint.comments;
        return this.swithcer(endpoint);
    };

    public media = ():  any=> {
        let endpoint = WpEndpoint.media;
        return this.swithcer(endpoint);
    };

    public taxonomies = ():  any => {
        let endpoint = WpEndpoint.taxonomies;
        return this.swithcer(endpoint);
    };

    public statuses = ():  any=> {
        let endpoint = WpEndpoint.statuses;
        return  this.swithcer(endpoint);
    };

    public types = ():  any=> {
        let endpoint = WpEndpoint.types;
        return this.swithcer(endpoint);
    };
}
