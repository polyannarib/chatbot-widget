import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { TaskService } from 'src/app/core/services/task.service';
import { format } from 'date-fns';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProjectDetailsComponent implements OnInit {

  loader: boolean = false;
  projectTasks: any;
  designate: boolean = false;
  taskHeader = ['PROJECT', 'ACTIVITY', 'DUEDATE', 'EFFORT'];
  taskList: any;
  updateDesignate: boolean;
  taskId: any;
  scopes = Object.assign({}, this.authService.getScopes());

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    public dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.findProjectTasks();
  }

  findProjectTasks() {
    this.loader = true;
    this.taskService.findProjectTasks(this.data.projectId, format(this.data.projectDate, 'dd-MM-yyyy')).subscribe(
      (response) => {
        // this.dataSource = response.object;
        this.taskList = response.object.tasks
        this.projectTasks = response.object;
        this.loader = false;
      }, (err) => {
        this.loader = false;
      }
    )
  }

  updateDesignated(value) {
    if(value === true) {
      this.findProjectTasks();
    }
  }

  reciverDesignate(value) {
    if(value.task) {
      this.taskId = value.task;
    }
    this.designate = value.status;
  }

  getColor(color) {
    switch (color) {
      case 'BUILDING':
        return '#494947';
      case 'WAITING':
        return '#FFC53E';
      case 'EXECUTION':
        return '#0085B2';
      case 'FINISHED':
        return '#00D69D';
      case 'HANGING':
        return '#C9133E';
      case 'WAITING EXECUTION':
        return '#949396';
      case 'DELAYED':
        return '#A50104';
      default:
        return '#000';
    }
  }

  updateTasks(event) {
    if(event === true) {
      this.findProjectTasks();
    }
  }

}
