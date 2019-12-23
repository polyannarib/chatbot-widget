import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient
  ) { }

  private prefixService = 'department';

  save(data: any): Observable<any> {
    return this.http.post(`${environment.back_end_url}/${this.prefixService}/save`, data);
  }

  findAllDepartments(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/list`);
  }

  findDepartment(name: string): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}`);
  }

}
