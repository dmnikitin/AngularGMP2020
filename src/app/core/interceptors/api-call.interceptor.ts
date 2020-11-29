/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiCallInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request);
    if(request.headers.get('token') !== 'no-token') {
      const authToken: string = this.authService.getToken();
      request = request.clone({
        headers: new HttpHeaders({Authorization: authToken})
      });
    }
    return next.handle(request);
  }
}
