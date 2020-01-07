import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { AuthComponent } from '../auth.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      // { path: 'user', component: AdminUserComponent, data: { scopes: ['ROLE_INVESTOR'] }, children: [
      //   { path: '', redirectTo: 'perfil', pathMatch: 'full' },
      //   { path: 'perfil', component: AdminUserComponent, data: { scopes: ['ROLE_INVESTOR'] } }
      // ]}
    ]
  }
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
    // { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }