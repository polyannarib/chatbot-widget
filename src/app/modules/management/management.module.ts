import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Rotas
import { ManagementRoutingModule } from './routing/management-routing.module';

// Componentes do modulo
import { ManagementComponent } from './management.component';
import { ResourceListComponent } from './resource/resource-list/resource-list.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphComponent } from './graph/graph.component';
import { PlayersFindComponent } from './players/players-find/players-find.component';
import { ResourceFindComponent } from './resource/resource-find/resource-find.component';

// Components modal
import { ResourceDetailsComponent } from './resource/resource-details/resource-details.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ReportEditComponent } from './report/report-edit/report-edit.component';
import { ReportEditNoteComponent } from './report/report-edit-note/report-edit-note.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ProjectImportComponent } from './projects/project-import/project-import.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectDetailsTaskComponent } from './projects/project-details-task/project-details-task.component';
import { TaskCreateComponent } from './task/task-create/task-create.component';
import { TaskDetailsComponent } from './task/task-details/task-details.component';
import { CardFindComponent } from './card/card-find/card-find.component';
import { ModalKysmartComponent } from './task/modal-kysmart/modal-kysmart.component';
import { CockpitComponent } from './cockpit/cockpit.component';

// Componentes chatbot
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatBoxIconComponent } from './chat-box-icon/chat-box-icon.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatBoxHeaderComponent } from './chat-window/chat-box-header/chat-box-header.component';
import { RestartWarningComponent } from './chat-window/restart-warning/restart-warning.component';
import { ChatbotWidgetComponent } from './chatbot-widget/chatbot-widget.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ManagementRoutingModule
  ],
  declarations: [
    DashboardComponent,
    ManagementComponent,
    ResourceListComponent,
    ProjectsListComponent,
    ProjectDetailsComponent,
    ResourceDetailsComponent,
    PlayersFindComponent,
    GraphComponent,
    ReportEditComponent,
    ReportEditNoteComponent,
    ProjectEditComponent,
    ResourceFindComponent,
    ProjectImportComponent,
    ProjectCreateComponent,
    ProjectDetailsTaskComponent,
    TaskCreateComponent,
    TaskDetailsComponent,
    CardFindComponent,
    ModalKysmartComponent,
    CockpitComponent,
    ChatBoxComponent,
    ChatBoxIconComponent,
    ChatWindowComponent,
    ChatBoxHeaderComponent,
    RestartWarningComponent,
    ChatbotWidgetComponent
  ],
  entryComponents: [
    ProjectDetailsComponent,
    ResourceDetailsComponent,
    ReportEditComponent,
    ReportEditNoteComponent,
    ProjectEditComponent,
    ProjectDetailsTaskComponent,
    ProjectCreateComponent,
    TaskCreateComponent,
    TaskDetailsComponent,
    CardFindComponent,
    ModalKysmartComponent
  ]
})
export class ManagementModule { }
