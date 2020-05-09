import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter, catchError, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = environment.back_end_url;
  private prefixService: string = 'task';
  
  constructor(private http: HttpClient) { }

  createTask(data): Observable< any > {
    return this.http.post(`${environment.back_end_url}/${this.prefixService}`, data );
  }

  editTask(data): Observable< any > {
    return this.http.put(`${environment.back_end_url}/${this.prefixService}`, data );
  }

  removeTask(id: Number, reason: String ): Observable< any > {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/${id}/remove?reason=${reason}`);
  }

  findTasks(playerId: Number, date: String): Observable< any > {
    return this.http.get( this.url + '/dashboard/player/' + playerId + '/task/date/' + date );
  }

  findProjectTasks(id: Number, date: String): Observable< any > {
    return this.http.get( this.url + '/dashboard/project/' + id + '/task/date/' + date );
  }

  finalize(id: Number): Observable< any > {
    return this.http.get( this.url + '/task/' + id + '/finalize' );
  }

  suspend(id: Number, reason: String ): Observable< any > {
    return this.http.get( this.url + '/task/' + id + '/suspend?reason=' + reason );
  }

  removePlayer(id: Number, reason: String ): Observable< any > {
    return this.http.get( this.url + '/task/' + id + '/giveBack?reason=' + reason );
  }

  assignTask(taskId: Number, playerId: Number ): Observable< any > {
    return this.http.get( this.url + '/task/' + taskId + '/assign/player/' + playerId );
  }

  rescheduleTask(taskId: Number, dateTo: String): Observable< any > {
    return this.http.get( this.url + '/task/' + taskId + '/reschedule?previewedAt=' + dateTo );
  }
  
}
