import { Component, OnInit, Input, OnDestroy, AfterContentInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-slick',
  templateUrl: './slick.component.html',
  styleUrls: ['./slick.component.css']
})
export class SlickComponent implements OnInit, OnDestroy, AfterContentInit {

  @Input() options: any
  @Input() data: any
  class: any;
  slickClass: any;
  
  constructor() {
  }

  ngOnInit() {
    console.log('entrou dentro do componente slick');
    this.class = 'slick' + new Date().getTime();
  }
  
  ngAfterContentInit() {
    this.initSlick();
  }

  initSlick() {
    console.log('entrou dentro do initSlick()');
    this.slickClass = $(`.${this.class}`);
    $(`.${this.class}`).slick(this.options)
      .on('reInit', function(event, slick) {
        console.log('Entrou dentro do slick');
        console.log(event);
        console.log(slick);
      }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        console.log('before change');
        console.log(event);
        console.log(slick);
        console.log(currentSlide);
        console.log(nextSlide);
      }).on('afterChange', function(event, slick, currentSlide, nextSlide) {
        console.log('after change');
        console.log(event);
        console.log(slick);
        console.log(currentSlide);
        console.log(nextSlide);
    });
  }

  ngOnDestroy() {
    this.slickClass.unslick();
  }

  // {
  //   dots: true,
  //   infinite: true,
  //   slidesToShow: 1,
  //   centerMode: true,
  //   prevArrow: "<span class='ct-slick-prev'><i class='material-icons'>keyboard_arrow_left</i></span>",
  //   nextArrow: "<span class='ct-slick-next'><i class='material-icons'>keyboard_arrow_right</i></span>",
  // }

}
