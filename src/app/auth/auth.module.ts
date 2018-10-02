import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';

import { HighlightModule } from 'ngx-highlightjs';

import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ClarityModule,
    ClrFormsNextModule,
    HighlightModule
  ],
  declarations: [AuthPageComponent]
})
export class AuthModule { }
