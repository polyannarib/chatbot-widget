import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
// import { AuthGuardService } from './guards/auth-guard';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent, children: [
        { path: '', redirectTo: 'perfil', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent }
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(APP_ROUTES)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
