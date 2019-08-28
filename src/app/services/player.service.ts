import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private url: string = environment.fake_rest;

  constructor(private http: HttpClient) { }

  findPlayers(params): Observable< any > {
    return this.http.get( this.url + '/players', {params : params});
  }

}
