import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationQuery } from '../authentication/authentication.query';

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {

  constructor(private readonly authenticationQuery: AuthenticationQuery) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { accessToken } = this.authenticationQuery.getValue();
    if (accessToken && request.url.includes('api/') && !request.headers.has('Authorization')) {
      const headers = request.headers.set('Authorization', `Bearer ${accessToken}`);
        const reqClone = request.clone({
          headers,
        });
        return next.handle(reqClone);
    }
    return next.handle(request);
  }
}
