import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-box-property',
  templateUrl: './box-property.component.html',
  styleUrls: ['./box-property.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class BoxPropertyComponent implements OnInit, OnChanges {
  @Input() type: string;
  @Input() title: string;

  //Numeric
  @Input() number: string;
  @Input() description: string;

  //Topics
  @Input() topics: any;
  topicsParsed: any;
  constructor() { }

  ngOnInit() {
    this.updateBoxes();
  }

  updateBoxes(){
    this.topicsParsed = JSON.parse(this.topics).topics;
/*     this.titleElem.nativeElement.textContent = this.title;

    if(this.type == 'numeric'){
      this.cardElem.nativeElement.classList.add('numeric');
      this.contentElem.nativeElement.innerHTML = '';
      this.contentElem.nativeElement.innerHTML = '<span>'+ this.number +'</span><span>' + this.description +
      '</span>';
    }

    if(this.type == 'topics'){
      this.cardElem.nativeElement.classList.add('topics');
      this.topics = JSON.parse(this.topics);
      const that = this;
      this.contentElem.nativeElement.innerHTML = '';
      this.topics.topics.forEach(function(object){
        that.contentElem.nativeElement.innerHTML += '<span>'+ object +'</span>';
      });

    } */
  }

  ngOnChanges(){
    this.updateBoxes();
  }

}
