import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/core/services/card.service';
import { MatSnackBar } from '@angular/material';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';

@Component({
  selector: 'app-resource-find',
  templateUrl: './resource-find.component.html',
  styleUrls: ['./resource-find.component.css']
})
export class ResourceFindComponent implements OnInit {

  form = new Object();
  
  listKnowledge: any;
  filterListKnowledge: any;
  selectedLevelElement;
  disabled: boolean = true;

  idLevels: number[] = [];

  parentIdsLevels: number[] = [];
  parentIdsWorkGroups: number[] = [];
  idsLevels: any;

  level = new Object();

  persons: any;
  personList: any;

  loader: boolean = false;
  loaderFind: boolean = false;

  workGroupFilter: any;

  // ------- Workgroup ------- //
  levelWorkgroup: number = 1;
  idsWorkGroups: any;
  
  constructor(
    private _cardService: CardService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getKnowledgeIn();
    this.searchWorkgroup();
  }

  findPerson() {  
    this.loader = true;
    this._cardService.findPerson(this.parentIdsLevels, this.idsWorkGroups).subscribe(
      (result) => {
        if(result['status'] == 0) {
          this.personList = result['object']['table'];
          this.loader = false;
          return;
        }
        this.loader = false;
        this._snackBar.openFromComponent(NotifyComponent, 
          { data: { type: 'error', message: 'Nenhum resultado foi encontrado!' }});
      }, (err) => {
        console.log('deu ruim');
        this.loader = false;
      })
  }

  FindParente(event, resource) {
    if(resource.level === 4) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
    this.parentIdsLevels = [];
    if(this.filterListKnowledge) {
      this.filterListKnowledge.forEach((element, position) => {
        if(element.level > resource.level) {
          var index = this.filterListKnowledge.indexOf(position);
          this.filterListKnowledge.splice(index, 1);
        }
      });
    }
    if(event.value.length > 0) {
      event.value.forEach((element) => {
        if(!this.parentIdsLevels.includes(element)) {
          this.parentIdsLevels.push(element);
        }
      });
      var idLevels = this.parentIdsLevels.join();
      this.getKnowledgeIn(idLevels);
    }
  }

  getKnowledgeIn(ids?: any) {
    this.loaderFind = true;
    this._cardService.KnowledgeIn(ids).subscribe(
      (response) => {
        if(response.status == 0) {
          this.listKnowledge = response.object;
          this.filterList(this.listKnowledge);
          this.loaderFind = false;
          return;
        }
        this.loaderFind = false;
      }, (err) => {
        this.loaderFind = false;
        console.log('Deu ruim');
    })
  }

  filterList(list) {
    if(!this.filterListKnowledge) {
      this.filterListKnowledge = list;
      return;
    }
    list.forEach((element) => {
      var levelFind = this.filterListKnowledge.find((elementFind) => {
        return elementFind.level == element.level;
      });
      if(!!!levelFind) {
        this.filterListKnowledge.push(element);
      }
    });
  }

  findWorkgroup(event) {
    this.parentIdsWorkGroups = [];
    if(event.value.length > 0) {
      event.value.forEach((element) => {
        if(!this.parentIdsWorkGroups.includes(element)) {
          this.parentIdsWorkGroups.push(element);
        }
      });
      this.idsWorkGroups = this.parentIdsWorkGroups.join();
    } else {
      this.idsWorkGroups = null;
    }
  }

  searchWorkgroup() {
    this.workGroupFilter = [];
    this._cardService.searchWorkgroup().subscribe(
      (response) => {
        if(response.status == 0) {
          this.workGroupFilter.push({
            'level': this.levelWorkgroup,
            'workgroupList': response.object
          })
          return;
        }
        console.log('deu ruim');
      }, (err) => {
        console.log('deu ruim');
    })
  }

  FindParenteWorkgroup(value, workgroup) {
    if(value.hasChildren == 'N') {
      this.idsWorkGroups = value.id;
      this.findPerson();
      return;
    }
    this.levelWorkgroup = this.levelWorkgroup++;
    this.searchWorkgroupParent(value.id);
  }

  searchWorkgroupParent(id: number) {
    this._cardService.searchWorkgroup(id).subscribe(
      (response) => {
        if(response.status == 0) {
          this.workGroupFilter.push({
            'level': this.levelWorkgroup,
            'workgroupList': response.object
          })
          return;
        }
        console.log('deu ruim');
      }, (err) => {
        console.log('deu ruim');
    })
  }

}