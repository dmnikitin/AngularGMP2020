import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { UrlTree, Router, CanActivate } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  public canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getUserInfo().pipe(
      tap(user => {
        this.authService.user.next(user);
        this.authService.isAuthenticated.next(true);
      }),
      map(value => {
        if (value) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }),
      catchError((err: Response) => {
        this.router.navigate(['login']);
        return throwError(err.statusText);
      })
    );
  }
}
