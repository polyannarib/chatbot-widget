import { Component, OnInit, Input, Output, OnDestroy, AfterContentInit, AfterViewInit, EventEmitter, OnChanges } from '@angular/core';


declare var $: any;

@Component({
  selector: 'app-slick',
  templateUrl: './slick.component.html',
  styleUrls: ['./slick.component.css']
})
export class SlickComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  @Output() identifySlick = new EventEmitter<any>();

  @Input() options: any
  @Input() data: any
  @Input() arrows: boolean
  @Input() type: any;
  @Input() updateAttributes: any;

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
    this.identifySlick.emit(this.slickClass);
  }

  initSlick() {
    const _this = this;
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

  ngOnChanges() {
    // console.log('entrou dentro do onChanges');
    // const _this = this;
    // if(this.updateAttributes) {
    //   console.log('entrou dentro do if(this.updateAttributes)');
    //   this.slickClass.on('afterChange', (event, slick, currentSlide, nextSlide) => {
    //     this.updateAttributesEvent.emit({
    //       slickClass: _this.class,
    //       name: 'slick',
    //       updateAttributes: _this.updateAttributes
    //     })
    //   });
    // }
  }

}
