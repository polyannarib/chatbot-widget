import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { RemoveComponent } from '../remove/remove.component';
import { TaskService } from 'src/app/core/services/task.service';
import { NotifyComponent } from '../../notify/notify.component';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-remove-task',
  templateUrl: './remove-task.component.html',
  styleUrls: ['./remove-task.component.css']
})
export class RemoveTaskComponent implements OnInit {

  loader: boolean = false;
  statusErr: any;
  errMessage: any;
  reason: string;
  mainStyle = this.profileService.getAppMainColor();

  constructor(
    public dialogRef: MatDialogRef<RemoveTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService
  ) { }

  ngOnInit() { }

  confirmRemove() {
    // this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Tarefa removida com sucesso!' }});
    // this.dialogRef.close();
    this.data.task.status = 'REMOVED';
    this.data.task.level = undefined;
    this.data.task.expandable = undefined;
    this.taskService.createTask(this.data.task).subscribe(
      (response) => {
        if (response.status == 0) {
          this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Tarefa removida com sucesso!' }});
          this.dialogRef.close(response);
          this.loader = false;
          return;
        }
        if (response.message == 'TASK_CANT_BE_CHANGE') {
          this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Esta tarefa não pode ser excluida!' }});
          this.loader = false;
          return;
        }
        if (response.message == 'FAIL_AT_VALIDADE_AND_UPDATE_TASK') {
          this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Tivemos um problema para remover a tarefa, contate o administrador' }});
          this.loader = false;
          return;
        }
        this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao remover, favor tentar novamente!' }});
        this.loader = false;
      }, (err) => {
        this.loader = false;
        this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao remover, favor tentar novamente!' }});
    })
    // this.loader = true;
    // this.taskService.removePlayer(this.data.activityId, this.reason).subscribe(
    //   (response) => {
    //     if(response.status === 0) {
    //       // this.toastService.show('Tarefa removida com sucesso!', 4000, 'toastrSucess');
    //       this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Tarefa removida com sucesso!' }});
    //       this.dialogRef.close(response);
    //       return;
    //     }
    //     this.statusErr = response.status;
    //     this.errMessage = response.message;
    //     this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Essa tarefa não pode ser removida!' }});
    //     this.loader = false;
    //   }, (err) => {
    //     this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Essa tarefa não pode ser removida!' }});
    //     this.statusErr = err.status;
    //     this.errMessage = err.message;
    //     this.loader = false;
    //   }
    // );
  }

}
