import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(
    private http: HttpClient
  ) { }

  private prefixService = 'team';

  findFunctionByDepartment(id): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/?departmentId=${id}`);
  }
  
}
