import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-box-property',
  templateUrl: './box-property.component.html',
  styleUrls: ['./box-property.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class BoxPropertyComponent implements OnInit {

  // @ViewChild('title', {static: false}) titleElem: ElementRef;
  // @ViewChild('content', {static: false}) contentElem: ElementRef;
  // @ViewChild('card', {static: false}) cardElem: ElementRef;
  
  @Input() type: string;
  @Input() title: string;

  @Input() number: string;
  @Input() description: string;
  @Input() topics: any;

  constructor() { }

  ngOnInit() {
    // this.titleElem.nativeElement.textContent = this.title;

    // if(this.type == 'numeric'){
    //   this.cardElem.nativeElement.classList.add('numeric');
    //   this.contentElem.nativeElement.innerHTML = '<span>'+ this.number +'</span><span>' + this.description +
    //   '</span>';
    // }

    // if(this.type == 'topics') {
    //   this.cardElem.nativeElement.classList.add('topics');
    //   this.topics = JSON.parse(this.topics);
    //   const that = this;
    //   this.topics.topics.forEach(function(object){
    //     that.contentElem.nativeElement.innerHTML += '<span>'+ object +'</span>';
    //   });
    // }
    
  }

}
