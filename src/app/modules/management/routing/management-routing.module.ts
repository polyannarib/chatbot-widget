import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementComponent } from '../management.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ResourceFindComponent } from '../resource/resource-find/resource-find.component';
import { ProjectImportComponent } from '../projects/project-import/project-import.component';

const APP_ROUTES: Routes = [
  {
    path: '', component: ManagementComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'resource/find', component: ResourceFindComponent },
      { path: 'import/project', component: ProjectImportComponent },
      // { path: 'user', component: AdminUserComponent, data: { scopes: ['ROLE_INVESTOR'] }, children: [
      //   { path: '', redirectTo: 'perfil', pathMatch: 'full' },
      //   { path: 'perfil', component: AdminUserComponent, data: { scopes: ['ROLE_INVESTOR'] } }
      // ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(APP_ROUTES)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
