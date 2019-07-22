import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
    
    constructor( private authService: AuthService) {}

    intercept(req: HttpRequest<any>,next: HttpHandler,): Observable<HttpEvent<any>> {
        if( this.authService.getUser() ) {
            const token = this.authService.getUser().token;
            const dupReq = req.clone({
                headers: req.headers.append('X-Token', token)
            });

            return next.handle(dupReq);
        }
        return next.handle(req);
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