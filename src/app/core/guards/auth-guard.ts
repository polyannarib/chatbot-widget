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

  canLoad(route: any): boolean {
    return this.validateSession();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.validateSession();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.validateSession();
  }

  validateSession() {
    console.log('entrou dentro do canActivate');
    if(this.authService.isAuthenticated()) {
      console.log('true');
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      console.log('false');
      return false;
    }
  }
  
}
