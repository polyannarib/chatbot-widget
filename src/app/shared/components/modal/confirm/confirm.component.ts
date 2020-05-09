import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  mainStyle = this.profileService.getAppMainColor();

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close({confirm: true});
  }

}
