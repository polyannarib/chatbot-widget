import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  
  @Input() page: number;
  @Input() pageSize: number;
  @Input() totalFound: number;

  selectViewQuantitFound: number[] = [10, 20, 50, 100];
  qtdPages: number = 10;
  qtdViews = this.totalFound / this.pageSize;

  constructor() { }

  ngOnInit() { }

  selectPage(select) {
    if (select == 'prev') {
      this.page = this.page--;
      return;
    }
    if (select == 'next') {
      this.page = this.page++;
      return;
    }
    this.page = select;
  }

}
