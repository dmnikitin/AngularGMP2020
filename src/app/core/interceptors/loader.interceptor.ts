import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { catchError, delay, finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.isLoading.next(true);
    return next.handle(request).pipe(
      delay(500),
      finalize(() => {
        this.loaderService.isLoading.next(false);
      }),
      catchError((err: Response) => throwError(err.statusText))
    );
  }
}
