import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient
  ) { }

  private prefixService = 'department';

  findAllDepartments(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}`);
  }

  findDepartment(name: string): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}`);
  }

}
