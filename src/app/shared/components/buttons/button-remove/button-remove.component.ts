import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { MatDialog } from '@angular/material';
import { RemoveComponent } from '../../modal/remove/remove.component';

@Component({
  selector: 'app-button-remove',
  templateUrl: './button-remove.component.html',
  styleUrls: ['./button-remove.component.css']
})
export class ButtonRemoveComponent implements OnInit {

  @Input() activityId: number;

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  remove() {
    const dataSend = {
      activityId: this.activityId
    }
    const dialogRef = this.dialog.open(RemoveComponent, {
      width: '500px',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result ------- remove component --------');
      console.log(result);
    });
  }

}
