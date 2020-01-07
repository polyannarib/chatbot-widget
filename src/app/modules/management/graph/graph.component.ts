import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';

// import Swiper from 'swiper';
// import { ChartModel } from 'src/app/shared/models/chart';

declare var $: any;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {

  // chartModel: Array<ChartModel> = new Array<ChartModel>();
  // blankChartModel: Array<ChartModel> = new Array<ChartModel>();

  @Output() loaderGraph = new EventEmitter();

  chartsList: any;
  loader: boolean = false;
  mySwiper: any;
  page
  pageSize
  countChart

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngAfterViewInit() { }
  
  ngOnInit() {
    this.charts();
  }

  // ngOnDestroy() {
  //   this.mySwiper.destroy();
  // }

  // initSlider() {
  //   var swiper = new Swiper('.swiper-container', {
  //     slidesPerView: 6,
  //     spaceBetween: 30,
  //     freeMode: true
  //   });
  // }

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
          setTimeout(() => {
            this.initSlick();
          }, 100);
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

  initSlick() {
    $('.sliderGraph').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
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
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
    
  }


//   findCharts() {
//     this.loader = true;
//     let params = {
//       "page": this.page,
//       "pageSize": this.pageSize
//     }
//     this.dashboardService.findCharts(params).subscribe(
//       (response) => {
//          this.countChart = response.object.count;
//          response.object.charts.forEach( (curr: any) => {
//           let tmp: any;
//           tmp.pieChartColors = [{
//             "backgroundColor": curr.backgroundColor,
//             "hoverBackgroundColor": curr.hoverBackgroundColor,
//             "borderWidth": 2,
//           }];
//           tmp.pieChartLabels = curr.labels;
//           tmp.pieChartData = curr.data;
//           tmp.pieChartOptions = {
//             responsive: true,
//             scales: {
//               position: 'top'
//             },
//             title: {
//               display: true,
//               text: curr.label,
//               position: 'top'
//             },
//             spanGaps: false,
//             maintainAspectRatio: true,
//             tooltips: {
//               enabled: true
//             },
//             legend: {
//               position: 'top',
//               align: 'start',
//               display: true,
//               labels: {
//                 boxWidth: 50
//               }
//             },
//             plugins: {
//               datalabels: {
//                 formatter: (value, ctx) => {
//                   const label = ctx.chart.data.labels[ctx.dataIndex];
//                   return label;
//                 },
//               },
//             }
//           };
//           this.chartModel.push( tmp );
//          });
//          this.loader = false;
//       }
//     )
//   }

//   refreshChart() {
//     this.chartModel = new Array< ChartModel >();
//     this.findCharts();
//   }

//   chartToLeft() {
//     this.chartModel = new Array< ChartModel >();
//     this.page = this.page - 1;
//     this.findCharts();
//   }

//   chartToRight() {
//     this.chartModel = new Array< ChartModel >();
//     this.page = this.page + 1;
//     this.findCharts();
//   }

}
