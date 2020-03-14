import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { MatDialog } from '@angular/material';
import { SuspendComponent } from '../../modal/suspend/suspend.component';

@Component({
  selector: 'app-button-suspend',
  templateUrl: './button-suspend.component.html',
  styleUrls: ['./button-suspend.component.css']
})
export class ButtonSuspendComponent implements OnInit {

  @Input() activityId: number;
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  suspend() {
    const dataSend = {
      activityId: this.activityId
    }
    const dialogRef = this.dialog.open(SuspendComponent, {
      width: '500px',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.update.emit(true);
      // console.log('result ------- finalize component --------');
      // console.log(result);
    });
  }

}
