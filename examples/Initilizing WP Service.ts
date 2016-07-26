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
         * To make Add/Update/Delete requests pass your
         * Wordpress username and password
         */
        wpState.setAuthKeys("username", "password");
    }
}