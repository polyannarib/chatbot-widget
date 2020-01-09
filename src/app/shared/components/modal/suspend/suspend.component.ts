import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../../../../core/services/task.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { RemoveComponent } from '../remove/remove.component';
import { MzToastService } from 'ngx-materialize';
import { NotifyComponent } from '../../notify/notify.component';

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
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  confirmSuspend() {
    this.loader = true;
    this.taskService.suspend(this.data.activityId, this.reason).subscribe(
      (response) => {
        if(response.status === 0) {
          this._snackBar.openFromComponent(NotifyComponent, 
            { data: { type: 'error', message: 'Tarefa removida com sucesso!' }});
          this.dialogRef.close(response);
          return;
        }
        this.statusErr = response.status;
        this.errMessage = response.message;
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Essa tarefa não pode ser removida!' }});
        this.loader = false;
      }, (err) => {
        this.statusErr = err.status;
        this.errMessage = err.message;
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Essa tarefa não pode ser removida!' }});
        this.loader = false;
      }
    );
  }


}
