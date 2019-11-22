import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
    
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const newRequest = request.clone({
            setHeaders: {
                'Content-Type': 'application/json'
            }
        });
        
        return next.handle(newRequest);
        
    }
}