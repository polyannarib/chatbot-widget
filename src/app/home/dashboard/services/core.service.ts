import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

import { PeriodicElement } from '../models/periodic';
import { NoteService } from '../../shared/services/note.service';



@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private noteService: NoteService) {
  }
  // lista:PeriodicElement[] = [];

  list: PeriodicElement[] = [
    // {nota: 'Adicionar nota', dtInicio: new Date('09-11-2019').toLocaleDateString(), dtPrazo: new Date('09-11-2019').toLocaleDateString(), dtFim: '', obs: 'Observação', status: 1, concluida: 'false'},
    // {nota: 'Adicionar nota', dtInicio: new Date('09-11-2019').toLocaleDateString(), dtPrazo: new Date('09-11-2019').toLocaleDateString(), dtFim: '', obs: 'Observação', status: 2, concluida: 'false'},
    // {nota: 'Adicionar nota', dtInicio: new Date('09-11-2019').toLocaleDateString(), dtPrazo: new Date('09-11-2019').toLocaleDateString(), dtFim: '', obs: 'Observação', status: 3, concluida: 'false'},
    // {nota: 'Adicionar nota', dtInicio: new Date('09-11-2019').toLocaleDateString(), dtPrazo: new Date('09-11-2019').toLocaleDateString(), dtFim: '', obs: 'Observação', status: 4, concluida: 'false'},
    // {nota: 'Adicionar nota', dtInicio: new Date('09-11-2019').toLocaleDateString(), dtPrazo: new Date('09-11-2019').toLocaleDateString(), dtFim: '', obs: 'Observação', status: 5, concluida: 'false'}
  ];

  list2: PeriodicElement[] = []

  list$: BehaviorSubject<PeriodicElement[]> = new BehaviorSubject(this.list);

  refreshList(statusId:Number, projectId:Number ){
    
    // this.list = [];
    // this.noteService.findNotes({"page":1,"pageSize":50,"projectId":projectId}).subscribe((resp) =>
    // {
    //   resp.object.list.forEach(element => {
        
    //       this.list.push(
    //           {nota: element.noteDescription, dtInicio: new Date(element.noteDate).toLocaleDateString(), dtPrazo: new Date(element.noteDate).toLocaleDateString(), dtFim: '', obs: element.observation, status: element.status.id, concluida: 'false'},  
    //       )
    //       this.list2.push(
    //         {nota: element.noteDescription, dtInicio: new Date(element.noteDate).toLocaleDateString(), dtPrazo: new Date(element.noteDate).toLocaleDateString(), dtFim: '', obs: element.observation, status: element.status.id, concluida: 'false'},  
    //     )
        
    //   });
    // });
  }


  refreshListFilter(statusId:number ){
      this.list = [];
      if(statusId == null){
        this.list = this.list2;
      }
      else {
      this.list2.forEach(element => {
        if(statusId && statusId == element.status){
          this.list.push(element);
        }
      });
    }
  }


  



  update(index, field, value) {
    var self = this;
    this.list = this.list.map((e, i) => {
      if (index === i) {
        self.list[index][field] = value;
        return {
          ...e,
          [field]: value
        }
      }
      return e;
    });
    this.list$.next(this.list);
  }

  getControl(index, fieldName) {
  }



}