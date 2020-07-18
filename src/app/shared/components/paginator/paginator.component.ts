import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  
  // @Input() itens: Array<any>;
  @Input() pageSelected: number;
  @Input() pageSize: number;
  @Input() totalFound: number;
  @Output() page = new EventEmitter<any>(true)
  
  pageNumbers: number;
  pageNumbersArray = new Array;

  ngOnInit() {
    if(this.pageSelected == null) {
      this.pageSelected = 1;
    }
    if(this.totalFound > this.pageSize) {
      var quotient = Math.floor(this.totalFound / this.pageSize);
      var remainder = this.totalFound % this.pageSize;
      if(remainder != 0) {
        this.pageNumbers = quotient + 1;
      } else {
        this.pageNumbers = quotient;
      }
    } else {
      this.pageNumbers = 1;
    }

    // console.log('----valores------')
    // console.log(remainder)
    // console.log(quotient)
    // console.log(this.pageNumbers)

    for (let index = 1; index <= this.pageNumbers; index++) {
      // console.log('Entrou dentro do for')
      this.pageNumbersArray.push(index);
    }

    console.log('---pageNumbersArray---')
    console.log(this.pageNumbersArray)

    // this.pageNumbers = this.totalFound / this.pageSize;
    // if( (this.pageNumbers * this.pageSize) < this.totalFound ){
    //       this.pageNumbers = this.pageNumbers + 1;
    // }
    // const teste = Array(this.totalFound).fill(0).map((x) => x);
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('Entrou dentro do ngOnChanges')
  //   console.log(changes)
  // }

  private setPage(number) {
    this.pageSelected = number;
    this.page.emit(this.pageSelected);
  }

  private next() {
    const page = this.pageSelected ++;
    this.setPage(page)
  }

  private prev() {
    const page = this.pageSelected --;
    this.setPage(page)
  }

  private lastPage(): boolean {
    var ultimo = this.pageNumbersArray.pop();
    if(this.pageNumbersArray.length > 1 && this.pageSelected == ultimo) {
      return true;
    }
    return false;
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
