import { Component, OnInit } from '@angular/core';
import { format, eachDayOfInterval, addDays } from 'date-fns';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  daysOfWeek10: any;
  projectsList: any;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.daysOfWeek10 = eachDayOfInterval({
      start: new Date(Date.now()),
      end: addDays(new Date(Date.now()), 8)
    });
    this.findProjects();
  }

  findProjects() {
    let params = {
      "startDate": format(new Date(Date.now()), 'dd-MM-yyyy'),
      "endDate": format(addDays(new Date(Date.now()), 8), 'dd-MM-yyyy'),
      "page": 1,
      "pageSize": 10
    };
    this.projectService.listProjects(params).subscribe(
      (response) => {
        this.projectsList = response.object.list;
      }, (err) => {
        console.log('----- deu erro -----');
        console.log(err);
      }
    );
  }

}
