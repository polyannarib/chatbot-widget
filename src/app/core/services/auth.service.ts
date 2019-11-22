import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Login } from 'src/app/shared/models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken: string = localStorage.getItem('acessToken');
  jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  login(data): Observable<any> {
    return this.http.post<any>(`${environment.back_end_url}/login`, data);
  }
  
  logout(): void {
    localStorage.removeItem('acessToken');
  }

  getUser() {
    if(this.getToken && this.isAuthenticated()) {
      return this.jwtHelper.decodeToken(this.getToken);
    }
  }

  isAuthenticated(): boolean {
    if(!this.jwtHelper.isTokenExpired(this.getToken)) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }

}
