import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  http: any;

  constructor() { }

  private prefixService = 'team';

  findAllTeam(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}`);
  }

}
