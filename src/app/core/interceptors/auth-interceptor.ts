import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    token: any;
    contentType: any;
    
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {

        const requestUrl: Array<any> = request.url.split('/');
        const apiUrl: Array<any> = environment.back_end_url.split('/');
        
        if (request.headers.has('Content-Type')) {
            this.contentType = request.headers.get('Content-Type');
        }

        if( localStorage.getItem('acessToken') && (requestUrl[2] === apiUrl[2])) {
            const newRequest = request.clone({
                setHeaders: {
                    'Content-Type': (this.contentType != 'application/json' ? 'application/text' :  this.contentType),
                    'X-Token': `${localStorage.getItem('acessToken')}`
                }
            });
            return next.handle(newRequest);
        } else {
            return next.handle(request);
        }
    }
}
