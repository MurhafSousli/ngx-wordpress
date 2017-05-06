import { Directive, Input, EventEmitter, Output } from '@angular/core';

import { WpService } from '../service/wp.service';
import { CollectionService } from '../service/collection/collection.service';
import { CollectionResponse } from '../service/collection/collection.interface';

@Directive({
  selector: '[wpCollection]'
})
export class CollectionDirective {

  private collection: CollectionService;
  private loading: boolean = false;

  /** Collection endpoint */
  @Input('wpCollection') set endpoint(endpoint) {

    this.collection = <CollectionService>this.wpService.collection().endpoint(endpoint);
  }

  /** Collection query args */
  @Input() set wpArgs(query) {
    if (query && this.collection) {
      this.get(query);
    }
  }

  /** Collection response */
  @Output() wpResponse = new EventEmitter<CollectionResponse>();

  /** Collection loading state */
  @Output() wpLoading = new EventEmitter<boolean>(false);

  constructor(private wpService: WpService) {

  }

  /** Get collection of items */
  get(args) {
    if (!this.loading) {
      this.beforeResponse();
      this.collection.get(args).subscribe(res => this.afterResponse(res));
    }
  }

  /** Get more collection (concat current with next page) */
  more() {
    if (!this.loading) {
      this.beforeResponse();
      this.collection.more().subscribe(res => this.afterResponse(res));
    }
  }

  /** Get next collection (next page) */
  next() {
    if (!this.loading) {
      this.beforeResponse();
      this.collection.next().subscribe(res => this.afterResponse(res));
    }
  }

  /** Get previous collection (prev page) */
  prev() {
    if (!this.loading) {
      this.beforeResponse();
      this.collection.prev().subscribe(res => this.afterResponse(res));
    }
  }

  beforeResponse() {
    this.loading = true;
    this.wpLoading.emit(this.loading);
  }

  afterResponse(res) {
    this.wpResponse.emit(res);
    this.loading = false;
    this.wpLoading.emit(this.loading);
  }
}
