import {Component, Inject, OnInit} from '@angular/core';
import {TaskService} from '../../../../core/services/task.service';
import {ProfileService} from '../../../../core/services/profile.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotifyComponent} from '../../../../shared/components/notify/notify.component';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-create',
  templateUrl: './modal-recurrence.component.html',
  styleUrls: ['./modal-recurrence.component.css']
})
export class ModalRecurrenceComponent implements OnInit {

  loader = false;
  mainStyle = this.profileService.getAppMainColor();
  secondStyle = this.profileService.getAppSecondaryColor();

  listOfDates: any = [];
  player: string = this.data.player.name;

  constructor(
    public dialogRef: MatDialogRef<ModalRecurrenceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    console.log('Player: ');
    console.log(this.data);
    this.data.unavailableList.map(date => {
      date = new Date(date);
      const dateSet = date.toLocaleDateString('br-PT');
      let hourSet = date.getHours();
      let minuteSet = date.getMinutes();

      if (hourSet < 10) hourSet = '0' + hourSet;
      else hourSet = hourSet + '';
      if (minuteSet < 10) minuteSet = '0' + minuteSet;
      else minuteSet = minuteSet + '';

      this.listOfDates.push(`${dateSet} ${hourSet}:${minuteSet}`);
    });
  }

  confirmRequest() {
    this.dialogRef.close({confirm: true, data: {confirm: true}});
  }
}
