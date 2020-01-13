import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-find',
  templateUrl: './resource-find.component.html',
  styleUrls: ['./resource-find.component.css']
})
export class ResourceFindComponent implements OnInit {

  displayedColumns: string[] = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data = [
    { img: 'https://asdasdasdasd', name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    { img: 'https://asdasdasdasd', name: 'Helium', weight: 4.0026, symbol: 'He'},
    { img: 'https://asdasdasdasd', name: 'Lithium', weight: 6.941, symbol: 'Li'},
    { img: 'https://asdasdasdasd', name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    { img: 'https://asdasdasdasd', name: 'Boron', weight: 10.811, symbol: 'B'},
    { img: 'https://asdasdasdasd', name: 'Carbon', weight: 12.0107, symbol: 'C'},
    { img: 'https://asdasdasdasd', name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    { img: 'https://asdasdasdasd', name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    { img: 'https://asdasdasdasd', name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    { img: 'https://asdasdasdasd', name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
