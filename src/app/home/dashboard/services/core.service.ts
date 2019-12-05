import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

import { PeriodicElement } from '../models/periodic';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  list: PeriodicElement[] = [
    {nota: 'Adicionar nota', dtInicio: new Date('09-11-2019').toLocaleDateString(), dtPrazo: new Date('09-11-2019').toLocaleDateString(), dtFim: '', obs: 'Observação', status: 1, concluida: 'false'},
    {nota: 'Adicionar nota', dtInicio: new Date('09-11-2019').toLocaleDateString(), dtPrazo: new Date('09-11-2019').toLocaleDateString(), dtFim: '', obs: 'Observação', status: 2, concluida: 'false'},
    {nota: 'Adicionar nota', dtInicio: new Date('09-11-2019').toLocaleDateString(), dtPrazo: new Date('09-11-2019').toLocaleDateString(), dtFim: '', obs: 'Observação', status: 3, concluida: 'false'},
    {nota: 'Adicionar nota', dtInicio: new Date('09-11-2019').toLocaleDateString(), dtPrazo: new Date('09-11-2019').toLocaleDateString(), dtFim: '', obs: 'Observação', status: 4, concluida: 'false'},
    {nota: 'Adicionar nota', dtInicio: new Date('09-11-2019').toLocaleDateString(), dtPrazo: new Date('09-11-2019').toLocaleDateString(), dtFim: '', obs: 'Observação', status: 5, concluida: 'false'}
  ];
  list$: BehaviorSubject<PeriodicElement[]> = new BehaviorSubject(this.list);

  constructor() {
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