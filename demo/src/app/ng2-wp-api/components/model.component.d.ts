import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { WpService } from '../service/wp.service';
import { WpQueryArgs } from "../helpers/wp-query.class";
export declare class WpModelComponent implements OnChanges {
    private wpService;
    private model;
    /** Inputs for api endpoint, query arguments and model id */
    endpoint: string;
    /** Model Id, the component will refresh the request on id changes */
    id: number;
    /** Model QueryArgs */
    args: WpQueryArgs;
    /** Output for the response */
    response: EventEmitter<{}>;
    constructor(wpService: WpService);
    /** Detects if args has changed to fetch again. */
    ngOnChanges(changes: SimpleChanges): void;
    /** Get a model of endpoint type by id */
    get(id: any, args?: any): void;
}
