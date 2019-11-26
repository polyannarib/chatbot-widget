import { Component, OnInit } from '@angular/core';
import { format, eachDayOfInterval, addDays } from 'date-fns';
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

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.daysOfWeek10 = eachDayOfInterval({
      start: new Date(Date.now()),
      end: addDays(new Date(Date.now()), 8)
    });
    this.findProjects();
  }

  findProjects() {
    this.loader = true;
    let params = {
      "startDate": format(new Date(Date.now()), 'dd-MM-yyyy'),
      "endDate": format(addDays(new Date(Date.now()), 8), 'dd-MM-yyyy'),
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

  modalProjectDetails(projectId, activity): void {
    const dataSend = {
      projectId: projectId,
      projectDate: new Date(activity.year, activity.month, activity.day)
    }
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '90vw',
      data: dataSend
    });
  }

}
