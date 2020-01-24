import { Router } from '@angular/router';
import { User } from '../../../login/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { LoadingService } from 'src/app/home/shared/services/loading.service';
import { Observable } from 'rxjs';
import { AppConstants } from '../../../app.constants';

export const SSOID_NAME: string = '_ssoId';
export const COMPANY: string = "_company";
export const TOKEN_NAME: string = "token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false; /// remover em breve
  private user: User;
  private url: string = environment.back_end_url;
  private header: any = { 'Content-Type': 'application/json' };

  constructor(private router: Router,
    private http: HttpClient,
    private loadingService: LoadingService ) { }

  login(user: User) {

    this.loadingService.showPreloader();

    var body = {
      email: user.username,
      password: btoa(user.password),
      type: 'WEBPORTAL'
    }

    this.http.post(this.url + '/login', body,
      { observe: 'response', headers: new HttpHeaders(this.header) }).subscribe(
        resp => {


          if (resp.body != undefined && resp.body['status'] == 0) {
            this.user = new User();
            this.user.token = resp.headers.get('X-Token');
            let userInfo = resp.body['object'];
            this.user.username = userInfo['username'];
            this.user.companyName = userInfo['companyName'];
            this.user.displayName = userInfo['displayName'];
            this.user.email = userInfo['email'];
            this.user.permissions = userInfo['permissions'];
            this.user.scopes = userInfo['scopes'];

            this.usuarioAutenticado = true;

            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem(TOKEN_NAME, resp.headers.get('X-Token'));
            this.loadingService.hidePreloader();
            this.router.navigate(['/home/dashboard']);
         

          } else {
            this.loadingService.hidePreloader();
            alert(resp.body["message"]);
          }
        });


  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: any): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }

  getUser() {
    if (!this.user) {
      let user: User = JSON.parse(localStorage.getItem('user'));
      return user;
    }
    return this.user;
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

  getListUserPermission(): Observable<any> {
    return this.http.get(this.url + '/user/context');
  }

}
