import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InitializeComponent } from '../../modal/initialize/initialize.component';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-button-initialize',
  templateUrl: './button-initialize.component.html',
  styleUrls: ['./button-initialize.component.css']
})
export class ButtonInitializeComponent implements OnInit {

  @Input() activityId: number;
  @Output() update: EventEmitter<any> = new EventEmitter();

  mainStyle = this.profileService.getAppMainColor();

  constructor(
    private dialog: MatDialog,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
  }

  initialize() {
    const dataSend = {
      activityId: this.activityId
    }
    const dialogRef = this.dialog.open(InitializeComponent, {
      width: '500px',
      data: dataSend
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.update.emit();
    });
  }

}
