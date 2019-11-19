import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full' },
  {path: 'auth', loadChildren: '../modules/auth/auth.module#AuthModule' },
  {path: 'management', loadChildren: '../modules/management/management.module#ManagementModule' },
  // {path: 'home', loadChildren: '../modules/home/home.module#HomeModule' },
  // {path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
