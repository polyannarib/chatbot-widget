import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';


declare var $: any;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {

  @Output() loaderGraph = new EventEmitter();

  chartsList: any;
  loader: boolean = false;
  arrows: boolean = true;
  page
  pageSize
  countChart
  slick = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngAfterViewInit() { }
  
  ngOnInit() {
    this.charts();
  }

  charts() {
    const $this = this;
    this.loader = true; 
    this.loaderGraph.emit(true);
    this.dashboardService.findCharts().subscribe(
      (response) => {
        if(response.status == 0) {
          this.charts = response.object.charts;
          this.loader = false;            
          this.loaderGraph.emit(false);
          // setTimeout(() => {
          //   this.initSlick();
          // }, 100);
          return;
        }
        this.loader = false;
        this.loaderGraph.emit(false);
      }, (err) => {
        this.loader = false;
        this.loaderGraph.emit(false);
      }
    )
  }

  // initSlick() {
  //   $('.sliderGraph').slick({
  //     dots: false,
  //     infinite: false,
  //     speed: 300,
  //     slidesToShow: 6,
  //     slidesToScroll: 1,
  //     responsive: [
  //       {
  //         breakpoint: 1024,
  //         settings: {
  //           slidesToShow: 3,
  //           slidesToScroll: 3,
  //           infinite: true,
  //           dots: true
  //         }
  //       },
  //       {
  //         breakpoint: 600,
  //         settings: {
  //           slidesToShow: 2,
  //           slidesToScroll: 2
  //         }
  //       },
  //       {
  //         breakpoint: 480,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1
  //         }
  //       }
  //     ]
  //   });
  // }

}
