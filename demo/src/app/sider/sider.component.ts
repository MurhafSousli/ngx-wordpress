import {Component, OnInit} from '@angular/core';
import {WpQueryArgs, WpEndpoint, WpService, CollectionResponse, ModelResponse} from '../ng2-wp-api';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent implements OnInit {
  args;
  endpoint = WpEndpoint.posts;
  posts;

  collection;

  constructor(private wpService: WpService) {

  }

  ngOnInit() {
    this.args = new WpQueryArgs({
      per_page: 4
    });
    this.collection = this.wpService.collection().posts();
    this.collection.get(this.args).subscribe((res: CollectionResponse) => {
      this.posts = res.data;
    });
  }

  test() {
    this.args = new WpQueryArgs({
      per_page: 2,
      page: 1
    });
    this.collection.get(this.args).subscribe(
      (res: CollectionResponse) => {
        if (res) {
          this.posts = res.data;
        }
      });
  }

  test2() {
    // this.args = new WpQueryArgs({
    //   per_page: 3,
    //   page: 3
    // });
    // this.collection.get(this.args).subscribe(
    //   (res: CollectionResponse) => {
    //     if (res) {
    //       this.posts = res.data;
    //     }
    //   });
    this.wpService.auth().basic('murhaf', 'maxis05').subscribe(
      (res)=> {
        console.log(res);
      });
  }

  test3() {
    this.collection.more().subscribe((res: CollectionResponse) => {
      if (res) {

        this.posts = res.data;
      }
    });

  }

  single;
  error;
  wpResponse(event:ModelResponse) {
    if(event.error){
      this.error= event.error;
    }
    this.single = event;
  }


}
