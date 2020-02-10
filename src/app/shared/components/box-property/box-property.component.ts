import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-box-property',
  templateUrl: './box-property.component.html',
  styleUrls: ['./box-property.component.css']
})
export class BoxPropertyComponent implements OnInit {
  
  @Input() type: string;
  @Input() title: string;
  @Input() number: string;
  @Input() description: string;
  @Input() topics: any;

  topicsParsed: any;

  constructor() { }

  ngOnInit() {
  }

}
