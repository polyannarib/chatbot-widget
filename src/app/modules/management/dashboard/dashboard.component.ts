import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loader: boolean = false;

  constructor() { }

  ngOnInit() { }

  loaderResource(estado) {
    if(estado) {
      this.loader = true;
    }
    this.loader = false;
  }
  loaderProject(estado) {
    if(estado) {
      this.loader = true;
    }
    this.loader = false;
  }
  loaderGraph(estado) {
    if(estado) {
      this.loader = true;
    }
    this.loader = false;
  }

}
