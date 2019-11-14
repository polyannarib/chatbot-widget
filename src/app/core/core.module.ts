import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Todos os serviços
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './guards/auth-guard';
import { ProjectService } from './services/project.service';
import { LoadingService } from './services/loading.service';
import { TaskService } from './services/task.service';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpsRequestInterceptor } from './interceptors/auth-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ProjectService,
    LoadingService, 
    TaskService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class CoreModule { }
