import { Injectable, Inject } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DOCUMENT } from '@angular/common';
import { AppConstants } from '../../app.constants';
import { ProfileService } from '../services/profile.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  users: any = {};
  usernameReset: any;
  response: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    @Inject(DOCUMENT) private document: Document) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      this.profileService.validateWhiteLabel();
      this.router.navigate([`/management/cockpit`]);
      return true;
    }
  }
}
