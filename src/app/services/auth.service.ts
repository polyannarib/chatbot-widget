import { Router } from '@angular/router';
import { User } from '../login/user';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false; /// remover em breve

  private user: User;

  constructor(private router: Router, 
              private http: HttpClient ) { }

  login(user: User){

    if(user.username === 'admin' && user.password === 'admin'){
      this.usuarioAutenticado = true;

      this.user = new User();
      this.user.companyName = "kyros";
      this.user.displayName = 'Admin';
      // TODO: retirar isso, o ideal é salvar um token
      localStorage.setItem('user',JSON.stringify(this.user));
      this.router.navigate(['/home/dashboard']);

    }else if(user.username.includes('kyros.com.br')){

      var body = {
        email : user.username ,
        password : btoa(user.password)
      }

      const headers = new HttpHeaders({'Content-Type':'application/json'});
      // http://localhost:8080/workplayer-portal/services/login
      this.http.post('http://192.168.1.229:8593/workplayer-portal/services/login',body,{observe:'response',headers:headers}).subscribe(
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

                    console.log(userInfo);

                    this.usuarioAutenticado = true;

                    // TODO: retirar isso, o ideal é salvar o token
                    localStorage.setItem('user',this.user.username);
                    this.router.navigate(['/home/dashboard']);

                  }else{
                    alert(resp.body["message"]);
                  }
      });

    }else{

      this.usuarioAutenticado = false;

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
