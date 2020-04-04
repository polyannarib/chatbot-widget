import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable(
    { providedIn: 'root' }
)
export class CardInterceptor implements HttpInterceptor {

    constructor() {}

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     const newRequest = request.clone({
    //         setHeaders: {
    //             'Authorization': 'Basic YWRtaW46YWRtaW4='
    //         }
    //     });
    //     return next.handle(newRequest);
    // }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken = 'YWRtaW46YWRtaW4=';
        const modifiedReq = req.clone({ 
          headers: req.headers.set('Authorization', `Basic ${userToken}`),
        });
        return next.handle(modifiedReq);
    }

}