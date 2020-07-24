import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(
    private http: HttpClient
  ) { }

  private prefixService = 'job';

  // http://localhost:8080/workplayer-portal/services/job/extract/2020/07
  getExtract(year: number, month: number): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/extract/${year}/${month}`);
  }
  
}
