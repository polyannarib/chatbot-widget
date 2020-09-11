import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TaskService } from 'src/app/core/services/task.service';
import { MzToastService } from 'ngx-materialize';
import { NotifyComponent } from '../../notify/notify.component';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.css']
})
export class FinalizeComponent implements OnInit {

  loader: boolean = false;
  errMessage: string;
  statusErr: any;
  mainStyle = this.profileService.getAppMainColor();

  constructor(
    public dialogRef: MatDialogRef<FinalizeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService
  ) { }

  @Input() service: string;

  ngOnInit() {
  }

  confirmFinalize() {
    this.loader = true;
    this.taskService.finalize(this.data.activityId).subscribe(
      (response) => {
        if(response.status === 0) {
          this._snackBar.openFromComponent(NotifyComponent, 
            { data: { type: 'success', message: 'Tarefa finalizada com sucesso!' }});
          this.dialogRef.close(response);
          return;
        }
        this.statusErr = response.status;
        this.errMessage = response.message;
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Essa tarefa não pode ser finalizada!' }});
        this.loader = false;
      }, (err) => {
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Essa tarefa não pode ser finalizada!' }});
        this.statusErr = err.status;
        this.errMessage = err.message;
        this.loader = false;
      }
    );
  }

}
