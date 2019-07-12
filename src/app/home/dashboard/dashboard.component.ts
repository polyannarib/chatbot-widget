import { Component, OnInit, ElementRef } from '@angular/core';
import { ChartOptions } from 'chart.js';

declare var jQuery: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private graphics: Array<any> = [];
  private chartColors: Array<any> = [];
  private chartOptions: ChartOptions;
 
  constructor( private el: ElementRef) {}

  ngOnInit() {
    jQuery(this.el.nativeElement).find('.collapsible').collapsible();
    var main = getComputedStyle(document.body).getPropertyValue('--graph-main-color');
    var second = getComputedStyle(document.body).getPropertyValue('--graph-color');
    this.chartColors.push({
      backgroundColor: [main,second],
      pointBackgroundColor: [main,second]
    })
    this.chartOptions = {
      responsive: true,
    };
    
    // Para teste
    this.graphics.push({
      title: "Projeto no prazo",
      data: [5,2],
      labels: ['Projeto no prazo', 'Projeto atrasado'],
      type: 'pie'
    })
    this.graphics.push({
      title: "Recurso utilizado",
      data: [5,20],
      labels: ['Recurso utilizado', 'Recurso não utilizado'],
      type: 'pie'
    })
    this.graphics.push({
      title: "Cards Utilizados",
      data: [15,2],
      labels: ['JS', 'Java'],
      type: 'pie'
    })
    this.graphics.push({
      title: "Projeto alterado",
      data: [15,5],
      labels: ['Projetos alterados', 'Projeto não alterados'],
      type: 'pie'
    })
    this.graphics.push({
      title: "Recurso disponível",
      data: [15,2],
      labels: ['Recurso disponível', 'Recurso não disponível'],
      type: 'pie'
    })
    this.graphics.push({
      title: "Projetos no prazo",
      data: [15,2],
      labels: ['Projetos no prazo', 'Projetos atrasados'],
      type: 'pie'
    })
  }
}
