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

// Components modal
import { ResourceDetailsComponent } from './resource/resource-details/resource-details.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ManagementRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    ManagementComponent,
    ResourceListComponent,
    ProjectsListComponent,
    ProjectDetailsComponent,
    ResourceDetailsComponent
  ],
  entryComponents: [
    ProjectDetailsComponent,
    ResourceDetailsComponent
  ]
})
export class ManagementModule { }
