import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

/* import { SelectAutocompleteComponent } from 'mat-select-autocomplete'; */

@Component({
  selector: 'app-resource-find',
  templateUrl: './resource-find.component.html',
  styleUrls: ['./resource-find.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResourceFindComponent implements OnInit {

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  // @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  
  // /** list of banks */
  // protected banks: any = [
  //   { id: 1, name: "Bradesco" },
  //   { id: 2, name: "Santander" },
  //   { id: 3, name: "Itau" },
  //   { id: 4, name: "Nubank" },
  //   { id: 5, name: "Inter" },
  //   { id: 6, name: "Caixa" },
  //   { id: 7, name: "Banco do Brasil" }
  // ];

  // /** control for the selected bank */
  // public bankCtrl: FormControl = new FormControl();
  
  // /** control for the MatSelect filter keyword */
  // public bankFilterCtrl: FormControl = new FormControl();
  // public filteredBanks: ReplaySubject<any> = new ReplaySubject<any>(1);
  
  constructor() { }

  ngOnInit() { }

}
