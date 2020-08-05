import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { format, eachDayOfInterval, addDays, subDays } from 'date-fns';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/shared/models/project';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { ReportEditComponent } from '../../report/report-edit/report-edit.component';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { ProjectDetailsTaskComponent } from '../project-details-task/project-details-task.component';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/core/services/profile.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProjectCreateComponent } from '../project-create/project-create.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  @Output() loaderProject = new EventEmitter();

  daysOfWeek10: any;
  projectsList: any;
  filteredProjectsList: any;
  loader = false;
  loaderDays = false;
  project: any;
  numberOfDays = 4;
  startDate: any = new Date(Date.now());
  endDate: any = addDays(this.startDate, this.numberOfDays);
  scopes: any;
  mainStyle = this.profileService.getAppMainColor();
  secondarytyle = this.profileService.getAppSecondaryColor();

  searchProjects: FormGroup;

  pageSize: number = 20;
  page: number;
  totalFound: number;

  projectsListOptions: number;

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.scopes = Object.assign({}, this.authService.getScopes());
    this.daysOfWeek(this.startDate, this.endDate);
    this.findProjects();

    this.searchProjects = this.formBuilder.group({
      name: ['']
    });
  }

  daysOfWeek(start, end) {
    this.daysOfWeek10 = eachDayOfInterval({start, end});
  }

  findProjects() {
    this.loader = true;
    this.loaderProject.emit(true);
    const params = {
      "startDate": format(this.startDate, 'dd-MM-yyyy'),
      // "endDate": format(this.endDate, 'dd-MM-yyyy'),
      "page": this.page ? this.page : 1,
      "pageSize": this.pageSize
    };
    this.projectService.listProjects(params).subscribe(
      (response) => {
        if (response.status == 0) {
          this.loader = false;
          this.projectsList = response.object.list;
          this.projectsListOptions = response.object;
          this.filteredProjectsList = this.projectsList;

          this.pageSize = response.object.pageSize;
          this.page = response.object.page;
          this.totalFound = response.object.totalFound;

          return;
        }
        this.httpError(response.message);
        this.loader = false;
      }, (err) => {
        this.httpError(null);
        this.loader = false;
      }
    );
  }

  modalProjectDetails(projectId, activity) {
    const dataSend = {
      projectId,
      projectDate: new Date(activity.referenceDate)
    };
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '90vw',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(result => {
      this.findProjects();
    });
  }

  openProjectEdit(project) {
    const dataSend = {
      project
    };
    const dialogRef = this.dialog.open(ProjectDetailsTaskComponent, {
      width: '90vw',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(
    (result) => {
      this.findProjects();
    });
  }

  openReport(project) {
    const dataSend = {
      project
    };
    const dialogRef = this.dialog.open(ReportEditComponent, {
      width: '90vw',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(
    (result) => {
      this.findProjects();
    });
  }

  generateReport(project) {
    window.open( `${environment.URL_STATUS_REPORT}${project.id}&rs:Command=Render&rs:Format=pdf`, '_blank'); 
  }

  changeDays(date) {
    this.loaderDays = true;
    if (date == 'prev') {
      this.endDate = this.startDate;
      this.startDate = subDays(this.startDate, this.numberOfDays);
      this.daysOfWeek(this.startDate, this.endDate);
      this.findProjects();
      this.loaderDays = false;
    } if (date == 'next') {
      this.startDate = this.endDate;
      this.endDate = addDays(this.startDate, this.numberOfDays);
      this.daysOfWeek(this.startDate, this.endDate);
      this.findProjects();
      this.loaderDays = false;
    }
  }

  onSearchProjects() {
    this.loader = true;
    this.loaderProject.emit(true);

    let params = {
      page: 1,
      startDate: format(this.startDate, 'dd-MM-yyyy'),
      pageSize: this.pageSize,
      name: this.searchProjects.value.name
    }

    this.projectService.listProjects(params).subscribe(
      (response) => {
        if (response.status == 0) {
          this.loader = false;
          this.projectsList = response.object.list;
          this.projectsListOptions = response.object;
          this.filteredProjectsList = this.projectsList;
          this.pageSize = response.object.pageSize;
          this.page = response.object.page;
          this.totalFound = response.object.totalFound;
        }
        else {
          this.httpError(response.message);
          this.loader = false;
        }
      },
      (error) => {
        this.httpError(null);
        this.loader = false;
      }
    )
  }

  httpError(value) {
    switch (value) {
      case 'FAIL_TO_LIST_TASK':
        this._snackBar.openFromComponent(NotifyComponent,
          { data: { type: 'error', message: 'Problemas, contate o administrador' }});
        break;
      default:
        this._snackBar.openFromComponent(NotifyComponent,
          { data: { type: 'error', message: 'Problemas, contate o administrador' }});
        break;
    }
  }

  modalAddProject() {
    const dataSend = {
      type: 'create'
    };
    const dialogRef = this.dialog.open(ProjectCreateComponent, {
      width: '600px',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.confirm == true) {
        this.findProjects();
      }
    });
  }

  pageEvent(eventoPaginator) {
    this.totalFound = eventoPaginator.length;
    this.pageSize = eventoPaginator.pageSize;
    this.page = eventoPaginator.pageIndex + 1;
    this.findProjects();
  }

  updatePage(value) {
    this.page = value;
    this.findProjects();
  }

}
