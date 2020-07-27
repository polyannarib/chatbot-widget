import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InitializeComponent } from '../../modal/initialize/initialize.component';

@Component({
  selector: 'app-button-initialize',
  templateUrl: './button-initialize.component.html',
  styleUrls: ['./button-initialize.component.css']
})
export class ButtonInitializeComponent implements OnInit {

  @Input() activityId: number;
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialog: MatDialog
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
      this.update.emit(true);
    });
  }

}
