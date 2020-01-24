import { Component, OnInit, Input, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-slick',
  templateUrl: './slick.component.html',
  styleUrls: ['./slick.component.css']
})
export class SlickComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() options: any
  @Input() data: any
  @Input() arrows: boolean
  class: any;
  slickClass: any;
  
  constructor() {
  }

  ngOnInit() {
    this.class = 'slick' + new Date().getTime();
    this.initArrows();
  }

  ngAfterViewInit() {
    this.initSlick();
  }

  initSlick() {
    this.slickClass = $(`.${this.class}`);
    this.slickClass.slick(this.options);
  }

  ngOnDestroy() {
    this.slickClass.slick('unslick');
  }

  initArrows() {
    if(this.arrows == true) {
      this.options.prevArrow = "<span class='ct-slick-prev'><i class='material-icons'>keyboard_arrow_left</i></span>";
      this.options.nextArrow = "<span class='ct-slick-next'><i class='material-icons'>keyboard_arrow_right</i></span>";
    }
  }

}
