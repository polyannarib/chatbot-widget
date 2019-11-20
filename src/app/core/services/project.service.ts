import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url: string = environment.back_end_url;

  constructor(private http: HttpClient) { }

  listProjects(params: any): Observable<any> {
    return this.http.get(this.url + '/dashboard/project', {params: params});
  }

  findAllocation(params): Observable<any> {
    return this.http.get(this.url + '/project_allocation', {params: params} );
  }
  
}
