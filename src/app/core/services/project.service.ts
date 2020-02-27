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
    return this.http.get(this.url + '/project_allocation', {params: params});
  }

  getProject(params: any): Observable<any> {
    return this.http.get(`${environment.back_end_url}/project`, {params: params});
  }

  getAllProjectsKyrograma(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/externalProject`);
  }

  importProjectWorkplayer(data): Observable<any> {
    return this.http.post(`${environment.back_end_url}/externalProject/start`, data);
  }

  updateProject(params: any): Observable<any> {
    return this.http.post(`${environment.back_end_url}/project`, params);
  }
  
}
