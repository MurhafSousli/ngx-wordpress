import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';

const appRoutes: Routes = [{ path: '', component: AuthPageComponent }];

@NgModule({
  imports: [FormsModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
