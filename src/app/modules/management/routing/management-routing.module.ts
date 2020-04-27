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
      { path: 'dashboard', component: DashboardComponent, data: { scopes: ['wpplayer', 'wpleader', 'wpboss', 'wprule', 'wpmaster'] } },
      { path: 'resource/find', component: ResourceFindComponent, data: { scopes: ['wpleader', 'wpboss', 'wprule', 'wpmaster'] } },
      { path: 'import/project', component: ProjectImportComponent, data: { scopes: ['wpleader', 'wpboss', 'wprule', 'wpmaster'] } }
    ], data: { scopes: ['wpplayer', 'wpleader', 'wpboss', 'wprule', 'wpmaster'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(APP_ROUTES)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
