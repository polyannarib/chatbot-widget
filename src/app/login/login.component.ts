// import { User } from '../shared/models/user';
import { Router } from '@angular/router';
// import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

//   user: User = new User();
//   retorno: {};
//   teste:boolean = false;

  constructor(
    // private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

}

//   login(user) {
//     const self = this;
  
//     this.authService.login(user).then(function(data) {
//       self.authService.setToken(JSON.parse(data['_body'])['token']);
//       self.router.navigate(['/home/inicio']);
//     }).catch(err => {
//       this.teste = true;
//     });
//   }

//   senhaesquecida(){
//     const self = this;
//       self.router.navigate(['/senha-esquecida']);
//   };