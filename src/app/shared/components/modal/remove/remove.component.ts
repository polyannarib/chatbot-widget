import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TaskService } from 'src/app/core/services/task.service';
import { MzToastService } from 'ngx-materialize';
import { NotifyComponent } from '../../notify/notify.component';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {

  loader: boolean = false;
  statusErr: any;
  errMessage: any;
  reason: string;
  mainStyle = this.profileService.getAppMainColor();

  constructor(
    public dialogRef: MatDialogRef<RemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService
  ) { }

  ngOnInit() { }

  confirmRemove() {
    this.loader = true;
    this.taskService.removePlayer(this.data.activityId, this.reason).subscribe(
      (response) => {
        if(response.status === 0) {
          // this.toastService.show('Tarefa removida com sucesso!', 4000, 'toastrSucess');
          this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Removido com sucesso!' }});
          this.dialogRef.close(response);
          return;
        }
        this.statusErr = response.status;
        this.errMessage = response.message;
        this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Não pode ser removido!' }});
        this.loader = false;
      }, (err) => {
        this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Não pode ser removido!' }});
        this.statusErr = err.status;
        this.errMessage = err.message;
        this.loader = false;
      }
    );
  }

}
