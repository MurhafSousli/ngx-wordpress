import { EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { WpService } from '../service/wp.service';
export declare class WpCollectionComponent implements OnChanges {
    private wpService;
    private collection;
    endpoint: any;
    /** QueryArgs input */
    args: any;
    /** Output for the response */
    response: EventEmitter<{}>;
    constructor(wpService: WpService);
    /** Detects if args has changed to fetch again. */
    ngOnChanges(changes: SimpleChanges): void;
    /** Get collection of items */
    get: (args: any) => void;
    /** Get more collection (concat current with next page) */
    more: () => void;
    /** Get next collection (next page) */
    next: () => void;
    /** Get previous collection (prev page) */
    prev: () => void;
}
