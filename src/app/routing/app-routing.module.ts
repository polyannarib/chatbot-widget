import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'player', loadChildren: '../modules/player/player.module#PlayerModule', canLoad:[AuthGuard], canActivate:[AuthGuard], data: { scopes: ['WP.PLAYER'] } },
  { path: 'management', loadChildren: '../modules/management/management.module#ManagementModule', canLoad:[AuthGuard], canActivate:[AuthGuard], data: { scopes: ['WP.Admin', 'WP.LEADER'] } },
  // { path: 'admin', loadChildren: '../modules/admin/admin.module#AdminModule', canLoad:[AuthGuard], canActivate:[AuthGuard], data: { scopes: ['wp.player'] } },
  { path: 'auth', loadChildren: '../modules/auth/auth.module#AuthModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }