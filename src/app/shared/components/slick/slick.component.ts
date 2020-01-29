import { Component, OnInit, Input, Output, OnDestroy, AfterContentInit, AfterViewInit, EventEmitter, OnChanges } from '@angular/core';


declare var $: any;

@Component({
  selector: 'app-slick',
  templateUrl: './slick.component.html',
  styleUrls: ['./slick.component.css']
})
export class SlickComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  @Input() options: any
  @Input() data: any
  @Input() arrows: boolean
  class: any;
  slickClass: any;
  @Output() updateAttributesEvent = new EventEmitter<string>();
  @Input() type: any;
  
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
    console.log(this.slickClass);
    this.slickClass.slick(this.options);

    if($('#slick .card-img').length >= 0){  //Se for o carrossel de cartas
      var that = this;
      setTimeout(function(){
        $('#slick').on('afterChange', function(slick, currentSlide){
          that.updateAttributesEvent.emit('updateAttributes');
        });
        that.updateAttributesEvent.emit('updateAttributes');
      }, 500);
    }
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

  ngOnChanges(){
/*     if(this.slickClass != undefined){
      var that = this;
      this.slickClass.slick('unslick');

      setTimeout(function(){
        that.slickClass.slick(that.options);
      }, 1000);
      
    } */
    
      
  }



}
