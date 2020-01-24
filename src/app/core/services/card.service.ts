import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isEmpty } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private http: HttpClient
  ) { }

  private prefixService = "card";

  findAllTasks(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/skill`);
  }

  createCard(data: any): Observable<any> {
    return this.http.post(`${environment.back_end_url}/${this.prefixService}`, data);
  }

  listCardByPlayer(id: number): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/listCardByPlayer/${id}`);
  }

  findAllCards(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}`);
  }
  
  giveToPlayer(data): Observable<any> {
    return this.http.post(`${environment.back_end_url}/${this.prefixService}/giveToPlayer`, data);
  }

  KnowledgeIn(data?: any): Observable<any> {
    if(!data) {
      return this.http.get(`${environment.back_end_url}/${this.prefixService}/knowledgeIn`);
    }
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/knowledgeIn?knowledgeParentIds=${data}`);
  }

}
