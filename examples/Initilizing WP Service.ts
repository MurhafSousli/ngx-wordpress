import {Component, ViewEncapsulation } from '@angular/core';

import {WORDPRESS_PROVIDERS, WpState} from "ng2-wp-api/ng2-wp-api";

@Component({
  selector: 'app',
  providers:[WORDPRESS_PROVIDERS],
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styleUrls: [],
  template: `
     <h1>Root Component</h1>
     <main>
        <router-outlet></router-outlet>
     </main>
    `
})

export class App {

    constructor(wpState: WpState){
        wpState.setBaseUrl("http://yourWordPressDomain.com");
        /*
         * Setting up Authentication Keys is necessory if you want to make Add/Update/Delete requests,
         * Pass your wordpress username and password in `setAuthKeys($username, $password)`
         */
        wpState.setAuthKeys("yourUsername", "yourPassword");
    }
}