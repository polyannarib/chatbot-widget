import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/core/services/card.service';

@Component({
  selector: 'app-resource-find',
  templateUrl: './resource-find.component.html',
  styleUrls: ['./resource-find.component.css']
})
export class ResourceFindComponent implements OnInit {

  // competenciasTecnicas = [
  //   { 'id': 1, 'name': 'Competências Técnicas' },
  //   { 'id': 2, 'name': 'Competências de Negócio' },
  //   { 'id': 3, 'name': 'Competências Comportamentais' },
  // ]
  // categoria = [
  //   { 'id': 4, 'name': 'Tecnologia', 'parent': 1 },
  //   { 'id': 5, 'name': 'Metodologia', 'parent': 1 },
  //   { 'id': 144, 'name': 'Materiais', 'parent': 1 },
  //   { 'id': 16, 'name': 'Negocio Algar', 'parent': 2 },
  // ]
  // categoria = [
  //   { 'id': 4, 'name': 'Tecnologia', 'parent': 1 },
  //   { 'id': 5, 'name': 'Metodologia', 'parent': 1 },
  //   { 'id': 144, 'name': 'Materiais', 'parent': 1 },
  //   { 'id': 16, 'name': 'Negocio Algar', 'parent': 2 },
  //   { 'id': 16, 'name': 'Negocio Algar', 'parent': 2 },
  //   { 'id': 4, 'name': 'Tecnologia', 'parent': 1 },
  //   { 'id': 5, 'name': 'Metodologia', 'parent': 1 },
  //   { 'id': 144, 'name': 'Materiais', 'parent': 1 },
  //   { 'id': 16, 'name': 'Negocio Algar', 'parent': 2 },
  //   { 'id': 16, 'name': 'Negocio Algar', 'parent': 2 },
  //   { 'id': 5, 'name': 'Metodologia', 'parent': 1 },
  //   { 'id': 144, 'name': 'Materiais', 'parent': 1 },
  //   { 'id': 16, 'name': 'Negocio Algar', 'parent': 2 },
  //   { 'id': 16, 'name': 'Negocio Algar', 'parent': 2 },
  // ]

  // loaderFind: boolean = false;
  // aux: number = 0;
  // results: any = new Object();
  // competencias = [];
  // labels = [];
  // listIds: number[];
  // group: any;
  form = new Object();
  // orderForm: any;
  // knowledge: any;
  // levelList = [];
  resultado: any;

  parentIdsLevels: number[] = [];
  parentIdsWorkGroups: number[] = [];
  idsLevels: any;
  idsWorkGroups: any;

  level = new Object();

  persons: any;
  personList: any;

  currentPage : number;
  size : number;
  pageLength : number;

  constructor(
    private _cardService: CardService
  ) { }

  ngOnInit() {
    // this.getKnowledgeIn();
  }

  findPerson() {
    this._cardService.findPerson(this.parentIdsLevels, this.idsWorkGroups).subscribe(
      (result) => {
        if(result['status'] == 0) {
          this.personList = result['object']['table'];
          this.size = this.personList.size;
        }
      }, (err) => {
        console.log('deu ruim');
      })
  }

  FindParente(event, resource) {
    // console.log(' ---- this.form ---- ');
    // console.log(event);
    // console.log(resource);
    if(event.length) {
      event.value.forEach((element) => {
        if(!this.parentIdsLevels.includes(element)) {
          this.parentIdsLevels.push(element);
        }
      });
      var idLevels = this.parentIdsLevels.join();
      this.getKnowledgeIn(idLevels)
    }
  }

  // FindParente(event, resource) {

  //   console.log(' ---- this.form ---- ');
  //   console.log(event);
  //   console.log(resource);

  //   if(event.value.length > 0) {
  //     event.value.forEach((element) => {
  //       if(!this.parentIdsLevels.includes(element)) {
  //         this.parentIdsLevels.push(element);
  //       }
  //     });
  //     var idLevels = this.parentIdsLevels.join();
  //     this.getKnowledgeIn(idLevels);
  //   }

  // }

  getKnowledgeIn(ids?: any) {
    this._cardService.KnowledgeIn(ids).subscribe(
      (response) => {
        if(response.status == 0) {
          if(!this.resultado) {
            this.resultado = response.object
          } else {
            var sum = response.object.reduce( function( prevVal, elem ) {
              console.log(prevVal);
              console.log(elem);
              return elem;
          }, 0 )
          }
        }
    }, (err) => {
      console.log('Deu ruim');
    })
  }

  findWorkgroup(event) {
    if(event.length > 0) {
      event.forEach((element) => {
        if(!this.parentIdsWorkGroups.includes(element)) {
          this.parentIdsWorkGroups.push(element);
        }
      });
      this.idsWorkGroups = this.parentIdsWorkGroups.join();
    } else {
      this.idsWorkGroups = null;
    }
  }

  onPaginateChange(event) {
    this.currentPage = event.pageIndex;
    this.size = event.pageSize;
    this.pageLength = event.length;
  }

  // getKnowledgeIn(ids?: any) {
  //   // console.log(ids);
  //   this.cardService.KnowledgeIn(ids).subscribe(
  //     (response) => {
  //       if(response.status == 0) {
  //         // this.levelList = [];
          
  //         // this.levelList.push({
  //         //   level: 1,
  //         // });
          
  //         if(!ids) {
  //           this.results[response.object[0].level] = response.object[0];
  //           console.log(this.results);
  //           return;
  //         }
  //         response.object.forEach((element) => {
  //           var levelFind = this.levelList.find((elementFind) => {
  //             return elementFind.level == element.level;
  //           });
  //           if(!!!levelFind) {
  //             this.levelList.push({
  //               level: element.level
  //             })
  //           }
  //           this.results[element.level] = element;
  //         });
  //       } else {
  //         return;
  //       }
  //     },(error) => {
  //       console.log('entrou dentro do error');
  //       console.log(error);
  //   })
  // }

  // FindParente(event, level?) {
  //   this.parentIds = [];
  //   this.levelList.forEach((element, index) => {
  //     if(element.level > level) {
  //         delete this.results[element.level];
  //         this.levelList.splice(index, 1);
  //         delete this.form[element.level];
  //       }
  //     }); 
  //   if(level == 1 && this.levelList.length > 1) {
  //     this.getKnowledgeIn();
  //     return;
  //   }
  //   event.forEach((element) => {
  //     if(!this.parentIds.includes(element)) {
  //       this.parentIds.push(element)
  //     }
  //   });
  //   var ids = this.parentIds.join();
  //   this.getKnowledgeIn(ids);
  // }

  // setParent(parent) {

  // }

  // get getResults() {
  //   return this.results;
  // }

}