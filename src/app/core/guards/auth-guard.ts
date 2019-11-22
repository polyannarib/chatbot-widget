import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | boolean {
    if(this.authService.isAuthenticated()) {
      console.log('canActivate entrou dentro do IF');
      return true;
    } else {
      console.log('canActivate entrou dentro do ELSE');
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
  
}
