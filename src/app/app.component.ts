import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, Color } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
  public pieChartLegend = true;
  public chartColors: Array<any> = [
    { // first color
      backgroundColor:['rgba(251, 200, 68, 0.8)', 'rgba(150, 150, 150, 0.8)'] ,
      //borderColor: ['rgba(225,10,24,0.2)', 'rgba(225,10,24,0.2)'],
      pointBackgroundColor: ['rgba(225,10,24,0.2)','purple'],
     // pointBorderColor: ['#fff','green'],
      //pointHoverBackgroundColor: ['black','blue'],
      //pointHoverBorderColor: ['rgba(225,10,24,0.2)','red']
    }];

  public pieChartLabels2: Label[] = ['Rec. no prazo', 'Rec. atrasados'];
  public pieChartData2: SingleDataSet = [98, 2];
  public pieChartLegend2 = true;

  public pieChartLabels3: Label[] = ['Req. no prazo', 'Req. atrasados'];
  public pieChartData3: SingleDataSet = [15, 7];
  public pieChartLegend3 = true;

  public pieChartLabels4: Label[] = ['Pjt. no prazo', 'Pjt. atrasados'];
  public pieChartData4: SingleDataSet = [3, 2];
  public pieChartLegend4 = true;

  public pieChartLabels5: Label[] = ['Req. no prazo', 'Req. atrasados'];
  public pieChartData5: SingleDataSet = [3, 2];
  public pieChartLegend5 = true;
  
  constructor() { }

  ngOnInit() {
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
