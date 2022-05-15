import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (localStorage.getItem('access-token') != null) {
            const token = localStorage.getItem('access-token');
            // if the token is  stored in localstorage add it to http header
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
            //clone http to the custom AuthRequest and send it to the server
            const AuthRequest = request.clone({ headers: headers });
            return next.handle(AuthRequest);
        } else {
            return next.handle(request);
        }
    }
}
