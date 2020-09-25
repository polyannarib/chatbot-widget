import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ProfileService } from 'src/app/core/services/profile.service';
import { TaskService } from 'src/app/core/services/task.service';
import { NotifyComponent } from '../../notify/notify.component';

@Component({
  selector: 'app-edit-task-hour',
  templateUrl: './edit-task-hour.component.html',
  styleUrls: ['./edit-task-hour.component.css']
})
export class EditTaskHourComponent implements OnInit {
  loader: boolean = false;
  startChanged = false;
  finishChanged = false;
  mainStyle = this.profileService.getAppMainColor();
  hours = [8, 9, 10, 11, 14, 15, 16, 17];
  finishHours = [8, 9, 10, 11, 14, 15, 16, 17];
  startDate;
  startHour;
  finishDate;
  finishHour;

  constructor(
    private profileService: ProfileService,
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditTaskHourComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.startDate = new Date(this.data.startedAt);
    this.startHour = this.startDate.getHours();
    this.checkStartHour(this.data.startedAt);

    if (this.data.finalizedAt != null) {
      this.finishDate = new Date(this.data.finalizedAt);
      this.finishHour = this.finishDate.getHours();
      this.checkFinishHour(this.data.finalizedAt);
    }
  }

  getMinMax(date) {
    return new Date(date);
  }

  checkStartHour(date) {
    const d = new Date(date);
    const minStart = new Date(this.data.editInfo.startedDate.minDatetimeAvailable);
    const maxStart = new Date(this.data.editInfo.startedDate.maxDatetimeAvailable);

    this.hours = [8, 9, 10, 11, 14, 15, 16, 17];

    if (d.getDate() === minStart.getDate()) {
      if (minStart.getDate() === maxStart.getDate()) {
        this.hours = this.hours.filter(hour => (hour >= minStart.getHours()) && (hour <= maxStart.getHours()));
      }
      else {
        this.hours = this.hours.filter(hour => hour >= minStart.getHours());
      }
    }
    else if (d.getDate() === maxStart.getDate()) {
      this.hours = this.hours.filter(hour => hour <= maxStart.getHours());
    }
  }

  checkFinishHour(date) {
    const d = new Date(date);
    const minFinish = new Date(this.data.editInfo.finalizedDate.minDatetimeAvailable);
    const maxFinish = new Date(this.data.editInfo.finalizedDate.maxDatetimeAvailable);

    this.finishHours = [8, 9, 10, 11, 14, 15, 16, 17];

    if (d.getDate() === minFinish.getDate()) {
      if (minFinish.getDate() === maxFinish.getDate()) {
        this.finishHours = this.finishHours.filter(hour => (hour >= minFinish.getHours()) && (hour <= maxFinish.getHours()));
      }
      else {
        this.finishHours = this.finishHours.filter(hour => hour >= minFinish.getHours());
      }
    }
    else if (d.getDate() === maxFinish.getDate()) {
      this.finishHours = this.finishHours.filter(hour => hour <= maxFinish.getHours());
    }
  }

  save() {
    const startedDate = new Date(this.startDate).setHours(this.startHour);
    const startTimestamp = new Date(startedDate).getTime();

    let startDateBody = {
      id: this.data.id,
      startedAt: startTimestamp
    }

    const finishedDate = new Date(this.finishDate).setHours(this.finishHour);
    const finishTimestamp = new Date(finishedDate).getTime();

    let finishDateBody = {
      id: this.data.id,
      finalizedAt: finishTimestamp
    }

    this.loader = true;

    this.taskService.editTaskDate(startDateBody).subscribe(
      response => {
        if (response.status === 0) {
          if (this.finishDate && this.finishHour) {
            this.taskService.editTaskDate(finishDateBody).subscribe(
              response2 => {
                if (response2.status === 0) {
                  this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Atividade atualizada com sucesso!' } });
                  this.dialogRef.close(true);
                  this.loader = false;
                }
                else {
                  this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao editar a atividade, tente novamente!' } });
                }
              },
              error2 => {
                this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao editar a atividade, tente novamente!' } });
              }
            )
          }
          else {
            this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'success', message: 'Atividade atualizada com sucesso!' } });
            this.dialogRef.close(true);
            this.loader = false;
          }
        }
        else {
          this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao editar a atividade, tente novamente!' } });
        }
      },
      error => {
        this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Problemas ao editar a atividade, tente novamente!' } });
      }
    )
  }
}
