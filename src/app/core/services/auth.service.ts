import { Router } from '@angular/router';
import { User } from '../../shared/models/UserModels';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from 'src/app/core/services/loading.service';
import { environment } from 'src/environments/environment';

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
            localStorage.setItem('token', resp.headers.get('X-Token'));
            this.loadingService.hidePreloader();
            this.router.navigate(['/home/dashboard']);
         

          } else {
            this.loadingService.hidePreloader();
            alert(resp.body["message"]);
          }
        });

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

}
