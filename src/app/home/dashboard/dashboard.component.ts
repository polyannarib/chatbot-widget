import { Component, OnInit, ElementRef, EventEmitter } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet} from 'ng2-charts';
import { MaterializeAction } from 'angular2-materialize';
//import $ from '';

declare var jQuery: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'Gamefication';
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  //public pieChartTitle: Title = 'teste';
  public pieChartLabels: Label[] = ['Recurso Disp', 'Recurso Prog'];
  public pieChartData: SingleDataSet = [1500, 800];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public chartColors: Array<any> = [
    { // first color
      backgroundColor:['rgba(251, 200, 68, 0.8)', 'rgba(150, 150, 150, 0.8)'] ,
      pointBackgroundColor: ['rgba(225,10,24,0.2)','purple'],
    }];

  public pieChartLabels2: Label[] = ['Rec. no prazo', 'Rec. atrasados'];
  public pieChartData2: SingleDataSet = [98, 2];
  public pieChartLegend2 = false;

  public pieChartLabels3: Label[] = ['Req. no prazo', 'Req. atrasados'];
  public pieChartData3: SingleDataSet = [15, 7];
  public pieChartLegend3 = false;

  public pieChartLabels4: Label[] = ['Pjt. no prazo', 'Pjt. atrasados'];
  public pieChartData4: SingleDataSet = [5, 2];
  public pieChartLegend4 = false;

  public pieChartLabels5: Label[] = ['Req. no prazo', 'Req. atrasados'];
  public pieChartData5: SingleDataSet = [3, 2];
  public pieChartLegend5 = false;

  public pieChartLabels6: Label[] = ['Projeto sem alteração', 'Projeto alterado'];
  public pieChartData6: SingleDataSet = [3, 4];
  public pieChartLegend6 = false;

  public pieChartLabels7: Label[] = ['Conhecimento utilizado', 'Conhecimento não utilizado'];
  public pieChartData7: SingleDataSet = [70, 30];
  public pieChartLegend7 = false;

  modalActions = new EventEmitter<string|MaterializeAction>();
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  
  constructor(
    private el: ElementRef,


    ) { }

  ngOnInit() {
    jQuery(this.el.nativeElement).find('.collapsible').collapsible();
    // jQuery(this.el.nativeElement).find('.tap-target').tapTarget();
    // document.addEventListener('DOMContentLoaded', function() {
    //   var elems = document.querySelectorAll('.collapsible');
    //   var instances = M.Collapsible.init(elems, options);
    // });
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }}
