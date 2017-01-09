import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WordPressModule } from './ng2-wp-api';
import { PartialComponent } from './partial/partial.component';
import { SiderComponent } from './sider/sider.component'

@NgModule({
  declarations: [
    AppComponent,
    PartialComponent,
    SiderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WordPressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
