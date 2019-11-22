import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskService } from 'src/app/core/services/task.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.css']
})
export class ResourceDetailsComponent implements OnInit {

  playerActivity: any;
  findTask: any;

  constructor(
    public dialogRef: MatDialogRef<ResourceDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    // this.findProjectTasks();
    this.findTasks();
  }

  // findProjectTasks() {
  //   this.taskService.findProjectTasks(this.data.player.id, this.date).subscribe(
  //     (response) => {
  //       this.taskActivity = response.object;
  //     }, (err) => {
  //       console.log('------- err taskActivity -------');
  //       console.log(err);
  //     }
  //   );
  // }
  
  findTasks() {
    this.taskService.findTasks(this.data.playerId, format(this.data.activityDate, 'dd-MM-yyyy')).subscribe(
      (response) => {
        console.log(response)
        this.playerActivity = response.object;
        console.log('------ this.playerActivity -------');
        console.log(this.playerActivity)
      }, (err) => {
        console.log('------- err findTask -------');
        console.log(err);
      }
    );
  }


}
