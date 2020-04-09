import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private http: HttpClient
  ) { }

  private prefixService = "player";

  findPlayers(params: any): Observable< any > {
    return this.http.get(environment.back_end_url + '/dashboard/player', {params: params} );
  }

  findDesignatePlayers(taskId: Number): Observable<any> {
    return this.http.get(`${environment.back_end_url}/dashboard/task/${taskId}/player/available`);
  }

  findAllocation(id: Number, params: any): Observable<any> {
    return this.http.get(environment.back_end_url + '/dashboard/player/' + id + '/allocation', {params: params} );
  }

  findAllPlayers(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/user`);
  }

  findPlayerDeck(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/card/myDeck`);
  }
  
  getPlayerProfile(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}`);
  }

}
