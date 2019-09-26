import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = environment.back_end_url;
  
  constructor(private http: HttpClient) { }

  findTasks(playerId: Number, date: String) : Observable< any > {
    return this.http.get( this.url + '/dashboard/player/' + playerId + '/task/date/' + date );
  }

  findProjectTasks(id: Number, date: String): Observable< any > {
    return this.http.get( this.url + '/dashboard/project/' + id + '/task/date/' + date );
  }
}
