import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppConstants } from '../../app.constants';
import { ProfileService } from './profile.service';

export const SSOID_NAME: string = '_ssoId';
export const COMPANY: string = "_company";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
    private profileService: ProfileService
  ) { }

  login(data): Observable<any> {
    return this.http.post<any>(`${environment.back_end_url}/login`, data);
  }
  
  logout(): Observable<any> {
    this.profileService.removeAppColors();
    return this.http.get(AppConstants.URL_SSO_SERVICES + '/user/logout' );
  }

  removeToken() {
    localStorage.removeItem('acessToken');
    localStorage.removeItem('acessToken');
    this.profileService.removeAppColors();
  }

  getUser() {
    var token;
    if(localStorage.getItem('acessToken') && this.isAuthenticated()) {
      token = this.jwtHelper.decodeToken(localStorage.getItem('acessToken'))
      return token.displayName;
    }
  }

  setTemporaryToken(token: string): void {
    localStorage.setItem('tempToken', token);
  }

  setAppToken(token: string): void {
    localStorage.setItem('acessToken', token);
  }

  setToken(token: string): void {
    localStorage.setItem('acessToken', token);
    this.router.navigate(['/management/dashboard']);
  }

  getSSOID(): string {
    return localStorage.getItem(SSOID_NAME);
  }

  setSSOID(ssoId: string) {
    localStorage.setItem(SSOID_NAME, ssoId);
  }

  setCompany(company: string) {
    localStorage.setItem(COMPANY, company);
  }

  getCompany(): any {
    return localStorage.getItem(COMPANY);
  }

  temporaryToken(params: any) {
    return this.http.post(AppConstants.URL_SSO_SERVICES + '/exposed/token/temporary', params );
  }

  findAppToken(systemCode: string, company: any): Observable<any> {
    return this.http.get(AppConstants.URL_SSO_SERVICES + '/token/authorization/system/' + AppConstants.SYSTEM_NAME + '/company/' + company);
  }

  findWorkplayerToken(params: any) {
    return this.http.post(AppConstants.URL_ROOT + '/login/info', params);
  }

  isAuthenticated(): boolean {
    if( localStorage.getItem('acessToken') != null || !localStorage.getItem('acessToken') ) {
      if(!this.jwtHelper.isTokenExpired(localStorage.getItem('acessToken'))) {
        return true;
      } else {
        localStorage.removeItem('appColor');
        return false;
      }
    }
    return false;
  }

  getScopes() {
    let token = this.getAppToken();
    let scopesArray = [];
    if(token) {
      if(token.scopes) {
        token.scopes.forEach(element => {
          let scopoReplace = element.replace('.', '').toLowerCase();
          scopesArray[scopoReplace] = true;
        });
      }
    }
    return scopesArray;    
  }

  getAppToken() {
    const token = localStorage.getItem('acessToken');
    if(token) {
      try {
        return this.jwtHelper.decodeToken(token);
      }
      catch(error){
        return null;
      }      
    }
  }

}
