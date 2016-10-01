import {
  Component, Input, Output, EventEmitter, SimpleChange, OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';

import {WpService} from '../service/wp.service';
import {CollectionService} from '../service/collection/collection.service';
import {WpQueryArgs} from "../helpers/wp-query.class";

@Component({
  selector: 'wp-collection',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`
})

export class WpCollectionComponent implements OnChanges {

  private collection: CollectionService;

  @Input()
  set endpoint(endpoint) {
    this.collection = this.wpService.collection().endpoint(endpoint);
  }

  /** QueryArgs input */
  @Input() args;

  /** Output for the response */
  @Output() response = new EventEmitter(true);

  constructor(private wpService: WpService) {
    this.args = new WpQueryArgs({});
  }

  /** Detects if args has changed to fetch again. */
  ngOnChanges(changes: {[propName: string]: SimpleChange}) {

    if (changes['args']) {
      let prevArgs = changes['args'].previousValue;
      let newArgs = changes['args'].currentValue;
      if (prevArgs != newArgs) {
        this.get(newArgs);
      }
    }
  }

 /** Get collection of items */
  public get = (args): void => {
    this.collection.get(args).subscribe(
      (res)=> {
        this.response.emit(res);
      }
    );
  };

  /** Get more collection (next page) */
  public more = (): void => {
    this.collection.more().subscribe(
      (res)=> {
        this.response.emit(res);
      }
    );
  };

  /** Get more collection (next page) */
  public next = (): void => {
    this.collection.next().subscribe(
      (res)=> {
        this.response.emit(res);
      }
    );
  };

  /** Get more collection (next page) */
  public prev = (): void => {
    this.collection.prev().subscribe(
      (res)=> {
        this.response.emit(res);
      }
    );
  };
}
