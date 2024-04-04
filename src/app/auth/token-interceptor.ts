import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError, switchMap, take, filter} from 'rxjs/operators';
import {LoginResponse} from './login/login-response.payload';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
      return next.handle(req);
    }
    const jwtToken = this.authService.getJwtToken();

    if (jwtToken) {
      return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
        return throwError(error);
      }));
    }
    return next.handle(req);
  }

  addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: req.headers.set('Authorization',
        'Bearer ' + jwtToken)
    });
  }

}
