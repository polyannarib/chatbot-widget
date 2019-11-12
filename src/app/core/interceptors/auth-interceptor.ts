import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MzModalService } from 'ngx-materialize';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { ModalErrorComponent } from 'src/app/shared/components/modal/error/modal-error.component';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
    
    constructor( 
        private authService: AuthService, 
        private router: Router,
        private loadingService: LoadingService,
        private modalService: MzModalService ) {}

    intercept(req: HttpRequest<any>,next: HttpHandler,): Observable<HttpEvent<any>> {
        let returnReq = req;

        if( localStorage.getItem('token') ) {
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
        },
        error => {
            if( error.status == 402 ) {
                localStorage.removeItem( 'token' );
                this.router.navigate(['/login']);
                this.loadingService.hidePreloader();
            } else if( error.status == 500 ) {
                this.modalService.open( ModalErrorComponent );
            }
        }
        ));
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