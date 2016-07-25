import {Component, Input, Output, EventEmitter, SimpleChange} from '@angular/core';

import {WpCollection} from '../../service';

@Component({
  selector: 'collection',
  providers: [WpCollection],
  template: `<ng-content></ng-content>`
})

export class Collection {

  /** Inputs for api endpoint and query arguments */
  @Input() endpoint;
  @Input() args = {};

  /** Output for the response */
  @Output() response = new EventEmitter();

  private data;

  constructor(private wpCollection:WpCollection) {
  }

  /** Detects if args has changed to fetch again. */
  ngOnChanges(changes:{[propName:string]:SimpleChange}) {
    let prevArgs = changes['args'].previousValue;
    let newArgs = changes['args'].currentValue;
    if (prevArgs != newArgs) {
      setTimeout(() => this.fetch(newArgs));
    }
  }

 /** Get collection of endpoint type */
  fetch(args) {
    this.wpCollection.Endpoint(this.endpoint).get(args).subscribe(
      (res) => {
        this.data = res;
        this.response.emit({
          objects: this.data,
          currentPage: this.wpCollection.service.currentPage,
          totalPages: this.wpCollection.service.totalPages,
          totalObjects: this.wpCollection.service.totalObjects
        });
      },
      (err) => {
        this.response.emit({error: err});
      }
    );
  }

 /** Get more collection if available */
  more() {
    this.wpCollection.Endpoint(this.endpoint).more().subscribe(
      (res) => {
        this.data = this.data.concat(res);
        this.response.emit({
          objects: this.data,
          currentPage: this.wpCollection.service.currentPage,
          totalPages: this.wpCollection.service.totalPages,
          totalObjects: this.wpCollection.service.totalObjects
        });
      },
      (err) => {
        this.response.emit({error: err});
      }
    );
  }

  /** Check if WP has more collection */
  hasMore() {
    return this.wpCollection.service.hasMore();
  }

}


/*
 * Collection component fetches data from WpCollection service,
 * it has 2 properties:
 *  - @INPUT: args
 *  - @INPUT: endpoint
 *  - @OUTPUT: response
 *  The data are fetched when args changes.
 */
