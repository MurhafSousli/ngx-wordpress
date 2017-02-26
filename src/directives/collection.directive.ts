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

  /** Query args */
  @Input() set wpArgs(query) {
    if (query && this.collection) {
      this.get(query);
    }
  }

  /** Collection wpResponse */
  @Output() wpResponse = new EventEmitter<CollectionResponse>();

  /** Loading state */
  @Output() wpLoading = new EventEmitter<boolean>(false);

  constructor(private wpService: WpService) {

  }

  /** Get collection of items */
  get(args) {
    if (!this.loading) {
      this.loading = true;
      this.wpLoading.emit(this.loading);

      this.collection.get(args).subscribe((res) => {
        this.wpResponse.emit(res);
        this.loading = false;
        this.wpLoading.emit(this.loading);
      });
    }
  }

  /** Get more collection (concat current with next page) */
  more() {
    if (!this.loading) {
      this.loading = true;
      this.wpLoading.emit(this.loading);

      this.collection.more().subscribe((res) => {
        this.wpResponse.emit(res);
        this.loading = false;
        this.wpLoading.emit(this.loading);
      });
    }
  }

  /** Get next collection (next page) */
  next() {
    if (!this.loading) {
      this.loading = true;
      this.wpLoading.emit(this.loading);

      this.collection.next().subscribe((res) => {
        this.wpResponse.emit(res);
        this.loading = false;
        this.wpLoading.emit(this.loading);
      });
    }
  }

  /** Get previous collection (prev page) */
  prev() {
    if (!this.loading) {
      this.loading = true;
      this.wpLoading.emit(this.loading);

      this.collection.prev().subscribe((res) => {
        this.wpResponse.emit(res);
        this.loading = false;
        this.wpLoading.emit(this.loading);
      });
    }
  }
}
