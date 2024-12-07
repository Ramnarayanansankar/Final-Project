import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const re = /login/gi;
    // Exclude interceptor for login request
    if (req.url.search(re) === -1 ) {
    const token = localStorage.getItem('token');
    console.log("token",token);
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }
    return next.handle(req);
  }
}
