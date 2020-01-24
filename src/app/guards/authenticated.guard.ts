import { Injectable, Inject } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../home/shared/services/auth.service';
import { DOCUMENT } from '@angular/common';
import { AppConstants } from '../app.constants';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

    users: any = {};
    usernameReset: any;
    response: any;

    constructor(
        private router: Router,
        private authService: AuthService,
        @Inject(DOCUMENT) private document: Document ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise< boolean > {
        let authenticated = route.queryParams.authenticated;
        return new Promise((resolve, reject) => {
            if( authenticated == 'false' ) {
                resolve(true);
                return;
            }
            if( route.queryParams.SSOID != undefined ) {
                let ssoId = route.queryParams.SSOID;
                let company = route.queryParams.company;
                let params = {
                    "SYSTEM": AppConstants.SYSTEM_NAME
                }
                this.authService.setSSOID(ssoId);
                this.authService.temporaryToken(params).subscribe(
                (response) => {
                    let tempToken = response["user-token"];
                    this.authService.setToken(tempToken);
        
                    this.authService.findAppToken(AppConstants.SYSTEM_NAME, company).subscribe(
                    (response) => {
                        const token = response['app-token'];
                        if( response["code"] == 1 ) {
                            this.authService.setToken(token);
                            this.users = this.authService.getListUserPermission().subscribe(
                            user => {
                                this.users = user;
                                localStorage.setItem('user', JSON.stringify(this.users));
                                localStorage.setItem('userId', this.users.object.userId);
                                localStorage.setItem('permissions', JSON.stringify(this.users.object.permissions));
                                if( route.queryParams.goTo != '/' ) {
                                    let goTo = route.queryParams.goTo;
                                    if( this.authService.getToken() != undefined ) {
                                        this.router.navigate(['/home/' + goTo ]);
                                    }
                                } else {
                                    this.router.navigate(['/home/dashboard']);
                                }
                            });
                        } else {
                            resolve(true);
                        }
                    })
                })
            } else {
                let company: any;
                if(this.authService.getCompany() == undefined ) {
                    company = "1";
                } else {
                    company = this.authService.getCompany();
                }
                window.location.href = AppConstants.URL_SSO + '/login'
                                            + "?urlRedirect=" + AppConstants.WORKPLAYER_HOME + '/login' 
                                            + "&system=" + AppConstants.SYSTEM_NAME
                                            + "&goTo=%2F&company=" + company
                                            + "&authenticateMe=0"
            }
        }).then( function(result) {
            return result;
        }, function(error) {
            return error;
        });
    }
}
