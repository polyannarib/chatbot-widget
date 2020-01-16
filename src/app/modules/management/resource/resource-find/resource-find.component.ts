import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';

@Component({
  selector: 'app-resource-find',
  templateUrl: './resource-find.component.html',
  styleUrls: ['./resource-find.component.css']
})
export class ResourceFindComponent implements OnInit {

  @ViewChild(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;

  options = [
    {
      display: 'One',
      value: '1'
    }, {
      display: 'Two',
      value: '2'
    }, {
      display: 'Three',
      value: '3'
    }, {
      display: 'Four',
      value: '4'
    }, {
      display: 'Five',
      value: '5'
    }, {
      display: 'Six',
      value: '6'
    }
  ];
  profileForm = new FormGroup({
    selected: new FormControl(['1', '2', '3'])
  });

  constructor() { }

  ngOnInit() {
    
  }

  onToggleDropdown() {
    this.multiSelect.toggleDropdown();
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }

}
