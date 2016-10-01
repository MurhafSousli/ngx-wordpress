import {Component} from '@angular/core';

import {WpService} from 'ng2-wp-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loading = false;
  errors = [];

  constructor(private wpService: WpService) {
    /** Set WordPress base URL */
    wpService.config.baseUrl = "http://localhost/wordpress";

    /** Notify when loading state changes */
    wpService.config.loading.subscribe((res) => {
      this.loading = res;
    });

    /** Notify when an error occurs */
    wpService.config.errors.subscribe((res)=> {
      this.errors.push(res);
    });

  }

}
