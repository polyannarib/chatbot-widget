import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardTeste implements CanActivate, CanActivateChild, CanLoad {

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  canActivatedByScope(route, scopes) {
    let canActivated = true;  
    const permissions = [];

    const NAO_TEM = 0;
    const TEM = 1;

    if (route.data) {
      if (route.data.scopes) {
        if (route.data.scopes.length < 1) {
          canActivated = false;
        }
        if (route.data.scopes.length > 1) {
          route.data.scopes.forEach(scope => {
            if (scopes.hasOwnProperty(scope)) {
              permissions.push(TEM);
            } else {
              permissions.push(NAO_TEM);
            }
          });
        }
      } else {
        canActivated = false;
      }
    }
    return canActivated;
  }
}
