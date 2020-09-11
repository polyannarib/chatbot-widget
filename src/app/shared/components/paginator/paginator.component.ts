import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProfileService } from 'src/app/core/services/profile.service';

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
  loader: boolean = true;

  mainStyle = this.profileService.getAppMainColor();
  secondarytyle = this.profileService.getAppSecondaryColor();

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    // this.pageNumbers = this.totalFound / this.pageSize;
    // if( (this.pageNumbers * this.pageSize) < this.totalFound ){
    //       this.pageNumbers = this.pageNumbers + 1;
    // }
    // const teste = Array(this.totalFound).fill(0).map((x) => x);
  }

  getPageNumbers() {
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
    return Array(this.pageNumbers).fill(0).map((x,i) => i + 1);
    // this.pageNumbersArray = Array(this.pageNumbers).fill(0).map((x,i)=>i++);
    // return this.pageNumbersArray;
    // for (let index = 1; index <= this.pageNumbers; index++) {
    //   this.pageNumbersArray.push(index);
    // }
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('Entrou dentro do ngOnChanges')
  //   console.log(changes)
  // }

  setPage(number) {
    this.pageSelected = number;
    this.page.emit(this.pageSelected);
  }

  next() {
    const page = this.pageSelected + 1;
    this.setPage(page)
  }

  prev() {
    const page = this.pageSelected - 1;
    this.setPage(page)
  }

  lastPage(): boolean {
    let pages = this.getPageNumbers();
    var ultimo = pages.pop();
    if(pages.length > 1 && this.pageSelected == ultimo) {
      return true;
    }
    return false;
  }

  getStyle(pageSelected, item) {
    if(pageSelected === item) { 
      return this.mainStyle;
    }
    return 'none';
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
