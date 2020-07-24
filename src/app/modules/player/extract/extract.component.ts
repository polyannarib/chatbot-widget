import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { JobService } from 'src/app/core/services/job.service';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';
import { add } from 'date-fns';
import { sub } from 'date-fns';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.css']
})
export class ExtractComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ExtractComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private jobService: JobService,
    private profileService: ProfileService
  ) { }

  loader: boolean = false;
  extracts: any;
  date = new Date(Date.now());

  mainStyle = this.profileService.getAppMainColor();

  ngOnInit() {
    this.getExtract();
  }

  getExtract() {
    this.loader = true;
    this.jobService.getExtract(this.date.getFullYear(), this.date.getMonth() + 1).subscribe(
      (response) => {
        if(response.status == 0) {
          this.extracts = response.object;
          this.loader = false;
          return;
        }
        this.loader = false;
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Problemas, contate o administrador' }});
      }, (err) => {
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Problemas, contate o administrador' }});
        this.loader = false;
      }
    )
  }

  nextMonth() {
    this.date = add(this.date, {months: 1});
    this.getExtract();
  }

  prevMonth() {
    this.date = sub(this.date, {months: 1});
    this.getExtract();
  }
  
  nextMonthName(): Date {
    return add(this.date, {months: 1});
  }
  
  prevMonthName(): Date {
    return sub(this.date, {months: 1});
  }

}
