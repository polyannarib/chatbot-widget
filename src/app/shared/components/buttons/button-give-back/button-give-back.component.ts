import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GiveBackComponent } from '../../modal/give-back/give-back.component';

@Component({
  selector: 'app-button-give-back',
  templateUrl: './button-give-back.component.html',
  styleUrls: ['./button-give-back.component.css']
})
export class ButtonGiveBackComponent implements OnInit {
  @Input() activityId: number;
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  giveBack() {
    const dialogRef = this.dialog.open(GiveBackComponent, {
      width: '500px',
      data: {
        activityId: this.activityId
      }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        this.update.emit();
      }
    );
  }
}
