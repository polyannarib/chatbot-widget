import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private url: string = environment.back_end_url;

  constructor(private http: HttpClient) { }

  findPlayers(params: any): Observable< any > {
    return this.http.get( this.url + '/dashboard/player', {params : params} );
  }

  findDesignatePlayers(taskId: Number): Observable< any > {
    return this.http.get( this.url + '/dashboard/task/' + taskId + '/player/available' );
  }

  findAllocation(id: Number, params: any): Observable< any > {
    return this.http.get( this.url + '/dashboard/player/' + id + '/allocation', {params:params} );
  }

}
