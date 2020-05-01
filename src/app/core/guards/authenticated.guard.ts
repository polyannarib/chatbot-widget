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
        @Inject(DOCUMENT) private document: Document ) { }

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

            console.log('Entrou dentro do AuthenticatedGuard');
            
            let authenticated = route.queryParams.authenticated;

            // return new Promise((resolve, reject) => {
            if(this.authService.isAuthenticated()) {
                this.profileService.validateWhiteLabel();
                this.router.navigate([`/management/dashboard`]);
                return true;
            }
            if(authenticated == 'false') {
                console.log('Entrou dentro do if authenticated == false');
                return true;
                // this.router.navigate(['/auth/login']);
                // resolve(true);
                // return this.router.navigate(['/auth/login']);
            }
            if (route.queryParams.SSOID) {
                console.log('Entrou dentro do route.queryParams.SSOID != undefined');
                let ssoId = route.queryParams.SSOID;
                let company = route.queryParams.company;
                let params = {
                    "SYSTEM": AppConstants.SYSTEM_NAME
                }
                this.authService.setSSOID(ssoId);
                this.authService.temporaryToken(params).subscribe(
                    (response) => {
                        let tempToken = response["user-token"];
                        this.authService.setTemporaryToken(tempToken);
                        this.authService.findAppToken(AppConstants.SYSTEM_NAME, company).subscribe(
                            (response) => {
                                const token = response['app-token'];
                                if( response["code"] == 1 ) {
                                    let params = {
                                        "app-token": token
                                    }
                                    this.authService.findWorkplayerToken(params).subscribe(
                                        (response) => {
                                            this.authService.setToken(response["message"]);
                                            return true;
                                        }
                                    )
                                } else {
                                    return false;
                                }
                            })
                            return false;
                    })
            } else {
                let company: any;
                if(!this.authService.getCompany()) {
                    company = AppConstants.COMPANY;
                } else {
                    company = this.authService.getCompany();
                }
                window.location.href = AppConstants.URL_SSO + '/login'
                                            + "?urlRedirect=" + AppConstants.WORKPLAYER_HOME + '/auth/login' 
                                            + "&system=" + AppConstants.SYSTEM_NAME
                                            + "&goTo=%2F&company=" + company
                                            + "&authenticateMe=0"
            }
        // }).then(function(result) {
        //     return result;
        // }, function(error) {
        //     return error;
        // });
    }

}
