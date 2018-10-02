import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { HighlightModule } from 'ngx-highlightjs';

import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionPageComponent } from './collection-page/collection-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CollectionRoutingModule,
    ClarityModule,
    ClrFormsNextModule,
    HighlightModule
  ],
  declarations: [CollectionPageComponent]
})
export class CollectionModule {
}
