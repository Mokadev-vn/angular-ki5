import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class Token implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const dataUser = JSON.parse(window.localStorage.getItem('dataUser') || '{}');
    const userToken = dataUser.access_token;
    const modifiedReq = req.clone({ 
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
    });
    return next.handle(modifiedReq);
  }
}