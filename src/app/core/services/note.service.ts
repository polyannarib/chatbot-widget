import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http: HttpClient
  ) { }

  private prefixService: string = 'note';
  public list: any;

  findNotes(params: any): Observable<any> {
    return this.http.get<any>(`${environment.back_end_url}/${this.prefixService}/note`, { params: params });
    // return this.list;
  }
  
  saveNotes(params: any): Observable<any> {
    return this.http.post(`${environment.back_end_url}/${this.prefixService}/note`, params);
  }

  findTypesNotes(): Observable<any> {
    return this.http.get<any>(`${environment.back_end_url}/${this.prefixService}/type`);
  }

  findStatusNotes(): Observable<any> {
    return this.http.get<any>(`${environment.back_end_url}/${this.prefixService}/status`);
  }

}
