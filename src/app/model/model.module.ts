import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { HighlightModule } from 'ngx-highlightjs';

import { ModelRoutingModule } from './model-routing.module';
import { ModelPageComponent } from './model-page/model-page.component';
import { ModelFormDialogComponent } from './model-form-dialog/model-form-dialog.component';
import { ModelDeleteDialogComponent } from './model-delete-dialog/model-delete-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModelRoutingModule,
    ClarityModule,
    ClrFormsNextModule,
    HighlightModule
  ],
  declarations: [
    ModelPageComponent,
    ModelFormDialogComponent,
    ModelDeleteDialogComponent
  ]
})
export class ModelModule {
}
