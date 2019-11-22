import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable()
export class HttpInverceptor implements HttpInterceptor {

    contentType: any;
    
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (request.headers.has('Content-Type')) {
            this.contentType = request.headers.get('Content-Type');
        }

        if(localStorage.getItem('acessToken')) {
            const newRequest = request.clone({
                setHeaders: {
                    'Content-Type': (this.contentType != 'application/json' ? 'application/json' :  this.contentType),
                    // 'Content-Type': 'application/json',
                    'X-Token': `${localStorage.getItem('acessToken')}`
                }
            });
            return next.handle(newRequest);
        } else {
            return next.handle(request);
        }

    }
}
