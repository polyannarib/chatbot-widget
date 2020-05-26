import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  private prefixService = 'dashboard';

  // findCharts(params): Observable<any> {
  //   return this.http.get(`${environment.back_end_url}/${this.prefixService}/chart`, {params});
  // }

  findCharts(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/chart`);
  }

  getDashboards(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/link/all`);
  }

}
