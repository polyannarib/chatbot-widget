import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { TaskService } from 'src/app/core/services/task.service';
import { format } from 'date-fns';
import { FinalizeComponent } from '../../../../shared/components/modal/finalize/finalize.component';
import { RemoveComponent } from '../../../../shared/components/modal/remove/remove.component';
import { PlayerService } from '../../../../core/services/player.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

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

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    public dialog: MatDialog
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

  reciverDesignate(value) {
    this.designate = value;
  }
 
  // finalize(activityId) {
  //   const dataSend = {
  //     activityId: activityId
  //   }
  //   const dialogRef = this.dialog.open(FinalizeComponent, {
  //     width: '500px',
  //     data: dataSend
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('result ------- finalize component --------');
  //     console.log(result);
  //   });
  // }

  // remove(activityId): void {
  //   const dataSend = {
  //     activityId: activityId
  //   }
  //   const dialogRef = this.dialog.open(RemoveComponent, {
  //     width: '500px',
  //     data: dataSend
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('result ------- remove component --------');
  //     console.log(result);
  //   });
  // }
  
  // suspend(activityId): void {
  //   const dataSend = {
  //     activityId: activityId
  //   }
  //   const dialogRef = this.dialog.open(ProjectDetailsComponent, {
  //     width: '90vw',
  //     data: dataSend
  //   });
  // }

  // findDesignatePlayers(taskId) {
  //   if (!this.openPlayerRated) {
  //     this.openPlayerRated = true;
  //     this.loaderPlayerRated = true;
  //     this.playerService.findDesignatePlayers(taskId).subscribe(
  //       (response) => {
  //         console.log('-------- playerService -------');
  //         console.log(response);
  //         this.playerRate = response.object.rated;
  //         this.playerAllocated = response.object.allocated;
  //         this.loaderPlayerRated = false;
  //         // this.openPlayerRated = false;
  //       }, (err) => {
  //         this.loaderPlayerRated = false;
  //         console.log('------ err ------');
  //         console.log(err);
  //       }
  //     )
  //   } else { 
  //     this.openPlayerRated = false;
  //   }
  // }

}
