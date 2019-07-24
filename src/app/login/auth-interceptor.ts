import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
    
    constructor( private authService: AuthService) {}

    intercept(req: HttpRequest<any>,next: HttpHandler,): Observable<HttpEvent<any>> {
        let returnReq = req;
        if( localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            const cloneReq = req.clone({
                headers: req.headers.append('X-Token', token)
            });
            returnReq = cloneReq;
        }
        return next.handle(returnReq).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                let newToken = event.headers.get('X-Token');
                if(newToken && newToken.length > 0) {
                    localStorage.setItem('token', newToken);
                }
            }
            return event;
        }));
    }
}
    
    
@NgModule({
    providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpsRequestInterceptor,
        multi: true,
    },],
}) 
export class Interceptor {}