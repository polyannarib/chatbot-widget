import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { format, eachDayOfInterval, addDays, subDays } from 'date-fns';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/shared/models/project';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { ReportEditComponent } from '../../report/report-edit/report-edit.component';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';

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
  loader: boolean = false;
  loaderDays: boolean = false;
  project: any;
  numberOfDays: number = 8;
  startDate: any = new Date(Date.now());
  endDate: any = addDays(this.startDate, this.numberOfDays);

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.daysOfWeek(this.startDate, this.endDate);
    this.findProjects();
  }

  daysOfWeek(start, end) {
    this.daysOfWeek10 = eachDayOfInterval({
      start: start,
      end: end
    })
  }

  findProjects() {
    this.loader = true;
    this.loaderProject.emit(true);
    let params = {
      "startDate": format(this.startDate, 'dd-MM-yyyy'),
      "endDate": format(this.endDate, 'dd-MM-yyyy'),
      "page": 1,
      "pageSize": 10
    };
    this.projectService.listProjects(params).subscribe(
      (response) => {
        if(response.status == 0) {
          this.loader = false;
          this.projectsList = response.object.list;
          this.filteredProjectsList = this.projectsList;
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
      projectId: projectId,
      projectDate: new Date(activity.referenceDate)
    }
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '90vw',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(result => {
      this.findProjects();
    });
  }

  openReport(project) {
    const dataSend = {
      project: project
    }
    const dialogRef = this.dialog.open(ReportEditComponent, {
      width: '90vw',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(
    (result) => {
      this.findProjects();
    });
  }

  changeDays(date) {
    this.loaderDays = true;
    if (date == 'prev') {
      this.endDate = this.startDate;
      this.startDate = subDays(this.startDate, 8);
      this.daysOfWeek(this.startDate, this.endDate);
      this.findProjects();
      this.loaderDays = false;
    } if (date == 'next') {
      this.startDate = this.endDate;
      this.endDate = addDays(this.startDate, 8);
      this.daysOfWeek(this.startDate, this.endDate);
      this.findProjects();
      this.loaderDays = false;
    }
  }

  onSearchChangeProject(searchValue: string): void {
    const project = this.projectsList;
    searchValue = searchValue.toLocaleLowerCase();
    this.filteredProjectsList = project.filter((project) => project.name.toLocaleLowerCase().indexOf(searchValue) !== -1);
    // this.project = this.project.filter(
    //   (curr) => {
    //     return curr.name.toUpperCase().includes(searchValue.toUpperCase());
    //   }
    // )
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

}
