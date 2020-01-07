import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-button-designate',
  templateUrl: './button-designate.component.html',
  styleUrls: ['./button-designate.component.css']
})
export class ButtonDesignateComponent implements OnInit {

  @Output() isDesign = new EventEmitter();
  status: boolean = false;

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {
  }

  feedback() {
    if (!this.status) {
      this.isDesign.emit(this.status = true);
    } else {
      this.isDesign.emit(this.status = false);
    }
  }

}
