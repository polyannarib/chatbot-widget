import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskService } from 'src/app/core/services/task.service';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.css']
})
export class FinalizeComponent implements OnInit {

  loader: boolean = false;
  errMessage: string;
  statusErr: any;

  constructor(
    public dialogRef: MatDialogRef<FinalizeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private toastService: MzToastService
  ) { }

  @Input() service: string;

  ngOnInit() {
  }

  confirmFinalize() {
    this.loader = true;
    this.taskService.finalize(this.data.activityId).subscribe(
      (response) => {
        if(response.status === 0) {
          this.toastService.show('Tarefa finalizada com sucesso!', 4000, 'toastrSucess');
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
