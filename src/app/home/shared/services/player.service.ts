import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private url: string = environment.fake_rest;
  private server: string = environment.back_end_url;

  constructor(private http: HttpClient) { }

  findPlayers(params): Observable< any > {
    return this.http.get( this.server + '/dashboard/player', {params : params} );
  }

  findDesignatePlayers(params): Observable< any > {
    return this.http.get( this.url + '/players_designate', {params : params} );
  }

  findAllocation(id: Number, params: any): Observable< any > {
    return this.http.get( this.server + '/dashboard/player/' + id + '/allocation', {params:params} );
  }

}
