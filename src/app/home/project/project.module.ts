import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ReactiveFormsModule }   from '@angular/forms';

@NgModule({
  declarations: [ProjectComponent, ProjectDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectComponent,
      },
      {
        path: 'details/:id',
        component: ProjectDetailsComponent
      }
    ]),
    TranslateModule
  ]
})
export class ProjectModule { }
