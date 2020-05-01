import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            // tap((event) => {
            //     if (event instanceof HttpResponse) {
            //         if(event.headers.get('X-Token') != this.authService.getAppToken()) {
            //             this.authService.setAppToken(event.headers.get('X-Token'));
            //         } 
            //     }
            // }), 
            catchError((err: HttpErrorResponse) => {
                if (err.status == 401 || err.status == 402 || err.status == 403) {
                    this.authService.logout();
                    this.router.navigate(['/auth/login'], {replaceUrl: true});
                    this._snackBar.openFromComponent(NotifyComponent, 
                        { data: { type: 'error', message: 'Ops, sua sessão expirou!' }});
                    // document.location.reload(true);
                } else {
                    return throwError(err);
                }
            })
        );
    }

}