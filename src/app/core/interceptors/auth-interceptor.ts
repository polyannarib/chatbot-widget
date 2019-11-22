import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
    
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (request.headers.has('X-Token')) {
            const xToken = request.headers.get('X-Token');

            console.log('----- xToken -----');
            console.log(xToken);

            const newRequest = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'X-Token': `${xToken}`
                }
            });
            return next.handle(newRequest);
        } else {
            return next.handle(request);
        }

    }
}