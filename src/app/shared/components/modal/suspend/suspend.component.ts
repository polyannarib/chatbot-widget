import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../../../../core/services/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RemoveComponent } from '../remove/remove.component';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-suspend',
  templateUrl: './suspend.component.html',
  styleUrls: ['./suspend.component.css']
})
export class SuspendComponent implements OnInit {

  loader: boolean = false;
  statusErr: any;
  errMessage: any;
  reason: string;

  constructor(
    public dialogRef: MatDialogRef<SuspendComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private toastService: MzToastService
  ) { }

  ngOnInit() {
  }

  confirmRemove() {
    this.loader = true;
    this.taskService.suspend(this.data.activityId, this.reason).subscribe(
      (response) => {
        if(response.status === 0) {
          this.toastService.show('Tarefa removida com sucesso!', 4000, 'toastrSucess');
          this.dialogRef.close(response);
          return;
        }
        this.statusErr = response.status;
        this.errMessage = response.message;
        this.loader = false;
      }, (err) => {
        this.statusErr = err.status;
        this.errMessage = err.message;
        this.loader = false;
      }
    );
  }


}
