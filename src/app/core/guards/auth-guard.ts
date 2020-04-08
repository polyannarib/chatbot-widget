import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../services/profile.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | boolean {
    if(this.authService.isAuthenticated()) {
      this.getProfile();
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }

  getProfile() {
    this.profileService.getWhiteLabel().subscribe(
        (response) => {
        if (response.status == 0) {
            this.profileService.setWhiteLabel(response.object);
            return;
        }
        return;
        }, (err) => {
        return;
    })
}
  
}
