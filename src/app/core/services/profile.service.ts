import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  prefixService = "profile";

  getWhiteLabel(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/getWhiteLabeData`);
  }

}
