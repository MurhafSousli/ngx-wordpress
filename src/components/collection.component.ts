import {
  Component, Input, Output, EventEmitter, SimpleChanges, OnChanges,
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
    /** Set collection endpoint */
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
  ngOnChanges(changes: SimpleChanges) {

    let chng = changes['args'];
    if(chng){
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      if(cur !== prev) this.get(chng.currentValue);
    }
  }

 /** Get collection of items */
  public get = (args): void => {
    this.collection.get(args).subscribe((res)=> this.response.emit(res));
  };

  /** Get more collection (concat current with next page) */
  public more = (): void => {
    this.collection.more().subscribe((res)=> this.response.emit(res));
  };

  /** Get next collection (next page) */
  public next = (): void => {
    this.collection.next().subscribe((res)=> this.response.emit(res));
  };

  /** Get previous collection (prev page) */
  public prev = (): void => {
    this.collection.prev().subscribe((res)=> this.response.emit(res));
  };
}
