import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TaskService } from 'src/app/core/services/task.service';
import { NotifyComponent } from '../../notify/notify.component';

@Component({
  selector: 'app-conflict-initialize',
  templateUrl: './conflict-initialize.component.html',
  styleUrls: ['./conflict-initialize.component.css']
})
export class ConflictInitializeComponent implements OnInit {
  loader: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConflictInitializeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  startTask() {
    this.loader = true;

    this.taskService.initialize(this.data.currentId).subscribe(
      response => {
        if (response.status === 0) {
          this._snackBar.openFromComponent(NotifyComponent,
            { data: { type: 'success', message: 'Tarefa inicializada com sucesso!' } });
          this.dialogRef.close();
        }
        else {
          this._snackBar.openFromComponent(NotifyComponent,
            { data: { type: 'error', message: 'Essa tarefa não pode ser iniciada!' } });
          this.dialogRef.close();
        }
      },
      error => {
        this._snackBar.openFromComponent(NotifyComponent,
          { data: { type: 'error', message: 'Essa tarefa não pode ser iniciada!' } });
        this.dialogRef.close();
      }
    )
  }
}
