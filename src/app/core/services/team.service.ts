import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private http: HttpClient
  ) { }

  private prefixService = 'team';

  save(data: any): Observable<any> {
    return this.http.post(`${environment.back_end_url}/${this.prefixService}/save`, data);
  }

  findAllTeam(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}`);
  }

}
