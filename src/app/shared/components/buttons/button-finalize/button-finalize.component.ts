import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { MatDialog } from '@angular/material';
import { FinalizeComponent } from '../../modal/finalize/finalize.component';

@Component({
  selector: 'app-button-finalize',
  templateUrl: './button-finalize.component.html',
  styleUrls: ['./button-finalize.component.css']
})
export class ButtonFinalizeComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  finalize(activityId) {
    const dataSend = {
      activityId: activityId
    }
    const dialogRef = this.dialog.open(FinalizeComponent, {
      width: '500px',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result ------- finalize component --------');
      console.log(result);
    });
  }

}
