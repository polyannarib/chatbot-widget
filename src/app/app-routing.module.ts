import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guards/auth-guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

const APP_ROUTES: Routes = [
  {path:'login', canActivate: [AuthGuardService,AuthenticatedGuard], component: LoginComponent },
  {path:'home', loadChildren: './home/home.module#HomeModule',canActivate: [AuthGuardService]},
  {path:'', redirectTo: '/home/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
