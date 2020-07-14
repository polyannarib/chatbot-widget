import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {
  
  // @Input() itens: Array<any>;
  @Input() initialPage: number;
  @Input() pageSize: number;
  @Input() totalFound: number;
  @Output() changePage = new EventEmitter<any>(true)
  
  pageNumbers: number;

  ngOnInit() {
    if(this.initialPage == null) {
      this.initialPage = 1;
    }
    
    // this.pageNumbers = this.totalFound / this.pageSize;
    // if( (this.pageNumbers * this.pageSize) < this.totalFound ){
    //       this.pageNumbers = this.pageNumbers + 1;
    // }
    // const teste = Array(this.totalFound).fill(0).map((x) => x);
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    if (changes.items.currentValue !== changes.items.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  private setPage(number) {
    return number;
  }

  // pageSizeOptions: number[] = [20, 30, 50, 100];
  // pageEvent: PageEvent;

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //   }
  // }

  // numeroPaginas = totalFound / pageSize;
  // if( (numeroPaginas * pageSize) < totalFound ){
  //       numeroPaginas = numeroPaginas + 1;
  // }

}
