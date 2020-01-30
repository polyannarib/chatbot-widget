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
  //   { 'id': 16, 'name': 'Negocio Vivo', 'parent': 2 },
  // ]
  // cla = [
  //   { 'id': 4, 'name': 'Java', 'parent': 1 },
  //   { 'id': 5, 'name': '.NET', 'parent': 1 },
  //   { 'id': 144, 'name': 'Mobile', 'parent': 1 },
  //   { 'id': 16, 'name': 'B.I', 'parent': 2 },
  //   { 'id': 16, 'name': 'Front', 'parent': 2 },
  //   { 'id': 4, 'name': 'C/C++', 'parent': 1 },
  //   { 'id': 5, 'name': 'Sustentacao', 'parent': 1 },
  //   { 'id': 144, 'name': 'Coringa', 'parent': 1 },
  //   { 'id': 16, 'name': 'Inteligencia Artificial', 'parent': 2 },
  //   { 'id': 16, 'name': 'Design/Front', 'parent': 2 },
  //   { 'id': 5, 'name': 'Banco de Dados', 'parent': 1 },
  //   { 'id': 144, 'name': 'Espaço', 'parent': 1 },
  //   { 'id': 16, 'name': 'Equipamento', 'parent': 2 },
  //   { 'id': 16, 'name': 'Algar', 'parent': 2 },
  //   { 'id': 16, 'name': 'Vivo', 'parent': 2 },
  // ]
  // competencia = [
  //   { 'id': 58, 'name': Oracle', 'parent': 1 },
  //   { 'id': 59, 'name': Design Thinking', 'parent': 1 },
  //   { 'id': 60, 'name': Prototipacao', 'parent': 1 },
  //   { 'id': 61, 'name': Layotizacao', 'parent': 2 },
  //   { 'id': 62, 'name': JAVASCRIPT', 'parent': 2 },
  //   { 'id': 63, 'name': ANGULAR JS ', 'parent': 1 },
  //   { 'id': 64, 'name': JQUERY', 'parent': 1 },
  //   { 'id': 65, 'name': BOOTSTRAP', 'parent': 1 },
  //   { 'id': 66, 'name': HTML', 'parent': 2 },
  //   { 'id': 67, 'name': CSS', 'parent': 2 },
  //   { 'id': 68, 'name': Web Application', 'parent': 1 },
  //   { 'id': 185, 'name': Teste Automatizado', 'parent': 1 },
  //   { 'id': 187, 'name': SCRUM', 'parent': 2 },
  //   { 'id': 69, 'name': UX', 'parent': 2 },
  //   { 'id': 70, 'name': UI', 'parent': 2 },
  //   { 'id': 71, 'name': PHP', 'parent': 1 },
  //   { 'id': 72, 'name': ANDROID', 'parent': 1 },
  //   { 'id': 73, 'name': IONIC', 'parent': 1 },
  //   { 'id': 74, 'name': PYTHON', 'parent': 2 },
  //   { 'id': 75, 'name': Delphi', 'parent': 2 },
  //   { 'id': 76, 'name': Shell Script', 'parent': 1 },
  //   { 'id': 77, 'name': Unix/Linux', 'parent': 1 },
  //   { 'id': 78, 'name': SOA', 'parent': 1 },
  //   { 'id': 79, 'name': C', 'parent': 2 },
  //   { 'id': 80, 'name': Spring boot', 'parent': 2 },
  //   { 'id': 23, 'name': C#', 'parent': 1 },
  //   { 'id': 24, 'name': F#', 'parent': 1 },
  //   { 'id': 25, 'name': J#', 'parent': 2 },
  //   { 'id': 26, 'name': C++', 'parent': 2 },
  //   { 'id': 192, 'name': Kenan', 'parent': 2 },
  //   { 'id': 193, 'name': Atlys', 'parent': 1 },
  //   { 'id': 194, 'name': VivoNext', 'parent': 1 },
  //   { 'id': 195, 'name': Organização', 'parent': 2 },
  //   { 'id': 196, 'name': Cooperação', 'parent': 2 },
  //   { 'id': 189, 'name': Algar CRM', 'parent': 2 },
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

  idLevels: number[] = [];

  level1: any
  level2: any
  level3: any
  level4: any
  workgroup1: any

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

  loader: boolean = false;

  constructor(
    private _cardService: CardService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // this.getKnowledgeIn();
  }

  findPerson() {  
    this.loader = true;
    this._cardService.findPerson(this.parentIdsLevels, this.idsWorkGroups).subscribe(
      (result) => {
        if(result['status'] == 0) {
          this.personList = result['object']['table'];
          this.size = this.personList.size;
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

  // FindParente(event) {
  //   // console.log(' ---- this.form ---- ');
  //   // console.log(event);
  //   // console.log(resource);
  //   if(event.length) {
  //     event.value.forEach((element) => {
  //       if(!this.parentIdsLevels.includes(element)) {
  //         this.parentIdsLevels.push(element);
  //       }
  //     });
  //     this.idLevels = this.parentIdsLevels.join();
  //     // this.getKnowledgeIn(idLevels)
  //   }
  // }

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

  // getKnowledgeIn(ids?: any) {
  //   this.loader = true;
  //   this._cardService.KnowledgeIn(ids).subscribe(
  //     (response) => {
  //       if(response.status == 0) {
  //         this.resultado = response.object;
  //         this.loader = false;
  //         return;
  //       }
  //       this._snackBar.openFromComponent(NotifyComponent, 
  //         { data: { type: 'error', message: 'Nenhum resultado foi encontrado!' }});
  //       this.loader = false;
  //     }, (err) => {
  //       this.loader = false;
  //       console.log('Deu ruim');
  //   })
  // }

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

  FindParente(event) {
    this.parentIdsLevels = [];
    if(event.value.length > 0) {
      event.value.forEach((element) => {
        if(!this.parentIdsLevels.includes(element)) {
          this.parentIdsLevels.push(element);
        }
      });
      this.idsLevels = this.parentIdsLevels.join();
    } else {
      this.idsLevels = null;
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