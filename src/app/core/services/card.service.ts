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

  findCardById(id: number): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/byKnowledgeId/${id}`);
  }

  listCardsByUser(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/listCardsByUser`);
  }

  addCard(data): Observable<any> {
    return this.http.put(`${environment.back_end_url}/${this.prefixService}/active/knowledge/${data.knowledgeId}/attribute/${data.attributeId}`, data);
  }

  removeCard(data): Observable<any> {
    return this.http.put(`${environment.back_end_url}/${this.prefixService}/inactive/knowledge/${data.knowledgeId}/attribute/${data.attributeId}`, data);
  }

  searchComboCompetence(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/knowledge`);
  }

  getCategory(data): Observable<any> { 
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/knowledge?knowledgeParentId=` + data);
  }

  findPerson(parentIdsLevels: any, idsWorkGroups: any) {
    if(parentIdsLevels && !idsWorkGroups)
      return this.http.get(`${environment.back_end_url}/${this.prefixService}/person?knowledgeIds=${parentIdsLevels}&page=1&pageSize=30`);
    if(!idsWorkGroups && idsWorkGroups)
      return this.http.get(`${environment.back_end_url}/${this.prefixService}/person?workgroupIds${idsWorkGroups}&page=1&pageSize=30`);
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/person?page=1&pageSize=30&knowledgeIds=${parentIdsLevels}&workgroupIds=${idsWorkGroups}`);
    
  }
  
  KnowledgeIn(data?: any): Observable<any> {
    if(!data) {
      return this.http.get(`${environment.back_end_url}/${this.prefixService}/knowledgeIn`);
    }
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/knowledgeIn?knowledgeParentIds=${data}`);
  }



}
