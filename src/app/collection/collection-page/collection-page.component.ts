import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WpCollection, WpCollectionRef } from '@ngx-wordpress/core';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionPageComponent implements OnInit {

  @WpCollection('posts') posts: WpCollectionRef;

  searchKey: string;
  getLoading: ClrLoadingState = ClrLoadingState.DEFAULT;
  moreLoading: ClrLoadingState = ClrLoadingState.DEFAULT;
  nextLoading: ClrLoadingState = ClrLoadingState.DEFAULT;
  prevLoading: ClrLoadingState = ClrLoadingState.DEFAULT;

  get() {
    this.getLoading = ClrLoadingState.LOADING;
    this.posts.get({search: this.searchKey}).subscribe(res => {
      this.getLoading = res.error
        ? ClrLoadingState.ERROR
        : ClrLoadingState.SUCCESS;
    });
  }

  more() {
    this.moreLoading = ClrLoadingState.LOADING;
    this.posts.more().subscribe(res => {
      this.moreLoading = res.error
        ? ClrLoadingState.ERROR
        : ClrLoadingState.SUCCESS;
    });
  }

  next() {
    this.nextLoading = ClrLoadingState.LOADING;
    this.posts.next().subscribe(res => {
      this.nextLoading = res.error
        ? ClrLoadingState.ERROR
        : ClrLoadingState.SUCCESS;
    });
  }

  prev() {
    this.prevLoading = ClrLoadingState.LOADING;
    this.posts.prev().subscribe(res => {
      this.prevLoading = res.error
        ? ClrLoadingState.ERROR
        : ClrLoadingState.SUCCESS;
    });
  }

  ngOnInit() {
    this.get();
  }

}
