import { Router } from '@angular/router';
import { User } from '../login/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false; /// remover em breve
  private user: User;
  private url: string = environment.back_end_url;
  private header:any = {'Content-Type':'application/json'};

  constructor(private router: Router, 
              private http: HttpClient ) { }

  login(user: User){

    if(user.username.includes('kyros.com.br')){
      var body = {
        email : user.username ,
        password : btoa(user.password)
      }

      this.http.post(this.url + '/login',body,
      {observe:'response',headers:new HttpHeaders(this.header)}).subscribe(
        resp => { 

          
                  if( resp.body != undefined && resp.body['status'] == 0 ){
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

                    // TODO: retirar isso, o ideal é salvar o token
                    localStorage.setItem('user',JSON.stringify(this.user));
                    this.router.navigate(['/home/dashboard']);

                  }else{
                    alert(resp.body["message"]);
                  }
      });

    }
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

  getUser(){
    if(!this.user) {
      let user:User = JSON.parse(localStorage.getItem('user'));
      return user;
    }
    return this.user;
  }

}
