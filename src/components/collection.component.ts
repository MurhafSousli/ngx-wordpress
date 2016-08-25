import {Component, Input, Output, EventEmitter, SimpleChange, OnChanges} from '@angular/core';

import {WpCollection} from '../service/collection.service';

@Component({
  selector: 'collection',
  providers: [WpCollection],
  template: `<ng-content></ng-content>`
})

export class Collection implements OnChanges{

  /** Inputs for api endpoint and query arguments */
  @Input() endpoint:string;
  @Input() args:any;

  /** Output for the response */
  @Output() response = new EventEmitter();

  private data:any;

  constructor(private wpCollection:WpCollection) {
  }

  /** Detects if args has changed to fetch again. */
  ngOnChanges(changes:{[propName:string]:SimpleChange}) {
    let prevArgs = changes['args'].previousValue;
    let newArgs = changes['args'].currentValue;
    if (prevArgs != newArgs) {
      this.fetch(newArgs);
    }
  }

  /** Get collection of endpoint type */
  public fetch(args):void {
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

  /** Get more collection (next page) */
  public more():void {
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
  public hasMore():boolean {
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
