import { Router } from '@angular/router';
import { User } from './user';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false; /// remover em breve

  private user: User;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router, 
              private http: HttpClient ) { }

  fazerLogin(user: User){

    if(user.username === 'admin' && user.password === 'admin'){
      this.usuarioAutenticado = true;

      this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['/dashboard']);

      this.user = new User();
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

                    this.mostrarMenuEmitter.emit(true);
              
                    this.router.navigate(['/dashboard']);

                  }else{
                    alert(resp.body["message"]);
                  }
      });

    }else{

      this.usuarioAutenticado = false;

      this.mostrarMenuEmitter.emit(false);
    }
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

  getUser(){
    return this.user;
  }

}
