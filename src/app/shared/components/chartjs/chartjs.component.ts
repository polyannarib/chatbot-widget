import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.css']
})
export class ChartjsComponent implements OnInit {

  myChart: Chart;
  ctx: any;
  id: any;

  @Input() type: string;
  @Input() labels: any;
  @Input() label: any;
  @Input() backgroundColor: any;
  @Input() borderColor: any;
  @Input() data: any;
  @Input() config: any;
  @Input() options: any;
  @Input() borderWidth: any;
  @Input() fill: boolean;
  @Input() yAxes: any;
  @Input() width: number;
  @Input() height: number;

  constructor() { }

  ngOnInit() {
    this.id = 'myChart' + new Date().getTime();
  }

  ngAfterViewInit() {
    this.dashboard();
  }

  ngOnDestroy() {
    this.myChart.destroy();
  }

  dashboard() {
    this.myChart = new Chart(this.id, {
      type: this.type, // 'doughnut'
      data: this.dataChart(),
      options: this.optionsChart()
    });
  }

  dataChart() {
    const $this = this;
    const dataset = {
      labels: $this.labels, // [ 'Africa', 'Asia', 'Europe', 'Latin America', 'North America' ],
      datasets: [
        {
          label: $this.label,
          backgroundColor: $this.backgroundColor, // [ '#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850' ],
          borderColor: $this.borderColor, // [ '#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850' ],
          data: $this.data, // [ 2478, 5267, 734, 784, 433 ]
          borderWidth: $this.borderWidth,
          fill: $this.fill
        }
      ]
    };
    const data = dataset;
    return data;
  }

  optionsChart() {
    const $this = this;
    let options = new Object();
    options = {
      responsive: true,
      scales: {
        position: 'top'
      },
      title: {
        display: true,
        position: 'top'
      },
      spanGaps: false,
      maintainAspectRatio: true,
      tooltips: {
        enabled: true
      },
      legend: {
        display: false
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label;
          },
        },
      }
    };
    return options;
  }

}
