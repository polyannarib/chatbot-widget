import { Component, OnInit, Inject } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { TaskService } from 'src/app/core/services/task.service';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { NotifyComponent } from '../../notify/notify.component';

@Component({
  selector: 'app-give-back',
  templateUrl: './give-back.component.html',
  styleUrls: ['./give-back.component.css']
})
export class GiveBackComponent implements OnInit {
  errMessage: string;
  loader: boolean = false;
  mainStyle: any;
  reason: string = '';
  statusErr: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileService,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GiveBackComponent>
  ) { }

  ngOnInit() {
    this.mainStyle = this.profileService.getAppMainColor();
  }

  confirmGiveBack() {
    this.loader = true;
    this.taskService.giveBack(this.data.activityId, this.reason).subscribe(
      response => {
        if (response.status == 0) {
          this.snackBar.openFromComponent(NotifyComponent, {
            data: {
              type: 'success',
              message: 'Tarefa devolvida com sucesso!'
            }
          });
          this.dialogRef.close(response);
        }
        else {
          this.statusErr = response.status;
          this.errMessage = response.message;
          this.snackBar.openFromComponent(NotifyComponent, {
            data: {
              type: 'error',
              message: 'Tarefa não pôde ser devolvida!'
            }
          });
        }

        this.loader = false;
      },
      error => {
        this.statusErr = error.status;
        this.errMessage = error.message;
        this.snackBar.openFromComponent(NotifyComponent, {
          data: {
            type: 'error',
            message: 'Tarefa não pôde ser devolvida!'
          }
        });
      }
    );
  }
}
