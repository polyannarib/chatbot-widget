import { Component, OnInit } from '@angular/core';
import { format, eachDayOfInterval, addDays, subDays } from 'date-fns';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/shared/models/project';
import { MatDialog } from '@angular/material';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  daysOfWeek10: any;
  projectsList: any;
  loader: boolean = false;
  loaderDays: boolean = false;
  startDate: any;
  endDate: any;

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {
    this.startDate = new Date(Date.now());
    this.endDate = addDays(this.startDate, 8);
  }

  ngOnInit() {
    this.daysOfWeek(this.startDate, this.endDate);
    this.findProjects();
  }

  daysOfWeek(start, end) {

    console.log('start'+ start);
    console.log('end'+ end);

    this.daysOfWeek10 = eachDayOfInterval({
      start: start,
      end: end
    })
    console.log(this.daysOfWeek10);
  }

  findProjects() {
    this.loader = true;
    let params = {
      "startDate": format(this.startDate, 'dd-MM-yyyy'),
      "endDate": format(this.endDate, 'dd-MM-yyyy'),
      "page": 1,
      "pageSize": 10
    };
    this.projectService.listProjects(params).subscribe(
      (response) => {
        this.loader = false;
        this.projectsList = response.object.list;
      }, (err) => {
        this.loader = false;
        console.log('----- deu erro -----');
        console.log(err);
      }
    );
  }

  modalProjectDetails(projectId, activity) {
    activity.month = activity.month-1;
    const dataSend = {
      projectId: projectId,
      projectDate: new Date(activity.year, activity.month, activity.day)
    }
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '90vw',
      data: dataSend
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

}
