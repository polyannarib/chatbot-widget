import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ManagementRoutingModule } from './routing/management-routing.module';

import { ManagementComponent } from './management.component';
import { ResourceComponent } from './resource/resource.component';
import { ResourceListComponent } from './resource/resource-list/resource-list.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ManagementComponent, 
    ResourceComponent,
    ResourceListComponent,
    ProjectsComponent,
    ProjectsListComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ManagementRoutingModule
  ]
})
export class ManagementModule { }
