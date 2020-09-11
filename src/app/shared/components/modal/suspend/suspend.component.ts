import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../../../../core/services/task.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NotifyComponent } from '../../notify/notify.component';
import { ProfileService } from 'src/app/core/services/profile.service';

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
  mainStyle = this.profileService.getAppMainColor();

  constructor(
    public dialogRef: MatDialogRef<SuspendComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
  }

  confirmSuspend() {
    this.loader = true;
    this.taskService.suspend(this.data.activityId, this.reason).subscribe(
      (response) => {
        if(response.status === 0) {
          this._snackBar.openFromComponent(NotifyComponent, 
            { data: { type: 'success', message: 'Tarefa suspensa com sucesso!' }});
          this.dialogRef.close(response);
          return;
        }
        this.statusErr = response.status;
        this.errMessage = response.message;
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Essa tarefa não pode ser suspensa!' }});
        this.loader = false;
      }, (err) => {
        this.statusErr = err.status;
        this.errMessage = err.message;
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Essa tarefa não pode ser suspensa!' }});
        this.loader = false;
      }
    );
  }

}
