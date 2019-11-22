import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ManagementRoutingModule } from './routing/management-routing.module';

import { ManagementComponent } from './management.component';
import { ResourceListComponent } from './resource/resource-list/resource-list.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ResourceDetailsComponent } from './resource/resource-details/resource-details.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ManagementComponent,
    ResourceListComponent,
    ProjectsListComponent,
    ResourceDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ManagementRoutingModule
  ],
  entryComponents: [
    ResourceDetailsComponent
  ]
})
export class ManagementModule { }
