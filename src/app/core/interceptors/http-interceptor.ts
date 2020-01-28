import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { AuthService, SSOID_NAME } from '../services/auth.service';


@Injectable()
export class HttpInverceptor implements HttpInterceptor {

    contentType: any;
    
    constructor(
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (request.headers.has('Content-Type')) {
            this.contentType = request.headers.get('Content-Type');
        }

        if(this.authService.isAuthenticated()) {
            const newRequest = request.clone({
                setHeaders: {
                    'Content-Type': (this.contentType != 'application/json' ? 'application/json' :  this.contentType),
                    'X-SSOID': `${localStorage.getItem(SSOID_NAME)}`,
                    'X-Token': `${localStorage.getItem('acessToken')}`,
                    'X-Authorization': `Bearer ${localStorage.getItem('tempToken')}`
                }
            });
            return next.handle(newRequest);
        } else {
            const newRequest = request.clone({
                setHeaders: {
                    'Content-Type': (this.contentType != 'application/json' ? 'application/json' :  this.contentType),
                    'X-SSOID': `${localStorage.getItem(SSOID_NAME)}`,
                    'X-Authorization': `Bearer ${localStorage.getItem('tempToken')}`
                }
            });
            return next.handle(newRequest);
        }

    }
}
