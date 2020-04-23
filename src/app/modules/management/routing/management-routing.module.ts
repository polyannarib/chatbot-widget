import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementComponent } from '../management.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ResourceFindComponent } from '../resource/resource-find/resource-find.component';
import { ProjectImportComponent } from '../projects/project-import/project-import.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const APP_ROUTES: Routes = [
  {
    path: '', component: ManagementComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { scopes: ['wpadmin', 'wpleader'] } },
      { path: 'resource/find', component: ResourceFindComponent, data: { scopes: ['wpadmin', 'wpleader'] } },
      { path: 'import/project', component: ProjectImportComponent, data: { scopes: ['wpadmin', 'wpleader'] } }
    ], data: { scopes: ['wpadmin', 'wpleader'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(APP_ROUTES)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
