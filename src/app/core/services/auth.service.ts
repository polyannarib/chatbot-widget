import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(data): Observable<any> {
    return this.http.post<any>(`${environment.back_end_url}/login`, data);
  }
  
  logout(): void {
    localStorage.removeItem('acessToken');
  }

  getUser() {
    if(localStorage.getItem('acessToken') && this.isAuthenticated()) {
      return this.jwtHelper.decodeToken(localStorage.getItem('acessToken'));
    }
  }

  setToken(token: string): void {
    localStorage.setItem('acessToken', token);
    this.router.navigate(['/management/dashboard']);
  }

  isAuthenticated(): boolean {
    if(!this.jwtHelper.isTokenExpired(localStorage.getItem('acessToken'))) {
      return true;
    } else {
      return false;
    }
  }

}
