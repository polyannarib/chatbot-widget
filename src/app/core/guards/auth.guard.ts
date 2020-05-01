import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.validateSession(route);
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateSession(route);
  }
  
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateSession(route);
  }

  validateSession(route) {
    if(this.authService.isAuthenticated) {
      const scopes = this.authService.getScopes();
      const scopesObject = Object.assign({}, scopes);
      if (this.canActivatedByScope(route, scopesObject) == false) {
          this.authService.logout().subscribe(
            () => {
              this.authService.removeToken();
              this.router.navigate( ['/auth/login'], { replaceUrl: true, queryParams: { authenticated: false}} )
          })
          return false;
      }
      return true;
    } else {
      this.router.navigate(['/auth/login'], {replaceUrl: true})
      return false;
    }
  }

  canActivatedByScope(route, scopes) {
    let canActivated = true;  
    const permissions = [];
    const NAO_TEM = 0;
    const TEM = 1;
    if (route.data) {
      if (route.data.scopes) {
        if (route.data.scopes.length <= 0) {
          return false;
        } else {
          route.data.scopes.forEach(scope => {
            if (scopes.hasOwnProperty(scope)) {
              permissions.push(TEM);
            } else {
              permissions.push(NAO_TEM);
            }
          });
          if(permissions.indexOf(TEM) < 0) {
            return false;
          }
        }
        // if (route.data.scopes.length > 0) {
        //   route.data.scopes.forEach(scope => {
        //     if (scopes.hasOwnProperty(scope)) {
        //       permissions.push(TEM);
        //     } else {
        //       permissions.push(NAO_TEM);
        //     }
        //   });
        // }
        // if(permissions.indexOf(TEM) < 0) {
        //   return false;
        // }
      } else {
        return false;
      }
    }
    return canActivated;
  }
  
}
