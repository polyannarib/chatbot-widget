import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Todos os serviços
import { AuthService } from './services/auth.service';
import { ProjectService } from './services/project.service';
import { LoadingService } from './services/loading.service';
import { TaskService } from './services/task.service';
import { NoteService } from './services/note.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInverceptor } from './interceptors/http-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { ProfileService } from './services/profile.service';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    ProjectService,
    LoadingService, 
    TaskService,
    NoteService,
    ProfileService,
    AuthService,
    ProjectService,
    LoadingService,
    AuthenticatedGuard,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInverceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class CoreModule { }
