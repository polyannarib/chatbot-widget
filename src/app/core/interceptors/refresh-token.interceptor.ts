import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileService } from '../services/profile.service';

@Injectable({providedIn: 'root'})
export class WhiteLabelInterceptor implements HttpInterceptor {
    
    constructor(
        private profileService: ProfileService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const newRequest = request.clone({
            setHeaders: {
                'Content-Type': 'application/json'
            }
        });
        return next.handle(newRequest);
    }
    // this.profileService.validateWhiteLabel
}