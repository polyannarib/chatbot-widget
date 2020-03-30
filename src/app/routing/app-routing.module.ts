import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'player', loadChildren: '../modules/player/player.module#PlayerModule', canActivate: [AuthGuard] },
  { path: 'management', loadChildren: '../modules/management/management.module#ManagementModule', canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: '../modules/admin/admin.module#AdminModule', canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: '../modules/auth/auth.module#AuthModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }