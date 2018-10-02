import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import { HomePageComponent } from './home-page/home-page.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ClarityModule,
  ],
  declarations: [HomePageComponent]
})
export class HomeModule { }
