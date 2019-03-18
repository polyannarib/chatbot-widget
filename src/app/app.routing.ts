import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


const APP_ROUTES: Routes = [
    {path:'', component: LoginComponent },
    {path:'login', component: LoginComponent },
    {path:'dashboard', component: DashboardComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
