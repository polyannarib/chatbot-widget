import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

}
