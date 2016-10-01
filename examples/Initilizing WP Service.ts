import {Component, OnInit} from '@angular/core';

import {WpService} from 'ng2-wp-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  loading = false;
  errors = [];

  constructor(private wpService: WpService) {
  }

  ngOnInit(){
    /** Set WordPress base URL */
    this.wpService.config.baseUrl = "http://localhost/wordpress";

    /** Notify when loading state changes */
    this.wpService.config.loading.subscribe((res) => {
      this.loading = res;
    });

    /** Notify when an error occurs */
    this.wpService.config.errors.subscribe((res)=> {
      this.errors.push(res);
    });
  }

}
