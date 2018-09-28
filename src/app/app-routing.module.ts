import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: '', loadChildren: './home/home.module#HomeModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'collection', loadChildren: './collection/collection.module#CollectionModule' },
  { path: 'model', loadChildren: './model/model.module#ModelModule' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
