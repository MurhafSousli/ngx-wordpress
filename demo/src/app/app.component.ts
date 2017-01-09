import {Component, OnInit, enableProdMode} from '@angular/core';

import {WpService} from 'ng2-wp-api';


enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  loading = false;
  errors = [];

  constructor(private wpService: WpService) {

    wpService.config.baseUrl = "http://localhost/wordpress";

    wpService.config.loading.subscribe((res) => {
      this.loading = res;
    });

    wpService.config.errors.subscribe((res)=> {
      this.errors.push(res);
    });

  }

  ngOnInit() {
    // let url = "http://localhost/wordpress";
    // this.wpService.discover(url).subscribe((res)=> {
    //   if (res) {
    //     console.log('worked');
    //   }
    // });
  }

}
