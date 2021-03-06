import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,
                private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 400 && err.error.code && (err.error.code === 'auth/id-token-expired')) {
                // auto logout if 400 response returned from api for a token error
                this.authService.logout();
                this.router.navigate(['login']);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
