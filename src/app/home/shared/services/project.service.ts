import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url: string = environment.fake_rest;

  constructor(private http: HttpClient) { }

  listProjects(): Observable<any> {
    return this.http.get(this.url + '/project');
  }

  findAllocation(params): Observable<any> {
    return this.http.get(this.url + '/project_allocation', {params:params} );
  }
}
