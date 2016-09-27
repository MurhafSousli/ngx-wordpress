import {Injectable} from '@angular/core';

import {EndpointInterface} from "../endpoint/endpoint.interface";
import {CollectionService} from "../collection/collection.service";
import {ModelService} from "../model/model.service";
import {WpHttp} from "../../classes/wp.http";
import {WpHelper} from '../../classes/wp.helper';

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
    }

    public posts = ():  any => {
        let endpoint = WpHelper.endpoint.posts;
        return this.swithcer(endpoint);
    }
    public users = ():  any=> {
        let endpoint = WpHelper.endpoint.users;
        return this.swithcer(endpoint);
    }
    public categories = ():  any => {
        let endpoint = WpHelper.endpoint.categories;
        return this.swithcer(endpoint);
    }
    public pages = ():  any=> {
        let endpoint = WpHelper.endpoint.pages;
        return this.swithcer(endpoint);
    }

    public tags = ():  any=> {
        let endpoint = WpHelper.endpoint.tags;
        return this.swithcer(endpoint);
    }

    public comments = ():  any=> {
        let endpoint = WpHelper.endpoint.comments;
        return this.swithcer(endpoint);
    }

    public media = ():  any=> {
        let endpoint = WpHelper.endpoint.media;
        return this.swithcer(endpoint);
    }

    public taxonomies = ():  any => {
        let endpoint = WpHelper.endpoint.taxonomies;
        return this.swithcer(endpoint);
    }

    public statuses = ():  any=> {
        let endpoint = WpHelper.endpoint.statuses;
        return  this.swithcer(endpoint);
    }

    public types = ():  any=> {
        let endpoint = WpHelper.endpoint.types;
        return this.swithcer(endpoint);
    }
}
