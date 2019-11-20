import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken: string = localStorage.getItem('acessToken');
  jwtHelper = new JwtHelperService();

  constructor() { }

  // login(email: string, password: string, type: string) {
  //   return this.http.post<any>(`${environment.back_end_url}/login`, {email, password, type}, { observe: 'response' })
  //     .subscribe(resp => {
  //       const token = resp.headers.get('X-Token');
  //       localStorage.setItem('currentUser', token);
  //     })
  // }
  
  logout() {
    localStorage.removeItem('acessToken');
  }

  getUser() {
    if(this.getToken) {
      return this.jwtHelper.decodeToken(this.getToken);
    }
  }

  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getToken);
  }

}
