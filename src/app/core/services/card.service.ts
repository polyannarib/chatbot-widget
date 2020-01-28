import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  searchComboCompetence(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/knowledge`);
  }

  getCategory(data): Observable<any> { 
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/knowledge?knowledgeParentId=` + data);
  }

  // http://192.168.1.229:8989/workplayer-portal/services/card/knowledge?knowledgeParentId=1
}
