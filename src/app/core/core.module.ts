import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './guards/auth-guard';
import { ProjectService } from './services/project.service';
import { LoadingService } from './services/loading.service';
import { TaskService } from './services/task.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ProjectService,
    LoadingService, 
    TaskService,
    AuthGuardService
  ]
})
export class CoreModule { }
