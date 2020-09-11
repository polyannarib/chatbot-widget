import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css']
})
export class CollapseComponent implements OnInit {

  private toggle: string = 'none';
  
  constructor() { }

  ngOnInit() {
  }

  clickEvent(event) {
    if(this.toggle === 'block') {
      return this.toggle = 'none';
    }
    return this.toggle = 'block';
  }

}
