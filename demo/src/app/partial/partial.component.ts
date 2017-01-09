import {Component, ViewChild, OnInit} from '@angular/core';

import {WpCollectionComponent, WpEndpoint, CollectionResponse, WpQueryArgs} from "ng2-wp-api";

@Component({
  selector: 'app-partial',
  templateUrl: './partial.component.html',
  styleUrls: ['./partial.component.scss']
})
export class PartialComponent implements OnInit {

  endpoint = WpEndpoint.posts;
  args = {
    per_page: 2,
    page: 1
  };

  posts;
  pagination;
  error;

  @ViewChild(WpCollectionComponent) collection: WpCollectionComponent;

  constructor() {
  }

  ngOnInit() {
  }

  wpResponse(event: CollectionResponse) {
    if(event.error){
      this.error = event.error;
    }
    else{
      this.pagination = event.pagination;
      this.posts = event.data;
      this.error = false;
    }
  }

  test() {

    this.collection.prev();
  }

  test2() {

    this.collection.next();
  }

  test3() {
    this.collection.more();

  }
}
