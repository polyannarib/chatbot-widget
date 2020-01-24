import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { CardService } from 'src/app/core/services/card.service';

@Component({
  selector: 'app-resource-find',
  templateUrl: './resource-find.component.html',
  styleUrls: ['./resource-find.component.css']
})
export class ResourceFindComponent implements OnInit {

  aux: number = 1;
  parentIds: number[] = [];
  
  constructor(
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.getKnowledgeIn();
  }

  getKnowledgeIn() {
    this.cardService.KnowledgeIn().subscribe(
      (response) => {
        
      },(error) => {
        
    })
  }

}
