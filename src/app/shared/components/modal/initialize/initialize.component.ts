import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { TaskService } from 'src/app/core/services/task.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { NotifyComponent } from '../../notify/notify.component';
import { ConflictInitializeComponent } from '../conflict-initialize/conflict-initialize.component';

@Component({
  selector: 'app-initialize',
  templateUrl: './initialize.component.html',
  styleUrls: ['./initialize.component.css']
})
export class InitializeComponent implements OnInit {

  @Input() service: string;

  loader: boolean = false;
  errMessage: string;
  statusErr: any;
  mainStyle = this.profileService.getAppMainColor();

  constructor(
    public dialogRef: MatDialogRef<InitializeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
  }

  confirmInitialize() {
    this.loader = true;
    this.taskService.initialize(this.data.activityId).subscribe(
      (response) => {
        if (response.status === 0) {
          this._snackBar.openFromComponent(NotifyComponent,
            { data: { type: 'success', message: 'Tarefa inicializada com sucesso!' } });
          this.dialogRef.close(response);
        }
        else {
          if (response.messageKey == 'MUST_CONCLUDE') {
            const dataSend = {
              object: response.object[0],
              currentId: this.data.activityId
            };

            const dialogRef = this.dialog.open(ConflictInitializeComponent, {
              width: '500px',
              data: dataSend
            });

            dialogRef.afterClosed().subscribe(
              response => {
                this.dialogRef.close(response);
              }
            )
          }
          else {
            this._snackBar.openFromComponent(NotifyComponent,
              { data: { type: 'error', message: 'Essa tarefa não pode ser iniciada!' } });
            this.loader = false;
          }
        }
      },
      (err) => {
        this._snackBar.openFromComponent(NotifyComponent,
          { data: { type: 'error', message: 'Essa tarefa não pode ser iniciada!' } });
        this.loader = false;
      }
    );
  }

}
