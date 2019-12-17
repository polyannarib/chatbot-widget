import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private url: string = environment.back_end_url;

  constructor(private http: HttpClient) { }

  findCharts(params: any): Observable< any > {
    return this.http.get( this.url + '/dashboard/chart', {params : params} );
  }

}
