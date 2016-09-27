import {Component} from '@angular/core';

import {ConfigService} from 'ng2-wp-api/dist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loading = false;
  errors = [];

  constructor(private wpConfig: ConfigService) {
    /** Set WordPress base URL */
    wpConfig.baseUrl = "http://localhost/wordpress";

    /** Notify when loading state changes */
    wpConfig.loading.subscribe((res) => {
      this.loading = res;
    });

    /** Notify when an error occurs */
    wpConfig.errors.subscribe((res)=> {
      this.errors.push(res);
    });

  }

}
