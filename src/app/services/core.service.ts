import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

import { PeriodicElement } from '../home/dashboard/models/periodic';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  list: PeriodicElement[] = [
    {noteId:undefined, nota: 'teste', dtInicio: new Date('09-11-2015').toLocaleDateString(), dtPrazo: new Date('09-11-2025').toLocaleDateString(), dtFim: '', obs: 'obs', status: 2, concluida: 'false'}
  ];
  list$: BehaviorSubject<PeriodicElement[]> = new BehaviorSubject(this.list);

  constructor() {
  }


  update(index, field, value) {
    this.list = this.list.map((e, i) => {
      if (index === i) {
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