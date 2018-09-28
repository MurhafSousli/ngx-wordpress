import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { HighlightModule } from 'ngx-highlightjs';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';

import { WordPressModule } from '@ngx-wordpress/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertsComponent } from './alerts/alerts.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ClarityModule,
    ClrFormsNextModule,
    BrowserAnimationsModule,
    HighlightModule.forRoot(),
    NgProgressModule.forRoot(),
    NgProgressHttpModule.forRoot(),
    NgProgressRouterModule.forRoot(),
    WordPressModule.forRoot({
      baseUrl: 'https://wordpress-site.com',
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

