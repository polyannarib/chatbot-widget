import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = environment.fake_rest;
  
  constructor(private http: HttpClient) { }

  findTasks(params) : Observable< any > {
    return this.http.get( this.url + '/task', { params:params } );
  }
}
