import { Component, OnInit, ViewChild, ViewEncapsulation, OnChanges, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { CardService } from 'src/app/core/services/card.service';

@Component({
  selector: 'app-resource-find',
  templateUrl: './resource-find.component.html',
  styleUrls: ['./resource-find.component.css']
})
export class ResourceFindComponent implements OnInit {

  loaderFind: boolean = false;
  aux: number = 0;
  parentIds: number[] = [];
  results: any = new Object();
  competencias = [];
  labels = [];
  listIds: number[];
  group: any;
  form = new Object();
  orderForm: any;
  knowledge: any;
  levelList = [];
  
  constructor(
    private cardService: CardService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.levelList.push({
      level: 1,
    });
    this.getKnowledgeIn();
  }

  getKnowledgeIn(ids?: any) {
    // console.log(ids);
    this.cardService.KnowledgeIn(ids).subscribe(
      (response) => {
        if(response.status == 0) {
          // this.levelList = [];
          
          // this.levelList.push({
          //   level: 1,
          // });
          
          if(!ids) {
            this.results[response.object[0].level] = response.object[0];
            console.log(this.results);
            return;
          }
          response.object.forEach((element) => {
            var levelFind = this.levelList.find((elementFind) => {
              return elementFind.level == element.level;
            });
            if(!!!levelFind) {
              this.levelList.push({
                level: element.level
              })
            }
            this.results[element.level] = element;
          });
          console.log(this.results);
          

          // this.results = [...response.object];
          // this.results.push(response.object);
        } else {
          return;
        }
      },(error) => {
        console.log('entrou dentro do error');
        console.log(error);
    })
  }

  FindParente(event, level?) {
    this.parentIds = [];
    this.levelList.forEach((element, index) => {
      if(element.level > level) {
          delete this.results[element.level];
          this.levelList.splice(index, 1);
          delete this.form[element.level];
        }
      }); 
    if(level == 1 && this.levelList.length > 1) {
      this.getKnowledgeIn();
      return;
    }
    event.forEach((element) => {
      if(!this.parentIds.includes(element)) {
        this.parentIds.push(element)
      }
    });
    var ids = this.parentIds.join();
    // debugger;
    this.getKnowledgeIn(ids);
  }

  setParent(parent) {

  }

  get getResults() {
    return this.results;
  }

}
