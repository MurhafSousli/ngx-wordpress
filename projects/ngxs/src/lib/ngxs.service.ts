import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { WordPress } from '@ngx-wordpress/core';

@Injectable({
  providedIn: 'root'
})
export class WordPressStore {

  constructor(private store: Store, private wp: WordPress) { }
}
