import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-restart-warning',
  templateUrl: './restart-warning.component.html',
  styleUrls: ['./restart-warning.component.css'],
})
export class RestartWarningComponent implements OnInit {
  @Output() requestStatus = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  restartRequest(status: boolean) {
    this.requestStatus.emit(status);
  }
}
